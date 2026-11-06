import os
from concurrent.futures import ProcessPoolExecutor, as_completed
import pypdfium2 as pdfium

PDF_PATH = "dergi.pdf"
OUTPUT_DIR = "./public/magazines/sayi-1"
TARGET_HEIGHT = 1800
WEBP_QUALITY = 90

def convert_single_page(args):
    pdf_path, page_idx, output_dir, target_height, quality = args
    page_num = page_idx + 1
    output_path = os.path.join(output_dir, f"{page_num:03d}.webp")
    with pdfium.PdfDocument(pdf_path) as pdf:
        page = pdf.get_page(page_idx)
        try:
            width, height = page.get_size()
            scale = target_height / height
            
            image = page.render(scale=scale).to_pil()
            image.save(output_path, "WEBP", quality=quality, method=4)
            image.close()
        finally:
            page.close()
            
    size_kb = os.path.getsize(output_path) / 1024
    return page_num, size_kb

def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    if not os.path.exists(PDF_PATH):
        print(f"Hata: '{PDF_PATH}' bulunamadı.")
        return
    with pdfium.PdfDocument(PDF_PATH) as pdf:
        total_pages = len(pdf)
    max_workers = os.cpu_count() or 4
    print(f"Toplam {total_pages} sayfa, {max_workers} çekirdek kullanılarak paralel dönüştürülüyor...\n")
    tasks = [
        (PDF_PATH, i, OUTPUT_DIR, TARGET_HEIGHT, WEBP_QUALITY)
        for i in range(total_pages)
    ]

    completed_count = 0
    with ProcessPoolExecutor(max_workers=max_workers) as executor:
        futures = [executor.submit(convert_single_page, task) for task in tasks]
        for future in as_completed(futures):
            page_num, size_kb = future.result()
            completed_count += 1
            print(f"[{completed_count:03d}/{total_pages}] Sayfa {page_num:03d} tamamlandı -> {page_num:03d}.webp ({size_kb:.1f} KB)")

    print(f"\n {total_pages} sayfanın tamamı başarıyla dönüştürüldü.")

if __name__ == "__main__":
    main()