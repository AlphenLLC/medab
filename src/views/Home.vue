<template>
    <div class="home-page">
        <Hero />
        <About />
        <Showcase />
        <Banner />
    </div>
</template>

<script setup>
import { watchEffect, onUnmounted } from 'vue'
import Hero from '../components/Hero.vue'
import About from '../components/About.vue'
import Showcase from '../components/Showcase.vue'
import Banner from '../components/Banner.vue'

const SITE_URL = 'https://imumedab.com'

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
  const pageTitle = 'MedAB | Medeniyet Akademik ve Bilimsel Faaliyetler Kulübü'
  const pageDesc = 'İstanbul Medeniyet Üniversitesi MedAB resmi web sitesi. Tıp ve bilim odaklı akademik faaliyetler, araştırmalar ve etkinlikler.'
  const canonicalUrl = `${SITE_URL}/`
  const coverImage = `${SITE_URL}/banner.png`

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

  const schemaScriptId = 'home-jsonld-schema'
  let script = document.getElementById(schemaScriptId)
  if (!script) {
    script = document.createElement('script')
    script.id = schemaScriptId
    script.type = 'application/ld+json'
    document.head.appendChild(script)
  }

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'İstanbul Medeniyet Üniversitesi MedAB',
    url: canonicalUrl,
    logo: coverImage,
    sameAs: [
      'https://instagram.com/imumedab'
    ]
  }

  script.textContent = JSON.stringify(schemaData)
})

onUnmounted(() => {
  const script = document.getElementById('home-jsonld-schema')
  if (script) script.remove()
})
</script>

<style scoped>
.home-page {
  width: 100%;
  min-height: 100vh;
  background-color: #050505;
  /* CLS Kilidi: Alt bileşenlerin yüklenme anında ana sayfayı zıplatmasını engeller */
  contain: layout style;
}
</style>