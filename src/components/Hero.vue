<template>
    <section class="landing-section">
        <div class="bg-layer" :style="bgStyle"></div>
        <div class="dark-overlay"></div>
        <div class="content-container">
            <div id="landing" class="animated fadeIn" style="animation-delay:0.5s;">
                <h1>Med<span class="blue-light">A</span><span class="blue-dark">B</span></h1>
                <p class="hero-desc">{{ announcement.desc }}</p>
                <a v-if="announcement.showButton" class="btn_one" :href="announcement.buttonLink">
                    {{ announcement.buttonText }} 
                    <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'Hero',
    data() {
        return {
            announcement: {
                desc: "İstanbul Medeniyet Tıp Akademik ve Bilimsel Faliyetler Kulübü. Fakülteyi yücelten onlarca vizyonere katıl.",
                image: 'https://images.unsplash.com/photo-1464457312035-3d7d0e0c058e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                showButton: true,
                buttonText: 'Aramıza Katıl',
                buttonLink: '#'
            }
        }
    },
    computed: {
        bgStyle() {
            return {
                backgroundImage: `url(${this.announcement.image})`
            }
        }
    }
}
</script>

<style scoped>

body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
}

.landing-section {
    --med-color: #ffffff;
    --a-color: #4DA6FF;
    --b-color: #004080;
    position: relative;
    width: 100%;
    height: 100vh; 
    background-color: #000000;
    overflow: hidden;
}

.bg-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    filter: brightness(0.85); 
    z-index: 1;
}

.dark-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, transparent 0%, transparent 40%, rgba(0,0,0,0.85) 80%, #000000 100%);
    z-index: 2;
}

.content-container {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 3;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    padding: 0 5% 80px 5%;
    box-sizing: border-box;
}

#landing {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    max-width: 600px;
}

#landing h1 {
    font-family: 'Archivo Black', sans-serif;
    font-size: 56px;
    color: var(--med-color);
    letter-spacing: -2px;
    line-height: 1.1;
    margin: 0 0 10px 0;
}

.blue-light {
    color: var(--a-color); 
}

.blue-dark {
    color: var(--b-color); 
}

.hero-desc {
    font-family: 'Montserrat', sans-serif;
    font-size: 18px;
    color: #e5e7eb;
    line-height: 1.6;
    font-weight: 500;
    margin: 0 0 30px 0;
}

.btn_one {
    display: inline-flex;
    align-items: center;
    gap: 12px; /* Yazı ile ok arasındaki boşluk */
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
    font-weight: 700;
    color: #000000;
    background-color: #ffffff;
    padding: 14px 32px;
    border-radius: 50px;
    letter-spacing: -0.5px;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
}

.btn_one i {
    font-size: 14px;
    transition: transform 0.2s ease;
}

.btn_one:hover {
    background-color: #d1d5db;
}

.btn_one:hover i {
    transform: translateX(5px);
}

@media (max-width: 1000px) {
    .content-container {
        padding: 0 5% 50px 5%;
    }

    #landing h1 {
        font-size: 42px;
    }

    .hero-desc {
        font-size: 16px;
        margin-bottom: 25px;
    }

    .btn_one {
        padding: 12px 28px;
        font-size: 15px;
    }
}
</style>