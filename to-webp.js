import fs from "fs";
import path from "path";
import sharp from "sharp";

const assetDirs = [path.resolve("src/assets"), path.resolve("public")];
const codeDirs = [path.resolve("src"), path.resolve("index.html")];

const IGNORE_PATTERNS = [
  "magazines",
  "pdf",
  "favicon",
  "apple-touch-icon",
  "android-chrome",
  "og-image",
  "banner.png",
];

const replacements = [];

function shouldIgnore(fullPath) {
  const normalized = fullPath.replace(/\\/g, "/");
  return IGNORE_PATTERNS.some((pattern) => normalized.includes(pattern));
}

async function processImage(fullPath, entryName, dir) {
  const stats = fs.statSync(fullPath);
  const parsed = path.parse(fullPath);
  const isWebp = /\.webp$/i.test(entryName);
  const isJpgOrPng = /\.(jpe?g|png)$/i.test(entryName);

  if (!isWebp && !isJpgOrPng) return;

  // 150 KB altındaki zaten hafif görsellere dokunma
  if (stats.size < 150 * 1024) return;

  const buffer = fs.readFileSync(fullPath);
  let pipeline = sharp(buffer).rotate();
  const metadata = await pipeline.metadata();

  const isVipImage = /ataturk|banner/i.test(entryName);

  if (isVipImage) {
    // Atatürk ve ana banner: Masaüstü için maksimum 1800px, nearLossless ile kusursuz gökyüzü dokusu
    if (metadata.width && metadata.width > 1800) {
      pipeline = pipeline.resize({
        width: 1800,
        withoutEnlargement: true,
        kernel: sharp.kernel.lanczos3,
      });
    }
    pipeline = pipeline.webp({
      quality: 92,
      nearLossless: true,
      smartSubsample: true,
      effort: 6,
    });
  } else {
    // Etkinlik afişleri ve kartlar: 1200px (Retina ekranlarda dahi jilet gibi netlik)
    if (metadata.width && metadata.width > 1200) {
      pipeline = pipeline.resize({
        width: 1200,
        withoutEnlargement: true,
        kernel: sharp.kernel.lanczos3, // Yazı ve kenarları pürüzsüz/keskin tutan filtre
      });
    }
    pipeline = pipeline.webp({
      quality: 84, // Gözle %100 aynı netlik, ama dosya boyutunda %85 tasarruf
      smartSubsample: true,
      effort: 6,
    });
  }

  const outputBuffer = await pipeline.toBuffer();
  const webpPath = path.join(parsed.dir, `${parsed.name}.webp`);
  const tempPath = path.join(parsed.dir, `temp_${parsed.name}.webp`);

  fs.writeFileSync(tempPath, outputBuffer);

  if (isJpgOrPng) {
    fs.unlinkSync(fullPath);
    fs.renameSync(tempPath, webpPath);

    const parentFolder = path.basename(parsed.dir);
    replacements.push({
      folderAndFile: `${parentFolder}/${entryName}`,
      folderAndNew: `${parentFolder}/${parsed.name}.webp`,
      oldName: entryName,
      newName: `${parsed.name}.webp`,
    });
  } else if (isWebp) {
    fs.unlinkSync(fullPath);
    fs.renameSync(tempPath, fullPath);
  }

  const oldKb = (stats.size / 1024).toFixed(0);
  const newKb = (outputBuffer.length / 1024).toFixed(0);
  console.log(`[OPTIMIZE] ${entryName}: ${oldKb} KB -> ${newKb} KB`);
}

async function convertDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (shouldIgnore(fullPath)) continue;

    if (entry.isDirectory()) {
      await convertDirectory(fullPath);
    } else {
      await processImage(fullPath, entry.name, dir);
    }
  }
}

function updateCodeReferences(targetPath) {
  const stats = fs.statSync(targetPath);

  if (stats.isDirectory()) {
    for (const entry of fs.readdirSync(targetPath)) {
      updateCodeReferences(path.join(targetPath, entry));
    }
  } else if (/\.(vue|js|ts|json|html|scss|css)$/i.test(targetPath)) {
    let content = fs.readFileSync(targetPath, "utf-8");
    let original = content;

    for (const item of replacements) {
      if (content.includes(item.folderAndFile)) {
        content = content.split(item.folderAndFile).join(item.folderAndNew);
      }
      if (
        !/^(kapak|hero|\d+)\./i.test(item.oldName) &&
        content.includes(item.oldName)
      ) {
        content = content.split(item.oldName).join(item.newName);
      }
    }

    if (content !== original) {
      fs.writeFileSync(targetPath, content, "utf-8");
      console.log(
        `[KOD GÜNCELLENDİ] ${path.relative(process.cwd(), targetPath)}`,
      );
    }
  }
}

async function run() {
  console.log("Görseller keskinlik korunarak optimize ediliyor...");
  for (const dir of assetDirs) {
    if (fs.existsSync(dir)) await convertDirectory(dir);
  }

  if (replacements.length > 0) {
    console.log("\nKod içindeki dosya uzantıları güncelleniyor...");
    for (const codePath of codeDirs) {
      if (fs.existsSync(codePath)) updateCodeReferences(codePath);
    }
  }

  console.log("\nİşlem başarıyla tamamlandı!");
}

run();
