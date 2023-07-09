<script setup lang='ts'>
import type { CSSProperties } from 'vue'
import { computed, ref, watch } from 'vue'
import { NButton, NLayoutSider } from 'naive-ui'
import List from './List.vue'
import Footer from './Footer.vue'
import { useAppStore, useChatStore } from '@/store'
import { useBasicLayout } from '@/hooks/useBasicLayout'
import { PromptStore } from '@/components/common'

const appStore = useAppStore()
const chatStore = useChatStore()

const { isMobile } = useBasicLayout()
const show = ref(false)

const collapsed = computed(() => appStore.siderCollapsed)

function handleAdd() {
  chatStore.addHistory({ title: 'New Chat', uuid: Date.now(), isEdit: false })
  if (isMobile.value)
    appStore.setSiderCollapsed(true)
}

function handleUpdateCollapsed() {
  appStore.setSiderCollapsed(!collapsed.value)
}

const getMobileClass = computed<CSSProperties>(() => {
  if (isMobile.value) {
    return {
      position: 'fixed',
      zIndex: 50,
    }
  }
  return {}
})

const mobileSafeArea = computed(() => {
  if (isMobile.value) {
    return {
      paddingBottom: 'env(safe-area-inset-bottom)',
    }
  }
  return {}
})

watch(
  isMobile,
  (val) => {
    appStore.setSiderCollapsed(val)
  },
  {
    immediate: true,
    flush: 'post',
  },
)
</script>

<template>
  <NLayoutSider
    :collapsed="collapsed" :collapsed-width="0" :width="260" :show-trigger="isMobile ? false : 'bar'"
    collapse-mode="transform" position="absolute" bordered :style="getMobileClass"
    @update-collapsed="handleUpdateCollapsed"
  >
    <div class="flex flex-col h-full pb-34" :style="mobileSafeArea">
      <main class="flex flex-col flex-1 min-h-0">
        <div class="p-4">
          <NButton block @click="handleAdd">
            <svg
              t="1688867198833" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="18528" width="20" height="20"
            >
              <path
                d="M158 236.9v549.7h706.8V236.9H158zM682.2 541H540.6v141.6h-58.5V541H340.5v-58.5h141.6V340.9h58.5v141.6h141.6V541z"
                fill="#18a058" p-id="18529"
              />
            </svg>
            <span class="ml-2">
              {{ $t('chat.newChatButton') }}
            </span>
          </NButton>
        </div>
        <div class="flex-1 min-h-0 pb-4 overflow-hidden">
          <List />
        </div>
        <div class="p-4">
          <NButton block @click="show = true">
            <svg
              t="1688877004267" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="52299" width="20" height="20"
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
            <span class="ml-2">
              {{ $t('store.siderButton') }}
            </span>
          </NButton>
        </div>
      </main>
      <Footer />
    </div>
  </NLayoutSider>
  <template v-if="isMobile">
    <div v-show="!collapsed" class="fixed inset-0 z-40 w-full h-full bg-black/40" @click="handleUpdateCollapsed" />
  </template>
  <PromptStore v-model:visible="show" />
</template>
