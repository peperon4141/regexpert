<template lang="pug">
#regular-pattern-textbox
	b-form-input.border-dark(
		v-model='expression'
		placeholder="正規表現式を書いてください"
		aria-describedby="input-live-help input-live-feedback"
		:state="check_regexp()"
	)
	b-form-invalid-feedback#input-live-feedback {{ error }}
	b-form-checkbox-group(
		v-model="selected_options"
    :options="options"
	)
</template>

<script>
export default {
  data() {
    return {
      expression: '',
			options: [
				{ value: 'i', text: 'i:ignore' },
				{ value: 'g', text: 'g:global' },
				{ value: 'm', text: 'm:multiline' },
				{ value: 'u', text: 'u:unicode' }
			],
			selected_options: [],
			expression_local_strage_key: `${this.prefix}-expression`,
			selected_options_local_strage_key: `${this.prefix}-selected_options`,
			error: ''
    }
	},
	props: {
		prefix: String,
		update_expression_callback: Function,
		update_options_callback: Function
	},
	mounted: function () {
		this.restore_expression()
		this.restore_options()
	},
  methods: {
		store_expression: function() {
			if (this.expression) localStorage.setItem(this.expression_local_strage_key, this.expression)
		},
		restore_expression: function() {
			let expression = localStorage.getItem(this.expression_local_strage_key)
			this.expression = expression ? expression : ''
		},
		store_options: function() {
			if (this.selected_options) localStorage.setItem(this.selected_options_local_strage_key, JSON.stringify(this.selected_options))
		},
    restore_options: function() {
			let selected_options = localStorage.getItem(this.selected_options_local_strage_key)
      this.selected_options = (selected_options && JSON.parse(selected_options)) ? JSON.parse(selected_options) : []
		},
		check_regexp: function() {
			try {
				new RegExp(this.expression, this.selected_options.join(''))
				return true
			} catch (error) {
				this.error = error.message
				return false
			}
		}
  },
  watch: { // 設定が変更されたらローカルストレージに保存する
    expression(){
			if (this.check_regexp()) {
				this.store_expression()
				this.update_expression_callback(this.expression)
			}
		},
    selected_options() {
			if (this.check_regexp()) {
				this.store_options()
				this.update_options_callback(this.selected_options)
			}
		}
  }
}
</script>

<style lang="sass" scoped>
</style>
