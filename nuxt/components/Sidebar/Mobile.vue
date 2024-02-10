<template>
  <!-- Mobile Sidebar -->
  <TransitionRoot as="template" :show="sidebarOpen">
    <Dialog
      as="div"
      class="relative z-50 xl:hidden"
      @close="emit('closeSidebar')"
    >
      <TransitionChild
        as="template"
        enter="transition-opacity ease-linear duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-primary-focus" />
      </TransitionChild>

      <div class="fixed inset-0 flex">
        <TransitionChild
          as="template"
          enter="transition ease-in-out duration-300 transform"
          enter-from="-translate-x-full"
          enter-to="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leave-from="translate-x-0"
          leave-to="-translate-x-full"
        >
          <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
            <TransitionChild
              as="template"
              enter="ease-in-out duration-300"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="ease-in-out duration-300"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <div
                class="absolute left-full top-0 flex w-16 justify-center pt-5"
              >
                <button
                  type="button"
                  class="-m-2.5 p-2.5"
                  @click="emit('closeSidebar')"
                >
                  <span class="sr-only">Close sidebar</span>
                  <XMarkIcon class="h-6 w-6 text-neutral" aria-hidden="true" />
                </button>
              </div>
            </TransitionChild>
            <SidebarBody :classes="classes" :userAuthor="userAuthor" />
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
<script setup>
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";

const props = defineProps({
  classes: Object,
  userAuthor: Object,
  sidebarOpen: Boolean,
});

const emit = defineEmits(["closeSidebar"]);
</script>