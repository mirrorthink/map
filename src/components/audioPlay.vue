<template>
  <div id="play-bar">
    <audio id="music" v-on:ended="onclose" ref="audio" v-bind:src="audio.audioUrl"> </audio>
    <div class="play-bar-image-container">
      <img class="play-bar-button" v-bind:src="playing?iconPause:iconPlay" @touchend="tapButton" @click="tapButton">
    </div>
    <div class="play-bar-text">
      <h5> {{audio.title}}</h5>
      <p> {{currentTime}}/{{duration}}</p>
    </div>
    <div class="loading">
      <img src="/static/img/loading.gif" v-if="loading" />
    </div>
    <div class="duration">
      <span v-bind:style="{left:indicatorPosition+'%'}"></span>
    </div>
    <div class="close" @touchend.prevent.stop="onclose" v-on:click="onclose">
      <img src='/static/img/vioce_close@3x.png' />
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { formatTime } from "../services/Global";

export default {
  name: "audioplay",
  components: {},
  props: {
    auto: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      iconPlay: "/static/img/voice_play@3x.png",
      iconPause: "/static/img/voice_pause@3x.png",
      coverImgUrl: "/static/img/icon-music.png",
      dataUrl: "/static/test.mp3",
      duration: "00:00",
      currentTime: "00:00",
      indicatorPosition: 0,
      loading: true
    };
  },

  computed: mapState(["playing", "audio", "simulate"]),

  methods: {
    tapButton(boolean) {
      event && event.preventDefault();
      if (this.playing) {
        this.pause();
      } else {
        this.play();
      }
    },
    playContinue() {},
    onclose() {
      this.$refs.audio.pause();
      this.audioShowContral(false);
    },

    ...mapMutations(["play", "pause", "changeLoadingShow", "audioShowContral"])
  },
  mounted() {
    this.$refs.audio.addEventListener("loadstart", () => {});
    this.$refs.audio.addEventListener("loadedmetadata", () => {});
    this.$refs.audio.addEventListener("canplaythrough", () => {
      this.loading = false;
      if (this.$refs.audio) {
        this.duration = formatTime(this.$refs.audio.duration);
      }

      // audio.play()
    });
    this.$refs.audio.addEventListener("timeupdate", () => {
      if (this.$refs.audio) {
        this.currentTime = formatTime(this.$refs.audio.currentTime);
        this.indicatorPosition =
          this.$refs.audio.currentTime / this.$refs.audio.duration * 100;
      }
    });
  },
  watch: {
    playing: function(val) {
      if (val) {
        var playPromise = this.$refs.audio.play();
        if (playPromise !== undefined) {
          playPromise.then(function() {}).catch(function(error) {
            alert(error);
          });
        }
      } else {
        this.$refs.audio.pause();
      }
    },
    audio: function(val) {
      if (val) {
        this.$refs.audio.pause();
        this.$refs.audio.src = null;

        this.$refs.audio.src = val.audioUrl;
        this.$refs.audio.load();

        console.log(this.$refs.audio.src);
      }
    }
  }
};
</script>


<style scoped lang="less">
#play-bar {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 3.125rem;
  background: #fff;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  z-index: 2;
  .play-bar-image-container {
    width: 2.29rem;
    height: 2.29rem;
    margin-left: 1.14rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
}

.play-bar-text {
  padding-left: 1rem;
  cursor: pointer; // margin-right: 2rem;
  h5 {
    font-size: 0.86rem;
    text-align: left;
    font-weight: normal;
    margin-bottom: 0.3rem;
  }
  p {
    font-size: 0.71rem;
  }
}

.loading {
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 40%;
    height: 40%;
  }
}

.duration {
  flex-grow: 1;
  border-bottom: 1px solid #ccc;
  margin-right: 2.43rem;
  position: relative;
  span {
    position: absolute;
    top: -0.465rem;
    display: inline-block;
    width: 0.93rem;
    height: 0.93rem;
    border-radius: 50%;
    background: #927028;
  }
}

.close {
  width: 1.71rem;
  height: 1.71rem;

  margin-right: 0.86rem;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
