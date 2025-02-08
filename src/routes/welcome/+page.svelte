<script>
	import { lionAvatar } from "$lib/assets";
  import { FeatureCard } from "$lib/components";
</script>

<div class="min-h-screen bg-gradient-to-b from-blue-50 to-white">

  <!-- Hero Section -->
  <div class="max-w-6xl mx-auto px-4 py-16">
    <nav class="flex justify-between items-center mb-16">
      <div class="text-6xl font-bold text-blue-600 relative top-20">Confido</div>
      <div class="space-x-6">
      </div>
    </nav>

    <div class="grid md:grid-cols-2 gap-12 items-center">
      <div>
        <h1 class="text-5xl font-bold text-gray-900 mb-6">
          Boost Your Speaking Skills with AI
        </h1>
        <p class="text-xl text-gray-600 mb-8">
          Practice conversations with our AI companion and get personalized feedback to become a more confident speaker.
        </p>
        <button class="bg-blue-600 text-white px-8 py-3 rounded-full text-lg hover:bg-blue-700 flex items-center gap-2">
          Start Speaking Now
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
            <path d="M5 12h14m-7-7l7 7-7 7"/>
          </svg>
        </button>
      </div>
      <div class="bg-white p-6 rounded-2xl shadow-lg">
      <div class="bg-white p-6 rounded-2xl shadow-lg mr-2">
        <img 
          src={lionAvatar}
          alt="AI Conversation Assistant"
          class="w-full h-full rounded-xl object-contain"
          width="400"
          height="400"
          on:error={(e) => {
            console.error('Image failed to load:', e);
          }}
        />
      </div>
    </div>
  </div>

  <!-- Features Section -->
  <div class="bg-white py-16">
    <div class="max-w-6xl mx-auto px-4">
      <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">
        Why Choose Confido?
      </h2>
      
      <div class="grid md:grid-cols-3 gap-8">
        <FeatureCard 
          icon={{
            svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`
          }}
          title="Natural Conversations"
          description="Practice with our AI that understands context and responds naturally, just like a real conversation."
        />
        <FeatureCard 
          icon={{
            svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5h3a2.5 2.5 0 0 1 2.5 2.5V12a2.5 2.5 0 0 1-5 0V9z"/><path d="M19.5 9H18"/><path d="M4.5 14H6"/><path d="M18 14h1.5a2.5 2.5 0 0 1 0 5h-3a2.5 2.5 0 0 1-2.5-2.5V12a2.5 2.5 0 0 1 5 0v2z"/></svg>`
          }}
          title="Instant Feedback"
          description="Get immediate, constructive feedback on your speaking style, pace, clarity, and more."
        />
        <FeatureCard 
          icon={{
            svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`
          }}
          title="Personalized Growth"
          description="Track your progress through earning achievements when accomplishing speaking goals."
        />
      </div>
    </div>
  </div>

  <!-- CTA Section -->
  <div class="bg-blue-600 text-white py-16">
    <div class="max-w-3xl mx-auto px-4 text-center">
      <h2 class="text-3xl font-bold mb-6">
        Ready to Transform Your Speaking Skills?
      </h2>
      <p class="text-xl mb-8 text-blue-100">
        Join thousands of students who've improved their communication with Confido.
      </p>
    </div>
  </div>
</div>
