<template>
  <header :class="{ 'is-scrolled': hasScrolled, 'is-menu-open': isMenuOpen }">
    <div class="header-container">
      <div class="brand">
        <img src="../assets/logo.webp" alt="Kulüp Logosu" class="logo-img" />
        <span class="logo-text">Femgine</span>
      </div>
      <button class="hamburger" @click="toggleMenu" aria-label="Menü">
        <span class="line" :class="{ 'line-top': isMenuOpen }"></span>
        <span class="line" :class="{ 'line-middle': isMenuOpen }"></span>
        <span class="line" :class="{ 'line-bottom': isMenuOpen }"></span>
      </button>
    </div>

    <!-- Tam Ekran Menü -->
    <div class="fullscreen-overlay" :class="{ 'is-open': isMenuOpen }">
      <nav class="overlay-nav">
        <a href="#basvur" @click="closeMenu">Başvur</a>
        <a href="#hakkimizda" @click="closeMenu">Hakkımızda</a>
        <a href="#etkinlikler" @click="closeMenu">Etkinlikler</a>
        <a href="#Dergi" @click="closeMenu">Dergi</a>
        <a href="#raporlar" @click="closeMenu">Faaliyet Kitapçıkları</a>
        <a href="#Galeri" @click="closeMenu">Galeri</a>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'TheHeader',
  data() {
    return {
      hasScrolled: false,
      isMenuOpen: false
    }
  },
  methods: {
    handleScroll() {
      if (!this.isMenuOpen) {
        this.hasScrolled = window.scrollY > 50;
      }
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      this.toggleBodyScroll();
    },
    closeMenu() {
      this.isMenuOpen = false;
      this.toggleBodyScroll();
    },
    toggleBodyScroll() {
      if (this.isMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    document.body.style.overflow = ''; 
  }
}
</script>

<style lang="scss" scoped>
$primary-color: #07478c;
$text-light: #ffffff;
$bg-light: #ffffff;
$header-height: 70px;

header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: $header-height;
  background-color: $primary-color;
  color: $text-light;
  transition: all 0.4s ease-in-out;
  z-index: 50; 

  &.is-scrolled {
    background-color: $bg-light;
    color: $primary-color;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.09);

    .hamburger .line {
      background-color: $primary-color; 
    }
  }

  &.is-menu-open {
    background-color: $primary-color;
    color: $text-light;
    box-shadow: none;

    .hamburger .line {
      background-color: $text-light;
    }
  }
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 4vw;
  max-width: 1200px;
  margin: 0 auto;
}

.brand {
  display: flex;
  align-items: center;
  gap: 15px; 

  .logo-img {
    height: 35px; 
    width: auto;
  }

  .logo-text {
    font-size: 24px;
    font-weight: bold;
    white-space: nowrap;
  }
}

.hamburger {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 60; 

  .line {
    display: block;
    height: 3px;
    width: 100%;
    background-color: $text-light;
    transition: all 0.3s ease-in-out;
    border-radius: 2px;
  }

  .line-top {
    transform: translateY(8.5px) rotate(45deg);
  }
  .line-middle {
    opacity: 0;
  }
  .line-bottom {
    transform: translateY(-8.5px) rotate(-45deg);
  }
}

.fullscreen-overlay {
  position: fixed;
  top: $header-height; 
  left: 0;
  width: 100vw;
  height: calc(100vh - $header-height);
  background-color: $primary-color;
  display: flex;
  flex-direction: column;
  padding-top: 10vh; 
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.4s ease, visibility 0.4s;
  visibility: hidden;

  &.is-open {
    opacity: 1;
    pointer-events: auto;
    visibility: visible;
  }

  .overlay-nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;

    a {
      color: $text-light;
      text-decoration: none;
      font-size: 32px;
      font-weight: bold;
      transition: opacity 0.3s;

      &:hover {
        opacity: 0.7;
      }
    }
  }
}
</style>