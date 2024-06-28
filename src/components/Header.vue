<script setup lang="ts"></script>
<template>
  <header class="header">
    <nav>
      <a href="/"
        ><img
          src="https://upload.wikimedia.org/wikipedia/fr/4/47/The-Owl-House-logo.png"
          alt="The Owl House Logo"
          title="To the home page of LumityTranslate"
          class="header-logo"
      /></a>
      <a href="/"
        ><h1><span class="extra">Lumity</span>Translate</h1></a
      >
    </nav>
    <p class="header-text">
      translate English into Luz's emoji language from The Owl House and vice
      versa
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
  padding: @padding-md @padding-xl;
  gap: @gap-md;
  nav {
    display: flex;
    align-items: center;
    gap: @gap-md;
    a {
      text-decoration: none;
    }
    h1 {
      font-size: @font-size-lg;
      // font-weight: 400;
      line-height: 1;
      display: flex;
      align-items: center;
      gap: @gap-xs;
      margin: 0;
      .extra {
        position: relative;
        padding: @padding-xxs @padding-xs;
        font-size: 0.9em;
        // font-weight: bold;
        // background: linear-gradient(114deg, #730086 30.11%, #2668ff 78.96%);
        background: radial-gradient(
          100.83% 105.99% at 41.28% 29.17%,
          #17166d 0%,
          #fd99ff 100%
        );
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
  opacity: 0.7;
  text-align: end;
}
.header-logo {
  max-height: 5rem;
  width: auto;
}

@media screen and (max-width: @screen-2xl) {
  .header {
    padding: @padding-md @padding-lg;
  }
  .header-text {
    display: none;
  }
}

@media screen and (max-width: @screen-lg) {
  .header {
    padding: @padding-md @padding-md;
  }
}

@media screen and (max-width: @screen-md) {
  .header {
    nav {
      width: 100%;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: @gap-md;
    }
  }
}

@media screen and (max-width: @screen-sm) {
  .header {
    padding: @padding-sm @padding-sm;
    nav {
      gap: @gap-sm;
      h1 {
        // font-size: @font-size-md;
      }
    }
  }

  .header-logo {
    max-height: 13vw;
  }
}
</style>
