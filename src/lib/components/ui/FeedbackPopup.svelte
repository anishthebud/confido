<script lang="ts">
  import { lionAvatar } from "$lib/assets";
  
  export let score = 85;
  export let feedback = "Great job on your presentation! Your pace was excellent and your points were clear. Consider adding more vocal variety to enhance engagement.";
  
  function getScoreColor(score: number): string {
      if (score >= 90) return 'text-emerald-400';
      if (score >= 70) return 'text-cyan-400';
      return 'text-amber-400';
  }
  
  const currentDateTime = "2025-02-08 17:17:08";
  const currentUser = "nverma61";
</script>

<div class="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
    <!-- Header with date and user info -->
    <div class="w-full bg-black/20 p-3 text-white/80 text-sm">
        <div class="max-w-4xl mx-auto flex justify-between">
            <span>UTC: {currentDateTime}</span>
            <span>User: {currentUser}</span>
        </div>
    </div>

    <!-- Main content with proper spacing -->
    <div class="max-w-4xl mx-auto p-8 space-y-12 pt-16">
        <div class="text-center space-y-8">
            <h1 class="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300">
                Presentation Completed!
            </h1>
            <div class="text-8xl font-bold {getScoreColor(score)}">
                {score}/100
            </div>
        </div>
        
        <div class="flex items-start gap-6 bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-xl p-8 backdrop-blur-sm mt-12">
            <img 
                src={lionAvatar} 
                alt="AI Coach"
                class="w-24 h-24 rounded-full border-4 border-cyan-400 shadow-glow flex-shrink-0"
            />
            <div class="relative flex-grow">
                <!-- Speech bubble triangle -->
                <div class="absolute left-[-20px] top-8 w-0 h-0 
                           border-t-[10px] border-t-transparent 
                           border-r-[20px] border-r-cyan-200/20 
                           border-b-[10px] border-b-transparent">
                </div>
                
                <!-- Feedback text -->
                <div class="bg-gradient-to-r from-cyan-200/20 to-blue-200/20 rounded-2xl p-8 text-white text-xl leading-relaxed shadow-lg backdrop-blur-sm">
                    {feedback}
                </div>
            </div>
        </div>
        
        <div class="text-center pt-8">
            <button 
                class="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-12 py-5 rounded-full text-xl font-bold
                       hover:from-cyan-300 hover:to-blue-400 transform hover:scale-105 transition-all duration-300
                       shadow-lg hover:shadow-cyan-500/50"
            >
                Continue
            </button>
        </div>
    </div>
</div>

<style>
  .shadow-glow {
      box-shadow: 0 0 15px theme('colors.cyan.400');
  }
</style>