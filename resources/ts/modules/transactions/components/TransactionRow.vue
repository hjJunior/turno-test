<script setup lang="ts">
import { computed } from "vue";
import Transaction from "../models/transaction";
import TransactionableRow from "./TransactionableRow.vue";

const props = defineProps<{ transaction: Transaction }>();
const transactionable = computed(() => props.transaction.getTransactionable());
</script>

<template>
  <TransactionableRow v-bind="{ transactionable }" />
</template>
