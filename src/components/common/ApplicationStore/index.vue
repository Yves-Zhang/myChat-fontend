<script lang="ts" setup>
import {
  NAutoComplete,
  NDrawer,
  NDrawerContent,
  NInput,
  NTabPane,
  NTabs,
} from 'naive-ui'
import type { Placement } from 'naive-ui/es/drawer/src/DrawerBodyWrapper'
import { computed, ref } from 'vue'
import { useBasicLayout } from '@/hooks/useBasicLayout'
import { RoleSelect } from '@/components/common'
import { useStore } from '@/store'

const props = defineProps<{
  width?: string | number
  placement?: Placement
}>()

interface Emit {
  (e: 'update:show', visible: boolean): void
}

const store = useStore()
const { placement } = props

const show = computed({
  get: () => store.showSettings,
  set: (visible: boolean) => {
    if (!visible)
      store.close()
  },
})

const { isMobile } = useBasicLayout()
const value = ref('')
const searchOptions = ref()
const renderOption = ref()

const handleEnter = () => {
}
</script>

<template>
  <NDrawer v-model:show="show" :placement="placement" class="w-full lg:w-2/5 md:w-1/2" style="width: none">
    <NDrawerContent closable>
      <template #header>
        <div class="flex w-full relative justify-between">
          <span v-if="!isMobile" class="flex gap-3 items-center justify-between">
            <span>
              <svg
                t="1688877004267" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="52299" width="26" height="26"
              >
                <path
                  d="M512 512m-447.93 0a447.93 447.93 0 1 0 895.86 0 447.93 447.93 0 1 0-895.86 0Z" fill="#69B452"
                  p-id="52300"
                />
                <path
                  d="M739.22 459.48H283.8a6 6 0 0 0-6 6.07v287.19a6 6 0 0 0 6 6.07h455.42a6 6 0 0 0 6-6.07V465.55a6 6 0 0 0-6-6.07z m-49.91 135.63a6 6 0 0 1-6 6H339.69a6 6 0 0 1-6-6v-83a6 6 0 0 1 6-6h343.64a6 6 0 0 1 6 6z"
                  fill="#D1F0C7" p-id="52301"
                />
                <path
                  d="M729.4 265.19H301.08a6 6 0 0 0-5.58 3.81c-9.5 24.73-61.64 145.2-61.64 182.38a69.53 69.53 0 0 0 139.07 0c0-0.94 0-1.87-0.06-2.8h0.23a69.71 69.71 0 0 0-0.14 4.35A69.53 69.53 0 1 0 512 453c0-1.46-0.05-2.91-0.14-4.35h0.28A69.71 69.71 0 0 0 512 453a69.53 69.53 0 1 0 139.07 0c0-1.46-0.05-2.91-0.14-4.35h0.23q-0.09 1.77-0.09 3.57a69.53 69.53 0 0 0 139.07 0c0-20.18-46.43-157.5-55.09-182.94a6 6 0 0 0-5.65-4.09z"
                  fill="#FFFFFF" p-id="52302"
                />
              </svg>
            </span>
            <span>
              应用商店
            </span>
          </span>

          <div class="mr-4">
            <NAutoComplete v-model:value="value" :options="searchOptions" :render-label="renderOption">
              <template #default="{ handleInput, handleBlur, handleFocus }">
                <NInput
                  ref="inputRef" v-model:value="value" type="text" placeholder="搜索应用" rows="1" @input="handleInput"
                  @focus="handleFocus" @blur="handleBlur" @keypress="handleEnter"
                />
              </template>
            </NAutoComplete>
          </div>
        </div>
      </template>
      <template #default>
        <div class="h-full">
          <NTabs type="line" animated class="h-full">
            <NTabPane name="oasis" tab="全部" class="h-full">
              <RoleSelect scroll-heiht="h-full" />
            </NTabPane>
            <NTabPane name="the beatles" tab="生活" class="h-full">
              <RoleSelect scroll-heiht="h-full" />
            </NTabPane>
            <NTabPane name="jay chou" tab="技术" class="h-full">
              <RoleSelect scroll-heiht="h-full" />
            </NTabPane>
          </NTabs>
        </div>
      </template>
      <!-- <template #footer>
        <NButton>Footer</NButton>
      </template> -->
    </NDrawerContent>
  </NDrawer>
</template>

<style>
@import url('./style.less');
</style>
