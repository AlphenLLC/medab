<template>
    <section class="bio-section">
        <!-- İçeriği sağ-sol olarak bölmek için bir kapsayıcı (wrapper) kurduk -->
        <div class="bio-container">
            
            <!-- Sol Taraf: Yazılar -->
            <div class="text-content">
                <SectionLabel label="Etkinlik Hakkında" />
                
                <h3 class="sub-h">Misyonumuz</h3>
                <p>
                   What does the American Dream mean today? For Niko Bellic, fresh off the boat from Europe, it is the hope he can escape his past. For his cousin, Roman, it is the vision that together they can find fortune in Liberty City, gateway to the land of opportunity.


                </p>
                
                <h3 class="sub-h">Vizyonumuz</h3>
                <p>
                  As they slip into debt and are dragged into a criminal underworld by a series of shysters, thieves, and sociopaths, they discover that the reality is very different from the dream in a city that worships money and status, and is heaven for those who have them and a living nightmare for those who don't.
                </p>
            </div>

            <!-- Sağ Taraf: Resim -->
            <div class="image-content">
                <!-- Kendi görselinin yolunu src içerisine eklemelisin -->
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbeqC6kPu2yp0u8F6NA21Y5tGtS9RhMMGaGcl_qoMT7axe0J8DGraM_sZD&s=10" alt="Çalıştay Görseli" />
            </div>

        </div>
    </section>
</template>

<script>
import SectionLabel from './SectionLabel.vue'

export default {
    name: 'AboutSection',
    components: {
        SectionLabel
    }
}
</script>

<style scoped>
.bio-section {
    width: 100%;
    /* Sabit marginler yerine padding ile iç boşluk verdik */
    padding: 60px 10%; 
    box-sizing: border-box;
}

.bio-container {
    display: flex;
    align-items: center; /* Yazı ve resmi dikey eksende ortalar */
    justify-content: space-between;
    gap: 60px; /* Yazı ve resim arasındaki boşluk */
    max-width: 1200px;
    margin: 0 auto;
}

.text-content {
    flex: 1; /* Boşluğu resimle eşit paylaşır */
    text-align: left; /* Geniş ekranda okunaklılık için sola yasladık */
}

.text-content p {
    font-size: 18px;
    line-height: 1.7;
    margin-bottom: 25px;
    color: #ffffff; /* Tam siyah yerine koyu gri, göz yormaz */
}

.sub-h {
    font-size: 26px;
    margin-bottom: 10px;
    color: #ffffff;
}

.image-content {
    flex: 1; 
    display: flex;
    justify-content: center;
}

.image-content img {
    width: 100%;
    max-width: 500px; 
    border-radius: 12px; /* Köşeleri hafif yumuşattık */
    box-shadow: 0 15px 30px rgba(0,0,0,0.15); /* Havada duruyormuş hissi (derinlik) */
    object-fit: cover;
}

/* =========================================
   MOBİL UYUMLULUK
========================================= */
@media (max-width: 900px) {
    .bio-container {
        flex-direction: column; /* Mobilde yan yana değil, alt alta dizer */
        text-align: center;
        gap: 40px;
    }

    .text-content {
        text-align: center; /* Mobilde tüm yazıları ve başlığı ortala */
    }

    .bio-section {
        padding: 40px 5%; /* Mobilde ekran kenarlarına biraz daha yaklaşsın */
    }

    .image-content {
        /* Bu satır resmi CSS ile alıp yazının "ÜSTÜNE" koyar. 
           Eğer yazının "ALTINDA" kalsın istersen bu order satırını tamamen sil. */
        order: -1; 
        width: 100%;
    }
    
    .image-content img {
        max-width: 90%; /* Mobilde çok fazla yer kaplamaması için hafif daralttık */
    }
}
</style>