require("openlayers/dist/ol.css");
import { mapState, mapActions, mapMutations } from "vuex";
import toggleBar from "@/components/toggleBar";
import popup from "@/components/popup";
import mynav from "@/components/nav";
import loading from "@/components/loading";
import audioplay from "@/components/audioPlay";
import wx from "weixin-js-sdk";
import { isMobile } from "@/services/Global";
import { testgeojson } from "./testgeojson";
export default {
    components: {
        toggleBar,
        popup,
        mynav,
        audioplay,
        loading
    },
    data() {
        return {
            state: false,

            currentPosition: [],
            map: {
                type: Object,
                default: {}
            },
            lable: null,
            ua: null,
            activeOverlayerMessage: {
                id: "",
                title: "",
                dec: "",
                location: [],
                mode: ""
            },
            loadingShow: false,
            popupShow: false,
            meLable: null,
            marker: null,
            musicPlay: null,
            navShow: false,
            //是否要居中
            setCenterFlag: true,
            layer1: new ol.layer.Tile({
                source: new ol.source.XYZ({
                    //  url: "https://notifysystem.trade/pts/{z}/{y}/{x}.png"
                    url: "https://notifysystem.trade/pts/{z}/{x}-{y}.jpg"

                    // url: 'http://localhost:9096/pts/{z}/{x}-{y}.jpg'
                    // url: "http://114.115.129.48:8081/static/{z}/{x}-{y}.jpg"
                })
            }),
            /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                              layer2: new ol.layer.Tile({
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                source: new ol.source.XYZ({
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  url: "https://notifysystem.trade/pts_Road/{z}/{x}-{y}.png"
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  // url: 'http://localhost:9096/jnu_Road/{z}/{x}-{y}.jpg'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                })
                                                                                                                                                                                                                                                                                                                                                                                                                                                                              }),*/
            //地图中心点
            center: ol.proj.transform(
                [113.5223325947326, 22.3178767486058],
                "EPSG:4326",
                "EPSG:3857"
            ),
            geolocation: null,
            view: null,
            sightLayer: new ol.layer.Vector({
                source: new ol.source.Vector()
            }),
            overlay: null,
            message: {
                id: "",
                title: "",
                dec: ".",
                location: []
            },

            currentPopid: null,
            geoMessage: "",
            activeIconMessage: {},
            autoplay: false,

            navWord: {
                chiness: ["定位", "所有景点", "兴趣点"],
                english: ["Location", "Sight", "Navigation"]
            },
            geoWord: {
                chiness: [
                    "正在获取定位",
                    "继续浏览",
                    "导航到此",
                    "检测到你不在区域范围内",
                    "无法获取你的地理位置"
                ],
                english: [
                    "Locating",
                    "Go on",
                    "Navigate to here",
                    "You are not in the area",
                    "Can not get your location"
                ]
            }
        };
    },
    created() {
        this.view = new ol.View({
            zoom: 18,
            center: this.center // 地图中心
        });

        this.map = new ol.Map({
            layers: [this.layer1],
            view: this.view,
            controls: [new ol.control.Zoom()]
        });
        this.getlayerMessage().then(data => {
            Object.keys(data).map(item => {
                this.setlayer(data[item]);
            });

            this.layerTogleShow("sight", true);
        });
        this.getPoiLayerMessage().then(data => {
            Object.keys(data).map(item => {
                this.setlayer(data[item]);
            });
        });
        /*  this.getTG_ScenicSpot().then(data => {
                                                                                                              this.setlayer(data, true);
                                                                                                          });*/
    },
    mounted() {
        this.musicPlay = document.getElementById("music");
        var that = this;
        // 点击弹框事件，原始方式,神奇的setTimeout 之后才可获取到

        setTimeout(() => {
            this.lable = document.querySelectorAll(".lable");
            this.changelanguageMessages();
            for (let i = 0; i < this.lable.length; i++) {
                this.lable[i].addEventListener(
                    "click",
                    function(event) {
                        that.haddleActiveOverlayerMessageById(event.target.id, "click");
                    },
                    true
                );
            }
        }, 10);
        // 获取坐标用
        this.map.on("click", e => {
            e.stopPropagation();
            let coordinate = e.coordinate;
            console.log(coordinate);
            let lc = ol.coordinate.toStringXY(
                ol.proj.transform(coordinate, "EPSG:3857", "EPSG:4326")
            );
            console.log(lc);
        });
        this.creatMeMarker();
        this.map.setTarget(this.$refs.map.id);
        this.geolocation = new ol.Geolocation({
            projection: "EPSG:3857",
            trackingOptions: {
                maximumAge: 10000,
                enableHighAccuracy: true,
                timeout: 600000
            }
        });

        //  this.geofunction();
        //
        //true
        /*先放出来测试*/
        // this.playByAp("ap2");

        /* var timer = setInterval(() => {
                                 this.locateByIP()
                                     .then(data => {
                                         if (this.activeAp == data) {
                                             return;
                                         } else {
                                             this.activeAp = data;

                                             this.playByAp(data);
                                         }
                                     })
                                     .catch(e => {
                                         console.log(e);
                                         // clearInterval(timer);
                                     });
                             }, 1000);*/
        /* if (this.auto) {
                                 // console.log(this.activeAp)
                                 alert(this.activeAp)
                                     // this.playByAp(this.activeAp);
                             }*/

        if (this.auto) {
            this.playByAp(this.activeAp);
        }

        this.createPopupOverlay();
        testgeojson(ol, this.map);
    },
    computed: mapState([
        "auto",
        "activeAp",
        "languageMessages",
        "languagemode",
        "geoErr",
        "notHere",
        "audioShow",
        "allShow",
        "activeLanguage",

        "playing",
        "locating",
        "audio",
        "flesh"
    ]),

    methods: {
        setSightLayer() {
            this.getlayerMessage("sight").then(data => {
                this.setlayer(data);
                this.layerTogleShow("sight", true);
            });
        },
        createPopupOverlay() {
            this.overlay = new ol.Overlay({
                element: this.$refs.popupElement,
                autoPan: true,
                autoPanAnimation: {
                    duration: 250
                }
            });
            this.map.addOverlay(this.overlay);
        },
        isWeiXin() {
            var ua = window.navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == "micromessenger") {
                return true;
            } else {
                return false;
            }
        },
        configJssdk() {
            var param = {
                debug: true,
                jsApiList: ["playVoice", "pauseVoice", "stopVoice", "onVoicePlayEnd"],
                url: "https://www.notifysystem.trade"
            };
            var that = this;
            this.$http
                .get("https://notifysystem.trade:3001/backend/JsConfig", {
                    param: param
                })
                .then(
                    response => {
                        wx.config(response.data);
                        wx.ready(() => {
                            // alert('wx.ready')
                            that.play();
                        });
                        wx.error(function(err) {
                            // alert('wx.error')
                            // alert(JSON.stringify(err))
                            console.log("wx err", err);
                            // 可以更新签名
                        });
                    },
                    err => {
                        // alert(JSON.stringify(err))
                    }
                );
        },
        changelanguageMessages() {
            /*动态改变标签语言start*/
            let lableArr = [...this.lable];

            let lableWithoutSightArr = lableArr.forEach(item => {
                let type = item.className.substring(6);
                if (type !== "sight") {
                    this.getIconLanByType(type)
                        .then(data => {
                            item.innerHTML = data;
                        })
                        .catch(e => {
                            console.log(e);
                        });
                } else {
                    this.getSightIconLanByID(item.id)
                        .then(data => {
                            item.innerHTML = data;
                        })
                        .catch(e => {
                            console.log(e);
                        });
                }
            });
            /*动态改变标签语言end*/
            // this.changLanguage(index);
        },
        langeChange(index) {
            this.changLanguage(index);
            this.changelanguageMessages();
        },
        goOn() {
            this.state = false;
        },
        navigate() {
            this.state = false;

            this.$router.push({
                name: "baidumap"
            });
        },
        creatMeMarker() {
            this.meLable = new ol.Overlay({
                position: ol.proj.fromLonLat([113.26, 23.173]),
                element: document.getElementById("meLable")
            });
            this.map.addOverlay(this.meLable);
            this.marker = new ol.Overlay({
                positioning: "center-center",
                element: document.getElementById("geolocation_marker"),
                stopEvent: false
            });
            this.map.addOverlay(this.marker);
        },
        geofunction() {
            var that = this;

            this.geolocation.setTracking(true); // Start position tracking
            this.geolocation.on("change", function() {
                var position = that.geolocation.getPosition();

                var accuracy = that.geolocation.getAccuracy();

                var pos = ol.proj.toLonLat(position, "EPSG:3857");

                let posme = ol.proj.transform(pos, "EPSG:4326", "EPSG:3857");

                that.currentPosition = pos;
                //数据保存到state
                that.changeCurrentPosition(pos);

                //暂时放出来
                // that.view.setCenter(posme);
                that.marker.setPosition(posme);
            });
        },
        playByAp(ap) {
            var boolen = isMobile();

            this.dispatchPlayById(this, ap, boolen);
        },
        close($event) {
            this.overlay.setPosition(undefined);
            this.popupShow = false;

            return false;
        },
        dispatchPlayById(that, id, ua) {
            that.haddleActiveOverlayerMessageById(id, "auto");
            // console.log(id);
            //一定要先pause再切换src
            //alert('dispatchPlayById'+id)

            this.pause();
            this.audioShowContral(true);
            this.$store
                .dispatch({
                    type: "play",
                    id: id
                })
                .then(() => {
                    var is = that.isWeiXin();
                    if (ua && is) {
                        console.log("jssdk");

                        that.configJssdk();
                    } else {
                        console.log("h5");
                        that.play();
                    }
                });
        },

        haddleActiveOverlayerMessageById(id, mode) {
            this.audioShowContral(false);
            this.popupShow = false;
            var that = this;
            this.getSightMessageById(id)
                .then(function(data) {
                    //Object.assign只是浅拷贝
                    var wgs84Sphere = new ol.Sphere(6378137);
                    that.activeOverlayerMessage = Object.assign({
                            mode: mode
                        },
                        data
                    );
                    // var json = Object.assign({ mode: mode }, data);

                    that.currentPopid = id;
                    //console.log(that.activeOverlayerMessage);
                    // that.changeActiveOverlayerMessage(json);

                    //防止修改原本对象 采用深拷贝
                    let tempdata = JSON.parse(JSON.stringify(data));
                    tempdata.location[1] = tempdata.location[1] - 0.000775;
                    let posme = ol.proj.transform(
                        tempdata.location,
                        "EPSG:4326",
                        "EPSG:3857"
                    );
                    that.view.setCenter(posme);
                    that.view.setZoom(18);
                    that.popupShow = true;
                })
                .catch(e => {
                    alert(e);
                });
        },
        setlayer(data, visibility = false) {
            if (data) {
                // console.log(this.styles)
                for (let i = 0, len = data.length; i < len; i++) {
                    if (data[i].location) {
                        var pos = ol.proj.transform(
                            data[i].location,
                            "EPSG:4326",
                            "EPSG:3857"
                        );
                        var lable = document.createElement("span");
                        // this.holder.appendChild(lable)
                        var t = document.createTextNode(data[i].title);
                        lable.appendChild(t);
                        lable.setAttribute("class", "lable " + data[i].type);
                        lable.id = data[i].id;
                        var Lable = new ol.Overlay({
                            position: data[i].location,
                            element: lable
                        });
                        this.map.addOverlay(Lable);
                        Lable.setPosition(pos);
                    }
                }

                this.layerTogleShow(data[0].type, visibility);
            }
        },

        layerTogleShow(type, boolen) {
            // layer.setVisible(boolen)
            var lable = document.querySelectorAll("." + type);

            var state = boolen ? "visible" : "hidden";
            for (let i = 0, len = lable.length; i < len; i++) {
                lable[i].style.visibility = state;
            }
        },

        toggleNav() {
            this.navShow = !this.navShow;
        },
        navChange($event) {
            this.layerTogleShow($event.type, $event.state);
        },

        ...mapActions([
            "getSightMessageById",
            "getlayerMessage",
            "changeSightMessageByLangeageMode",
            "getIconLanByType",
            "getSightIconLanByID",
            "locateByIP",
            "getPoiLayerMessage",
            "getTG_ScenicSpot"
        ]),
        ...mapMutations([
            "audioShowContral",
            "play",
            "pause",
            "simulate",
            "changeCurrentPosition",
            "changeFlesh",
            "changeActiveOverlayerMessage",
            "changLanguage",
            "changeAuto"
        ])
    },
    watch: {
        notHere(curVal, oldVal) {
            this.state = this.notHere || this.geoErr;
        },
        geoErr(curVal, oldVal) {
            this.state = this.notHere || this.geoErr;
        },
        allShow(curVal, oldVal) {
            this.allShow = curVal;
        },
        locating(curVal, oldVal) {
            // this.configJssdk()

            var boolen = isMobile();
            this.playByAp(this.currentPosition);
            // this.geofunction();
        },
        activeAp(curVal, oldVal) {
            console.log(curVal);
            if (this.auto) {
                this.playByAp(this.activeAp);
            }
        },
        auto(curVal, oldVal) {
            if (curVal) {
                this.playByAp(this.activeAp);
            }
        }
    },
    destroyed() {
        this.audioShowContral(false);
    }
};