<template>
  <q-page>
    <div class="q-pa-md">

      <NothingHere v-if="!storeEntries.entries.length"/>

      <q-list bordered separator v-if="storeEntries.entries.length">

        <Entry 
          v-for="entry in storeEntries.entries" 
          :entry="entry" 
          :keys="entry.id"
        />

      </q-list>
    </div>
    <q-footer class="bg-transparent">

      <Balance />

      <AddEntry />

    </q-footer>
  </q-page>
</template>

<script setup>
import Balance from "src/components/Entries/Balance.vue";
import AddEntry from "src/components/Entries/AddEntry.vue";
import Entry from "src/components/Entries/Entry.vue";
import { useStoreEntries } from "src/stores/storeEntries";
import NothingHere from "src/components/Entries/NothingHere.vue";

defineOptions({
  name: "IndexPage",
});

const storeEntries = useStoreEntries();
</script>
