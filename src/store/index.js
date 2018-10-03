import Vue from "vue";
import Vuex from "vuex";
import mutations from "./mutations";
import actions from "./action";
import getters from "./getters";

Vue.use(Vuex);

const state = {
    notHere: null,
    geoErr: null,
    popupShow: false,
    isInpanoramic: false,
    geoMessage: "",
    allShow: false,
    activeLanguage: "chiness",
    activeAp: "",
    auto: true,
    languageMessages: {
        item: [
            { id: "chiness", img: "/static/img/map_language_guo@2x.png" },
            { id: "english", img: "/static/img/map_language_en@2x.png" },
            { id: "chiness", img: "/static/img/map_language_Thai@2x.png" },
            { id: "chiness", img: "/static/img/map_language_yue@2x.png" },
            { id: "chiness", img: "/static/img/language_Sri Lanka@2x.png" }
        ],

        activeIndex: 0
    },
    activeOverlayerMessage: {
        id: "",
        title: "",
        dec: "",
        location: [],
        mode: ""
    },
    currentPosition: [],
    languagemode: {
        item: [
            { id: "off", img: "/static/img/map_broadcast_off@2x.png" },
            { id: "on", img: "/static/img/map_broadcast_on@2x.png" }
        ],

        activeIndex: 1
    },
    imgs: [
        { url: "/static/img/img1.jpg" },
        { url: "/static/img/img3.jpg" },
        { url: "/static/img/img4.jpg" }
    ],

    playing: false,

    audio: {
        audioUrl: "/static/mp3/slient.mp3",
        title: "无声",
        id: "slient"
    },
    audioShow: false,
    simulate: false,
    loadingShow: false,

    locating: false,
    flesh: true
};

export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters
});
