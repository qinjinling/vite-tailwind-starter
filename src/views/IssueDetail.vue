<template>
  <main class="container mx-auto px-4 py-6">
    <!-- 返回按钮 -->
    <div class="mb-4">
      <router-link to="/issues" class="inline-flex items-center text-indigo-600 hover:text-indigo-800">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        返回工单列表
      </router-link>
    </div>

    <!-- 详情内容 -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- 左侧区域：基础信息和原始日志 -->
      <div class="lg:col-span-1 space-y-6">
        <!-- 基础信息区 -->
        <div class="bg-white rounded-lg shadow overflow-hidden">
          <div class="border-b border-gray-200 px-6 py-4">
            <h2 class="text-lg font-medium text-gray-800 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              基础信息
            </h2>
          </div>
          <div class="px-6 py-4">
            <div class="mb-4 flex justify-between items-center">
              <span class="text-gray-500 text-sm">故障ID:</span>
              <span class="text-gray-900 font-medium">{{ issue.id }}</span>
            </div>
            <div class="mb-4 flex justify-between items-center">
              <span class="text-gray-500 text-sm">设备名称:</span>
              <span class="text-gray-900">{{ issue.device }}</span>
            </div>
            <div class="mb-4 flex justify-between items-center">
              <span class="text-gray-500 text-sm">发生时间:</span>
              <span class="text-gray-900">{{ formatDate(issue.time) }}</span>
            </div>
            <div class="mb-4 flex justify-between items-center">
              <span class="text-gray-500 text-sm">持续时间:</span>
              <span class="text-gray-900">{{ getDuration(issue.time) }}</span>
            </div>
            <div class="mb-4 flex justify-between items-center">
              <span class="text-gray-500 text-sm">故障类型:</span>
              <span :class="getTypeClass(issue.type)">{{ getTypeText(issue.type) }}</span>
            </div>
            <div class="mb-4 flex justify-between items-center">
              <span class="text-gray-500 text-sm">严重程度:</span>
              <span :class="getSeverityClass(issue.severity)">{{ getSeverityText(issue.severity) }}</span>
            </div>
            <div class="mb-4 flex justify-between items-center">
              <span class="text-gray-500 text-sm">当前状态:</span>
              <span :class="getStatusClass(issue.status)">{{ getStatusText(issue.status) }}</span>
            </div>
            <div class="mb-4">
              <span class="text-gray-500 text-sm block mb-1">首次告警信息:</span>
              <div class="bg-gray-50 rounded p-3 text-gray-700 text-sm">
                {{
                  issue.alertMessage || '系统在' + formatDate(issue.time) + '检测到' + getTypeText(issue.type) + '，初步诊断为' + issue.description
                }}
              </div>
            </div>
          </div>
        </div>

        <!-- 原始日志与事件 -->
        <div class="bg-white rounded-lg shadow overflow-hidden">
          <div class="border-b border-gray-200 px-6 py-4">
            <h2 class="text-lg font-medium text-gray-800 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              原始日志与事件
            </h2>
          </div>
          <div class="px-6 py-4">
            <div class="flex justify-between items-center mb-3">
              <span class="text-sm text-gray-500">显示最近 {{ logs.length }} 条日志记录</span>
              <button class="text-indigo-600 hover:text-indigo-800 text-xs">查看全部日志</button>
            </div>

            <div class="bg-gray-900 text-gray-100 rounded-lg p-3 font-mono text-xs h-80 overflow-auto">
              <div v-for="(log, index) in logs" :key="index" class="mb-1 leading-5">
                <span class="text-gray-500">[{{ log.timestamp }}]</span>
                <span :class="getLogLevelClass(log.level)">[{{ log.level }}]</span>
                <span>{{ log.message }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 中央与右侧区域：AI诊断分析、解决方案和处理历史 -->
      <div class="lg:col-span-2 space-y-6">
        <!-- AI诊断分析区 -->
        <div class="bg-white rounded-lg shadow overflow-hidden">
          <div class="border-b border-gray-200 px-6 py-4">
            <h2 class="text-lg font-medium text-gray-800 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              AI诊断分析
              <span class="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">由智能AI助手提供</span>
            </h2>
          </div>

          <!-- AI初步判断 -->
          <div class="px-6 py-4 border-b border-gray-100">
            <h3 class="text-md font-medium text-gray-700 mb-3">AI初步判断:</h3>
            <div class="bg-blue-50 rounded-lg p-4 text-gray-700">
              <p>{{ aiDiagnosis.summary }}</p>
              <div class="mt-3">
                <h4 class="font-medium text-sm mb-1">潜在原因分析:</h4>
                <ul class="list-disc pl-5 space-y-1 text-sm">
                  <li v-for="(cause, index) in aiDiagnosis.possibleCauses" :key="index">
                    {{ cause }}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- 相关知识与案例 -->
          <div class="px-6 py-4 border-b border-gray-100">
            <h3 class="text-md font-medium text-gray-700 mb-3">相关知识与案例:</h3>
            <div class="space-y-3">
              <div v-for="(item, index) in aiDiagnosis.relatedKnowledge" :key="index" class="border border-gray-200 rounded-lg overflow-hidden">
                <div class="flex items-center justify-between px-4 py-2 bg-gray-50">
                  <div class="flex items-center">
                    <span class="inline-block h-3 w-3 rounded-full" :class="getKnowledgeTypeColor(item.type)"></span>
                    <span class="ml-2 text-sm font-medium text-gray-700">{{ getKnowledgeTypeName(item.type) }}</span>
                  </div>
                  <button class="text-indigo-600 hover:text-indigo-800 text-xs" @click="toggleKnowledgeDetail(index)">
                    {{ expandedKnowledge[index] ? '收起' : '查看详情' }}
                  </button>
                </div>
                <div class="px-4 py-3" :class="{ hidden: !expandedKnowledge[index] }">
                  <h4 class="font-medium text-sm mb-2">{{ item.title }}</h4>
                  <p class="text-sm text-gray-600">{{ item.summary }}</p>
                  <div v-if="item.relevanceScore" class="mt-2 flex items-center">
                    <span class="text-xs text-gray-500 mr-1">相关度:</span>
                    <div class="w-24 h-2 bg-gray-200 rounded-full">
                      <div
                        class="h-2 rounded-full"
                        :style="{ width: item.relevanceScore * 100 + '%' }"
                        :class="getRelevanceColor(item.relevanceScore)"></div>
                    </div>
                    <span class="text-xs text-gray-500 ml-1">{{ Math.round(item.relevanceScore * 100) }}%</span>
                  </div>
                  <button v-if="item.url" class="mt-2 text-xs text-indigo-600 hover:text-indigo-800" @click="openKnowledgeDetail(item)">
                    在知识库查看完整内容 →
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- AI推荐方案 -->
          <div class="px-6 py-4">
            <h3 class="text-md font-medium text-gray-700 mb-3">AI推荐方案:</h3>
            <div class="bg-green-50 rounded-lg p-4 text-gray-700">
              <p>{{ aiDiagnosis.recommendedSolution }}</p>
              <div class="mt-3 text-sm" v-if="aiDiagnosis.estimatedTime">
                <span class="font-medium">预计修复时间:</span>
                <span class="text-green-600 ml-1">{{ aiDiagnosis.estimatedTime }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 解决方案生成与执行区 -->
        <div class="bg-white rounded-lg shadow overflow-hidden">
          <div class="border-b border-gray-200 px-6 py-4">
            <h2 class="text-lg font-medium text-gray-800 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              解决方案
            </h2>
          </div>

          <!-- 可执行脚本 -->
          <div class="px-6 py-4 border-b border-gray-100">
            <div class="flex justify-between items-center mb-3">
              <h3 class="text-md font-medium text-gray-700">AI生成的修复脚本:</h3>
              <button class="text-indigo-600 hover:text-indigo-800 text-xs" @click="copyScript">复制代码</button>
            </div>

            <!-- 代码编辑器 -->
            <div class="bg-gray-900 rounded-lg p-3 font-mono text-xs text-white overflow-auto">
              <pre><code class="language-bash">{{ aiScript }}</code></pre>
            </div>

            <div class="mt-3 text-xs text-gray-500">
              <p>* 请在执行前仔细检查脚本内容，确保适用于当前环境。</p>
            </div>
          </div>

          <!-- 工程师操作 -->
          <div class="px-6 py-4">
            <h3 class="text-md font-medium text-gray-700 mb-3">工程师操作:</h3>
            <div class="flex flex-wrap gap-2 mb-4">
              <button
                class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                评估方案
              </button>
              <button
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                批准并执行
              </button>
              <button
                class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                加入待办
              </button>
              <button
                class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                标记解决
              </button>
            </div>

            <div>
              <label for="engineer-comment" class="block text-sm font-medium text-gray-700 mb-1">添加备注:</label>
              <textarea
                id="engineer-comment"
                rows="2"
                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                placeholder="添加您对本次故障的诊断、处理意见或备注..."></textarea>
              <div class="mt-2 flex justify-end">
                <button
                  class="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  提交备注
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 处理历史与协作区 -->
        <div class="bg-white rounded-lg shadow overflow-hidden">
          <div class="border-b border-gray-200 px-6 py-4">
            <h2 class="text-lg font-medium text-gray-800 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              处理历史与协作
            </h2>
          </div>

          <!-- 任务链状态 -->
          <div class="px-6 py-4 border-b border-gray-100">
            <h3 class="text-md font-medium text-gray-700 mb-3">处理流程:</h3>
            <div class="relative">
              <div class="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></div>
              <ul>
                <li v-for="(step, index) in workflowSteps" :key="index" class="relative pb-8">
                  <div v-if="index < workflowSteps.length - 1" class="relative flex items-start space-x-3">
                    <div>
                      <div
                        :class="`relative px-1 ${
                          step.completed ? 'bg-indigo-500' : 'bg-gray-300'
                        } rounded-full flex h-8 w-8 items-center justify-center ring-8 ring-white`">
                        <svg
                          v-if="step.completed"
                          class="h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true">
                          <path
                            fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd" />
                        </svg>
                        <span v-else class="h-5 w-5 text-white flex items-center justify-center">
                          {{ index + 1 }}
                        </span>
                      </div>
                    </div>
                    <div class="min-w-0 flex-1">
                      <div>
                        <div class="text-sm">
                          <span class="font-medium text-gray-900">{{ step.name }}</span>
                        </div>
                        <p class="mt-0.5 text-xs text-gray-500">
                          {{ step.time }}
                          <span v-if="step.user"> • {{ step.user }}</span>
                        </p>
                      </div>
                      <div class="mt-2 text-sm text-gray-700">
                        <p>{{ step.description }}</p>
                      </div>
                    </div>
                  </div>
                  <div v-else class="relative flex items-start space-x-3">
                    <div>
                      <div class="relative px-1 bg-blue-500 rounded-full flex h-8 w-8 items-center justify-center ring-8 ring-white">
                        <span class="h-5 w-5 text-white font-medium flex items-center justify-center">
                          {{ index + 1 }}
                        </span>
                      </div>
                    </div>
                    <div class="min-w-0 flex-1">
                      <div>
                        <div class="text-sm">
                          <span class="font-medium text-gray-900">{{ step.name }}</span>
                          <span class="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">进行中</span>
                        </div>
                        <p class="mt-0.5 text-xs text-gray-500">
                          {{ step.time }}
                          <span v-if="step.user"> • {{ step.user }}</span>
                        </p>
                      </div>
                      <div class="mt-2 text-sm text-gray-700">
                        <p>{{ step.description }}</p>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <!-- 评论区 -->
          <div class="px-6 py-4">
            <h3 class="text-md font-medium text-gray-700 mb-3">工程师评论:</h3>
            <ul class="space-y-4">
              <li v-for="(comment, index) in comments" :key="index" class="bg-gray-50 rounded-lg p-3">
                <div class="flex items-center mb-2">
                  <img class="h-8 w-8 rounded-full" :src="comment.avatar" alt="" />
                  <div class="ml-2">
                    <h4 class="font-medium text-sm text-gray-800">{{ comment.author }}</h4>
                    <p class="text-xs text-gray-500">{{ comment.time }}</p>
                  </div>
                </div>
                <p class="text-sm text-gray-700">{{ comment.content }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const issueId = ref(route.params.id)

// 故障信息
const issue = reactive({
  id: 'ISSUE-100001',
  device: '节点-A001',
  time: new Date(new Date().getTime() - 7 * 60 * 60 * 1000), // 7小时前
  type: 'hardware',
  severity: 'critical',
  status: 'diagnosing',
  description: '节点无法启动，疑似电源故障',
  alertMessage: '节点-A001在系统监控中显示为离线状态，IPMI控制器报告电源异常。初步诊断为电源模块故障，需要工程师进一步确认。'
})

// AI诊断分析
const aiDiagnosis = reactive({
  summary:
    '基于所收集到的日志信息和系统监控数据，分析显示本次故障很可能是由于节点的电源模块故障导致。电源电压不稳定，导致系统无法正常启动。监控日志显示在故障发生前，系统已经记录到了多次电源波动事件。',
  possibleCauses: [
    '电源模块硬件故障，接触不良或内部部件损坏',
    '机房供电系统不稳定，导致电源输入电压波动',
    '服务器负载突增，导致电源过载保护触发',
    '电源风扇故障导致电源过热保护'
  ],
  relatedKnowledge: [
    {
      type: 'case',
      title: '类似故障案例 #CE-2023-0472',
      summary: '节点-B012曾出现类似电源故障，经检查是由于电源线接触不良导致。通过重新连接电源线和更换电源插槽解决。',
      relevanceScore: 0.92,
      url: '#'
    },
    {
      type: 'manual',
      title: '设备手册 - 电源故障排查',
      summary: '电源故障的常见排查步骤包括：检查电源线连接、检查电源输入电压、测试备用电源、检查IPMI日志中的电源事件。',
      relevanceScore: 0.85,
      url: '#'
    },
    {
      type: 'knowledge',
      title: '技术知识库 - 服务器电源故障诊断流程',
      summary: '详细描述了服务器电源故障的诊断方法，包括使用万用表测量电压输出、IPMI命令获取电源状态、常见电源故障代码解释等。',
      relevanceScore: 0.78,
      url: '#'
    }
  ],
  recommendedSolution:
    '根据日志分析和历史案例，建议首先尝试重新连接电源线和更换电源插槽，如果问题依然存在，则需要更换电源模块。具体步骤：1. 关闭服务器电源 2. 检查并重新连接电源线 3. 尝试使用不同的电源插槽 4. 如果问题依然存在，准备更换备用电源模块 5. 按照标准操作流程更换电源模块 6. 重新启动服务器并检查状态',
  estimatedTime: '约30分钟'
})

// 原始日志
const logs = ref([
  { timestamp: '2023-11-15 10:01:23', level: 'INFO', message: 'System startup initiated' },
  { timestamp: '2023-11-15 10:01:25', level: 'INFO', message: 'Checking hardware components...' },
  { timestamp: '2023-11-15 10:01:27', level: 'WARNING', message: 'Power supply voltage fluctuation detected (10.8V, expected 12V)' },
  { timestamp: '2023-11-15 10:01:30', level: 'WARNING', message: 'PSU fan speed below threshold (1200RPM, expected >2000RPM)' },
  { timestamp: '2023-11-15 10:01:35', level: 'ERROR', message: 'Power supply unit #1 critical failure' },
  { timestamp: '2023-11-15 10:01:36', level: 'ERROR', message: 'System unable to power on - PSU check failed' },
  { timestamp: '2023-11-15 10:01:37', level: 'INFO', message: 'Attempting to use backup power supply unit #2' },
  { timestamp: '2023-11-15 10:01:39', level: 'ERROR', message: 'Backup power supply unit #2 not responding' },
  { timestamp: '2023-11-15 10:01:40', level: 'CRITICAL', message: 'System shutdown initiated - power supply failure' },
  { timestamp: '2023-11-15 10:01:45', level: 'SYSTEM', message: 'IPMI controller reported: Power fault detected' },
  { timestamp: '2023-11-15 10:02:00', level: 'SYSTEM', message: 'Sending alert to monitoring system' }
])

// AI生成的修复脚本
const aiScript = `#!/bin/bash
# 自动修复脚本 - 电源模块故障诊断与修复
# 为节点-A001生成 - 故障ID: ISSUE-100001

# 1. 记录开始时间
echo "[$(date '+%Y-%m-%d %H:%M:%S')] 开始执行电源故障诊断脚本"

# 2. 检查IPMI状态
echo "[$(date '+%Y-%m-%d %H:%M:%S')] 检查IPMI状态..."
ipmi_status=$(ipmitool -H 192.168.1.101 -U admin -P admin123 chassis status 2>/dev/null)
if [ $? -ne 0 ]; then
  echo "[ERROR] 无法连接到IPMI，请检查网络连接或IPMI配置"
  exit 1
fi

# 3. 分析电源状态
echo "[$(date '+%Y-%m-%d %H:%M:%S')] 分析电源状态..."
power_status=$(echo "$ipmi_status" | grep "System Power" | awk '{print $4}')
echo "当前电源状态: $power_status"

# 4. 检查传感器数据
echo "[$(date '+%Y-%m-%d %H:%M:%S')] 检查传感器数据..."
sensor_data=$(ipmitool -H 192.168.1.101 -U admin -P admin123 sensor list 2>/dev/null)
voltage_data=$(echo "$sensor_data" | grep "Voltage" -A 2)
echo "电压传感器数据:"
echo "$voltage_data"

# 5. 尝试重启电源
echo "[$(date '+%Y-%m-%d %H:%M:%S')] 尝试重启电源..."
ipmitool -H 192.168.1.101 -U admin -P admin123 chassis power cycle
sleep 10

# 6. 再次检查电源状态
echo "[$(date '+%Y-%m-%d %H:%M:%S')] 再次检查电源状态..."
power_status=$(ipmitool -H 192.168.1.101 -U admin -P admin123 chassis status | grep "System Power" | awk '{print $4}')
echo "重启后电源状态: $power_status"

# 7. 检查电源是否恢复
if [ "$power_status" == "on" ]; then
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] [SUCCESS] 电源已恢复正常"

  # 8. 添加到监控列表
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] 添加到特别监控列表..."
  echo "节点-A001" >> /path/to/monitoring/special_watch_list.txt

  # 9. 发送成功通知
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] 发送修复成功通知..."
  # notify-send "节点-A001电源故障已修复" "通过IPMI重启电源解决"

  exit 0
else
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] [ERROR] 电源未能恢复，需要人工干预"
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] 推荐操作: 检查物理电源连接或更换电源模块"

  # 10. 创建人工介入工单
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] 创建人工介入工单..."
  # create_ticket.sh --device "节点-A001" --issue "电源模块可能需要更换" --priority "high"

  exit 1
fi`

// 工作流程步骤
const workflowSteps = ref([
  {
    name: '故障检测',
    time: '今天 10:01',
    description: '系统监控自动检测到节点-A001离线，创建故障工单。',
    completed: true
  },
  {
    name: 'AI初步诊断',
    time: '今天 10:05',
    description: 'AI系统自动分析日志和监控数据，初步诊断为电源模块故障。',
    completed: true
  },
  {
    name: '知识库检索',
    time: '今天 10:07',
    description: '系统从知识库中检索相关案例和解决方案，找到3条相关记录。',
    completed: true
  },
  {
    name: '方案生成',
    time: '今天 10:10',
    description: 'AI助手生成了故障解决方案和修复脚本，等待工程师确认。',
    completed: true
  },
  {
    name: '人工确认',
    time: '今天 10:15',
    user: '李工程师',
    description: '工程师正在评估AI推荐的解决方案，准备执行修复操作。',
    completed: false
  }
])

// 工程师评论
const comments = ref([
  {
    author: '张工程师',
    avatar: '/img/person1.jpeg',
    time: '今天 10:08',
    content: '我上个月处理过类似的故障，是电源模块需要更换，建议直接准备备用电源模块。'
  },
  {
    author: '李工程师',
    avatar: '/img/person2.jpeg',
    time: '今天 10:12',
    content: '我已经联系机房管理员，准备好了备用电源模块，正在前往现场处理。'
  }
])

// 展开/收起知识详情的状态
const expandedKnowledge = ref({})

// 复制脚本
function copyScript() {
  navigator.clipboard
    .writeText(aiScript)
    .then(() => {
      alert('脚本已复制到剪贴板')
    })
    .catch((err) => {
      console.error('无法复制脚本:', err)
    })
}

// 展开/收起知识详情
function toggleKnowledgeDetail(index) {
  expandedKnowledge.value[index] = !expandedKnowledge.value[index]
}

// 打开知识库详情
function openKnowledgeDetail(item) {
  window.open(item.url, '_blank')
}

// 获取日志级别颜色
function getLogLevelClass(level) {
  const classes = {
    INFO: 'text-blue-400',
    WARNING: 'text-yellow-400',
    ERROR: 'text-red-400',
    CRITICAL: 'text-red-600 font-bold',
    SYSTEM: 'text-purple-400'
  }
  return classes[level] || 'text-gray-400'
}

// 获取知识类型颜色
function getKnowledgeTypeColor(type) {
  const colors = {
    case: 'bg-green-500',
    manual: 'bg-blue-500',
    knowledge: 'bg-purple-500'
  }
  return colors[type] || 'bg-gray-500'
}

// 获取知识类型名称
function getKnowledgeTypeName(type) {
  const names = {
    case: '历史案例',
    manual: '设备手册',
    knowledge: '技术知识'
  }
  return names[type] || '未分类'
}

// 获取相关度颜色
function getRelevanceColor(score) {
  if (score >= 0.9) return 'bg-green-500'
  if (score >= 0.7) return 'bg-yellow-500'
  return 'bg-red-500'
}

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

// 获取工单详情
onMounted(() => {
  // 实际项目中，会通过API获取工单详情
  console.log(`加载工单ID: ${issueId.value} 的详情`)
})
</script>
