<script setup lang="ts">
import { onMounted } from "vue";
import gsap from "gsap";

const emit = defineEmits(["setLoading"]);

onMounted(() => {
  const loadingTimeline = gsap.timeline({
    onComplete: () => emit("setLoading", false),
  });
  loadingTimeline
    ?.fromTo(
      ".loading-progress-text",
      { innerText: 0 },
      { innerText: 100, snap: { innerText: 10 }, duration: 2 }
    )
    .fromTo(
      ".loading-container",
      { scale: 1, autoAlpha: 1 },
      { scale: 2, autoAlpha: 0, duration: 0.5 },
      ">"
    )
    .fromTo(
      ".loading-object",
      { scale: 1, autoAlpha: 1 },
      {
        scale: 0.9,
        autoAlpha: 0,
        duration: 1,
        repeat: 2,
        yoyo: true,
      },
      0
    )
    .fromTo(
      ".loading-dot",
      { scale: 0, autoAlpha: 0, x: 0, y: 0 },
      {
        scale: 1,
        autoAlpha: 1,
        x: 100,
        y: -100,
        repeat: 2,
        duration: 1,
        yoyo: true,
      },
      0
    );
});
</script>
<template>
  <div class="loading-container">
    <div class="loading-object"></div>
    <div class="loading-dot"></div>
    <div class="loading-progress-container">
      <span class="loading-text">Loading</span>
      <div class="loading-progress">
        <span class="loading-progress-text">0</span>%
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
@import "../style.less";

.loading-container {
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: @background;
  z-index: 1000;
}

.loading-object {
  position: absolute;
  width: 10em;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  aspect-ratio: 1/1;
  border-radius: 50%;
  border: 0.3em solid @text;
  box-shadow: 0 0 2em 0.5em rgba(226, 142, 237, 0.189);
}

.loading-dot {
  position: absolute;
  width: 2em;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  aspect-ratio: 1/1;
  border-radius: 50%;
  background: rgb(255, 220, 131);
}

.loading-progress-container {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: @padding-lg;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 3em;
  text-transform: uppercase;
  font-weight: bold;
  gap: @gap-md;
}

@media screen and (max-width: @screen-lg) {
  .loading-progress-container {
    padding: @padding-md;
  }
}

@media screen and (max-width: @screen-sm) {
  .loading-progress-container {
    padding: @padding-sm;
    gap: @gap-sm;
    font-size: 2em;
  }
}
</style>
