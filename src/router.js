import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import About from './views/Hakkimizda.vue'
import Orgs from './views/Etkinlikler.vue'
import Team from './views/Ekibimiz.vue'
import EventDetail from './views/EventDetail.vue'
import Gallery from './views/Galeri.vue'
import Dergi from './views/DergiDemo.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/hakkimizda',
    name: 'About',
    component: About
  },
  {
    path: '/etkinlikler',
    name: 'Orgs',
    component: Orgs
  },
  {
    path: '/ekibimiz',
    name: 'Team',
    component: Team
  },
  {
    path: '/etkinlik/:id',
    name: 'EventDetail',
    component: EventDetail
  },
  {
    path: '/galeri',
    name: 'Gallery',
    component: Gallery
  },
  {
    path: '/dergi',
    name: 'Dergi',
    component: Dergi
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router