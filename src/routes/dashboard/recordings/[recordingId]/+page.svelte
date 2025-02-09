<script lang="ts">
	import { BadgeAchievementPopup } from '$lib/components';
	import { FeedbackPopup } from '$lib/components';
	import type { PageProps } from './$types';

	let showingBadges = $state(true);
	let showingFeedback = $state(false);

	let { data }: PageProps = $props();

	function handleShowFeedback() {
		showingBadges = false;
		showingFeedback = true;
	}
</script>

{#if showingBadges}
	<BadgeAchievementPopup onShowFeedback={handleShowFeedback} badges={data.badges} />
{/if}

{#if showingFeedback}
	<FeedbackPopup score={data.scoreInt} feedback={data.comments} />
{/if}
