import { createRouter, createWebHistory } from "vue-router";
import { toTitleCase } from "./utils/formatters.js";
import Home from "./views/Home.vue"; // Statik import (CLS'yi sıfırlar)

const SITE_URL = "https://imumedab.com";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home, // Doğrudan yüklüyoruz
    meta: {
      title: "MedAB | Medeniyet Akademik ve Bilimsel Faaliyetler Kulübü",
      fullTitle: true,
      description:
        "Medeniyet Akademik ve Bilimsel Faaliyetler Kulübü (MedAB) resmi web platformu.",
    },
  },
  {
    path: "/hakkimizda",
    alias: "/hakkimizda/",
    name: "About",
    component: () => import("./views/Hakkimizda.vue"),
    meta: {
      title: "Hakkımızda",
      description: "MedAB'ın misyonu, vizyonu ve akademik çalışma ilkeleri.",
    },
  },
  {
    path: "/etkinlikler",
    alias: "/etkinlikler/",
    name: "Orgs",
    component: () => import("./views/Etkinlikler.vue"),
    meta: {
      title: "Etkinlikler",
      description:
        "MedAB bünyesinde düzenlenen akademik ve bilimsel etkinlikler.",
    },
  },
  {
    path: "/ekibimiz",
    alias: "/ekibimiz/",
    name: "Team",
    component: () => import("./views/Ekibimiz.vue"),
    meta: {
      title: "Ekibimiz",
      description: "MedAB yönetim kurulu ve direktörlük ekipleri.",
    },
  },
  {
    path: "/etkinlik/:id",
    alias: "/etkinlik/:id/",
    name: "EventDetail",
    component: () => import("./views/EventDetail.vue"),
  },
  {
    path: "/galeri",
    alias: "/galeri/",
    name: "Gallery",
    component: () => import("./views/Galeri.vue"),
    meta: {
      title: "Galeri",
      description:
        "MedAB etkinliklerinden ve faaliyetlerinden fotoğraf kareleri.",
    },
  },
  {
    path: "/dergi",
    alias: "/dergi/",
    name: "Dergi",
    component: () => import("./views/DergiDemo.vue"),
    meta: {
      title: "MedAB Perspektif Dergi",
      description: "MedAB Perspektif dergisi sayıları ve bilimsel yayınları.",
    },
  },
  {
    path: "/foyler",
    alias: "/foyler/",
    name: "Foyler",
    component: () => import("./views/DarkSanctuary.vue"),
    meta: {
      title: "MedAB Etkinlik Föyleri",
      description:
        "Etkinliklerimizde kullandığımız ekstra materyaller ve föyler.",
    },
  },
  {
    path: "/foyler/meme-cerrahisi",
    alias: "/foyler/meme-cerrahisi/",
    name: "MemeCerrahisiFoy",
    component: () => import("./foyler/MemeCerrahisiFoy.vue"),
    meta: {
      title: "Meme Cerrahisi Gözlem Föyü",
      description:
        "Ameliyathane Gözlemi: Meme cerrahisi temel kavramları ve gözlem rehberi.",
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  strict: false,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { el: to.hash, behavior: "smooth" };
    }
    return { top: 0, behavior: "smooth" };
  },
});

router.afterEach((to) => {
  if (to.meta.fullTitle) {
    document.title = to.meta.title;
  } else if (to.meta.title) {
    document.title = `${toTitleCase(to.meta.title)} | MedAB`;
  } else if (to.name !== "EventDetail") {
    document.title =
      "MedAB | Medeniyet Akademik ve Bilimsel Faaliyetler Kulübü";
  }

  const cleanPath = to.path === "/" ? "/" : `${to.path.replace(/\/+$/, "")}/`;
  const canonicalUrl = `${SITE_URL}${cleanPath}`;

  let canonicalEl = document.querySelector('link[rel="canonical"]');
  if (!canonicalEl) {
    canonicalEl = document.createElement("link");
    canonicalEl.setAttribute("rel", "canonical");
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute("href", canonicalUrl);

  let descEl = document.querySelector('meta[name="description"]');
  if (!descEl) {
    descEl = document.createElement("meta");
    descEl.setAttribute("name", "description");
    document.head.appendChild(descEl);
  }
  descEl.setAttribute(
    "content",
    to.meta.description ||
      "MedAB - Medeniyet Akademik ve Bilimsel Faaliyetler Kulübü resmi web platformu.",
  );
});

export default router;
