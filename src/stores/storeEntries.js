import { defineStore } from "pinia";
import { Notify, uid, LocalStorage } from "quasar";
import { computed, reactive, watch, nextTick } from "vue";
import { ref } from "vue";

export const useStoreEntries = defineStore("entries", () => {
  // state
  const entries = ref([
    {
      id: "1",
      name: "Salary",
      amount: 4999.99,
      paid: true,
    },
    {
      id: "2",
      name: "Rent",
      amount: -999,
      paid: false,
    },
    {
      id: "3",
      name: "Phone",
      amount: -14.99,
      paid: false,
    },
    {
      id: "4",
      name: "Unknown",
      amount: 0,
      paid: false,
    },
  ]);

  watch(entries.value, () => {
    saveEntries();
  });

  const options = reactive({ sort: false });

  // getters
  const balance = computed(() =>
    entries.value.reduce((sum, element) => sum + element.amount, 0)
  );

  const balancePaid = computed(() =>
    entries.value.reduce(
      (sum, element) => (element.paid ? sum + element.amount : sum),
      0
    )
  );

  const runningBalances = computed(() => {
    let runningBalances = [],
      currentRunningBalance = 0;

    if (entries.value.length) {
      entries.value.forEach((entry) => {
        let entryAmount = entry.amount ? entry.amount : 0;

        currentRunningBalance += entryAmount;
        runningBalances.push(currentRunningBalance);
      });
    }

    return runningBalances;
  });

  // actions
  const addEntry = (addEntryForm) => {
    const newEntry = Object.assign({}, addEntryForm, {
      id: uid(),
      paid: false,
    });
    entries.value.push(newEntry);
  };
  const deleteEntry = (entryId) => {
    const index = getEntryIndexById(entryId);
    entries.value.splice(index, 1);
    removeSlideItemIfExists(entryId);
    Notify.create({ message: "Entry deleted", position: "top" });
  };
  const updateEntry = (entryId, updates) => {
    const index = getEntryIndexById(entryId);
    Object.assign(entries.value[index], updates);
  };
  const sortEnd = ({ oldIndex, newIndex }) => {
    const movedEntry = entries.value[oldIndex];
    entries.value.splice(oldIndex, 1);
    entries.value.splice(newIndex, 0, movedEntry);
  };
  const saveEntries = () => {
    LocalStorage.set("entries", entries.value);
  };
  const loadEntries = () => {
    const savedEntries = LocalStorage.getItem("entries");

    if (savedEntries) {
      Object.assign(entries.value, savedEntries);
    }
  };

  // helpers
  const getEntryIndexById = (entryId) =>
    entries.value.findIndex((entry) => entry.id === entryId);

  // force deletion from DOM using css selector

  const removeSlideItemIfExists = (entryId) => {
    nextTick(() => {
      const slideItem = document.querySelector(`#id-${entryId}`);

      if (slideItem) {
        slideItem.remove();
      }
    });
  };
  return {
    // state
    entries,
    options,
    // getters
    balance,
    balancePaid,
    runningBalances,
    // actions
    addEntry,
    deleteEntry,
    updateEntry,
    sortEnd,
    loadEntries,
  };
});
