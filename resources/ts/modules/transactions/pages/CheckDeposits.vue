<script setup lang="ts">
import { vInfiniteScroll } from "@vueuse/components";
import {
  FwbButton,
  FwbHeading,
  FwbTab,
  FwbTabs,
  FwbTimeline,
} from "flowbite-vue";
import CustomerLayout from "@/layouts/CustomerLayout.vue";
import { computed, ref } from "vue";
import useCheckDeposits, {
  CheckDepositState,
  UseCheckDepositsFilter,
} from "../hooks/useCheckDeposits";
import TransactionableRow from "../components/TransactionableRow.vue";
import NewCheckDepositModal from "../components/NewCheckDepositModal.vue";

const showNewCheckDepositModal = ref(false);

const activeTab = ref<UseCheckDepositsFilter["state"]>(
  CheckDepositState.pending
);
const activeFilter = computed<UseCheckDepositsFilter>(() => ({
  state: activeTab.value,
}));

const { checkDeposits, error, isFetchingNextPage, onLoadMore } =
  useCheckDeposits(activeFilter);
</script>

<template>
  <CustomerLayout>
    <div class="flex flex-col h-full">
      <nav class="flex flex-col sticky top-0 bg-white z-10 border-b px-2 pt-4">
        <FwbHeading tag="h5">Check Deposits</FwbHeading>
        <FwbTabs v-model="activeTab" variant="underline">
          <FwbTab :name="CheckDepositState.pending" title="Pending" />
          <FwbTab :name="CheckDepositState.accepted" title="Accepted" />
          <FwbTab :name="CheckDepositState.rejected" title="Rejected" />
        </FwbTabs>
      </nav>
      <div v-if="error">Ops! Something went wrong</div>
      <div
        v-else
        class="flex-initial min-h-0 overflow-y-auto"
        v-infinite-scroll="onLoadMore"
      >
        <FwbTimeline class="ml-5 mt-2">
          <TransactionableRow
            v-for="checkDeposit in checkDeposits"
            :key="checkDeposit.id"
            :transactionable="checkDeposit"
          />
        </FwbTimeline>
        <div v-if="isFetchingNextPage" class="grid place-items-center py-2">
          <span
            class="icon-[humbleicons--spinner-earring] animate-spin w-8 h-8"
          />
        </div>
      </div>
    </div>
    <NewCheckDepositModal v-model="showNewCheckDepositModal" />
    <div class="fixed bottom-20 right-5 lg:bottom-5">
      <FwbButton
        pill
        square
        class="rounded-lg *:flex *:justify-center"
        size="xl"
        @click="showNewCheckDepositModal = true"
        aria-label="Add new check deposit"
      >
        <span class="icon-[material-symbols--add] w-5 h-5" />
      </FwbButton>
    </div>
  </CustomerLayout>
</template>
