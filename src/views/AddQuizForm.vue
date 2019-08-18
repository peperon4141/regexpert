<template lang="pug">
main
	article.h-100
		iframe(
			src="https://docs.google.com/forms/d/e/1FAIpQLSdY4N1MMQx05eszHyyOi98fTkByPf-JckwaeQYi6ypVng024A/viewform?embedded=true"
			width="100%"
			height="100%"
			frameborder="0"
			marginheight="0"
			marginwidth="0"
		) 読み込んでいます…
</template>

<script>
export default {
}
</script>

<style lang="sass" scoped>
@import "@/style/contents.sass"

main
	padding: 0
	article
		border: none !important
</style>
