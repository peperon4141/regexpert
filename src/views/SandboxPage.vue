<template lang="pug">
main#sandbox
  b-alert(
    style="position: absolute; margin-top: 10px; left: 45%; z-index: 100;"
    dismissible
    fade
    :show="showCopyAlertTime"
    @dismissed="showCopyAlertTime=0"
  ) Copied
  article
    section
      h2
        span 関数選択
        font-awesome-icon.ml-2.text-secondary(:icon="['far', 'question-circle']" v-b-modal.modal-select-func)
        b-modal#modal-select-func(title="説明" ok-only hide-header) JavaScriptの正規表現に関する関数の選択ができます。
      b-form-radio-group(v-model="funcType" :options="funcSelection" button-variant="outline-secondary")
    section
      h2
        span 正規表現設定
        font-awesome-icon.ml-2.text-secondary(:icon="['far', 'question-circle']" v-b-modal.modal-regex-config)
        b-modal#modal-regex-config(title="説明" ok-only hide-header) 正規表現パターンと、対象となる文字列を入力します。
      template
        b-badge.p-2.font-weight-light(variant="secondary") 正規表現パターン
        regular-pattern-textbox.position-relative.mt-n1.mb-2(
          :pattern="pattern" v-on:input-pattern="pattern = $event.value"
          :optionFlags="optionFlags" v-on:input-options="optionFlags = $event.value"
        )
      template(v-if="funcType == 'replace'")
        b-badge.p-2.font-weight-light(variant="secondary") 置換後文字列
        b-form-input.position-relative.mt-n1.mb-2.border-secondary(
          v-model='replacement'
          placeholder="置換後の文字列を書いて下さい。"
        )
    section
      h2
        span 実行結果
        font-awesome-icon.ml-2.text-secondary(:icon="['far', 'question-circle']" v-b-modal.modal-run-func)
        b-modal#modal-run-func(title="説明" ok-only hide-header) countは関数が配列の戻り値の場合の配列の要素数です。
        b-badge.ml-2(variant="secondary" v-if="isArray") count: {{ results.length }}
      template
        b-badge.p-2.font-weight-light(variant="secondary") ターゲット文字列
        b-form-textarea.position-relative.mt-n1.mb-2.border-secondary(
          v-model="targetStr"
          rows="2"
          placeholder="正規表現をチェックする対象を入力"
        )
      template
        span(v-if="!results || results.length == 0") 結果はありません。
        template(v-else)
          b-input-group.mb-2
            b-form-input(v-model="formula" disabled)
            b-input-group-append
              b-button(
                v-clipboard:copy="formula"
                v-clipboard:success="showAlert"
              )
                font-awesome-icon.text-white(:icon="['far', 'copy']" )
          ul.pl-1
            li.list-unstyled(v-for="result in results")
              font-awesome-icon.mr-2.text-secondary( :icon="['fas', 'check']" )
              span {{ result }}
        b-badge.p-2.font-weight-light(variant="secondary" v-b-toggle.collapse-vals)
          span Regex変数 詳細
          font-awesome-icon.fa-lg.mx-2.text-white(:icon="['fas', 'angle-down']" :class="{'fa-flip-vertical': !showVals}")
      b-collapse#collapse-vals(v-model="showVals")
        b-table.mt-n1.pr-2.position-relative.bg-secondary.rounded-sm(
          style="overflow: hidden"
          :items="[...regexpNums, ...regexpVals]"
          thead-class="d-none"
          tbody-class="bg-white"
          fill striped small bordered outlined hover
        )
    //- section
    //-   h2(v-b-toggle.collapse-vals)
    //-     span RegExp変数
    //-     font-awesome-icon.fa-lg.mx-2.text-secondary(:icon="['fas', 'angle-down']" :class="{'fa-flip-vertical': !showVals}")
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
      fields: FIELDS,
      repeatCount: REPEAT_COUNT,
      formula: '',
      showCopyAlertTime: 0
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
      const regexp = `/${this.pattern}/${this.optionsStr}`
      switch (this.funcType) {
        case 'match': this.formula = `\`${this.targetStr}\`.match(${regexp})`; break;
        case 'replace': this.formula = `\`${this.targetStr}\`.replace(${regexp}, '${this.replacement}')`; break;
        case 'exec': this.formula = `${regexp}.exec(\`${this.targetStr}\`)`; break;
        case 'test': this.formula = `${regexp}.test(\`${this.targetStr}\`)`; break;
        case 'search': this.formula = `\`${this.targetStr}\`.search(${regexp})`; break;
        case 'split': this.formula = `${regexp}.split(\`${this.targetStr}\`)`; break;
      }
      return eval(this.formula)
    },
    updateResults: function() {
      this.initializeVariables()
      try {
        var result = this.runRegexpFunc()
        this.isArray = Array.isArray(result)
        this.results = this.isArray ? result : [result]
        this.updateVariables()
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
    showAlert: function() {
      this.showCopyAlertTime = 1
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
