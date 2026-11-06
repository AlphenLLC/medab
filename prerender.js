import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { eventCatalog } from "./src/data/eventCatalog.js";
import { TEAM_TERMS, getTeamByYear } from "./src/data/teamData.js";
import { toTitleCase } from "./src/utils/formatters.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = "https://imumedab.com";
const distDir = path.resolve(__dirname, "dist");
const templatePath = path.resolve(distDir, "index.html");

if (!fs.existsSync(templatePath)) {
  console.error(
    'Hata: dist/index.html bulunamadı. Önce "vite build" çalıştırın.',
  );
  process.exit(1);
}

const template = fs.readFileSync(templatePath, "utf-8");

function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function parseTurkishDateToIso(dateStr) {
  if (!dateStr) return "2026-01-01";

  const months = {
    ocak: "01",
    şubat: "02",
    mart: "03",
    nisan: "04",
    mayıs: "05",
    haziran: "06",
    temmuz: "07",
    ağustos: "08",
    eylül: "09",
    ekim: "10",
    kasım: "11",
    aralık: "12",
  };

  const parts = dateStr.trim().toLocaleLowerCase("tr-TR").split(/\s+/);
  if (parts.length >= 3) {
    const rawDay = parts[0].split("-")[0];
    const day = rawDay.padStart(2, "0");
    const month = months[parts[1]] || "01";
    const year = parts[2];
    return `${year}-${month}-${day}`;
  }
  return "2026-01-01";
}

function setMetaTag(html, attrName, attrVal, content) {
  const safeContent = escapeHtml(content);
  const regex = new RegExp(
    `<meta\\s+[^>]*${attrName}=["']${attrVal}["'][^>]*>`,
    "i",
  );
  const tag = `<meta ${attrName}="${attrVal}" content="${safeContent}" />`;
  return regex.test(html)
    ? html.replace(regex, tag)
    : html.replace("</head>", `  ${tag}\n</head>`);
}

function generateHtml(options) {
  let html = template;
  const safeTitle = escapeHtml(options.title);

  html = html.replace(/<title>.*?<\/title>/i, `<title>${safeTitle}</title>`);

  const canonicalRegex = /<link\s+[^>]*rel=["']canonical["'][^>]*>/i;
  const canonicalTag = `<link rel="canonical" href="${options.url}" />`;
  html = canonicalRegex.test(html)
    ? html.replace(canonicalRegex, canonicalTag)
    : html.replace("</head>", `  ${canonicalTag}\n</head>`);

  // Standart Meta
  html = setMetaTag(html, "name", "description", options.desc);

  // Open Graph
  html = setMetaTag(html, "property", "og:type", options.ogType || "website");
  html = setMetaTag(html, "property", "og:locale", "tr_TR");
  html = setMetaTag(html, "property", "og:site_name", "MedAB");
  html = setMetaTag(html, "property", "og:title", options.title);
  html = setMetaTag(html, "property", "og:description", options.desc);
  html = setMetaTag(html, "property", "og:url", options.url);
  html = setMetaTag(html, "property", "og:image", options.image);

  // Twitter Cards
  html = setMetaTag(html, "name", "twitter:card", "summary_large_image");
  html = setMetaTag(html, "name", "twitter:title", options.title);
  html = setMetaTag(html, "name", "twitter:description", options.desc);
  html = setMetaTag(html, "name", "twitter:image", options.image);

  if (options.jsonLd) {
    const schemaId = options.schemaId || "event-jsonld-schema";
    const safeJsonString = JSON.stringify(options.jsonLd).replace(
      /<\/script/gi,
      "<\\/script",
    );
    const scriptTag = `  <script id="${schemaId}" type="application/ld+json">${safeJsonString}</script>\n</head>`;
    html = html.replace("</head>", scriptTag);
  }

  if (options.bodyHtml) {
    html = html.replace(
      '<div id="app"></div>',
      `<div id="app">${options.bodyHtml}</div>`,
    );
  }

  return html;
}

const staticPages = [
  {
    path: "",
    priority: "1.0",
    title: "MedAB | Medeniyet Akademik ve Bilimsel Faaliyetler Kulübü",
    desc: "İstanbul Medeniyet Üniversitesi MedAB resmi web sitesi. Tıp ve bilim odaklı akademik faaliyetler, araştırmalar ve etkinlikler.",
    image: `${SITE_URL}/banner.png`,
  },
  {
    path: "hakkimizda",
    priority: "0.9",
    title: "Hakkımızda | MedAB",
    desc: "MedAB vizyonu, misyonu, tıp fakültesi öğrencilerine sunduğu akademik gelişim ortamı ve kulüp faaliyetleri.",
    image: `${SITE_URL}/banner.png`,
  },
  {
    path: "dergi",
    priority: "0.9",
    title: "MedAB Perspektif Dergi",
    desc: "MedAB Perspektif bilimsel ve akademik yayın bülteni, öğrenci makaleleri ve dergi sayıları.",
    image: `${SITE_URL}/banner.png`,
  },
  {
    path: "etkinlikler",
    priority: "0.9",
    title: "Etkinlikler | MedAB",
    desc: "MedAB tarafından düzenlenen tüm akademik sempozyumlar, klinik atölyeler ve sosyal etkinlikler.",
    image: `${SITE_URL}/banner.png`,
  },
  {
    path: "ekibimiz",
    priority: "0.8",
    title: "Ekibimiz | MedAB",
    desc: "İstanbul Medeniyet Üniversitesi MedAB yönetim kurulu, koordinatörleri ve çalışma ekipleri.",
    image: `${SITE_URL}/banner.png`,
  },
  {
    path: "galeri",
    priority: "0.6",
    title: "Galeri | MedAB",
    desc: "MedAB etkinliklerinden geriye kalan fotoğraf kareleri, laboratuvar ve saha anları.",
    image: `${SITE_URL}/banner.png`,
  },
];

const navLinksHtml = `
  <nav aria-label="Ana Navigasyon">
    <a href="${SITE_URL}/">Ana Sayfa</a>
    <a href="${SITE_URL}/hakkimizda/">Hakkımızda</a>
    <a href="${SITE_URL}/dergi/">Dergi</a>
    <a href="${SITE_URL}/etkinlikler/">Etkinlikler</a>
    <a href="${SITE_URL}/ekibimiz/">Ekibimiz</a>
    <a href="${SITE_URL}/galeri/">Galeri</a>
  </nav>
`;

const allEventsLinksHtml = `
  <section>
    <h2>MedAB Etkinlikleri</h2>
    <ul>
      ${eventCatalog
        .map(
          (ev) =>
            `<li><a href="${SITE_URL}/etkinlik/${ev.id}/">${escapeHtml(
              toTitleCase(ev.baslik),
            )}</a> - ${escapeHtml(ev.tarih)}</li>`,
        )
        .join("\n      ")}
    </ul>
  </section>
`;

const allRawTeamMembers = Object.keys(TEAM_TERMS || {}).flatMap(
  (yr) => getTeamByYear(yr) || [],
);

const uniqueMembersMap = new Map();
allRawTeamMembers.forEach((m) => {
  if (m && m.name && !uniqueMembersMap.has(m.name)) {
    uniqueMembersMap.set(m.name, {
      name: m.name,
      role: m.role || m.department || m.team || "MedAB Ekip Üyesi",
      team: m.team || "MedAB",
    });
  }
});

const allTeamMembersHtml = `
  <section>
    <h2>MedAB Yönetim Kurulu ve Çalışma Ekipleri</h2>
    <ul>
      ${Array.from(uniqueMembersMap.values())
        .map(
          (m) =>
            `<li><strong>${escapeHtml(m.name)}</strong> - ${escapeHtml(
              m.role,
            )} (${escapeHtml(m.team)})</li>`,
        )
        .join("\n      ")}
    </ul>
  </section>
`;

const teamMembersSchemaList = Array.from(uniqueMembersMap.values()).map(
  (m) => ({
    "@type": "Person",
    name: m.name,
    jobTitle: m.role,
    memberOf: {
      "@type": "Organization",
      name: "İstanbul Medeniyet Üniversitesi MedAB",
    },
  }),
);

const sitemapEntries = [];
const today = new Date().toISOString().split("T")[0];

staticPages.forEach((page) => {
  const pageUrl = page.path ? `${SITE_URL}/${page.path}/` : `${SITE_URL}/`;
  sitemapEntries.push({
    url: pageUrl,
    priority: page.priority,
    lastmod: today,
  });

  const seoBodyHtml = `
    <main>
      ${navLinksHtml}
      <h1>${escapeHtml(page.title)}</h1>
      <p>${escapeHtml(page.desc)}</p>
      ${
        page.path === "" || page.path === "etkinlikler"
          ? allEventsLinksHtml
          : ""
      }
      ${page.path === "ekibimiz" ? allTeamMembersHtml : ""}
    </main>
  `;

  const pageJsonLd =
    page.path === "ekibimiz"
      ? {
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: page.title,
          description: page.desc,
          url: pageUrl,
          mainEntity: {
            "@type": "Organization",
            name: "İstanbul Medeniyet Üniversitesi MedAB",
            url: `${SITE_URL}/`,
            member: teamMembersSchemaList,
          },
        }
      : {
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: page.title,
          description: page.desc,
          url: pageUrl,
          publisher: {
            "@type": "Organization",
            name: "İstanbul Medeniyet Üniversitesi MedAB",
            url: `${SITE_URL}/`,
          },
        };

  const pageHtml = generateHtml({
    title: page.title,
    desc: page.desc,
    url: pageUrl,
    image: page.image,
    ogType: "website",
    bodyHtml: seoBodyHtml,
    schemaId:
      page.path === "ekibimiz"
        ? "team-members-jsonld-schema"
        : "page-jsonld-schema",
    jsonLd: pageJsonLd,
  });

  const targetDir = page.path ? path.resolve(distDir, page.path) : distDir;
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.resolve(targetDir, "index.html"), pageHtml, "utf-8");
  console.log(`[Prerender - Statik] Hazırlandı: ${pageUrl}`);
});

eventCatalog.forEach((event) => {
  const eventUrl = `${SITE_URL}/etkinlik/${event.id}/`;
  const eventIsoDate = parseTurkishDateToIso(event.tarih);
  sitemapEntries.push({
    url: eventUrl,
    priority: "0.8",
    lastmod: eventIsoDate,
  });

  const cleanTitle = toTitleCase(event.baslik);
  const formattedTitle = `${cleanTitle} | MedAB`;
  const eventDesc =
    event.aciklama || "İstanbul Medeniyet Üniversitesi MedAB Kulübü Etkinliği";

  const targetDir = path.resolve(distDir, "etkinlik", event.id);
  fs.mkdirSync(targetDir, { recursive: true });

  const assetDir = path.resolve(
    __dirname,
    "src",
    "assets",
    "etkinlikler",
    event.id,
  );
  let eventImage = `${SITE_URL}/banner.png`;

  if (fs.existsSync(assetDir)) {
    const files = fs.readdirSync(assetDir);
    const coverFileName = files.find((file) => {
      const lower = file.toLowerCase();
      return (
        lower.startsWith("kapak.") && /\.(jpg|jpeg|png|webp|avif)$/i.test(lower)
      );
    });

    if (coverFileName) {
      fs.copyFileSync(
        path.resolve(assetDir, coverFileName),
        path.resolve(targetDir, coverFileName),
      );
      eventImage = `${SITE_URL}/etkinlik/${event.id}/${coverFileName}`;
    }
  }

  const paragraphsHtml = (event.icerik || [])
    .filter((blok) => blok.tip === "paragraf" || blok.tip === "baslik")
    .map((blok) =>
      blok.tip === "baslik"
        ? `<h2>${escapeHtml(blok.metin)}</h2>`
        : `<p>${escapeHtml(blok.metin)}</p>`,
    )
    .join("\n      ");

  const eventBodyHtml = `
    <main>
      ${navLinksHtml}
      <article>
        <h1>${escapeHtml(cleanTitle)}</h1>
        <p>${escapeHtml(event.tarih)} | ${escapeHtml(event.yer)}</p>
        ${paragraphsHtml}
      </article>
    </main>
  `;

  const eventHtml = generateHtml({
    title: formattedTitle,
    desc: eventDesc,
    url: eventUrl,
    image: eventImage,
    ogType: "article",
    bodyHtml: eventBodyHtml,
    schemaId: "event-jsonld-schema",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Event",
      name: cleanTitle,
      description: eventDesc,
      url: eventUrl,
      startDate: `${eventIsoDate}T10:00:00+03:00`,
      endDate: `${eventIsoDate}T17:00:00+03:00`,
      image: [eventImage],
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      location: {
        "@type": "Place",
        name: event.yer || "İstanbul Medeniyet Üniversitesi",
        address: {
          "@type": "PostalAddress",
          addressLocality: "İstanbul",
          addressCountry: "TR",
        },
      },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "TRY",
        availability: "https://schema.org/InStock",
        url: event.basvuruLinki || eventUrl,
      },
      organizer: {
        "@type": "Organization",
        name: "MedAB",
        url: `${SITE_URL}/`,
      },
    },
  });

  fs.writeFileSync(path.resolve(targetDir, "index.html"), eventHtml, "utf-8");
  console.log(`[Prerender - Etkinlik] Hazırlandı: ${eventUrl}`);
});

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries
  .map(
    (entry) => `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <priority>${entry.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

fs.writeFileSync(path.resolve(distDir, "sitemap.xml"), sitemapXml, "utf-8");
fs.writeFileSync(path.resolve(distDir, "robots.txt"), robotsTxt, "utf-8");
fs.writeFileSync(path.resolve(distDir, "CNAME"), "imumedab.com\n", "utf-8");
fs.writeFileSync(path.resolve(distDir, ".nojekyll"), "");

console.log(
  `[Tamamlandı] Sitemap.xml (${sitemapEntries.length} URL), robots.txt, CNAME ve sayfalar hazırlandı.`,
);
