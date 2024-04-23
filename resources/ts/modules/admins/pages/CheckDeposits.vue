<script setup lang="ts">
import AdminLayout from "@/layouts/AdminLayout.vue";
import PendingCheckDepositRow from "../components/PendingCheckDepositRow/PendingCheckDepositRow.vue";
import useCheckDeposits from "@/modules/transactions/hooks/useCheckDeposits";

const { checkDeposits } = useCheckDeposits({
  state: "App\\States\\CheckDepositStatus\\Pending",
});
</script>

<template>
  <AdminLayout>
    <div class="h-full flex-auto min-h-screen">
      <div class="mx-auto max-w-5xl grid gap-4 p-4 md:grid-cols-2">
        <PendingCheckDepositRow
          v-for="checkDeposit in checkDeposits"
          :key="checkDeposit.id"
          v-bind="{ checkDeposit }"
        />
      </div>
    </div>
  </AdminLayout>
</template>
