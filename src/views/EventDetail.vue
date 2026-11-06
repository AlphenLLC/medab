<template>
  <div v-if="selectedItem" class="event-detail-page">
    <header class="hero">
      <img :src="selectedItem.heroResim" :alt="selectedItem.baslik" class="hero-bg" />
      <div class="hero-content">
        <h1>{{ selectedItem.baslik }}</h1>
        <p class="date">{{ selectedItem.tarih }} | {{ selectedItem.yer }}</p>
        <a
          v-if="selectedItem.basvuruLinki"
          :href="selectedItem.basvuruLinki"
          target="_blank"
          rel="noopener noreferrer"
          class="btn_apply"
        >
          Hemen Başvur
        </a>
      </div>
    </header>

    <main class="content-container">
      <template v-for="(blok, index) in selectedItem.icerik" :key="index">
        <!-- Standart Metin ve Resim Modülleri -->
        <h2 v-if="blok.tip === 'baslik'">{{ blok.metin }}</h2>
        <p v-else-if="blok.tip === 'paragraf'">{{ blok.metin }}</p>
        <div v-else-if="blok.tip === 'resim'" class="content-image">
          <img :src="blok.url" :alt="blok.alt || selectedItem.baslik" />
        </div>

        <!-- Sorumlu Ekip Alanı -->
        <div v-else-if="blok.tip === 'ekip' && blok.uyeler && blok.uyeler.length > 0" class="team-section">
          <div class="team-toggle-header" @click="ekipAcik = !ekipAcik">
            <div class="header-titles">
              <h2 class="team-title">SORUMLU EKİP</h2>
              <p class="team-subtitle">Etkinliğin planlama, saha ve koordinasyon süreçlerinde yer alan MedAB ekibi.</p>
            </div>
            <span class="static-toggle-arrow">{{ ekipAcik ? '▲' : '▼' }}</span>
          </div>

          <div v-if="ekipAcik" class="credits-grid">
            <div
              v-for="member in blok.uyeler"
              :key="member.id"
              class="credit-item"
            >
              <img
                v-if="member.image || member.resim"
                :src="member.image || member.resim"
                :alt="member.name || member.isim"
                class="credit-photo"
              />

              <div class="credit-body">
                <h4 class="credit-name">{{ member.name || member.isim }}</h4>
                <p v-if="member.role || member.unvan" class="credit-role">
                  {{ member.role || member.unvan }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Modüler Galeri Alanı -->
        <section v-else-if="blok.tip === 'galeri' && blok.gorseller && blok.gorseller.length > 0" class="gallery-section">
          <h2>Etkinlikten Kareler</h2>
          <div class="gallery-grid">
            <img
              v-for="(imgUrl, imgIndex) in blok.gorseller"
              :key="'gal-' + imgIndex"
              :src="imgUrl"
              :alt="`${selectedItem.baslik} - Galeri Fotoğrafı ${imgIndex + 1}`"
              loading="lazy"
              @click="secilenGorsel = imgUrl"
            />
          </div>
        </section>
      </template>
    </main>

    <!-- Tam Ekran Fotoğraf Büyütme Modalı (Lightbox) -->
    <Teleport to="body">
      <div
        v-if="secilenGorsel"
        class="lightbox-overlay"
        @click="secilenGorsel = null"
      >
        <button class="lightbox-close" aria-label="Kapat" @click.stop="secilenGorsel = null">✕</button>
        <div class="lightbox-container" @click.stop>
          <img :src="secilenGorsel" alt="Büyütülmüş Fotoğraf" />
        </div>
      </div>
    </Teleport>
  </div>
  <div v-else class="not-found">
    <h1>Etkinlik Bulunamadı</h1>
    <router-link to="/etkinlikler/">Etkinliklere Dön</router-link>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { eventCatalog } from '../data/eventCatalog.js'
import { toTitleCase } from '../utils/formatters.js'

const SITE_URL = 'https://imumedab.com'
const route = useRoute()
const ekipAcik = ref(false)
const secilenGorsel = ref(null)

// URL sonunda "/" olsa bile id'yi temizleyip eşleştirir
const selectedItem = computed(() => {
  const cleanId = String(route.params.id || '').replace(/\/+$/, '')
  return eventCatalog.find(item => item.id === cleanId)
})

// Türkçe tarihleri ISO-8601 (YYYY-MM-DD) formatına çeviren yardımcı fonksiyon
const parseTurkishDateToIso = (dateStr) => {
  if (!dateStr) return '2026-01-01'

  const months = {
    ocak: '01', şubat: '02', mart: '03', nisan: '04',
    mayıs: '05', haziran: '06', temmuz: '07', ağustos: '08',
    eylül: '09', ekim: '10', kasım: '11', aralık: '12'
  }

  const parts = dateStr.trim().toLocaleLowerCase('tr-TR').split(/\s+/)
  if (parts.length >= 3) {
    const rawDay = parts[0].split('-')[0] // "3-5-6 Mart" durumunda ilk gün olan 3'ü alır
    const day = rawDay.padStart(2, '0')
    const month = months[parts[1]] || '01'
    const year = parts[2]
    return `${year}-${month}-${day}`
  }
  return '2026-01-01'
}

// Dinamik meta etiket güncelleyici
const updateMetaTag = (attrName, attrValue, content) => {
  if (!content) return
  let element = document.querySelector(`meta[${attrName}="${attrValue}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attrName, attrValue)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

const handleKeydown = (e) => {
  if (e.key === 'Escape') {
    secilenGorsel.value = null
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  const script = document.getElementById('event-jsonld-schema')
  if (script) script.remove()
})

watchEffect(() => {
  if (!selectedItem.value) return

  const titleFormatted = toTitleCase(selectedItem.value.baslik)
  const fullPageTitle = `${titleFormatted} | MedAB`
  const canonicalUrl = `${SITE_URL}/etkinlik/${selectedItem.value.id}/`
  const eventDesc = selectedItem.value.aciklama || 'İstanbul Medeniyet Üniversitesi MedAB Kulübü Etkinliği'
  const rawImage = selectedItem.value.heroResim || selectedItem.value.resim || `${SITE_URL}/banner.png`
  const absoluteImage = rawImage.startsWith('http') ? rawImage : `${SITE_URL}${rawImage.startsWith('/') ? '' : '/'}${rawImage}`

  // 1. Sayfa Başlığı ve Meta Etiketlerini Güncelle
  document.title = fullPageTitle
  updateMetaTag('name', 'description', eventDesc)
  updateMetaTag('property', 'og:title', fullPageTitle)
  updateMetaTag('property', 'og:description', eventDesc)
  updateMetaTag('property', 'og:url', canonicalUrl)
  updateMetaTag('property', 'og:image', absoluteImage)
  updateMetaTag('name', 'twitter:title', fullPageTitle)
  updateMetaTag('name', 'twitter:description', eventDesc)
  updateMetaTag('name', 'twitter:image', absoluteImage)

  // 2. Canonical Linki Güncelle (Her zaman sonu / ile biten standart URL)
  let canonicalEl = document.querySelector('link[rel="canonical"]')
  if (!canonicalEl) {
    canonicalEl = document.createElement('link')
    canonicalEl.setAttribute('rel', 'canonical')
    document.head.appendChild(canonicalEl)
  }
  canonicalEl.setAttribute('href', canonicalUrl)

  // 3. JSON-LD Yapılandırılmış Veri Şemasını Güncelle
  const schemaScriptId = 'event-jsonld-schema'
  let script = document.getElementById(schemaScriptId)

  if (!script) {
    script = document.createElement('script')
    script.id = schemaScriptId
    script.type = 'application/ld+json'
    document.head.appendChild(script)
  }

  const eventIsoDate = parseTurkishDateToIso(selectedItem.value.tarih)

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: titleFormatted,
    description: eventDesc,
    url: canonicalUrl,
    startDate: `${eventIsoDate}T10:00:00+03:00`,
    endDate: `${eventIsoDate}T17:00:00+03:00`,
    image: [absoluteImage],
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: selectedItem.value.yer || 'İstanbul Medeniyet Üniversitesi',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'İstanbul',
        addressCountry: 'TR'
      }
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'TRY',
      availability: 'https://schema.org/InStock',
      url: selectedItem.value.basvuruLinki || canonicalUrl
    },
    organizer: {
      '@type': 'Organization',
      name: 'MedAB',
      url: `${SITE_URL}/`
    }
  }

  script.textContent = JSON.stringify(schemaData)
})
</script>

<style lang="scss" scoped>
.event-detail-page {
  color: #fff;
  background-color: #000000;
  min-height: 100vh;
  padding-top: 70px;
  padding-bottom: 2.5rem;

  .hero {
    position: relative;
    height: 65vh;
    min-height: 480px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    padding-top: 0;
    box-sizing: border-box;

    .hero-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0.45;
    }

    .hero-content {
      position: relative;
      z-index: 1;
      text-align: center;
      padding: 0 2rem;

      h1 {
        font-family: 'Archivo Black', sans-serif;
        font-size: clamp(2.4rem, 5vw, 3.8rem);
        margin-bottom: 0.5rem;
        text-transform: uppercase;
        letter-spacing: -1.5px;
        line-height: 1.05;
      }

      .date {
        font-family: 'Montserrat', sans-serif;
        font-size: 1.1rem;
        color: #cccccc;
        margin-bottom: 2.5rem;
      }

      .btn_apply {
        display: inline-block;
        padding: 14px 34px;
        background-color: #ffffff;
        color: #000000;
        text-decoration: none;
        font-family: 'Montserrat', sans-serif;
        font-weight: 700;
        font-size: 1rem;
        border-radius: 50px;
        transition: background 0.2s;

        &:hover {
          background-color: #dddddd;
        }
      }
    }
  }

  .content-container {
    max-width: 840px;
    margin: 3.5rem auto 1.5rem auto;
    padding: 0 1.5rem;

    h2 {
      font-family: 'Archivo Black', sans-serif;
      font-size: 1.7rem;
      text-align: left;
      margin: 3.5rem 0 1rem;
      color: #ffffff;
      letter-spacing: -0.8px;
      text-transform: uppercase;
      border-bottom: 1px solid #18181b;
      padding-bottom: 0.6rem;
    }

    p {
      font-family: 'Montserrat', sans-serif;
      font-size: 1.05rem;
      line-height: 1.75;
      color: #a1a1aa;
      margin-bottom: 1.5rem;
      text-align: left;
    }

    .content-image {
      margin: 3rem 0;
      img {
        width: 100%;
        border-radius: 0;
        border: 1px solid #1c1c1f;
      }
    }

    .team-section {
      margin-top: 3.5rem;

      .team-toggle-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        padding: 0.5rem 0 1.2rem 0;
        user-select: none;
        border-bottom: 1px solid #18181b;

        .header-titles {
          text-align: left;

          .team-title {
            font-family: 'Archivo Black', sans-serif;
            font-size: 1.7rem;
            color: #ffffff;
            letter-spacing: -0.8px;
            margin: 0 0 6px 0;
            text-transform: uppercase;
            border-bottom: none;
            padding-bottom: 0;
          }

          .team-subtitle {
            font-family: 'Montserrat', sans-serif;
            font-size: 0.95rem;
            font-style: italic;
            color: #71717a;
            margin: 0;
            line-height: 1.5;
          }
        }

        .static-toggle-arrow {
          font-size: 11px;
          color: #71717a;
          margin-left: 1.5rem;
          user-select: none;
          transition: none;
        }

        &:hover .static-toggle-arrow {
          color: #ffffff;
        }
      }

      .credits-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        column-gap: 3rem;
        row-gap: 0;
        width: 100%;
        padding-top: 0.5rem;
        padding-bottom: 0;
      }

      .credit-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 0;
        border-bottom: 1px solid #141416;

        .credit-photo {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          object-fit: cover;
          filter: grayscale(100%);
          flex-shrink: 0;
          display: block;
        }

        .credit-body {
          display: flex;
          flex-direction: column;
          gap: 2px;
          overflow: hidden;
          text-align: left;

          .credit-name {
            font-family: 'Archivo Black', sans-serif;
            font-size: 14.5px;
            font-style: italic;
            color: #f4f4f5;
            margin: 0;
            letter-spacing: -0.2px;
            text-transform: uppercase;
            line-height: 1.25;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .credit-role {
            font-family: 'Montserrat', sans-serif;
            font-size: 12px;
            font-style: italic;
            color: #71717a;
            margin: 0;
            font-weight: 500;
            line-height: 1.3;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }

    .gallery-section {
      margin-top: 4rem;

      .gallery-grid {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1.5rem;
        margin-top: 2rem;
        width: 100%;

        img {
          box-sizing: border-box;
          width: calc(50% - 0.75rem);
          height: 250px;
          object-fit: cover;
          border-radius: 0;
          transition: transform 0.25s ease;
          cursor: pointer;

          &:hover {
            transform: scale(1.02);
          }
        }
      }
    }
  }

  .not-found {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;

    h1 {
      font-family: 'Archivo Black', sans-serif;
      margin-bottom: 1rem;
    }

    a {
      font-family: 'Montserrat', sans-serif;
      color: #fff;
      text-decoration: underline;
    }
  }

  @media (max-width: 768px) {
    padding-top: 70px;
    padding-bottom: 2rem;

    .hero {
      height: 52vh;
      min-height: 380px;

      .hero-content h1 {
        font-size: 2.2rem;
      }
    }

    .content-container {
      margin-bottom: 1rem;

      .team-section {
        .credits-grid {
          grid-template-columns: 1fr;
          column-gap: 0;
        }
      }
      .gallery-section .gallery-grid img {
        width: 100%;
        height: 220px;
      }
    }
  }
}

.lightbox-overlay {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.94);
  backdrop-filter: blur(8px);
  z-index: 999999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  box-sizing: border-box;
  cursor: zoom-out;

  .lightbox-close {
    position: absolute;
    top: 24px;
    right: 28px;
    background: transparent;
    border: none;
    color: #a1a1aa;
    font-size: 24px;
    cursor: pointer;
    line-height: 1;
    padding: 8px;
    transition: color 0.2s ease;

    &:hover {
      color: #ffffff;
    }
  }

  .lightbox-container {
    max-width: 92vw;
    max-height: 88vh;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      max-width: 100%;
      max-height: 88vh;
      object-fit: contain;
      border-radius: 0;
      border: 1px solid #27272a;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.9);
      user-select: none;
    }
  }
}
</style>