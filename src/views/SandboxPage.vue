<template lang="pug">
main#sandbox
  article
    section
      h2
        span 関数選択
        font-awesome-icon.ml-2.text-secondary(
          :icon="['far', 'question-circle']"
          v-b-modal.modal-1
        )
        b-modal#modal-1(title="説明" ok-only)
          p.my-4 JavaScriptの正規表現に関する関数の選択ができます。
      b-form-group
        b-form-radio-group(v-model="funcType" :options="funcSelection")
    section
      h2 正規表現設定
      template(v-if="funcType == 'replace'")
        b-badge.p-2.pb-3.font-weight-light(variant="secondary") 置換後文字列
        b-form-input.position-relative.mt-n2.mb-2.border-secondary(
          v-model='replacement'
          placeholder="置換後の文字列を書いて下さい。"
        )
      template
        b-badge.p-2.pb-3.font-weight-light(variant="secondary") ターゲット文字列
        b-form-textarea.position-relative.mt-n2.mb-2.border-secondary(
          v-model="targetStr"
          rows="6"
          placeholder="正規表現をチェックする対象を入力"
        )
      template
        b-badge.p-2.pb-3.font-weight-light(variant="secondary") 正規表現パターン
        regular-pattern-textbox.position-relative.mt-n2.mb-2(
          :pattern="pattern" v-on:input-pattern="pattern = $event.value"
          :optionFlags="optionFlags" v-on:input-options="optionFlags = $event.value"
        )
    section
      h2
        span 実行結果
        b-badge.ml-2(variant="secondary" v-if="time") time: {{ time }}[ms]
        b-badge.ml-2(variant="secondary" v-if="isArray") count: {{ results.length }}
      span(v-if="!results || results.length == 0") 結果はありません。
      ul.pl-1(v-else)
        li.list-unstyled(v-for="result in results")
          font-awesome-icon.mr-2.text-secondary( :icon="['fas', 'check']" )
          span {{ result }}
    section
      h2(v-b-toggle.collapse-vals)
        span RegExp変数
        font-awesome-icon.fa-lg.mx-2.text-secondary(:icon="['fas', 'angle-down']" :class="{'fa-flip-vertical': !showVals}")
      b-collapse#collapse-vals(v-model="showVals")
        template
          b-badge.p-2.pb-3.font-weight-light(variant="secondary") $n変数
          b-table.mt-n2.pr-2.position-relative.bg-secondary.rounded-sm(
            style="overflow: hidden"
            :fields="fields"
            :items="regexpNums"
            thead-class="d-none"
            tbody-class="bg-white"
            fill striped small bordered outlined hover
          )
        template
          b-badge.p-2.pb-3.font-weight-light(variant="secondary") 変数
          b-table.mt-n2.pr-2.position-relative.bg-secondary.rounded-sm(
            style="overflow: hidden"
            :items="regexpVals"
            thead-class="d-none"
            tbody-class="bg-white"
            fill striped small bordered outlined hover
          )
</template>

<script>
import RegularPatternTextbox from '@components/RegularPatternTextbox.vue'

const FIELDS = [ 'param', 'value' ]
const NUM_PARAM_NAMES = [1,2,3,4,5,6,7,8,9].map(num => `$${num}`)
const OTHER_PARAM_NAMES = ['input', 'lastMatch', 'lastParen', 'leftContext', 'rightContext']
const FUNC_SELECTION = [
  {text: 'match', value: 'match' },
  {text: 'replace', value: 'replace' },
  {text: 'exec', value: 'exec' },
  {text: 'test', value: 'test' },
  {text: 'search', value: 'search' },
  {text: 'split', value: 'split' }
]
const REPEAT_COUNT = 1000

export default {
  components: {
    RegularPatternTextbox
  },
  data() {
    return {
      funcSelection: FUNC_SELECTION,
      results: [],
      regexpNums: [],
      regexpVals: [],
      time: null,
      isArray: false,
      fields: FIELDS
    }
  },
  computed: {
    optionsStr: function() { return this.optionFlags.join('') },
    regexp_nums_count: function () {
      return this.regexpNums ? this.regexpNums.filter( item => !!item.value ).length : 0
    },
    funcType: {
      get() { return this.$store.state.sandboxPage.funcType },
      set(funcType) { this.$store.commit('setFuncType', funcType); this.updateResults() }
    },
    pattern: {
      get() { return this.$store.state.sandboxPage.pattern },
      set(pattern) { this.$store.commit('setPattern', pattern); this.updateResults() }
    },
    optionFlags: {
      get() { return this.$store.state.sandboxPage.optionFlags },
      set(optionFlags) { this.$store.commit('setOptionFlags', optionFlags); this.updateResults() }
    },
    replacement: {
      get() { return this.$store.state.sandboxPage.replacement },
      set(replacement) { this.$store.commit('setReplacement', replacement); this.updateResults() }
    },
    targetStr: {
      get() { return this.$store.state.sandboxPage.target },
      set(target) { this.$store.commit('setTarget', target); this.updateResults() }
    },
    showVals: {
      get() { return this.$store.state.sandboxPage.showVals },
      set(showVals) { this.$store.commit('setShowVals', showVals) }
    },
  },
  created: function() {
    this.$store.commit('restore', 'sandboxPage')
  },
  mounted: function() {
    this.updateResults()
  },
  methods: {
    runRegexpFunc: function() {
      const regexp = new RegExp(this.pattern, this.optionsStr)
      switch (this.funcType) {
        case 'match': return this.targetStr.match(regexp)
        case 'replace': return this.targetStr.replace(regexp, this.replacement)
        case 'exec': return regexp.exec(this.targetStr)
        case 'test': return regexp.test(this.targetStr)
        case 'search': return this.targetStr.search(regexp)
        case 'split': return this.targetStr.split(regexp)
      }
    },
    updateResults: function() {
      this.initializeVariables()
      try {
        var result = this.runRegexpFunc()
        this.isArray = Array.isArray(result)
        this.results = this.isArray ? result : [result]
        this.updateVariables()
        this.checkPerformance()
      } catch (e) {}
    },
    initializeVariables: function() {
      ''.match(RegExp(''))
      this.regexpNums = NUM_PARAM_NAMES.map( key => { return { param: key, value: '' } })
      this.regexpVals = OTHER_PARAM_NAMES.map( key => { return { param: key, value: '' } } )
    },
    updateVariables: function() {
      this.regexpNums = NUM_PARAM_NAMES.map( key => { return { param: key, value: RegExp[key] } })
      this.regexpVals = OTHER_PARAM_NAMES.map( key => { return { param: key, value: RegExp[key].toString() } })
    },
    checkPerformance: function() {
      this.time = null
      setTimeout( () => {
        var start = performance.now()
        for(let i = 0; i < REPEAT_COUNT; i++){ this.runRegexpFunc() }
        var end = performance.now()
        this.time = ((end - start) / REPEAT_COUNT).toFixed(3)
      }, 10)
    }
  }
}
</script>

<style lang="sass" scoped>
@import "@/style/contents.sass"

main
  table
    table-layout: fixed
    ::v-deep td
      &:first-of-type
        width: 20%
        word-wrap: break-word
</style>
