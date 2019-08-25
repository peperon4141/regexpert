<template lang="pug">
main#sandbox
  article
    section
      h2 関数選択
      b-form-group
        b-form-radio-group(v-model="funcType" :options="selection")
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
          :prefix="'sandbox'"
          :update_expression_callback="updateExpression"
          :update_options_callback="updateOptionsStr"
        )
    section
      h2
        span 実行結果
        b-badge.ml-2(variant="secondary" v-if="results") {{ results.length }}
      span(v-if="!results || results.length == 0") 結果はありません。
      ul.pl-1(v-else)
        li.list-unstyled(v-for="result in results")
          font-awesome-icon.mr-2.text-secondary(icon="check")
          span {{ result }}
    section
      h2(v-b-toggle.collapse-vals)
        span RegExp変数
        font-awesome-icon.mx-2(:icon="showVals ? 'angle-down' : 'angle-up'")
      b-collapse#collapse-vals(v-model="showVals")
        template
          b-badge.p-2.pb-3.font-weight-light(variant="secondary") $n変数
          b-table.mt-n2.pr-2.position-relative.bg-secondary.rounded-sm(
            style="overflow: hidden"
            fill
            striped
            small
            bordered
            outlined
            hover
            :fields="fields"
            :items="regexp_nums"
            thead-class="d-none"
            tbody-class="bg-white"
          )
        template
          b-badge.p-2.pb-3.font-weight-light(variant="secondary") 変数
          b-table.mt-n2.pr-2.position-relative.bg-secondary.rounded-sm(
            style="overflow: hidden"
            fill
            striped
            small
            bordered
            outlined
            hover
            :items="regexp_vals"
            thead-class="d-none"
            tbody-class="bg-white"
          )
</template>

<script>
import RegularPatternTextbox from '@components/RegularPatternTextbox.vue'

const FIELDS = [ 'param', 'value' ]
const NUM_PARAM_NAMES = [1,2,3,4,5,6,7,8,9].map(num => `$${num}`)
const OTHER_PARAM_NAMES = ['input', 'lastMatch', 'lastParen', 'leftContext', 'rightContext']
const FUNC_SELECTION = [
  {text: 'match', value: 'match'},
  {text: 'replace', value: 'replace'},
  {text: 'exec', value: 'exec'},
  {text: 'test', value: 'test'},
  {text: 'search', value: 'search'}
]

export default {
  components: {
    RegularPatternTextbox
  },
  data() {
    return {
      options_str: '',
      results: [],
      regexp_nums: [],
      regexp_vals: [],
      selection: FUNC_SELECTION,
      fields: FIELDS
    }
  },
  computed: {
    regexp_nums_count: function () {
      return this.regexp_nums ? this.regexp_nums.filter( item => !!item.value ).length : 0
    },
    targetStr: {
      get() { return this.$store.state.sandboxPage.target },
      set(target) { this.$store.commit('sandboxPageStore/setTarget', target); this.updateResults() }
    },
    funcType: {
      get() { return this.$store.state.sandboxPage.funcType },
      set(funcType) { this.$store.commit('sandboxPageStore/setFuncType', funcType); this.updateResults() }
    },
    // pattern: {
    //   get() { return this.$store.state.pattern },
    //   set(pattern) { this.$store.commit('setPattern', pattern); this.updateResults() }
    // },
    replacement: {
      get() { return this.$store.state.sandboxPage.replacement },
      set(replacement) { this.$store.commit('sandboxPageStore/setReplacement', replacement); this.updateResults() }
    },
    showVals: {
      get() { return this.$store.state.sandboxPage.showVals },
      set(showVals) { this.$store.commit('sandboxPageStore/setShowVals', showVals) }
    },
  },
  created: function() {
    this.$store.commit('restoreValues')
  },
  methods: {
    updateResults: function(results, regexp_nums) {
      this.initializeVariables()

      if (!this.targetStr || !this.pattern) return

      let regexp = new RegExp(this.pattern, this.options_str)
      regexp.lastIndex = 0
      switch (this.funcType) {
        case 'match':
          this.results = this.targetStr.match(regexp)
          break
        case 'replace':
          this.results = [this.targetStr.replace(regexp, this.replacedStr)]
          break
        case 'exec':
          this.results = regexp.exec(this.targetStr)
          break
        case 'test':
          this.results = [regexp.test(this.targetStr)]
          break
        case 'search':
          this.results = [this.targetStr.search(regexp)]
          break
      }
      this.updateVariables()
    },
    updateExpression: function(pattern) {
      this.pattern = pattern
      this.updateResults()
    },
    updateOptionsStr: function(options) {
      this.options_str = options.join('')
      this.updateResults()
    },
    initializeVariables: function() {
      this.regexp_nums = NUM_PARAM_NAMES.map( key => { return { param: key, value: '' } })
      this.regexp_vals = OTHER_PARAM_NAMES.map( key => { return { param: key, value: '' } } )
    },
    updateVariables: function() {
      this.regexp_nums = NUM_PARAM_NAMES.map( key => { return { param: key, value: RegExp[key] } })
      this.regexp_vals = OTHER_PARAM_NAMES.map( key => { return { param: key, value: RegExp[key] } })
    },
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
