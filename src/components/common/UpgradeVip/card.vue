<script setup lang="ts">
import { ref } from 'vue'
import PayQrcode from './payQrcode.vue'
const activedId = ref(2)

const handleSelect = (item: any) => {
  activedId.value = item.vipId
}

const cardList: any = ref([
  {
    vipId: 1,
    title: '体验会员',
    price: '￥5/天',
    priceNum: 5,
    desc: '有效期一天，不限速，不限次数',
  },
  {
    vipId: 2,
    title: '月度会员',
    price: '￥29/月',
    priceNum: 29,
    desc: '有效期一个月，不限速，不限次数',
  },
  {
    vipId: 3,
    title: '季度会员',
    price: '￥69/季度',
    priceNum: 69,
    desc: '有效期一个季度，不限速，不限次数',
  },
])
</script>

<template>
  <div class="card rounded-lg overflow-hidden">
    <div class="card-content">
      <div class="w-full p-6">
        <div class="card-bar flex items-center rounded-lg">
          <span class="ml-4 text-lg font-bold" style="color: #262841">
            Ai文字助手会员时间自购买会员成功日算起，体验会员从购买成功整点算起
          </span>
        </div>
      </div>
      <div class="w-full flex px-6 mb-4">
        <div class="flex-grow flex items-center justify-center flex-col">
          <img src="../../../assets/diamond.png" alt="" class="mb-2">
          <span class="block text-base" style="color: #f5b11e;">不限使用次数</span>
        </div>
        <div class="flex-grow flex items-center justify-center flex-col">
          <img src="../../../assets/diamond.png" alt="" class="mb-2">
          <span class="block text-base" style="color: #f5b11e;">不限使用时长</span>
        </div>
        <div class="flex-grow flex items-center justify-center flex-col">
          <img src="../../../assets/diamond.png" alt="" class="mb-2">
          <span class="block text-base" style="color: #f5b11e;">不限使用速率</span>
        </div>
        <div class="flex-grow flex items-center justify-center flex-col">
          <img src="../../../assets/diamond.png" alt="" class="mb-2">
          <span class="block text-base" style="color: #f5b11e;">Openai官方接口</span>
        </div>
      </div>
      <div class="h-full w-full mt-100 bg-white overflow-hidden p-6" style="border-radius: 50px 50px 0 0;height: 405px;">
        <div class="text-2xl font-bold" style="color: #262841;">
          VIP项目列表
        </div>
        <div class="w-full flex space-x-4 my-6">
          <div
            v-for="item in cardList"
            :key="item.vipId"
            class="flex-grow flex flex-col h-32 border border-gray-300 rounded cursor-pointer p-4"
            :class="[activedId === item.vipId ? 'actived-card' : '']"
            @click="() => { handleSelect(item) }"
          >
            <p class="text-xl font-bold" style="color:black">
              {{ item.title }}
            </p>
            <p class="text-xl font-bold my-2" style="color: #f5b11e;">
              {{ item.price }}
            </p>
            <p class="text-m" style="color: #a3a3a3;">
              {{ item.desc }}
            </p>
          </div>
        </div>
        <PayQrcode />
      </div>
    </div>
  </div>
</template>

<style lang="less">
@import url(./style.less);
</style>
