<template>
  <div class="dergi-sayfasi">
    <div class="hero-arkaplan" :style="{ backgroundImage: `url(${aktifDergi.kapakResmi})` }">
      <div class="fade-overlay"></div>
    </div>
    <section class="dergi-container">
      <div class="dergi-header">
        <div class="header-sol-kisim">
          <h2>MEDAB NEWSWIRE</h2>
          <p class="issue-description">{{ aktifDergi.aciklama }}</p>
        </div>
        <select v-model.number="seciliSayi" class="year-dropdown">
          <option v-for="dergi in dergiListesi" :key="dergi.id" :value="dergi.id">
            {{ dergi.baslik }}
          </option>
        </select>
      </div>
      <h3 class="issue-subtitle">{{ aktifDergi.baslik }}</h3>
      <div class="okuyucu-alani">
        <Reader :pdfSource="aktifDergi.pdfSource" />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Reader from '../components/Reader.vue'

const dergiListesi = ref([
  {
    id: 1,
    baslik: 'Sayı 1 — Güz 2026',
    aciklama: 'Kardiyovasküler sistem temalı ilk sayımız.',
    kapakResmi: 'https://img.youtube.com/vi/loqNdeBmMpU/maxresdefault.jpg', 
    pdfSource: '/pdf/sayi1.pdf', 
  },
  {
    id: 2,
    baslik: 'Sayı 2 — Bahar 2027',
    aciklama: 'İkinci sayımızda adli tıp vakaları yer alıyor.',
    kapakResmi: 'https://img.youtube.com/vi/u0ZTcAOP9kk/maxresdefault.jpg',
    pdfSource: 'https://ontheline.trincoll.edu/images/bookdown/sample-local-pdf.pdf'
  }
])

const seciliSayi = ref(1)
const aktifDergi = computed(() => {
  return dergiListesi.value.find(d => d.id === seciliSayi.value) || dergiListesi.value[0]
})
</script>

<style lang="scss" scoped>
.dergi-sayfasi {
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
  background-size: cover;
  background-position: center 20%;
  z-index: 0;
  pointer-events: none; 
  transition: background-image 0.5s ease-in-out;

  .fade-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,1) 100%);
  }
}

.dergi-container {
  max-width: 900px;
  margin: 0 auto;
  padding-top: 140px; 
  padding-left: 1rem;
  padding-right: 1rem;
  padding-bottom: 3rem; 
  position: relative; 
  z-index: 1; 
}

.dergi-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #222222;
}

.header-sol-kisim {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: center;
  
  h2 {
    font-size: 3.2rem; 
    margin: 0;
    color: #ffffff;
    letter-spacing: 2px;
    text-shadow: 0 4px 15px rgba(0, 0, 0, 0.8); 
    text-transform: uppercase;
    font-weight: 900;
  }
}

.issue-description {
  color: #cccccc;
  font-size: 1.1rem;
  margin: 0;
  line-height: 1.5;
  font-weight: normal;
}

.year-dropdown {
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  color: #ffffff;
  border: 1px solid #444444;
  border-radius: 8px;
  background-color: #111111;
  cursor: pointer;
  outline: none;
  font-family: inherit;
  font-weight: 500;
  transition: border-color 0.2s;
  min-width: 200px;
  
  &:focus {
    border-color: #a30000;
  }
}

.issue-subtitle {
  font-size: 1.1rem;
  color: #dddddd;
  margin-bottom: 0.8rem;
  font-weight: bold;
  text-align: left;
}

.okuyucu-alani {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .hero-arkaplan {
    height: 400px; 
  }

  .dergi-container {
    padding-top: 100px;
  }

  .dergi-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.2rem;
  }

  .header-sol-kisim h2 {
    font-size: 2.2rem; 
  }

  .issue-description {
    font-size: 1rem;
  }

  .year-dropdown {
    width: 100%;
    min-width: unset;
  }
}
</style>