<script setup lang="ts">
import { vInfiniteScroll } from "@vueuse/components";
import { FwbButton, FwbHeading, FwbTimeline } from "flowbite-vue";
import TransactionRow from "../components/TransactionRow.vue";
import CustomerLayout from "@/layouts/CustomerLayout.vue";
import useTransactions, {
  UseTransactionsFilter,
} from "../hooks/useTransactions";
import { computed, ref } from "vue";
import NewExpenseModal from "../components/NewExpenseModal.vue";

const props = defineProps<{
  filter: UseTransactionsFilter;
  title: string;
}>();

const showNewExpenseModal = ref(false);

const { transactions, error, isFetchingNextPage, onLoadMore } = useTransactions(
  computed(() => props.filter)
);
</script>

<template>
  <CustomerLayout>
    <div class="flex flex-col h-full">
      <nav class="sticky top-0 bg-white z-10 border-b px-2 py-4">
        <FwbHeading tag="h5">{{ title }}</FwbHeading>
      </nav>
      <div v-if="error">Ops! Something went wrong</div>
      <div
        v-else
        class="flex-initial min-h-0 overflow-y-auto"
        v-infinite-scroll="onLoadMore"
      >
        <FwbTimeline class="ml-5 mt-2">
          <TransactionRow
            v-for="transaction in transactions"
            :key="transaction.id"
            :transaction="transaction"
          />
        </FwbTimeline>
        <div v-if="isFetchingNextPage" class="grid place-items-center py-2">
          <span
            class="icon-[humbleicons--spinner-earring] animate-spin w-8 h-8"
          />
        </div>
      </div>
    </div>
    <NewExpenseModal v-model="showNewExpenseModal" />
    <div class="fixed bottom-20 right-5 lg:bottom-5">
      <FwbButton
        pill
        square
        class="rounded-lg"
        size="xl"
        aria-label="New expense"
        @click="showNewExpenseModal = true"
      >
        <div class="flex items-center justify-center gap-1">
          <span class="icon-[material-symbols--add] w-5 h-5" />
          <span>New Expense</span>
        </div>
      </FwbButton>
    </div>
  </CustomerLayout>
</template>
