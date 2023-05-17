<script>
	import '../app.postcss';
</script>

<header>
	<nav class="h-header flex justify-between items-center px-layout">
		<a href="/" class="text-2xl font-semibold font-poppins">Jobsy</a>

		<div class="flex items-center justify-center gap-4">
			<a href="/#about" class="hover:text-gray-700 transition-colors">About Us</a>
			<a
				href="/login"
				class="text-lg bg-purple-500 rounded-full px-3 py-1 text-white hover:bg-purple-600 transition-colors"
			>
				Login
			</a>
		</div>
	</nav>
</header>
<slot />
