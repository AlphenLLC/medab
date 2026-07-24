<template>
    <section class="events-section">
        <div class="section-header">
            <h2>ETKİNLİKLERİMİZ</h2>
            <div class="header-line"></div>
            <p class="section-desc">MedAB imzalı etkinlikler, devam eden projeler ve daha fazlası.</p>
        </div>
        <div class="slider-wrapper">
            <button class="nav-btn left-btn" @click="scrollLeft">
                &#10094;
            </button>
            <div class="slider-container" ref="slider">
                
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
            <button class="nav-btn right-btn" @click="scrollRight">
                &#10095;
            </button>
        </div>
    </section>
</template>

<script>
export default {
    name: 'EventsSlider',
    data() {
        return {
            events: [
                {
                    title: "Adli Tıp Kongresi",
                    image: 'https://images.unsplash.com/photo-1533563906091-fdfdffc3e3c4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                    link: '/etkinlik/guleda'
                },
                {
                    title: 'Sütur Atma Etkinliği',
                    image: 'https://images.unsplash.com/photo-1533563906091-fdfdffc3e3c4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                    link: '/etkinlik/elif'
                },
                {
                    title: 'Huzurevi Ziyaretleri',
                    image: 'https://images.unsplash.com/photo-1533563906091-fdfdffc3e3c4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                    link: '/etkinlik/alp'
                },
                {
                    title: "Elif Urtaç ile Söyleşi",
                    image: 'https://images.unsplash.com/photo-1533563906091-fdfdffc3e3c4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                    link: '/etkinlik/tukuku11'
                }
            ]
        }
    },
    methods: {
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
    padding: 60px 0; 
    background-color: #000000;
    border-top: 1px solid rgba(255, 255, 255, 0.15);
}

.section-header {
    text-align: center;
    margin-bottom: 40px;
    padding: 0 20px;
}

.section-header h2 {
    font-family: 'Archivo Black', sans-serif;
    font-size: 36px;
    color: #ffffff;
    letter-spacing: -1.5px;
    margin: 0 0 10px 0;
    text-transform: uppercase;
}

.header-line {
    width: 60px;
    height: 3px;
    background-color: #ffffff;
    margin: 0 auto 15px auto;
    border-radius: 2px;
}

.section-desc {
    font-family: 'Montserrat', sans-serif;
    font-size: 18px;
    color: #ffffff;
    margin: 0;
    font-weight: 400;
}

.slider-wrapper {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
}

.slider-container {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory; 
    gap: 20px;
    padding: 20px;
    scroll-behavior: smooth;
    
    -ms-overflow-style: none;
    scrollbar-width: none; 
}
.slider-container::-webkit-scrollbar {
    display: none;
}

.event-card {
    flex: 0 0 300px;
    scroll-snap-align: center;
    background: #111111; 
    border-radius: 12px;
    overflow: hidden;
    text-decoration: none; 
    border: 1px solid rgba(255, 255, 255, 0.1); 
    transition: transform 0.3s ease, border-color 0.3s ease;
}

.event-card:hover {
    transform: translateY(-8px); 
    border-color: #ffffff; 
}

.image-box {
    width: 100%;
    height: 200px;
    overflow: hidden;
}

.image-box img {
    width: 100%;
    height: 100%;
    object-fit: cover; 
}

.event-info {
    padding: 20px;
    text-align: center;
}

.event-info h4 {
    margin: 0;
    font-size: 15px;
    color: #ffffff; 
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    line-height: 1.4;
}

.nav-btn {
    background-color: transparent;
    border: 2px solid #ffffff;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    font-size: 20px;
    color: #ffffff;
    cursor: pointer;
    position: absolute;
    z-index: 10;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.nav-btn:hover {
    background-color: #ffffff;
    color: #000000;
}

.left-btn {
    left: -25px; 
}

.right-btn {
    right: -25px;
}

@media (max-width: 900px) {
    .section-header h2 {
        font-size: 28px;
    }

    .section-desc {
        font-size: 14px;
        padding: 0 10px;
    }

    .slider-wrapper {
        padding: 0;
    }
    
    .nav-btn {
        display: none;
    }

    .slider-container {
        padding: 20px 5%; 
        gap: 15px;
    }

    .event-card {
        flex: 0 0 75%; 
    }
}
</style>