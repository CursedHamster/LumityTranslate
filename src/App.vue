<script setup lang="ts">
import Header from "./components/Header.vue";
import Home from "./components/Home.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <Header />
  <Home />
  <Footer />
  <div class="background-container">
    <img src="/background/background-1.svg" alt="" />
    <img src="/background/background-2.svg" alt="" />
    <img src="/background/background-3.svg" alt="" />
    <img src="/background/background-4.svg" alt="" />
    <img src="/background/background-5.svg" alt="" />
    <img src="/background/background-6.svg" alt="" />
    <img src="/background/background-7.svg" alt="" />
    <img src="/background/background-8.svg" alt="" />
    <img src="/background/background-9.svg" alt="" />
    <img src="/background/background-10.svg" alt="" />
    <img src="/background/background-11.svg" alt="" />
    <img src="/background/background-12.svg" alt="" />
    <img src="/background/background-13.svg" alt="" />
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
  background: radial-gradient(
    50% 50% at 50% 50%,
    #730086 0%,
    rgba(191, 160, 255, 0) 100%,
    rgba(191, 160, 255, 0) 100%
  );
  mix-blend-mode: hard-light;
}
</style>
