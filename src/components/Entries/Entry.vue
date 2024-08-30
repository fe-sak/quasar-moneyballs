<template>
  <q-slide-item
    @right="onEntrySlideRight"
    left-color="positive"
    right-color="negative"
  >
    <template v-slot:right>
      <q-icon name="delete" />
    </template>
    <q-item>
      <q-item-section
        :class="useAmountColorClass(entry.amount)"
        class="text-weight-bold"
      >
        >
        {{ entry.name }}
      </q-item-section>

      <q-item-section
        side
        :class="useAmountColorClass(entry.amount)"
        class="text-weight-bold"
      >
        {{ useCurrencify(entry.amount) }}
      </q-item-section>
    </q-item>
  </q-slide-item>
</template>

<script setup>
import { useQuasar } from "quasar";
import { useStoreEntries } from "src/stores/storeEntries";
import { useAmountColorClass } from "src/use/useAmountColorClass";
import { useCurrencify } from "src/use/useCurrencify";

const $q = useQuasar();

const storeEntries = useStoreEntries();

const props = defineProps({ entry: { type: Object, required: true } });

const onEntrySlideRight = (details) => {
  $q.dialog({
    title: "Delete",
    message: `Delete this entry?
              <div class="q-mt-md text-weight-bold ${useAmountColorClass(
                props.entry.amount
              )}"> ${props.entry.name} : ${useCurrencify(props.entry.amount)}</div>              
`,
    cancel: true,
    persistent: true,
    html: true,
    ok: {
      label: "Delete",
      color: "negative",
      noCaps: true,
    },
    cancel: {
      color: "primary",
      noCaps: true,
    },
  })
    .onOk(() => {
      storeEntries.deleteEntry(props.entry.id);
      details.reset();
    })
    .onCancel(() => {
      details.reset();
    });
};
</script>
