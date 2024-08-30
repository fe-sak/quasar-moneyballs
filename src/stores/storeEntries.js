import { defineStore } from "pinia";
import { Notify, uid } from "quasar";
import { computed } from "vue";
import { ref } from "vue";

export const useStoreEntries = defineStore("entries", () => {
  // state
  const entries = ref([
    {
      id: "1",
      name: "Salary",
      amount: 4999.99,
      paid: false,
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
  // getters
  const balance = computed(() =>
    entries.value.reduce((sum, element) => sum + element.amount, 0)
  );
  const balancePaid = computed(() =>
    entries.value.reduce((sum, element) => element.paid ? sum + element.amount : sum, 0)
  );
  // actions
  const addEntry = (addEntryForm) => {
    const newEntry = Object.assign({}, addEntryForm, { id: uid(), paid: false });
    entries.value.push(newEntry);
  };
  const deleteEntry = (entryId) => {
    const index = getEntryIndexById(entryId);
    entries.value.splice(index, 1);
    Notify.create({ message: "Entry deleted", position: "top" });
  };
  const updateEntry = (entryId, updates) => {
    const index = getEntryIndexById(entryId);
    Object.assign(entries.value[index], updates);
  };

  // helpers

  const getEntryIndexById = (entryId) =>
    entries.value.findIndex((entry) => entry.id === entryId);

  return { entries, balance, balancePaid, addEntry, deleteEntry, updateEntry };
});
