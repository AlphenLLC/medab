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
    display: inline-block;
    width: 24px; 
    height: 24px;
    line-height: 24px;
    border-radius: 50%;
    text-align: center;
    background: #0c4a6e;
    color: #ffffff;
    font-size: 13px;
    margin-right: 15px;
    font-weight: 700; 
    cursor: pointer;
    text-decoration: none !important;
    box-shadow: 0 0 10px rgba(12, 74, 110, 0.5);
}
</style>