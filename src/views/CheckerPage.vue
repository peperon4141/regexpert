<template lang="pug">
main.border-left
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
      span 結果
      b-badge.ml-2(variant="secondary") {{ results.length }}
    span(v-if="results.length == 0") 結果はありません。
    ul.pl-1(v-else)
      li.list-unstyled(v-for="result in results")
        font-awesome-icon.mr-2.text-secondary(icon="check")
        span {{ result }}
</template>

<script>
import RegularExpressionTextbox from '@components/RegularExpressionTextbox.vue'

export default {
  components: {
    RegularExpressionTextbox
  },
  data() {
    return {
      target: '',
      expression: '',
      options_str: '',
      results: []
    }
  },
  computed: {
  },
  created: function() {
    this.restore_target_from_local_storage()
  },
  methods: {
    update_results: function() {
      if(this.target && this.expression) {
        this.results = this.target.match(new RegExp(this.expression, this.options_str))
      }
    },
    store_target_to_local_storage: function() {
			if (this.target) localStorage.setItem('target', this.target)
		},
		restore_target_from_local_storage: function() {
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
      this.store_target_to_local_storage()
      this.update_results()
    },
  }
}
</script>

<style lang="sass" scoped>
@import "@/style/contents.sass"
</style>
