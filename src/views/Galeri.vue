<template>
  <div class="galeri-sayfasi">
    <div class="hero-arkaplan">
      <div class="fade-overlay"></div>
    </div>
    <section class="galeri-container">
      <div class="baslik-kapsayici">
        <h2>MEDAB EXHIBIT</h2>
        <p class="baslik-aciklamasi">
         Kulüp çalışmalarını inceleyin.
        </p>
      </div>
      <GalleryComponent :images="galleryData" />   
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import GalleryComponent from '../components/GalleryComponent.vue';

const galleryData = ref([
  { url: 'https://r4.wallpaperflare.com/wallpaper/261/957/290/the-sky-night-tent-the-milky-way-wallpaper-86fedc2285962a008d3effabd97bf372.jpg' },
  { url: 'https://r4.wallpaperflare.com/wallpaper/261/957/290/the-sky-night-tent-the-milky-way-wallpaper-86fedc2285962a008d3effabd97bf372.jpg', alt: 'Seminer', title: 'Tıp Semineri' },
  { url: 'https://r4.wallpaperflare.com/wallpaper/261/957/290/the-sky-night-tent-the-milky-way-wallpaper-86fedc2285962a008d3effabd97bf372.jpg', alt: 'Atölye', title: 'Uygulamalı Atölye' },
  { url: 'https://r4.wallpaperflare.com/wallpaper/261/957/290/the-sky-night-tent-the-milky-way-wallpaper-86fedc2285962a008d3effabd97bf372.jpg', alt: 'Saha', title: 'Saha Çalışması' },
    { url: 'https://r4.wallpaperflare.com/wallpaper/261/957/290/the-sky-night-tent-the-milky-way-wallpaper-86fedc2285962a008d3effabd97bf372.jpg', alt: 'Saha', title: 'Saha Çalışması' },
      { url: 'https://r4.wallpaperflare.com/wallpaper/261/957/290/the-sky-night-tent-the-milky-way-wallpaper-86fedc2285962a008d3effabd97bf372.jpg', alt: 'Saha', title: 'Saha Çalışması' },
        { url: 'https://r4.wallpaperflare.com/wallpaper/261/957/290/the-sky-night-tent-the-milky-way-wallpaper-86fedc2285962a008d3effabd97bf372.jpg', alt: 'Saha', title: 'Saha Çalışması' },
          { url: 'https://r4.wallpaperflare.com/wallpaper/261/957/290/the-sky-night-tent-the-milky-way-wallpaper-86fedc2285962a008d3effabd97bf372.jpg', alt: 'Saha', title: 'Saha Çalışması' },
            { url: 'https://r4.wallpaperflare.com/wallpaper/261/957/290/the-sky-night-tent-the-milky-way-wallpaper-86fedc2285962a008d3effabd97bf372.jpg', alt: 'Saha', title: 'Saha Çalışması' },
              { url: 'https://r4.wallpaperflare.com/wallpaper/261/957/290/the-sky-night-tent-the-milky-way-wallpaper-86fedc2285962a008d3effabd97bf372.jpg', alt: 'Saha', title: 'Saha Çalışması' },
                { url: 'https://r4.wallpaperflare.com/wallpaper/261/957/290/the-sky-night-tent-the-milky-way-wallpaper-86fedc2285962a008d3effabd97bf372.jpg', alt: 'Saha', title: 'Saha Çalışması' },
                  { url: 'https://r4.wallpaperflare.com/wallpaper/261/957/290/the-sky-night-tent-the-milky-way-wallpaper-86fedc2285962a008d3effabd97bf372.jpg', alt: 'Saha', title: 'Saha Çalışması' },
                    { url: 'https://r4.wallpaperflare.com/wallpaper/261/957/290/the-sky-night-tent-the-milky-way-wallpaper-86fedc2285962a008d3effabd97bf372.jpg', alt: 'Saha', title: 'Saha Çalışması' },
                      { url: 'https://r4.wallpaperflare.com/wallpaper/261/957/290/the-sky-night-tent-the-milky-way-wallpaper-86fedc2285962a008d3effabd97bf372.jpg', alt: 'Saha', title: 'Saha Çalışması' },
                        { url: 'https://r4.wallpaperflare.com/wallpaper/261/957/290/the-sky-night-tent-the-milky-way-wallpaper-86fedc2285962a008d3effabd97bf372.jpg', alt: 'Saha', title: 'Saha Çalışması' },
]);
</script>

<style lang="scss" scoped>
.galeri-sayfasi {
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
  height: 550px; 
  background-image: url('https://images.unsplash.com/photo-1608453908394-f48474d01c23?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'); 
  background-size: cover;
  background-position: center 30%;
  z-index: 0;
  pointer-events: none; 

  .fade-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,1) 100%);
  }
}

.galeri-container {
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 140px; 
  padding-left: 1rem;
  padding-right: 1rem;
  padding-bottom: 3rem; 
  
  position: relative; 
  z-index: 1; 

  .baslik-kapsayici {
    position: relative;
    text-align: center;
    margin-bottom: 3.5rem;
    
    h2 {
      font-size: 3.2rem; 
      margin-bottom: 0.8rem;
      color: #ffffff;
      letter-spacing: 2px;
      text-transform: uppercase;
      font-weight: 900;
      font-style: italic;
      text-shadow: 0 4px 15px rgba(0, 0, 0, 0.8); 
    }

    .baslik-aciklamasi {
      color: #cccccc;
      font-size: 1.1rem;
      max-width: 550px;
      margin: 0 auto;
      line-height: 1.6;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
    }
  }
}

@media (max-width: 768px) {
  .hero-arkaplan {
    height: 400px; 
  }

  .galeri-container {
    padding-top: 100px;
    
    .baslik-kapsayici {
      margin-bottom: 2.5rem;
      
      h2 { font-size: 2.2rem; }
      
      .baslik-aciklamasi {
        font-size: 0.95rem;
        padding: 0 1rem;
      }
    }
  }
}
</style>