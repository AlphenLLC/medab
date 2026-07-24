<template>
    <section class="minimal-contact-module">
        <div class="contact-strip">
            <div class="contact-item">
                <MapPin class="ikon" :size="18" />
                <span>Medeniyet Üni. Göztepe, Istanbul</span>
            </div>
            <a href="mailto:imumedab@gmail.com" class="contact-item link-item">
                <Mail class="ikon" :size="18" />
                <span>imumedab@gmail.com</span>
            </a>
            <a href="https://instagram.com/imumedab" target="_blank" class="contact-item link-item">
                <Instagram class="ikon" :size="18" />
                <span>@imumedab</span>
            </a>
            <a href="https://www.medeniyet.edu.tr" target="_blank" class="contact-item link-item">
                <Landmark class="ikon" :size="18" />
                <span>medeniyet.edu.tr</span>
            </a>

        </div>
    </section>
</template>

<script setup>
// Lucide
import { MapPin, Mail, Instagram, Landmark } from 'lucide-vue-next'
</script>

<style scoped>
.minimal-contact-module {
    background-color: #000000;
    width: 100%;
    padding: 30px 5%; 
    box-sizing: border-box;
    border-bottom: none; 
}

.contact-strip {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 40px;
    max-width: 1200px;
    margin: 0 auto;
}

.contact-item {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #888888;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.5px;
    text-decoration: none;
    transition: color 0.3s ease;
}

.contact-item .ikon {
    color: #2196fd;
}

.link-item:hover {
    color: #ffffff;
    cursor: pointer;
}

@media (max-width: 768px) {
    .minimal-contact-module {
        padding: 25px 5%;
    }
    
    .contact-strip {
        gap: 20px;
        flex-direction: column;
        align-items: center;
    }
    
    .contact-item {
        font-size: 14px;
    }
}
</style>