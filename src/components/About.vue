<template>
  <section class="about-section">
    <div class="about-container">
      <div class="text-content">
        <h2 class="main-title">
          <span class="cycle-container">
            <transition name="slide-up" mode="out-in">
              <span :key="currentWord" class="cycle-word">{{ currentWord }}</span>
            </transition>
          </span>
          <span class="title-sub">TOPLULUĞU</span>
        </h2>

        <p class="desc-text" lang="tr">
          Medeniyet Akademik ve Bilimsel Faaliyetler Kulübü, tıp fakültesi öğrencilerinin akademik ve bilimsel gelişimini desteklerken; mesleki becerilerini geliştirmelerine, farklı disiplinlerle etkileşim kurmalarına ve fakülte yaşamında nitelikli bir öğrenci deneyimi oluşturmalarına katkı sunar.
        </p>

        <div class="action-wrap">
          <router-link to="/hakkimizda/" class="btn_one">
            Bizi Yakından Tanıyın
            <AppIcon name="arrow-right" class="btn-icon" :size="16" />
          </router-link>
        </div>
      </div>

      <div class="video-container">
        <div class="video-wrapper">
          <!-- Video oynatılmadıysa Facade (Hafif Kapak) göster -->
          <div 
            v-if="!isVideoPlaying" 
            class="video-facade" 
            role="button"
            tabindex="0"
            aria-label="Tanıtım videosunu oynat"
            @click="playVideo"
            @keydown.enter="playVideo"
            @keydown.space.prevent="playVideo"
          >
            <img 
              src="https://i.ytimg.com/vi_webp/tBn2cXQWDXk/hqdefault.webp" 
              alt="MEDAB Tanıtım Videosu Kapağı" 
              class="facade-img"
              width="480"
              height="360"
              loading="lazy"
              decoding="async"
            />
            <div class="play-btn" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>

          <!-- Tıklandığı an iframe yüklenir -->
          <iframe 
            v-else
            src="https://www.youtube.com/embed/tBn2cXQWDXk?autoplay=1&rel=0" 
            title="MEDAB Tanıtım Videosu" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
          </iframe>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AboutSection',
  data() {
    return {
      isVideoPlaying: false,
      words: [
        'ÜRETENLERİN',
        'SORGULAYANLARIN',
        'MERAK EDENLERİN',
        'YENİLİKÇİLERİN',
      ],
      currentIndex: 0,
      cycleTimer: null
    }
  },
  computed: {
    currentWord() {
      return this.words[this.currentIndex];
    }
  },
  mounted() {
    this.cycleTimer = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.words.length;
    }, 2800);
  },
  beforeUnmount() {
    if (this.cycleTimer) {
      clearInterval(this.cycleTimer);
    }
  },
  methods: {
    playVideo() {
      this.isVideoPlaying = true;
    }
  }
}
</script>

<style scoped>
.about-section {
  width: 100%;
  background: radial-gradient(ellipse at 70% 50%, #54070a 0%, #1e0204 55%, #070001 100%);
  padding: 130px 8%;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
}

.about-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 140px;
  background: linear-gradient(to bottom, #000000 0%, rgba(0, 0, 0, 0) 100%);
  pointer-events: none;
  z-index: 2;
}

.about-section::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 140px;
  background: linear-gradient(to top, #000000 0%, rgba(0, 0, 0, 0) 100%);
  pointer-events: none;
  z-index: 2;
}

.about-container {
  max-width: 1240px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 70px;
  position: relative;
  z-index: 3;
}

.text-content {
  flex: 1.1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.main-title {
  font-family: 'Archivo Black', sans-serif;
  font-size: clamp(26px, 3.2vw, 42px);
  line-height: 1.18;
  color: #ffffff;
  letter-spacing: -1.5px;
  margin: 0 0 22px 0;
  text-transform: uppercase;
  text-align: left;
  display: flex;
  flex-direction: column;
}

.cycle-container {
  display: block;
  min-height: 1.25em;
  position: relative;
  overflow: hidden;
}

.cycle-word {
  display: inline-block;
  color: #ffffff;
  white-space: nowrap;
}

.title-sub {
  color: #e2a8a8;
  display: block;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.45s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(24px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-24px);
}

.desc-text {
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  line-height: 1.8;
  color: #f1f5f9;
  margin: 0 0 34px 0;
  max-width: 540px;
  text-align: left;
  text-wrap: pretty;
  hyphens: none;
  -webkit-hyphens: none;
  -ms-hyphens: none;
}

.action-wrap {
  display: flex;
  width: 100%;
}

.btn_one {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-family: 'Montserrat', sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: #000000;
  background-color: #ffffff;
  padding: 14px 32px;
  border-radius: 50px;
  letter-spacing: -0.5px;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(185, 28, 28, 0.25);
}

.btn-icon {
  display: inline-block;
  transition: transform 0.2s ease;
}

.btn_one:hover {
  background-color: #fca5a5;
  color: #110102;
}

.btn_one:hover .btn-icon {
  transform: translateX(5px);
}

.video-container {
  flex: 0.95;
  position: relative;
  width: 100%;
  max-width: 580px;
}

.video-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background-color: #000000;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid rgba(220, 38, 38, 0.25);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.85), 0 0 45px rgba(185, 28, 28, 0.15);
}

.video-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

/* Facade (Kapak ve Play Butonu) Stilleri */
.video-facade {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000;
  outline: none;
}

.video-facade:focus-visible {
  box-shadow: inset 0 0 0 3px #ef4444;
}

.facade-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease, opacity 0.3s ease;
  opacity: 0.9;
}

.video-facade:hover .facade-img {
  transform: scale(1.03);
  opacity: 1;
}

.play-btn {
  position: absolute;
  width: 68px;
  height: 48px;
  background: rgba(220, 38, 38, 0.9);
  border: none;
  border-radius: 14px;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
  transition: transform 0.2s ease, background 0.2s ease;
  pointer-events: none;
}

.video-facade:hover .play-btn {
  transform: scale(1.1);
  background: #dc2626;
}

/* =======================================
   MOBİL İYİLEŞTİRMELERİ
   ======================================= */
@media (max-width: 860px) {
  .about-section {
    background: radial-gradient(circle at 50% 20%, #54070a 0%, #1e0204 55%, #050001 100%);
    padding: 65px 20px 75px 20px;
  }

  .about-section::before {
    height: 45px;
  }

  .about-section::after {
    height: 55px;
  }

  .about-container {
    flex-direction: column;
    gap: 0;
  }

  .text-content {
    display: contents;
  }

  .main-title {
    order: 1;
    width: 100%;
    font-size: clamp(23px, 6.8vw, 31px);
    line-height: 1.2;
    letter-spacing: -1.2px;
    margin-bottom: 18px;
    text-align: center;
    align-items: center;
  }

  .cycle-container {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .desc-text {
    order: 2;
    width: 100%;
    font-size: 14.5px;
    line-height: 1.65;
    margin-bottom: 24px;
    text-align: justify;
    text-justify: inter-word;
    hyphens: auto;
    -webkit-hyphens: auto;
    -ms-hyphens: auto;
  }

  .video-container {
    order: 3;
    max-width: 100%;
    margin-bottom: 24px;
  }

  .video-wrapper {
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.6), 0 0 25px rgba(185, 28, 28, 0.2);
  }

  .action-wrap {
    order: 4;
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 6px;
    position: relative;
    z-index: 5;
  }

  .btn_one {
    padding: 13px 28px;
    font-size: 14.5px;
  }
}
</style>