<script setup lang="ts">
import {
  ref,
  watch,
  computed,
  onMounted,
  onUpdated,
  onBeforeUnmount,
} from "vue";
import { LanguageContent } from "./LanguageContent";
const props = defineProps<{
  languageContent: LanguageContent;
}>();
const isActive = computed(() => props?.languageContent?.isActive);
const emit = defineEmits(["setLanguageContent"]);

const maxTextLength: number = 2000;
const textInput = ref(props?.languageContent?.text || "");
const textLength = computed(() => textInput?.value?.length);

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
}

function handleTextAreaInput() {
  const textArea: any = document.querySelector(".translate-area");
  const inactiveArea: any = document.querySelector(".inactive-area");
  textArea.style.height = "1px";
  const activeScrollHeight: number = textArea.scrollHeight;
  const inactiveClientHeight: number = inactiveArea.scrollHeight;
  const textAreaScrollHeight: number =
    activeScrollHeight > inactiveClientHeight
      ? activeScrollHeight
      : inactiveClientHeight;
  textArea.style.height = textAreaScrollHeight + "px";
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
      <i
        v-if="isActive"
        v-show="textInput.length > 0"
        class="translate-wipe fi-xwluxl-times-wide"
        @click="wipeText"
      ></i>
      <div v-if="isActive" class="translate-letters">
        <span :class="{ invalid: textLength > maxTextLength }">{{
          textLength ? textLength : 0
        }}</span>
        / {{ maxTextLength }}
      </div>
      <div v-if="!isActive" class="translate-copy" @click="copyTranslation">
        Copy <i class="fi-xnsuxl-copy-solid"></i>
      </div>
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
  opacity: 0.5;
  .invalid {
    color: rgb(255, 128, 128);
  }
}

.translate-wipe {
  position: absolute;
  top: @padding-xs;
  right: @padding-xs;
}
</style>
./Language
