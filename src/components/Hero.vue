<template>
  <section class="landing-section">
    <!-- LCP Kritik Görsel Katmanı -->
    <picture class="bg-layer-picture">
      <source media="(max-width: 860px)" :srcset="heroMobile" type="image/webp" />
      <img
        :src="heroDesktop"
        alt="Gazi Mustafa Kemal Atatürk"
        class="bg-layer-img"
        fetchpriority="high"
        loading="eager"
        decoding="sync"
      />
    </picture>

    <div class="vignette-overlay"></div>
    <div class="grain-overlay"></div>

    <div class="hero-frame">
      <div class="hero-body">
        <h1 class="main-monolith">MEDAB</h1>
        <div 
          class="news-ticker-container"
          @touchstart="handleTouchStart"
          @touchend="handleTouchEnd"
        >
          <transition :name="slideDirection === 'next' ? 'ticker-slide-left' : 'ticker-slide-right'" mode="out-in">
            <div :key="currentSlide" class="ticker-slide">
              <div class="ticker-badge" :class="slides[currentSlide].badgeClass">
                <span v-if="slides[currentSlide].hasDot" class="badge-dot"></span>
                <span class="badge-label">{{ slides[currentSlide].badge }}</span>
              </div>
              <p class="ticker-text">
                {{ slides[currentSlide].text }}
              </p>
            </div>
          </transition>
          <div v-if="slides.length > 1" class="ticker-dots">
            <button 
              v-for="(slide, index) in slides" 
              :key="index" 
              class="ticker-dot"
              :class="{ 'is-active': currentSlide === index }"
              :aria-label="`Slide ${index + 1}`"
              type="button"
              @click="setSlide(index)"
            ></button>
          </div>
        </div>

        <div class="action-btn-wrapper">
          <button 
            class="btn_one" 
            type="button" 
            @click="goToMagazine"
          >
            <span class="btn-text">İlk Sayımızı Oku</span>
            <AppIcon name="arrow-right" class="btn-icon" :size="13" />
          </button>
        </div>
      </div>

      <div class="frame-meta-bottom">
        <span class="lore-text">Cumhuriyetin emaneti, yarının hür ve aydınlık hekimlerinin ellerinde.</span>
        <span class="division-text">COMMONWORKS</span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Hero',
  data() {
    return {
      heroDesktop: '/assets/ataturk2.webp',
      heroMobile: '/assets/ataturk-mobile.webp',
      currentSlide: 0,
      slideDirection: 'next',
      slideTimer: null,
      touchStartX: 0,
      touchEndX: 0,
      slides: [
        {
          badge: 'MEDAB PERSPEKTİF 1. SAYISI YAYINDA',
          badgeClass: 'badge-magazine',
          hasDot: false,
          text: 'İlk sayımız yayında! "Kardiyoloji" temalı özel dosyamız, araştırmalarımız ve klinik derlemelerimizle sizlerleyiz. Şimdi ücretsiz oku.'
        }
      ]
    };
  },
  mounted() {
    this.startSlideTimer();
  },
  beforeUnmount() {
    this.clearSlideTimer();
  },
  methods: {
    goToMagazine() {
      if (this.$router) {
        this.$router.push('/dergi/');
      } else {
        window.location.href = '/dergi/';
      }
    },
    nextSlide() {
      if (this.slides.length <= 1) return;
      this.slideDirection = 'next';
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    },
    prevSlide() {
      if (this.slides.length <= 1) return;
      this.slideDirection = 'prev';
      this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    },
    startSlideTimer() {
      this.clearSlideTimer();
      if (this.slides.length <= 1) return;
      this.slideTimer = setInterval(() => {
        this.nextSlide();
      }, 7000);
    },
    clearSlideTimer() {
      if (this.slideTimer) {
        clearInterval(this.slideTimer);
        this.slideTimer = null;
      }
    },
    setSlide(index) {
      this.slideDirection = index > this.currentSlide ? 'next' : 'prev';
      this.currentSlide = index;
      this.startSlideTimer();
    },
    handleTouchStart(e) {
      if (this.slides.length <= 1) return;
      this.touchStartX = e.changedTouches[0].clientX;
    },
    handleTouchEnd(e) {
      if (this.slides.length <= 1) return;
      this.touchEndX = e.changedTouches[0].clientX;
      this.handleSwipeGesture();
    },
    handleSwipeGesture() {
      const swipeDistance = this.touchStartX - this.touchEndX;
      if (swipeDistance > 40) {
        this.nextSlide();
        this.startSlideTimer();
      } else if (swipeDistance < -40) {
        this.prevSlide();
        this.startSlideTimer();
      }
    }
  }
};
</script>

<style scoped>
.landing-section {
  position: relative;
  width: 100%;
  height: 100vh;
  height: 100svh;
  min-height: 600px;
  background-color: #050505;
  overflow: hidden;
  display: flex;
  align-items: center;
  contain: strict;
}

.bg-layer-picture {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  z-index: 1;
  pointer-events: none;
}

.bg-layer-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 72% 20%;
  filter: contrast(1.1) brightness(0.82);
  transform: scale(1.02);
  transition: transform 8s cubic-bezier(0.1, 1, 0.1, 1);
  display: block;
}

.landing-section:hover .bg-layer-img {
  transform: scale(1.035);
}

.vignette-overlay {
  position: absolute;
  inset: 0;
  background: 
    linear-gradient(to right, rgba(5, 5, 5, 0.88) 0%, rgba(5, 5, 5, 0.6) 42%, rgba(5, 5, 5, 0.25) 100%),
    linear-gradient(to bottom, rgba(5, 5, 5, 0.45) 0%, transparent 28%, transparent 68%, #050505 100%);
  z-index: 2;
  pointer-events: none;
}

.grain-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 0);
  background-size: 32px 32px;
  opacity: 0.25;
  z-index: 2;
  pointer-events: none;
}

.hero-frame {
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 110px 6% 36px 6%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 3;
}

.hero-body {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  max-width: 760px;
  margin-top: auto;
  margin-bottom: 4vh;
}

.main-monolith {
  font-family: 'Archivo Black', sans-serif;
  font-size: clamp(62px, 10vw, 122px);
  line-height: 0.9;
  letter-spacing: -3.5px;
  margin: 0 0 20px 0;
  text-transform: uppercase;
  background: linear-gradient(
    90deg,
    #ffffff 0%,
    #ffffff 22%,
    #ef4444 36%,
    #b91c1c 50%,
    #ef4444 64%,
    #ffffff 78%,
    #ffffff 100%
  );
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: sweep-left-to-right 4.5s linear infinite;
  filter: drop-shadow(0 4px 20px rgba(0, 0, 0, 0.9));
}

@keyframes sweep-left-to-right {
  0% { background-position: -200% 0; }
  100% { background-position: 0% 0; }
}

.news-ticker-container {
  min-height: auto;
  max-width: 620px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 22px;
  cursor: grab;
  user-select: none;
  touch-action: pan-y;
}

.ticker-slide {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.ticker-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 7px;
  backdrop-filter: blur(10px);
  margin-bottom: 12px;
}

.badge-magazine {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.badge-magazine .badge-label {
  color: #e4e4e7;
}

.badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #ef4444;
  box-shadow: 0 0 8px #ef4444;
}

.badge-label {
  font-family: 'Montserrat', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.9px;
  text-transform: uppercase;
}

.ticker-text {
  font-family: 'Montserrat', sans-serif;
  font-size: clamp(15px, 1.3vw, 17.5px);
  line-height: 1.6;
  color: #f4f4f5;
  font-weight: 400;
  margin: 0;
  letter-spacing: -0.2px;
  border-left: 2px solid #ef4444;
  padding-left: 16px;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.9);
}

.ticker-slide-left-enter-active,
.ticker-slide-left-leave-active,
.ticker-slide-right-enter-active,
.ticker-slide-right-leave-active {
  transition: all 0.35s cubic-bezier(0.2, 0.8, 0.25, 1);
}

.ticker-slide-left-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.ticker-slide-left-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.ticker-slide-right-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}
.ticker-slide-right-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.ticker-dots {
  display: flex;
  gap: 6px;
  margin-top: 12px;
  padding-left: 18px;
}

.ticker-dot {
  width: 18px;
  height: 3px;
  background-color: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.ticker-dot.is-active {
  width: 32px;
  background-color: #ef4444;
}

.action-btn-wrapper {
  position: relative;
  display: inline-block;
}

.btn_one {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: 'Montserrat', sans-serif;
  font-size: 13.5px;
  font-weight: 700;
  color: #09090b;
  background-color: #e4e4e7;
  padding: 11px 26px;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  letter-spacing: -0.3px;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.45);
  outline: none;
  -webkit-tap-highlight-color: transparent;
}

.btn-icon {
  display: inline-block;
  transition: transform 0.2s ease;
}

.btn_one:hover {
  background-color: #fca5a5;
  color: #110102;
  transform: translateY(-2px);
}

.btn_one:hover .btn-icon {
  transform: translateX(3px);
}

.frame-meta-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-family: 'Montserrat', sans-serif;
  font-size: 9.5px;
  font-weight: 500;
  letter-spacing: 2px;
  color: #71717a;
  border-top: none;
  padding-top: 16px;
  gap: 20px;
  user-select: none;
}

.lore-text {
  color: #a1a1aa;
}

.division-text {
  color: #71717a;
  white-space: nowrap;
}

@media (max-width: 860px) {
  .hero-frame {
    padding: 0 6% 28px 6%;
    justify-content: flex-end;
  }

  .bg-layer-img {
    object-position: 50% 12% !important;
  }

  .vignette-overlay {
    background: linear-gradient(
      to bottom,
      rgba(5, 5, 5, 0) 0%,
      rgba(5, 5, 5, 0.05) 35%,
      rgba(5, 5, 5, 0.8) 58%,
      rgba(5, 5, 5, 0.98) 82%,
      #050505 100%
    ) !important;
  }

  .hero-body {
    margin-top: auto;
    margin-bottom: 0 !important;
    width: 100%;
  }

  .main-monolith {
    font-size: 48px;
    letter-spacing: -2px;
    margin-bottom: 12px;
  }

  .news-ticker-container {
    min-height: auto;
    margin-bottom: 16px;
  }

  .ticker-badge {
    padding: 4px 10px;
    border-radius: 6px;
    margin-bottom: 8px;
  }

  .badge-label {
    font-size: 9.5px;
  }

  .ticker-text {
    font-size: 13.5px;
    line-height: 1.5;
    padding-left: 10px;
  }

  .btn_one {
    padding: 10px 22px;
    font-size: 13px;
  }

  .frame-meta-bottom {
    display: none !important;
  }
}
</style>