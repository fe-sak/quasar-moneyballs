<template>
  <div
    :class="useLightOrDark('shadow-up-3', 'bg-black')"
    class="row q-mb-sm q-px-md q-py-sm items-center"
  >
    <div class="col text-grey-7 text-h6">Balance:</div>
    <div
      class="col text-h6 text-right"
      :class="useAmountColorClass(storeEntries.balance)"
    >
      <div class="row">
        <div class="col">
          {{ useCurrencify(storeEntries.balance) }}
        </div>
      </div>
      <div class="row" v-if="storeEntries.balancePaid">
        <div
          class="col text-caption -text-grey-6"
          :class="useAmountColorClass(storeEntries.balancePaid)"
        >
          Paid:
          <span
            class="text-weight-bold"
            :class="useAmountColorClass(storeEntries.balancePaid)"
            >{{ useCurrencify(storeEntries.balancePaid) }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStoreEntries } from "src/stores/storeEntries";
import { useAmountColorClass } from "src/use/useAmountColorClass";
import { useLightOrDark } from "src/use/useLightOrDark";
import { useCurrencify } from "src/use/useCurrencify";

const storeEntries = useStoreEntries();
</script>
