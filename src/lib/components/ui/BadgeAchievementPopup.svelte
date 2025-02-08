<script lang="ts">
  import { fade, fly } from 'svelte/transition';

  interface Badge {
    name: string;
    image: string;
    description: string;
  }

  export let score = 85; // Example score
  export let presentationCount = 3; // Example count
  export let onShowFeedback = () => {}; // Function to show feedback popup
  
  // Determine which badges earned
  const earnedBadges: Badge[] = [];
  
  // Presentation count badges
  if (presentationCount >= 1) earnedBadges.push({
    name: "First Presentation",
    image: "firstPresentation.png",
    description: "Completed your first presentation!"
  });
  
  if (presentationCount >= 3) earnedBadges.push({
    name: "Regular Speaker",
    image: "threePresentation.png",
    description: "Completed three presentations!"
  });
  
  if (presentationCount >= 5) earnedBadges.push({
    name: "Speaking Pro",
    image: "fivePresentation.png",
    description: "Completed five or more presentations!"
  });
  
  // Score badges
  if (score >= 50 && score <= 79) earnedBadges.push({
    name: "Rising Star",
    image: "bronzeBadge.png",
    description: "Scored between 50-79 points!"
  });
  
  if (score >= 80 && score <= 99) earnedBadges.push({
    name: "Expert Speaker",
    image: "silverBadge.png",
    description: "Scored between 80-99 points!"
  });
  
  if (score === 100) earnedBadges.push({
    name: "Perfect Score",
    image: "goldBadge.png",
    description: "Achieved a perfect score of 100!"
  });
</script>

<div 
class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
in:fade
>
<div 
  class="bg-gradient-to-b from-purple-600 to-blue-600 rounded-2xl p-8 max-w-2xl w-full mx-4 text-white shadow-2xl"
  in:fly={{ y: 20, duration: 800 }}
>
  <div class="text-center">
    <h1 class="text-4xl font-bold text-yellow-300 mb-2 animate-bounce">
      🎉 Congratulations! 🎉
    </h1>
    <p class="text-xl font-bold text-blue-100 mb-8">
      You have earned the following badges:
    </p>
    
    <div class="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
      {#each earnedBadges as badge}
        <div 
          class="bg-white/10 backdrop-blur-sm rounded-xl p-4 transform hover:scale-105 transition-transform"
          in:fly={{ y: 20, duration: 800, delay: 200 }}
        >
          <img 
            src={badge.image} 
            alt={badge.name}
            class="w-24 h-24 mx-auto"
          />
        </div>
      {/each}
    </div>
    
    <button 
      class="bg-white text-blue-600 px-8 py-3 rounded-full text-lg hover:bg-blue-50 flex items-center gap-2 mx-auto font-semibold"
      on:click={onShowFeedback}
    >
      View Feedback
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9 18l6-6-6-6"/>
      </svg>
    </button>
  </div>
</div>
</div>