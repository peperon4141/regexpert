<template lang="pug">
main
  article
    section
      h2 ターゲット
      b-form-textarea.border-dark(
        v-model="target"
        rows="6"
        placeholder="正規表現をチェックする対象を入力"
      )
    section
      h2 正規表現
      regular-expression-textbox(
        :prefix="'checker'"
        :update_expression_callback="update_expression"
        :update_options_callback="update_options_str"
      )
    section
      h2
        span matchの結果
        b-badge.ml-2(variant="secondary" v-if="results") {{ results.length }}
      span(v-if="!results || results.length == 0") 結果はありません。
      ul.pl-1(v-else)
        li.list-unstyled(v-for="result in results")
          font-awesome-icon.mr-2.text-secondary(icon="check")
          span {{ result }}
    section
      h2
        span RegExp.$x変数
        b-badge.ml-2(variant="secondary") {{ regexp_nums_count }}
      ul.pl-1
        li.list-unstyled(v-for="(val, index) in regexp_nums" v-if="!!val")
          font-awesome-icon.mr-2.text-secondary(icon="check")
          span ${{index + 1}}: {{ val ? val : 'undefied' }}
    section
      h2
        span RegExpの変数
        b-badge.ml-2(variant="secondary")
      ul.pl-1
        li.list-unstyled(v-for="(val, key) in regexp_vals")
          font-awesome-icon.mr-2.text-secondary(icon="check")
          span.d-inline-block(style="width: 108px;") {{key}}:
          span {{ val }}
</template>

<script>
import RegularExpressionTextbox from '@components/RegularExpressionTextbox.vue'

const VAL_NAME = ['input', 'lastMatch', 'lastParen', 'leftContext', 'rightContext']

export default {
  components: {
    RegularExpressionTextbox
  },
  data() {
    return {
      target: '',
      expression: '',
      options_str: '',
      results: [],
      regexp_nums: [],
      regexp_vals: {},
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
      if(this.target && this.expression) {
        this.results = this.target.match(new RegExp(this.expression, this.options_str))
        this.regexp_nums = [1,2,3,4,5,6,7,8,9].map( num => RegExp[`$${num}`] )
        VAL_NAME.forEach( val_name => {
          this.regexp_vals[val_name] = RegExp[val_name]
        } )
      }
    },
    store_target: function() {
			if (this.target) localStorage.setItem('target', this.target)
		},
		restore_target: function() {
			let target = localStorage.getItem('target')
			this.target = target ? target : ''
		},
    update_expression: function(expression) {
      this.expression = expression
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
  }
}
</script>

<style lang="sass" scoped>
@import "@/style/contents.sass"
</style>
