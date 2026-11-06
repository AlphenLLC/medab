<template>
    <section class="dergi">
        <div class="bg-layer"></div>
        <div class="dark-overlay"></div>
        <div class="grain-overlay"></div>
        <div class="content-container">           
            <div class="header-group">
                <h2>MEDAB WORKSHOP</h2>
            </div>
            
            <p class="description">
                MedAB topluluğunun atölyesinden çıkan tüm etkinliklere göz at.
            </p>
            
            <router-link to="/etkinlikler/" class="pill-btn">
                Etkinlikleri Gör
            </router-link>          
        </div>
    </section>
</template>

<style scoped>
.dergi {
    position: relative;
    width: 100%;
    min-height: 440px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #000000;
    overflow: hidden;
    padding: 75px 20px;
    box-sizing: border-box;
}

.bg-layer {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    background-image: url('../.././public/branding/hakkimizda-workshop-brand.webp');
    background-size: cover;
    background-position: center 35%;
    filter: grayscale(100%) brightness(0.52) contrast(1.3);
    z-index: 1;
}

.dark-overlay {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        to bottom, 
        #000000 0%, 
        rgba(0, 0, 0, 0.3) 25%, 
        rgba(0, 0, 0, 0.1) 50%, 
        rgba(0, 0, 0, 0.65) 80%, 
        #000000 100%
    );
    z-index: 2;
    pointer-events: none;
}

.grain-overlay {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.035'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 3;
}

.content-container {
    position: relative;
    z-index: 4;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    max-width: 650px;
}

.header-group {
    margin-bottom: 14px;
}

.header-group h2 {
    font-family: 'Archivo Black', sans-serif;
    color: #ffffff;
    font-size: clamp(32px, 5vw, 46px);
    line-height: 1.05;
    margin: 0;
    letter-spacing: -1.2px;
    text-transform: uppercase;
    text-shadow: 0 4px 24px rgba(0, 0, 0, 0.95), 0 1px 4px rgba(0, 0, 0, 0.8);
}

.description {
    font-family: 'Montserrat', sans-serif;
    color: #f4f4f5;
    font-size: 15.5px;
    line-height: 1.6;
    margin: 0 0 28px 0;
    font-weight: 500;
    text-shadow: 0 2px 12px rgba(0, 0, 0, 0.95);
}

.pill-btn {
    font-family: 'Montserrat', sans-serif;
    background-color: #ffffff;
    color: #000000;
    font-size: 14px;
    font-weight: 700;
    padding: 13px 36px;
    border-radius: 9999px;
    text-decoration: none;
    transition: all 0.2s ease;
    border: 1.5px solid #ffffff;
    letter-spacing: 0.3px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.7);
}

.pill-btn:hover {
    background-color: transparent;
    color: #ffffff;
    box-shadow: 0 0 16px rgba(255, 255, 255, 0.25);
}

@media (max-width: 768px) {
    .dergi {
        min-height: 380px;
        padding: 55px 20px;
    }

    .bg-layer {
        background-size: auto 155%;
        background-position: center 0%;
        filter: grayscale(100%) brightness(0.55) contrast(1.3);
    }

    .dark-overlay {
        background: linear-gradient(
            to bottom, 
            #000000 0%, 
            rgba(0, 0, 0, 0.25) 25%, 
            rgba(0, 0, 0, 0.1) 50%, 
            rgba(0, 0, 0, 0.75) 80%, 
            #000000 100%
        );
    }
    
    .header-group {
        margin-bottom: 16px;
    }

    .header-group h2 {
        font-size: 32px;
        letter-spacing: -0.8px;
        line-height: 1.1;
    }

    .description {
        font-size: 15px;
        line-height: 1.6;
        margin-bottom: 26px;
        padding: 0 8px;
        max-width: 350px;
    }

    .pill-btn {
        padding: 13px 34px;
        font-size: 14px;
    }
}
</style>