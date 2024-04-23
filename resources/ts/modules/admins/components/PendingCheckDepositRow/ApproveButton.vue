<script setup lang="ts">
import CheckDeposit from "@/modules/transactions/models/checkDeposit";
import { FwbButton } from "flowbite-vue";
import useApproveCheckDeposit from "../../hooks/useApproveCheckDeposit";

const props = defineProps<{ checkDeposit: CheckDeposit }>();

const { onApproveClick, isPending } = useApproveCheckDeposit(
  props.checkDeposit
);
</script>

<template>
  <FwbButton
    pill
    size="xs"
    @click="onApproveClick"
    :disabled="isPending"
    :loading="isPending"
  >
    Approve
  </FwbButton>
</template>
