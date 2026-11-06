<template>
  <article class="etkinlik-karti" :class="etkinlik.durum">
    <div class="icerik-alani">
      <h2 class="baslik">
        <router-link :to="`/etkinlik/${etkinlik.id}/`" class="baslik-link">
          {{ etkinlik.baslik }}
        </router-link>
      </h2>
      <div class="durum-metni" :class="etkinlik.durum">
        {{ formatDurum(etkinlik.durum) }}
      </div>
      <div class="detaylar">
        <span class="tarih">
          <AppIcon name="calendar" class="ikon" :size="16" />
          {{ etkinlik.tarih }}
        </span>
        <span v-if="etkinlik.yer" class="yer">
          <AppIcon name="map-pin" class="ikon" :size="16" />
          {{ etkinlik.yer }}
        </span>
      </div>
      <p class="aciklama">{{ etkinlik.aciklama }}</p>
      <router-link :to="`/etkinlik/${etkinlik.id}/`" class="btn_one">
        Devamını Gör <AppIcon name="arrow-right" class="ok-ikonu" :size="16" />
      </router-link>
    </div>
    <router-link :to="`/etkinlik/${etkinlik.id}/`" class="resim-alani" tabindex="-1" :aria-label="etkinlik.baslik">
      <img :src="etkinlik.resim" :alt="etkinlik.baslik" loading="lazy" decoding="async" />
    </router-link>
  </article>
</template>

<script setup>
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

      .baslik-link {
        color: inherit;
        text-decoration: none;
        transition: opacity 0.2s ease;

        &:hover {
          opacity: 0.85;
        }
      }
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
        display: inline-block;
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
    display: block;
    text-decoration: none;

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