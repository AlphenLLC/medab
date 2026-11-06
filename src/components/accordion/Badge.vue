<template>
    <span class="badge">{{ number }}</span>
</template>

<script>
export default {
    name: 'Badge',
    props: {
        number: Number
    }
}
</script>

<style scoped>
.badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px; 
    height: 24px;
    border-radius: 50%;
    text-align: center;
    /* Koyu lacivert ile açık mavi ortası */
    background: #0369a1;
    color: #ffffff;
    font-size: 12px;
    margin-right: 14px;
    font-weight: 700; 
    cursor: pointer;
    flex-shrink: 0;
    text-decoration: none !important;
    box-shadow: 0 0 10px rgba(3, 105, 161, 0.5);
}
</style>