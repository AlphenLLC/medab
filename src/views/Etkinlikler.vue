<template>
  <div class="etkinlikler-sayfasi">
    <div class="hero-arkaplan">
      <div class="fade-overlay"></div>
    </div>
    <section class="etkinlikler-container">
      <div class="baslik-kapsayici">
        <h2>MEDAB WORKSHOP</h2>
        <p class="baslik-aciklamasi">
          Akademik gelişim, pratik atölyeler ve bilimsel sohbetler. Kulübümüzün en güncel faaliyetlerini buradan takip edebilirsiniz.
        </p>
      </div>
      <div class="etkinlik-listesi">
        <EtkinlikKarti 
          v-for="item in goruntulenenEtkinlikler" 
          :key="item.id" 
          :etkinlik="item" 
        />
      </div>
      <div ref="scrollTetikleyici" class="yukleme-alani">
        <div v-if="yukleniyor" class="yukleniyor-animasyonu">
          <span class="nokta"></span>
          <span class="nokta"></span>
          <span class="nokta"></span>
        </div>
<!-- toga -->
        <div v-else-if="tumEtkinliklerYuklendi" class="easter-egg-glance">
          <div class="glance-bg"></div>
          <p class="bitis-mesaji">Aramıza katılmaya ne dersin?</p>
        </div>
      </div>
    </section>
    <div class="karanlik-gecis"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import EtkinlikKarti from '../components/EtkinlikKarti.vue'
import { eventCatalog } from '../data/eventCatalog.js' // MERKEZİ VERİ KAYNAĞIMIZ


const etkinlikListesi = ref(eventCatalog)

/* infinite scroll*/
const ekrandakiAdet = ref(2) 
const yukleniyor = ref(false)
const scrollTetikleyici = ref(null)
let observer = null

const goruntulenenEtkinlikler = computed(() => {
  return etkinlikListesi.value.slice(0, ekrandakiAdet.value)
})

const tumEtkinliklerYuklendi = computed(() => {
  return ekrandakiAdet.value >= etkinlikListesi.value.length
})

const dahaFazlaYukle = () => {
  if (tumEtkinliklerYuklendi.value || yukleniyor.value) return
  
  yukleniyor.value = true
  
  setTimeout(() => {
    ekrandakiAdet.value += 2 
    yukleniyor.value = false
  }, 600)
}

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      dahaFazlaYukle()
    }
  }, {
    rootMargin: '0px 0px 100px 0px' 
  })

  if (scrollTetikleyici.value) {
    observer.observe(scrollTetikleyici.value)
  }
})

onUnmounted(() => {
  if (observer && scrollTetikleyici.value) {
    observer.unobserve(scrollTetikleyici.value)
  }
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
  height: 550px; 
  background-image: url('https://images.unsplash.com/photo-1608453908394-f48474d01c23?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'); 
  background-size: cover;
  background-position: center 20%;
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

.etkinlikler-container {
  max-width: 800px;
  margin: 0 auto;
  padding-top: 140px; 
  padding-left: 1rem;
  padding-right: 1rem;
  padding-bottom: 1rem; 
  
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

  .etkinlik-listesi {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    min-height: 400px; 
  }

  .yukleme-alani {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 60px;
    margin-top: 2rem;

    .yukleniyor-animasyonu {
      display: flex;
      gap: 6px;

      .nokta {
        width: 8px;
        height: 8px;
        background-color: #2196fd;
        border-radius: 50%;
        animation: sicrama 1.4s infinite ease-in-out both;

        &:nth-child(1) { animation-delay: -0.32s; }
        &:nth-child(2) { animation-delay: -0.16s; }
      }
    }

    .easter-egg-glance {
      position: relative;
      width: 100%;
      height: 250px; 
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 1rem;
      overflow: hidden;
      animation: yavascaBelir 1.5s ease-out forwards;
      cursor: crosshair;

      .glance-bg {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 100%; 
        max-width: 500px;
        height: 100%;
        
        background-image: url('https://i.pinimg.com/736x/16/bf/5b/16bf5b6ff0717c63aedf5056ce85dcd3.jpg'); 
        background-size: cover;
        background-position: center;
        
        opacity: 0.15; 
        transition: opacity 0.5s ease, filter 0.5s ease;
        filter: grayscale(100%) contrast(150%);
        
        -webkit-mask-image: radial-gradient(ellipse at center, black 10%, transparent 75%);
        mask-image: radial-gradient(ellipse at center, black 10%, transparent 75%);
      }

      .bitis-mesaji {
        position: relative;
        z-index: 1;
        color: #444444; 
        font-size: 0.9rem;
        letter-spacing: 4px;
        text-transform: uppercase;
        font-weight: 800;
        margin: 0;
        transition: color 0.4s ease, text-shadow 0.4s ease;
        pointer-events: none; 
      }

      &:hover {
        .glance-bg {
          opacity: 0.4; 
          filter: grayscale(0%) contrast(120%); 
        }
        
        .bitis-mesaji {
          color: #ffffff; 
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }
      }
    }
  }
}

.karanlik-gecis {
  position: relative;
  width: 100%;
  height: 100px; 
  background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%);
  margin-top: -100px; 
  z-index: 0; 
  pointer-events: none; 
}

@keyframes sicrama {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}

@keyframes yavascaBelir {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .hero-arkaplan {
    height: 400px; 
  }

  .etkinlikler-container {
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