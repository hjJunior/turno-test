<script setup lang="ts">
import { FwbButton, FwbFileInput, FwbInput, FwbModal } from "flowbite-vue";
import { useVModel } from "@vueuse/core";
import { Field } from "vee-validate";
import useCheckDepositForm from "../hooks/useCheckDepositForm";

const props = defineProps<{ modelValue: boolean }>();
const emit = defineEmits(["update:modelValue"]);

const isOpen = useVModel(props, "modelValue", emit);

const { onSubmit, isSubmitting } = useCheckDepositForm(
  () => (isOpen.value = false)
);
</script>

<template>
  <FwbModal
    v-if="isOpen"
    @close="isOpen = false"
    not-escapable
    persistent
    data-testid="new-check-deposit-modal"
  >
    <template #header>
      <div class="flex items-center text-lg">New Check Deposit</div>
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
            <template #helper>
              <span class="text-xs">
                * The money will be deposited in your account once the check is
                accepted.
              </span>
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
        <Field name="picture" v-slot="{ field, errorMessage }">
          <div>
            <label
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              File
            </label>
            <FwbFileInput
              v-model="field.value"
              @update:model-value="field.onChange"
              dropzone
            />
            <span v-if="errorMessage" class="text-red-500">
              {{ errorMessage }}
            </span>
          </div>
        </Field>
        <div class="grid mt-2">
          <FwbButton
            type="submit"
            color="green"
            :disabled="isSubmitting"
            :loading="isSubmitting"
          >
            Submit Check Deposit to review
          </FwbButton>
        </div>
      </form>
    </template>
  </FwbModal>
</template>
