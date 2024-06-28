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
const emit = defineEmits(["setLanguageContent"]);

const maxTextLength: number = 4000;
const textInput = ref(props?.languageContent?.text || "");
const textLength = computed(() => textInput?.value?.length);

watch(textInput, (val: string) => {
  if (val?.length > maxTextLength) {
    emit("setLanguageContent", true, val?.slice(0, maxTextLength));
  } else {
    emit("setLanguageContent", true, val);
  }
});

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

onMounted(() => {
  window.addEventListener("resize", handleTextAreaInput);
});
onUpdated(() => {
  handleTextAreaInput();
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", handleTextAreaInput);
});
</script>
<template>
  <textarea
    v-model="textInput"
    name="source"
    id="source"
    class="translate-area"
    placeholder="Enter text, please..."
    area-label="Source text"
    title="Area to input text you wish to translate"
    rows="1"
  ></textarea>
  <button
    v-show="textInput.length > 0"
    @click="wipeText"
    class="translate-wipe"
    aria-label="Wipe text"
    title="Clear all text in text area"
  >
    <span class="material-symbols-outlined">close</span>
  </button>
  <div class="translate-letters">
    <span :class="{ invalid: textLength > maxTextLength }">{{
      textLength ? textLength : 0
    }}</span>
    / <span>{{ maxTextLength }}</span>
  </div>
</template>
<style scoped lang="less">
@import "../style";
.translate-area {
  flex-grow: 1;
  width: 100%;
  overflow: hidden;
  word-break: break-word;
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
    opacity: 0.8;
  }
}
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
  cursor: pointer;
  &:active .material-symbols-outlined {
    scale: 0.95;
  }
}

@media screen and (max-width: @screen-md) {
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
