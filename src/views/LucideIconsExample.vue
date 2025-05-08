<template>
  <div class="p-4">
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
      <div
        v-for="icon in icons"
        :key="icon.name"
        class="flex flex-col items-center p-4 border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow">
        <component :is="icon.component" class="w-12 h-12 text-indigo-600 mb-2" />
        <span class="text-sm text-gray-700">{{ icon.name }}</span>
      </div>
    </div>

    <div class="mt-8 p-6 bg-gray-50 border border-gray-300 rounded-lg">
      <h2 class="text-2xl font-semibold mb-4 text-gray-700">自定义图标</h2>
      <div class="flex items-center space-x-4">
        <AlarmCheck :size="48" color="green" :stroke-width="3" />
        <Accessibility :size="32" color="purple" class="bg-yellow-200 p-2 rounded-full" />
        <Activity :size="24" class="text-red-500 animate-pulse" />
      </div>
      <p class="mt-4 text-sm text-gray-600">
        Lucide 图标可以通过 props (如 <code>size</code>, <code>color</code>, <code>stroke-width</code>) 和 CSS 类进行自定义。
      </p>
    </div>
  </div>
</template>

<script setup>
import { AlarmCheck, Accessibility, Activity, Airplay, AlignCenter, Aperture, AppWindow, Archive } from 'lucide-vue-next'

const icons = [
  { name: 'AlarmCheck', component: AlarmCheck },
  { name: 'Accessibility', component: Accessibility },
  { name: 'Activity', component: Activity },
  { name: 'Airplay', component: Airplay },
  { name: 'AlignCenter', component: AlignCenter },
  { name: 'Aperture', component: Aperture },
  { name: 'AppWindow', component: AppWindow },
  { name: 'Archive', component: Archive }
]
</script>

<style scoped>
/* Komponenttikohtaiset tyylit */
.animate-pulse {
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
