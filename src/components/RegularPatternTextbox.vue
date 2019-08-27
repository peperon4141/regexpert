<template lang="pug">
#regular-pattern-textbox
	b-form-input.border-secondary(
		v-model="computedPattern"
		placeholder="正規表現式を書いてください"
		aria-describedby="input-live-help input-live-feedback"
		:state="checkRegexp(computedPattern, computedOptionFlags)"
	)
	b-form-invalid-feedback#input-live-feedback {{ error }}
	b-form-checkbox-group(
		v-model="computedOptionFlags"
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
		computedPattern: {
			get() { return this.pattern },
			set(val) { this.$emit('input-pattern', { value: val }) }
		},
		computedOptionFlags: {
			get() { return this.optionFlags },
			set(val) { this.$emit('input-options', { value: val }) }
		}
	},
  methods: {
		checkRegexp: function(pattern, optionFlags) {
			try {
				new RegExp(pattern, optionFlags.join(''))
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
