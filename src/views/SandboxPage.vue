<template lang="pug">
main#sandbox
  article
    section
      h2 関数選択
      b-form-group
        b-form-radio-group(v-model="selected" :options="selection")
    section
      h2 正規表現設定
      template(v-if="selected == 'replace'")
        b-badge.p-2.pb-3.font-weight-light(variant="secondary") 置換後文字列
        b-form-input.position-relative.mt-n2.mb-2.border-secondary(
          v-model='replacedStr'
          placeholder="置換後の文字列を書いて下さい。"
        )
      template
        b-badge.p-2.pb-3.font-weight-light(variant="secondary") ターゲット
        b-form-textarea.position-relative.mt-n2.mb-2.border-secondary(
          v-model="target"
          rows="6"
          placeholder="正規表現をチェックする対象を入力"
        )
      template
        b-badge.p-2.pb-3.font-weight-light(variant="secondary") 正規表現
        regular-pattern-textbox.position-relative.mt-n2.mb-2(
          :prefix="'sandbox'"
          :update_expression_callback="update_expression"
          :update_options_callback="update_options_str"
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
        font-awesome-icon.mx-2(:icon="show_vals ? 'angle-down' : 'angle-up'")
      b-collapse#collapse-vals(v-model="show_vals")
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

const FIELDS = [
  { key: 'param' },
  { key: 'value'}
]
const VAL_NAME = ['input', 'lastMatch', 'lastParen', 'leftContext', 'rightContext']
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
      target: '',
      pattern: '',
      options_str: '',
      replacedStr: '',
      results: [],
      regexp_nums: [],
      regexp_vals: [],
      selection: FUNC_SELECTION,
      selected: 'match',
      fields: FIELDS,
      show_vals: false
    }
  },
  computed: {
    regexp_nums_count: function () {
      return this.regexp_nums ? this.regexp_nums.filter( item => !!item.value ).length : 0
    }
  },
  created: function() {
    this.restore_target()
  },
  methods: {
    update_results: function(results, regexp_nums) {
      if (!this.target || !this.pattern) return
      [1,2,3,4,5,6,7,8,9].forEach(num => RegExp[`$${num}`] = '')
      VAL_NAME.forEach(name => RegExp[name] = '')
      let regexp = new RegExp(this.pattern, this.options_str)
      regexp.lastIndex = 0
      switch (this.selected) {
        case 'match':
          this.results = this.target.match(regexp)
          break
        case 'replace':
          this.results = [this.target.replace(regexp, this.replacedStr)]
          break
        case 'exec':
          this.results = regexp.exec(this.target)
          break
        case 'test':
          this.results = [regexp.test(this.target)]
          break
        case 'search':
          this.results = [this.target.search(regexp)]
          break
      }
      this.regexp_nums = [1,2,3,4,5,6,7,8,9].map( num => {
        return { param: `$${num}`, value: RegExp[`$${num}`] }
      })
      this.regexp_vals = VAL_NAME.map( name => {
        return { param: name, value: RegExp[name] }
      })
    },
    store_target: function() {
			if (this.target) localStorage.setItem('target', this.target)
		},
		restore_target: function() {
			let target = localStorage.getItem('target')
      this.target = target ? target : ''
		},
    update_expression: function(pattern) {
      this.pattern = pattern
      this.update_results()
    },
    update_options_str: function(options) {
      this.options_str = options.join('')
      this.update_results()
    }
  },
  watch: {
    target(){
      this.store_target()
      this.update_results()
    },
    selected() {
      this.store_target()
      this.update_results()
    },
    replacedStr() {
      this.store_target()
      this.update_results()
    }
  }
}
</script>

<style lang="sass" scoped>
@import "@/style/contents.sass"

main
  table
    table-layout: fixed
    tbody
      background-color: red !important
    ::v-deep td
      &:first-of-type
        width: 20%
        word-wrap: break-word
</style>
