<template>
    <div class="card">
        <div class="card-header" @click="toggle">
            <div class="card-container">
                <h5 class="faq-title">
                    <Badge v-if="badgeNumber" :number="badgeNumber" />{{ info.question }}
                </h5>
            </div>
        </div>
        <transition name="fade">
            <div v-if="expanded" class="collapse">
                <div class="card-body">
                    <p>{{ info.answer }}</p>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import Badge from './Badge.vue';

export default {
    name: 'AccordionItem',
    components: {
        Badge
    },
    props: {
        info: {
            type: Object,
            required: true
        },
        badgeNumber: Number
    },
    data: () => ({
        expanded: false
    }),
    methods: {
        toggle() {
            this.expanded = !this.expanded;
        }
    }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: all 0.2s cubic-bezier(0.625, 0.225, 0.100, 0.890);
    overflow: hidden;
}

.fade-enter-from,
.fade-leave-to {
    transform: translateY(-100%);
    opacity: 0;
}

.card-container {
    margin-bottom: 0;
    width: 100%;
}

.card {
    border: none;
    background: #111111;
    border: 1px solid #222222;
    margin-bottom: 10px;
    border-radius: 8px;
    box-sizing: border-box;
}

.faq .card .card-header {
    padding: 0px;
    border: none;
    background: transparent;
    border-radius: 8px;
    transition: all 0.25s ease;
    cursor: pointer;
}

.card .card-header:hover {
    background: rgba(3, 105, 161, 0.35); 
    padding-left: 6px;
}

.card .card-header .faq-title {
    text-align: left;
    display: flex;
    align-items: center;
    padding: 22px 28px;
    font-weight: 500;
    font-size: 16px;
    letter-spacing: 0.5px;
    color: #e2e8f0;
    text-decoration: none !important;
    margin: 0;
    box-sizing: border-box;
}

/* Yanıt gövdesi justify yapıldı */
.card .card-body {
    padding: 20px 28px 26px 28px;
    font-weight: 400;
    font-size: 15px;
    color: #a0aec0;
    line-height: 27px;
    letter-spacing: 0.4px;
    border-top: 1px solid #222222;
    text-align: justify;
    text-justify: inter-word;
    box-sizing: border-box;
}

.card .card-body p {
    margin: 0;
}

.collapse {
    overflow: hidden;
}

@media (max-width: 768px) {
    .card .card-header:hover {
        padding-left: 0px;
    }

    .card .card-header .faq-title {
        padding: 16px 18px;
        font-size: 15px;
        line-height: 24px;
    }

    .card .card-body {
        padding: 16px 18px 20px 18px;
        font-size: 14px;
        line-height: 24px;
        text-align: justify;
        text-justify: inter-word;
    }
}
</style>