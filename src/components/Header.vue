<template>
  <header :class="{ 'is-scrolled': hasScrolled, 'is-menu-open': isMenuOpen, 'is-hidden': isHidden }">
    <div class="header-container">
      <div class="brand">
        <img src="../assets/logo.png" alt="Kulüp Logosu" class="logo-img" />
      </div>
      <nav class="desktop-nav">
        <router-link to="/">Ana Sayfa</router-link>
        <router-link to="/hakkimizda">Hakkımızda</router-link>
        <router-link to="/ekibimiz">Ekibimiz</router-link>
        <router-link to="/etkinlikler">Etkinlikler</router-link>
        <router-link to="/dergi">Dergi</router-link>
        <router-link to="/raporlar">Faaliyet Kitapçıkları</router-link>
        <router-link to="/galeri">Galeri</router-link>
      </nav>
      <button class="hamburger" @click="toggleMenu" aria-label="Menü">
        <span class="line" :class="{ 'line-top': isMenuOpen }"></span>
        <span class="line" :class="{ 'line-middle': isMenuOpen }"></span>
        <span class="line" :class="{ 'line-bottom': isMenuOpen }"></span>
      </button>
    </div>
    <div class="fullscreen-overlay" :class="{ 'is-open': isMenuOpen }">
      <nav class="overlay-nav">
        <router-link to="/" @click="closeMenu">Ana Sayfa</router-link>
        <router-link to="/hakkimizda" @click="closeMenu">Hakkımızda</router-link>
        <router-link to="/ekibimiz" @click="closeMenu">Ekibimiz</router-link>
        <router-link to="/etkinlikler" @click="closeMenu">Etkinlikler</router-link>
        <router-link to="/dergi" @click="closeMenu">Dergi</router-link>
        <router-link to="/raporlar" @click="closeMenu">Faaliyet Kitapçıkları</router-link>
        <router-link to="/galeri" @click="closeMenu">Galeri</router-link>
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
      isMenuOpen: false,
      isHidden: false,
      lastScrollY: 0
    }
  },
  methods: {
    handleScroll() {
      if (this.isMenuOpen) return;

      const currentScrollY = window.scrollY;
      this.hasScrolled = currentScrollY > 50;

      if (currentScrollY > 70 && currentScrollY > this.lastScrollY) {
        this.isHidden = true;
      } else {
        this.isHidden = false; 
      }

      this.lastScrollY = currentScrollY;
    },
    handleResize() {
      if (window.innerWidth > 768 && this.isMenuOpen) {
        this.closeMenu();
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
    window.addEventListener('scroll', this.handleScroll, { passive: true });
    window.addEventListener('resize', this.handleResize, { passive: true });
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);
    document.body.style.overflow = ''; 
  }
}
</script>

<style lang="scss" scoped>
$primary-color: #07478c;
$text-light: #ffffff;
$header-height: 70px;

header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: $header-height;
  background-color: transparent;
  color: $text-light;
  transition: transform 0.4s ease-in-out, background-color 0.4s ease-in-out, box-shadow 0.4s ease, backdrop-filter 0.4s ease;
  z-index: 50; 

  &.is-scrolled {
    background-color: rgba(0, 0, 0, 0.45);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
  }

  &.is-menu-open {
    background-color: rgba(0, 0, 0, 1);
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    box-shadow: none;

    .hamburger .line {
      background-color: $text-light;
    }
  }

  &.is-hidden {
    transform: translateY(-100%);
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
  position: relative;
}

.brand {
  display: flex;
  align-items: center;

  .logo-img {
    height: 55px;
    width: auto;
    max-width: 250px; 
    object-fit: contain;
  }
}

.desktop-nav {
  display: flex;
  align-items: center;
  gap: 32px; 

  a {
    color: $text-light;
    text-decoration: none;
    font-size: 16px;
    font-weight: 600;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 0.7;
    }
    
    &.router-link-exact-active {
      opacity: 0.5;
    }
  }
}

.hamburger {
  display: none; 
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
    transform: translateY(8.5px);
    opacity: 0;
  }
  .line-middle {
    opacity: 1;
  }
  .line-bottom {
    transform: translateY(-8.5px);
    opacity: 0;
  }
}

.fullscreen-overlay {
  display: none; 
}

@media (max-width: 768px) {
  .desktop-nav {
    display: none; 
  }

  .hamburger {
    display: flex; 
  }

  .fullscreen-overlay {
    display: flex; 
    position: fixed;
    top: $header-height; 
    left: 0;
    width: 100vw;
    height: calc(100dvh - $header-height);
    background-color: rgba(0, 0, 0, 1);
    flex-direction: column;
    padding-top: 5vh; 
    padding-bottom: 10vh; 
    overflow-y: auto; 
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.4s ease, visibility 0.4s, background-color 0.4s ease;
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
      gap: max(2vh, 20px);

      a {
        color: $text-light;
        text-decoration: none;
        font-size: 28px; 
        font-weight: bold;
        transition: opacity 0.3s;
        text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.6); 

        &:hover {
          opacity: 0.7;
        }
      }
    }
  }

  .header-container {
    justify-content: flex-end; 
  }

  .brand {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    max-width: 60vw;
    display: flex;
    justify-content: center;

    .logo-img {
      height: 35px;
    }
  }
}
</style>