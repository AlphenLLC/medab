<template>
    <section class="editorial-contact">
        <div class="contact-container">
            <div class="footer-col brand-col">
                <span class="brand-logo">Med<span class="brand-dot">.</span>AB</span>
                <p class="brand-fullname">
                    Medeniyet Akademik ve Bilimsel<br />
                    Faaliyetler Kulübü
                </p>
            </div>

            <div class="footer-col nav-col">
                <span class="col-title">DİZİN</span>
                <div class="footer-nav-grid">
                    <router-link to="/">Ana Sayfa</router-link>
                    <router-link to="/etkinlikler/">Etkinlikler</router-link>
                    <router-link to="/hakkimizda/">Hakkımızda</router-link>
                    <router-link to="/dergi/">Dergi</router-link>
                    <router-link to="/ekibimiz">Ekibimiz</router-link>
                    <router-link to="/galeri/">Galeri</router-link>
                </div>
            </div>

            <div class="footer-col">
                <span class="col-title">KONUM</span>
                <p class="col-text">
                    İstanbul Medeniyet Üni<br />
                    Kuzey Kampüs, Üsküdar
                </p>
                <a 
                    href="https://maps.app.goo.gl/mEgJ8uRw49Jb5x8t6" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    class="footer-link"
                >
                    <AppIcon name="map-pin" class="link-icon" :size="13" />
                    <span class="link-text">Haritada Aç</span>
                    <AppIcon name="arrow-right" class="link-arrow" :size="10" />
                </a>
            </div>

            <div class="footer-col">
                <span class="col-title">İLETİŞİM</span>
                <div class="links-wrap">
                    <a href="mailto:info@imumedab.com" class="footer-link">
                        <AppIcon name="mail" class="link-icon" :size="13" />
                        <span class="link-text">info@imumedab.com</span>
                        <AppIcon name="arrow-right" class="link-arrow" :size="10" />
                    </a>
                    <a href="https://instagram.com/imumedab" target="_blank" rel="noopener noreferrer" class="footer-link">
                        <AppIcon name="instagram" class="link-icon" :size="13" />
                        <span class="link-text">@imumedab</span>
                        <AppIcon name="arrow-right" class="link-arrow" :size="10" />
                    </a>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'EditorialContact'
}
</script>

<style scoped>
.editorial-contact {
    width: 100%;
    background-color: #000000;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    padding: 48px 8% 42px 8%;
    box-sizing: border-box;
}

.contact-container {
    max-width: 1240px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1.25fr 1.45fr 1fr 1fr;
    gap: 40px;
    align-items: start;
}

.footer-col {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
}

.col-title {
    font-family: 'Montserrat', sans-serif;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 1.6px;
    color: #52525b;
    text-transform: uppercase;
    margin-bottom: 14px;
}

.brand-logo {
    font-family: 'Archivo Black', sans-serif;
    font-size: 24px;
    color: #ffffff;
    letter-spacing: -0.8px;
    line-height: 1;
    margin-bottom: 10px;
}

.brand-dot {
    color: #ba0c2f;
}

.brand-fullname {
    font-family: 'Montserrat', sans-serif;
    font-size: 12.5px;
    font-weight: 400;
    line-height: 1.55;
    color: #71717a;
    margin: 0;
    max-width: 250px;
}

.footer-nav-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(110px, auto));
    gap: 8px 20px;
    width: 100%;
}

.footer-nav-grid a {
    font-family: 'Montserrat', sans-serif;
    font-size: 12.5px;
    font-weight: 500;
    color: #a1a1aa;
    text-decoration: none;
    display: inline-block;
    white-space: nowrap;
}

.footer-nav-grid a:hover {
    color: #ffffff;
}

.col-text {
    font-family: 'Montserrat', sans-serif;
    font-size: 12.5px;
    font-weight: 400;
    line-height: 1.55;
    color: #a1a1aa;
    margin: 0 0 10px 0;
}

.links-wrap {
    display: flex;
    flex-direction: column;
    gap: 7px;
}

.footer-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    padding: 1px 0;
}

.link-icon {
    color: #71717a;
    width: 13px;
    height: 13px;
    flex-shrink: 0;
    transition: color 0.2s ease;
}

.link-text {
    font-family: 'Montserrat', sans-serif;
    font-size: 12.5px;
    font-weight: 400;
    color: #a1a1aa;
    transition: color 0.2s ease;
}

.link-arrow {
    color: #52525b;
    transform: rotate(-45deg);
    flex-shrink: 0;
    transition: transform 0.2s ease, color 0.2s ease;
}

.footer-link:hover .link-icon,
.footer-link:hover .link-text,
.footer-link:hover .link-arrow {
    color: #ffffff;
}

.footer-link:hover .link-arrow {
    transform: rotate(-45deg) translate(2px, -2px);
}

@media (max-width: 860px) {
    .editorial-contact {
        padding: 30px 20px 24px 20px;
    }

    .contact-container {
        grid-template-columns: 1.15fr 0.85fr;
        gap: 22px 16px;
    }

    .brand-col {
        grid-column: 1 / -1;
        padding-bottom: 14px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }

    .brand-logo {
        font-size: 22px;
        margin-bottom: 6px;
    }

    .brand-fullname {
        font-size: 12px;
        max-width: 100%;
    }

    .nav-col {
        grid-column: 1 / -1;
        padding-bottom: 14px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }

    .footer-nav-grid {
        gap: 8px 20px;
    }

    .col-title {
        font-size: 9.5px;
        margin-bottom: 10px;
    }

    .footer-nav-grid a,
    .col-text,
    .link-text {
        font-size: 12px;
    }
}
</style>