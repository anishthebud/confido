# Confido
Confido is an AI-powered app that helps users improve their social interaction skills through practice presentations, personalized feedback & analysis, and gamification built by Andy Ye, Anish Budida, Naman Verma, and Rohan Godha!

## links
- [devpost](https://devpost.com/software/confido)
- [demo video](https://youtu.be/IqrxcwaZTj8)
- [github](https://github.com/anishthebud/confido)
- [live website](https://confido.study)

## Inspiration

We've noticed a growing issue among our peers: rapid deterioration of social interaction skills in young teens and adults, as a result of increasing social anxiety.  As daily social interactions are so important in our lives for both professional settings and our general well-being, we decided to come together to combat this issue firsthand through an app that is enhanced through **AI technology, data visualization, and gamification**. 

## What it does
Our app allows users to give a practice presentation on a topic of their choice to Confido, an AI avatar that serves as a speech coach. Users enter any topic of their choice and give details about that topic, and Confido automatically generates a slide deck on that topic for them based on the details they gave. The users then press record to talk about their topic, simulating a real life conversation and/or presentation scenario. Confido then asks questions for the user to respond to, simulating a conversation, and finally analyzes the user's presentation and their question responses to provide a presentation score for the user and gives them personalized feedback. The user is also able to earn badges and track their progress, giving them an incentive to improve.

## How we built it

Our application is a full stack app built using Svelte Kit, Tailwind CSS and Typescript. We store multiple types of data using Pinata cloud, including AI generated images, AI generated audio, and user generated audio. Our database and authentication is made using Supabase. 

We used four different AI services to build all of the parts of the app. First, we use Deepgram’s speech to text model Nova 2 through their API. Then, we feed those transcripts into llama-3.3-70b, our LLM of choice, hosted on Groq. This LLM also handles generating slideshows, asking questions to our users, and scoring our users for our gamification aspect. Our slideshows need images, and our images are made using “fast-lightning-sdxl”, a super fast (and cheap) stable diffusion text to image model. Finally, for our text to speech model, we use Cartesia’s voice cloning to emulate Simba from the Lion King asking questions to the user. 

## Challenges we ran into

Determining how to gamify our system was a crucial aspect of our process. Before even getting into development, we performed extensive research into how current apps and other systems integrate gamification into their product. There was a great deal of research, brainstorming, and careful planning to determine our gamification system and how to implement it. A great amount of time and effort was taken into developing the system as well and fixing it to ensure it worked seamlessly. 

## Accomplishments that we're proud of

We're proud of how we were able to gamify our idea to create a greater appeal to audiences. This ranges from the integration of our AI avatar to our achievement earning system through specific badges a user can earn by accomplishing certain speaking goals. Furthermore, we found ourselves utilizing multiple databases and API calls that enhanced the overall complexity of our product, making it more effective for potential users. Other specific features we were able to implement that felt rewarding include slide deck generation and working with audio files to maintain and analyze them through Pinata. 

## What we learned

We learned how to gamify the learning process of building confidence and public speaking and how to implement it within an app that many people can use. We learned how to use AI to create an avatar that would give feedback based on audio files through an LLM. We learned how to integrate multiple backends from Supabase to Pinata to Groq to build an effective application. Most importantly, we learned to persevere through the challenges and find ways to solve problems through languages that we may or may not have had experience with.

## What's next for Confido

Our next steps for Confido include adding more levels and activities regarding speaking skills and social interaction to further our domain and purpose in improving overall social skills for the younger generation, adding multiple AI avatars in addition to Confido that users can unlock and are able to customize after passing certain levels and earning more achievements, creating a peer connection network where users can do activities or levels with a peer or another user on the app that they connect with. 
