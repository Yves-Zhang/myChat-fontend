<script lang="ts" setup>
import { NAvatar, NCard, NScrollbar, useMessage } from 'naive-ui'
import { ref } from 'vue'
import { useSettingStore } from '@/store'
import type { SettingsState } from '@/store/modules/settings/helper'
import { t } from '@/locales'

const settingStore = useSettingStore()

const ms = useMessage()

const roles = ref((window as any).roles.roles ?? [])

function updateSettings(options: Partial<SettingsState>) {
  settingStore.updateSetting(options)
  ms.success(t('common.success'))
}

// function handleReset() {
//   settingStore.resetSetting()
//   ms.success(t('common.success'))
//   window.location.reload()
// }

const activeClass = 'border-2 border-double border-yellow-400'
const activeId = ref(settingStore.id)

const selectRole = (role: any) => {
  activeId.value = role.id
  updateSettings({
    ...role,
  })
}
</script>

<template>
  <NScrollbar class="max-h-[360px] pr-4">
    <div
      v-for="item in roles " :key="item.id" class="mt-2" :class="[item.id === activeId ? activeClass : '']"
      @click="() => { selectRole(item) }"
    >
      <NCard hoverable class="cursor-pointer">
        <div class="flex items-center">
          <div class="flex-1">
            <p class="text-l font-bold">
              {{ item.role }}
            </p>
            <p>{{ item.description }}</p>
          </div>
          <div class="ml-4">
            <NAvatar round :size="48" :src="item.logo" />
          </div>
        </div>
      </NCard>
    </div>
  </NScrollbar>
</template>
