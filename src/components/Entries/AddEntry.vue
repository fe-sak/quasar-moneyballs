<template>
  <<q-form
    @submit="addEntryFormSubmit"
    class="row q-px-sm q-pb-sm q-col-gutter-sm bg-primary"
  >
    <div class="col">
      <q-input
        ref="nameRef"
        v-model="addEntryForm.name"
        placeholder="Name"
        dense
        outlined
        bg-color="white"
        v-select-all
      ></q-input>
    </div>
    <div class="col">
      <q-input
        v-model.number="addEntryForm.amount"
        placeholder="Amount"
        dense
        outlined
        bg-color="white"
        input-class="text-right"
        type="number"
        step="0.01"
        v-select-all
      ></q-input>
    </div>
    <div class="col col-auto">
      <q-btn color="primary" icon="add" round type="submit"></q-btn>
    </div> </q-form
  >/template>
</template>
<script setup>
import { useStoreEntries } from "src/stores/storeEntries";
import { reactive, ref } from "vue";
import vSelectAll from "src/directives/directiveSelectAll";

const storeEntries = useStoreEntries();

const nameRef = ref(null);
const addEntryForm = reactive({ name: "", amount: null });

const addEntryFormSubmit = () => {
  storeEntries.addEntry(addEntryForm);
  addEntryFormReset();
};
const addEntryFormReset = () => {
  addEntryForm.name = "";
  addEntryForm.amount = null;
  nameRef.value.focus();
};
</script>
