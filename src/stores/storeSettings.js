import { defineStore } from "pinia";
import { reactive, watch } from "vue";
import { Dark, LocalStorage } from "quasar";

export const useStoreSettings = defineStore("settings", () => {
  const settings = reactive({
    promptToDelete: true,
    showRunningBalance: false,
    currencySymbol: "$",
    darkMode: false, // false | true | 'auto'
  });

  // watch darkMode
  watch(
    () => {
      return settings.darkMode;
    },
    (value) => {
      Dark.set(value);
    },
    {
      immediate: true,
    }
  );

  // watch settings
  watch(settings, () => {
    saveSettings();
  });

  // state

  // getters

  // actions
  const saveSettings = () => {
    LocalStorage.set("settings", settings);
  };
  // helpers

  return {
    // state
    settings,
    // getters

    // actions
  };
});
