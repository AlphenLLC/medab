<template>
  <div class="gallery-container">
    <div class="gallery-grid">
      <div
        v-for="(image, index) in goruntulenenResimler"
        :key="index"
        class="gallery-item"
        @click="openLightbox(index)"
      >
        <img :src="image.url" :alt="image.alt || 'MEDAB Galeri'" loading="lazy" />
      </div>
    </div>
    <!-- Infinite Scroll Yükleme -->
    <div ref="scrollTetikleyici" class="yukleme-alani">
      <div v-if="yukleniyor" class="yukleniyor-animasyonu">
        <span class="nokta"></span>
        <span class="nokta"></span>
        <span class="nokta"></span>
      </div>
    </div>
    <Teleport to="body">
      <div v-if="lightboxOpen" class="lightbox" @click.self="closeLightbox">
        <button class="close-btn" @click="closeLightbox">✕</button>       
        <button class="nav-btn prev" @click="prevImage" v-if="images.length > 1">❮</button>        
        <div class="lightbox-content">
          <img :src="images[currentIndex].url" :alt="images[currentIndex].alt || 'MEDAB Galeri'" class="lightbox-img" />
        </div>
        <button class="nav-btn next" @click="nextImage" v-if="images.length > 1">❯</button>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  images: {
    type: Array,
    required: true
  }
});

/* --- Infinite Scroll --- */
const ekrandakiAdet = ref(4); 
const yukleniyor = ref(false);
const scrollTetikleyici = ref(null);
let observer = null;

const goruntulenenResimler = computed(() => {
  return props.images.slice(0, ekrandakiAdet.value);
});

const tumResimlerYuklendi = computed(() => {
  return ekrandakiAdet.value >= props.images.length;
});

const dahaFazlaYukle = () => {
  if (tumResimlerYuklendi.value || yukleniyor.value) return;
  
  yukleniyor.value = true;
  
  setTimeout(() => {
    ekrandakiAdet.value += 4; // Her kaydırmada 4 resim daha yükler
    yukleniyor.value = false;
  }, 600);
};

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      dahaFazlaYukle();
    }
  }, {
    rootMargin: '0px 0px 100px 0px' 
  });

  if (scrollTetikleyici.value) {
    observer.observe(scrollTetikleyici.value);
  }
});

onUnmounted(() => {
  if (observer && scrollTetikleyici.value) {
    observer.unobserve(scrollTetikleyici.value);
  }
});

const lightboxOpen = ref(false);
const currentIndex = ref(0);

const openLightbox = (index) => {
  currentIndex.value = index;
  lightboxOpen.value = true;
  document.body.style.overflow = 'hidden'; 
};

const closeLightbox = () => {
  lightboxOpen.value = false;
  document.body.style.overflow = 'auto';
};

const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % props.images.length;
};

const prevImage = () => {
  currentIndex.value = (currentIndex.value - 1 + props.images.length) % props.images.length;
};
</script>

<style scoped>
.gallery-container {
  width: 100%;
}

.gallery-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%; 
  justify-items: center;
  box-sizing: border-box;
}

@media (min-width: 768px) {
  .gallery-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}

.gallery-item {
  position: relative;
  cursor: pointer;
  overflow: hidden;
  border: 1px solid #222;
  background-color: #000;
  aspect-ratio: 16 / 9;
  min-height: 200px;
  width: 100%;
  max-width: 100%; 
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* =========================================
   INFINITE SCROLL 
========================================= */
.yukleme-alani {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60px;
  margin-top: 2.5rem;
  width: 100%;
}

.yukleniyor-animasyonu {
  display: flex;
  gap: 6px;
}

.yukleniyor-animasyonu .nokta {
  width: 8px;
  height: 8px;
  background-color: #ffffff; /* Karanlık estetiğe uygun beyaz noktalar */
  border-radius: 50%;
  animation: sicrama 1.4s infinite ease-in-out both;
}

.yukleniyor-animasyonu .nokta:nth-child(1) { animation-delay: -0.32s; }
.yukleniyor-animasyonu .nokta:nth-child(2) { animation-delay: -0.16s; }

@keyframes sicrama {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}

.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.98); 
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999; 
}

.lightbox-content {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 1rem;
}

.lightbox-img {
  max-width: 100%;
  max-height: 85vh; 
  object-fit: contain; 
  border: 1px solid #222;
  box-shadow: 0 0 40px rgba(0,0,0,1);
  user-select: none;
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 2rem; 
  width: 44px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid #444;
  border-radius: 5px; 
  cursor: pointer;
  z-index: 100000;
}

.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 2rem;
  width: 50px;
  height: 60px;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid #444;
  cursor: pointer;
  z-index: 100000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.prev { left: 5px; border-radius: 0 5px 5px 0; }
.next { right: 5px; border-radius: 5px 0 0 5px; }

@media (min-width: 768px) {
  .nav-btn {
    font-size: 3rem;
    width: 80px;
    height: 100px;
    background: none;
    border: none;
    transition: color 0.3s ease, transform 0.3s ease;
  }
  
  .nav-btn:hover {
    color: #fff;
    transform: translateY(-50%) scale(1.1);
  }

  .close-btn {
    top: 30px;
    right: 40px;
    font-size: 2.5rem;
    background: none;
    border: none;
    transition: color 0.3s ease, transform 0.3s ease;
  }

  .close-btn:hover {
    color: #fff;
    transform: scale(1.1);
  }
  
  .prev { left: 20px; }
  .next { right: 20px; }
}
</style>