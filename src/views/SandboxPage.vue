<template lang="pug">
main#sandbox
  article
    section
      h2 関数選択
      b-form-group
        b-form-radio-group(v-model="selected" :options="selection")
    section(v-if="selected == 'replace'")
      h2 置換文字列
      b-form-input.border-dark(
        v-model='replacedStr'
        placeholder="置換後の文字列を書いて下さい。"
      )
    section
      h2 ターゲット
      b-form-textarea.border-dark(
        v-model="target"
        rows="6"
        placeholder="正規表現をチェックする対象を入力"
      )
    section
      h2 正規表現
      regular-pattern-textbox(
        :prefix="'sandbox'"
        :update_expression_callback="update_expression"
        :update_options_callback="update_options_str"
      )
    section
      h2
        span {{selected}}の結果
        b-badge.ml-2(variant="secondary" v-if="results") {{ results.length }}
      span(v-if="!results || results.length == 0") 結果はありません。
      ul.pl-1(v-else)
        li.list-unstyled(v-for="result in results")
          font-awesome-icon.mr-2.text-secondary(icon="check")
          span {{ result }}
    section
      h2(v-b-toggle.collapse-num-vals)
        span RegExp.$x変数
        b-badge.ml-2(variant="secondary") {{ regexp_nums_count }}
        font-awesome-icon.mx-2(:icon="show_num_vals ? 'angle-down' : 'angle-up'")
      b-collapse#collapse-num-vals(v-model="show_num_vals")
        b-table.pr-2(
          style="overflow: hidden"
          fill
          striped
          small
          bordered
          outlined
          :items="regexp_nums"
          thead-class="d-none"
        )
    section
      h2(v-b-toggle.collapse-vals)
        span RegExpの変数
        b-badge.ml-2(variant="secondary")
        font-awesome-icon.mx-2(:icon="show_vals ? 'angle-down' : 'angle-up'")
      b-collapse#collapse-vals(v-model="show_vals")
        b-table.pr-2(
          style="overflow: hidden"
          fill
          striped
          small
          bordered
          outlined
          :items="regexp_vals"
          thead-class="d-none"
        )
</template>

<script>
import RegularPatternTextbox from '@components/RegularPatternTextbox.vue'

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
      show_num_vals: false,
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
        return { variable: `$${num}`, value: RegExp[`$${num}`] }
      })
      this.regexp_vals = VAL_NAME.map( name => {
        return { variable: name, value: RegExp[name] }
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
    ::v-deep td
      &:first-of-type
        width: 20%
        word-wrap: break-word
</style>
