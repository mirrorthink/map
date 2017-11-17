// 全局指令配置
import Vue from "vue";

export const Direct = {
    data: [{
            name: "title",
            update: (el, binding) => {
                document.title = binding.value;
                el.remove();
            }
        },
        {
            name: "direct",
            update: (el, binding, vnode, oldVnode) => {
                let t = binding.value;
                // t.$cookie.set('mobile', '17000221762', {path: '/', expires: '1M'})
                // t.$cookie.set('token', 'WUksks883KXK', {path: '/', expires: '1M'})
                el.addEventListener("click", () => {
                    if (!t.$cookie.get("token")) {
                        t.$router.push({ name: "login" });
                    }
                });
            }
        },
        {
            name: "cet",
            update: (el, binding) => {
                let w = document.body.offsetWidth / 2 - 120 / 2;
                el.style.left = w + "px";
            }
        },
        /*  {
                name: "wow",
                update: (el, binding) => {
                    let animateCofig = binding.value;
            
                    el.style.visibility = "hidden";
                    el.style["animation-name"] = "none";
                    let offsetTop = function(element) {
                        var top;
                        while (element.offsetTop === void 0) {
                            element = element.parentNode;
                        }
                        top = element.offsetTop;
                        while ((element = element.offsetParent)) {
                            top += element.offsetTop;
                        }
                        return top;
                    };
                    let isVisible = function(el) {
                        var top, viewBottom, viewTop;
                        viewTop = window.pageYOffset;
                        viewBottom = viewTop + window.innerHeight;
                        top = offsetTop(el);
                        return top <= viewBottom;
                    };
                    let isShow=function(el,animateCofig){
                        console.log(1)         
                        if (isVisible(el)) {
                            el.style.visibility = "visible";
                            for(name in animateCofig){
                                el.style[name] = animateCofig[name];
                            }
                            window.removeEventListener("scroll", fandelScroll);
                            
                        }
                    }
                    var lastClick = Date.now()
                    let fandelScroll=function(){
                        var rate = 100;      
                           if (Date.now() - lastClick >= rate) {
                               isShow(el,animateCofig);
                               console.log('hi')
                               lastClick = Date.now();
                           }  
                    }

                    setTimeout(function() {
                        isShow(el,animateCofig)
                    }, 1);
                    var scrolling=false
                 

                    window.addEventListener("scroll", fandelScroll);
                }
            },*/
        {
            name: "direction",
            update: el => {
                el.addEventListener("click", () => {
                    // console.log(this)
                });
            }
        },
        {
            name: "substr",
            update: (el, binding) => {
                var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
                var isChiness = reg.test(el.innerHTML);
                if (el.innerHTML.length > binding.value) {
                    if (isChiness) {
                        console.log("China");
                        el.innerHTML = el.innerHTML.substring(0, binding.value) + "...";
                    } else {
                        console.log("noChina");
                        el.innerHTML = el.innerHTML.substring(0, binding.value * 2) + "...";
                    }
                } else {
                    return;
                }
            }
        }
    ],
    use: (arr, v) => {
        for (var i in arr.data) {
            v.directive(arr.data[i].name, arr.data[i].update);
        }
    }
};

export default Direct.use(Direct, Vue);