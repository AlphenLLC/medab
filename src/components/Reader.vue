<template>
  <div 
    ref="readerWrapperRef" 
    class="reader-wrapper" 
    :class="{ 
      'is-fullscreen': isFullscreen,
      'is-zen-mode': isFullscreen && hideControls
    }"
  >
    <div v-show="!hideControls" class="reader-header">
      <div class="page-status">
        Sayfa {{ currentPage }} / {{ totalPages }}
      </div>

      <div class="zoom-controls">
        <button class="zoom-btn" :disabled="zoom <= 1" title="Uzaklaş" @click="handleZoomStep(-0.25)">
          <AppIcon name="minus" :size="13" />
        </button>
        <span class="zoom-text" title="Sıfırla" @click="resetZoom">%{{ Math.round(zoom * 100) }}</span>
        <button class="zoom-btn" :disabled="zoom >= 2.5" title="Yakınlaş" @click="handleZoomStep(0.25)">
          <AppIcon name="plus" :size="13" />
        </button>
      </div>

      <div class="actions">
        <a 
          v-if="pdfUrl" 
          :href="pdfUrl" 
          :download="pdfAdi" 
          class="icon-btn download-btn" 
          title="Dergiyi PDF Olarak İndir"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AppIcon name="download" :size="17" />
        </a>

        <button class="icon-btn" title="Kılavuz" @click="showHelp = true">
          <AppIcon name="help" :size="17" />
        </button>
        <button class="icon-btn" :title="isSinglePage ? 'Çift Sayfa Görünümü' : 'Tek Sayfa Görünümü'" @click="togglePageMode">
          <AppIcon :name="isSinglePage ? 'book-open' : 'document'" :size="17" />
        </button>
        <button class="icon-btn" :title="isFullscreen ? 'Çıkış' : 'Tam Ekran'" @click="toggleFullscreen">
          <AppIcon :name="isFullscreen ? 'minimize' : 'maximize'" :size="17" />
        </button>
      </div>
    </div>

    <div 
      ref="bookContainer" 
      class="book-viewport"
      :class="{ 'is-zoomed': zoom > 1, 'is-panning': isPanning }"
      @wheel.prevent="handleWheel"
      @mousedown="startPan"
      @mousemove="doPan"
      @mouseup="endPan"
      @mouseleave="endPan"
      @dblclick="handleDoubleClick"
    >
      <div 
        class="zoom-layer"
        :style="{
          transform: `translate3d(${panX}px, ${panY}px, 0) scale(${zoom})`,
          transition: isPanning || isPinching ? 'none' : 'transform 0.25s cubic-bezier(0.2, 0, 0, 1)'
        }"
      >
        <div ref="flipbookRef" class="book-stage">
          <div 
            v-for="(pageSrc, index) in pageList" 
            :key="index" 
            class="page" 
            data-density="soft"
          >
            <div class="page-content">
              <div 
                class="lqip-placeholder"
                :class="{ 'is-hidden': loadedImages.has(index) }"
              >
                <img 
                  v-if="lqipList && lqipList[index]" 
                  :src="resolveImgUrl(lqipList[index])" 
                  class="lqip-img" 
                  alt="" 
                  aria-hidden="true" 
                />
                <div v-else class="lqip-fallback">
                  <span class="skeleton-num">{{ index + 1 }}</span>
                </div>
              </div>
              <img 
                v-if="shouldRenderPage(index)"
                :src="resolveImgUrl(pageSrc)" 
                :alt="`Sayfa ${index + 1}`" 
                draggable="false" 
                decoding="async"
                class="main-page-img"
                :class="{ 'is-loaded': loadedImages.has(index) }"
                @load="onImageLoad(index)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <button 
      v-if="isFullscreen" 
      class="zen-toggle-btn" 
      :class="{ 'is-active': hideControls }" 
      :title="hideControls ? 'Barları Göster' : 'Barları Gizle (Odak Modu)'" 
      @click="toggleZenMode"
    >
      <AppIcon :name="hideControls ? 'eye' : 'eye-off'" :size="16" />
    </button>

    <div 
      v-show="!hideControls" 
      class="reader-footer"
      :class="{ 'is-fullscreen-footer': isFullscreen }"
    >
      <button class="nav-arrow" :disabled="currentPage <= 1 || isFlipping" title="Önceki Sayfa" @click="flipPrev">
        <AppIcon name="chevron-left" :size="16" />
      </button>
      
      <div class="hint-text">
        <span v-if="zoom === 1">Sayfaları köşelerinden tutup çevirebilir veya kaydırabilirsiniz</span>
        <span v-else>Gezinmek için basılı tutup sürükleyin (Sıfırlamak için çift dokunun)</span>
      </div>

      <button class="nav-arrow" :disabled="currentPage >= totalPages || isFlipping" title="Sonraki Sayfa" @click="flipNext">
        <AppIcon name="chevron-right" :size="16" />
      </button>
    </div>

    <div 
      v-if="showHelp" 
      class="modal-backdrop" 
      @click.self="showHelp = false"
      @touchmove.self.prevent
      @wheel.self.prevent
    >
      <div class="modal-card">
        <div class="modal-header">
          <div class="modal-title-group">
            <span class="modal-brand">MED<span class="accent-red">AB</span></span>
            <span class="modal-subtitle">OKUYUCU REHBERİ</span>
          </div>
          <button class="modal-close" @click="showHelp = false">
            <AppIcon name="close" :size="16" />
          </button>
        </div>

        <div class="modal-body">
          <div class="guide-item">
            <div class="guide-title-row">
              <AppIcon name="arrows-horizontal" class="guide-icon" :size="15" />
              <span class="guide-title">Sayfa Çevirme</span>
            </div>
            <p>Parmağınızı ekranda sağa ya da sola kaydırın veya alttaki oklara dokunun. Klavyedeki sol ve sağ ok tuşlarıyla da gezinebilirsiniz.</p>
          </div>

          <div class="guide-item">
            <div class="guide-title-row">
              <AppIcon name="search-plus" class="guide-icon" :size="15" />
              <span class="guide-title">Yazıları Büyütme</span>
            </div>
            <p>Okumakta zorlandığınız sayfaya <strong>çift dokunun</strong>, fare tekerleğini kaydırın ya da iki parmağınızla kıstırıp açın (pinch-zoom). Büyüttükten sonra basılı tutup serbestçe gezebilirsiniz.</p>
          </div>

          <div class="guide-item">
            <div class="guide-title-row">
              <AppIcon name="download" class="guide-icon" :size="15" />
              <span class="guide-title">PDF İndirme</span>
            </div>
            <p>Sağ üstteki indirme simgesine tıklayarak dergiyi cihazınıza PDF formatında kaydedebilirsiniz.</p>
          </div>

          <div class="guide-item">
            <div class="guide-title-row">
              <AppIcon name="book-open" class="guide-icon" :size="15" />
              <span class="guide-title">Tek / Çift Sayfa</span>
            </div>
            <p>Mobilde tek sayfa okumak veya masaüstünde çift sayfa açmak için üstteki kitap simgesine basabilirsiniz.</p>
          </div>

          <div class="guide-item">
            <div class="guide-title-row">
              <AppIcon name="maximize" class="guide-icon" :size="15" />
              <span class="guide-title">Tam Ekran</span>
            </div>
            <p>Sağ üstten tam ekrana geçebilir, sol alttaki göz simgesine dokunarak tüm çubukları gizleyip odaklanabilirsiniz.</p>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn-modal-close" @click="showHelp = false">
            Anladım
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { PageFlip } from 'page-flip'

const props = defineProps({
  pageList: {
    type: Array,
    required: true
  },
  lqipList: {
    type: Array,
    default: () => []
  },
  pdfUrl: {
    type: String,
    default: ''
  },
  pdfAdi: {
    type: String,
    default: 'medab-dergi.pdf'
  }
})

const readerWrapperRef = ref(null)
const flipbookRef = ref(null)
const bookContainer = ref(null)
const pageFlipInstance = ref(null)

const currentPage = ref(1)
const totalPages = computed(() => props.pageList.length)
const isFullscreen = ref(false)
const hideControls = ref(false)
const isSinglePage = ref(false)
const isFlipping = ref(false)
const showHelp = ref(false)
const loadedImages = reactive(new Set())
const onImageLoad = (index) => {
  loadedImages.add(index)
}

const shouldRenderPage = (pageIndex) => {
  if (loadedImages.has(pageIndex)) return true
  const currentIdx = currentPage.value - 1
  const buffer = isSinglePage.value ? 2 : 4
  return Math.abs(pageIndex - currentIdx) <= buffer
}

const zoom = ref(1)
const panX = ref(0)
const panY = ref(0)
const isPanning = ref(false)
const isPinching = ref(false)
const startCoords = { x: 0, y: 0 }

let initialPinchDist = 0
let initialPinchZoom = 1
let pinchStartCenter = { x: 0, y: 0 }
let pinchStartPan = { x: 0, y: 0 }

let touchStartX = 0
let touchStartY = 0
let touchStartTime = 0

let lastTapTime = 0
let lastTapX = 0
let lastTapY = 0

let resizeObserver = null
let flippingSafetyTimeout = null
const preloadedCache = new Set()

const resolveImgUrl = (url) => {
  if (!url || url.startsWith('http') || url.startsWith('blob:') || url.startsWith('data:')) return url
  const cleanPath = url.startsWith('/') ? url.slice(1) : url
  return `${import.meta.env.BASE_URL}${cleanPath}`
}

const preloadSinglePage = (src) => {
  if (!src || preloadedCache.has(src)) return
  const fullUrl = resolveImgUrl(src)
  const img = new Image()
  img.decoding = 'async'
  img.src = fullUrl
  preloadedCache.add(src)
}

const preloadAdjacentPages = (targetIndex) => {
  const total = props.pageList.length
  if (total === 0) return
  const start = Math.max(0, targetIndex - 2)
  const end = Math.min(total, targetIndex + 5)
  for (let i = start; i < end; i++) {
    preloadSinglePage(props.pageList[i])
  }
}

watch(
  () => props.pageList,
  (newList) => {
    if (Array.isArray(newList) && newList.length > 0) {
      preloadAdjacentPages(0)
    }
  },
  { immediate: true }
)

const isHorizontalSinglePage = () => {
  return window.innerWidth > window.innerHeight && isSinglePage.value
}

const clampPan = (x, y, currentZoom) => {
  if (!bookContainer.value || currentZoom <= 1) return { x: 0, y: 0 }
  const rect = bookContainer.value.getBoundingClientRect()
  const maxX = Math.max(0, ((currentZoom - 1) * rect.width) / 2)
  const maxY = Math.max(0, ((currentZoom - 1) * rect.height) / 2)
  return {
    x: Math.max(-maxX, Math.min(maxX, x)),
    y: Math.max(-maxY, Math.min(maxY, y))
  }
}

const initFlipBook = () => {
  if (!flipbookRef.value) return

  pageFlipInstance.value = new PageFlip(flipbookRef.value, {
    width: 550,
    height: 777,
    size: 'stretch',
    minWidth: 260,
    maxWidth: 1200,
    minHeight: 360,
    maxHeight: 1600,
    showCover: true,
    usePortrait: true,
    startPage: 0,
    drawShadow: true,
    maxShadowOpacity: 0.35,
    flippingTime: 360,
    useMouseEvents: true,
    swipeDistance: 20,
    showPageCorners: true,
    disableFlipByClick: true,
    clickEventForward: false,
    mobileScrollSupport: false
  })

  pageFlipInstance.value.loadFromHTML(flipbookRef.value.querySelectorAll('.page'))

  pageFlipInstance.value.flipPrev = () => flipPrev()
  pageFlipInstance.value.flipNext = () => flipNext()

  pageFlipInstance.value.on('flip', (e) => {
    currentPage.value = e.data + 1
    isFlipping.value = false
    if (flippingSafetyTimeout) {
      clearTimeout(flippingSafetyTimeout)
      flippingSafetyTimeout = null
    }
    preloadAdjacentPages(e.data)
    resetZoom()
  })

  pageFlipInstance.value.on('changeState', (e) => {
    if (e.data === 'flipping' || e.data === 'user_fold') {
      isFlipping.value = true
    } else if (e.data === 'read') {
      isFlipping.value = false
      if (flippingSafetyTimeout) {
        clearTimeout(flippingSafetyTimeout)
        flippingSafetyTimeout = null
      }
    }
  })

  pageFlipInstance.value.on('changeOrientation', (e) => {
    isSinglePage.value = e.data === 'portrait'
  })

  pageFlipInstance.value.on('init', (e) => {
    isSinglePage.value = e.data.mode === 'portrait'
    preloadAdjacentPages(0)
  })
}

const toggleZenMode = () => {
  hideControls.value = !hideControls.value
  nextTick(() => {
    pageFlipInstance.value?.update()
  })
}

const togglePageMode = () => {
  if (!pageFlipInstance.value || isFlipping.value) return

  const isCurrentlyPortrait = pageFlipInstance.value.getOrientation() === 'portrait'
  const settings = pageFlipInstance.value.getSettings()

  if (isCurrentlyPortrait) {
    settings.usePortrait = false
    settings.minWidth = 260
    isSinglePage.value = false
  } else {
    settings.usePortrait = true
    settings.minWidth = 99999
    isSinglePage.value = true
  }

  const curIndex = pageFlipInstance.value.getCurrentPageIndex()
  pageFlipInstance.value.update()
  pageFlipInstance.value.turnToPage(curIndex)
}

const handleZoomStep = (step) => {
  const target = Math.max(1, Math.min(2.5, zoom.value + step))
  zoom.value = parseFloat(target.toFixed(2))
  if (zoom.value === 1) {
    panX.value = 0
    panY.value = 0
  } else {
    const clamped = clampPan(panX.value, panY.value, zoom.value)
    panX.value = clamped.x
    panY.value = clamped.y
  }
}

const handleWheel = (e) => {
  if (showHelp.value) return
  const step = e.deltaY < 0 ? 0.2 : -0.2
  handleZoomStep(step)
}

const resetZoom = () => {
  zoom.value = 1
  panX.value = 0
  panY.value = 0
  isPanning.value = false
  isPinching.value = false
}

const handleDoubleClick = () => {
  if (zoom.value > 1) {
    resetZoom()
  } else {
    zoom.value = 1.75
  }
}

const startPan = (e) => {
  if (zoom.value <= 1) return
  isPanning.value = true
  startCoords.x = e.clientX - panX.value
  startCoords.y = e.clientY - panY.value
}

const doPan = (e) => {
  if (!isPanning.value || zoom.value <= 1) return
  const rawX = e.clientX - startCoords.x
  const rawY = e.clientY - startCoords.y
  const clamped = clampPan(rawX, rawY, zoom.value)
  panX.value = clamped.x
  panY.value = clamped.y
}

const endPan = () => {
  isPanning.value = false
}

const onNativeTouchStart = (e) => {
  if (e.touches.length === 2) {
    e.preventDefault()
    e.stopPropagation()
    isPinching.value = true
    isPanning.value = false
    initialPinchDist = Math.hypot(
      e.touches[0].clientX - e.touches[1].clientX,
      e.touches[0].clientY - e.touches[1].clientY
    )
    initialPinchZoom = zoom.value
    pinchStartCenter = {
      x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
      y: (e.touches[0].clientY + e.touches[1].clientY) / 2
    }
    pinchStartPan = { x: panX.value, y: panY.value }
  } else if (e.touches.length === 1) {
    const clientX = e.touches[0].clientX
    const clientY = e.touches[0].clientY
    const now = Date.now()

    const distFromLastTap = Math.hypot(clientX - lastTapX, clientY - lastTapY)
    if (now - lastTapTime < 320 && distFromLastTap < 35) {
      e.preventDefault()
      e.stopPropagation()
      handleDoubleClick()
      lastTapTime = 0
      return
    }
    lastTapTime = now
    lastTapX = clientX
    lastTapY = clientY

    if (zoom.value > 1) {
      e.preventDefault()
      e.stopPropagation()
      isPanning.value = true
      startCoords.x = clientX - panX.value
      startCoords.y = clientY - panY.value
    } else {
      touchStartX = clientX
      touchStartY = clientY
      touchStartTime = now
    }
  }
}

const onNativeTouchMove = (e) => {
  if (e.touches.length === 2 && initialPinchDist > 0) {
    e.preventDefault()
    e.stopPropagation()
    const currentDist = Math.hypot(
      e.touches[0].clientX - e.touches[1].clientX,
      e.touches[0].clientY - e.touches[1].clientY
    )
    const factor = currentDist / initialPinchDist
    const targetZoom = Math.max(1, Math.min(2.5, initialPinchZoom * factor))
    zoom.value = parseFloat(targetZoom.toFixed(2))

    const currentCenter = {
      x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
      y: (e.touches[0].clientY + e.touches[1].clientY) / 2
    }
    const rawPanX = pinchStartPan.x + (currentCenter.x - pinchStartCenter.x)
    const rawPanY = pinchStartPan.y + (currentCenter.y - pinchStartCenter.y)
    const clamped = clampPan(rawPanX, rawPanY, zoom.value)

    panX.value = clamped.x
    panY.value = clamped.y

    if (zoom.value === 1) {
      panX.value = 0
      panY.value = 0
    }
  } else if (e.touches.length === 1 && isPanning.value && zoom.value > 1) {
    e.preventDefault()
    e.stopPropagation()
    const rawX = e.touches[0].clientX - startCoords.x
    const rawY = e.touches[0].clientY - startCoords.y
    const clamped = clampPan(rawX, rawY, zoom.value)
    panX.value = clamped.x
    panY.value = clamped.y
  } else if (e.touches.length === 1 && zoom.value === 1 && touchStartTime > 0) {
    const diffX = Math.abs(e.touches[0].clientX - touchStartX)
    const diffY = Math.abs(e.touches[0].clientY - touchStartY)

    if (diffX > diffY && diffX > 10 && e.cancelable) {
      e.preventDefault()
    }
  }
}

const onNativeTouchEnd = (e) => {
  if (e.touches.length < 2) {
    initialPinchDist = 0
    isPinching.value = false
  }
  if (e.touches.length === 1 && zoom.value > 1) {
    isPanning.value = true
    startCoords.x = e.touches[0].clientX - panX.value
    startCoords.y = e.touches[0].clientY - panY.value
  } else if (e.touches.length === 0) {
    isPanning.value = false
  }

  if (zoom.value <= 1) {
    panX.value = 0
    panY.value = 0
  }

  if (zoom.value === 1 && touchStartTime > 0 && e.changedTouches.length > 0) {
    const deltaX = e.changedTouches[0].clientX - touchStartX
    const deltaY = e.changedTouches[0].clientY - touchStartY
    const deltaTime = Date.now() - touchStartTime
    touchStartTime = 0

    if (Math.abs(deltaX) > 35 && Math.abs(deltaX) > Math.abs(deltaY) * 1.25 && deltaTime < 550) {
      if (deltaX < 0) {
        flipNext()
      } else {
        flipPrev()
      }
    }
  }
}

const onNativeTouchCancel = () => {
  isPinching.value = false
  isPanning.value = false
  touchStartTime = 0
}

const flipPrev = () => {
  if (!pageFlipInstance.value || isFlipping.value) return
  if (pageFlipInstance.value.getState() !== 'read') return
  if (zoom.value > 1) resetZoom()

  if (isHorizontalSinglePage()) {
    pageFlipInstance.value.turnToPrevPage()
    return
  }

  const fc = pageFlipInstance.value.getFlipController()
  const render = pageFlipInstance.value.getRender()
  if (!fc || !render) return

  const rect = render.getRect()
  isFlipping.value = true
  if (flippingSafetyTimeout) clearTimeout(flippingSafetyTimeout)
  flippingSafetyTimeout = setTimeout(() => {
    isFlipping.value = false
  }, 380)

  fc.flip({
    x: rect.left + 15,
    y: rect.top + rect.height - 15
  })
}

const flipNext = () => {
  if (!pageFlipInstance.value || isFlipping.value) return
  if (pageFlipInstance.value.getState() !== 'read') return
  if (zoom.value > 1) resetZoom()
  if (!isSinglePage.value && currentPage.value === totalPages.value - 1) {
    currentPage.value = totalPages.value
    return
  }

  if (isHorizontalSinglePage()) {
    pageFlipInstance.value.turnToNextPage()
    return
  }

  const fc = pageFlipInstance.value.getFlipController()
  const render = pageFlipInstance.value.getRender()
  if (!fc || !render) return

  const rect = render.getRect()
  const beforeIndex = pageFlipInstance.value.getCurrentPageIndex()

  isFlipping.value = true
  if (flippingSafetyTimeout) clearTimeout(flippingSafetyTimeout)
  flippingSafetyTimeout = setTimeout(() => {
    isFlipping.value = false
    if (pageFlipInstance.value && pageFlipInstance.value.getCurrentPageIndex() === beforeIndex) {
      pageFlipInstance.value.turnToNextPage()
    }
  }, 380)

  fc.flip({
    x: rect.left + rect.width - 15,
    y: rect.top + rect.height - 15
  })
}

const handleKeydown = (e) => {
  if (showHelp.value) {
    if (e.key === 'Escape') showHelp.value = false
    return
  }

  if (e.key === 'Escape') {
    if (hideControls.value) {
      toggleZenMode()
      return
    }
    if (isFullscreen.value) {
      toggleFullscreen()
      return
    }
  }

  if (e.key === 'ArrowRight') {
    flipNext()
  } else if (e.key === 'ArrowLeft') {
    flipPrev()
  }
}

const getFullscreenElement = () => {
  return document.fullscreenElement || document.webkitFullscreenElement || null
}

const handleFullscreenChange = () => {
  const hasFs = !!getFullscreenElement()
  if (!hasFs && isFullscreen.value && (document.fullscreenEnabled || document.webkitFullscreenEnabled)) {
    isFullscreen.value = false
    hideControls.value = false
    document.body.style.overflow = ''
    nextTick(() => {
      pageFlipInstance.value?.update()
    })
  }
}

const toggleFullscreen = async () => {
  const wrapper = readerWrapperRef.value
  if (!wrapper) return

  const isNativeFs = !!getFullscreenElement()

  if (isFullscreen.value) {
    if (isNativeFs) {
      try {
        if (document.exitFullscreen) await document.exitFullscreen()
        else if (document.webkitExitFullscreen) await document.webkitExitFullscreen()
      } catch (e) {}
    }
    isFullscreen.value = false
    document.body.style.overflow = ''
  } else {
    try {
      if (wrapper.requestFullscreen) {
        await wrapper.requestFullscreen()
      } else if (wrapper.webkitRequestFullscreen) {
        await wrapper.webkitRequestFullscreen()
      }
    } catch (e) {}
    isFullscreen.value = true
    document.body.style.overflow = 'hidden'
  }

  nextTick(() => {
    pageFlipInstance.value?.update()
  })
}

onMounted(async () => {
  await nextTick()
  initFlipBook()

  if (bookContainer.value) {
    bookContainer.value.addEventListener('touchstart', onNativeTouchStart, { passive: false })
    bookContainer.value.addEventListener('touchmove', onNativeTouchMove, { passive: false })
    bookContainer.value.addEventListener('touchend', onNativeTouchEnd, { passive: false })
    bookContainer.value.addEventListener('touchcancel', onNativeTouchCancel, { passive: false })

    resizeObserver = new ResizeObserver(() => {
      pageFlipInstance.value?.update()
    })
    resizeObserver.observe(bookContainer.value)
  }

  window.addEventListener('keydown', handleKeydown)
  document.addEventListener('fullscreenchange', handleFullscreenChange)
  document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
})

onBeforeUnmount(() => {
  document.body.style.overflow = ''
  if (flippingSafetyTimeout) clearTimeout(flippingSafetyTimeout)
  resizeObserver?.disconnect()
  window.removeEventListener('keydown', handleKeydown)
  document.removeEventListener('fullscreenchange', handleFullscreenChange)
  document.removeEventListener('webkitfullscreenchange', handleFullscreenChange)

  if (bookContainer.value) {
    bookContainer.value.style.display = 'none'
    bookContainer.value.removeEventListener('touchstart', onNativeTouchStart)
    bookContainer.value.removeEventListener('touchmove', onNativeTouchMove)
    bookContainer.value.removeEventListener('touchend', onNativeTouchEnd)
    bookContainer.value.removeEventListener('touchcancel', onNativeTouchCancel)
  }

  if (pageFlipInstance.value) {
    try {
      pageFlipInstance.value.destroy()
    } catch (e) {}
    pageFlipInstance.value = null
  }
})
</script>

<style scoped>
.reader-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  height: 80vh;
  min-height: 620px;
  max-height: 860px;
  margin: 0 auto;
  background: #08080a;
  border-radius: 14px;
  overflow: hidden;
  position: relative;
  user-select: none;
  -webkit-user-select: none;
  font-family: 'Montserrat', sans-serif;
  border: 1px solid rgba(220, 38, 38, 0.25);
  box-shadow: 0 20px 50px -10px rgba(0, 0, 0, 0.9), 0 0 30px -10px rgba(220, 38, 38, 0.2);
}

.reader-wrapper.is-fullscreen {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100dvh;
  max-width: 100vw;
  max-height: none;
  z-index: 99999;
  border-radius: 0;
  border: none;
  touch-action: none;
}

.reader-header, .reader-footer {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 18px;
  background: #0c0c10;
  color: #f4f4f5;
  z-index: 10;
  position: relative;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.reader-footer {
  border-bottom: none;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.reader-footer.is-fullscreen-footer {
  padding-left: 76px;
}

.page-status {
  font-family: 'Archivo Black', sans-serif;
  font-size: 0.86rem;
  letter-spacing: -0.4px;
  color: #ffffff;
  min-width: 110px;
}

.actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.zoom-controls {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(22, 22, 28, 0.85);
  padding: 3px 12px;
  border-radius: 50px;
  border: 1px solid rgba(220, 38, 38, 0.2);
  backdrop-filter: blur(8px);
}

.zoom-btn {
  background: none;
  border: none;
  color: #a1a1aa;
  cursor: pointer;
  padding: 3px 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.15s;
}

.zoom-btn:hover:not(:disabled) {
  color: #ef4444;
}

.zoom-btn:disabled {
  opacity: 0.25;
  cursor: not-allowed;
}

.zoom-text {
  font-size: 0.78rem;
  font-weight: 700;
  color: #f4f4f5;
  min-width: 40px;
  text-align: center;
  cursor: pointer;
}

.book-viewport {
  flex: 1;
  min-height: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background: #040405;
  box-sizing: border-box;
  position: relative;
  touch-action: pan-y;
}

.book-viewport.is-zoomed {
  touch-action: none;
  cursor: grab;
}

.book-viewport.is-zoomed .book-stage {
  pointer-events: none;
}

.book-viewport.is-panning {
  cursor: grabbing;
}

.zoom-layer {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transform-origin: center center;
}

.book-viewport.is-panning .zoom-layer,
.book-viewport.is-zoomed .zoom-layer {
  will-change: transform;
}

.book-stage {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 2000px;
}

.page {
  background-color: #0c0c10;
  overflow: hidden;
  contain: strict;
  transform: translateZ(0);
}

.page-content {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.lqip-placeholder {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #121216;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;
  z-index: 1;
}

.lqip-placeholder.is-hidden {
  opacity: 0;
  pointer-events: none;
}

.lqip-img {
  width: 100%;
  height: 100%;
  object-fit: fill;
  filter: blur(12px);
  transform: scale(1.08);
  display: block;
}

.lqip-fallback {
  width: 100%;
  height: 100%;
  background: #141418;
  display: flex;
  align-items: center;
  justify-content: center;
}

.skeleton-num {
  color: rgba(255, 255, 255, 0.12);
  font-family: 'Archivo Black', sans-serif;
  font-size: 1.6rem;
}

.main-page-img {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  object-fit: fill;
  display: block;
  user-select: none;
  -webkit-user-drag: none;
  pointer-events: none;
  opacity: 0;
  transform: translateZ(0);
  transition: opacity 0.25s ease-in-out;
}

.main-page-img.is-loaded {
  opacity: 1;
}

.zen-toggle-btn {
  position: absolute;
  bottom: 14px;
  left: 20px;
  z-index: 50;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgba(20, 20, 24, 0.88);
  border: 1px solid rgba(220, 38, 38, 0.3);
  color: #a1a1aa;
  display: grid;
  place-items: center;
  cursor: pointer;
  backdrop-filter: blur(10px);
}

.zen-toggle-btn:hover,
.zen-toggle-btn.is-active {
  background: #dc2626;
  color: #ffffff;
  border-color: #ef4444;
}

.nav-arrow {
  background: #141418;
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #f4f4f5;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  display: grid;
  place-items: center;
  transition: all 0.15s ease;
}

.nav-arrow:hover:not(:disabled) {
  background: #dc2626;
  border-color: #ef4444;
  color: #ffffff;
}

.nav-arrow:disabled {
  opacity: 0.25;
  cursor: not-allowed;
}

.icon-btn {
  background: none;
  border: none;
  color: #a1a1aa;
  cursor: pointer;
  display: grid;
  place-items: center;
  padding: 4px;
  text-decoration: none;
  transition: color 0.15s ease;
}

.icon-btn:hover,
.download-btn:hover {
  color: #ef4444;
}

.hint-text {
  font-size: 0.76rem;
  color: #71717a;
  font-weight: 500;
}

.modal-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  touch-action: none;
}

.modal-card {
  width: 100%;
  max-width: 440px;
  background: #0c0c10;
  border: 1px solid rgba(220, 38, 38, 0.25);
  border-radius: 14px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.9);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.modal-title-group {
  display: flex;
  align-items: baseline;
  gap: 10px;
}

.modal-brand {
  font-family: 'Archivo Black', sans-serif;
  font-size: 1.1rem;
  color: #ffffff;
  letter-spacing: -0.5px;
}

.accent-red {
  color: #ef4444;
}

.modal-subtitle {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  color: #a1a1aa;
  letter-spacing: 0.8px;
}

.modal-close {
  background: none;
  border: none;
  color: #71717a;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-close:hover {
  color: #ffffff;
}

.modal-body {
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 60vh;
  overflow-y: auto;
  touch-action: pan-y;
}

.guide-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 10px 12px;
  background: rgba(22, 22, 28, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 10px;
}

.guide-title-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.guide-icon {
  color: #ef4444;
  display: inline-block;
  flex-shrink: 0;
}

.guide-title {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.8rem;
  font-weight: 700;
  color: #ffffff;
}

.guide-item p {
  margin: 0;
  font-size: 0.78rem;
  color: #a1a1aa;
  line-height: 1.5;
  padding-left: 23px;
}

.modal-footer {
  padding: 4px 20px 16px;
  display: flex;
  justify-content: center;
}

.btn-modal-close {
  font-family: 'Montserrat', sans-serif;
  font-size: 13.5px;
  font-weight: 700;
  color: #ffffff;
  background-color: #dc2626;
  padding: 9px 32px;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.btn-modal-close:hover {
  background-color: #ef4444;
}

@media (max-width: 768px) {
  .reader-wrapper {
    height: 70vh;
    min-height: 440px;
    border-radius: 8px;
  }

  .reader-header, .reader-footer {
    padding: 6px 12px;
  }

  .hint-text, .zoom-controls {
    display: none;
  }
  
  .page-status {
    font-size: 0.8rem;
  }

  .guide-item p {
    padding-left: 0;
  }
}
</style>