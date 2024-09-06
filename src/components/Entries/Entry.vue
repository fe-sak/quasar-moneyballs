<template>
  <q-slide-item
    @left="onEntrySlideLeft"
    @right="onEntrySlideRight"
    left-color="positive"
    right-color="negative"
    :class="{ 'bg-grey-2': entry.paid }"
  >
    <template v-slot:left>
      <q-icon name="done" />
    </template>
    <template v-slot:right>
      <q-icon name="delete" />
    </template>
    <q-item>
      <q-item-section
        :class="[
          useAmountColorClass(entry.amount),
          { 'text-strike': entry.paid },
        ]"
        class="text-weight-bold"
      >
        {{ entry.name }}
        <q-popup-edit
          :model-value="entry.name"
          auto-save
          v-slot="scope"
          anchor="top left"
          :offset="[16, 12]"
          :cover="false"
          buttons
          label-set="Ok"
          @save="onNameUpdate"
        >
          <q-input
            input-class="text-weight-bold letter-spacing-none"
            v-model="scope.value"
            dense
            autofocus
            v-select-all
            @keyup.enter="scope.set"
          />
        </q-popup-edit>
      </q-item-section>

      <q-item-section
        side
        :class="[useAmountColorClass(entry.amount)]"
        class="text-weight-bold"
      >
        <span :class="{ 'text-strike': entry.paid }">
          {{ useCurrencify(entry.amount) }}
        </span>
        <q-popup-edit
          @save="onAmountUpdate"
          :model-value="entry.amount"
          auto-save
          v-slot="scope"
          anchor="top left"
          :offset="[16, 12]"
          :cover="false"
          buttons
          label-set="Ok"
        >
          <q-input
            input-class="text-weight-bold letter-spacing-none text-right"
            v-model.number="scope.value"
            dense
            autofocus
            @keyup.enter="scope.set"
            type="number"
            step="0.1"
            v-select-all
          />
        </q-popup-edit>
        <q-chip
          v-if="storeSettings.settings.showRunningBalance"
          outline
          size="9px"
          dense
          :class="useAmountColorClass(storeEntries.runningBalances[index])"
          class="absolute-bottom-right running-balance"
        >
          {{ useCurrencify(storeEntries.runningBalances[index]) }}
        </q-chip>
      </q-item-section>

      <q-item-section v-if="storeEntries.options.sort" side>
        <q-icon name="reorder" color="primary" class="handle"></q-icon>
      </q-item-section>
    </q-item>
  </q-slide-item>
</template>

<script setup>
import { useQuasar } from "quasar";
import { useStoreEntries } from "src/stores/storeEntries";
import { useAmountColorClass } from "src/use/useAmountColorClass";
import { useCurrencify } from "src/use/useCurrencify";
import vSelectAll from "src/directives/directiveSelectAll";
import { useStoreSettings } from "src/stores/storeSettings";

const $q = useQuasar();

const storeEntries = useStoreEntries();
const storeSettings = useStoreSettings();

const props = defineProps({
  entry: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});

// slide items
const onEntrySlideRight = ({ reset }) => {
  if (storeSettings.settings.promptToDelete) {
    promptToDelete(reset);
  } else {
    storeEntries.deleteEntry(props.entry.id);
  }
};

const onEntrySlideLeft = ({ reset }) => {
  storeEntries.updateEntry(props.entry.id, { paid: !props.entry.paid });
  reset();
};

const promptToDelete = (reset) => {
  $q.dialog({
    title: "Delete",
    message: `Delete this entry?
              <div class="q-mt-md text-weight-bold ${useAmountColorClass(
                props.entry.amount
              )}"> ${props.entry.name} : ${useCurrencify(
      props.entry.amount
    )}</div>              
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
      reset();
    })
    .onCancel(() => {
      reset();
    });
};

// name & amount update
const onNameUpdate = (value) => {
  storeEntries.updateEntry(props.entry.id, { name: value });
};
const onAmountUpdate = (value) => {
  storeEntries.updateEntry(props.entry.id, { amount: value });
};
</script>
