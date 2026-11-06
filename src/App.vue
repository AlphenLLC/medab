<template>
  <div class="app-shell">
    <Header />
    <main class="page-viewport-container">
      <router-view />
    </main>
    <Contact />
    <Footer />
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import Contact from './components/Contact.vue'
import Footer from './components/Footer.vue'
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  overflow-x: hidden;
}

#app, .app-shell {
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.page-viewport-container {
  flex: 1;
  min-height: 100vh;
  min-height: 100svh;
  width: 100%;
}
</style>