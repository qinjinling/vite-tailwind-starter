import Home from './views/Home.vue'
import Issues from './views/Issues.vue'
import Gantt from './views/Gantt.vue'
import LucideIconsExample from './views/LucideIconsExample.vue'
import NotFound from './views/NotFound.vue'

/** @type {import('vue-router').RouterOptions['routes']} */
export let routes = [
  { path: '/', component: Home, meta: { title: '控制台总览' } },
  { path: '/issues', component: Issues, meta: { title: '工单列表', comment: '集中展示和处理所有未解决的计算节点故障。' } },
  { path: '/gantt', component: Gantt, meta: { title: '甘特图' } },
  { path: '/lucide-icons-example', component: LucideIconsExample, meta: { title: 'Lucide 图标示例' } },
  { path: '/:path(.*)', component: NotFound }
]
