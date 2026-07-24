<template>
  <div class="team-section">
    <div class="team-header">
      <h2>Meet the Team</h2>
      <select v-model="selectedYear" class="year-dropdown">
        <option value="2026-2027">2026-2027 Dönemi</option>
        <option value="2025-2026">2025-2026 Dönemi</option>
      </select>
    </div>
    <div class="team-grid">
      <div v-for="member in currentTeam" :key="member.id" class="team-card">
        <div class="member-image">
          <img v-if="member.image" :src="member.image" :alt="member.name" />
          <div v-else class="placeholder-img"></div>
        </div>
        <div class="member-info">
          <h4>{{ member.name }}</h4>
          <p>{{ member.department }}</p>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedYear = ref('2026-2027')

const teamData = {
  '2026-2027': [
    { id: 1, name: 'Güleda Kanarya', department: 'Yönetim Kurulu Başkanı', image: '' },
    { id: 2, name: 'Güleda Kanarya', department: 'Yönetim Kurulu Başkanı', image: '' },   
 { id: 3, name: 'Güleda Kanarya', department: 'Yönetim Kurulu Başkanı', image: '' },    
 { id: 4, name: 'Güleda Kanarya', department: 'Yönetim Kurulu Başkanı', image: '' },
  { id: 4, name: 'Güleda Kanarya', department: 'Yönetim Kurulu Başkanı', image: '' },
   { id: 4, name: 'Güleda Kanarya', department: 'Yönetim Kurulu Başkanı', image: '' },
  ],
  '2025-2026': [

    { id: 5, name: 'Alp Osman Biçersin', department: 'test', image: '' },
    { id: 6, name: 'Alp Osman Biçersin', department: 'test', image: '' },
    { id: 7, name: 'Alp Osman Biçersin', department: 'test', image: '' },
    { id: 8, name: 'Alp Osman Biçersin', department: 'test', image: '' },
    { id: 8, name: 'Alp Osman Biçersin', department: 'test', image: '' },
    { id: 8, name: 'Alp Osman Biçersin', department: 'test', image: '' },
    
  ]
}

const currentTeam = computed(() => {
  return teamData[selectedYear.value]
})
</script>

<style scoped>
.team-section {
  margin-top: 5rem;
  width: 100%;
}

.team-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
}

.team-header h3 {
  font-size: 2rem;
  margin: 0;
  color: #111;
}

.year-dropdown {
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  color: #ffffff;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #000000;
  cursor: pointer;
  outline: none;
  font-family: inherit;
  font-weight: 500;
  transition: border-color 0.2s;
}

.year-dropdown:focus {
  border-color: #007bff;
}

/* card grid */
.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}


.team-card {
  display: flex;
  align-items: center; 
  background: #121212;
  padding: 1.2rem;
  border-radius: 12px;
  border: 1px solid #eee;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.team-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.06);
}


.member-image {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 1.2rem; 
  flex-shrink: 0; 
}

.member-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.placeholder-img {
  width: 100%;
  height: 100%;
  background-color: #d1d5db;
}

.member-info h4 {
  margin: 0 0 0.3rem 0;
  font-size: 1.1rem;
  color: #ffffff;
}

.member-info p {
  margin: 0;
  font-size: 0.9rem;
  color: #fafafa;
  font-weight: 500;
}

@media (max-width: 768px) {
  .team-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    padding: 2vh 15px;
  }
  
  .year-dropdown {
    width: 100%;
  }
  
  .team-grid {
    grid-template-columns: 1fr;
    flex-direction: column;
    gap: 1rem;
    padding: 2vh 15px;
  }
}
</style>