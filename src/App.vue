<template>
  <div>
    <nav class="bg-gray-800">
      <div class="max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0 flex items-center">
              <img class="w-8 h-8" src="/img/logos/workflow-mark-on-dark.svg" alt="Workflow logo" />
              <div class="ml-2 flex flex-col">
                <span class="text-white text-[26px] font-semibold">智能运维平台</span>
                <span class="text-xs text-gray-300">算力云故障诊断与修复系统</span>
              </div>
            </div>
            <div class="hidden md:block">
              <div class="flex items-baseline ml-10">
                <router-link v-for="(link, i) in links" :key="i" :to="link.to" custom v-slot="{ navigate, href, isExactActive }">
                  <a
                    :href="href"
                    @click="navigate"
                    class="px-3 py-2 text-sm font-medium rounded-md"
                    :class="[
                      isExactActive
                        ? 'text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700'
                        : 'text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700',
                      i > 0 && 'ml-4'
                    ]">
                    {{ link.text }}
                  </a>
                </router-link>
              </div>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="flex items-center ml-4 md:ml-6">
              <button
                class="p-1 text-gray-400 border-2 border-transparent rounded-full hover:text-white focus:outline-none focus:text-white focus:bg-gray-700"
                aria-label="Notifications">
                <svg class="w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>

              <!-- Profile dropdown -->
              <div class="relative ml-3">
                <div>
                  <button
                    class="flex items-center max-w-xs text-sm text-white rounded-full focus:outline-none focus:shadow-solid"
                    id="user-menu"
                    aria-label="User menu"
                    aria-haspopup="true"
                    @click="showProfileMenu = !showProfileMenu">
                    <div class="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                      <UserRound class="w-6 h-6 text-white" />
                    </div>
                  </button>
                </div>

                <transition
                  enter-active-class="transition duration-100 ease-out"
                  enter-from-class="transform scale-95 opacity-0"
                  enter-to-class="transform scale-100 opacity-100"
                  leave-active-class="transition duration-75 ease-in"
                  leave-from-class="transform scale-100 opacity-100"
                  leave-to-class="transform scale-95 opacity-0">
                  <div v-if="showProfileMenu" class="absolute right-0 w-48 mt-2 origin-top-right rounded-md shadow-lg z-50">
                    <div
                      class="py-1 bg-white rounded-md ring-1 ring-black ring-opacity-5"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu">
                      <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem"> 个人资料 </a>
                      <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem"> 设置 </a>
                      <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem"> 退出系统 </a>
                    </div>
                  </div>
                </transition>
              </div>
            </div>
          </div>

          <div class="flex -mr-2 md:hidden">
            <!-- Mobile menu button -->
            <button
              class="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
              @click="showMenu = !showMenu">
              <!-- Menu open: "hidden", Menu closed: "block" -->
              <svg class="block w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <!-- Menu open: "block", Menu closed: "hidden" -->
              <svg class="hidden w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!--
      Mobile menu, toggle classes based on menu state.

      Open: "block", closed: "hidden"
      -->
      <div class="md:hidden" :class="showMenu ? 'block' : 'hidden'">
        <div class="px-2 pt-2 pb-3 sm:px-3">
          <router-link v-for="(link, i) in links" :key="i" :to="link.to" custom v-slot="{ navigate, href, isExactActive }">
            <a
              :href="href"
              @click="navigate().then(() => (showMenu = false))"
              class="block px-3 py-2 text-base font-medium rounded-md"
              :class="[
                isExactActive
                  ? 'text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700',
                i > 0 && 'mt-1'
              ]">
              {{ link.text }}
            </a>
          </router-link>
        </div>
        <div class="pt-4 pb-3 border-t border-gray-700">
          <div class="flex items-center px-5">
            <div class="flex-shrink-0">
              <div class="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
                <UserRound class="w-8 h-8 text-white" />
              </div>
            </div>
            <div class="ml-3">
              <div class="text-base font-medium leading-none text-white">Tom Cook</div>
              <div class="mt-1 text-sm font-medium leading-none text-gray-400">tom@example.com</div>
            </div>
          </div>
          <div class="px-2 mt-3">
            <a
              href="#"
              class="block px-3 py-2 text-base font-medium text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">
              个人资料
            </a>
            <a
              href="#"
              class="block px-3 py-2 mt-1 text-base font-medium text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">
              设置
            </a>
            <a
              href="#"
              class="block px-3 py-2 mt-1 text-base font-medium text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">
              退出系统
            </a>
          </div>
        </div>
      </div>
    </nav>

    <header class="bg-white shadow" v-if="$route.meta.title">
      <div class="max-w-screen-xl px-4 py-6 mx-auto sm:px-6 lg:px-8 flex justify-between items-center">
        <div class="ml-2 flex flex-col">
          <h1 class="text-3xl font-bold leading-tight text-gray-900">
            {{ $route.meta.title }}
          </h1>
          <p v-if="$route.meta.comment" class="text-slate-500 mt-1">{{ $route.meta.comment }}</p>
        </div>
        <div class="relative">
          <input
            type="text"
            placeholder="搜索..."
            class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:w-64" />
          <SearchIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
      </div>
    </header>

    <div class="max-w-screen-xl mx-auto sm:px-6 lg:px-8">
      <router-view />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { SearchIcon, UserRound } from 'lucide-vue-next'

export default defineComponent({
  components: {
    SearchIcon,
    UserRound
  },
  data: () => ({
    showMenu: false,
    showProfileMenu: false,
    links: [
      { text: '控制台', to: '/' },
      { text: '工单列表', to: '/issues' },
      { text: '运维知识库', to: '/gantt' },
      { text: '脚本库', to: '/lucide-icons-example' }
    ]
  })
})
</script>
