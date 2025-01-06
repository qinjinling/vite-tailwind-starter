import Home from './views/Home.vue'
import About from './views/About.vue'
import Gantt from './views/Gantt.vue'
import NotFound from './views/NotFound.vue'

/** @type {import('vue-router').RouterOptions['routes']} */
export let routes = [
  { path: '/', component: Home, meta: { title: 'Home' } },
  { path: '/about', component: About, meta: { title: 'About' } },
  { path: '/gantt', component: Gantt, meta: { title: 'Gantt' } },
  { path: '/:path(.*)', component: NotFound },
]
