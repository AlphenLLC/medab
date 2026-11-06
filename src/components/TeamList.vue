<template>
  <div class="team-section">
    <div class="team-header">
      <div class="select-wrapper">
        <select
          v-model="selectedYear"
          class="year-dropdown"
          aria-label="Dönem Seçimi"
        >
          <option
            v-for="year in availableYears"
            :key="year"
            :value="year"
          >
            {{ year }} Dönemi
          </option>
        </select>
      </div>
    </div>

    <!-- Boş Durum Kontrolü -->
    <div v-if="!groupedTeams || groupedTeams.length === 0" class="empty-state">
      <p>Bu döneme ait kayıtlı üye bilgisi bulunamadı.</p>
    </div>

    <!-- Ekip Bazlı Dropdown (Accordion) Listesi -->
    <div v-else class="team-groups">
      <div
        v-for="group in groupedTeams"
        :key="group.teamName"
        class="team-group"
        :class="{ 'is-expanded': isGroupOpen(group.teamName) }"
      >
        <button
          type="button"
          class="team-group-header"
          :aria-expanded="isGroupOpen(group.teamName)"
          @click="toggleGroup(group.teamName)"
        >
          <div class="group-title-wrapper">
            <h3 class="group-title">{{ group.teamName }}</h3>
          </div>
          <svg
            class="chevron-icon"
            :class="{ 'is-open': isGroupOpen(group.teamName) }"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>

        <!-- v-show (display: none) yerine CSS Grid Collapse: Googlebot tüm isimleri aktif DOM'da görür -->
        <div
          class="team-grid-collapse"
          :class="{ 'is-open': isGroupOpen(group.teamName) }"
        >
          <div class="team-grid-inner">
            <div class="team-grid">
              <div
                v-for="member in group.members"
                :key="getMemberKey(member)"
                class="team-card"
                :class="{
                  'is-commonworks': isCommonworksMember(member),
                  'is-slashed': isMemberSlashing(member)
                }"
                itemscope
                itemtype="https://schema.org/Person"
                @click="handleMemberClick(member)"
              >
                <!-- Monogram Baş Harf Rozeti -->
                <div class="member-monogram" aria-hidden="true">
                  {{ getInitials(member.name) }}
                </div>

                <div class="member-info">
                  <h4 itemprop="name">{{ member.name }}</h4>
                  <p itemprop="jobTitle">{{ member.role || member.department || group.teamName }}</p>
                </div>

                <!-- Sadece Commonworks Üyeleri İçin Beyaz Mat 2D Kılıç Kesişi -->
                <div v-if="isCommonworksMember(member) && isMemberSlashing(member)" class="slash-fx-container" aria-hidden="true">
                  <svg class="slash-svg" viewBox="0 0 200 50" preserveAspectRatio="none">
                    <path
                      class="slash-silhouette"
                      d="M 0,26 L 60,26 C 85,26 105,27 118,27 C 117,24 115,22 113,20 C 124,16 145,18 170,24 C 178,26 186,28 186,29 C 180,33 165,35 140,36 C 95,35 50,30 0,28 Z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { TEAM_TERMS, getTeamByYear } from '../data/teamData.js'

const SITE_URL = 'https://imumedab.com'
const availableYears = Object.keys(TEAM_TERMS || {})
const selectedYear = ref('2026-2027')

// Açık olan ekip dropdown'larını takip eden state
const openGroups = ref({})

// Hangi üye kartlarında kesme animasyonunun aktif olduğunu takip eden state
const slashingCards = ref({})
const slashTimers = new Map()

const currentTeam = computed(() => {
  return getTeamByYear(selectedYear.value) || []
})

// Üyeleri 'order' sırasını bozmadan ekiplerine göre gruplar
const groupedTeams = computed(() => {
  const groups = []
  const groupMap = new Map()

  for (const member of currentTeam.value) {
    const teamName = member.team || 'Diğer'
    if (!groupMap.has(teamName)) {
      const newGroup = { teamName, members: [] }
      groupMap.set(teamName, newGroup)
      groups.push(newGroup)
    }
    groupMap.get(teamName).members.push(member)
  }

  return groups
})

// Dönem değiştiğinde veya sayfa ilk açıldığında tüm ekip gruplarını KAPALI (false) başlatır
watch(
  groupedTeams,
  (newGroups) => {
    const state = {}
    newGroups.forEach((g) => {
      state[g.teamName] = false
    })
    openGroups.value = state
  },
  { immediate: true }
)

const toggleGroup = (teamName) => {
  openGroups.value[teamName] = !openGroups.value[teamName]
}

const isGroupOpen = (teamName) => {
  return !!openGroups.value[teamName]
}

// Commonworks veya Bilişim ekibinde olup olmadığını kontrol eder
const isCommonworksMember = (member) => {
  const teamStr = (member.team || '').toLocaleLowerCase('tr-TR')
  const roleStr = (member.role || '').toLocaleLowerCase('tr-TR')
  return teamStr.includes('commonworks') || roleStr.includes('commonworks') || teamStr.includes('bilişim')
}

const getMemberKey = (member) => {
  return `${member.id}-${member.order}`
}

const isMemberSlashing = (member) => {
  return !!slashingCards.value[getMemberKey(member)]
}

// Sadece Commonworks üyesine tıklandığında kesme efektini tetikler
const handleMemberClick = (member) => {
  if (!isCommonworksMember(member)) return

  // Kullanıcı metin seçiyorsa kesme efektini tetiklemeyi önle
  const selection = window.getSelection()
  if (selection && selection.toString().length > 0) return

  const key = getMemberKey(member)
  if (slashingCards.value[key]) return

  slashingCards.value[key] = true

  if (slashTimers.has(key)) {
    clearTimeout(slashTimers.get(key))
  }

  const timer = setTimeout(() => {
    delete slashingCards.value[key]
    slashTimers.delete(key)
  }, 340)

  slashTimers.set(key, timer)
}

const getInitials = (fullName) => {
  if (!fullName) return '•'
  const parts = fullName.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].substring(0, 2).toLocaleUpperCase('tr-TR')
  return (parts[0][0] + parts[parts.length - 1][0]).toLocaleUpperCase('tr-TR')
}

// Google'ın akordeonlar kapalı olsa bile TÜM dönemlerdeki üyeleri %100 indekslemesi için JSON-LD Şeması
const injectTeamSchema = () => {
  const uniqueMembers = new Map()

  availableYears.forEach((yr) => {
    const list = getTeamByYear(yr) || []
    list.forEach((m) => {
      if (m && m.name && !uniqueMembers.has(m.name)) {
        uniqueMembers.set(m.name, {
          '@type': 'Person',
          name: m.name,
          jobTitle: m.role || m.department || m.team || 'MedAB Ekip Üyesi',
          memberOf: {
            '@type': 'Organization',
            name: 'İstanbul Medeniyet Üniversitesi MedAB'
          }
        })
      }
    })
  })

  const schemaScriptId = 'team-members-jsonld-schema'
  let script = document.getElementById(schemaScriptId)
  if (!script) {
    script = document.createElement('script')
    script.id = schemaScriptId
    script.type = 'application/ld+json'
    document.head.appendChild(script)
  }

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'Ekibimiz | MedAB',
    description: 'İstanbul Medeniyet Üniversitesi MedAB yönetim kurulu, koordinatörleri ve çalışma ekipleri.',
    url: `${SITE_URL}/ekibimiz/`,
    mainEntity: {
      '@type': 'Organization',
      name: 'İstanbul Medeniyet Üniversitesi MedAB',
      url: `${SITE_URL}/`,
      member: Array.from(uniqueMembers.values())
    }
  }

  script.textContent = JSON.stringify(schemaData)
}

onMounted(() => {
  injectTeamSchema()
})

onBeforeUnmount(() => {
  slashTimers.forEach((timer) => clearTimeout(timer))
  slashTimers.clear()
  const script = document.getElementById('team-members-jsonld-schema')
  if (script) script.remove()
})
</script>

<style scoped>
.team-section {
  margin-top: 1.5rem;
  width: 100%;
  user-select: text;
  -webkit-user-select: text;
}

.team-header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 2rem;
}

.select-wrapper {
  position: relative;
}

.year-dropdown {
  appearance: none;
  -webkit-appearance: none;
  padding: 0.65rem 2.6rem 0.65rem 1.25rem;
  font-size: 0.95rem;
  color: #ffffff;
  border: 1px solid rgba(220, 38, 38, 0.28);
  border-radius: 8px;
  background-color: #120203;
  cursor: pointer;
  outline: none;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  transition: border-color 0.2s, box-shadow 0.2s, background-color 0.2s;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23ef4444' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
}

.year-dropdown:focus, .year-dropdown:hover {
  border-color: #ef4444;
  background-color: #1a0305;
  box-shadow: 0 0 20px rgba(185, 28, 28, 0.2);
}

.year-dropdown option {
  background-color: #120203;
  color: #ffffff;
}

.year-dropdown option:disabled {
  color: #52525b;
}

.empty-state {
  padding: 3.5rem 1.5rem;
  text-align: center;
  color: #e2a8a8;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.95rem;
  background-color: #070001;
  border: 1px dashed rgba(220, 38, 38, 0.25);
  border-radius: 8px;
}

/* Ekip Grupları (Dropdown / Accordion) */
.team-groups {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
}

.team-group {
  background: #070001;
  border: 1px solid rgba(220, 38, 38, 0.18);
  border-radius: 10px;
  overflow: hidden;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.team-group:hover {
  border-color: rgba(220, 38, 38, 0.38);
}

.team-group-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.1rem 1.35rem;
  background: linear-gradient(90deg, #1a0305 0%, #120203 100%);
  border: none;
  cursor: pointer;
  color: #ffffff;
  font-family: 'Montserrat', sans-serif;
  text-align: left;
  transition: background 0.2s;
}

.team-group-header:hover {
  background: linear-gradient(90deg, #2b0407 0%, #160204 100%);
}

.group-title-wrapper {
  display: flex;
  align-items: center;
}

.group-title {
  margin: 0;
  font-size: 1.02rem;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.2px;
  text-transform: uppercase;
  user-select: text;
  -webkit-user-select: text;
}

.chevron-icon {
  color: #e2a8a8;
  transition: transform 0.25s ease, color 0.2s ease;
  flex-shrink: 0;
}

.chevron-icon.is-open {
  transform: rotate(180deg);
  color: #ef4444;
}

/* CSS Grid Collapse: display:none kullanmadan gizler, Googlebot taramaya devam eder */
.team-grid-collapse {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.28s cubic-bezier(0.4, 0, 0.2, 1);
}

.team-grid-collapse.is-open {
  grid-template-rows: 1fr;
}

.team-grid-inner {
  overflow: hidden;
  min-height: 0;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.15rem;
  width: 100%;
  padding: 1.25rem;
  border-top: 1px solid rgba(220, 38, 38, 0.15);
  box-sizing: border-box;
}

/* Standart Üye Kartı (Metin seçilebilir ve kopyalanabilir) */
.team-card {
  position: relative;
  display: flex;
  align-items: center;
  background: #120203;
  padding: 1rem 1.2rem;
  border-radius: 8px;
  border: 1px solid rgba(220, 38, 38, 0.15);
  box-sizing: border-box;
  user-select: text;
  -webkit-user-select: text;
  -webkit-tap-highlight-color: transparent;
}

/* Sadece Commonworks Üyeleri İçin Tıklanabilirlik ve Kesme Efekti */
.team-card.is-commonworks {
  cursor: pointer;
}

.team-card.is-commonworks.is-slashed {
  border-color: rgba(255, 255, 255, 0.55);
  animation: slash-recoil 0.32s cubic-bezier(0.18, 0.9, 0.32, 1) forwards;
}

@keyframes slash-recoil {
  0% { transform: scale(1); }
  25% { transform: translate(-3px, 2px) rotate(-1deg) scale(0.97); }
  60% { transform: translate(2px, -1px) scale(1.01); }
  100% { transform: translate(0, 0) scale(1); }
}

/* Beyaz Mat 2D Slash Katmanı */
.slash-fx-container {
  position: absolute;
  top: 50%;
  left: 50%;
  width: calc(100% + 28px);
  height: 54px;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
}

.slash-svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}

.slash-silhouette {
  fill: #ffffff;
  transform-origin: center center;
  animation: flat-slash-cut 0.32s cubic-bezier(0.08, 0.95, 0.18, 1) forwards;
}

@keyframes flat-slash-cut {
  0% {
    opacity: 0;
    transform: translateX(-35%) scaleX(0.2) scaleY(0.5);
  }
  18% {
    opacity: 1;
    transform: translateX(-8%) scaleX(0.75) scaleY(0.9);
  }
  48% {
    opacity: 1;
    transform: translateX(12%) scaleX(1.1) scaleY(1);
  }
  80% {
    opacity: 1;
    transform: translateX(30%) scaleX(1.25) scaleY(0.85);
  }
  100% {
    opacity: 0;
    transform: translateX(45%) scaleX(1.35) scaleY(0.4);
  }
}

.member-monogram {
  width: 46px;
  height: 46px;
  border-radius: 10px;
  background: linear-gradient(135deg, #3b0508 0%, #180203 100%);
  border: 1px solid rgba(220, 38, 38, 0.28);
  color: #fca5a5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 0.92rem;
  letter-spacing: 0.5px;
  margin-right: 1.05rem;
  flex-shrink: 0;
  user-select: none;
  -webkit-user-select: none;
}

.member-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  min-width: 0;
  text-align: left;
  user-select: text;
  -webkit-user-select: text;
}

.member-info h4 {
  font-family: 'Montserrat', sans-serif;
  margin: 0 0 0.25rem 0;
  font-size: clamp(0.92rem, 1.15vw, 1.02rem);
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.2px;
  line-height: 1.25;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: uppercase;
  user-select: text;
  -webkit-user-select: text;
}

.member-info p {
  font-family: 'Montserrat', sans-serif;
  margin: 0;
  font-size: 0.84rem;
  color: #e2a8a8;
  font-weight: 500;
  line-height: 1.35;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  user-select: text;
  -webkit-user-select: text;
}

@media (max-width: 768px) {
  .team-header {
    justify-content: stretch;
  }

  .select-wrapper, .year-dropdown {
    width: 100%;
  }

  .team-group-header {
    padding: 0.95rem 1.1rem;
  }

  .group-title {
    font-size: 0.95rem;
  }

  .team-grid {
    grid-template-columns: 1fr;
    gap: 0.85rem;
    padding: 1rem;
  }

  .team-card {
    padding: 0.9rem 1.05rem;
  }

  .slash-fx-container {
    width: calc(100% + 16px);
  }

  .member-monogram {
    width: 42px;
    height: 42px;
    font-size: 0.88rem;
    margin-right: 0.85rem;
  }

  .member-info h4 {
    font-size: 0.98rem;
  }
}
</style>