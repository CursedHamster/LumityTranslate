<script setup lang="ts">
import { ref, onBeforeMount, onMounted, onBeforeUnmount } from "vue";
import gsap from "gsap";
import Header from "./components/Header.vue";
import Home from "./components/Home.vue";
import Footer from "./components/Footer.vue";
import Loading from "./components/Loading.vue";

const isLoading = ref(true);
const isMobile = ref(false);

function updateMobile() {
  if (innerWidth <= 640) {
    isMobile.value = true;
  } else {
    isMobile.value = false;
  }
}

function moveBackground(x: number, y: number) {
  gsap.fromTo(".background-1", {}, {});
  gsap.fromTo(".background-1", {}, { y: y * -0.5 });
  gsap.fromTo(".background-2", {}, { y: y * -0.25 });
  gsap.fromTo(".background-3", {}, { x: x });
  gsap.fromTo(".background-4", {}, { x: x * -1.5 });
  gsap.fromTo(".background-5", {}, { x: x * -0.5 });
  gsap.fromTo(".background-11", {}, { x: x, y: y });
  gsap.fromTo(".background-12", {}, { x: x * -0.5, y: y });
}

function onMouseMove(e: MouseEvent) {
  if (!isMobile.value) {
    const depth = 20;
    const moveX = (innerWidth - e.pageX) / depth;
    const moveY = (innerHeight - e.pageY) / depth;
    moveBackground(moveX, moveY);
  }
}

onBeforeMount(() => {
  window.addEventListener("resize", updateMobile);
});

onMounted(() => {
  window.addEventListener("mousemove", onMouseMove);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateMobile);
  window.removeEventListener("mousemove", onMouseMove);
});
</script>

<template>
  <Loading v-if="isLoading" @set-loading="(val) => (isLoading = val)" />
  <Header />
  <Home />
  <Footer />
  <div class="background-container">
    <img v-if="isMobile" src="/background/background-full.svg" alt="" />
    <template v-if="!isMobile">
      <img class="background-1" src="/background/background-1.svg" alt="" />
      <img class="background-2" src="/background/background-2.svg" alt="" />
      <img class="background-3" src="/background/background-3.svg" alt="" />
      <img class="background-4" src="/background/background-4.svg" alt="" />
      <img class="background-5" src="/background/background-5.svg" alt="" />
      <img class="background-6" src="/background/background-6.svg" alt="" />
      <img class="background-7" src="/background/background-7.svg" alt="" />
      <img class="background-8" src="/background/background-8.svg" alt="" />
      <img class="background-9" src="/background/background-9.svg" alt="" />
      <img class="background-10" src="/background/background-10.svg" alt="" />
      <img class="background-11" src="/background/background-12.svg" alt="" />
      <img class="background-12" src="/background/background-13.svg" alt="" />
    </template>
    <div class="full-light"></div>
  </div>
</template>

<style scoped lang="less">
@import "./style.less";
.background-container {
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: @background;
  z-index: -5;
  img,
  .full-light {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}

.full-light {
  mix-blend-mode: hard-light;
  background: radial-gradient(
    50% 50% at 50% 50%,
    #72008683 0%,
    rgba(191, 160, 255, 0) 100%,
    rgba(191, 160, 255, 0) 100%
  );
  // opacity: 0.8;
  // mix-blend-mode: screen;
}
</style>
