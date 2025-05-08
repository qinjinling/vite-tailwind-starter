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

    <!-- 筛选与控制栏 -->
    <div class="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3 sm:gap-4">
      <div class="flex items-center space-x-2 sm:space-x-3">
        <div class="relative dropdown">
          <button
            @click.stop="toggleDateDropdown"
            class="flex items-center bg-white text-slate-700 px-3 sm:px-4 py-2 border border-slate-300 rounded-md shadow-sm hover:bg-slate-50 text-sm shrink-0">
            <CalendarDaysIcon class="w-4 h-4 mr-1.5 sm:mr-2 text-slate-500" />
            {{ selectedDateRange }}
          </button>
          <div v-if="isDateDropdownOpen" class="absolute top-full left-0 mt-1 w-40 bg-white border border-slate-200 rounded-md shadow-lg z-10">
            <div class="py-1">
              <button
                v-for="option in dateRangeOptions"
                :key="option.value"
                @click="selectDateRange(option)"
                class="block w-full text-left px-4 py-2 text-sm hover:bg-slate-100">
                {{ option.label }}
              </button>
            </div>
          </div>
        </div>
        <div class="relative dropdown">
          <button
            @click.stop="toggleFilterDropdown"
            class="flex items-center bg-white text-slate-700 px-3 sm:px-4 py-2 border border-slate-300 rounded-md shadow-sm hover:bg-slate-50 text-sm shrink-0">
            <FilterIcon class="w-4 h-4 mr-1.5 sm:mr-2 text-slate-500" />
            筛选
          </button>
          <div v-if="isFilterDropdownOpen" class="absolute top-full left-0 mt-1 w-40 bg-white border border-slate-200 rounded-md shadow-lg z-10">
            <div class="py-1">
              <button
                v-for="option in filterOptions"
                :key="option.value"
                @click="selectFilter(option)"
                class="block w-full text-left px-4 py-2 text-sm hover:bg-slate-100">
                {{ option.label }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center space-x-2 sm:space-x-3">
        <button
          class="p-2.5 text-slate-500 hover:text-primary-600 bg-white border border-slate-300 rounded-md shadow-sm hover:bg-slate-50 shrink-0">
          <RefreshCwIcon class="w-4 h-4" />
        </button>
        <button
          class="p-2.5 text-slate-500 hover:text-primary-600 bg-white border border-slate-300 rounded-md shadow-sm hover:bg-slate-50 shrink-0">
          <Maximize2Icon class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- 统计卡片区域 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <!-- 故障分析统计 -->
      <div class="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
        <div class="flex justify-between items-center mb-1">
          <h2 class="text-lg font-semibold text-slate-800">故障分析统计</h2>
          <span class="text-xs text-slate-400">更新于 10 分钟前</span>
        </div>
        <p class="text-sm text-slate-600 mb-4">故障类型分布</p>
        <div class="h-60 sm:h-72" ref="faultAnalysisChart"></div>
      </div>

      <!-- 维修情况统计 -->
      <div class="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
        <div class="flex justify-between items-center mb-1">
          <h2 class="text-lg font-semibold text-slate-800">维修情况统计</h2>
          <span class="text-xs text-slate-400">更新于 10 分钟前</span>
        </div>
        <p class="text-sm text-slate-600 mb-4">维修任务完成情况</p>
        <div class="h-60 sm:h-72" ref="repairStatChart"></div>
      </div>
    </div>
  </main>
</template>
<script setup>
import {
  ServerIcon,
  CircleAlertIcon,
  ClipboardListIcon,
  ClockIcon,
  CalendarDaysIcon,
  FilterIcon,
  RefreshCwIcon,
  Maximize2Icon
} from 'lucide-vue-next'
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import * as echarts from 'echarts'

// 日期范围下拉菜单状态
const isDateDropdownOpen = ref(false)
const selectedDateRange = ref('最近 30 天')
const dateRangeOptions = [
  { label: '最近 30 天', value: '30days' },
  { label: '最近 3 个月', value: '3months' },
  { label: '最近半年', value: '6months' },
  { label: '最近一年', value: '1year' }
]

// 筛选下拉菜单状态
const isFilterDropdownOpen = ref(false)
const filterOptions = [
  { label: '全部', value: 'all' },
  { label: '已完成', value: 'completed' },
  { label: '进行中', value: 'in-progress' },
  { label: '待处理', value: 'pending' }
]

// 日期下拉菜单切换
const toggleDateDropdown = () => {
  isDateDropdownOpen.value = !isDateDropdownOpen.value
  if (isDateDropdownOpen.value) {
    isFilterDropdownOpen.value = false
  }
}

// 筛选下拉菜单切换
const toggleFilterDropdown = () => {
  isFilterDropdownOpen.value = !isFilterDropdownOpen.value
  if (isFilterDropdownOpen.value) {
    isDateDropdownOpen.value = false
  }
}

// 选择日期范围
const selectDateRange = (option) => {
  selectedDateRange.value = option.label
  isDateDropdownOpen.value = false
}

// 选择筛选选项
const selectFilter = (option) => {
  console.log('选择筛选:', option.label)
  isFilterDropdownOpen.value = false
}

// 点击外部关闭下拉菜单
const closeDropdowns = (e) => {
  // 如果点击的不是下拉菜单内的元素，则关闭所有下拉菜单
  if (!e.target.closest('.dropdown')) {
    isDateDropdownOpen.value = false
    isFilterDropdownOpen.value = false
  }
}

// 图表引用
const faultAnalysisChart = ref(null)
const repairStatChart = ref(null)

// 图表实例
let faultChart = null
let repairChart = null

// 初始化故障分析饼图
const initFaultAnalysisChart = () => {
  if (!faultAnalysisChart.value) return

  faultChart = echarts.init(faultAnalysisChart.value)

  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 'center',
      data: ['硬件故障', '软件故障', '网络问题', '操作失误', '其他原因']
    },
    color: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'],
    series: [
      {
        name: '故障类型',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['30%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 8,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 16,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 35, name: '硬件故障' },
          { value: 28, name: '软件故障' },
          { value: 22, name: '网络问题' },
          { value: 10, name: '操作失误' },
          { value: 5, name: '其他原因' }
        ]
      }
    ]
  }

  faultChart.setOption(option)
}

// 初始化维修情况柱状图
const initRepairStatChart = () => {
  if (!repairStatChart.value) return

  repairChart = echarts.init(repairStatChart.value)

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['已完成', '进行中', '待处理']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: ['一月', '二月', '三月', '四月', '五月', '六月']
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '任务数'
      }
    ],
    color: ['#10b981', '#3b82f6', '#f59e0b'],
    series: [
      {
        name: '已完成',
        type: 'bar',
        stack: '维修任务',
        emphasis: {
          focus: 'series'
        },
        data: [35, 42, 36, 40, 45, 38]
      },
      {
        name: '进行中',
        type: 'bar',
        stack: '维修任务',
        emphasis: {
          focus: 'series'
        },
        data: [12, 15, 10, 8, 6, 9]
      },
      {
        name: '待处理',
        type: 'bar',
        stack: '维修任务',
        emphasis: {
          focus: 'series'
        },
        data: [5, 8, 6, 4, 3, 6]
      }
    ]
  }

  repairChart.setOption(option)
}

// 处理窗口大小变化
const handleResize = () => {
  faultChart && faultChart.resize()
  repairChart && repairChart.resize()
}

// 添加全局点击事件监听
onMounted(async () => {
  document.addEventListener('click', closeDropdowns, true)

  // 确保DOM已渲染
  await nextTick()
  initFaultAnalysisChart()
  initRepairStatChart()

  // 添加窗口大小变化监听
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdowns, true)
  window.removeEventListener('resize', handleResize)

  // 释放图表实例
  faultChart && faultChart.dispose()
  repairChart && repairChart.dispose()
})
</script>
