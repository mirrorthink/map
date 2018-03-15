<template>
  <div>
    <transition :name="$router.app.transition">
      <router-view class="child-view"></router-view>
    </transition> 
    <!--loading组件 -->
    <loading v-if="loading"></loading>
  
  </div>
</template>

<script>
import loading from "./components/loading";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      transitionName: "slide-left",
      //TODO loading 目前是通过state获取是否有这个必要
      loading: false
    };
  },
  components: {
    loading
  },
  mounted() {
    //TODO 初始化监听Ap 是否在此合理？
    this.autoPlay();
  },
  computed: mapState(["loadingShow", "auto"]),
  methods: {
    autoPlay() {
      if (this.auto) {
        if (process.env.NODE_ENV === "development") {
          /**
           * 模拟切换
           */
          /* setTimeout(() => {
            this.changeActiveAp("ap1");
          }, 1);
          setTimeout(() => {
            this.changeActiveAp("ap2");
          }, 1000 * 30);*/
        } else {
          //出错到十次就停止监听，每一秒check一下当前的AP,有变化则通过mutation改变当前的 state.activeAp 合理吗？
          var errCount = 0;
          var timer = setInterval(() => {
            this.locateByIP()
              .then(data => {
                if (this.activeAp == data) {
                  return;
                } else {
                  //
                  this.changeActiveAp(data);
                }
              })
              .catch(e => {
                errCount++;
                if (errCount > 10) {
                  clearInterval(timer);
                }
              });
          }, 1000);
        }
      } else {
        document.querySelector("#music").pause();
        this.audioShowContral(false);
      }
    },
    ...mapActions(["locateByIP"]),
    ...mapMutations(["changeActiveAp", "audioShowContral"])
  },
  watch: {
    $route(to, from) {
      const toDepth = to.path;
      const fromDepth = from.path;
      this.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
    },
    loadingShow(curVal, oldVal) {
      this.loading = curVal;
    }
    //是否需要在这监听auto
    /*
    auto(curVal, oldVal) {
      this.autoPlay();
    }*/
  }
};
</script>


<style lang="less" scoped>
.loadingContainer {
  position: absolute;
}
.slide-left-enter-active,
.slide-right-enter-active {
  transition: all 0.3s linear 0.05s;
}
.slide-right-leave-active,
.slide-left-leave-active {
  transition: all 0.3s linear 0.05s;
}
.slide-right-enter {
  transform: translateX(100%);
}

.slide-left-leave-active {
  transform: translateX(20%);
}
.slide-right-leave-active {
  transform: translateX(-20%);
}
.slide-left-enter {
  transform: translateX(-100%);
}
html {
  margin: 0px;
  padding: 0px;
  position: absolute;
  top: 0px;
  left: opx;
  width: 100%;
}
</style>
