<script setup lang="ts"></script>
<template>
  <footer class="footer">
    <div class="footer-text">
      <span class="plain-text">website by </span
      ><a href="https://github.com/CursedHamster" target="_blank"
        >CursedHamster</a
      >
    </div>
    <div class="footer-text">
      <span class="plain-text">background image by </span
      ><a
        href="https://www.freepik.com/free-vector/night-landscape-with-mountains-river-road_26796717.htm"
        target="_blank"
        >upklyak</a
      >
    </div>
  </footer>
</template>
<style scoped lang="less">
@import "../style.less";
.footer {
  width: 100%;
  padding: @padding-md @padding-xl;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: @gap-md;
  flex-wrap: wrap;
}

.footer-text {
  text-align: center;
  .plain-text {
    opacity: 0.7;
  }
}

@media screen and (max-width: @screen-2xl) {
  .footer {
    padding: @padding-md @padding-lg;
  }
}

@media screen and (max-width: @screen-lg) {
  .footer {
    padding: @padding-md @padding-md;
  }
}

@media screen and (max-width: @screen-sm) {
  .footer {
    padding: @padding-sm @padding-sm;
    gap: @gap-sm;
  }
  .footer-text {
    text-align: end;
  }
}
</style>
