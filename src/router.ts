import Vue from 'vue'
import Router from 'vue-router'
import CheckerPage from '@views/CheckerPage.vue'
import CheetSheetPage from '@views/CheetSheetPage.vue'
import QuizPage from '@views/QuizePage.vue'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes: [
    { path: '/checker',component: CheckerPage },
    { path: '/cheetsheet',component: CheetSheetPage },
    { path: '/quiz',component: QuizPage },
    { path: '*', redirect: '/checker' },
  ]
})

export default router