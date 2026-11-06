<template>
  <footer class="site-footer">
    <div class="footer-container">
      <div class="footer-locations">
        <span>İstanbul</span>
        <span class="loc-dot">•</span>
        <span>Paris</span>
      </div>
      <div class="footer-tag">
        <span class="est">EST. MMXXV</span>
        <span class="sep">|</span>
        <a 
          href="https://www.youtube.com/watch?v=EBhn7JtdKaQ" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="brand"
        >
          Commonworks
        </a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  position: relative;
  width: 100%;
  min-height: 56px;
  background-color: #000000;
  border-top: none;
  display: flex;
  align-items: center;
  padding: 16px 8%;
  box-sizing: border-box;
}

.footer-container {
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.footer-locations {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'Montserrat', sans-serif;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 1.2px;
  color: #71717a;
  text-transform: uppercase;
}

.loc-dot {
  color: #3f3f46;
  font-size: 9px;
}

.footer-tag {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: 'Montserrat', sans-serif;
  font-size: 11.5px;
  letter-spacing: 0.6px;
}

.est {
  color: #71717a;
  font-weight: 600;
}

.sep {
  color: #27272a;
  font-size: 11px;
}

.brand {
  color: #d4d4d8;
  font-weight: 700;
  text-decoration: none;
  transition: color 0.2s ease;
}

.brand:hover {
  color: #ffffff;
}

@media (max-width: 768px) {
  .site-footer {
    padding: 18px 6%;
  }

  .footer-container {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .footer-locations {
    font-size: 10px;
    gap: 6px;
  }
}
</style>