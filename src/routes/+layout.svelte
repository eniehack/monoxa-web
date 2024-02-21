<script>
	import "../app.css";
</script>

<header>
	<a href="/">voicelog</a>
	<a href="/signin">signin</a>
</header>
<main class="container">
	<slot />
</main>
<footer>
	<a href="http://github.com/eniehack/sechack-demo-voicelog">GitHub</a>
</footer>

<style lang="postcss">
	/*@import 'bootstrap/dist/css/bootstrap.min.css';*/
	footer {
		position: fixed;
		bottom: 0;
	}
</style>
