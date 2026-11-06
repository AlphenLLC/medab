<template>
  <main class="about-page-wrapper">

    <AboutText /> 
    
    <AboutPillars />
    
    <OrgBanner />
  </main>
</template>

<script setup>
import AboutText from '../components/AboutFull.vue'
import AboutPillars from '../components/AboutPillars.vue'
import OrgBanner from '../components/OrgBanner.vue'
</script>

<style scoped>

.about-page-wrapper {
  width: 100%;
  background-color: #000000;
  min-height: 100vh;
  overflow-x: hidden; 
}
</style>