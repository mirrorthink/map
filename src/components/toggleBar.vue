<template>
    <section>
        <div class="active">
            <span class="active item showIn" v-on:click="toggleAllshow" v-bind:class="{ voice: name == 'languagemode'}">
                <img :src="Messages.item[Messages.activeIndex].img" alt="">
            </span>
        </div>
        <transition name="fade">
            <div class="all" v-if="allShow" v-bind:class="{ active: allShow }">
                <span class="item" v-for="(message, index) in Messages.item" v-on:click="clickItem(index)" v-bind:class="{ voice: Messages.name == 'languagemode'}">
                    <img :src="message.img" alt="">
                </span>
            </div>
        </transition>
    </section>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
    name: 'toggleBar',
    props: ['Messages','name'],
    data() {
        return {
            allShow: false,
    
        }
    },
    methods: {

        toggleAllshow() {
            var that = this;

            if (this.Messages.item.length > 2) {
                this.allShow = !this.allShow;
                this.changetoggleAllShow()
            } else {
                //自动播放按钮
                  var index = (this.Messages.activeIndex + 1) % 2;
             
           
                    this.$emit('changMode', index )
            

               /* if (this.activeItem.index == 1) {
                    that.locating(true)
                } else {
                   

                }*/
            }
        },
        clickItem(index) {
            var that = this;
            this.toggleAllshow();    
            this.$emit('changMode',index)


        },
        ...mapMutations([
            'changetoggleAllShow', 'play', 'audioShowContral', 'locating', 'pause', 'changMode'
        ]),
        ...mapActions([
             'getlayerMessage','changeSightMessageByLangeageMode'
        ]),
    },
    computed: mapState(['geoErr', 'notHere', 'currentPosition']),

}
</script>


<style scoped lang="less">
section {
    position: relative;
    clear: both;
    z-index: 3;
    span {
        padding: 0.14rem 0.5rem;
        background: #FFF;
        margin-bottom: 1rem;
        width: 2.71rem;
        height: 2.71rem;
        margin-left: 0.86rem;
        img {
            width: 100%;
            height: 100%;
        }
    }
    span.voice {
        padding: 0.5rem;
    }
    div.active {
        span {
            float: right;
        }
    }
    .all {
        position: absolute;
        top: 0px;
        right: 0px;

        span {
            display: inline-block;
        }
        overflow: hidden;
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: all .2s ease-in
}

.fade-enter,
.fade-leave-active {
    min-width: 28rem;
    transform: translateX(100%)
}
</style>