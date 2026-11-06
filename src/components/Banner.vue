<template>
  <section class="perspective-section">
    <div class="ambient-bg">
      <div class="ambient-orb orb-1"></div>
      <div class="ambient-orb orb-2"></div>
      <div class="mesh-texture"></div>
      <div class="edge-fade-top"></div>
      <div class="edge-fade-bottom"></div>
    </div>
    <div class="perspective-container">
      <div class="col-left">
        <h2 class="brand-title">
          MEDAB<br />
          PERSPEKTİF
        </h2>
      </div>
      <div class="col-right">
        <h3 class="col-subtitle">SAYI #1 - KARDİYOLOJİ</h3>
        <p class="section-desc">
          Kardiyoloji temalı ilk sayımız dijital okuyucumuzda yayında! Kalbin anatomisinden klinik vaka incelemelerine uzanan zengin içeriğimizi hemen keşfedin.
        </p>
        <div class="action-wrap">
          <router-link to="/dergi/" class="btn_one">
            <span class="btn-text">Dergiyi Oku</span>
            <AppIcon name="arrow-right" class="btn-icon" :size="14" />
          </router-link>
          <a 
            href="https://www.instagram.com/imumedab" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="btn_one"
          >
            <span class="btn-text">Instagram</span>
            <AppIcon name="instagram" class="btn-icon" :size="15" />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'PerspectiveBanner'
}
</script>

<style scoped>
.perspective-section {
  width: 100%;
  background-color: #000000;
  padding: 110px 8% 130px 8%;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
}

.perspective-container {
  position: relative;
  z-index: 3;
  max-width: 1260px;
  margin: 0 auto;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 60px;
}

/* --- KUTUSUZ ARKA PLAN ATMOSFERİ --- */
.ambient-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  z-index: 1;
}

.ambient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(75px);
  will-change: transform;
}

.orb-1 {
  width: 650px;
  height: 420px;
  top: -80px;
  left: 2%;
  background: radial-gradient(circle, #dc2626 0%, #991b1b 50%, transparent 75%);
  opacity: 0.55;
}

.orb-2 {
  width: 750px;
  height: 460px;
  bottom: -100px;
  right: 5%;
  background: radial-gradient(circle, #b91c1c 0%, #7f1d1d 50%, transparent 80%);
  opacity: 0.45;
}

.mesh-texture {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    45deg,
    rgba(0, 0, 0, 0.6) 0px,
    rgba(0, 0, 0, 0.6) 3px,
    transparent 3px,
    transparent 7px
  );
  opacity: 0.85;
}

.edge-fade-top {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 90px;
  background: linear-gradient(to bottom, #000000 0%, transparent 100%);
}

.edge-fade-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 90px;
  background: linear-gradient(to top, #000000 0%, transparent 100%);
}

/* --- SOL SÜTUN --- */
.col-left {
  flex: 1.2;
  text-align: left;
}

.brand-title {
  font-family: 'Archivo Black', sans-serif;
  font-size: clamp(46px, 5.6vw, 76px);
  line-height: 0.92;
  color: #ffffff;
  letter-spacing: -3px;
  margin: 0;
  text-transform: uppercase;
}

/* --- SAĞ SÜTUN --- */
.col-right {
  flex: 1;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

.col-subtitle {
  font-family: 'Montserrat', sans-serif;
  font-size: 22px;
  font-weight: 800;
  color: #ffffff;
  margin: 0 0 14px 0;
  line-height: 1.2;
  letter-spacing: -0.5px;
  text-transform: uppercase;
}

.section-desc {
  font-family: 'Montserrat', sans-serif;
  font-size: 15.5px;
  line-height: 1.65;
  color: #d4d4d8;
  margin: 0 0 30px 0;
}

.action-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

/* --- BUTON STİLLERİ --- */
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
  text-decoration: none;
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

/* =======================================
   MOBİL UYUMLULUK
   ======================================= */
@media (max-width: 860px) {
  .perspective-section {
    padding: 60px 24px 80px 24px;
  }

  .perspective-container {
    flex-direction: column;
    gap: 32px;
  }

  .brand-title {
    font-size: clamp(38px, 10.5vw, 50px);
    letter-spacing: -1.8px;
    line-height: 0.95;
  }

  .col-subtitle {
    font-size: 19px;
    margin-bottom: 10px;
  }

  .section-desc {
    font-size: 14.5px;
    line-height: 1.6;
    margin-bottom: 24px;
  }

  .action-wrap {
    width: 100%;
    gap: 10px;
  }

  .btn_one {
    padding: 10px 22px;
    font-size: 13px;
  }

  .orb-1 {
    width: 320px;
    height: 220px;
    left: -20px;
    top: -40px;
  }

  .orb-2 {
    width: 340px;
    height: 240px;
    right: -20px;
    bottom: -40px;
  }
}
</style>