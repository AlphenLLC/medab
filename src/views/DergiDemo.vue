<template>
  <div class="dergi-sayfasi">
    <main class="dergi-container">
      <!-- NEWSWIRE Başlık Alanı -->
      <header class="header-wrapper">
        <div class="header-spotlight" aria-hidden="true"></div>
        <div class="dergi-header">
          <h1 class="main-title">NEWSWIRE</h1>
          
          <p v-if="aktifDergi.aciklama" class="issue-description">
            {{ aktifDergi.aciklama }}
          </p>

          <div class="select-wrapper">
            <select v-model.number="seciliSayi" class="year-dropdown" aria-label="Sayı Seçiniz">
              <option v-for="dergi in dergiListesi" :key="dergi.id" :value="dergi.id">
                {{ dergi.baslik }}
              </option>
            </select>
            <AppIcon name="chevron-down" class="select-icon" :size="12" />
          </div>
        </div>
      </header>

      <section ref="okuyucuAlaniRef" class="okuyucu-alani">
        <Reader
          v-if="aktifDergi.sayfalar && aktifDergi.sayfalar.length > 0"
          :key="`${aktifDergi.id}-${aktifDergi.sayfalar.length}`"
          :page-list="aktifDergi.sayfalar"
          :pdf-url="pdfTamUrl"
          :pdf-adi="aktifDergi.indirilecekDosyaAdi || `${aktifDergi.klasor}.pdf`"
        />
      </section>

      <article class="seo-dergi-ozeti">
        <h2>{{ aktifDergi.tamBaslik || `MedAB Perspektif & Newswire - ${aktifDergi.baslik}` }}</h2>
        <p>{{ aktifDergi.seoAciklama }}</p>
        <a v-if="pdfTamUrl" :href="pdfTamUrl" :download="aktifDergi.indirilecekDosyaAdi">
          {{ aktifDergi.baslik }} PDF İndir
        </a>
      </article>
    </main>

    <!-- Orijinal Görsel Katmanlı Basılı Nüsha Banner'ı -->
    <section class="destek-banner">
      <div class="bg-layer"></div>
      <div class="dark-overlay"></div>
      <div class="grain-overlay"></div>
      <div class="content-container">          
        <div class="header-group">
          <h2>BASILI NÜSHA SİPARİŞ ET</h2>
        </div>
        
        <p class="description">
          MedAB Perspektif'in basılı nüshasını sipariş ederek yayınımızın sürekliliğini sağlamamıza yardımcı olun.
        </p>
        
        <a
          href="https://forms.gle/FHeSpYJwVNdj45gW6"
          target="_blank"
          rel="noopener noreferrer"
          class="pill-btn"
        >
          <span>Sipariş Ver</span>
          <AppIcon name="arrow-up-right" class="btn-arrow" :size="13" :stroke-width="2.5" />
        </a>          
      </div>
    </section>

    <!-- Sayfa Kaydırma FAB -->
    <button
      class="mobile-scroll-fab"
      :title="isNearBottom ? 'Yukarı Çık' : 'Aşağı İn'"
      aria-label="Sayfayı Kaydır"
      @click="togglePageScroll"
    >
      <AppIcon :name="isNearBottom ? 'arrow-up' : 'arrow-down'" :size="16" />
    </button>
  </div>
</template>

<script setup>
import { ref, computed, watch, watchEffect, onMounted, onBeforeUnmount } from 'vue'
import { PDFDocument } from 'pdf-lib'
import Reader from '../components/Reader.vue'

import dergi1PdfUrl from '../assets/dergi/dergi1.pdf?url'

const SITE_URL = 'https://imumedab.com'
const baseUrl = import.meta.env.BASE_URL
const okuyucuAlaniRef = ref(null)
const isNearBottom = ref(false)

const sayfaListesiUret = (klasorAdi, toplamSayfa) => {
  return Array.from({ length: toplamSayfa }, (_, i) => {
    const sayfaNo = String(i + 1).padStart(3, '0')
    return `/magazines/${klasorAdi}/${sayfaNo}.webp`
  })
}

const klasordekiResimleriSay = async (klasorAdi) => {
  const sayfalar = []
  let sayfaNo = 1

  while (sayfaNo <= 200) {
    const formatliNo = String(sayfaNo).padStart(3, '0')
    const relativePath = `/magazines/${klasorAdi}/${formatliNo}.webp`
    const fetchUrl = `${baseUrl}magazines/${klasorAdi}/${formatliNo}.webp`

    try {
      const res = await fetch(fetchUrl, { method: 'HEAD' })
      const contentType = res.headers.get('content-type') || ''
      if (res.ok && contentType.startsWith('image/')) {
        sayfalar.push(relativePath)
        sayfaNo++
      } else {
        break
      }
    } catch {
      break
    }
  }
  return sayfalar
}

const dergiListesi = ref([
  {
    id: 1,
    sayiNo: 1,
    yayinTarihi: '2026-10-29',
    baslik: 'Sayı 1 — Ekim 2026',
    tamBaslik: 'MedAB Perspektif (Newswire) Dergisi Sayı 1 — Kardiyoloji Özel Sayısı (Ekim 2026)',
    aciklama: 'Kardiyoloji temalı ilk sayımız.',
    seoAciklama: 'İstanbul Medeniyet Üniversitesi Tıp Fakültesi MedAB (Medeniyet Akademik ve Bilimsel Faaliyetler Kulübü) tarafından yayınlanan MedAB Perspektif Newswire dergisinin Ekim 2026 tarihli 1. sayısı. Kardiyoloji ve kardiyovasküler sistem temalı bilimsel öğrenci makaleleri, klinik incelemeler, tıp tarihi yazıları ve akademik röportajlar içerir.',
    klasor: 'sayi-1',
    pdfUrl: dergi1PdfUrl,
    indirilecekDosyaAdi: 'MedAB-Newswire-Sayi-1.pdf',
    sayfalar: sayfaListesiUret('sayi-1', 51)
  }
])

const seciliSayi = ref(1)

const aktifDergi = computed(() => {
  return dergiListesi.value.find(d => d.id === seciliSayi.value) || dergiListesi.value[0]
})

const pdfTamUrl = computed(() => {
  return aktifDergi.value?.pdfUrl || ''
})

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

watchEffect(() => {
  if (!aktifDergi.value) return

  const dergi = aktifDergi.value
  const pageTitle = `Dergi | MedAB`
  const pageDesc = dergi.seoAciklama || dergi.aciklama
  const canonicalUrl = `${SITE_URL}/dergi/`
  const coverImage = dergi.sayfalar?.length > 0
    ? `${SITE_URL}${dergi.sayfalar[0]}`
    : `${SITE_URL}/banner.png`

  document.title = pageTitle
  updateMetaTag('name', 'description', pageDesc)
  updateMetaTag('property', 'og:title', pageTitle)
  updateMetaTag('property', 'og:description', pageDesc)
  updateMetaTag('property', 'og:url', canonicalUrl)
  updateMetaTag('property', 'og:image', coverImage)
  updateMetaTag('name', 'twitter:title', pageTitle)
  updateMetaTag('name', 'twitter:description', pageDesc)
  updateMetaTag('name', 'twitter:image', coverImage)

  let canonicalEl = document.querySelector('link[rel="canonical"]')
  if (!canonicalEl) {
    canonicalEl = document.createElement('link')
    canonicalEl.setAttribute('rel', 'canonical')
    document.head.appendChild(canonicalEl)
  }
  canonicalEl.setAttribute('href', canonicalUrl)

  const schemaScriptId = 'magazine-jsonld-schema'
  let script = document.getElementById(schemaScriptId)
  if (!script) {
    script = document.createElement('script')
    script.id = schemaScriptId
    script.type = 'application/ld+json'
    document.head.appendChild(script)
  }

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'PublicationIssue',
    name: dergi.tamBaslik || dergi.baslik,
    issueNumber: String(dergi.sayiNo || dergi.id),
    datePublished: dergi.yayinTarihi || '2026-10-29',
    description: pageDesc,
    url: canonicalUrl,
    image: coverImage,
    inLanguage: 'tr-TR',
    numberOfPages: dergi.sayfalar ? dergi.sayfalar.length : 51,
    isPartOf: {
      '@type': 'Periodical',
      name: 'MedAB Perspektif & Newswire',
      publisher: {
        '@type': 'Organization',
        name: 'İstanbul Medeniyet Üniversitesi MedAB',
        url: `${SITE_URL}/`
      }
    }
  }

  script.textContent = JSON.stringify(schemaData)
})

const sayfaSayisiniGuncelle = async (dergi) => {
  const bulunanSayfalar = await klasordekiResimleriSay(dergi.klasor)
  if (bulunanSayfalar.length > 0) {
    dergi.sayfalar = bulunanSayfalar
    return
  }

  try {
    if (!dergi.pdfUrl) return
    const response = await fetch(dergi.pdfUrl)
    if (!response.ok) return

    const buffer = await response.arrayBuffer()
    const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true })
    const pdfSayfaSayisi = pdfDoc.getPageCount()

    if (pdfSayfaSayisi > 0) {
      dergi.sayfalar = sayfaListesiUret(dergi.klasor, pdfSayfaSayisi)
    }
  } catch (e) {
  }
}

let touchStartX = 0
let touchStartY = 0
let lastTouchY = 0
let scrollDirection = null 

const onReaderTouchStart = (e) => {
  if (e.touches.length !== 1) return

  if (e.target.closest('.is-zoomed') || e.target.closest('.is-fullscreen') || e.target.closest('.modal-backdrop')) {
    scrollDirection = null
    return
  }

  touchStartX = e.touches[0].clientX
  touchStartY = e.touches[0].clientY
  lastTouchY = touchStartY
  scrollDirection = null
}

const onReaderTouchMove = (e) => {
  if (e.touches.length !== 1) return

  if (e.target.closest('.is-zoomed') || e.target.closest('.is-fullscreen') || e.target.closest('.modal-backdrop')) {
    return
  }

  const currentX = e.touches[0].clientX
  const currentY = e.touches[0].clientY
  const deltaX = Math.abs(currentX - touchStartX)
  const deltaY = Math.abs(currentY - touchStartY)

  if (!scrollDirection) {
    if (deltaY > 6 && deltaY > deltaX * 1.1) {
      scrollDirection = 'vertical'
    } else if (deltaX > 6 && deltaX > deltaY) {
      scrollDirection = 'horizontal'
    }
  }

  if (scrollDirection === 'vertical') {
    const moveY = currentY - lastTouchY
    window.scrollBy(0, -moveY)
    lastTouchY = currentY
  }
}

const onReaderTouchEnd = () => {
  scrollDirection = null
}

const checkScrollPosition = () => {
  const scrollY = window.scrollY || window.pageYOffset
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight
  isNearBottom.value = maxScroll > 80 && scrollY > maxScroll / 2
}

const togglePageScroll = () => {
  if (isNearBottom.value) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } else {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })
  }
}

watch(seciliSayi, () => {
  if (aktifDergi.value) {
    sayfaSayisiniGuncelle(aktifDergi.value)
  }
})

onMounted(() => {
  if (aktifDergi.value) {
    sayfaSayisiniGuncelle(aktifDergi.value)
  }

  if (okuyucuAlaniRef.value) {
    okuyucuAlaniRef.value.addEventListener('touchstart', onReaderTouchStart, { passive: true, capture: true })
    okuyucuAlaniRef.value.addEventListener('touchmove', onReaderTouchMove, { passive: true, capture: true })
    okuyucuAlaniRef.value.addEventListener('touchend', onReaderTouchEnd, { passive: true })
    okuyucuAlaniRef.value.addEventListener('touchcancel', onReaderTouchEnd, { passive: true })
  }

  window.addEventListener('scroll', checkScrollPosition, { passive: true })
})

onBeforeUnmount(() => {
  if (okuyucuAlaniRef.value) {
    okuyucuAlaniRef.value.removeEventListener('touchstart', onReaderTouchStart, { capture: true })
    okuyucuAlaniRef.value.removeEventListener('touchmove', onReaderTouchMove, { capture: true })
    okuyucuAlaniRef.value.removeEventListener('touchend', onReaderTouchEnd)
    okuyucuAlaniRef.value.removeEventListener('touchcancel', onReaderTouchEnd)
  }
  window.removeEventListener('scroll', checkScrollPosition)
  const script = document.getElementById('magazine-jsonld-schema')
  if (script) script.remove()
})
</script>

<style scoped>
.dergi-sayfasi {
  position: relative;
  width: 100%;
  min-height: 100dvh;
  background-color: #050507;
  color: #f4f4f5;
  font-family: 'Montserrat', sans-serif;
  overflow-x: hidden;
  box-sizing: border-box;
}

.dergi-sayfasi *,
.dergi-sayfasi *::before,
.dergi-sayfasi *::after {
  box-sizing: border-box;
}

.seo-dergi-ozeti {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.dergi-container {
  position: relative;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 110px 20px 36px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
}

.header-wrapper {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 10px 0 4px;
}

.header-spotlight {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 560px;
  max-width: 92vw;
  height: 150px;
  background: radial-gradient(ellipse at center, rgba(220, 38, 38, 0.18) 0%, rgba(220, 38, 38, 0.04) 55%, transparent 75%);
  pointer-events: none;
  z-index: 0;
}

.dergi-header {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 12px;
  max-width: 720px;
  width: 100%;
}

.main-title {
  font-family: 'Archivo Black', sans-serif;
  font-size: clamp(2.4rem, 4.4vw, 3.2rem);
  line-height: 1;
  letter-spacing: -1.2px;
  color: #ffffff;
  margin: 0;
  text-shadow: 0 0 36px rgba(220, 38, 38, 0.35);
}

.issue-description {
  color: #a1a1aa;
  font-size: 0.92rem;
  font-weight: 500;
  margin: 0;
  letter-spacing: -0.2px;
}

.select-wrapper {
  position: relative;
  min-width: 210px;
  margin-top: 4px;
}

.year-dropdown {
  width: 100%;
  appearance: none;
  -webkit-appearance: none;
  background-color: rgba(18, 18, 22, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.16);
  color: #f4f4f5;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 0.82rem;
  padding: 9px 36px 9px 18px;
  border-radius: 999px;
  cursor: pointer;
  outline: none;
}

.year-dropdown:focus {
  border-color: #ef4444;
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
}

.select-icon {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #a1a1aa;
}

.okuyucu-alani {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  touch-action: pan-y;
}

:deep(.reader-wrapper) {
  width: 100% !important;
  max-width: 1200px !important;
  height: 80vh !important;
  min-height: 620px !important;
  max-height: 860px !important;
  margin: 0 auto !important;
  border-radius: 14px !important;
  border: 1px solid rgba(220, 38, 38, 0.25) !important;
  box-shadow: 0 20px 50px -10px rgba(0, 0, 0, 0.9), 0 0 30px -10px rgba(220, 38, 38, 0.2) !important;
}

:deep(.reader-header),
:deep(.reader-footer) {
  touch-action: pan-y !important;
}

/* Banner Alanı */
.destek-banner {
  position: relative;
  width: 100%;
  min-height: 380px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000000;
  overflow: hidden;
  margin-top: 70px;
  padding: 60px 20px;
  box-sizing: border-box;
}

.bg-layer {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background-image: url('/branding/hakkimizda-workshop-brand.webp');
  background-size: cover;
  background-position: center 35%;
  filter: grayscale(100%) brightness(0.48) contrast(1.25);
  z-index: 1;
}

.dark-overlay {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom, 
    #050507 0%, 
    rgba(5, 5, 7, 0.3) 25%, 
    rgba(5, 5, 7, 0.15) 50%, 
    rgba(5, 5, 7, 0.75) 80%, 
    #050507 100%
  );
  z-index: 2;
  pointer-events: none;
}

.grain-overlay {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.035'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 3;
}

.content-container {
  position: relative;
  z-index: 4;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 580px;
}

.header-group {
  margin-bottom: 12px;
}

.header-group h2 {
  font-family: 'Archivo Black', sans-serif;
  color: #ffffff;
  font-size: clamp(24px, 3.4vw, 34px);
  line-height: 1.1;
  margin: 0;
  letter-spacing: -0.8px;
  text-transform: uppercase;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.95);
}

.description {
  font-family: 'Montserrat', sans-serif;
  color: #e4e4e7;
  font-size: 14.5px;
  line-height: 1.6;
  margin: 0 0 24px 0;
  font-weight: 500;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.95);
}

.pill-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: 'Montserrat', sans-serif;
  background-color: #ffffff;
  color: #000000;
  font-size: 13.5px;
  font-weight: 700;
  padding: 11px 30px;
  border-radius: 9999px;
  text-decoration: none;
  border: 1.5px solid #ffffff;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.6);
  cursor: pointer;
}

.btn-arrow {
  display: inline-block;
  color: #000000;
}

.mobile-scroll-fab {
  display: none;
  position: fixed;
  bottom: 24px;
  right: 16px;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: rgba(18, 18, 22, 0.88);
  border: 1px solid rgba(220, 38, 38, 0.35);
  color: #ef4444;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.7);
  z-index: 80;
  cursor: pointer;
  align-items: center;
  justify-content: center;
}

.mobile-scroll-fab:active {
  transform: scale(0.92);
  background: #dc2626;
  color: #ffffff;
}

@media (max-width: 768px) {
  .dergi-container {
    padding-top: 85px;
    padding-left: 10px;
    padding-right: 10px;
    gap: 20px;
  }

  .main-title {
    font-size: 2rem;
  }

  .header-spotlight {
    width: 320px;
    height: 110px;
  }

  :deep(.reader-wrapper) {
    height: 70vh !important;
    min-height: 440px !important;
    border-radius: 8px !important;
  }

  .destek-banner {
    margin-top: 45px;
    min-height: 330px;
    padding: 48px 16px;
  }

  .bg-layer {
    background-size: auto 155%;
    background-position: center 0%;
  }

  .header-group h2 {
    font-size: 22px;
    letter-spacing: -0.5px;
  }

  .description {
    font-size: 13px;
    line-height: 1.55;
    margin-bottom: 20px;
    padding: 0 4px;
  }

  .pill-btn {
    padding: 10px 24px;
    font-size: 13px;
  }

  .mobile-scroll-fab {
    display: flex;
  }
}
</style>