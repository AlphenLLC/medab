<template>
  <section class="about-page-wrapper">
    <div class="about-container">
      <AboutText /> 
    </div>
    <div class="pillars-container">
      <AboutPillars />
    </div>
  </section>
  <div class="org-banner-container">
    <OrgBanner />
  </div>
</template>

<script setup>
import AboutText from '../components/AboutFull.vue'
import AboutPillars from '../components/AboutPillars.vue'
import OrgBanner from '../components/OrgBanner.vue'
</script>

<style scoped>
.about-page-wrapper {
  padding: 0; 
}

.about-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 4rem;
}

.pillars-container {
  max-width: 1200px;
  margin: 0 auto; 
  width: 100%;
}

.team-container {
  max-width: 1200px;
  margin: 0 auto; 
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center; 
}

@media (max-width: 768px) {
  .about-container {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
  }

  .team-container {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
  }
  
  .pillars-container {
    text-align: center;
  } 
}
</style>