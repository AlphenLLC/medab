<template>
  <div class="about-page" lang="tr">
    <div class="hero-arkaplan">
      <div class="fade-overlay"></div>
    </div>

    <section class="about-container">
      <div class="baslik-kapsayici">
        <h2 class="editorial-title">BİZ KİMİZ?</h2>

        <p class="baslik-aciklamasi vurgu">
          Medeniyet Akademik ve Bilimsel Faaliyetler Kulübü (MedAB), İstanbul Medeniyet Üniversitesi Tıp Fakültesi öğrencilerinin akademik ve bilimsel gelişimini desteklemek amacıyla 2025 yılında kuruldu.
        </p>
        
        <p class="baslik-aciklamasi">
          Tıp eğitimini yalnızca derslik ve sınavlarla sınırlı görmüyor; öğrencilerin farklı alanlarda bilgi ve deneyim kazanabilecekleri, bilimsel düşünceyi geliştirebilecekleri ve mesleki bakış açılarını genişletebilecekleri bir eğitim ortamının parçası olmayı hedefliyoruz.
        </p>

        <p class="baslik-aciklamasi">
          Multidisipliner sempozyumlar ve konferans serilerinden mesleki beceri atölyelerine ve sosyal sorumluluk projelerine kadar uzanan geniş bir çalışma alanında fakülte deneyimine değer katıyoruz. Bu süreci fakülte akademik kadromuzun rehberliği ve karşılıklı iş birliğiyle yürütüyoruz.
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.about-page {
  position: relative;
  width: 100%;
  background-color: #000000; 
}

.hero-arkaplan {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: clamp(580px, 72vh, 680px); 
  background-image: url('../../public/branding/hakkimizda-banner.webp'); 
  background-size: cover;
  /* Kalabalığın yüzlerini ortalayan kadraj */
  background-position: center 58%;
  filter: brightness(0.7) contrast(1.06);
  z-index: 0;
  pointer-events: none; 

  .fade-overlay {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    /* Çift katman: Kenarlarda amfiyi açığa çıkarır, metin arkasına odaklı derinlik katar */
    background: 
      radial-gradient(ellipse 75% 65% at 50% 48%, rgba(0, 0, 0, 0.76) 0%, rgba(0, 0, 0, 0.4) 60%, transparent 100%),
      linear-gradient(
        to bottom, 
        rgba(0, 0, 0, 0.3) 0%, 
        rgba(0, 0, 0, 0.35) 40%, 
        rgba(0, 0, 0, 0.85) 75%, 
        #000000 100%
      );
  }
}

.about-container {
  max-width: 820px;
  margin: 0 auto;
  padding-top: 140px; 
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-bottom: 36px;
  position: relative; 
  z-index: 1; 

  .baslik-kapsayici {
    position: relative;
    text-align: center;
    /* Metin bloğunun arkasını amfiden ayıran yumuşak degrade */
    background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.55) 0%, transparent 80%);
    padding: 16px 20px;
    border-radius: 20px;

    .editorial-title {
      font-family: 'Archivo Black', sans-serif;
      font-size: clamp(2.8rem, 5.8vw, 4.4rem); 
      color: #ffffff;
      letter-spacing: -2px;
      line-height: 1.0;
      margin: 0 0 2.2rem 0;
      text-transform: uppercase;
      text-shadow: 0 4px 24px rgba(0, 0, 0, 1);
    }

    .baslik-aciklamasi {
      font-family: 'Montserrat', sans-serif;
      color: #e4e4e7;
      font-size: 1.05rem;
      font-weight: 400;
      max-width: 760px;
      margin: 0 auto 1.5rem auto;
      line-height: 1.75;
      
      /* İnsanların açık kıyafetleri üzerinde yazıyı koruyan çift katmanlı gölge */
      text-shadow: 0 2px 12px rgba(0, 0, 0, 1), 0 1px 3px rgba(0, 0, 0, 0.95);
      
      text-align: justify;
      text-justify: inter-word;
      -webkit-hyphens: auto;
      -ms-hyphens: auto;
      hyphens: auto;
      
      &.vurgu {
        color: #ffffff;
        font-size: 1.18rem;
        font-weight: 500;
        line-height: 1.7;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

@media (max-width: 768px) {
  .hero-arkaplan {
    height: 440px; 
    background-position: center 64%;
  }

  .about-container {
    padding-top: 105px;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    padding-bottom: 20px;
    
    .baslik-kapsayici {
      padding: 10px;

      .editorial-title { 
        font-size: 2.35rem;
        letter-spacing: -1.2px;
        margin-bottom: 1.5rem;
      }
      
      .baslik-aciklamasi {
        font-size: 0.95rem;
        line-height: 1.65;
        text-align: justify;
        text-justify: inter-word;
        margin-bottom: 1.25rem;
        
        &.vurgu {
          font-size: 1.05rem;
        }
      }
    }
  }
}
</style>