<template>
    <section class="dergi">
        <div class="bg-layer"></div>
        <div class="dark-overlay"></div>
        <div class="content-container">          
            <div class="left-col">
                <h2>MEDAB<br>PROPAGANDA</h2>
            </div>
            <div class="right-col">
                <p class="description">
                   MedAB topluluğunun usta yazarlar tarafından yazılmış olan içerikler. Tıp ve teknoloji alanındaki son yayınlarımız için en yeni sayımızı inceleyin.
                </p>
                <a href="#" class="pill-btn">Dergiyi Oku</a>          
            </div>
        </div>
    </section>
</template>

<style scoped>
/*Archivo Black + Montserrat*/
@import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Montserrat:wght@500;700&display=swap');

.dergi {
    position: relative;
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center; 
    background-color: #000000;
    overflow: hidden;
    padding: 40px 0;
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
    background: linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.7) 70%, #000000 100%);
    z-index: 2;
}

.content-container {
    position: relative;
    z-index: 3;
    display: flex;
    flex-direction: row; 
    justify-content: space-between; 
    align-items: center;
    width: 100%;
    max-width: 1200px; 
    padding: 0 5%;
    box-sizing: border-box;
    gap: 40px;
}

.left-col {
    flex: 1;
    text-align: left;
}


.right-col {
    flex: 1;
    text-align: left;
    max-width: 450px; 
}

.left-col h2 {
    font-family: 'Archivo Black', sans-serif;
    color: #ffffff;
    font-size: 75px;
    line-height: 0.95;
    letter-spacing: -4px;
    margin: 0;
    text-transform: uppercase; 
}

.description {
    font-family: 'Montserrat', sans-serif;
    color: #d1d5db; 
    font-size: 16px;
    line-height: 1.6;
    margin: 0 0 30px 0;
    font-weight: 500;
}

.pill-btn {
    display: inline-block;
    font-family: 'Montserrat', sans-serif;
    background-color: #ffffff;
    color: #000000;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: -0.5px;
    padding: 14px 32px;
    border-radius: 50px;
    text-decoration: none;
    transition: background-color 0.2s ease;
}

.pill-btn:hover {
    background-color: #e5e5e5;
}

@media (max-width: 900px) {

    .dergi {
        min-height: auto; 
        padding: 80px 0;
    }

    .content-container {
        flex-direction: column; 
        justify-content: center;
        align-items: center; 
        gap: 25px; 
    }
}

    .left-col {
        width: 100%;
        text-align: left; 
    }

    .left-col h2 {
        font-size: 40px; 
        letter-spacing: -2px; 
    }

    .right-col {
        max-width: 100%;
        text-align: left; 
    }
</style>