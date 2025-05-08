<template>
  <!-- 主内容区 -->
  <main class="flex-1 p-8 overflow-y-auto">
    <!-- 状态概览卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-slate-500 text-sm font-medium">总节点数</h3>
          <div class="p-2 bg-emerald-50 rounded-lg">
            <ServerIcon class="w-5 h-5 text-emerald-500" />
          </div>
        </div>
        <div class="flex items-baseline">
          <span class="text-2xl font-bold text-slate-800">2,250</span>
          <span class="ml-2 text-sm text-slate-500">台</span>
        </div>
      </div>

      <div class="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-slate-500 text-sm font-medium">活跃告警</h3>
          <div class="p-2 bg-rose-50 rounded-lg">
            <CircleAlertIcon class="w-5 h-5 text-rose-500" />
          </div>
        </div>
        <div class="flex items-baseline">
          <span class="text-2xl font-bold text-slate-800">23</span>
          <span class="ml-2 text-sm text-rose-500">↑4.3%</span>
        </div>
      </div>

      <div class="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-slate-500 text-sm font-medium">待处理任务</h3>
          <div class="p-2 bg-amber-50 rounded-lg">
            <ClipboardListIcon class="w-5 h-5 text-amber-500" />
          </div>
        </div>
        <div class="flex items-baseline">
          <span class="text-2xl font-bold text-slate-800">12</span>
          <span class="ml-2 text-sm text-slate-500">个</span>
        </div>
      </div>

      <div class="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-slate-500 text-sm font-medium">平均修复时间</h3>
          <div class="p-2 bg-blue-50 rounded-lg">
            <ClockIcon class="w-5 h-5 text-blue-500" />
          </div>
        </div>
        <div class="flex items-baseline">
          <span class="text-2xl font-bold text-slate-800">18.5</span>
          <span class="ml-2 text-sm text-emerald-500">↓12.5%</span>
        </div>
      </div>
    </div>

    <!-- 主要内容区域 -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- 实时监控 -->
      <div class="lg:col-span-2">
        <div class="bg-white rounded-xl p-6 shadow-sm border border-slate-200 h-[400px]">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-lg font-semibold text-slate-800">实时监控</h2>
            <button class="text-sm text-primary-600 hover:text-primary-700">查看全部</button>
          </div>
          <div class="space-y-4">
            <div class="flex items-center p-4 bg-slate-50 rounded-lg">
              <TriangleAlertIcon class="w-5 h-5 text-amber-500 mr-3" />
              <div class="flex-1">
                <h4 class="text-sm font-medium text-slate-800">计算节点 GPU 利用率异常</h4>
                <p class="text-xs text-slate-500 mt-1">节点ID: NODE_12345 - 2分钟前</p>
              </div>
              <span class="px-2.5 py-1 text-xs font-medium bg-amber-100 text-amber-600 rounded-full">待处理</span>
            </div>

            <div class="flex items-center p-4 bg-slate-50 rounded-lg">
              <CircleOffIcon class="w-5 h-5 text-rose-500 mr-3" />
              <div class="flex-1">
                <h4 class="text-sm font-medium text-slate-800">存储节点连接中断</h4>
                <p class="text-xs text-slate-500 mt-1">节点ID: NODE_78901 - 15分钟前</p>
              </div>
              <span class="px-2.5 py-1 text-xs font-medium bg-rose-100 text-rose-600 rounded-full">紧急</span>
            </div>

            <div class="flex items-center p-4 bg-slate-50 rounded-lg">
              <CircleAlertIcon class="w-5 h-5 text-blue-500 mr-3" />
              <div class="flex-1">
                <h4 class="text-sm font-medium text-slate-800">网络带宽接近阈值</h4>
                <p class="text-xs text-slate-500 mt-1">节点ID: NODE_35789 - 30分钟前</p>
              </div>
              <span class="px-2.5 py-1 text-xs font-medium bg-blue-100 text-blue-600 rounded-full">观察中</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 任务处理 -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded-xl p-6 shadow-sm border border-slate-200 h-[400px]">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-lg font-semibold text-slate-800">诊断任务</h2>
            <button class="text-sm text-primary-600 hover:text-primary-700">查看全部</button>
          </div>
          <div class="space-y-4">
            <div class="relative pt-1">
              <div class="flex items-center justify-between mb-2">
                <div>
                  <span class="text-xs font-semibold inline-block text-slate-800">自动诊断中</span>
                </div>
                <div class="text-right">
                  <span class="text-xs font-semibold inline-block text-slate-800">30%</span>
                </div>
              </div>
              <div class="overflow-hidden h-2 text-xs flex rounded bg-primary-100">
                <div class="w-[30%] shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-500"></div>
              </div>
            </div>

            <div class="space-y-3 mt-6">
              <div class="flex items-center py-3 border-b border-slate-100">
                <div class="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
                <span class="text-sm text-slate-600 flex-1">GPU驱动诊断</span>
                <span class="text-sm text-slate-400">2分钟前</span>
              </div>
              <div class="flex items-center py-3 border-b border-slate-100">
                <div class="w-2 h-2 bg-primary-400 rounded-full mr-3"></div>
                <span class="text-sm text-slate-600 flex-1">内存使用分析</span>
                <span class="text-sm text-slate-400">5分钟前</span>
              </div>
              <div class="flex items-center py-3 border-b border-slate-100">
                <div class="w-2 h-2 bg-slate-400 rounded-full mr-3"></div>
                <span class="text-sm text-slate-600 flex-1">网络连接检查</span>
                <span class="text-sm text-slate-400">12分钟前</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup>
import { SearchIcon, BellIcon, ServerIcon, CircleAlertIcon, ClipboardListIcon, ClockIcon, TriangleAlertIcon, CircleOffIcon } from 'lucide-vue-next'
</script>
