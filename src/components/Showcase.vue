<template>
  <section class="events-section">
    <div class="section-container">
      <div class="header-bar">
        <div class="header-left">
          <h2 class="section-title">ETKİNLİKLERİMİZ</h2>
          <p class="section-desc">MedAB imzalı etkinlikler, devam eden projeler ve fakülte pratikleri.</p>
        </div>

        <div class="header-right">
          <router-link to="/etkinlikler/" class="btn_one">
            Tüm Etkinlikler
            <AppIcon name="arrow-right" class="btn-icon" :size="14" />
          </router-link>

          <div class="nav-controls">
            <button class="nav-round-btn" aria-label="Önceki" @click="scrollLeft">
              <AppIcon name="chevron-left" :size="16" />
            </button>
            <button class="nav-round-btn" aria-label="Sonraki" @click="scrollRight">
              <AppIcon name="chevron-right" :size="16" />
            </button>
          </div>
        </div>
      </div>

      <div ref="slider" class="slider-container">
        <router-link
          v-for="event in events"
          :key="event.id"
          :to="`/etkinlik/${event.id}/`"
          class="event-card"
        >
          <div class="image-box">
            <img 
              :src="event.resim" 
              :alt="event.baslik" 
              loading="lazy" 
              decoding="async"
              width="310"
              height="194"
            />
          </div>
          <div class="event-info">
            <span class="event-date">{{ event.tarih }}</span>
            <h3 class="event-title">{{ event.baslik }}</h3>
          </div>
        </router-link>
      </div>

      <div class="mobile-action-wrap">
        <router-link to="/etkinlikler/" class="btn_one">
          Tüm Etkinlikler
          <AppIcon name="arrow-right" class="btn-icon" :size="14" />
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import { eventCatalog } from '../data/eventCatalog.js';

export default {
  name: 'EventsSlider',
  data() {
    return {
      events: eventCatalog,
      scrollAmount: 340
    };
  },
  methods: {
    scrollLeft() {
      this.$refs.slider.scrollBy({ left: -this.scrollAmount, behavior: 'smooth' });
    },
    scrollRight() {
      this.$refs.slider.scrollBy({ left: this.scrollAmount, behavior: 'smooth' });
    }
  }
};
</script>

<style scoped>
.events-section {
  width: 100%;
  padding: 90px 0 110px 0;
  background-color: #000000;
  position: relative;
  overflow: hidden;
}

.section-container {
  max-width: 1360px;
  margin: 0 auto;
  padding: 0 40px;
  box-sizing: border-box;
}

.header-bar {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 36px;
  gap: 24px;
}

.header-left {
  text-align: left;
}

.section-title {
  font-family: 'Archivo Black', sans-serif;
  font-size: clamp(28px, 3.4vw, 42px);
  line-height: 1.15;
  color: #ffffff;
  letter-spacing: -1.5px;
  margin: 0 0 12px 0;
  text-transform: uppercase;
}

.section-desc {
  font-family: 'Montserrat', sans-serif;
  font-size: 15px;
  color: #e2a8a8;
  margin: 0;
  font-weight: 400;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 18px;
}

.btn_one {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-family: 'Montserrat', sans-serif;
  font-size: 14.5px;
  font-weight: 700;
  color: #000000;
  background-color: #ffffff;
  padding: 13px 30px;
  border-radius: 50px;
  letter-spacing: -0.4px;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(185, 28, 28, 0.25);
  white-space: nowrap;
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
  transform: translateX(4px);
}

.nav-controls {
  display: flex;
  gap: 8px;
}

.nav-round-btn {
  width: 44px;
  height: 44px;
  background-color: #1e0204;
  border: 1px solid rgba(220, 38, 38, 0.25);
  border-radius: 50%;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.nav-round-btn:hover {
  background-color: #ef4444;
  color: #ffffff;
  border-color: #ef4444;
  box-shadow: none;
}

.slider-container {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  gap: 22px;
  padding: 10px 2px 25px 2px;
  scroll-behavior: smooth;
  width: 100%;
  -ms-overflow-style: none;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
}

.slider-container::-webkit-scrollbar {
  display: none;
}

.event-card {
  flex: 0 0 310px;
  scroll-snap-align: start;
  background: #120203;
  border-radius: 6px;
  overflow: hidden;
  text-decoration: none;
  border: 1px solid rgba(220, 38, 38, 0.15);
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
}

.event-card:hover {
  transform: translateY(-5px);
  border-color: rgba(220, 38, 38, 0.45);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.9), 0 0 20px rgba(185, 28, 28, 0.2);
}

.image-box {
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background-color: #1a0305;
}

.image-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: brightness(0.92);
  transition: transform 0.3s ease, filter 0.3s ease;
}

.event-card:hover .image-box img {
  transform: scale(1.03);
  filter: brightness(1);
}

.event-info {
  padding: 16px 18px 20px 18px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

.event-date {
  font-family: 'Montserrat', sans-serif;
  font-size: 11px;
  font-weight: 700;
  color: #ef4444;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.event-title {
  margin: 0;
  font-family: 'Montserrat', sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.35;
  letter-spacing: -0.2px;
}

.mobile-action-wrap {
  display: none;
}

@media (max-width: 860px) {
  .events-section {
    padding: 55px 0 75px 0;
    background-color: #000000;
  }

  .section-container {
    padding: 0;
  }

  .header-bar {
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-bottom: 24px;
    padding: 0 20px;
  }

  .header-left {
    text-align: center;
  }

  .section-title {
    font-size: clamp(28px, 8.2vw, 33px);
    line-height: 1.15;
    letter-spacing: -1.2px;
    margin-bottom: 10px;
  }

  .section-desc {
    font-size: 13.5px;
    line-height: 1.5;
  }

  .header-right {
    display: none;
  }

  .slider-container {
    scroll-padding-left: 20px;
    padding: 5px 20px 24px 20px;
    gap: 14px;
  }

  .event-card {
    flex: 0 0 78%;
    border-radius: 6px;
  }

  .image-box {
    aspect-ratio: 16 / 10.5;
  }

  .event-info {
    padding: 14px 16px;
  }

  .event-date {
    font-size: 10px;
    margin-bottom: 5px;
  }

  .event-title {
    font-size: 13.5px;
  }

  .mobile-action-wrap {
    display: flex;
    justify-content: center;
    padding: 10px 20px 0 20px;
    width: 100%;
    box-sizing: border-box;
  }

  .btn_one {
    width: auto;
    padding: 13px 28px;
    font-size: 14.5px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.6), 0 0 15px rgba(185, 28, 28, 0.25);
  }
}
</style>