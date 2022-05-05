<script>
	import Header from '../comps/header.svelte';
    
</script>
<Header/>
<main class="">
    <slot></slot>
</main>
<style>
    main {
		height: 100vh;
		background-color: lightblue;
	}
	*{
		font-family: Georgia, 'Times New Roman', Times, serif;
	}
</style>
