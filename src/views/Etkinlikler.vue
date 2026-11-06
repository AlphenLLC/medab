<template>
  <div class="etkinlikler-sayfasi">
    <div class="hero-arkaplan">
      <div class="fade-overlay"></div>
    </div>

    <section class="etkinlikler-container">
      <div class="baslik-kapsayici">
        <h1 class="editorial-title">ETKİNLİKLER</h1>
        <p class="baslik-aciklamasi">
          Akademik gelişim, pratik atölyeler ve bilimsel sohbetler. Kulübümüzün en güncel faaliyetlerini buradan takip edebilirsiniz.
        </p>
      </div>

      <div class="etkinlik-listesi">
        <EtkinlikKarti
          v-for="item in etkinlikListesi"
          :key="item.id"
          :etkinlik="item"
        />
      </div>

      <div class="yukleme-alani">
        <div class="liste-sonu-notu">
          <span>Yeni etkinliklerde yer almak ve sürece katılmak için</span>
          <a
            href="https://instagram.com/imumedab"
            target="_blank"
            rel="noopener noreferrer"
            class="link-inline"
          >
            @imumedab <AppIcon name="arrow-right" class="link-arrow" :size="12" />
          </a>
        </div>
      </div>
    </section>

    <div class="karanlik-gecis"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import EtkinlikKarti from '../components/EtkinlikKarti.vue'
import { eventCatalog } from '../data/eventCatalog.js'
import { toTitleCase } from '../utils/formatters.js'

const SITE_URL = 'https://imumedab.com'
const etkinlikListesi = ref(eventCatalog || [])

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

const injectEventsSchema = () => {
  const pageTitle = 'Etkinlikler | MedAB'
  const pageDesc = 'MedAB tarafından düzenlenen tüm akademik sempozyumlar, klinik atölyeler ve sosyal etkinlikler.'
  const canonicalUrl = `${SITE_URL}/etkinlikler/`

  document.title = pageTitle
  updateMetaTag('name', 'description', pageDesc)
  updateMetaTag('property', 'og:title', pageTitle)
  updateMetaTag('property', 'og:description', pageDesc)
  updateMetaTag('property', 'og:url', canonicalUrl)

  let canonicalEl = document.querySelector('link[rel="canonical"]')
  if (!canonicalEl) {
    canonicalEl = document.createElement('link')
    canonicalEl.setAttribute('rel', 'canonical')
    document.head.appendChild(canonicalEl)
  }
  canonicalEl.setAttribute('href', canonicalUrl)

  const schemaScriptId = 'events-list-jsonld-schema'
  let script = document.getElementById(schemaScriptId)
  if (!script) {
    script = document.createElement('script')
    script.id = schemaScriptId
    script.type = 'application/ld+json'
    document.head.appendChild(script)
  }

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: pageTitle,
    description: pageDesc,
    url: canonicalUrl,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: etkinlikListesi.value.map((ev, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: toTitleCase(ev.baslik),
        url: `${SITE_URL}/etkinlik/${ev.id}/`
      }))
    }
  }

  script.textContent = JSON.stringify(schemaData)
}

onMounted(() => {
  injectEventsSchema()
})

onUnmounted(() => {
  const script = document.getElementById('events-list-jsonld-schema')
  if (script) script.remove()
})
</script>

<style lang="scss" scoped>
.etkinlikler-sayfasi {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: #000000;
}

.hero-arkaplan {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 520px;
  background-image: url('/branding/workshop-banner.webp');
  background-size: cover;
  background-position: center 20%;
  z-index: 0;
  pointer-events: none;

  .fade-overlay {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.25) 0%,
      rgba(0, 0, 0, 0.8) 60%,
      #000000 100%
    );
  }
}

.etkinlikler-container {
  max-width: 820px;
  margin: 0 auto;
  padding-top: 155px;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-bottom: 3.5rem;
  position: relative;
  z-index: 1;

  .baslik-kapsayici {
    position: relative;
    text-align: center;
    margin-bottom: 3.5rem;

    .editorial-title {
      font-family: 'Archivo Black', sans-serif;
      font-size: clamp(2.8rem, 5.8vw, 4.2rem);
      color: #ffffff;
      letter-spacing: -2px;
      line-height: 1.0;
      margin: 0 0 1.5rem 0;
      text-transform: uppercase;
      text-shadow: 0 4px 20px rgba(0, 0, 0, 0.95);
    }

    .baslik-aciklamasi {
      font-family: 'Montserrat', sans-serif;
      color: #a1a1aa;
      font-size: 1.05rem;
      font-weight: 400;
      max-width: 680px;
      margin: 0 auto;
      line-height: 1.7;
      text-align: center;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.9);
    }
  }

  .etkinlik-listesi {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    min-height: 320px;

    :deep(> *:nth-child(n + 3)) {
      content-visibility: auto;
      contain-intrinsic-size: auto 240px;
    }
  }

  .yukleme-alani {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 60px;
    margin-top: 2.5rem;

    .liste-sonu-notu {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-family: 'Montserrat', sans-serif;
      font-size: 0.88rem;
      color: #71717a;

      .link-inline {
        color: #e4e4e7;
        text-decoration: none;
        font-weight: 600;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        transition: color 0.2s ease;

        .link-arrow {
          display: inline-block;
          transition: transform 0.2s ease;
        }

        &:hover {
          color: #2563eb;

          .link-arrow {
            transform: translateX(3px);
          }
        }
      }
    }
  }
}

.karanlik-gecis {
  position: relative;
  width: 100%;
  height: 80px;
  background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%);
  margin-top: -80px;
  z-index: 0;
  pointer-events: none;
}

@media (max-width: 768px) {
  .hero-arkaplan {
    height: 380px;
  }

  .etkinlikler-container {
    padding-top: 110px;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    padding-bottom: 2rem;

    .baslik-kapsayici {
      margin-bottom: 2.5rem;

      .editorial-title {
        font-size: 2.4rem;
        letter-spacing: -1.2px;
        margin-bottom: 1.2rem;
      }

      .baslik-aciklamasi {
        font-size: 0.95rem;
        line-height: 1.6;
      }
    }

    .etkinlik-listesi {
      :deep(> *:nth-child(n + 3)) {
        contain-intrinsic-size: auto 360px;
      }
    }

    .yukleme-alani {
      .liste-sonu-notu {
        flex-direction: column;
        gap: 6px;
        font-size: 0.8rem;
        text-align: center;
      }
    }
  }
}
</style>