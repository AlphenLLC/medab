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
    color: #f8bc2b;
    margin: 0;
    padding-bottom: 8px;
    position: relative;
    display: inline-block;
}

h2::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    height: 4px;
    width: 60%;
    background-color: #008cf2;
    border-radius: 2px;
}

@media (max-width: 900px) {
    .label-wrapper {
        text-align: center;
    }
    
    h2::after {
        left: 50%;
        transform: translateX(-50%);
    }
}
</style>