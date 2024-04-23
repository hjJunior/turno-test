<script setup lang="ts">
import CheckDeposit from "@/modules/transactions/models/checkDeposit";
import { FwbButton } from "flowbite-vue";
import useRejectCheckDeposit from "../../hooks/useRejectCheckDeposit";

const props = defineProps<{ checkDeposit: CheckDeposit }>();

const { onRejectClick, isPending } = useRejectCheckDeposit(props.checkDeposit);
</script>

<template>
  <FwbButton
    pill
    color="red"
    size="xs"
    @click="onRejectClick"
    :disabled="isPending"
    :loading="isPending"
  >
    Reject
  </FwbButton>
</template>
