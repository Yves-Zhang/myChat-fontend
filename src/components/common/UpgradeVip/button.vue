<script lang="ts" setup>
import { computed, ref } from 'vue'
import { NModal, useMessage } from 'naive-ui'
import Card from './card.vue'
import VipLogo from '@/components/common/VipLogo.vue'
import { useUserStore } from '@/store'

const userStore = useUserStore()

const message = useMessage()

const userInfo = computed(() => userStore.userInfo)

const show = ref(false)
const openModal = () => {
  message.error('功能维护中，暂未开放')

  // show.value = true
}
</script>

<template>
  <span class="cursor-pointer hover:opacity-80" @click="openModal">
    <VipLogo :is-vip="userInfo.isVip" class="inline" /><span class="text-[#FFD700] ml-2">{{
      userInfo.isVip
        ? '续费' : '升级VIP ' }}</span>
  </span>
  <NModal v-model:show="show" :auto-focus="false" style="width: 1000px; max-width: 640px, height: 600px">
    <Card />
  </NModal>
</template>
