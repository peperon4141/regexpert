<template lang="pug">
main
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
      b-collapse#collapse-num-vals.mt-2
        ul.pl-1
          li.list-unstyled(v-for="(val, index) in regexp_nums" v-if="!!val")
            font-awesome-icon.mr-2.text-secondary(icon="check")
            span.d-inline-block(style="width: 108px;") ${{index + 1}}:
            span {{ val }}
    section
      h2(v-b-toggle.collapse-vals)
        span RegExpの変数
        b-badge.ml-2(variant="secondary")
      b-collapse#collapse-vals
        ul.pl-1
          li.list-unstyled(v-for="(val, key) in regexp_vals")
            font-awesome-icon.mr-2.text-secondary(icon="check")
            span.d-inline-block(style="width: 108px;") {{key}}:
            span {{ val }}
</template>

<script>
import RegularPatternTextbox from '@components/RegularPatternTextbox.vue'

const VAL_NAME = ['input', 'lastMatch', 'lastParen', 'leftContext', 'rightContext']
const FUNC_SELECTION = [
  {text: 'match', value: 'match'},
  {text: 'replace', value: 'replace'},
  {text: 'exec', value: 'exec'},
  {text: 'test', value: 'test'}
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
      regexp_vals: {},
      selection: FUNC_SELECTION,
      selected: 'match'
    }
  },
  computed: {
    regexp_nums_count: function () {
      return this.regexp_nums ? this.regexp_nums.filter( item => !!item ).length : 0
    }
  },
  created: function() {
    this.restore_target()
  },
  methods: {
    update_results: function(results, regexp_nums) {
      if (!this.target || !this.pattern) return
      let regexp = new RegExp(this.pattern, this.options_str)
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
      }
      this.regexp_nums = [1,2,3,4,5,6,7,8,9].map( num => RegExp[`$${num}`] )
      VAL_NAME.forEach( val_name => {
        this.regexp_vals[val_name] = RegExp[val_name]
      } )
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
</style>
