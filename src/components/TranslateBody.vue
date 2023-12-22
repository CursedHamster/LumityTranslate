<script setup lang="ts">
import {
  ref,
  watch,
  computed,
  onMounted,
  onUpdated,
  onBeforeUnmount,
} from "vue";
import gsap from "gsap";
import { LanguageContent } from "./LanguageContent";
const props = defineProps<{
  languageContent: LanguageContent;
}>();
const isActive = computed(() => props?.languageContent?.isActive);
const emit = defineEmits(["setLanguageContent"]);

const maxTextLength: number = 4000;
const textInput = ref(props?.languageContent?.text || "");
const textLength = computed(() => textInput?.value?.length);

const copyTimeline = gsap.timeline();

watch(textInput, (val: string) => {
  if (isActive.value) {
    if (val?.length > maxTextLength) {
      emit("setLanguageContent", isActive.value, val?.slice(0, maxTextLength));
    } else {
      emit("setLanguageContent", isActive.value, val);
    }
  }
});

if (!isActive.value) {
  watch(
    () => props.languageContent.text,
    () => {
      textInput.value = props.languageContent.text || "";
    }
  );
}

watch(
  () => props.languageContent.languageId,
  () => {
    const newText: string | undefined = props?.languageContent?.text;
    textInput.value = newText ? newText : "";
  }
);

function wipeText() {
  textInput.value = "";
}

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

function handleTextAreaInput() {
  const textArea: any = document.querySelector(".translate-area");
  const inactiveArea: any = document.querySelector(".inactive-area");
  textArea.style.height = "1px";
  const activeScrollHeight: number = textArea.scrollHeight;
  const inactiveClientHeight: number = inactiveArea.scrollHeight;
  if (innerWidth > 1024) {
    const textAreaScrollHeight: number =
      activeScrollHeight > inactiveClientHeight
        ? activeScrollHeight
        : inactiveClientHeight;
    textArea.style.height = textAreaScrollHeight + "px";
  } else {
    textArea.style.height = activeScrollHeight + "px";
  }
}

if (isActive.value) {
  onMounted(() => {
    window.addEventListener("resize", handleTextAreaInput);
  });
  onUpdated(() => {
    handleTextAreaInput();
  });
  onBeforeUnmount(() => {
    window.removeEventListener("resize", handleTextAreaInput);
  });
}
</script>
<template>
  <div class="translate-container">
    <div class="translate-body" :class="{ dark: isActive, light: !isActive }">
      <textarea
        v-if="isActive"
        v-model="textInput"
        name="source"
        id="source"
        class="translate-area"
        placeholder="Enter text, please..."
        area-label="Source text"
        rows="1"
      ></textarea>
      <div v-if="!isActive" class="translate-area inactive-area">
        <span v-if="textLength === 0" class="placeholder"
          >Translation result...</span
        >{{ textInput }}
      </div>
      <button
        v-if="isActive"
        v-show="textInput.length > 0"
        @click="wipeText"
        class="translate-wipe"
        aria-label="Wipe text"
      >
        <span class="material-symbols-outlined">close</span>
      </button>
      <div v-if="isActive" class="translate-letters">
        <span :class="{ invalid: textLength > maxTextLength }">{{
          textLength ? textLength : 0
        }}</span>
        / <span>{{ maxTextLength }}</span>
      </div>
      <button
        v-if="!isActive"
        v-show="textInput.length > 0"
        class="translate-copy"
        @click="copyTranslation"
        aria-label="Copy translation"
      >
        <span class="translate-copy-text">Copy</span>
        <span class="material-symbols-outlined">content_copy</span>
      </button>
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
