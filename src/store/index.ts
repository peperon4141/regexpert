import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function storeValues(pageName: string, state: object) {
  localStorage.setItem(`store_${pageName}`, JSON.stringify(state[pageName]))
}

function restoreValues(pageName: string, state: object) {
  const storedValues = localStorage.getItem(`store_${pageName}`)
  if (storedValues) { Object.assign(state[pageName], JSON.parse(storedValues)) }
}

export default new Vuex.Store({
  state: {
    sandboxPage: {
      funcType: 'match',
      target: 'aaa@gmail.com\nbbb@gmail.com',
      pattern: '^.*?@gmail\.com',
      optionFlags: [],
      replacement: 'test',
      showVals: false
    },
    quizPage: {
      currentQuiz: null,
      pattern: '',
      optionFlags: [],
    }
  },
  mutations: {
    restore: (state, pageName) => { restoreValues(pageName, state) },

    setFuncType:  (state, funcType) => { state.sandboxPage.funcType = funcType; storeValues('sandboxPage', state) },
    setTarget: (state, target) =>  { state.sandboxPage.target = target; storeValues('sandboxPage', state) },
    setReplacement: (state, replacement) =>  { state.sandboxPage.replacement = replacement; storeValues('sandboxPage', state) },
    setPattern: (state, pattern) =>  { state.sandboxPage.pattern = pattern; storeValues('sandboxPage', state) },
    setShowVals: (state, showVals) =>  { state.sandboxPage.showVals = showVals; storeValues('sandboxPage', state) },
    setOptionFlags: (state, optionFlags) => { state.sandboxPage.optionFlags = optionFlags; storeValues('sandboxPage', state) },

    setCurrentQuiz: (state, currentQuiz) => { state.quizPage.currentQuiz = currentQuiz; storeValues('quizPage', state) },
    setQuizPattern: (state, pattern) => { state.quizPage.pattern = pattern; storeValues('quizPage', state) },
    setQuizOptionFlags: (state, optionFlags) => { state.quizPage.optionFlags = optionFlags; storeValues('quizPage', state) },
  }
})
