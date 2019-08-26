<template lang="pug">
#regular-pattern-textbox
	b-form-input.border-secondary(
		v-model='patternStr'
		placeholder="正規表現式を書いてください"
		aria-describedby="input-live-help input-live-feedback"
		:state="checkRegexp()"
	)
	b-form-invalid-feedback#input-live-feedback {{ error }}
	b-form-checkbox-group(
		v-model="optionsArray"
    :options="optionSelection"
	)
</template>

<script>
const OPTION_SELECTION = [
	{ value: 'i', text: 'i:ignore' },
	{ value: 'g', text: 'g:global' },
	{ value: 'm', text: 'm:multiline' },
	{ value: 'u', text: 'u:unicode' }
]
export default {
  data() {
    return {
			optionSelection: OPTION_SELECTION,
			error: ''
    }
	},
	props: {
		pattern: { type: String, required: true, default: '' },
		optionFlags: { type: Array, required: true, default: [] },
	},
	computed: {
		patternStr: {
			get() { return this.pattern },
			set(val) { if(this.checkRegexp()) { this.$emit('input-pattern', { value: val }) } }
		},
		optionsArray: {
			get() { return this.optionFlags },
			set(val) { if(this.checkRegexp()) { this.$emit('input-options', { value: val }) } }
		}
	},
  methods: {
		checkRegexp: function() {
			try {
				new RegExp(this.patternStr, this.optionsArray.join(''))
				return true
			} catch (error) {
				this.error = error.message
				return false
			}
		}
  },
}
</script>

<style lang="sass" scoped>
</style>
