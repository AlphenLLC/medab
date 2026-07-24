<template>
  <div class="event-detail-page" v-if="selectedItem">
    <header class="hero">
      <img :src="selectedItem.heroImage" :alt="selectedItem.title" class="hero-bg" />
      <div class="hero-content">
        <h1>{{ selectedItem.title }}</h1>
        <p class="date">{{ selectedItem.date }}</p>
        <a :href="selectedItem.applyLink" target="_blank" class="btn_apply">Hemen Başvur</a>
      </div>
    </header>
    <main class="content-container">
      <template v-for="(block, index) in selectedItem.content" :key="index">     
        <h2 v-if="block.type === 'heading'">{{ block.text }}</h2>    
        <p v-else-if="block.type === 'paragraph'">{{ block.text }}</p>      
        <div v-else-if="block.type === 'image'" class="content-image">
          <img :src="block.url" :alt="block.alt" />
        </div>       
      </template>
    </main>
    <section class="gallery-section" v-if="selectedItem.gallery && selectedItem.gallery.length > 0">
      <h2>Etkinlikten Kareler</h2>
      <div class="gallery-grid">
        <img 
          v-for="(imgUrl, index) in selectedItem.gallery" 
          :key="'gal-'+index" 
          :src="imgUrl" 
          alt="Galeri fotoğrafı" 
        />
      </div>
    </section>
  </div>
  <div v-else class="not-found">
    <h1>Etkinlik Bulunamadı</h1>
    <router-link to="/etkinlikler">Etkinliklere Dön</router-link>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { eventCatalog } from '../data/eventCatalog.js'

const route = useRoute()
const selectedItem = computed(() => {
  return eventCatalog.find(item => item.id === route.params.id)
})
</script>

<style lang="scss" scoped>
.event-detail-page {
  color: #fff;
  background-color: #000;

  .hero {
    position: relative;
    height: 50vh;
    min-height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    .hero-bg {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0.4;
    }

    .hero-content {
      position: relative;
      z-index: 1;
      text-align: center;

      h1 { font-size: 3rem; margin-bottom: 0.5rem; text-transform: uppercase; }
      .date { font-size: 1.2rem; color: #aaa; margin-bottom: 2rem; }
      
      .btn_apply {
        display: inline-block;
        padding: 12px 30px;
        background-color: #fff;
        color: #000;
        text-decoration: none;
        font-weight: bold;
        border-radius: 30px;
        transition: background 0.3s;
        &:hover { background-color: #ddd; }
      }
    }
  }

  .content-container {
    max-width: 800px;
    margin: 4rem auto;
    padding: 0 2rem;

    h2 {
      font-size: 2rem;
      margin: 2.5rem 0 1rem;
      color: #fff;
    }

    p {
      font-size: 1.1rem;
      line-height: 1.8;
      color: #ccc;
      margin-bottom: 1.5rem;
    }

    .content-image {
      margin: 2rem 0;
      img {
        width: 100%;
        border-radius: 8px;
      }
    }
  }

  .gallery-section {
    max-width: 1000px;
    margin: 0 auto 5rem;
    padding: 0 2rem;

    h2 {
      text-align: center;
      margin-bottom: 2rem;
    }

    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1rem;

      img {
        width: 100%;
        height: 250px;
        object-fit: cover;
        border-radius: 8px;
        transition: transform 0.3s;
        cursor: pointer;

        &:hover {
          transform: scale(1.02); // Ufak bir zoom efekti
        }
      }
    }
  }
}
</style>