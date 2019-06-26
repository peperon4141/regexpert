<template lang="pug">
div
	b-form-input.border-dark(
		v-model='expression'
		placeholder="正規表現式を書いてください"
	)
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
				{ value: 'm', text: 'm:multiline' }
			],
			selected_options: [],
			expression_local_strage_key: `${this.prefix}-expression`,
			selected_options_local_strage_key: `${this.prefix}-selected_options`,
    }
	},
	props: {
		prefix: String,
		update_expression_callback: Function,
		update_options_callback: Function
	},
	created: function () {
		this.restore_expression_from_local_storage()
		this.restore_options_from_local_storage()
	},
  methods: {
		store_expression_to_local_storage: function() {
			if (this.expression) localStorage.setItem(this.expression_local_strage_key, this.expression)
		},
		restore_expression_from_local_storage: function() {
			let expression = localStorage.getItem(this.expression_local_strage_key)
			this.expression = expression ? expression : ''
		},
		store_options_to_local_storage: function() {
			if (this.selected_options) localStorage.setItem(this.selected_options_local_strage_key, JSON.stringify(this.selected_options))
		},
    restore_options_from_local_storage: function() {
			let selected_options = localStorage.getItem(this.selected_options_local_strage_key)
      this.selected_options = (selected_options && JSON.parse(selected_options)) ? JSON.parse(selected_options) : []
		},
  },
  watch: { // 設定が変更されたらローカルストレージに保存する
    expression(){
			this.store_expression_to_local_storage()
			this.update_expression_callback(this.expression)
		},
    selected_options() {
			this.store_options_to_local_storage()
			this.update_options_callback(this.selected_options)
		}
  }
}
</script>

<style lang="sass" scoped>
</style>
