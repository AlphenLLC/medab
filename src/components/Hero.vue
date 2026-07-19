<template>
    <!-- Arka plan resmi computed property'den (bgStyle) geliyor -->
    <section class="landing-section" :style="bgStyle">
        <!-- Resmin üzerine gelen ve yazının okunmasını sağlayan karartma katmanı -->
        <div class="overlay">
            <div id="landing" class="animated fadeIn" style="animation-delay:1s;">
                <!-- İçerikler artık Vue data objesinden dinamik olarak çekiliyor -->
                <h1>{{ announcement.title }}</h1>
                <h3>{{ announcement.date }}</h3>
                <a v-if="announcement.showButton" class="btn_one" :href="announcement.buttonLink">
                    {{ announcement.buttonText }}
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
            // Duyuru değiştiğinde sadece buradaki bilgileri güncellemen yeterli
            announcement: {
                title: "For everything else, there's MedAB",
                date: 'mEDAb',
                image: '', // Buraya kendi resminin yolunu koyabilirsin
                showButton: true,
                buttonText: 'Başvur',
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
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500&display=swap');

.landing-section {
    width: 100%;
    height: 100vh; /* Tam ekran yüksekliği */
    background-color: #3d5a99; /* Resim yüklenene kadar veya resim yoksa görünecek renk */
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.overlay {
    width: 100%;
    height: 100%;
    /* Arka plan resminin üzerine siyah/mavi karışımı yarı saydam bir filtre uygular. Yazı okunabilirliğini garanti eder. */
    background: rgba(17, 24, 34, 0.7); 
    display: flex;
    flex-direction: column;
    justify-content: center;
}

#landing {
    display: flex;
    flex-direction: column;
    align-items: center; /* İçeriği ortalar */
    justify-content: center;
    text-align: center;
    padding: 0px 10%;
}

#landing h1 {
    font-size: 45px;
    font-family: 'Cinzel', serif;
    color: #ffffff;
    margin-bottom: 10px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Okunabilirliği ekstra artırmak için hafif gölge */
}

#landing h3 {
    font-size: 25px;
    font-family: 'Cinzel', serif;
    color: #ffffff;
    margin-bottom: 30px;
}

.btn_one {
    display: inline-block;
    font-size: 18px;
    font-family: 'Poppins', sans-serif; /* Poppins fontunun projende import edildiğinden emin ol */
    color: #ffffff;
    background: transparent;
    border: 3px solid #ffffff;
    padding: 8px 40px;
    border-radius: 80px;
    font-weight: bold;
    transition: 0.4s ease-in-out;
    text-decoration: none;
}

.btn_one:hover {
    cursor: pointer;
    color: #3d5a99;
    background: #ffffff;
}

/* Mobil Uyumluluk */
@media (max-width: 1000px) {
    #landing {
        padding: 0px 4%;
    }

    #landing h1 {
        font-size: 30px;
    }

    #landing h3 {
        font-size: 18px;
    }

    .btn_one {
        padding: 6px 20px;
        width: 60%;
    }
}
</style>