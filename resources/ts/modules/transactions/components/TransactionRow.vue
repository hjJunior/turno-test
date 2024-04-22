<script setup lang="ts">
import {
  FwbTimelineBody,
  FwbTimelineContent,
  FwbTimelineItem,
  FwbTimelinePoint,
  FwbTimelineTime,
  FwbTimelineTitle,
} from "flowbite-vue";
import { computed } from "vue";
import Transaction from "../models/transaction";

const props = defineProps<{ transaction: Transaction }>();
const transactionable = computed(() => props.transaction.getTransactionable());
const iconClasses = computed(() => {
  const { value } = transactionable;

  return [value.icon, value.iconColor];
});
</script>

<template>
  <FwbTimelineItem>
    <FwbTimelinePoint :class="[transactionable.iconBg]">
      <span class="w-3 h-3" :class="iconClasses" />
    </FwbTimelinePoint>
    <FwbTimelineContent>
      <FwbTimelineTime> {{ transaction.dateFormated }} </FwbTimelineTime>
      <FwbTimelineTitle>{{ transaction.amountFormated }}</FwbTimelineTitle>
      <FwbTimelineBody>{{ transaction.description }}</FwbTimelineBody>
    </FwbTimelineContent>
  </FwbTimelineItem>
</template>
