<template>
    <div class="holder">  
        <iframe src="http://system.china-360.cn/vr/vr.php?id=317&from=singlemessage" ref="iframe"></iframe>
      <transition name="upIn">
        <audioplay v-show="audioShow" v-on:close="audioShowContral()"></audioplay>
    </transition>
    <audio src="http://120.76.121.29:3000/users/audio3.mp3" id="bgmusic">
        您的浏览器不支持 audio 标签。
    </audio>
    </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
import audioplay from "@/components/audioPlay";
import { isMobile } from "@/services/Global";
export default {
  name: "panoramic",
  components: {
    audioplay
  },

  data() {
    return {};
  },
  created() {
    this.toggleIsInpanoramic(true);
  },
  mounted() {
    let id = this.$route.params.id;

    this.getIframeSrcById(id).then(url => {
      this.$refs.iframe.src = url;
    });
    console.log(this.activeAp);
    if (this.auto) {
      this.playByAp(this.activeAp);
    }
  },
  computed: mapState(["auto", "activeAp", "audioShow"]),
  destroyed() {
    this.toggleIsInpanoramic(false);
  },

  methods: {
    playByAp(ap) {
      var boolen = isMobile();

      this.dispatchPlayById(this, ap, boolen);
    },
    isWeiXin() {
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
      } else {
        return false;
      }
    },
    dispatchPlayById(that, id, ua) {
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
    ...mapActions(["getIframeSrcById"]),
    ...mapMutations([
      "toggleIsInpanoramic",
      "play",
      "pause",
      "audioShowContral"
    ])
  },
  watch: {
    activeAp(curVal, oldVal) {
      console.log(this.curVal);
      if (this.auto) {
        this.getIframeSrcById(curVal).then(url => {
          this.$refs.iframe.src = url;
        });
        // this.$router.replace({ name: "panoramic", params: { id: curVal } });
        this.playByAp(curVal);
      }
    },
    auto(curVal, oldVal) {
      if (curVal) {
        this.playByAp(this.activeAp);
      }
    }
  }
};
</script>


<style scoped lang="less">
.constainer {
}

.holder {
  height: 100vh;
  width: 100%;
  overflow: hidden;
  position: absolute;
  top: 0px;
  left: 0px;
}

iframe {
  width: 100%;
  height: 100vh;
}
</style>