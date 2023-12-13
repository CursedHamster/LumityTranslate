<script setup lang="ts"></script>
<template>
  <footer class="footer">
    <div class="footer-text">
      <span class="plain-text">website by </span><a href="#">CursedHamster</a>
    </div>
    <div class="footer-text">
      <span class="plain-text">background image by </span><a href="#">upklyak</a>
    </div>
  </footer>
</template>
<style scoped lang="less">
@import "../style.less";
.footer {
  width: 100%;
  padding: @padding-md @padding-lg;
  display: flex;
  justify-content: space-between;
  gap: @gap-lg;
  .plain-text {
    opacity: .7;
  }
  a {
  }
}
</style>
