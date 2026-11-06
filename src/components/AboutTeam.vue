<template>
    <section class="about-hero-section">
        <div class="hero-arkaplan">
            <div class="fade-overlay"></div>
        </div>

        <div class="about-warp">
            <div class="container">
                
                <div class="baslik-kapsayici">
                    <h2 class="title">MEDAB EKİBİ</h2>
                    <p class="baslik-aciklamasi">
                        MEDAB; bilimsel merakı teşvik eden, öğrencilerin birbirlerinden ve hocalarından öğrenmesini destekleyen, farklı bakış açılarını bir araya getiren ve tıp fakültesi eğitimine değer katmayı amaçlayan dinamik bir öğrenci topluluğudur. Çalışmalarımızı yalnızca öğrenciler arası bir yapı olarak değil, fakültemizin akademik kadrosuyla karşılıklı iletişim ve iş birliği içerisinde sürdürüyoruz.
                    </p>
                </div>

            </div>
        </div>
    </section>
</template>

<script setup>
</script>

<style scoped>
    .about-hero-section {
        position: relative; 
        width: 100%;
        background-color: #000000;
    }

    .hero-arkaplan {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 520px; 
        background-image: url('../../public/branding/ekip-banner.webp'); 
        background-size: cover;
        background-position: center;
        z-index: 0;
        pointer-events: none; 
    }

    .hero-arkaplan .fade-overlay {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            to bottom, 
            rgba(0, 0, 0, 0.4) 0%, 
            rgba(0, 0, 0, 0.85) 60%, 
            #000000 100%
        );
    }

    .about-warp {
        width: 100%;
        padding-top: 155px;
        padding-bottom: 2rem;
        box-sizing: border-box;
        position: relative; 
        z-index: 1; 
        display: flex;
        justify-content: center;
    }

    .container {
        width: 100%;
        max-width: 860px;
        padding: 0 1.5rem;
        box-sizing: border-box;
    }

    .baslik-kapsayici {
        text-align: center;
        width: 100%;
        margin: 0 auto;
    }

    .title {
        font-family: 'Archivo Black', sans-serif;
        font-size: clamp(2.8rem, 5.8vw, 4.2rem); 
        color: #ffffff;
        letter-spacing: -2px;
        line-height: 1.0;
        margin: 0 0 1.5rem 0;
        text-transform: uppercase;
        text-shadow: 0 4px 20px rgba(0, 0, 0, 0.95);
    }

    .baslik-aciklamasi {
        font-family: 'Montserrat', sans-serif;
        color: #a1a1aa;
        font-size: 1.05rem;
        font-weight: 400;
        max-width: 720px;
        margin: 0 auto;
        line-height: 1.75;
        text-align: center;
        text-shadow: 0 2px 10px rgba(0, 0, 0, 0.9);
    }

    @media (max-width: 768px) {
        .hero-arkaplan {
            height: 380px; 
        }

        .about-warp {
            padding-top: 110px; 
            padding-bottom: 1rem;
        }

        .title { 
            font-size: 2.4rem; 
            letter-spacing: -1.2px;
            margin-bottom: 1.2rem;
        }

        .baslik-aciklamasi {
            font-size: 0.95rem;
            line-height: 1.6;
        }
    }
</style>