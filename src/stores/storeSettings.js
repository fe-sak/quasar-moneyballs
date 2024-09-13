import { defineStore } from "pinia";
import { reactive, watch } from "vue";
import { Dark } from "quasar";

export const useStoreSettings = defineStore("settings", () => {
  const settings = reactive({
    promptToDelete: true,
    showRunningBalance: false,
    currencySymbol: "$",
    darkMode: true, // false | true | 'auto' TODO: set this false
  });

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
