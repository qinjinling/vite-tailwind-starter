<template>
  <main class="container mx-auto px-4 py-6">
    <!-- 筛选区域 -->
    <div class="bg-white rounded-lg shadow mb-6">
      <div class="p-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <!-- 设备筛选 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">设备</label>
          <select v-model="filters.device" class="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 text-sm">
            <option value="">全部设备</option>
            <option v-for="device in deviceOptions" :key="device" :value="device">{{ device }}</option>
          </select>
        </div>

        <!-- 故障类型筛选 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">故障类型</label>
          <select v-model="filters.type" class="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 text-sm">
            <option value="">全部类型</option>
            <option value="hardware">硬件故障</option>
            <option value="software">软件故障</option>
            <option value="network">网络故障</option>
            <option value="other">其他故障</option>
          </select>
        </div>

        <!-- 严重程度筛选 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">严重程度</label>
          <select v-model="filters.severity" class="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 text-sm">
            <option value="">全部级别</option>
            <option value="critical">严重</option>
            <option value="high">高</option>
            <option value="medium">中</option>
            <option value="low">低</option>
          </select>
        </div>

        <!-- 状态筛选 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">处理状态</label>
          <select v-model="filters.status" class="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 text-sm">
            <option value="">全部状态</option>
            <option value="pending">待诊断</option>
            <option value="diagnosing">AI诊断中</option>
            <option value="awaiting">待工程师确认</option>
            <option value="fixing">修复中</option>
            <option value="resolved">已解决</option>
          </select>
        </div>

        <!-- 时间筛选 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">发生时间</label>
          <select v-model="filters.time" class="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 text-sm">
            <option value="">全部时间</option>
            <option value="today">今天</option>
            <option value="yesterday">昨天</option>
            <option value="week">本周</option>
            <option value="month">本月</option>
          </select>
        </div>
      </div>

      <!-- 筛选操作按钮 -->
      <div class="p-4 flex justify-end space-x-2 bg-gray-50 rounded-b-lg">
        <button
          @click="resetFilters"
          class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
          重置
        </button>
        <button
          @click="applyFilters"
          class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
          应用筛选
        </button>
      </div>
    </div>

    <!-- 水平菜单标签和新建工单按钮 -->
    <div class="flex justify-between items-center mb-4">
      <div class="border-b border-gray-200">
        <nav class="-mb-px flex space-x-8">
          <a
            href="#"
            @click.prevent="activeTab = 'pending'"
            :class="[
              activeTab === 'pending'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              'whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm'
            ]">
            未完成 ({{ pendingIssues }})
          </a>
          <a
            href="#"
            @click.prevent="activeTab = 'resolved'"
            :class="[
              activeTab === 'resolved'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              'whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm'
            ]">
            已完成 ({{ resolvedIssues }})
          </a>
        </nav>
      </div>
      <button
        @click="createNewTicket"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        新建工单
      </button>
    </div>

    <!-- 故障列表 -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 class="text-lg font-semibold text-gray-700">工单列表</h2>
        <div class="flex items-center space-x-2">
          <span class="text-sm text-gray-500">排序方式:</span>
          <select v-model="sortBy" class="rounded-md border border-gray-300 shadow-sm px-3 py-1 text-sm">
            <option value="time">发生时间</option>
            <option value="severity">严重程度</option>
            <option value="duration">故障时长</option>
          </select>
        </div>
      </div>

      <!-- 表格头部 -->
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">故障ID</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">节点/设备</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">发生时间</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">故障类型</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">严重程度</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">故障简述</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="issue in filteredIssues" :key="issue.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {{ issue.id }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ issue.device }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ formatDate(issue.time) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <span :class="getTypeClass(issue.type)">{{ getTypeText(issue.type) }}</span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="getSeverityClass(issue.severity)">
                {{ getSeverityText(issue.severity) }}
              </span>
            </td>
            <td class="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
              {{ issue.description }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="getStatusClass(issue.status)">
                {{ getStatusText(issue.status) }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button @click="viewDetails(issue)" class="text-indigo-600 hover:text-indigo-900">查看详情</button>
            </td>
          </tr>
          <tr v-if="filteredIssues.length === 0">
            <td colspan="9" class="px-6 py-8 text-center text-gray-500">未找到匹配的故障记录</td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// 模拟数据
const issues = ref([])
const deviceOptions = ['节点-A001', '节点-A002', '节点-B001', '节点-B002', '节点-C001', '存储服务器-01', '网关设备-03']

// 统计数据
const totalIssues = ref(0)
const pendingIssues = ref(0)
const resolvedIssues = ref(0)
const criticalIssues = ref(0)
const weeklyResolved = ref(0)

// 筛选条件
const filters = ref({
  device: '',
  type: '',
  severity: '',
  status: '',
  time: ''
})

// 当前选中的标签（未完成/已完成）
const activeTab = ref('pending')

const sortBy = ref('time')

// 生成模拟数据
onMounted(() => {
  generateMockData()
  updateStatistics()
})

// 生成模拟数据的函数
function generateMockData() {
  const types = ['hardware', 'software', 'network', 'other']
  const severities = ['critical', 'high', 'medium', 'low']
  const statuses = ['pending', 'diagnosing', 'awaiting', 'fixing', 'resolved']
  const descriptions = [
    '节点无法启动，疑似电源故障',
    '节点连接超时，网络中断',
    'CPU温度过高，风扇运行异常',
    '存储空间不足，影响服务运行',
    '内存使用率异常，可能存在内存泄漏',
    '网卡故障，丢包率高',
    '操作系统内核崩溃',
    'RAID控制器报错，数据安全受到威胁'
  ]

  const mockIssues = []
  for (let i = 1; i <= 30; i++) {
    const now = new Date()
    const randomDays = Math.floor(Math.random() * 10)
    const randomHours = Math.floor(Math.random() * 24)
    const issueTime = new Date(now.getTime() - (randomDays * 24 * 60 * 60 * 1000 + randomHours * 60 * 60 * 1000))

    mockIssues.push({
      id: `ISSUE-${100000 + i}`,
      device: deviceOptions[Math.floor(Math.random() * deviceOptions.length)],
      time: issueTime,
      type: types[Math.floor(Math.random() * types.length)],
      severity: severities[Math.floor(Math.random() * severities.length)],
      description: descriptions[Math.floor(Math.random() * descriptions.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)]
    })
  }

  issues.value = mockIssues
}

// 更新统计数据
function updateStatistics() {
  totalIssues.value = issues.value.length
  pendingIssues.value = issues.value.filter((issue) => issue.status !== 'resolved').length
  resolvedIssues.value = issues.value.filter((issue) => issue.status === 'resolved').length
  criticalIssues.value = issues.value.filter((issue) => issue.severity === 'critical' && issue.status !== 'resolved').length

  const now = new Date()
  const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay())
  weeklyResolved.value = issues.value.filter((issue) => issue.status === 'resolved' && new Date(issue.time) >= weekStart).length
}

// 计算筛选后的故障列表
const filteredIssues = computed(() => {
  let result = [...issues.value]

  // 根据所选标签筛选
  if (activeTab.value === 'pending') {
    result = result.filter((issue) => issue.status !== 'resolved')
  } else if (activeTab.value === 'resolved') {
    result = result.filter((issue) => issue.status === 'resolved')
  }

  // 根据筛选条件过滤
  if (filters.value.device) {
    result = result.filter((issue) => issue.device === filters.value.device)
  }

  if (filters.value.type) {
    result = result.filter((issue) => issue.type === filters.value.type)
  }

  if (filters.value.severity) {
    result = result.filter((issue) => issue.severity === filters.value.severity)
  }

  if (filters.value.status) {
    result = result.filter((issue) => issue.status === filters.value.status)
  }

  if (filters.value.time) {
    const now = new Date()
    let startDate

    switch (filters.value.time) {
      case 'today':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        break
      case 'yesterday':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1)
        const endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        result = result.filter((issue) => new Date(issue.time) >= startDate && new Date(issue.time) < endDate)
        return result
      case 'week':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay())
        break
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1)
        break
      default:
        startDate = null
    }

    if (startDate) {
      result = result.filter((issue) => new Date(issue.time) >= startDate)
    }
  }

  // 排序
  if (sortBy.value === 'time') {
    result.sort((a, b) => new Date(b.time) - new Date(a.time))
  } else if (sortBy.value === 'severity') {
    const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 }
    result.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity])
  } else if (sortBy.value === 'duration') {
    result.sort((a, b) => new Date(a.time) - new Date(b.time))
  }

  return result
})

// 格式化日期
function formatDate(date) {
  const d = new Date(date)
  return d.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 计算故障持续时间
function getDuration(startTime) {
  const start = new Date(startTime)
  const now = new Date()
  const diff = now - start

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

  if (days > 0) {
    return `${days}天${hours}小时`
  }
  if (hours > 0) {
    return `${hours}小时${minutes}分钟`
  }
  return `${minutes}分钟`
}

// 获取故障类型的样式和文本
function getTypeClass(type) {
  const classes = {
    hardware: 'px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800',
    software: 'px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800',
    network: 'px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800',
    other: 'px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800'
  }
  return classes[type] || classes.other
}

function getTypeText(type) {
  const texts = {
    hardware: '硬件故障',
    software: '软件故障',
    network: '网络故障',
    other: '其他故障'
  }
  return texts[type] || '未知类型'
}

// 获取严重程度的样式和文本
function getSeverityClass(severity) {
  const classes = {
    critical: 'px-2 py-1 text-xs rounded-full bg-red-100 text-red-800',
    high: 'px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-800',
    medium: 'px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800',
    low: 'px-2 py-1 text-xs rounded-full bg-green-100 text-green-800'
  }
  return classes[severity] || classes.low
}

function getSeverityText(severity) {
  const texts = {
    critical: '严重',
    high: '高',
    medium: '中',
    low: '低'
  }
  return texts[severity] || '未知'
}

// 获取状态的样式和文本
function getStatusClass(status) {
  const classes = {
    pending: 'px-2 py-1 text-xs rounded-full bg-red-100 text-red-800',
    diagnosing: 'px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800',
    awaiting: 'px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800',
    fixing: 'px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800',
    resolved: 'px-2 py-1 text-xs rounded-full bg-green-100 text-green-800'
  }
  return classes[status] || classes.pending
}

function getStatusText(status) {
  const texts = {
    pending: '待诊断',
    diagnosing: 'AI诊断中',
    awaiting: '待确认',
    fixing: '修复中',
    resolved: '已解决'
  }
  return texts[status] || '未知状态'
}

// 重置筛选条件
function resetFilters() {
  filters.value = {
    device: '',
    type: '',
    severity: '',
    status: '',
    time: ''
  }
}

// 应用筛选（此处作为示例，实际上上面的计算属性已经实现了实时筛选）
function applyFilters() {
  // 在真实环境中，可能需要调用API来获取筛选后的数据
  console.log('应用筛选条件:', filters.value)
}

// 查看故障详情
function viewDetails(issue) {
  console.log('查看故障详情:', issue)
  // 在实际应用中，可能会打开一个模态框或跳转到详情页面
  alert(`查看故障ID: ${issue.id} 的详情`)
}

// 创建新工单
function createNewTicket() {
  console.log('创建新工单')
  // 在实际应用中，可能会打开一个模态框或跳转到创建页面
  alert('创建新故障工单')
}
</script>
