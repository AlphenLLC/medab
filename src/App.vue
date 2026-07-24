<template>
    <div id="app">
        <Header />
        <main>
            <router-view />
        </main>
        <Contact />
        <Footer />
    </div>
</template>

<script setup>
import Header from './components/Header.vue'
import Contact from './components/Contact.vue'
import Footer from './components/Footer.vue'
</script>

<style>
html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    overflow-x: hidden;
}

#app {
    width: 100%;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

main {
    flex: 1;
}
</style>