<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    :stroke-width="strokeWidth"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="app-icon"
  >
    <!-- 1. Sağ Ok -->
    <g v-if="name === 'arrow-right' || name === 'sag-ok'">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </g>

    <!-- 2. Sol Ok -->
    <g v-else-if="name === 'arrow-left' || name === 'sol-ok'">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </g>

    <!-- 3. Aşağı Ok (Düz ok ve Chevron seçeneği) -->
    <g v-else-if="name === 'arrow-down' || name === 'asagi-ok'">
      <line x1="12" y1="5" x2="12" y2="19" />
      <polyline points="19 12 12 19 5 12" />
    </g>
    <g v-else-if="name === 'chevron-down'">
      <polyline points="6 9 12 15 18 9" />
    </g>

    <!-- 4. Kuzeydoğu Yönüne Bakan Ok (Dış Bağlantı / Yönlendirme) -->
    <g v-else-if="name === 'arrow-up-right' || name === 'kuzeydogu-ok'">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </g>

    <!-- 5. Instagram -->
    <g v-else-if="name === 'instagram'">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </g>

    <!-- 6. Mail (Zarf) -->
    <g v-else-if="name === 'mail' || name === 'eposta'">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </g>

    <!-- 7. Harita Konum İşareti (Pin) -->
    <g v-else-if="name === 'map-pin' || name === 'konum'">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </g>

    <!-- 8. Takvim -->
    <g v-else-if="name === 'calendar' || name === 'takvim'">
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </g>

    <!-- 9. İndirme İşareti (Download) -->
    <g v-else-if="name === 'download' || name === 'indir'">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </g>

    <!-- 10. Soru İşareti -->
    <g v-else-if="name === 'help' || name === 'soru'">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </g>

    <!-- 11. Döküman İşareti (Dosya) -->
    <g v-else-if="name === 'document' || name === 'dokuman' || name === 'file-text'">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </g>

    <!-- 12. Tam Ekrana Geçme (Fullscreen) -->
    <g v-else-if="name === 'maximize' || name === 'tam-ekran'">
      <path d="M8 3H5a2 2 0 0 0-2 2v3" />
      <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
      <path d="M3 16v3a2 2 0 0 0 2 2h3" />
      <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
    </g>

    <!-- 13. Artı / Yakınlaş (Zoom In) -->
    <g v-else-if="name === 'plus' || name === 'arti'">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </g>

    <!-- 14. Eksi / Uzaklaş (Zoom Out) -->
    <g v-else-if="name === 'minus' || name === 'eksi'">
      <line x1="5" y1="12" x2="19" y2="12" />
    </g>

    <!-- 15. Çift Sayfa / Açık Kitap (Book Open) -->
    <g v-else-if="name === 'book-open' || name === 'kitap'">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </g>

    <!-- 16. Tam Ekrandan Çıkış (Minimize / Compress) -->
    <g v-else-if="name === 'minimize' || name === 'kucult'">
      <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
    </g>

    <!-- 17. Göz (Eye - Barları Göster) -->
    <g v-else-if="name === 'eye' || name === 'goz'">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </g>

    <!-- 18. Göz Kapalı (Eye Off - Odak Modu) -->
    <g v-else-if="name === 'eye-off' || name === 'goz-kapali'">
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" x2="22" y1="2" y2="22" />
    </g>

    <!-- 19. Chevron Sol -->
    <g v-else-if="name === 'chevron-left'">
      <polyline points="15 18 9 12 15 6" />
    </g>

    <!-- 20. Chevron Sağ -->
    <g v-else-if="name === 'chevron-right'">
      <polyline points="9 18 15 12 9 6" />
    </g>

    <!-- 21. Çarpı / Kapat (Close / Times) -->
    <g v-else-if="name === 'close' || name === 'carpi' || name === 'times'">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </g>

    <!-- 22. Yatay Kaydırma (Arrows Horizontal) -->
    <g v-else-if="name === 'arrows-horizontal' || name === 'yatay-kaydir'">
      <polyline points="8 16 4 12 8 8" />
      <polyline points="16 8 20 12 16 16" />
      <line x1="4" y1="12" x2="20" y2="12" />
    </g>

    <!-- 23. Büyüteç Artı (Search Plus) -->
    <g v-else-if="name === 'search-plus' || name === 'buyutec'">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="11" y1="8" x2="11" y2="14" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </g>

    <!-- 24. PDF Dosyası (File PDF) -->
    <g v-else-if="name === 'file-pdf' || name === 'pdf'">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M10 12v6" />
      <path d="M10 15h3a1.5 1.5 0 0 0 0-3h-3" />
    </g>

    <!-- 25. Harici Bağlantı (External Link) -->
    <g v-else-if="name === 'external-link' || name === 'dis-baglanti'">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </g>

    <!-- 26. Rota / Akış (Route - Lenf Akışı) -->
    <g v-else-if="name === 'route' || name === 'rota'">
      <circle cx="6" cy="19" r="3" />
      <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
      <circle cx="18" cy="5" r="3" />
    </g>

    <!-- 27. Kalkan / Koruma (Shield) -->
    <g v-else-if="name === 'shield' || name === 'kalkan'">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </g>

    <!-- 28. Damlalık / Boya (Pipette / Eye Dropper) -->
    <g v-else-if="name === 'pipette' || name === 'damlalik'">
      <path d="m2 22 5.5-1.5L21.17 6.83a2.83 2.83 0 0 0 0-4v0a2.83 2.83 0 0 0-4 0L2.83 17.17 2 22z" />
      <path d="m14 4 6 6" />
    </g>

    <!-- 29. Terazi / Karar (Scale / Balance) -->
    <g v-else-if="name === 'scale' || name === 'terazi'">
      <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="M7 21h10" />
      <path d="M12 3v18" />
      <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
    </g>

    <!-- 30. Tıbbi Not / Reçete (Notes Medical) -->
    <g v-else-if="name === 'notes-medical' || name === 'tibbi-not'">
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M9 14h6" />
      <path d="M12 11v6" />
    </g>

    <!-- 31. Yukarı Ok (Arrow Up) -->
    <g v-else-if="name === 'arrow-up' || name === 'yukari-ok'">
      <line x1="12" y1="19" x2="12" y2="5" />
      <polyline points="5 12 12 5 19 12" />
    </g>
  </svg>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    required: true
  },
  size: {
    type: [Number, String],
    default: 20
  },
  strokeWidth: {
    type: [Number, String],
    default: 2
  }
})
</script>

<style scoped>
.app-icon {
  display: inline-block;
  vertical-align: middle;
  flex-shrink: 0;
}
</style>