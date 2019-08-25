import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function storeValues(values: any) {
  localStorage.setItem('store', JSON.stringify(values))
}

export default new Vuex.Store({
  state: {
    sandboxPage: {
      funcType: 'match',
      target: 'aaa@gmail.com\nbbb@gmail.com',
      pattern: '^.*?@gmail\.com',
      optionFlags: '',
      replacement: '---',
      showVals: false
    }
  },
  mutations: {
    restoreValues (state) {
      const storedValues = localStorage.getItem('store')
      if (storedValues) {
        this.replaceState(Object.assign(state, JSON.parse(storedValues)))
      } 
    },
    setFuncType:  (state, funcType) => { state.sandboxPage.funcType = funcType; storeValues(state) },
    setTarget: (state, target) =>  { state.sandboxPage.target = target; storeValues(state) },
    setReplacement: (state, replacement) =>  { state.sandboxPage.replacement = replacement; storeValues(state) },
    setShowVals: (state, showVals) =>  { state.sandboxPage.showVals = showVals; storeValues(state) },
  }
})
