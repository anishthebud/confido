<script lang="ts">
	import { wave } from '$lib/assets';
	import { Input } from '$lib/components';
	import { scale } from 'svelte/transition';

	let errorMsg: string = $state('');
	let loading: boolean = $state(false);

	let { form } = $props();

	$effect(() => {
		errorMsg = form?.error ?? errorMsg;
	});

	function validateForm(e: SubmitEvent) {
		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		if (!email || !password) {
			errorMsg = 'All fields are required';
			return false;
		}

		return true;
	}

	function handleSubmit(e: SubmitEvent) {
		loading = true;
		if (!validateForm(e)) {
			e.preventDefault();
		}
	}
</script>

<div
	class="absolute left-1/2 top-1/2 w-80 -translate-x-1/2 -translate-y-1/2 rounded border bg-bg-2 px-8 py-6"
	in:scale={{ duration: 400, start: 0.95 }}
>
	<div class="flex flex-col items-center gap-y-4">
		<div class="flex w-full flex-col items-center gap-y-0.5 text-center">
			<h4>Login</h4>
			<!-- <p class="text-sm text-text-3">Login to continue</p> -->
		</div>
		{#if errorMsg}
			<p class="-my-2 text-center text-sm text-red-500">{errorMsg}</p>
		{/if}

		<form method="POST" class="flex w-full flex-col gap-y-3" onsubmit={handleSubmit}>
			<Input name="email" placeholder="Enter your email address" label="Email" />
			<Input name="password" placeholder="Enter your password" type="password" label="Password" />

			<button disabled={loading} class="btn-primary my-2 h-8">Submit</button>
		</form>
		<span class="h-[1px] w-full bg-border"></span>
		<!-- <button class="btn-secondary h-8 w-full items-center gap-x-1">Continue with Google</button> -->
		<div class="flex gap-x-1 text-sm">
			<span class="text-text-3">Don't have an account?</span>
			<a href="/auth/sign-up" class="link">Sign up</a>
		</div>
	</div>
</div>

<img src={wave} alt="wave" class="fixed bottom-0 right-0 -z-10 h-full w-full object-cover" />
