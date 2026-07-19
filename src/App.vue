<template>
	<div id="app">
		<Header />
		<Hero />
		<About />
		<Showcase />
		<Footer />
	</div>
</template>

<script setup>
import Header from './components/Header.vue'
import Hero from './components/Hero.vue'
import About from './components/About.vue'
import Showcase from './components/Showcase.vue'
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
}
</style>