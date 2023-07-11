<script lang="ts" setup>
import { NAvatar, NCard, NScrollbar, useMessage } from 'naive-ui'
import { computed, ref } from 'vue'
import { useSettingStore } from '@/store'
import type { SettingsState } from '@/store/modules/settings/helper'
import { t } from '@/locales'

interface Props {
  scrollHeiht?: string
  roles: any[]
  category?: number | string
}

const props = withDefaults(defineProps<Props>(), {
  scrollHeiht: 'max-h-[360px]',
  roles: () => [],
})

const settingStore = useSettingStore()

const ms = useMessage()

function updateSettings(options: Partial<SettingsState>) {
  settingStore.updateSetting(options)
  ms.success(t('common.success'))
}

const activeClass = 'border-2 border-double border-yellow-400 rounded'
const activeId = ref(settingStore.id)

const selectRole = (role: any) => {
  activeId.value = role.id
  updateSettings({
    ...role,
  })
}

const filterRoles = computed(() => {
  const { roles, category } = props
  if (!category)
    return roles

  return roles.filter(item => `${item.Category}` === `${category}`)
})
</script>

<template>
  <NScrollbar class="w-full pr-4 justify-between" :class="scrollHeiht">
    <div
      v-for="item in filterRoles" :key="item.id" class="p-2 w-full lg:w-1/2 inline-block"
      @click="() => { selectRole(item) }"
    >
      <div :class="[item.id === activeId ? activeClass : '']" class="box-border">
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
    </div>
  </NScrollbar>
</template>
