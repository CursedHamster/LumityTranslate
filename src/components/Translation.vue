<script setup lang="ts">
import { computed } from "vue";
import gsap from "gsap";
import { LanguageContent } from "./LanguageContent";
const props = defineProps<{
  languageContent: LanguageContent;
}>();
const translation = computed<string>(() => props.languageContent?.text || "");

const copyTimeline = gsap.timeline();

function copyTranslation() {
  const translation: string | undefined = props?.languageContent?.text;
  if (translation) {
    navigator.clipboard.writeText(translation);
  }

  const copyText: Element | null = document.querySelector(
    ".translate-copy-text"
  );

  if (copyText) {
    if (copyTimeline?.isActive()) {
      copyTimeline?.clear();
    }
    copyTimeline
      .fromTo(
        ".translate-copy-text",
        { autoAlpha: 1 },
        {
          autoAlpha: 0,
          duration: 0.1,
        }
      )
      .fromTo(
        ".translate-copy-text",
        {},
        {
          innerText: "Copied!",
          duration: 0.1,
        }
      )
      .fromTo(
        ".translate-copy-text",
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.5 }
      )
      .fromTo(
        ".translate-copy-text",
        { autoAlpha: 1 },
        {
          autoAlpha: 0,
          duration: 0.1,
          delay: 1,
        }
      )
      .fromTo(
        ".translate-copy-text",
        {},
        {
          innerText: "Copy",
          duration: 0.1,
        }
      )
      .fromTo(
        ".translate-copy-text",
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.5 }
      );
  }
}
</script>
<template>
  <div class="translate-area inactive-area" title="Translation result">
    <span v-if="translation?.length === 0" class="placeholder"
      >Translation result...</span
    >{{ translation }}
  </div>
  <button
    v-show="translation?.length > 0"
    class="translate-copy"
    @click="copyTranslation"
    aria-label="Copy translation"
    title="Copy translation to your clipboard"
  >
    <span class="translate-copy-text">Copy</span>
    <span class="material-symbols-outlined">content_copy</span>
  </button>
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
.translate-area {
  flex-grow: 1;
  width: 100%;
  overflow: hidden;
  word-break: break-all;
  resize: none;
  white-space: pre-wrap;
  box-sizing: border-box;
  background: none;
  border: none;
  outline: none;
  color: white;
  padding: 0;
  &::placeholder,
  .placeholder {
    color: white;
    opacity: 0.7;
  }
}

.translate-copy,
.translate-letters {
  position: absolute;
  bottom: @padding-xs;
  right: @padding-xs;
  font-size: @font-size-sm;
  display: flex;
  align-items: center;
  gap: @gap-xs;
  opacity: 0.7;
  .invalid {
    color: rgb(255, 128, 128);
  }
}

.translate-wipe {
  position: absolute;
  top: @padding-xs;
  right: @padding-xs;
  font-size: @font-size-sm;
}

.translate-copy,
.translate-wipe {
  cursor: pointer;
  &:active .material-symbols-outlined {
    scale: 0.95;
  }
}

@media screen and (max-width: @screen-md) {
  .translate-body {
    border-radius: 0;
    border: 0;
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
  .translate-copy,
  .translate-letters {
    bottom: @padding-sm;
    right: @padding-md;
  }
  .translate-wipe {
    top: @padding-sm;
    right: @padding-md;
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
  .translate-copy,
  .translate-letters {
    bottom: @padding-xs;
    right: @padding-sm;
  }
  .translate-wipe {
    top: @padding-xs;
    right: @padding-sm;
  }
}
</style>
