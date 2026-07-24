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
<!-- toga easter egg -->
        <div v-else-if="tumEtkinliklerYuklendi" class="easter-egg-glance">
          <p class="bitis-mesaji">How about we grow our little family together?</p>
          <div class="glance-bg"></div>
          <div class="katilim-alani">
            <a href="#" class="btn_one">
              Başvuru Yap <i class="fas fa-arrow-right"></i>
            </a>
          </div>
          
        </div>
      </div>
    </section>
    <div class="karanlik-gecis"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import EtkinlikKarti from '../components/EtkinlikKarti.vue'
import { eventCatalog } from '../data/eventCatalog.js' 


const etkinlikListesi = ref(eventCatalog)

/* infinite scroll */
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
    flex-direction: column;
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
      display: flex; 
      flex-direction: column;
      align-items: center; 
      justify-content: center;
      margin-top: 4rem; 
      padding-bottom: 2rem;
      overflow: hidden;
      cursor: crosshair;
      -webkit-tap-highlight-color: transparent;
      gap: 1.5rem; 

      .bitis-mesaji {
        color: #3f3f3f;
        font-size: 1.1rem;
        letter-spacing: 6px;
        text-transform: uppercase;
        font-weight: 800;
        margin: 0; 
        z-index: 2;
        transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
        pointer-events: none;
      }

      .glance-bg {
        width: 100%; 
        max-width: 500px; 
        height: 180px;    
        background-image: url('https://i.pinimg.com/736x/08/b3/0a/08b30a825948e2c487ceb51e040f59ad.jpg'); 
        background-size: cover;
        background-position: center 30%; 
        opacity: 0.12; 
        filter: grayscale(100%) blur(2px);
        transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
        -webkit-mask-image: radial-gradient(ellipse at center, black 15%, transparent 60%);
        mask-image: radial-gradient(ellipse at center, black 15%, transparent 60%);
        z-index: 1;
      }
      
      .katilim-alani {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 1.5rem; 
        
        opacity: 0;
        pointer-events: none;
        transform: translateY(-10px);
        transition: all 0.6s cubic-bezier(0.25, 1, 0.5, 1);
        z-index: 3;

        .btn_one {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-family: 'Montserrat', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: #000000;
          background-color: #ffffff;
          padding: 12px 28px;
          border-radius: 50px;
          letter-spacing: -0.5px;
          transition: all 0.2s ease-in-out;
          text-decoration: none;

          i {
            font-size: 13px;
            transition: transform 0.2s ease;
          }

          &:hover {
            background-color: #d1d5db;
            i {
              transform: translateX(5px);
            }
          }
        }
      }

      &:hover, &:active {
        .bitis-mesaji {
          color: #ffffff; 
          text-shadow: 0 0 15px rgba(255, 255, 255, 0.4);
          transform: translateY(-5px); 
        }
        
        .glance-bg {
          opacity: 0.8; 
          filter: grayscale(10%) blur(0px) contrast(130%); 
          transform: scale(1.03);
          -webkit-mask-image: radial-gradient(ellipse at center, black 55%, transparent 95%);
          mask-image: radial-gradient(ellipse at center, black 55%, transparent 95%);
        }
        
        .katilim-alani {
          opacity: 1;
          pointer-events: auto; 
          transform: translateY(0);
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

    .yukleme-alani {
      .easter-egg-glance {
        margin-top: 2rem;
        gap: 1.5rem; 
        
        .bitis-mesaji {
          font-size: 0.85rem; 
          letter-spacing: 4px;
        }

        .glance-bg {
          height: 160px; 
          opacity: 0.18; 
          
          -webkit-mask-image: radial-gradient(ellipse at center, black 25%, transparent 60%);
          mask-image: radial-gradient(ellipse at center, black 25%, transparent 60%);
        }
        
        .katilim-alani {
          margin-top: 0.5rem; 
          
          .btn_one { 
            padding: 10px 24px; 
            font-size: 14px; 
          }
        }
      }
    }
  }
}
</style>