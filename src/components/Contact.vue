<template>
    <section class="minimal-contact-module">
        <div class="contact-strip">
            
            <!-- Adres -->
            <div class="contact-item">
                <i class="fas fa-map-marker-alt"></i>
                <span>İst. Medeniyet Üni. Göztepe, Kadıköy</span>
            </div>

            <!-- E-Posta -->
            <a href="mailto:info@medab.com" class="contact-item link-item">
                <i class="fas fa-envelope"></i>
                <span>info@medab.com</span>
            </a>

            <!-- Instagram -->
            <a href="https://instagram.com/medab" target="_blank" class="contact-item link-item">
                <i class="fab fa-instagram"></i>
                <span>@medab</span>
            </a>

            <!-- Üniversite -->
            <a href="https://www.medeniyet.edu.tr" target="_blank" class="contact-item link-item">
                <i class="fas fa-university"></i>
                <span>medeniyet.edu.tr</span>
            </a>

        </div>
    </section>
</template>

<style scoped>
/* ANA KONTEYNER: Çok ince bir padding */
/* Sadece bu sınıfı bul ve bununla değiştir */
.minimal-contact-module {
    background-color: #000000; /* Zifiri karanlık */
    width: 100%;
    padding: 30px 5%; 
    box-sizing: border-box;
    border-bottom: none; /* ÇİZGİYİ SİLDİK */
}

/* YAN YANA TEK SATIR (STRIP) DİZİLİMİ */
.contact-strip {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap; /* Ekrana sığmazsa mecburen alt satıra geçer */
    gap: 40px; /* Öğeler arası boşluk */
    max-width: 1200px;
    margin: 0 auto;
}

/* TEKİL İLETİŞİM ÖĞESİ */
.contact-item {
    display: flex;
    align-items: center;
    gap: 10px; /* İkon ile yazı arasındaki boşluk */
    color: #888888;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.5px;
    text-decoration: none;
    transition: color 0.3s ease;
}

/* İKONLAR */
.contact-item i {
    color: #e63946; /* Ufak kırmızı detay */
    font-size: 16px;
}

/* TIKLANABİLİR LİNKLER İÇİN HOVER */
.link-item:hover {
    color: #ffffff;
    cursor: pointer;
}

/* =========================================
   MOBİL UYUMLULUK
========================================= */
@media (max-width: 768px) {
    .minimal-contact-module {
        padding: 25px 5%;
    }
    
    .contact-strip {
        gap: 20px;
        flex-direction: column; /* Mobilde yazılar yan yana sığmayacağı için temizce alt alta dizer */
        align-items: center;
    }
    
    .contact-item {
        font-size: 14px; /* Mobilde okunabilirlik için bir tık büyüttük */
    }
}
</style>