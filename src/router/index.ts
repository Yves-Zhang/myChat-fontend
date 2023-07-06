import type { App } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import { setupPageGuard } from './permission'
import Home from '@/views/home/index.vue'
import { ChatLayout, ChatLayout_1 } from '@/components/common/layout'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/chat',
    children: [
      {
        path: '/chat',
        name: 'chat',
        component: ChatLayout,
        redirect: '/chatGpt',
        children: [
          {
            path: '/chatGpt/:uuid?',
            name: 'chatGpt',
            component: () => import('@/views/chat/index.vue'),
          },
        ],
      },
      {
        path: '/voiceChat',
        name: 'voiceChat',
        component: ChatLayout_1,
        redirect: '/chatGptForVoice',
        children: [
          {
            path: '/chatGptForVoice/:uuid?',
            name: 'chatGptForVoice',
            component: () => import('@/views/voiceChat/index.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/exception/404/index.vue'),
  },

  {
    path: '/500',
    name: '500',
    component: () => import('@/views/exception/500/index.vue'),
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    redirect: '/404',
  },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

setupPageGuard(router)

export async function setupRouter(app: App) {
  app.use(router)
  await router.isReady()
}
