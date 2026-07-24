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
            <div class="collapse" v-if="expanded">
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
    props: {
        info: {
            type: Object,
            required: true
        },
        badgeNumber: Number
    },
    components: {
        Badge
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
.funkyCollapse-active {
    transition: all 0.5s cubic-bezier(0.625, 0.225, 0.100, 0.890);
}

.funkyCollapse-enter-from,
.funkyCollapse-leave-to {
    opacity: 0;
}

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
}

.faq-title h1 {
    padding: 5px 0px;
    border-bottom: 4px solid #0ea5e9;
    width: 8%;
}

.faq-title p {
    padding: 0 190px;
}

.card {
    border: none;
    background: #111111;
    border-bottom: 1px solid #222222;
    margin-bottom: 10px;
    border-radius: 8px;
}

.faq .card .card-header {
    padding: 0px;
    border: none;
    background: transparent;
    border-radius: 8px;
    -webkit-transition: all 0.3s ease 0s;
    -moz-transition: all 0.3s ease 0s;
    -o-transition: all 0.3s ease 0s;
    transition: all 0.3s ease 0s;
}

.card .card-header:hover {
    background: rgba(12, 74, 110, 0.4); 
    padding-left: 10px;
}


.card .card-header .faq-title {
    text-align: left;
    padding: 0px;
    padding-left: 30px;
    padding-right: 30px;
    font-weight: 500;
    font-size: 16px;
    letter-spacing: 1px;
    color: #e2e8f0;
    text-decoration: none !important;
    -webkit-transition: all 0.3s ease 0s;
    -moz-transition: all 0.3s ease 0s;
    -o-transition: all 0.3s ease 0s;
    transition: all 0.3s ease 0s;
    cursor: pointer;
    padding-top: 25px;
    padding-bottom: 25px;
    margin: 0;
}

.card .card-body {
    padding: 20px 30px 30px 35px;
    font-weight: 400;
    font-size: 15px;
    color: #a0aec0;
    line-height: 28px;
    letter-spacing: 1px;
    border-top: 1px solid #222222;
    word-spacing: normal;
    text-align: justify;
}

.collapse {
    overflow: hidden
}

@media (max-width: 1000px) {
    .card .card-header .faq-title {
        line-height: 26px;
    }
}
</style>