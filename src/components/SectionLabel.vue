<template>
    <div class="label-wrapper">
        <h2>{{ label }}</h2>
    </div>
</template>

<script>
export default {
    name: 'SectionLabel',
    props: {
        label: {
            type: String,
            required: true
        }
    }
}
</script>

<style scoped>
.label-wrapper {
    margin-bottom: 25px;
}

h2 {
    font-size: 35px;
    color: #111822;
    margin: 0;
    padding-bottom: 8px;
    position: relative;
    display: inline-block; /* Çizginin sadece yazının genişliği kadar olmasını sağlar */
}

/* O karışık border ve background mantığı yerine temiz bir alt çizgi efekti */
h2::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    height: 4px; /* Çizgi kalınlığı */
    width: 60%; /* Sadece yazının %60'ının altını çizer, daha estetik durur */
    background-color: #008cf2; /* Senin mavi renk kodun */
    border-radius: 2px;
}

/* =========================================
   MOBİL UYUMLULUK
========================================= */
@media (max-width: 900px) {
    .label-wrapper {
        text-align: center;
    }
    
    h2::after {
        left: 50%; /* Çizgiyi de mobilde tam ortaya hizalar */
        transform: translateX(-50%);
    }
}
</style>