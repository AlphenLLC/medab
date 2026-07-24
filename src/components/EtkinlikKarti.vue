<template>
  <div class="etkinlik-karti" :class="etkinlik.durum">
    <div class="icerik-alani">
      <h3 class="baslik">{{ etkinlik.baslik }}</h3>
      <div class="durum-metni" :class="etkinlik.durum">
        {{ formatDurum(etkinlik.durum) }}
      </div>
      <div class="detaylar">
        <span class="tarih">
          <Calendar class="ikon" :size="16" />
          {{ etkinlik.tarih }}
        </span>
        <span class="yer" v-if="etkinlik.yer">
          <MapPin class="ikon" :size="16" />
          {{ etkinlik.yer }}
        </span>
      </div> 
      <p class="aciklama">{{ etkinlik.aciklama }}</p>
      <router-link :to="`/etkinlik/${etkinlik.id}`" class="btn_one">
        Devamını Gör <ArrowRight class="ok-ikonu" :size="16" />
      </router-link>
    </div>
    <div class="resim-alani">
      <img :src="etkinlik.resim" :alt="etkinlik.baslik" />
    </div>
  </div>
</template>

<script setup>
import { Calendar, MapPin, ArrowRight } from 'lucide-vue-next'

defineProps({
  etkinlik: {
    type: Object,
    required: true
  }
})

const formatDurum = (durum) => {
  const durumlar = {
    'bitti': 'Tamamlandı',
    'aktif': 'Başvurular Açık',
    'plan': 'Başvurular Kapandı'
  }
  return durumlar[durum] || durum
}
</script>

<style lang="scss" scoped>
.etkinlik-karti {
  display: flex;
  flex-direction: row; 
  justify-content: space-between;
  background-color: #000000; 
  border: 1px solid #1f1f1f; 
  border-radius: 4px; 
  overflow: hidden;
  transition: border-color 0.3s ease;

  &:hover {
    border-color: #444444; 
  }

  .icerik-alani {
    flex: 1; 
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start; 
    text-align: left; 

    .baslik {
      margin: 0 0 0.4rem 0;
      font-size: 1.5rem;
      font-weight: 700;
      color: #ffffff;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .durum-metni {
      font-size: 0.75rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      margin-bottom: 1.2rem;

      &.bitti { color: #d32f2f; }
      &.plan { color: #f5ac00; }
      &.aktif { color: #388e3c; }
    }

    .detaylar {
      display: flex;
      flex-wrap: wrap;
      gap: 1.5rem;
      margin-bottom: 1.2rem;
      font-size: 0.9rem;
      color: #777777;
      
      span {
        display: flex;
        align-items: center;
        gap: 0.5rem; 
      }

      .ikon {
        color: #aaaaaa; 
      }
    }

    .aciklama {
      margin: 0 0 1.5rem 0;
      color: #aaaaaa;
      line-height: 1.6;
      font-size: 1rem;
    }

    .btn_one {
      margin-top: auto;
      display: inline-flex;
      text-decoration: none;
      align-items: center;
      gap: 12px; 
      font-family: 'Montserrat', sans-serif;
      font-size: 16px;
      font-weight: 700;
      color: #000000;
      background-color: #ffffff;
      padding: 14px 32px;
      border-radius: 50px;
      border: none;
      letter-spacing: -0.5px;
      cursor: pointer;
      transition: all 0.2s ease-in-out;

      .ok-ikonu {
        transition: transform 0.2s ease;
      }

      &:hover {
        background-color: #d1d5db;
        
        .ok-ikonu {
          transform: translateX(5px);
        }
      }
    }
  }

  .resim-alani {
    width: 40%; 
    min-width: 250px; 
    background-color: #0a0a0a; 
    position: relative;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover; 
      display: block;
      opacity: 0.8; 
      transition: opacity 0.3s ease;
    }
  }

  &:hover .resim-alani img {
    opacity: 1; 
  }

  @media (max-width: 650px) {
    flex-direction: column-reverse; 
    
    .icerik-alani {
      padding: 1.5rem;
    }

    .resim-alani {
      width: 100%;
      height: 220px;
    }
  }
}
</style>