<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { NCheckbox } from 'naive-ui'

const QRCode = (window as any).QRCode

// 定义响应式数据
const text = ref('https://www.example.com/')

// 定义 ref
const codeRf = ref(null)

const value = ref(true)

onMounted(() => {
  const qrcode = new QRCode(codeRf.value, {
    text,
    width: 256,
    height: 256,
    colorDark: '#000000',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H,
  })
  qrcode.makeCode(text.value)
})
</script>

<template>
  <div class="w-full my-6">
    <div class="w-auto flex justify-center">
      <div class="flex">
        <div class="mx-2">
          <div ref="codeRf" class="w-36 h-36" />
        </div>
        <div class="mx-2 py-2" style="color: #a3a3a3">
          <img class="inline" width="40" height="40" src="../../../assets/wepay.png" alt=""><span
            class="ml-2 text-lg"
          >微信扫码支付</span>
          <p class="text-base mt-1">
            支付金额: <span class="text-2xl" style="color:#f5b11e">￥29</span>
          </p>
          <p class="text-base mt-1">
            支付剩余时间: <span style="color:#ff0000">30:00</span>
          </p>
          <div class="mt-1">
            <NCheckbox :checked="value" />
            <span class="text-base mt-1">
              开通会员代表您接受 <span style="color:#ff0000">《订阅会员协议》</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
