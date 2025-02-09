<script>
	import { BadgeAchievementPopup } from '$lib/components';
	import { FeedbackPopup } from '$lib/components';

	let showingBadges = true;
	let showingFeedback = false;

	function handleShowFeedback() {
		showingBadges = false;
		showingFeedback = true;
	}
</script>

{#if showingBadges}
	<BadgeAchievementPopup
		score={85}
		presentationCount={3}
		onShowFeedback={handleShowFeedback}
		earnedBadges={[]}
	/>
{/if}

{#if showingFeedback}
	<FeedbackPopup
		score={85}
		feedback="Great job on your presentation! Your pace was excellent and your points were clear. Consider adding more vocal variety to enhance engagement."
	/>
{/if}

