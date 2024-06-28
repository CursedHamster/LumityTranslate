<script setup lang="ts">
import { computed } from "vue";
import { LanguageContent } from "./LanguageContent";
import Source from "./Source.vue";
import Translation from "./Translation.vue";
const props = defineProps<{
  languageContent: LanguageContent;
}>();
const isActive = computed(() => props?.languageContent?.isActive);
const emit = defineEmits(["setLanguageContent"]);
</script>
<template>
  <div class="translate-container">
    <div class="translate-body" :class="{ dark: isActive, light: !isActive }">
      <Source
        v-if="isActive"
        :language-content="languageContent"
        @set-language-content="(...val) => $emit('setLanguageContent', ...val)"
      />
      <Translation v-else :language-content="languageContent" />
    </div>
  </div>
</template>
<style scoped lang="less">
@import "../style";
.translate-container {
  width: 100%;
}
.translate-body {
  position: relative;
  min-height: @min-height;
  height: 100%;
  display: flex;
  .glassmorphicBackground();
  &.light {
    .glassmorphicBackground.light();
    padding: @padding-sm @padding-sm (@padding-sm * 2 + @font-size-lg)
      @padding-sm;
  }
  &.dark {
    .glassmorphicBackground.dark();
    padding: @padding-sm (@padding-xs * 2 + @font-size-lg)
      (@padding-sm * 2 + @font-size-lg) @padding-sm;
  }
}

@media screen and (max-width: @screen-md) {
  .translate-body {
    border-radius: 0;
    // border: 0;
    border-left: 0;
    border-right: 0;
    &.light {
      padding: @padding-md @padding-md (@padding-md * 2 + @font-size-lg)
        @padding-md;
    }
    &.dark {
      .glassmorphicBackground.dark();
      padding: @padding-sm (@padding-sm * 2 + @font-size-lg)
        (@padding-md * 2 + @font-size-lg) @padding-md;
    }
  }
}

@media screen and (max-width: @screen-sm) {
  .translate-body {
    &.light {
      padding: @padding-sm @padding-sm (@padding-sm * 2 + @font-size-lg)
        @padding-sm;
    }
    &.dark {
      .glassmorphicBackground.dark();
      padding: @padding-sm (@padding-sm * 2 + @font-size-lg)
        (@padding-sm * 2 + @font-size-lg) @padding-sm;
    }
  }
}
</style>
