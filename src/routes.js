import Home from './views/Home.vue'
import About from './views/About.vue'
import Gantt1 from './views/Gantt1.vue'
import Gantt2 from './views/Gantt2.vue'
import LucideIconsExample from './views/LucideIconsExample.vue'
import NotFound from './views/NotFound.vue'

/** @type {import('vue-router').RouterOptions['routes']} */
export let routes = [
  { path: '/', component: Home, meta: { title: 'Home' } },
  { path: '/about', component: About, meta: { title: 'About' } },
  { path: '/gantt1', component: Gantt1, meta: { title: 'Gantt1' } },
  { path: '/gantt2', component: Gantt2, meta: { title: 'Gantt2' } },
  { path: '/lucide-icons-example', component: LucideIconsExample, meta: { title: 'Lucide 图标示例' } },
  { path: '/:path(.*)', component: NotFound }
]
