<template>
    <section class="rockstar-magazine-module">
        <!-- Arka Plan Resmi ve Karartma Katmanı -->
        <div class="bg-layer"></div>
        <div class="dark-overlay"></div>

        <!-- Merkezdeki İçerik Alanı -->
        <div class="content-container">
            
            <!-- Logo ve Başlık (Yan yana) -->
            <div class="header-group">
                <!-- Medab logosunun yolunu src kısmına eklemelisin -->
                <img src="/src/assets/medab-logo.png" alt="Medab Logo" class="brand-logo" />
                <h2>DERGİ</h2>
            </div>

            <!-- Açıklama Metni -->
            <p class="description">
                Bilim, teknoloji ve sanata dair sınırları zorlayan yazılar, derinlemesine analizler ve kulübümüzden en güncel gelişmeler.
            </p>

            <!-- Oku Butonu (Rockstar tarzı beyaz hap buton) -->
            <a href="https://www.varankfl.com/dergi" class="pill-btn">Oku</a>
            
        </div>
    </section>
</template>

<style scoped>
/* ANA KONTEYNER */
.rockstar-magazine-module {
    position: relative;
    width: 100%;
    min-height: 400px; /* Görseldeki gibi geniş ve ferah bir alan */
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #000000;
    overflow: hidden;
    padding: 40px 20px;
    box-sizing: border-box;
}

/* ARKA PLAN RESMİ (GTA tarzı kolaj resmini buraya koyabilirsin) */
.bg-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* BURAYA KENDİ ARKA PLAN RESMİNİ EKLE */
    background-image: url('https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=2606&auto=format&fit=crop');
    background-size: cover;
    background-position: center;
    /* Rockstar havası: Tamamen siyah-beyaz ve düşük parlaklık */
    filter: grayscale(100%) brightness(0.4) contrast(1.2);
    z-index: 1;
}

/* ODAK EFEKTİ (Kenarları daha karanlık, ortası hafif aydınlık vignette) */
/* Sadece bu sınıfı bul ve bununla değiştir */
.dark-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* Üstten ortaya kadar hafif karanlık, en alt kısımda ise tam SİYAH (#000000) olur */
    background: linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.7) 60%, #000000 100%);
    z-index: 2;
}

/* İÇERİK HİZALAMASI */
.content-container {
    position: relative;
    z-index: 3;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    max-width: 650px; /* Metnin ekranı boydan boya kaplamasını engeller */
}

/* LOGO VE BAŞLIK GRUBU */
.header-group {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px; /* Logo ile yazı arasındaki boşluk */
    margin-bottom: 20px;
}

.brand-logo {
    height: 45px; /* H2 boyutuyla orantılı olacak şekilde ayarlandı */
    width: auto;
    /* Eğer elindeki logo siyahsa, karanlık arka planda görünmesi için aşağıdaki satırı aktif edebilirsin: */
    /* filter: invert(1); */
}

.header-group h2 {
    color: #ffffff;
    font-size: 42px;
    font-weight: 800;
    margin: 0;
    letter-spacing: 0.5px;
}

/* AÇIKLAMA METNİ */
.description {
    color: #e0e0e0;
    font-size: 16px;
    line-height: 1.6;
    margin-bottom: 30px;
    font-weight: 400;
}

/* ROCKSTAR TARZI BUTON */
.pill-btn {
    background-color: #ffffff;
    color: #000000;
    font-size: 15px;
    font-weight: 700;
    padding: 14px 36px;
    border-radius: 50px; /* Hap (pill) şeklini veren kavis */
    text-decoration: none;
    transition: all 0.2s ease;
    border: 2px solid #ffffff;
}

.pill-btn:hover {
    background-color: transparent;
    color: #ffffff;
}

/* MOBİL UYUMLULUK */
@media (max-width: 768px) {
    .rockstar-magazine-module {
        min-height: 350px;
    }
    
    .header-group h2 {
        font-size: 32px;
    }
    
    .brand-logo {
        height: 35px;
    }

    .description {
        font-size: 14px;
        margin-bottom: 25px;
        padding: 0 10px;
    }

    .pill-btn {
        padding: 12px 30px;
        font-size: 14px;
    }
}
</style>