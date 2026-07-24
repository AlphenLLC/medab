<template>
    <section class="about-page">
        <div class="about-warp">
            <div class="container">
                <div class="about-layout">
                    <div class="about-text">
                        <h2 class="section-title">MEDAB <span class="ikincil">EKİBİ </span></h2>
                        <p class="section-description">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit amet metus ullamcorper, condimentum turpis eget, interdum ex. Curabitur aliquet, libero vel commodo lobortis, justo velit euismod tellus, eget ornare neque eros sodales sapien. Morbi efficitur orci nisi, iaculis blandit dui pharetra vel.
                        </p>
                    </div>

                    <div class="about-image">
                        <img src="https://images.unsplash.com/photo-1497250681960-ef046c08a56e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Ekip Fotoğrafı" class="team-image" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
</script>

<style scoped>
    .about-page {
        background-color: #000000; 
        color: #ffffff;
        text-align: left;
        position: relative; 
    }

    .about-warp {
        width: 100%;
        padding: 6.5rem 0 1.5rem 0; 
        box-sizing: border-box;
    }

    .about-layout {
        display: flex;
        align-items: center;
        gap: 3rem; 
    }

    .about-text {
        flex: 1;
    }

    .section-title {
        font-size: 3rem;
        margin-bottom: 1rem;
        color: #ffffff;
        text-transform: uppercase;
        font-weight: 900;
        letter-spacing: 2px;
    }

    .section-description {
        font-size: 1.1rem;
        line-height: 1.8;
        margin-bottom: 1.5rem;
        color: #d1d1d1;
        text-align: justify;
        font-weight: normal; 
    }

    .about-image {
        flex: 1.2; 
        display: flex;
        justify-content: center;
        position: relative;
        width: 100%;
    }

    .team-image {
        width: 100%;
        height: 400px; 
        object-fit: cover;
        border-radius: 4px;
        display: block;
    }

    .ikincil {
        color: #2196fd;
    }

    @media (max-width: 1000px) {
        .about-warp {
            padding: 5rem 15px 1.5rem 15px; 
        }
    }

    @media (max-width: 768px) {
        .about-layout {
            flex-direction: column;
            gap: 2.5rem;
        }
        
        .about-text {
            position: relative;
            z-index: 1; 
            padding-top: 60px; 
        }

        .section-title {
            text-align: center; 
            font-size: 2.5rem;
            text-shadow: 2px 2px 15px rgba(0,0,0,0.9); 
        }

        .section-description {
            text-align: center; 
        }

        .about-image {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%; 
            height: 450px; 
            z-index: 0;
        }

        .team-image {
            height: 100%; 
            border-radius: 0;
        }

        .about-image::after {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background: linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.8) 60%, #000000 100%);
            pointer-events: none;
        }
    }
</style>