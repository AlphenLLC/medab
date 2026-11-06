<template>
  <main class="ekibimiz-sayfasi">
    <AboutTeam />
    <section class="team-container">
      <TeamList />
    </section>
  </main>
</template>

<script setup>
import TeamList from '../components/TeamList.vue'
import AboutTeam from '../components/AboutTeam.vue'
</script>

<style scoped>
.ekibimiz-sayfasi {
  width: 100%;
  background-color: #000000;
  min-height: 100vh;
}

.team-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 1rem;
}

@media (max-width: 768px) {
  .team-container {
    padding: 2rem 1rem;
    text-align: center;
  }
}
</style>