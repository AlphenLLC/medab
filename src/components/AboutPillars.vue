<template>
    <section class="faq-section">
        <div class="faq-warp">
            <div class="container">
                <h2 class="section-title">EKİPLER</h2>
                <p class="section-description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit amet metus ullamcorper, condimentum turpis eget, interdum ex. Curabitur aliquet, libero vel commodo lobortis, justo velit euismod tellus, eget ornare neque eros sodales sapien.
                </p>
                <div class="row">
                    <div class="faq">
                        <AccordionItem v-for="(faq, index) in faqs" :key="faq" :info="faq" :badgeNumber="index + 1" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import Badge from './accordion/Badge.vue';
import AccordionItem from './accordion/AccordionItem.vue';

export default {
    name: 'FaqSection',
    components: {
        Badge,
        AccordionItem 
    },
    data: () => ({
        faqs: [
            {
                question: 'Bilimsellik Ekibi',
                answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent non metus eget sapien congue vulputate. Cras pulvinar ligula sem, ac dictum dolor mattis a. Aenean vel posuere nunc. Proin molestie turpis at mauris accumsan, eu hendrerit massa scelerisque.'
            },
            {
                question: 'Halkla İlişkiler Ekibi',
                answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent non metus eget sapien congue vulputate. Cras pulvinar ligula sem, ac dictum dolor mattis a. Aenean vel posuere nunc. Proin molestie turpis at mauris accumsan, eu hendrerit massa scelerisque.'
            },
            {
                question: 'Sosyal Ekip',
                answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent non metus eget sapien congue vulputate. Cras pulvinar ligula sem, ac dictum dolor mattis a. Aenean vel posuere nunc. Proin molestie turpis at mauris accumsan, eu hendrerit massa scelerisque.'
            },
            {
                question: 'Maliye Ekibi',
                answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent non metus eget sapien congue vulputate. Cras pulvinar ligula sem, ac dictum dolor mattis a. Aenean vel posuere nunc. Proin molestie turpis at mauris accumsan, eu hendrerit massa scelerisque.'
            },
            {
                question: 'Bilişim Ekibi',
                answer: 'elifimi çok seviyorum'
            },
        ]
    })
}
</script>

<style scoped>
.faq-section {
    font-weight: bold;
    text-align: left;
}

.faq-warp {
    width: 100%;
    box-sizing: border-box;
    padding: 2vh 0; 
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
    margin-bottom: 2.5rem; 
    color: #d1d1d1;
    text-align: justify;
    font-weight: normal; 
}

.faq-section .row {
    width: 100%;
    margin: 0;
}

.faq {
    background: transparent;
    box-shadow: none;
    border-radius: 4px;
    width: 100%;
    flex: 0 0 100%; 
    max-width: 100%;
}

@media (max-width: 1000px) {
    .faq {
        margin-bottom: 30px;
    }
    .faq-warp {
        padding: 2vh 15px; 
    }
}

@media (max-width: 768px) {
    .section-title {
        font-size: 2.5rem;
        text-align: center;
    }
    
    .section-description {
        text-align: center; 
    }
}
</style>