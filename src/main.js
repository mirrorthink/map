//全局样式
import "./assets/iconfont/iconfont.css";
import "./style/common.css";
//TODO改为 axios
import VueResource from "vue-resource";
import Vue from "vue";
import App from "./App";
import store from "./store";
import VueRouter from "vue-router";
import routes from "./router";
import ViewSwitcher from "./services/ViewSwitcher";
//第三方组件
import VueAwesomeSwiper from "vue-awesome-swiper";
import VueLazyload from "vue-lazyload";
import vWow from "v-wow";
ViewSwitcher.use([ViewSwitcher]);

Vue.use(VueAwesomeSwiper);
Vue.use(VueRouter);
Vue.use(vWow);
//TODO改为 axios
Vue.use(VueResource);
Vue.use(VueLazyload, {
    error: "/static/img/error.svg",
    loading: "/static/img/loading.svg",
    listenEvents: ["scroll", "mousewheel"],
    attempt: 1
});
const router = new VueRouter({
    routes
});
//TODO优化路由动画
router.beforeEach((to, from, next) => {
    setTimeout(() => {
        // let transitions = !from.name ? '' : ((from.name == 'home') || (from.name == 'sightList' && to.name != 'home' ) ) ? 'slide-right' : '';
        let transitions =
            from.name == "home" ?
            "slide-right" :
            to.name == "home" && from.name ? "slide-left" : "";
        router.app.transition = transitions;
        next();
        Vue.prototype.direction = "forward";
    }, 0);
});

/* eslint-disable no-new */
new Vue({
    //TODO
    el: "#app",
    router,
    store,
    template: "<App/>",
    components: { App }
});