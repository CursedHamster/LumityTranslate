<script setup lang="ts">
import { computed } from "vue";
import { Language } from "./Language";
const props = defineProps<{
  language: Language;
  isActive: boolean;
  openDropdown: { open: boolean; languageId: number };
}>();
defineEmits(["setOpenDropdown"]);

const isOpen = computed(
  () =>
    props?.openDropdown?.open &&
    props?.openDropdown?.languageId === props?.language?.id
);
</script>
<template>
  <div class="translate-header" :class="{ end: isActive }">
    <button
      class="translate-dropdown-button"
      :class="{ open: isOpen, closed: openDropdown?.open && !isOpen }"
      @click="
        $emit('setOpenDropdown', {
          open:
            openDropdown?.languageId === language?.id
              ? !openDropdown?.open
              : true,
          languageId: language?.id,
        })
      "
    >
      {{ language?.name }}
    </button>
    <a v-if="language?.source" href="/" class="translate-source"
      >Source <i class="fi-xwluxl-external-link-wide"></i
    ></a>
  </div>
</template>
<style scoped lang="less">
@import "../style";
.translate-header {
  position: relative;
  width: 100%;
  height: @translate-header-height;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  &.end {
    flex-direction: row-reverse;
  }
}
.translate-dropdown-button {
  position: relative;
  max-width: 8rem;
  height: 100%;
  padding: @padding-xxs @padding-sm;
  color: white;
  // border-bottom: 3px solid white;
  &::before {
    content: "";
    position: absolute;
    width: calc(100% - @padding-md);
    height: 100%;
    top: -1px;
    left: 0;
    right: 0;
    bottom: 0;
    border-bottom: 3px solid white;
    margin: 0 auto;
    z-index: 1;
  }
  &.open {
    background: rgb(@text, 0.1);
    border-radius: @border-radius-sm @border-radius-sm 0 0;
    &::before {
      display: none;
    }
  }
  &.closed {
    &::before {
      display: none;
    }
  }
}

.translate-source {
  font-size: @font-size-sm;
  padding: @padding-xxs @padding-sm;
  display: flex;
  align-items: end;
  gap: @gap-xs;
}
</style>
