import { createApp } from "vue";
import "./style.css";
import "./assets/fonts.css";
import AppIcon from "./components/AppIcon.vue";
import router from "./router.js";
import App from "./App.vue";

const app = createApp(App);

app.component("AppIcon", AppIcon);
app.use(router);
app.mount("#app");
