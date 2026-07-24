<template>
  <section class="pdf-reader-section">
    <div class="pdf-container">
      <vue-pdf-embed 
        :source="pdfSource" 
        :page="currentPage" 
        @loaded="handleDocumentLoaded" 
        class="pdf-document"
      />
    </div>
    <div class="controls">
      <button class="text-btn" :disabled="currentPage <= 1" @click="prevPage">
        ÖNCEKİ SAYFA
      </button>
      <div class="page-indicator">
        <input 
          type="number" 
          v-model.lazy="inputPage"
          @change="goToPage"
          class="page-input"
          min="1"
          :max="pageCount"
        />
        <span class="page-total">/ {{ pageCount }}</span>
      </div>
      <button class="text-btn" :disabled="currentPage >= pageCount" @click="nextPage">
        SONRAKİ SAYFA
      </button>
    </div>
  </section>
</template>

<!--I will be completely honest, part of this reader is vibecoded and no I'm not sorry-->
<script setup>
import { ref, watch, defineProps } from 'vue'
import VuePdfEmbed from 'vue-pdf-embed'
import { GlobalWorkerOptions } from 'pdfjs-dist/build/pdf'

GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'

const props = defineProps({
  pdfSource: {
    type: [String, Object],
    required: true
  }
})

const currentPage = ref(1)
const pageCount = ref(1)
const inputPage = ref(1)

watch(() => props.pdfSource, () => {
  currentPage.value = 1
  inputPage.value = 1
  pageCount.value = 1
})

const handleDocumentLoaded = (doc) => {
  pageCount.value = doc.numPages
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    inputPage.value = currentPage.value
  }
}

const nextPage = () => {
  if (currentPage.value < pageCount.value) {
    currentPage.value++
    inputPage.value = currentPage.value
  }
}

const goToPage = () => {
  let target = parseInt(inputPage.value)
  if (target >= 1 && target <= pageCount.value) {
    currentPage.value = target
  } else {
    inputPage.value = currentPage.value
  }
}

watch(currentPage, (newVal) => {
  inputPage.value = newVal
})
</script>

<style scoped>
.pdf-reader-section {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
}

.pdf-container {
  width: 100%;
  background-color: #1a1a1a;
  min-height: auto;
  border: 1px solid #333;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.pdf-document {
  width: 100%;
  max-width: 100%;
}

:deep(.pdf-document canvas) {
  width: 100% !important;
  height: auto !important;
  max-width: 100% !important;
}

.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #151515;
  padding: 12px 20px;
  border: 1px solid #333;
}

.text-btn {
  background: none;
  border: none;
  color: #ffffff;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  padding: 10px 5px;
  transition: color 0.2s;
}

.text-btn:disabled { 
  color: #444444; 
  cursor: not-allowed; 
}

.text-btn:not(:disabled):hover { 
  color: #a30000; 
}

.page-indicator {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 16px;
  color: #cccccc;
}

.page-input {
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #555;
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  width: 45px;
  padding: 2px;
}

.page-input:focus { 
  outline: none; 
  border-bottom-color: #a30000; 
}

.page-total { 
  font-style: italic; 
}

@media (max-width: 768px) {
  .pdf-reader-section {
    max-width: 100%;
  }
  .controls { 
    padding: 10px; 
  }
  .text-btn { 
    font-size: 12px; 
  }
}
</style>