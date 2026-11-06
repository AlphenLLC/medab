<template>
  <div class="galeri-sayfasi">
    <main class="galeri-container">
      
      <!-- Arşiv sayacı kaldırılmış, kompakt editoryal başlık -->
      <header class="compact-header">
        <div class="header-top-row">
          <span class="meta-season">2025 — 2026 DÖNEMİ</span>
        </div>

        <div class="header-main-row">
          <h1 class="page-title">MED<span class="accent-blue">AB</span> EXHIBIT</h1>
          <p class="page-desc">
            Tüm etkinliklerimizden derlenen fotoğraf ve görsellerin yer aldığı sergi.
          </p>
        </div>
      </header>

      <!-- Rastgele Karıştırılmış Veriyi Alan Performanslı Izgara -->
      <GalleryComponent :images="katalogGorselleri" />   
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import GalleryComponent from '../components/GalleryComponent.vue';
import { eventCatalog } from '../data/eventCatalog.js';

const katalogGorselleri = ref([]);

// Diziyi kasmadan rastgele karıştıran Fisher-Yates algoritması
const karistir = (dizi) => {
  const arr = [...dizi];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

onMounted(() => {
  const toplananGorseller = [];

  // eventCatalog içerisindeki tüm etkinlikleri gez ve düzleştir
  eventCatalog.forEach((etkinlik) => {
    if (Array.isArray(etkinlik.icerik)) {
      etkinlik.icerik.forEach((blok) => {
        if (blok.tip === 'resim' && blok.url) {
          toplananGorseller.push({
            url: blok.url,
            baslik: etkinlik.baslik,
            yer: etkinlik.yer,
            tarih: etkinlik.tarih
          });
        } else if (blok.tip === 'galeri' && Array.isArray(blok.gorseller)) {
          blok.gorseller.forEach((gorselUrl) => {
            if (gorselUrl) {
              toplananGorseller.push({
                url: gorselUrl,
                baslik: etkinlik.baslik,
                yer: etkinlik.yer,
                tarih: etkinlik.tarih
              });
            }
          });
        }
      });
    }
  });

  // Mükerrer URL'leri temizle ve rastgele diz
  const benzersizler = Array.from(
    new Map(toplananGorseller.map((item) => [item.url, item])).values()
  );

  katalogGorselleri.value = karistir(benzersizler);
});
</script>

<style lang="scss" scoped>
.galeri-sayfasi {
  width: 100%;
  min-height: 100vh;
  background-color: #000000; 
  color: #ffffff;
}

.galeri-container {
  max-width: 1320px;
  margin: 0 auto;
  padding-top: 110px; 
  padding-left: 2rem;
  padding-right: 2rem;
  padding-bottom: 5rem; 
}

.compact-header {
  margin-bottom: 2.4rem;
  padding-bottom: 1.4rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);

  .header-top-row {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 8px;

    .meta-season {
      font-family: 'Montserrat', sans-serif;
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 1.8px;
      color: #71717a;
      text-transform: uppercase;
    }
  }

  .header-main-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 20px;
  }

  .page-title {
    font-family: 'Archivo Black', sans-serif;
    font-size: clamp(2rem, 3.8vw, 3rem);
    letter-spacing: -1.5px;
    line-height: 1;
    margin: 0;
    text-transform: uppercase;
    white-space: nowrap;

    .accent-blue {
      color: #2563eb;
    }
  }

  .page-desc {
    font-family: 'Montserrat', sans-serif;
    color: #a1a1aa;
    font-size: 0.95rem;
    line-height: 1.5;
    margin: 0;
    text-align: right;
    max-width: 420px;
  }
}

@media (max-width: 768px) {
  .galeri-container {
    padding-top: 85px;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-bottom: 3.5rem;
  }

  .compact-header {
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;

    .header-top-row .meta-season {
      font-size: 0.68rem;
      letter-spacing: 1.2px;
    }

    .header-main-row {
      flex-direction: column;
      align-items: flex-start;
      gap: 6px;
    }

    .page-title {
      font-size: 1.85rem;
      letter-spacing: -1px;
    }

    .page-desc {
      font-size: 0.82rem;
      text-align: left;
      line-height: 1.4;
      color: #71717a;
    }
  }
}
</style>