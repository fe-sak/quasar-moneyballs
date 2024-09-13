import { defineStore } from "pinia";
import { reactive, watch } from "vue";
import { Dark } from "quasar";

export const useStoreSettings = defineStore("settings", () => {
  const settings = reactive({
    promptToDelete: true,
    showRunningBalance: false,
    currencySymbol: "$",
    darkMode: false, // false | true | 'auto'
  });

  watch(
    () => settings.darkMode,
    (value) => {
      Dark.set(value);
    }
  );

  // state

  // getters

  // actions

  // helpers

  return {
    // state
    settings,
    // getters

    // actions
  };
});
