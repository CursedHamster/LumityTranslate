<script setup lang="ts">
import { computed } from "vue";
import { Language } from "./Language";
const props = defineProps<{
  language: Language;
  isActive: boolean;
  openDropdown: { open: boolean; languageId: number };
}>();
const emit = defineEmits(["setOpenDropdown"]);

const isOpen = computed(
  () =>
    props?.openDropdown?.open &&
    props?.openDropdown?.languageId === props?.language?.id
);
</script>
<template>
  <div class="translate-header" :class="{ end: isActive, open: isOpen }">
    <button
      class="translate-dropdown-button"
      @click="
        $emit('setOpenDropdown', {
          open:
            openDropdown?.languageId === language?.id
              ? !openDropdown?.open
              : true,
          languageId: language?.id,
        })
      "
      title="Click to open language choice"
    >
      <span class="translate-header-language">{{ language?.name }}</span>
      <span class="translate-header-icon material-symbols-outlined">
        expand_more
      </span>
    </button>
    <a
      v-if="language?.source"
      :href="language?.source"
      class="translate-source"
      target="_blank"
      aria-label="Language source"
      title="To the external page of the language source"
    >
      <span class="translate-source-icon material-symbols-outlined"
        >open_in_new
      </span></a
    >
  </div>
</template>
<style scoped lang="less">
@import "../style";
.translate-header {
  position: relative;
  padding: 0 @padding-sm;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: @gap-xxs;
  flex-grow: 1;
  // &.end {
  //   justify-content: flex-end;
  // }
  &.open {
    .translate-header-icon {
      transform: rotate(180deg);
    }
  }
}
.translate-dropdown-button {
  position: relative;
  max-width: 12rem;
  height: 100%;
  color: @text;
  display: flex;
  gap: @gap-xs;
  align-items: center;
  .translate-header-language {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: 600;
  }
}

.translate-source {
  display: flex;
  align-items: center;
  text-decoration: none;
  span {
    padding: 0;
  }
}

@media screen and (max-width: @screen-md) {
  .translate-dropdown-button {
    max-width: 10rem;
  }
}

@media screen and (max-width: @screen-sm) {
  .translate-dropdown-button {
    max-width: 8rem;
  }
}
</style>
