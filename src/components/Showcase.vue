<template>
    <section class="events-section">
        <!-- Önceki adımda toparladığımız başlık bileşenini burada da kullanıyoruz -->
        <SectionLabel label="Etkinliklerimiz" />

        <div class="slider-wrapper">
            <!-- Sol Buton (Sadece bilgisayarda görünür) -->
            <button class="nav-btn left-btn" @click="scrollLeft">
                &#10094;
            </button>

            <!-- Slider Kutusu -->
            <div class="slider-container" ref="slider">
                
                <!-- Etkinlik Kartları (Döngü ile basılıyor) -->
                <!-- Eğer Vue Router kullanıyorsan <a> yerine <router-link :to="event.link"> kullanmalısın -->
                <a 
                    v-for="(event, index) in events" 
                    :key="index" 
                    :href="event.link" 
                    class="event-card"
                >
                    <div class="image-box">
                        <img :src="event.image" :alt="event.title" />
                    </div>
                    <div class="event-info">
                        <h4>{{ event.title }}</h4>
                    </div>
                </a>

            </div>

            <!-- Sağ Buton (Sadece bilgisayarda görünür) -->
            <button class="nav-btn right-btn" @click="scrollRight">
                &#10095;
            </button>
        </div>
    </section>
</template>

<script>
import SectionLabel from './SectionLabel.vue'

export default {
    name: 'EventsSlider',
    components: {
        SectionLabel
    },
    data() {
        return {
            // Buraya istediğin kadar etkinlik ekleyebilirsin, slider otomatik uzar
            events: [
                {
                    title: "I Have No Mouth and I Must Scream",
                    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbeqC6kPu2yp0u8F6NA21Y5tGtS9RhMMGaGcl_qoMT7axe0J8DGraM_sZD&s=10',
                    link: '/etkinlik/genetik'
                },
                {
                    title: 'I Have No Mouth and I Must Scream',
                    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbeqC6kPu2yp0u8F6NA21Y5tGtS9RhMMGaGcl_qoMT7axe0J8DGraM_sZD&s=10',
                    link: '/etkinlik/yapay-zeka'
                },
                {
                    title: 'I Have No Mouth and I Must Scream',
                    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbeqC6kPu2yp0u8F6NA21Y5tGtS9RhMMGaGcl_qoMT7axe0J8DGraM_sZD&s=10',
                    link: '/etkinlik/robotik'
                },
                {
                    title: 'I Have No Mouth and I Must Scream',
                    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbeqC6kPu2yp0u8F6NA21Y5tGtS9RhMMGaGcl_qoMT7axe0J8DGraM_sZD&s=10',
                    link: '/etkinlik/astronomi'
                }
            ]
        }
    },
    methods: {
        // Javascript ile yatayda kaydırma işlemleri
        scrollLeft() {
            this.$refs.slider.scrollBy({ left: -320, behavior: 'smooth' });
        },
        scrollRight() {
            this.$refs.slider.scrollBy({ left: 320, behavior: 'smooth' });
        }
    }
}
</script>

<style scoped>
.events-section {
    width: 100%;
    padding: 60px 0; /* Üstten ve alttan boşluk, yanlar sıfır çünkü slider kenara yapışmalı */
    background-color: #f8f9fa; /* Ana sayfadan ayırmak için çok hafif gri bir arkaplan */
}

.slider-wrapper {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
}

/* Slider'ın kendisi */
.slider-container {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory; /* Kartların yarım kalmasını engeller, tam oturur */
    gap: 20px;
    padding: 20px;
    scroll-behavior: smooth;
    
    /* Scrollbar'ı gizleme kodları (daha şık durması için) */
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
}
.slider-container::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
}

/* Etkinlik Kartı */
.event-card {
    flex: 0 0 300px; /* Genişliği 300px'e sabitledik, küçülüp büyümez */
    scroll-snap-align: center; /* Kaydırıldığında kartı tam ortaya hizalar */
    background: #ffffff;
    border-radius: 12px;
    overflow: hidden;
    text-decoration: none; /* Link alt çizgisini kaldırır */
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.event-card:hover {
    transform: translateY(-8px); /* Mouse ile üzerine gelince hafif havaya kalkar */
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
}

.image-box {
    width: 100%;
    height: 200px;
    overflow: hidden;
}

.image-box img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Resmi ezmeden kutuya sığdırır */
}

.event-info {
    padding: 20px;
    text-align: center;
}

.event-info h4 {
    margin: 0;
    font-size: 18px;
    color: #111822;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
}

/* Yönlendirme Butonları */
.nav-btn {
    background-color: #ffffff;
    border: none;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    font-size: 24px;
    color: #3d5a99;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    position: absolute;
    z-index: 10;
    transition: background 0.3s ease, color 0.3s ease;
}

.nav-btn:hover {
    background-color: #3d5a99;
    color: #ffffff;
}

.left-btn {
    left: -25px; /* Konteynerin hafif dışına taşır */
}

.right-btn {
    right: -25px;
}

/* =========================================
   MOBİL UYUMLULUK (CRITICAL TWEAKS)
========================================= */
@media (max-width: 900px) {
    .slider-wrapper {
        padding: 0;
    }
    
    /* Mobilde ok butonlarına gerek yok, insanlar kaydırmayı (swipe) tercih eder. 
       Oklar mobilde ekranı daraltır ve çirkin durur, bu yüzden gizliyoruz. */
    .nav-btn {
        display: none;
    }

    .slider-container {
        padding: 20px 5%; /* Kartların ekranın dibine yapışmaması için */
        gap: 15px;
    }

    .event-card {
        /* Mobilde kartın genişliğini ekranın %75'i kadar yaparız. 
           Böylece sıradaki kartın ucu biraz gözükür, kullanıcıya "beni yana kaydır" mesajı verir. (Native his) */
        flex: 0 0 75%; 
    }
}
</style>