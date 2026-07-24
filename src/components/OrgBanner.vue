<template>
    <section class="dergi">
        <div class="bg-layer"></div>
        <div class="dark-overlay"></div>
        <div class="content-container">           
            <div class="header-group">
                <h2>MEDAB WORKSHOP</h2>
            </div>
            <p class="description">
                MedAB topluluğunun atölyesinden çıkan tüm etkinliklere göz at.
            </p>
            <a href="" class="pill-btn">Bring it in!</a>          
        </div>
    </section>
</template>

<style scoped>
.dergi {
    position: relative;
    width: 100%;
    min-height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #000000;
    overflow: hidden;
    padding: 40px 20px;
    box-sizing: border-box;
}

.bg-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw9A5RF6tkvNxdfzi0oaB4AwvvEfCtrbHfur9QcDJljw&s=10');
    background-size: cover;
    background-position: center;
    filter: grayscale(100%) brightness(0.4) contrast(1.2);
    z-index: 1;
}

.dark-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.7) 60%, #000000 100%);
    z-index: 2;
}

.content-container {
    position: relative;
    z-index: 3;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    max-width: 650px;
}

.header-group {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    margin-bottom: 20px;
}

.brand-logo {
    height: 45px;
    width: auto;
}

.header-group h2 {
    color: #ffffff;
    font-size: 42px;
    font-weight: 800;
    margin: 0;
    letter-spacing: 0.5px;
}

.description {
    color: #e0e0e0;
    font-size: 16px;
    line-height: 1.6;
    margin-bottom: 30px;
    font-weight: 400;
}

.pill-btn {
    background-color: #ffffff;
    color: #000000;
    font-size: 15px;
    font-weight: 700;
    padding: 14px 36px;
    border-radius: 50px;
    text-decoration: none;
    transition: all 0.2s ease;
    border: 2px solid #ffffff;
}

.pill-btn:hover {
    background-color: transparent;
    color: #ffffff;
}

@media (max-width: 768px) {
    .dergi {
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