import Vue from 'vue'
import Router from 'vue-router'

import SandboxPage from '@views/SandboxPage.vue'
import CheetSheetPage from '@views/CheetSheetPage.vue'
import QuizPage from '@views/QuizPage.vue'
import AddQuizForm from '@views/AddQuizForm.vue'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes: [
    { path: '/sandbox',component: SandboxPage },
    { path: '/cheetsheet',component: CheetSheetPage },
    { path: '/quiz',component: QuizPage },
    { path: '/form',component: AddQuizForm },
    { path: '*', redirect: '/sandbox' },
  ]
})

export default router