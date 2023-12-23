<script setup lang="ts">
import { ref, watch, computed, onBeforeMount } from "vue";
import gsap from "gsap";
import { Language } from "./Language";
import { LanguageContent } from "./LanguageContent";
import TranslateBody from "./TranslateBody.vue";
import TranslateHeader from "./TranslateHeader.vue";
import { getAllLanguages } from "./supabaseService";

const languagesData = ref<Language[]>([]);
const languageContents = ref<{
  standard: LanguageContent;
  lumity: LanguageContent;
}>({
  standard: { languageId: 1, isActive: true },
  lumity: { languageId: 2, isActive: false },
});
const openDropdown = ref<{ open: boolean; languageId: number }>({
  open: false,
  languageId: 1,
});
const openType = computed(() => {
  const newType = findLanguageById(openDropdown?.value?.languageId)?.type;
  return newType ? newType : "lumity";
});
const dropdownTimeline = gsap.timeline({});

function setOpenDropdown(val: { open?: boolean; languageId?: number }) {
  openDropdown.value = { ...openDropdown.value, ...val };
}

watch(
  () => openDropdown.value.open,
  (val) => {
    if (dropdownTimeline?.isActive()) {
      dropdownTimeline?.clear();
    }
    if (val) {
      dropdownTimeline?.fromTo(
        ".translate-dropdown-container",
        { height: "0px", autoAlpha: 0 },
        { height: "auto", autoAlpha: 1, duration: 0.3 }
      );
    } else {
      dropdownTimeline?.fromTo(
        ".translate-dropdown-container",
        { autoAlpha: 1 },
        { height: "0px", autoAlpha: 0, duration: 0.3 }
      );
    }
  }
);

function setLanguageContent(isActive: boolean, text: string) {
  if (isActiveStandard(isActive)) {
    languageContents.value = {
      ...languageContents?.value,
      standard: { ...languageContents?.value?.standard, text: text },
    };
  } else {
    languageContents.value = {
      ...languageContents?.value,
      lumity: { ...languageContents?.value?.lumity, text: text },
    };
  }

  if (isActive) {
    translateText(text);
  }
}

function isActiveStandard(isActive: boolean) {
  return languageContents?.value?.standard?.isActive === isActive;
}

function changeLanguage(languageId: number) {
  setOpenDropdown({ languageId });
  languageContents.value = {
    ...languageContents.value,
    [openType.value]: {
      ...languageContents.value[openType.value],
      languageId,
    },
  };
  translateText(
    isActiveStandard(true)
      ? languageContents?.value?.standard?.text || ""
      : languageContents?.value?.lumity?.text || ""
  );
}

function findLanguageById(id: number): Language {
  const language = languagesData.value?.find((lang) => lang?.id === id);

  return language ? language : <Language>{};
}

function findLanguageContentByIsActive(isActive: boolean) {
  return isActiveStandard(isActive)
    ? languageContents?.value?.standard
    : languageContents?.value?.lumity;
}

function swapActive() {
  const oldLanguageContents = languageContents.value;

  languageContents.value = {
    standard: {
      ...oldLanguageContents?.standard,
      isActive: !oldLanguageContents?.standard?.isActive,
      text: oldLanguageContents?.standard?.isActive
        ? ""
        : oldLanguageContents?.standard?.text,
    },
    lumity: {
      ...oldLanguageContents?.lumity,
      isActive: oldLanguageContents?.standard?.isActive,
      text: oldLanguageContents?.lumity?.isActive
        ? ""
        : oldLanguageContents?.lumity?.text,
    },
  };

  translateText(
    (oldLanguageContents?.standard?.isActive
      ? oldLanguageContents?.lumity?.text
      : oldLanguageContents?.standard?.text) || ""
  );
}

function translateText(sourceText: string) {
  const isStandard: boolean = isActiveStandard(true);
  const sourceAlphabet: string[] = findLanguageById(
    findLanguageContentByIsActive(true).languageId
  )?.alphabet;
  const translationAlphabet: string[] = findLanguageById(
    findLanguageContentByIsActive(false).languageId
  )?.alphabet;
  const translation: string | undefined = [...sourceText]
    ?.map((letter) => {
      if (letter.charCodeAt(0) === 65039) {
        return "";
      }
      const indexOfLetter: number = sourceAlphabet?.findIndex((el) =>
        el.includes(isStandard ? letter?.toLowerCase() : letter)
      );
      return indexOfLetter >= 0 ? translationAlphabet[indexOfLetter] : letter;
    })
    .join("");
  setLanguageContent(false, translation || "");
}

onBeforeMount(() => {
  getAllLanguages().then((res) => (languagesData.value = res?.data || []));
});
</script>

<template>
  <main class="main-container">
    <div class="translate-headers-container">
      <TranslateHeader
        :open-dropdown="openDropdown"
        :is-active="true"
        :language="
          findLanguageById(findLanguageContentByIsActive(true)?.languageId)
        "
        @set-open-dropdown="setOpenDropdown"
      />
      <button class="swap-button" @click="swapActive" title="Swap languages">
        <span class="material-symbols-outlined">swap_horiz</span>
      </button>
      <TranslateHeader
        :open-dropdown="openDropdown"
        :is-active="false"
        :language="
          findLanguageById(findLanguageContentByIsActive(false)?.languageId)
        "
        @set-open-dropdown="setOpenDropdown"
      />
    </div>
    <div class="translate-dropdown-container">
      <ul class="translate-dropdown-list">
        <button class="translate-dropdown-back" title="Close language choice">
          <span
            class="material-symbols-outlined"
            @click="openDropdown = { ...openDropdown, open: false }"
            >arrow_left_alt</span
          >
        </button>
        <li
          v-for="language in openType
            ? languagesData.filter((val) => val?.type === openType)
            : []"
          class="translate-dropdown-item"
          :class="{
            active: language?.id === openDropdown?.languageId,
          }"
          @click="() => changeLanguage(language?.id)"
          title="Click to choose language"
        >
          {{ language?.name }}
        </li>
      </ul>
    </div>
    <div class="translate-bodies-container">
      <TranslateBody
        :language-content="findLanguageContentByIsActive(true)"
        @set-language-content="setLanguageContent"
      />
      <TranslateBody :language-content="findLanguageContentByIsActive(false)" />
    </div>
  </main>
</template>

<style scoped lang="less">
@import "../style.less";
.main-container {
  width: 100%;
  flex-grow: 1;
  padding: @padding-md @padding-xl;
  display: flex;
  flex-direction: column;
}

.swap-button {
  padding: @padding-xxs 0;
  color: @text;
  &:active {
    .material-symbols-outlined {
      scale: 0.95;
    }
  }
}

.translate-headers-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: @gap-sm;
  overflow: auto hidden;
}

.translate-bodies-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: @gap-xl;
}

.translate-dropdown-container {
  width: 100%;
  height: 0;
  visibility: 0;
  opacity: 0;
  overflow-y: hidden;
  .glassmorphicBackground();
  .glassmorphicBackground.light();
  border-radius: @border-radius-sm;
  margin-bottom: @padding-sm;
}

.translate-dropdown-list {
  list-style: none;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: @gap-sm;
  align-items: center;
  padding: @padding-sm;
}

.translate-dropdown-item {
  cursor: pointer;
  border-radius: @border-radius-sm;
  border: 2px solid @text;
  padding: @padding-xxs @padding-sm;
  text-align: center;
  transition: all 0.2s ease-in-out;
  &:hover {
    background: rgb(@text, 0.1);
  }
  &.active {
    background: @text;
    color: @background;
  }
}

@media screen and (max-width: @screen-2xl) {
  .main-container {
    padding: @padding-md @padding-lg;
  }
}

@media screen and (max-width: @screen-lg) {
  .main-container {
    padding: @padding-md @padding-md;
  }
  .translate-bodies-container {
    gap: @gap-lg;
  }
}

@media screen and (max-width: @screen-md) {
  .main-container {
    padding: @padding-md 0;
  }
  .translate-headers-container {
    justify-content: space-between;
  }
  .translate-bodies-container {
    flex-direction: column;
    gap: @gap-md;
  }
  .translate-dropdown-container {
    border-radius: 0;
    border: 0;
  }
}

@media screen and (max-width: @screen-sm) {
  .main-container {
    padding: 0;
  }
  .translate-bodies-container {
    gap: @gap-sm;
  }
  .translate-dropdown-container {
    margin-bottom: @padding-xs;
  }
}
</style>
