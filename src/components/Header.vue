<script setup lang="ts"></script>
<template>
  <header class="header">
    <nav>
      <a href="/"
        ><img
          src="https://upload.wikimedia.org/wikipedia/fr/4/47/The-Owl-House-logo.png"
          alt="The Owl House Logo"
          class="header-logo"
      /></a>
      <a href="/"
        ><h1><span class="extra">Lumity</span>Translate</h1></a
      >
    </nav>
    <p class="header-text">
      translate English into Luz's emoji language from The Owl House and back
    </p>
  </header>
</template>
<style scoped lang="less">
@import "../style";
.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: @padding-md @padding-lg;
  gap: @gap-lg;
  nav {
    display: flex;
    align-items: center;
    gap: @gap-md;
    a {
      text-decoration: none;
    }
    h1 {
      font-weight: 400;
      line-height: 1;
      display: flex;
      align-items: center;
      gap: @gap-xs;
      .extra {
        position: relative;
        padding: @padding-xxs @padding-xs;
        font-weight: bold;
        background: linear-gradient(114deg, #730086 30.11%, #2668ff 78.96%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        &::before {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          background: white;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: @border-radius-sm;
          z-index: -1;
        }
      }
    }
  }
}
.header-text {
  opacity: .7;
}
.header-logo {
  max-height: 5rem;
  width: auto;
}
</style>
