<script setup lang="ts">
import CheckDeposit from "@/modules/transactions/models/checkDeposit";
import RejectButton from "./RejectButton.vue";
import ApproveButton from "./ApproveButton.vue";

defineProps<{ checkDeposit: CheckDeposit }>();
</script>

<template>
  <div
    class="bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 w-full"
  >
    <div class="p-3 w-full flex justify-between items-center border-b">
      <div class="text-sm text-gray-500">
        <span>{{ checkDeposit.user.name }}</span> -
        <b>{{ checkDeposit.amountFormated }}</b>
      </div>
      <div class="flex gap-2">
        <RejectButton v-bind="{ checkDeposit }" />
        <ApproveButton v-bind="{ checkDeposit }" />
      </div>
    </div>
    <div class="p-3 flex items-center justify-center">
      <img :src="checkDeposit.picture" class="w-full object-scale-down" />
    </div>
  </div>
</template>
