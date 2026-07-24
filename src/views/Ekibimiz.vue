<template>
  <section class="about-page">
   <div class="about-team">
<AboutTeam />
  </div>
  </section>
      <div class="team-container">
      <TeamList />
    </div>
</template>

<script setup>
import TeamList from '../components/TeamList.vue'
import AboutTeam from '../components/AboutTeam.vue'
</script>

<style scoped>
.about-page {
  padding: 0; 
}

.about-team {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 4rem;
}

.team-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 4rem;
}

@media (max-width: 768px) {
  .team-container {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
  }
}
</style>