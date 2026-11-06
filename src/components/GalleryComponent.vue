<template>
  <div class="gallery-wrapper">
    <!-- Galeri Grid -->
    <div class="gallery-grid">
      <div
        v-for="(item, index) in goruntulenenResimler"
        :key="item.url"
        class="gallery-card"
        @click="openLightbox(index)"
      >
        <img 
          :src="item.url" 
          :alt="item.baslik || 'MEDAB Arşiv'" 
          loading="lazy"
          decoding="async"
          fetchpriority="low"
        />
      </div>
    </div>

    <!-- Sonsuz Kaydırma Tetikleyici (Lazy Trigger) -->
    <div ref="scrollTetikleyici" class="load-trigger">
      <div v-if="yukleniyor && !hepsiYuklendi" class="tech-loader">
        <div class="loader-track">
          <div class="loader-bar"></div>
        </div>
        <span class="loader-text">ARŞİV AKTARILIYOR</span>
      </div>
    </div>

    <!-- Lightbox Modal & Açılış Zoom Animasyonu -->
    <Teleport to="body">
      <Transition name="lightbox-zoom">
        <div 
          v-if="lightboxOpen" 
          class="lightbox-backdrop" 
          @click.self="closeLightbox"
        >
          <!-- Sağ Üst Kapat Butonu -->
          <button class="close-btn" aria-label="Kapat" title="Kapat (Esc)" @click="closeLightbox">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <div class="lightbox-stage">
            <div class="image-viewport">
              <img 
                :src="images[currentIndex]?.url" 
                :alt="images[currentIndex]?.baslik" 
                class="full-image" 
              />
            </div>

            <!-- Sergi Künyesi -->
            <div v-if="images[currentIndex]" class="lightbox-meta-block">
              <h3 class="meta-baslik">{{ images[currentIndex].baslik }}</h3>
              <div v-if="images[currentIndex].yer || images[currentIndex].tarih" class="meta-alt-bilgi">
                <span v-if="images[currentIndex].yer" class="meta-detay">{{ images[currentIndex].yer }}</span>
                <span v-if="images[currentIndex].yer && images[currentIndex].tarih" class="meta-ayirici">•</span>
                <span v-if="images[currentIndex].tarih" class="meta-detay">{{ images[currentIndex].tarih }}</span>
              </div>
            </div>

            <!-- HUD Kontrol Konsolu -->
            <div class="lightbox-nav-hud">
              <button 
                v-if="images.length > 1" 
                class="hud-btn prev" 
                aria-label="Önceki Görsel" 
                @click="prevImage"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>

              <div v-if="images[currentIndex]" class="hud-counter">
                {{ String(currentIndex + 1).padStart(2, '0') }} 
                <span class="counter-slash">/</span> 
                {{ String(images.length).padStart(2, '0') }}
              </div>

              <button 
                v-if="images.length > 1" 
                class="hud-btn next" 
                aria-label="Sonraki Görsel" 
                @click="nextImage"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </Transition>
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

const BATCH_SIZE = 6;
const loadCount = ref(BATCH_SIZE);
const yukleniyor = ref(false);
const scrollTetikleyici = ref(null);
let observer = null;

const goruntulenenResimler = computed(() => {
  return props.images.slice(0, loadCount.value);
});

const hepsiYuklendi = computed(() => {
  return loadCount.value >= props.images.length;
});

const dahaFazlaYukle = () => {
  if (hepsiYuklendi.value || yukleniyor.value) return;
  yukleniyor.value = true;
  requestAnimationFrame(() => {
    loadCount.value += BATCH_SIZE;
    yukleniyor.value = false;
  });
};

const lightboxOpen = ref(false);
const currentIndex = ref(0);

const openLightbox = (index) => {
  currentIndex.value = index;
  lightboxOpen.value = true;
  document.body.style.overflow = 'hidden';
  window.addEventListener('keydown', handleKeydown);
};

const closeLightbox = () => {
  lightboxOpen.value = false;
  document.body.style.overflow = '';
  window.removeEventListener('keydown', handleKeydown);
};

const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % props.images.length;
};

const prevImage = () => {
  currentIndex.value = (currentIndex.value - 1 + props.images.length) % props.images.length;
};

const handleKeydown = (e) => {
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') nextImage();
  if (e.key === 'ArrowLeft') prevImage();
};

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      dahaFazlaYukle();
    }
  }, { rootMargin: '0px 0px 300px 0px' });

  if (scrollTetikleyici.value) {
    observer.observe(scrollTetikleyici.value);
  }
});

onUnmounted(() => {
  if (observer && scrollTetikleyici.value) {
    observer.unobserve(scrollTetikleyici.value);
  }
  window.removeEventListener('keydown', handleKeydown);
  document.body.style.overflow = '';
});
</script>

<style scoped>
.gallery-wrapper {
  width: 100%;
  box-sizing: border-box;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
  width: 100%;
  box-sizing: border-box;
}

.gallery-card {
  position: relative;
  width: 100%;
  background-color: #09090b;
  border: 1px solid #1c1c1f;
  border-radius: 0;
  overflow: hidden;
  cursor: pointer;
  aspect-ratio: 16 / 10;
  box-sizing: border-box;
}

.gallery-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 0;
  filter: brightness(1) contrast(1);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), filter 0.25s ease;
  will-change: transform;
}

.gallery-card:hover img {
  filter: brightness(1.03) contrast(1.02);
  transform: scale(1.03);
}

.load-trigger {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70px;
  margin-top: 2.5rem;
  width: 100%;
}

.tech-loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.loader-track {
  width: 140px;
  height: 1.5px;
  background-color: #1c1c21;
  position: relative;
  overflow: hidden;
}

.loader-bar {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 40%;
  background: linear-gradient(90deg, transparent, #2563eb, transparent);
  animation: laserSweep 1.1s cubic-bezier(0.65, 0, 0.35, 1) infinite;
}

.loader-text {
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 2px;
  color: #52525b;
  text-transform: uppercase;
  user-select: none;
}

@keyframes laserSweep {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(350%); }
}

/* Lightbox */
.lightbox-backdrop {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(4, 4, 6, 0.96);
  backdrop-filter: blur(12px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999999;
  user-select: none;
  padding: 1.5rem;
  box-sizing: border-box;
}

.close-btn {
  position: absolute;
  top: 24px;
  right: 28px;
  width: 40px;
  height: 40px;
  border-radius: 0;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #a1a1aa;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 1000000;
}

.close-btn:hover {
  background: #ffffff;
  color: #000000;
  border-color: #ffffff;
}

.lightbox-stage {
  position: relative;
  max-width: 92vw;
  max-height: 92vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.image-viewport {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.full-image {
  max-width: 100%;
  max-height: 68vh;
  object-fit: contain;
  border-radius: 0;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: none;
  display: block;
}

.lightbox-meta-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  text-align: center;
  max-width: 720px;
  width: 100%;
  padding: 0 12px;
}

.meta-baslik {
  font-family: 'Archivo Black', sans-serif;
  color: #ffffff;
  font-size: 19px;
  letter-spacing: -0.4px;
  line-height: 1.25;
  margin: 0;
  text-transform: uppercase;
  text-wrap: balance;
}

.meta-alt-bilgi {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 8px;
  font-family: 'Montserrat', sans-serif;
  font-size: 13.5px;
  line-height: 1.4;
}

.meta-detay {
  color: #a1a1aa;
  font-weight: 500;
}

.meta-ayirici {
  color: #3f3f46;
}

.lightbox-nav-hud {
  display: inline-flex;
  align-items: stretch;
  justify-content: center;
  background: #09090b;
  border: 1px solid #27272a;
  border-radius: 0;
  height: 40px;
}

.hud-btn {
  width: 46px;
  background: transparent;
  border: none;
  border-radius: 0;
  color: #d4d4d8;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
}

.hud-btn.prev {
  border-right: 1px solid #27272a;
}

.hud-btn.next {
  border-left: 1px solid #27272a;
}

.hud-btn:hover {
  background: #ffffff;
  color: #000000;
}

.hud-btn:active {
  background: #e4e4e7;
}

.hud-counter {
  padding: 0 20px;
  display: flex;
  align-items: center;
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 2px;
  color: #71717a;
  user-select: none;
}

.counter-slash {
  color: #2563eb;
  font-weight: 700;
  margin: 0 2px;
}

.lightbox-zoom-enter-active,
.lightbox-zoom-leave-active {
  transition: opacity 0.22s cubic-bezier(0.16, 1, 0.3, 1);

  .lightbox-stage {
    transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.22s ease;
  }
}

.lightbox-zoom-enter-from,
.lightbox-zoom-leave-to {
  opacity: 0;

  .lightbox-stage {
    transform: scale(0.95);
    opacity: 0;
  }
}

@media (max-width: 768px) {
  .gallery-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .lightbox-backdrop {
    padding: 0.75rem;
  }

  .close-btn {
    top: 14px;
    right: 14px;
    width: 36px;
    height: 36px;
  }

  .full-image {
    max-height: 58vh;
  }

  .meta-baslik {
    font-size: 15px;
    line-height: 1.3;
  }

  .meta-alt-bilgi {
    font-size: 12px;
    gap: 5px;
  }

  .lightbox-nav-hud {
    height: 38px;
  }

  .hud-btn {
    width: 42px;
  }

  .hud-counter {
    padding: 0 16px;
    font-size: 11px;
  }
}
</style>