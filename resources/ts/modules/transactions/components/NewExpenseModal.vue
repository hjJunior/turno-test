<script setup lang="ts">
import { FwbButton, FwbInput, FwbModal } from "flowbite-vue";
import { useVModel } from "@vueuse/core";
import { Field } from "vee-validate";
import useExpenseForm from "../hooks/useExpenseForm";

const props = defineProps<{ modelValue: boolean }>();
const emit = defineEmits(["update:modelValue"]);

const isOpen = useVModel(props, "modelValue", emit);

const { onSubmit, isSubmitting } = useExpenseForm(() => (isOpen.value = false));
</script>

<template>
  <FwbModal
    v-if="isOpen"
    @close="isOpen = false"
    not-escapable
    persistent
    data-testid="new-expense-modal"
  >
    <template #header>
      <div class="flex items-center text-lg">New Expense</div>
      <button
        @click="isOpen = false"
        class="flex text-gray-500 hover:text-black"
      >
        <span class="icon-[mdi--close] w-6 h-6" />
      </button>
    </template>
    <template #body>
      <form @submit.prevent="onSubmit" class="grid gap-2">
        <Field name="amount" v-slot="{ field, errorMessage }">
          <FwbInput
            v-bind="field"
            label="Amount"
            aria-label="Amount"
            placeholder="$0.00"
            :validation-status="errorMessage ? 'error' : undefined"
          >
            <template #validationMessage>
              {{ errorMessage }}
            </template>
          </FwbInput>
        </Field>
        <Field name="description" v-slot="{ field, errorMessage }">
          <FwbInput
            v-bind="field"
            label="Description"
            aria-label="Description"
            placeholder="Eg. Grandma's gift"
            :validation-status="errorMessage ? 'error' : undefined"
          >
            <template #validationMessage>
              {{ errorMessage }}
            </template>
          </FwbInput>
        </Field>
        <div class="flex mt-2 justify-end">
          <FwbButton
            type="submit"
            color="green"
            :disabled="isSubmitting"
            :loading="isSubmitting"
          >
            Create
          </FwbButton>
        </div>
      </form>
    </template>
  </FwbModal>
</template>
