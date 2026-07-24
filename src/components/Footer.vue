<template>
    <footer class="footer">
        <div class="footer-text">
            <span class="est">EST. MMXXII</span>
            <span class="divider">|</span>
            <a href="https://www.youtube.com/watch?v=aAg3bwzSuLk" target="_blank" class="brand">Alphen Limited</a>
        </div>
        <div class="footer-img-wrapper">
            <div class="shadow-overlay"></div>
        </div>
    </footer>
</template>

<style scoped>
.footer {
    position: relative;
    width: 100%;
    min-height: 70px; 
    background-color: #000000;
    display: flex;
    align-items: center;
    justify-content: center; 
    border-top: none;
    overflow: hidden;
}

.footer-text {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    z-index: 2;
    padding: 0 15px; 
}

.est, .brand, .motto {
    font-size: 13px; 
    font-weight: 500;
    letter-spacing: 1px;
    text-decoration: none;
    transition: color 0.3s ease;
}

.est {
    color: #979696;
}

.brand {
    color: #f8bc2b; 
    font-weight: 700;
}

.motto {
    color: #979696;
}

.brand:hover {
    color: #ffffff;
}

.divider {
    color: #222222;
    font-size: 14px;
}

.footer-img-wrapper {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 160px; 
    background-image: url('https://i.pinimg.com/736x/73/67/5f/73675f4ea4e9dbd3782c5087e608637e.jpg'); /*toptoga*/
    background-size: cover;
    background-position: center;
    z-index: 1;
}

.shadow-overlay {
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, #000000 0%, rgba(0,0,0,0.7) 60%, rgba(0,0,0,0.85) 100%);
}

@media (max-width: 768px) {
    .footer {
        padding: 30px 0; 
    }

    .footer-text {
        flex-direction: column;
        gap: 12px;
        text-align: center;
        width: 100%;
        padding: 0;
        z-index: 3;
    }

    .divider {
        display: none;
    }

    .footer-img-wrapper {
        width: 150px; 
        clip-path: polygon(30% 0, 100% 0, 100% 100%, 0% 100%);
        opacity: 0.15;
        filter: grayscale(100%);
        z-index: 1;
    }

    .shadow-overlay {
        background: linear-gradient(to right, #000000 0%, transparent 100%);
    }
}
</style>