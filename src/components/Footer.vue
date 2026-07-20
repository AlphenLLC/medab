<template>
    <footer class="alphen-footer">
        <!-- Tam ortalanmış ufak ve zarif metinler -->
        <div class="footer-text">
            <span class="est">EST. MMXXIII</span>
            <span class="divider">|</span>
            <a href="https://www.youtube.com/watch?v=aAg3bwzSuLk" target="_blank" class="brand">AlphenLLC</a>
            <span class="divider">|</span>
            <a href="https://www.youtube.com/watch?v=Zi8nqPpW6_E" target="_blank" class="motto">Handcrafted.</a>
        </div>
        
        <!-- Sağ köşeye sabitlenmiş, gölge içinde kalan resim -->
        <div class="footer-img-wrapper">
            <div class="shadow-overlay"></div>
        </div>
    </footer>
</template>

<style scoped>
/* ANA FOOTER KONTEYNERİ */
.alphen-footer {
    position: relative;
    width: 100%;
    min-height: 70px; 
    background-color: #000000; /* Zifiri karanlık */
    display: flex;
    align-items: center;
    justify-content: center; 
    border-top: none; /* ÇİZGİYİ SİLDİK */
    overflow: hidden;
}

/* YAZI GRUBU */
.footer-text {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    z-index: 2; /* Gölgenin üstünde net okunmasını sağlar */
    padding: 0 15px; /* Dar ekranlarda kenarlara yapışmaması için */
}

/* KÜÇÜLTÜLMÜŞ METİN BOYUTLARI */
.est, .brand, .motto {
    font-size: 13px; 
    font-weight: 500;
    letter-spacing: 1px;
    text-decoration: none;
    transition: color 0.3s ease;
}

.est {
    color: #555555;
}

.brand {
    color: #e63946; 
    font-weight: 700;
}

.motto {
    color: #777777;
}

.brand:hover, .motto:hover {
    color: #ffffff;
}

/* AYRAÇLAR */
.divider {
    color: #222222;
    font-size: 14px;
}

/* SAĞ KÖŞEDEKİ RESİM (Her ekranda sağa yapışık) */
.footer-img-wrapper {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 160px; 
    background-image: url('https://i.pinimg.com/736x/73/67/5f/73675f4ea4e9dbd3782c5087e608637e.jpg');
    background-size: cover;
    background-position: center;
    z-index: 1;
}

/* RESMİ GÖLGEDE/KARANLIKTA BIRAKAN EFEKT */
.shadow-overlay {
    width: 100%;
    height: 100%;
    /* Gölge başlangıcını tam siyah (#000000) yaptık ki arka planla birleşsin */
    background: linear-gradient(to right, #000000 0%, rgba(0,0,0,0.7) 60%, rgba(0,0,0,0.85) 100%);
}

/* =========================================
   MOBİL UYUMLULUK
========================================= */
@media (max-width: 768px) {
    .alphen-footer {
        padding: 30px 0; /* Mobilde yazılar alt alta bineceği için alt/üst boşluk veriyoruz */
    }

    .footer-text {
        flex-direction: column; /* Yazıları alt alta diziyoruz */
        gap: 12px;
        text-align: center;
        width: 100%;
    }

    .divider {
        display: none; /* Mobilde ayraçlara gerek yok */
    }

    .footer-img-wrapper {
        /* MOBİLDE DE SAĞ KÖŞEDE KALMAYA DEVAM EDER */
        width: 120px; /* Mobilde resmi biraz daraltıyoruz ki yazılara çok bulaşmasın */
    }

.shadow-overlay {
        /* Orta geçişi 0.7, en sağ köşeyi ise 0.45 yaparak bir tık daha koyu ve puslu bir erime sağladık. */
    background: linear-gradient(to right, #000000 0%, rgba(0,0,0,0.7) 60%, rgba(0,0,0,0.85) 100%);
    }
}
</style>