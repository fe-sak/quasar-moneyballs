import { defineStore } from "pinia";
import { reactive } from "vue";

export const useStoreSettings = defineStore("settings", () => {
   const settings = reactive({
      promptToDelete: true,
   });
  // state
  
  // getters
  
  // actions
  
  // helpers
  
  return {
    // state
    settings
    // getters
  
    // actions
  };
});
