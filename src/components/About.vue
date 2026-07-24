<template>
    <section class="bio-section">
        <div class="bio-container">
            <div class="text-content">           
                <h3 class="sub-h">Misyonumuz</h3>
                <p>
                   What does the American Dream mean today? For Niko Bellic, fresh off the boat from Europe, it is the hope he can escape his past. For his cousin, Roman, it is the vision that together they can find fortune in Liberty City, gateway to the land of opportunity.
                </p> 
                <h3 class="sub-h">Vizyonumuz</h3>
                <p>
                  As they slip into debt and are dragged into a criminal underworld by a series of shysters, thieves, and sociopaths, they discover that the reality is very different from the dream in a city that worships money and status, and is heaven for those who have them and a living nightmare for those who don't.
                </p>
            </div>

            <div class="image-content">
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
    padding: 60px 10%; 
    box-sizing: border-box;
    background-color: #121212;
}

.bio-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 60px;
    max-width: 1200px;
    margin: 0 auto;
}

.text-content {
    flex: 1;
    text-align: left;
}

.text-content p {
    font-size: 18px;
    line-height: 1.7;
    margin-bottom: 25px;
    color: #ffffff;
}

.sub-h {
    font-size: 26px;
    margin-bottom: 10px;
    color: #306bac;
}

.image-content {
    flex: 1; 
    display: flex;
    justify-content: center;
}

.image-content img {
    width: 100%;
    max-width: 500px; 
    border-radius: 12px;
    box-shadow: 0 15px 30px rgba(0,0,0,0.15);
    object-fit: cover;
}

@media (max-width: 900px) {
    .bio-container {
        flex-direction: column;
        text-align: center;
        gap: 40px;
    }

    .text-content {
        text-align: center;
    }

    .bio-section {
        padding: 40px 5%;
    }

    .image-content {
        order: -1; 
        width: 100%;
    }
    
    .image-content img {
        max-width: 90%;
    }
}
</style>