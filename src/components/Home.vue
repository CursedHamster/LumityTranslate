<script setup lang="ts">
import { ref, computed } from "vue";
import { Language } from "./Language";
import { LanguageContent } from "./LanguageContent";
import TranslateBody from "./TranslateBody.vue";
import TranslateHeader from "./TranslateHeader.vue";
import data from "../assets/data";

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

function setOpenDropdown(val: { open?: boolean; languageId?: number }) {
  openDropdown.value = { ...openDropdown.value, ...val };
}

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
  const language = data?.find((lang) => lang?.id === id);

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
  const sourceAlphabet = findLanguageById(
    findLanguageContentByIsActive(true).languageId
  )?.alphabet;
  const translationAlphabet = findLanguageById(
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
      <button class="swap-button" @click="swapActive">
        <i class="fi-xnsuxl-change-solid"></i>
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
    <div v-show="openDropdown?.open" class="translate-dropdown-container">
      <ul class="translate-dropdown-list">
        <i
          class="fi-xnllxl-arrow-simple"
          @click="openDropdown = { ...openDropdown, open: false }"
        ></i>
        <li
          v-for="language in openType
            ? data.filter((val) => val?.type === openType)
            : []"
          class="translate-dropdown-item"
          :class="{
            active: language?.id === openDropdown?.languageId,
          }"
          @click="() => changeLanguage(language?.id)"
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
  padding: @padding-md @padding-lg;
  display: flex;
  flex-direction: column;
}

.swap-button {
  height: @translate-header-height;
}

.translate-headers-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: @gap-sm;
}

.translate-bodies-container {
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: space-between;
  gap: @gap-xl;
}

.translate-dropdown-container {
  width: 100%;
  // border-top: 1px solid rgb(@text, 0.5);
  background: rgb(@text, 0.1);
  box-shadow: 0 1px 0 rgb(@text, 0.2);
  padding: @padding-sm;
  border-radius: @border-radius-sm;
  margin-bottom: @padding-sm;
}

.translate-dropdown-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: @gap-sm;
  align-items: center;

  i {
    cursor: pointer;
  }
}

.translate-dropdown-item {
  cursor: pointer;
  border-radius: @border-radius-sm;
  border: 2px solid @text;
  padding: @padding-xxs @padding-sm;
  text-align: center;
  &:hover {
    background: rgb(@text, 0.1);
  }
  &.active {
    background: @text;
    color: @background;
    &:hover {
      color: rgb(108, 4, 80);
    }
  }
}
</style>
./Language
