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
import { Transactionable } from "../models/transaction";

const props = defineProps<{ transactionable: Transactionable }>();
const iconClasses = computed(() => {
  const { icon, iconColor } = props.transactionable;

  return [icon, iconColor];
});
</script>

<template>
  <FwbTimelineItem>
    <FwbTimelinePoint :class="[transactionable.iconBg]">
      <span class="w-3 h-3" :class="iconClasses" />
    </FwbTimelinePoint>
    <FwbTimelineContent>
      <FwbTimelineTime> {{ transactionable.dateFormated }} </FwbTimelineTime>
      <FwbTimelineTitle>{{ transactionable.amountFormated }}</FwbTimelineTitle>
      <FwbTimelineBody>{{ transactionable.description }}</FwbTimelineBody>
    </FwbTimelineContent>
  </FwbTimelineItem>
</template>
