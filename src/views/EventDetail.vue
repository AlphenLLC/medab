<template>
  <div class="event-detail-page" v-if="selectedItem"> 
    <header class="hero">
      <img :src="selectedItem.heroResim" :alt="selectedItem.baslik" class="hero-bg" />
      <div class="hero-content">
        <h1>{{ selectedItem.baslik }}</h1>
        <p class="date">{{ selectedItem.tarih }} - {{ selectedItem.yer }}</p>
        <a 
          v-if="selectedItem.basvuruLinki" 
          :href="selectedItem.basvuruLinki" 
          target="_blank" 
          class="btn_apply"
        >
          Hemen Başvur
        </a>
      </div>
    </header>
    <main class="content-container">
      <template v-for="(blok, index) in selectedItem.icerik" :key="index">    
        <h2 v-if="blok.tip === 'baslik'">{{ blok.metin }}</h2>    
        <p v-else-if="blok.tip === 'paragraf'">{{ blok.metin }}</p>  
        <div v-else-if="blok.tip === 'resim'" class="content-image">
          <img :src="blok.url" :alt="blok.alt" />
        </div>
      </template>
    </main>
    <section class="gallery-section" v-if="selectedItem.galeri && selectedItem.galeri.length > 0">
      <h2>Galeri</h2>
      <div class="gallery-grid">
        <img 
          v-for="(imgUrl, index) in selectedItem.galeri" 
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
  min-height: 100vh;
  padding-top: 120px; 
  padding-bottom: 4rem;

  .hero {
    position: relative;
    height: 70vh; 
    min-height: 500px;
    width: 100%;
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
      padding: 0 2rem;

      h1 { 
        font-size: 3.5rem; 
        margin-bottom: 0.5rem; 
        text-transform: uppercase; 
        font-weight: 800;
        letter-spacing: 1px;
      }
      
      .date { 
        font-size: 1.2rem; 
        color: #cccccc; 
        margin-bottom: 2.5rem; 
      }
      
      .btn_apply {
        display: inline-block;
        padding: 16px 36px;
        background-color: #ffffff;
        color: #000000;
        text-decoration: none;
        font-weight: 700;
        font-size: 1.1rem;
        border-radius: 50px;
        transition: transform 0.2s, background 0.3s;
        
        &:hover { 
          background-color: #dddddd; 
          transform: translateY(-2px);
        }
      }
    }
  }

  .content-container {
    max-width: 800px; 
    margin: 4rem auto;
    padding: 0 2rem;

    h2 {
      font-size: 1.6rem; 
      text-align: left; 
      margin: 3rem 0 1rem;
      color: #ffffff;
      font-weight: 700;
      border-bottom: 1px solid #222;
      padding-bottom: 0.5rem;
    }

    p {
      font-size: 1.15rem;
      line-height: 1.8;
      color: #bbbbbb;
      margin-bottom: 1.5rem;
      text-align: left;
    }

    .content-image {
      margin: 3rem 0;
      img {
        width: 100%;
        border-radius: 8px;
        border: 1px solid #222;
      }
    }
  }

  .gallery-section {
    max-width: 1000px;
    margin: 0 auto 3rem;
    padding: 0 2rem;
    border-top: 1px solid #222;
    padding-top: 3rem;

    h2 {
      text-align: center;
      margin-bottom: 2.5rem;
      font-size: 1.8rem;
    }

    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.5rem;

      img {
        width: 100%;
        height: 250px;
        object-fit: cover;
        border-radius: 8px;
        transition: transform 0.3s;
        cursor: pointer;

        &:hover {
          transform: scale(1.03); 
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
    
    h1 { margin-bottom: 1rem; }
    
    a {
      color: #fff;
      text-decoration: underline;
    }
  }

  @media (max-width: 768px) {
    .event-detail-page {
      padding-top: 100px;
    }
    .hero {
      height: 60vh;
      .hero-content h1 {
        font-size: 2.5rem;
      }
    }
  }
}
</style>