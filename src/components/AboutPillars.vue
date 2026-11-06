<template>
    <section class="teams-section">
        <div class="container">
            
            <div class="baslik-kapsayici">
                <h2 class="section-title">EKİPLER</h2>
                <p class="section-description">
                    MedAB'ın çalışma alanları; akademik ve bilimsel faaliyetlerden mesleki beceri eğitimlerine, multidisipliner çalışmalardan sosyal sorumluluk ve öğrenci etkileşimine uzanmaktadır.
                </p>
            </div>

            <div class="row">
                <div class="faq">
                    <AccordionItem 
                        v-for="(faq, index) in faqs" 
                        :key="index" 
                        :info="faq" 
                        :badge-number="index + 1" 
                    />
                </div>
            </div>

        </div>
    </section>
</template>

<script>
import Badge from './accordion/Badge.vue';
import AccordionItem from './accordion/AccordionItem.vue';

export default {
    name: 'AboutPillars',
    components: {
        Badge,
        AccordionItem 
    },
    data: () => ({
        faqs: [
            {
                question: 'Bilimsellik Ekibi',
                answer: "MedAB'ın akademik ve bilimsel çalışmalarının merkezinde yer alan Bilimsellik Ekibi; öğrencilerin bilimsel düşünme, araştırma ve üretme süreçlerine aktif olarak katılmalarını destekler. Bilimsel etkinlik, konferans ve seminerlerin içeriklerini hazırlar, Perspective için bilimsel ve akademik içerikler geliştirir."
            },
            {
                question: 'Halkla İlişkiler Ekibi',
                answer: "MedAB'ın fakülte içerisindeki ve dışındaki iletişim süreçlerini yürütür; kulübümüzün farklı kişi, kurum ve topluluklarla olan ilişkilerinin geliştirilmesine katkı sağlar. Fakülte akademik kadrosuyla ve diğer topluluklarla ortak çalışma ve koordinasyonu yürütür."
            },
            {
                question: 'Sosyal Ekip',
                answer: "Öğrencilerin fakülte yaşamına aktif katılımını ve birbirleriyle olan iletişimlerini güçlendirmeye yönelik çalışmalar yürütür. Tanışma etkinlikleri, sosyal organizasyonlar, atölyeler ve fakülte aidiyetini artıracak faaliyetler planlar."
            },
            {
                question: 'Maliye Ekibi',
                answer: "MedAB'ın faaliyetlerinin sürdürülebilir ve düzenli bir şekilde yürütülmesini sağlayan mali süreçleri yönetir. Kulübün bütçe planlamasını yapar, gelir-gider takibini yürütür ve etkinliklerin finansal organizasyonunu planlar."
            },
            {
                question: 'MedAB Commonworks',
                answer: "MedAB'ın dijital altyapısını ve teknolojik süreçlerini yönetir. İnternet sayfasının geliştirilmesini ve güncel tutulmasını sağlar, kulübün dijital platformlarını yönetir ve bilgiye erişimi teknolojiyle güçlendirir."
            }
        ]
    })
}
</script>

<style scoped>
.teams-section {
    background-color: #000000;
    text-align: left;
    padding: 30px 0 6rem 0;
}

.container {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 0 1rem;
    box-sizing: border-box;
}

.baslik-kapsayici {
    position: relative;
    text-align: center;
    margin-bottom: 2.2rem;
}

.section-title {
    font-family: 'Archivo Black', sans-serif;
    font-size: clamp(2.4rem, 5vw, 3.2rem); 
    margin-bottom: 0.8rem;
    color: #ffffff;
    letter-spacing: -1.5px;
    line-height: 1;
    text-transform: uppercase;
}

.section-description {
    font-family: 'Montserrat', sans-serif;
    font-size: 1.05rem;
    line-height: 1.65;
    color: #cccccc;
    text-align: justify;
    text-justify: inter-word;
    max-width: 750px;
    margin: 0 auto;
    font-weight: 400;
}

.row {
    width: 100%;
    margin: 0;
}

.faq {
    background: transparent;
    box-shadow: none;
    border-radius: 4px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

@media (max-width: 768px) {
    .teams-section {
        padding: 20px 0 4rem 0;
    }

    .baslik-kapsayici {
        margin-bottom: 1.8rem;
    }

    .section-title {
        font-size: 2.2rem;
        letter-spacing: -1px;
    }

    .section-description {
        font-size: 0.95rem;
        text-align: justify;
        text-justify: inter-word;
        padding: 0 0.5rem;
    }
}
</style>