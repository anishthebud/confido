<script>
	import { BadgeAchievementPopup } from '$lib/components';
	import { FeedbackPopup } from '$lib/components';

	let showingBadges = $state(true);
	let showingFeedback = $state(false);

	let { data } = $props();

	function handleShowFeedback() {
		showingBadges = false;
		showingFeedback = true;
	}
</script>

{#if showingBadges}
	<BadgeAchievementPopup
		score={data.scoreInt || 0}
		presentationCount={3}
		onShowFeedback={handleShowFeedback}
		earnedBadges={data.earnedBadges || []}
	/>
{/if}

{#if showingFeedback}
	<FeedbackPopup score={data.scoreInt} feedback={data.comments} />
{/if}

