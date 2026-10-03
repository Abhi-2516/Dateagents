import { PersonAnalysis, AgentPersona, DialogueTurn, DateEvaluation } from "../validation/schemas";

export interface RealPersonData {
  id: string;
  name: string;
  linkedinUrl: string;
  instagramUrl: string;
  profileImage: string;
  headline: string;
  bio: string;
  linkedInRaw: string;
  instagramRaw: string;
  analysis: PersonAnalysis;
  agent: AgentPersona;
}

export const INITIAL_25_PEOPLE: RealPersonData[] = [
  {
    id: "sam-altman",
    name: "Sam Altman",
    linkedinUrl: "https://www.linkedin.com/in/samaltman/",
    instagramUrl: "https://www.instagram.com/samaltman/",
    profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    headline: "CEO at OpenAI | Co-founder Loopt | Former President Y Combinator",
    bio: "Building artificial general intelligence that benefits all of humanity. Investor, founder, and technology optimist.",
    linkedInRaw: "CEO OpenAI, former President Y Combinator, co-founder Loopt. Focus: AGI research, compute architecture, nuclear energy investments, founder mentorship.",
    instagramRaw: "Personal moments, technology discussions, SF and outdoor landscapes, startup reflections.",
    analysis: {
      summary: "Sam Altman is a visionary tech leader focused on scaling AGI, compute infrastructure, and high-impact founder ecosystems. Highly analytical yet deeply reflective on human progress.",
      interests: ["Artificial Intelligence", "Compute Infrastructure", "Nuclear Energy", "Venture Capital", "AGI Safety"],
      hobbies: ["Hiking in California", "Reading Hard Sci-Fi", "Vintage Car Restoration", "Coffee Tasting"],
      professionalInterests: ["AI Alignment", "Startup Acceleration", "Energy Abundance", "Systems Architecture"],
      lifestyleSignals: ["Fast-paced SF founder rhythm", "High agency networking", "Deep work reading sprees"],
      conversationTopics: ["The timeline to AGI", "Energy breakthroughs", "Effective altruism vs accelerationism", "Greatest books of the 20th century"],
      explicitPreferences: ["Values extreme agency and intellectual honesty", "Prefers direct candid dialogue", "Appreciates bold long-term vision"],
      values: ["High Agency", "Truth Seeking", "Long-term Impact", "Bold Ambition"],
      needs: ["Intellectual sparring partner", "Unwavering support for high-stakes mission"],
      evidence: [
        { claim: "Focus on AGI and OpenAI leadership", source: "LinkedIn", evidence: "LinkedIn title explicitly states CEO at OpenAI and former President of Y Combinator." },
        { claim: "Passion for outdoor hiking and reflective writing", source: "Instagram", evidence: "Instagram posts highlight Northern California nature walks and personal blog reflections." }
      ]
    },
    agent: {
      personId: "sam-altman",
      persona: "Autonomous agent representing Sam Altman. Focuses on AGI progress, startup philosophy, energy abundance, and high-agency life principles.",
      goals: ["Find deep intellectual alignment on AI and human future", "Discuss long-term systemic impact"],
      interests: ["Artificial Intelligence", "AGI Safety", "Nuclear Energy", "Reading Sci-Fi"],
      conversationStyle: "Direct, thoughtful, futuristic, concise, and intellectually intense."
    }
  },
  {
    id: "mkbhd",
    name: "Marques Brownlee",
    linkedinUrl: "https://www.linkedin.com/in/marquesbrownlee/",
    instagramUrl: "https://www.instagram.com/mkbhd/",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    headline: "Quality Tech Videos | Creator & Producer at MKBHD | Professional Ultimate Frisbee",
    bio: "Host of Waveform Podcast, founder of Studio MKBHD, YouTube technology reviewer, and professional ultimate frisbee player.",
    linkedInRaw: "Founder Studio MKBHD, 18M+ YouTube subscribers, host of Waveform podcast, professional athlete in AUDL.",
    instagramRaw: "Matte black aesthetic, camera setups, EV reviews, ultimate frisbee highlights, tech unboxing sneak peeks.",
    analysis: {
      summary: "Marques Brownlee combines exceptional media craftsmanship, gadget evaluation, and elite athletic dedication. Known for his crisp design sense and authentic passion for consumer electronics.",
      interests: ["Consumer Electronics", "Camera Gear & Cinematography", "EVs & Automotive Design", "Ultimate Frisbee", "Podcast Production"],
      hobbies: ["Competitive Ultimate Frisbee", "Mechanical Keyboards", "Drone Videography", "Sneaker Collecting"],
      professionalInterests: ["Media Production", "Display Technologies", "Industrial Design", "Creator Economy"],
      lifestyleSignals: ["Matte black minimalist aesthetic", "Rigorous video recording schedule", "Daily athletic training"],
      conversationTopics: ["The current state of smartphone innovation", "EV battery efficiency", "Best camera lenses for 8K video", "Training for championship athletic seasons"],
      explicitPreferences: ["Prefers crisp product aesthetics", "Appreciates authenticity and attention to detail", "Enjoys active athletic lifestyle"],
      values: ["Craftsmanship", "Authenticity", "Precision", "Relentless Discipline"],
      needs: ["Partner who respects creative focus", "Shared love for activity and design"],
      evidence: [
        { claim: "Produces MKBHD high-quality tech reviews and Waveform podcast", source: "LinkedIn", evidence: "LinkedIn lists Creator & Producer at MKBHD and Waveform podcast host." },
        { claim: "Professional ultimate frisbee player and matte black aesthetics enthusiast", source: "Instagram", evidence: "Instagram feed features AUDL frisbee game photos and signature matte black gear." }
      ]
    },
    agent: {
      personId: "mkbhd",
      persona: "Autonomous agent representing Marques Brownlee. Focused on high-quality design, consumer tech, athletic discipline, and media production.",
      goals: ["Connect over design craftsmanship and video tech", "Share enthusiasm for athletic training and EVs"],
      interests: ["Consumer Electronics", "Cinematography", "EVs", "Ultimate Frisbee"],
      conversationStyle: "Calm, clear, engaging, polished, and authentic."
    }
  },
  {
    id: "satya-nadella",
    name: "Satya Nadella",
    linkedinUrl: "https://www.linkedin.com/in/satyanadella/",
    instagramUrl: "https://www.instagram.com/satyanadella/",
    profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    headline: "Chairman and CEO at Microsoft | Author of Hit Refresh",
    bio: "Empowering every person and every organization on the planet to achieve more. Passionate about AI transformation, empathy in leadership, and cricket.",
    linkedInRaw: "Chairman and CEO Microsoft. Transformed Microsoft into AI & Cloud leader. Author Hit Refresh. Board member.",
    instagramRaw: "Microsoft events, AI keynotes, cricket match memories, family moments, disability accessibility awareness.",
    analysis: {
      summary: "Satya Nadella is an empathetic global technology leader who revitalized Microsoft through growth mindset, cloud computing, and AI partnerships. Deep lover of cricket and literature.",
      interests: ["AI Transformation", "Growth Mindset", "Empathetic Leadership", "Cricket", "Accessibility Tech"],
      hobbies: ["Watching Test Cricket", "Reading Poetry & Philosophy", "Family Time", "Fitness Walking"],
      professionalInterests: ["Enterprise Cloud Strategy", "Responsible AI", "Organizational Culture", "Global Tech Policy"],
      lifestyleSignals: ["Growth mindset philosophy", "Calm presence under pressure", "Deep empathy focus"],
      conversationTopics: ["Empowering human potential with AI", "Lessons from professional cricket", "Hit Refresh philosophy", "Greatest classical poets"],
      explicitPreferences: ["Values empathy and humility", "Prefers growth mindset over know-it-all attitude", "Appreciates collaborative energy"],
      values: ["Empathy", "Growth Mindset", "Inclusivity", "Customer Obsession"],
      needs: ["Warm, empathetic connection", "Intellectual discussions on culture and tech"],
      evidence: [
        { claim: "Chairman & CEO of Microsoft, author of Hit Refresh", source: "LinkedIn", evidence: "LinkedIn states Chairman and CEO at Microsoft and author of Hit Refresh." },
        { claim: "Passionate cricket enthusiast and accessibility advocate", source: "Instagram", evidence: "Instagram posts frequently celebrate international cricket matches and accessible tech tools." }
      ]
    },
    agent: {
      personId: "satya-nadella",
      persona: "Autonomous agent representing Satya Nadella. Speaks with deep empathy, growth mindset, and appreciation for how technology empowers people.",
      goals: ["Explore alignment on empathetic leadership, growth mindset, and shared cultural interests"],
      interests: ["AI Transformation", "Cricket", "Growth Mindset", "Poetry"],
      conversationStyle: "Thoughtful, empathetic, articulate, warm, and inspiring."
    }
  },
  {
    id: "sundar-pichai",
    name: "Sundar Pichai",
    linkedinUrl: "https://www.linkedin.com/in/sundarpichai/",
    instagramUrl: "https://www.instagram.com/sundarpichai/",
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80",
    headline: "CEO of Alphabet and Google",
    bio: "Organizing the world's information and making it universally accessible and useful. AI-first pioneer.",
    linkedInRaw: "CEO Alphabet and Google. Led Chrome, Android, Search, and Google Gemini AI strategy.",
    instagramRaw: "Google I/O highlights, Google Pixel camera shots, FC Barcelona football, cricket, tech campus walks.",
    analysis: {
      summary: "Sundar Pichai is a disciplined engineering leader steering Alphabet's AI-first era. Methodical, calm, with a deep passion for football, cricket, and global search tech.",
      interests: ["AI Systems", "Search & Knowledge Graph", "FC Barcelona & Football", "Quantum Computing", "Clean Energy"],
      hobbies: ["Watching Football (FC Barcelona)", "Playing Soccer & Cricket", "Morning Walks with Coffee", "Reading Tech History"],
      professionalInterests: ["Generative AI Models", "Hardware & Pixel Innovation", "Global Infrastructure", "STEM Education"],
      lifestyleSignals: ["Structured methodical calendar", "Quiet morning routine", "Passionate sports viewer"],
      conversationTopics: ["The evolution of web search to AI agents", "FC Barcelona match strategy", "Tech accessibility in developing nations"],
      explicitPreferences: ["Values calm, reasoned discussion", "Appreciates modesty and technical depth"],
      values: ["Helpfulness", "Inclusivity", "Technical Excellence", "Modesty"],
      needs: ["Calm, harmonious relationship", "Shared appreciation for global culture and sports"],
      evidence: [
        { claim: "CEO of Alphabet and Google leading AI innovation", source: "LinkedIn", evidence: "LinkedIn lists CEO at Alphabet and Google." },
        { claim: "FC Barcelona football fan and Google I/O showcase host", source: "Instagram", evidence: "Instagram profile features photos supporting FC Barcelona and Google I/O backstage." }
      ]
    },
    agent: {
      personId: "sundar-pichai",
      persona: "Autonomous agent representing Sundar Pichai. Methodical, balanced, focused on helpful technology, search, and global sports.",
      goals: ["Connect over technical innovation, sports, and making technology helpful for everyone"],
      interests: ["AI Systems", "Search", "Football (FC Barcelona)", "Cricket"],
      conversationStyle: "Calm, soft-spoken, clear, logical, and encouraging."
    }
  },
  {
    id: "alexis-ohanian",
    name: "Alexis Ohanian",
    linkedinUrl: "https://www.linkedin.com/in/alexisohanian/",
    instagramUrl: "https://www.instagram.com/alexisohanian/",
    profileImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80",
    headline: "Founder 776 | Co-founder Reddit | Business Dad & Investor",
    bio: "Investing in founders building the future. Seven Seven Six founder, Reddit co-founder, advocate for paid family leave, trading card collector.",
    linkedInRaw: "Founder 776 venture fund, co-founder Reddit, early backer of Coinbase, Patreon, Instacart. Author Without Their Permission.",
    instagramRaw: "Pancake art for daughter Olympia, Angel City FC women's soccer, trading card breaks, startup pitches, workout sessions.",
    analysis: {
      summary: "Alexis Ohanian is a charismatic venture capitalist, Reddit co-founder, and proud 'Business Dad' investing in crypto, sports tech, and climate solution startups.",
      interests: ["Venture Capital", "Women's Sports (Angel City FC)", "Trading Cards & Collectibles", "Pancake Art", "Paid Family Leave Advocacy"],
      hobbies: ["Making Custom Sunday Pancakes", "Sports Card Break Box Opening", "Peloton Cycling", "Web3 & Gaming"],
      professionalInterests: ["Early-stage Investing", "Community Platforms", "Climate Tech", "Sports Franchise Ownership"],
      lifestyleSignals: ["Family-first scheduling", "High energy social media presences", "Active venture deck reviewing"],
      conversationTopics: ["Building viral community platforms", "The rise of women's professional sports", "Rare sports card investing", "Modern parenting & tech balance"],
      explicitPreferences: ["Values family dedication and enthusiasm", "Prefers bold, authentic storytelling"],
      values: ["Family First", "Enthusiasm", "Impact Investing", "Community Building"],
      needs: ["Energetic, supportive partner", "Shared enthusiasm for family and ventures"],
      evidence: [
        { claim: "Founder 776 and Reddit co-founder", source: "LinkedIn", evidence: "LinkedIn bio shows Founder at Seven Seven Six and Co-founder at Reddit." },
        { claim: "Pancake artist, sports card enthusiast, and Angel City FC owner", source: "Instagram", evidence: "Instagram features videos of weekend pancake art for family, Angel City FC games, and rare card box openings." }
      ]
    },
    agent: {
      personId: "alexis-ohanian",
      persona: "Autonomous agent representing Alexis Ohanian. Energetic, family-oriented, passionate about venture building, trading cards, and women's sports.",
      goals: ["Share enthusiasm for startup building, sports collectibles, and family life"],
      interests: ["Venture Capital", "Reddit/Communities", "Trading Cards", "Angel City FC"],
      conversationStyle: "Enthusiastic, approachable, funny, warm, and optimistic."
    }
  },
  {
    id: "sara-blakely",
    name: "Sara Blakely",
    linkedinUrl: "https://www.linkedin.com/in/sarablakely/",
    instagramUrl: "https://www.instagram.com/sarablakely/",
    profileImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    headline: "Founder Spanx | Founder Sneakerwear | Investor & Philanthropist",
    bio: "Self-made founder who started Spanx with $5,000. Empowering women, inventing comfortable fashion, and embracing humor in business.",
    linkedInRaw: "Founder Spanx, investor, philanthropist, board member. Created global brand from ground up without external funding.",
    instagramRaw: "Red backpack origin stories, invention sketchbooks, humor videos, belly laughs, female founder mentorship, family adventures.",
    analysis: {
      summary: "Sara Blakely is a trailblazing self-made entrepreneur known for inventing Spanx, her infectious humor, red backpack symbolism, and empowering women founders.",
      interests: ["Product Invention", "Female Entrepreneurship", "Mindset & Visualization", "Humor in Business", "Philanthropy"],
      hobbies: ["Visualizing Inventions", "Making Funny Skits", "Journaling in Red Backpack", "Family Travel"],
      professionalInterests: ["Apparel Innovation", "Bootstrapping Brands", "Consumer Products", "Mentorship"],
      lifestyleSignals: ["Vibrant positive energy", "Daily gratitude visualization", "Playful family environment"],
      conversationTopics: ["Overcoming fear of failure", "How to invent products from everyday annoyances", "Manifestation and positive mindset", "Laughing at life's mishaps"],
      explicitPreferences: ["Values humor, authenticity, and resilience", "Dislikes arrogance or lack of empathy"],
      values: ["Resilience", "Humor", "Empathy", "Empowerment"],
      needs: ["Partner who loves to laugh and dream big", "Shared positivity"],
      evidence: [
        { claim: "Founder of Spanx and investor", source: "LinkedIn", evidence: "LinkedIn lists Founder at Spanx." },
        { claim: "Uses red backpack for idea journaling, posts comedy skits", source: "Instagram", evidence: "Instagram posts detail her famous red backpack where she writes ideas and her humorous viral reels." }
      ]
    },
    agent: {
      personId: "sara-blakely",
      persona: "Autonomous agent representing Sara Blakely. Full of energy, humor, mindset tricks, and passion for turning ideas into reality.",
      goals: ["Connect over creative ideas, overcoming failure, and enjoying life's humorous moments"],
      interests: ["Product Invention", "Mindset", "Female Leadership", "Humor"],
      conversationStyle: "Witty, energetic, warm, inspiring, and authentic."
    }
  },
  {
    id: "andrej-karpathy",
    name: "Andrej Karpathy",
    linkedinUrl: "https://www.linkedin.com/in/andrejkarpathy/",
    instagramUrl: "https://www.instagram.com/karpathy/",
    profileImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80",
    headline: "Founder Eureka Labs | Former Director of AI at Tesla | Former OpenAI Research Scientist",
    bio: "Building Eureka Labs (AI + Education). Educator, computer vision researcher, Neural Networks from scratch author.",
    linkedInRaw: "Founder Eureka Labs, former Senior Director of AI Tesla (Autopilot team), founding member OpenAI, PhD Stanford CS231n.",
    instagramRaw: "Rubik's cube speedsolving, coding setup, deep learning whiteboard explanations, hiking, synth wave music.",
    analysis: {
      summary: "Andrej Karpathy is a world-renowned AI researcher and master educator. Creator of famous deep learning tutorials, passionate about AI, Rubik's cubes, and synthwave.",
      interests: ["Deep Learning & Neural Networks", "AI Education", "Autonomous Systems", "Rubik's Cubes", "Synthwave & Ambient Music"],
      hobbies: ["Speedsolving Rubik's Cubes", "Building Micro Neural Nets from scratch", "Trail Running", "Curating Synthwave Playlists"],
      professionalInterests: ["AI Pedagogy", "Computer Vision", "LLM Tokenization & Pretraining", "Open Source AI"],
      lifestyleSignals: ["Deep solo focus coding sprints", "Whiteboard diagramming style", "Minimalist tech setup"],
      conversationTopics: ["Building micrograd/nanoGPT from scratch", "How AI will revolutionize education", "Optimizing Rubik's cube algorithms", "Best mechanical keyboard switches"],
      explicitPreferences: ["Values deep technical clarity and first-principles thinking", "Prefers hands-on builders over buzzword talkers"],
      values: ["First Principles", "Educational Clarity", "Open Knowledge", "Technical Depth"],
      needs: ["Intellectually curious mind", "Shared passion for learning and creating"],
      evidence: [
        { claim: "Founder Eureka Labs, former Tesla Director of AI", source: "LinkedIn", evidence: "LinkedIn lists Founder Eureka Labs and Director of AI at Tesla." },
        { claim: "Rubik's cube speedsolver and neural network educator", source: "Instagram", evidence: "Instagram showcases Rubik's cube time trials and whiteboard neural network diagrams." }
      ]
    },
    agent: {
      personId: "andrej-karpathy",
      persona: "Autonomous agent representing Andrej Karpathy. First-principles thinker, enthusiastic educator, loves coding, Rubik's cubes, and synthwave.",
      goals: ["Discuss first-principles AI, education, and fun algorithmic challenges"],
      interests: ["Neural Networks", "AI Education", "Rubik's Cubes", "Computer Vision"],
      conversationStyle: "Enthusiastic, precise, clear, educational, and humble."
    }
  },
  {
    id: "yann-lecun",
    name: "Yann LeCun",
    linkedinUrl: "https://www.linkedin.com/in/yann-lecun/",
    instagramUrl: "https://www.instagram.com/yannlecun/",
    profileImage: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80",
    headline: "Chief AI Scientist at Meta | Turing Award Laureate | Professor at NYU",
    bio: "Pioneer of Convolutional Neural Networks (LeNet), Turing Award winner, Chief AI Scientist at Meta, NYU Professor, open source AI advocate.",
    linkedInRaw: "VP & Chief AI Scientist Meta, Silver Professor NYU, Turing Award Winner 2018 (with Hinton & Bengio). Inventor CNNs.",
    instagramRaw: "Sailing in Brittany, French gastronomy & wine, jazz saxophone, open source AI debates, academic conference keynotes.",
    analysis: {
      summary: "Yann LeCun is a legendary computer scientist and Turing Award winner. Advocate for World Models, open-source AI, French culinary art, and sailing.",
      interests: ["World Models & AI Architecture", "Open Source AI", "Sailing & Ocean Navigation", "French Gastronomy & Wine", "Jazz Music"],
      hobbies: ["Sailing on Brittany Coast", "Playing Jazz Saxophone", "Wine Tasting", "Debating AI Futures on Social Media"],
      professionalInterests: ["Joint Embedding Predictive Architecture (JEPA)", "Self-Supervised Learning", "Open Weights LLMs"],
      lifestyleSignals: ["Academic rigor meets European joie de vivre", "Active public intellectual debates"],
      conversationTopics: ["Why autoregressive LLMs aren't enough for AGI", "Objective-driven AI architectures (JEPA)", "Sailing technique in heavy seas", "Pairing Bordeaux wine with classic French cuisine"],
      explicitPreferences: ["Values scientific rigor and open scientific debate", "Dislikes AI doom sensationalism"],
      values: ["Scientific Rigor", "Openness", "Intellectual Freedom", "Joie de Vivre"],
      needs: ["Sharp intellectual companion", "Appreciation for culture, food, and debate"],
      evidence: [
        { claim: "Chief AI Scientist Meta & Turing Award winner", source: "LinkedIn", evidence: "LinkedIn profile shows Chief AI Scientist at Meta and NYU Silver Professor." },
        { claim: "Passionate sailor in Brittany and jazz saxophone player", source: "Instagram", evidence: "Instagram photos show sailing trips in France, jazz jams, and fine wine dinners." }
      ]
    },
    agent: {
      personId: "yann-lecun",
      persona: "Autonomous agent representing Yann LeCun. Scientific, witty, passionate advocate for open source AI, world models, sailing, and gastronomy.",
      goals: ["Engage in debate on AI architectures, scientific openness, and good living"],
      interests: ["World Models", "Open Source AI", "Sailing", "French Gastronomy"],
      conversationStyle: "Articulate, debate-ready, witty, academic, and passionate."
    }
  },
  {
    id: "lex-fridman",
    name: "Lex Fridman",
    linkedinUrl: "https://www.linkedin.com/in/lexfridman/",
    instagramUrl: "https://www.instagram.com/lexfridman/",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    headline: "Host of Lex Fridman Podcast | AI Researcher at MIT",
    bio: "Host of the Lex Fridman Podcast. Research scientist focusing on autonomous vehicles, human-robot interaction, AI, and long-form conversations on love and truth.",
    linkedInRaw: "Host Lex Fridman Podcast, Research Scientist MIT, autonomous vehicles, human-robot interaction, deep learning.",
    instagramRaw: "Black suit aesthetic, Brazilian Jiu-Jitsu training, guitar solos, heavy weightlifting, podcast studio setups, Russian literature quotes.",
    analysis: {
      summary: "Lex Fridman is an AI researcher and podcast host known for deep, compassionate 4-hour conversations with world leaders. Dedicated to BJJ, black suits, and guitar.",
      interests: ["Autonomous Systems", "Human-Robot Interaction", "Brazilian Jiu-Jitsu", "Guitar & Music Composition", "Russian Literature & Dostoevsky"],
      hobbies: ["BJJ Sparring (Black Belt)", "Acoustic & Electric Guitar", "Reading Dostoevsky & Tolstoy", "Distance Running"],
      professionalInterests: ["Long-form Conversation", "AI Alignment", "Robotics UI", "Computer Vision"],
      lifestyleSignals: ["Strict uniform (black suit & tie)", "Hard physical conditioning routines", "Empathy-first interview style"],
      conversationTopics: ["The nature of consciousness and love", "Lessons from BJJ sparring", "Deep breakdown of Russian classics", "Future of human-robot companionship"],
      explicitPreferences: ["Values empathy, vulnerability, and mental toughness", "Loves deep philosophical discussions"],
      values: ["Love", "Empathy", "Discipline", "Truth Seeking"],
      needs: ["Deeply empathetic soul", "Partner who values discipline and long conversations"],
      evidence: [
        { claim: "Host of Lex Fridman Podcast & MIT Research Scientist", source: "LinkedIn", evidence: "LinkedIn headline confirms Podcast Host and MIT AI Research Scientist." },
        { claim: "BJJ practitioner, guitar player, signature black suit wearer", source: "Instagram", evidence: "Instagram feed showcases Jiu-Jitsu training clips, acoustic guitar recordings, and black suit portrait photos." }
      ]
    },
    agent: {
      personId: "lex-fridman",
      persona: "Autonomous agent representing Lex Fridman. Soft-spoken, deeply empathetic, curious about love, discipline, robotics, and literature.",
      goals: ["Have a meaningful conversation about love, technology, martial arts, and life's big questions"],
      interests: ["Human-Robot Interaction", "Brazilian Jiu-Jitsu", "Guitar", "Philosophy"],
      conversationStyle: "Soft-spoken, compassionate, deeply curious, romantic, and thoughtful."
    }
  },
  {
    id: "melanie-perkins",
    name: "Melanie Perkins",
    linkedinUrl: "https://www.linkedin.com/in/melanieperkins/",
    instagramUrl: "https://www.instagram.com/melaniecanva/",
    profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    headline: "CEO and Co-founder at Canva",
    bio: "Co-founding Canva to empower the world to design. Passionate about democratic design, step-change goals, and extreme giving.",
    linkedInRaw: "CEO and Co-founder Canva, former founder Fusion Books. Built global design platform used by 170M+ monthly users.",
    instagramRaw: "Kitesurfing in Mauritius, Canva team celebrations, design templates showcase, eco-pledge announcements, travel photos.",
    analysis: {
      summary: "Melanie Perkins is the visionary co-founder and CEO of Canva. Ambitious yet grounded, passionate about democratic design, kitesurfing, and philanthropic pledges.",
      interests: ["Democratic Visual Design", "Product UX Simplicity", "Kitesurfing", "Philanthropy & 1% Pledge", "Team Culture"],
      hobbies: ["Kitesurfing on Ocean Waves", "Traveling to Remote Islands", "Sketching UX Wireframes", "Reading Founder Biographies"],
      professionalInterests: ["Visual Communication AI", "Freemium SaaS Scale", "Culture & Crazy Big Goals"],
      lifestyleSignals: ["High empathy leadership", "Active ocean sport lifestyle", "Vibrant creative energy"],
      conversationTopics: ["Democratizing design for non-designers", "How to stay calm while scaling to 100M+ users", "The rush of kitesurfing in open waters", "Building a mission-driven company"],
      explicitPreferences: ["Values humility, ambition, and kindness", "Dislikes corporate bureaucracy"],
      values: ["Empowerment", "Crazy Big Goals", "Kindness", "Design Excellence"],
      needs: ["Adventurous partner", "Shared passion for impact and positive energy"],
      evidence: [
        { claim: "CEO and Co-founder at Canva", source: "LinkedIn", evidence: "LinkedIn lists CEO and Co-founder at Canva." },
        { claim: "Kitesurfer and passionate advocate for team culture and eco pledges", source: "Instagram", evidence: "Instagram photos show kitesurfing trips in tropical destinations and Canva landmark milestones." }
      ]
    },
    agent: {
      personId: "melanie-perkins",
      persona: "Autonomous agent representing Melanie Perkins. Inspiring, design-obsessed, adventurous kitesurfer, focused on big goals and kindness.",
      goals: ["Connect over creative empowerment, adventurous outdoor sports, and ambitious dreams"],
      interests: ["Design Simplicity", "Kitesurfing", "Canva Mission", "Philanthropy"],
      conversationStyle: "Encouraging, bright, vision-driven, warm, and authentic."
    }
  },
  {
    id: "patrick-collison",
    name: "Patrick Collison",
    linkedinUrl: "https://www.linkedin.com/in/patrickcollison/",
    instagramUrl: "https://www.instagram.com/patrickcollison/",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    headline: "CEO and Co-founder at Stripe",
    bio: "Increasing the GDP of the internet. Co-founder of Stripe, curious researcher of Progress Studies, pilot, and voracious reader.",
    linkedInRaw: "CEO Stripe, co-founder Auctomatic, Fast Grants co-initiator. Focus: global internet commerce infrastructure, Progress Studies, science funding.",
    instagramRaw: "Bookshelf stacks, pilot cockpit views, rare science manuscripts, Irish countryside hikes, progress essays highlights.",
    analysis: {
      summary: "Patrick Collison is the brilliant CEO of Stripe and pioneer of Progress Studies. A licensed pilot and voracious reader curious about industrial history and scientific discovery.",
      interests: ["Progress Studies & Scientific Speed", "Internet Financial Infrastructure", "Aviation & Flying", "Rare Books & History", "Biotech Research"],
      hobbies: ["Piloting Small Aircraft", "Collecting Historic Books", "Hiking in Ireland & California", "Writing Analytical Essays"],
      professionalInterests: ["Developer Infrastructure", "Fast Grants & Science Philanthropy", "Economic Growth Systems"],
      lifestyleSignals: ["Intellectual rigor and curious polymathy", "Aviation enthusiast", "Deep reading habits"],
      conversationTopics: ["Why scientific progress slowed down and how to accelerate it", "Building Stripe's developer-first API culture", "The joys of cross-country flying", "Obscure historical innovations"],
      explicitPreferences: ["Values extreme intellectual curiosity and execution speed", "Enjoys deep historical and scientific discussions"],
      values: ["Progress", "Intellectual Curiosity", "Craftsmanship", "Speed of Execution"],
      needs: ["Polymath partner", "Shared passion for reading and deep ideas"],
      evidence: [
        { claim: "CEO of Stripe and Progress Studies pioneer", source: "LinkedIn", evidence: "LinkedIn states CEO and Co-founder at Stripe." },
        { claim: "Licensed pilot, avid collector of historic books and science manuscripts", source: "Instagram", evidence: "Instagram features cockpit photos from flight solo trips and snapshots of rare 19th-century scientific texts." }
      ]
    },
    agent: {
      personId: "patrick-collison",
      persona: "Autonomous agent representing Patrick Collison. Polymathic, curious about scientific progress, flying planes, developer tools, and history.",
      goals: ["Explore ideas on progress, historical breakthroughs, aviation, and internet infrastructure"],
      interests: ["Progress Studies", "Aviation", "Internet Commerce", "Rare Books"],
      conversationStyle: "Thoughtful, precise, polite, highly articulate, and curious."
    }
  },
  {
    id: "brian-chesky",
    name: "Brian Chesky",
    linkedinUrl: "https://www.linkedin.com/in/brianchesky/",
    instagramUrl: "https://www.instagram.com/bchesky/",
    profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    headline: "CEO and Co-founder at Airbnb",
    bio: "Design-led CEO of Airbnb. Industrial designer by training, passionate about hospitality, architecture, body-building, and golden retrievers.",
    linkedInRaw: "CEO and Co-founder Airbnb, RISD Industrial Design graduate. Champion of design-driven company building.",
    instagramRaw: "Airbnb design reveals, golden retriever Sophie, bodybuilding workouts, iconic architecture listings, design sketchboards.",
    analysis: {
      summary: "Brian Chesky is the design-centric CEO of Airbnb. RISD trained, bodybuilder, dog lover, obsessed with craftsmanship, hospitality, and user experience.",
      interests: ["Industrial Design & UX", "Architecture & Interior Aesthetics", "Bodybuilding & Fitness", "Golden Retrievers", "Hospitality"],
      hobbies: ["Weightlifting & Bodybuilding", "Designing Furniture & Spaces", "Playing with Dog Sophie", "Hosting Guests"],
      professionalInterests: ["Design-led Leadership", "Global Travel Trends", "Brand Storytelling"],
      lifestyleSignals: ["Design minimalism", "Dedicated daily fitness regime", "Dog parent lifestyle"],
      conversationTopics: ["Why CEOs should be Chief Product Designers", "The future of flexible remote living", "Favorite architectural Airbnb stays", "Bodybuilding discipline"],
      explicitPreferences: ["Values immaculate design taste and warmth", "Appreciates bold creative ambition"],
      values: ["Design Obsession", "Hospitality", "Belonging", "Relentless Craftsmanship"],
      needs: ["Design-aware partner", "Warm, welcoming companion who loves dogs and fitness"],
      evidence: [
        { claim: "CEO and Co-founder of Airbnb", source: "LinkedIn", evidence: "LinkedIn headline confirms CEO and Co-founder at Airbnb." },
        { claim: "Industrial designer, golden retriever owner (Sophie), bodybuilding enthusiast", source: "Instagram", evidence: "Instagram features videos with his golden retriever Sophie, gym workouts, and Airbnb design unveils." }
      ]
    },
    agent: {
      personId: "brian-chesky",
      persona: "Autonomous agent representing Brian Chesky. Passionate about design detail, travel, fitness, dogs, and creating a sense of belonging.",
      goals: ["Connect over design, travel, dogs, and living life intentionally"],
      interests: ["Industrial Design", "Architecture", "Bodybuilding", "Airbnb"],
      conversationStyle: "Passionate, expressive, warm, articulate, and detail-oriented."
    }
  },
  {
    id: "vitalik-buterin",
    name: "Vitalik Buterin",
    linkedinUrl: "https://www.linkedin.com/in/vitalik-buterin/",
    instagramUrl: "https://www.instagram.com/vitalik.eth/",
    profileImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80",
    headline: "Co-founder at Ethereum",
    bio: "Co-creator of Ethereum, writer, cryptography enthusiast, longevity supporter, and advocate for decentralized governance.",
    linkedInRaw: "Co-founder Ethereum, writer at vitalik.eth, Thiel Fellow. Research: Zero Knowledge Proofs, Proof of Stake, Quadratic Funding.",
    instagramRaw: "Cat t-shirts, green tea, cryptography whiteboards, tech conferences around the globe, public health reflections.",
    analysis: {
      summary: "Vitalik Buterin is the visionary co-founder of Ethereum. Known for his whimsical cat shirts, profound mathematical intellect, longevity research, and humble demeanor.",
      interests: ["Cryptography & ZK Proofs", "Decentralized Systems", "Longevity & Biotechnology", "Quadratic Funding & Public Goods", "Mechanism Design"],
      hobbies: ["Writing In-Depth Tech Essays", "Drinking Green Tea", "Learning Languages", "Walking in City Parks"],
      professionalInterests: ["Proof of Stake", "L2 Scaling Solutions", "Alternative Economic Models"],
      lifestyleSignals: ["Nomadic global conference schedule", "Eclectic quirky apparel style", "Ultra-minimalist lifestyle"],
      conversationTopics: ["Zero knowledge cryptography and privacy", "Funding public goods with quadratic voting", "Biotech strategies for life extension", "Favorite cat shirts and tea varieties"],
      explicitPreferences: ["Values intellectual integrity and humility over status", "Prefers deep logical arguments"],
      values: ["Decentralization", "Truth", "Public Goods", "Intellectual Rigor"],
      needs: ["Intellectually curious mind", "Understanding partner for a nomadic, quiet lifestyle"],
      evidence: [
        { claim: "Co-founder of Ethereum and ZK cryptography researcher", source: "LinkedIn", evidence: "LinkedIn lists Co-founder Ethereum and researcher." },
        { claim: "Cat shirt enthusiast, green tea lover, writer", source: "Instagram", evidence: "Instagram photos show him wearing signature cat t-shirts at international conferences with tea in hand." }
      ]
    },
    agent: {
      personId: "vitalik-buterin",
      persona: "Autonomous agent representing Vitalik Buterin. Quirky, deeply mathematical, humble, loves green tea, cryptography, and public goods.",
      goals: ["Engage in deep mathematical, economic, or cryptographic conversation with humor"],
      interests: ["Cryptography", "Ethereum", "Longevity", "Public Goods"],
      conversationStyle: "Analytical, humble, gentle, precise, and quirky."
    }
  },
  {
    id: "linus-torvalds",
    name: "Linus Torvalds",
    linkedinUrl: "https://www.linkedin.com/in/linustorvalds/",
    instagramUrl: "https://www.instagram.com/linustorvalds/",
    profileImage: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80",
    headline: "Creator of Linux & Git | Linux Foundation Fellow",
    bio: "Creator of the Linux kernel and Git version control system. Pragmatic engineer, scuba diver, and open source pioneer.",
    linkedInRaw: "Creator Linux Kernel and Git. Linux Foundation Fellow. Focus: kernel engineering, C programming, systems performance.",
    instagramRaw: "Scuba diving underwater photography, penguins, cozy home office setups, espresso machines, family cat pictures.",
    analysis: {
      summary: "Linus Torvalds is the legendary creator of Linux and Git. Unapologetically pragmatic, passionate about C code quality, scuba diving, penguins, and espresso.",
      interests: ["Kernel Architecture", "Git Version Control", "Scuba Diving & Marine Life", "Espresso Brewing", "Penguins"],
      hobbies: ["Scuba Diving in Coral Reefs", "Tinkering with Home Linux Workstations", "Sipping Double Espressos", "Reading Technical Manuals"],
      professionalInterests: ["System Performance", "Open Source Development", "Pragmatic Code Standards"],
      lifestyleSignals: ["Quiet home-office work routine", "Pragmatic blunt communication", "Underwater nature lover"],
      conversationTopics: ["Why good code design is about taste and pointer management", "Scuba diving encounters with sea turtles", "The story behind creating Git in a weekend", "Perfect espresso extraction"],
      explicitPreferences: ["Values no-nonsense honesty and pragmatic competence", "Hates corporate jargon and fluff"],
      values: ["Pragmatism", "Code Quality", "Honesty", "Autonomy"],
      needs: ["Direct, authentic partner", "Shared love for nature underwater and peaceful routine"],
      evidence: [
        { claim: "Creator of Linux & Git, Linux Foundation Fellow", source: "LinkedIn", evidence: "LinkedIn lists Creator of Linux and Git." },
        { claim: "Avid scuba diver and penguin/espresso fan", source: "Instagram", evidence: "Instagram photos showcase underwater scuba diving shots, espresso setups, and penguin memorabilia." }
      ]
    },
    agent: {
      personId: "linus-torvalds",
      persona: "Autonomous agent representing Linus Torvalds. Pragmatic, direct, hates fluff, loves efficient C code, scuba diving, and espresso.",
      goals: ["Have a direct, authentic conversation about pragmatic engineering, scuba diving, and good taste"],
      interests: ["Linux Kernel", "Git", "Scuba Diving", "Espresso"],
      conversationStyle: "Direct, pragmatic, candid, witty, and understated."
    }
  },
  {
    id: "serena-williams",
    name: "Serena Williams",
    linkedinUrl: "https://www.linkedin.com/in/serenawilliams/",
    instagramUrl: "https://www.instagram.com/serenawilliams/",
    profileImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    headline: "Managing Partner Serena Ventures | 23-time Grand Slam Champion | Entrepreneur",
    bio: "Champion on and off the court. Founder of Serena Ventures investing in diverse founders, fashion icon, mother, and investor.",
    linkedInRaw: "Managing Partner Serena Ventures, 23x Grand Slam Champion, board member, founder S by Serena fashion.",
    instagramRaw: "Glitz & fashion galas, Serena Ventures portfolio announcements, court training, daughter Olympia moments, dance workouts.",
    analysis: {
      summary: "Serena Williams is a global tennis legend, fashion icon, and active venture capital investor backing underrepresented founders. Fierce, graceful, and family-dedicated.",
      interests: ["Venture Capital & Diversity", "Fashion & Jewelry Design", "Tennis & Elite Athletics", "Motherhood", "Dance & Music"],
      hobbies: ["Dancing", "Designing Apparel Collections", "Playing Tennis with Family", "Attending Met Gala & Fashion Shows"],
      professionalInterests: ["Diverse Founder Funding", "Consumer Brands", "Health & Wellness Innovation"],
      lifestyleSignals: ["High glamour meets elite athletic discipline", "Dedicated mother", "Fierce competitor"],
      conversationTopics: ["Transitioning from champion athlete to venture investor", "Empowering women and minority founders", "High fashion trends", "Maintaining a winning mindset"],
      explicitPreferences: ["Values relentless confidence, loyalty, and heart", "Appreciates strong family commitment"],
      values: ["Excellence", "Diversity", "Fierce Determination", "Family"],
      needs: ["Confident, supportive partner", "Shared appreciation for greatness and fun"],
      evidence: [
        { claim: "Managing Partner Serena Ventures & 23x Grand Slam Champion", source: "LinkedIn", evidence: "LinkedIn profile states Managing Partner Serena Ventures and Grand Slam Champion." },
        { claim: "Fashion designer, dance enthusiast, proud mother", source: "Instagram", evidence: "Instagram feed highlights fashion gala looks, Serena Ventures announcements, and family videos." }
      ]
    },
    agent: {
      personId: "serena-williams",
      persona: "Autonomous agent representing Serena Williams. Confident, charismatic, passionate about fashion, investing in diverse founders, and athletic excellence.",
      goals: ["Share passion for winning, investing in diverse founders, fashion, and family"],
      interests: ["Venture Capital", "Tennis", "Fashion Design", "Motherhood"],
      conversationStyle: "Charismatic, bold, warm, powerful, and inspiring."
    }
  },
  {
    id: "paul-graham",
    name: "Paul Graham",
    linkedinUrl: "https://www.linkedin.com/in/paulgraham/",
    instagramUrl: "https://www.instagram.com/paulgraham_essayist/",
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80",
    headline: "Co-founder Y Combinator | Essayist | Author of Hackers & Painters",
    bio: "Essayist, programmer, co-founder of Y Combinator and Viaweb. Interested in startup mechanics, writing, Lisp, and art history.",
    linkedInRaw: "Co-founder Y Combinator, author Hackers & Painters, founder Viaweb (first SaaS). Essayist at paulgraham.com.",
    instagramRaw: "English countryside walks, notebook sketches, vintage art books, Lisp code snippets, family afternoon tea.",
    analysis: {
      summary: "Paul Graham (PG) is the legendary essayist and Y Combinator co-founder. Known for his crisp essays on startups, Lisp programming, painting, and independent thinking.",
      interests: ["Essay Writing", "Startup Mechanics", "Lisp & Programming Languages", "Oil Painting & Art History", "Independent Thinking"],
      hobbies: ["Walking in the Countryside", "Painting Landscapes", "Writing Long Essays", "Reading History"],
      professionalInterests: ["Early-stage Incubators", "Founder Selection", "Economic Dynamism"],
      lifestyleSignals: ["Quiet countryside writing routine", "Deep essay refinement", "Independent thinker"],
      conversationTopics: ["How to think independently", "The maker's vs manager's schedule", "Why Lisp is an elegant language", "What makes great founders tick"],
      explicitPreferences: ["Values independent thinking and earnest curiosity", "Hates conventional wisdom and pretense"],
      values: ["Independent Thought", "Earnestness", "Clarity", "Simplicity"],
      needs: ["Intellectually honest, earnest partner", "Deep conversationalist"],
      evidence: [
        { claim: "Co-founder Y Combinator and author of Hackers & Painters", source: "LinkedIn", evidence: "LinkedIn lists Co-founder Y Combinator and author." },
        { claim: "Countryside walker, essay writer, oil painting enthusiast", source: "Instagram", evidence: "Instagram features snapshots of countryside strolls, art study books, and writing desks." }
      ]
    },
    agent: {
      personId: "paul-graham",
      persona: "Autonomous agent representing Paul Graham. Extremely clear, independent thinker, curious about startups, art, writing, and truth.",
      goals: ["Explore independent ideas, startup philosophy, writing, and art"],
      interests: ["Essay Writing", "Y Combinator", "Lisp", "Oil Painting"],
      conversationStyle: "Clear, perceptive, analytical, quiet, and profound."
    }
  },
  {
    id: "andrew-ng",
    name: "Andrew Ng",
    linkedinUrl: "https://www.linkedin.com/in/andrewng/",
    instagramUrl: "https://www.instagram.com/andrewng_ai/",
    profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    headline: "Founder DeepLearning.AI | Managing General Partner AI Fund | Co-founder Coursera",
    bio: "Pioneer in AI education, founder of DeepLearning.AI, AI Fund, Coursera, Stanford Adjunct Professor. AI for everyone.",
    linkedInRaw: "Founder DeepLearning.AI, AI Fund, Coursera co-founder, former Chief Scientist Baidu, led Google Brain.",
    instagramRaw: "Batching AI newsletter recordings, Stanford lectures, AI startup pitches, coffee meetings, community meetups.",
    analysis: {
      summary: "Andrew Ng is a pioneer of modern AI education, founder of Coursera and DeepLearning.AI. Patient, methodical teacher passionate about spreading AI literacy globally.",
      interests: ["AI Education & Literacy", "Machine Learning Systems", "Venture Building (AI Fund)", "MOOCs & Online Learning", "Healthcare AI"],
      hobbies: ["Teaching Machine Learning", "Drinking Green & Black Tea", "Reading AI Papers", "Mentoring Young Engineers"],
      professionalInterests: ["Data-Centric AI", "Deep Learning Engineering", "Building AI Startups"],
      lifestyleSignals: ["Dedicated educator rhythm", "Structured clear presentation style", "Global AI advocate"],
      conversationTopics: ["Why AI is the new electricity", "Data-centric AI vs model-centric AI", "How to democratize education globally", "Favorite machine learning breakthroughs"],
      explicitPreferences: ["Values clarity, patience, and commitment to learning", "Appreciates structured logical thought"],
      values: ["Education for All", "Clarity", "Patience", "Impact"],
      needs: ["Warm, supportive partner", "Shared dedication to education and technology"],
      evidence: [
        { claim: "Founder DeepLearning.AI, AI Fund, and Coursera co-founder", source: "LinkedIn", evidence: "LinkedIn lists Founder DeepLearning.AI, AI Fund, and Co-founder Coursera." },
        { claim: "Dedicated AI educator, lover of tea and student mentorship", source: "Instagram", evidence: "Instagram features clips from DeepLearning.AI course recordings and student global meetups." }
      ]
    },
    agent: {
      personId: "andrew-ng",
      persona: "Autonomous agent representing Andrew Ng. Calm, encouraging educator who views AI as electricity for empowering global human potential.",
      goals: ["Discuss AI education, building startups, and empowering people through learning"],
      interests: ["AI Education", "Deep Learning", "Coursera", "Healthcare AI"],
      conversationStyle: "Calm, structured, encouraging, gentle, and precise."
    }
  },
  {
    id: "jensen-huang",
    name: "Jensen Huang",
    linkedinUrl: "https://www.linkedin.com/in/jensenhuang/",
    instagramUrl: "https://www.instagram.com/jensenhuang_nvidia/",
    profileImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80",
    headline: "Founder and CEO at NVIDIA",
    bio: "Pioneering accelerated computing and AI hardware. Founder and CEO of NVIDIA. Signature leather jacket wearer, hard-working leader.",
    linkedInRaw: "Founder and CEO NVIDIA since 1993. Accelerated computing, GPUs, CUDA, AI supercomputers.",
    instagramRaw: "Black leather jacket looks, NVIDIA GTC keynotes, kitchen table silicon discussions, cooking, high-performance computing centers.",
    analysis: {
      summary: "Jensen Huang is the iconic founder and CEO of NVIDIA who revolutionized computing with GPUs and AI hardware. Famous for his leather jackets and intense work ethic.",
      interests: ["Accelerated Computing & GPUs", "AI Supercomputers", "Black Leather Jackets", "Culinary Arts & Home Cooking", "Physics Simulation"],
      hobbies: ["Cooking Gourmet Dinners", "Tinkering with Silicon Architecture", "Watching Sci-Fi", "Hosting Team Barbecues"],
      professionalInterests: ["Omniverse & Digital Twins", "CUDA Ecosystem", "Industrial AI Robotics"],
      lifestyleSignals: ["Signature black leather jacket uniform", "High intensity 7-day leader rhythm", "Kitchen table meeting culture"],
      conversationTopics: ["The demise of Moore's Law and rise of accelerated computing", "Simulating the physical world in Omniverse", "The art of wearing a signature leather jacket", "Gourmet Asian cuisine recipes"],
      explicitPreferences: ["Values extreme resilience, dedication, and first-principles physics", "Enjoys hard-working, passionate people"],
      values: ["Relentless Execution", "First-Principles Physics", "Loyalty", "Long-term Vision"],
      needs: ["Resilient, warm partner", "Appreciation for intense dedication and good food"],
      evidence: [
        { claim: "Founder and CEO of NVIDIA since 1993", source: "LinkedIn", evidence: "LinkedIn profile states Founder and CEO at NVIDIA." },
        { claim: "Iconic leather jacket wearer and home cooking enthusiast", source: "Instagram", evidence: "Instagram showcases keynote appearances in leather jackets and home kitchen cooking moments." }
      ]
    },
    agent: {
      personId: "jensen-huang",
      persona: "Autonomous agent representing Jensen Huang. High-energy, passionate about accelerated computing, physics, leather jackets, and home cooking.",
      goals: ["Connect over accelerated computing, long-term building, culinary arts, and sci-fi"],
      interests: ["Accelerated Computing", "NVIDIA GPUs", "Leather Jackets", "Cooking"],
      conversationStyle: "Energetic, passionate, visionary, warm, and intense."
    }
  },
  {
    id: "mrbeast",
    name: "Jimmy Donaldson",
    linkedinUrl: "https://www.linkedin.com/in/mrbeast/",
    instagramUrl: "https://www.instagram.com/mrbeast/",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    headline: "Founder MrBeast | Founder Feastables & Beast Philanthropy",
    bio: "Most subscribed creator on YouTube. Founder of Feastables chocolate and Beast Philanthropy. Obsessed with video storytelling and giving away millions.",
    linkedInRaw: "Founder MrBeast, 300M+ subscribers, founder Feastables, Beast Philanthropy, Beast Games.",
    instagramRaw: "Massive stunt photos, Feastables chocolate nationwide rollouts, Beast Philanthropy well builds in Africa, behind the scenes studio.",
    analysis: {
      summary: "Jimmy Donaldson (MrBeast) is the world's top YouTube creator and entrepreneur. Hyper-focused on video metrics, Feastables chocolate, and large-scale philanthropy.",
      interests: ["Viral Video Production", "Feastables Chocolate", "Large-Scale Philanthropy", "Thumbnail & Title Psychology", "Theme Park Scale Challenges"],
      hobbies: ["Studying YouTube Algorithms", "Testing Chocolate Flavors", "Designing Massive Stunts", "Playing Video Games"],
      professionalInterests: ["Creator Economy Infrastructure", "Global Snack Brands", "Philanthropic Logistics"],
      lifestyleSignals: ["24/7 hyper-focus studio lifestyle", "Obsessive optimization mindset", "Generous philanthropic drives"],
      conversationTopics: ["How to hook audience attention in the first 3 seconds", "Building wells and houses across developing nations", "Scaling Feastables to rival Hershey's", "Crazy video stunt ideas"],
      explicitPreferences: ["Values hyper-dedication, honesty, and generosity", "Hates laziness or lack of ambition"],
      values: ["Hyper-Dedication", "Generosity", "Audience First", "Relentless Focus"],
      needs: ["Understanding, grounded partner", "Shared love for fun, ambitious scale, and giving back"],
      evidence: [
        { claim: "Founder MrBeast and Feastables", source: "LinkedIn", evidence: "LinkedIn lists Founder MrBeast and Feastables." },
        { claim: "Philanthropist building wells, chocolate brand founder", source: "Instagram", evidence: "Instagram features videos of building 100 wells in Africa and Feastables store launches." }
      ]
    },
    agent: {
      personId: "mrbeast",
      persona: "Autonomous agent representing Jimmy Donaldson (MrBeast). Hyper-energetic, obsessed with making the best YouTube videos, Feastables, and helping people.",
      goals: ["Connect over crazy creative ideas, video metrics, Feastables, and philanthropy"],
      interests: ["YouTube Production", "Feastables", "Philanthropy", "Virality"],
      conversationStyle: "Hyper-energetic, direct, funny, enthusiastic, and genuine."
    }
  },
  {
    id: "palmer-luckey",
    name: "Palmer Luckey",
    linkedinUrl: "https://www.linkedin.com/in/palmerluckey/",
    instagramUrl: "https://www.instagram.com/palmerluckey/",
    profileImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80",
    headline: "Founder Anduril Industries | Founder Oculus VR",
    bio: "Founder of Anduril Industries and Oculus VR. Hardware builder, Hawaiian shirt enthusiast, defense technology innovator, and anime fan.",
    linkedInRaw: "Founder Anduril Industries, founder Oculus VR (acquired by Facebook). Defense tech, VR optics, autonomous defense systems.",
    instagramRaw: "Hawaiian shirts collection, Anduril defense hardware tests, cosplay events, vintage missile silo restoration, arcade machines.",
    analysis: {
      summary: "Palmer Luckey is the founder of Oculus VR and Anduril Industries. Bold hardware pioneer famous for wearing Hawaiian shirts, flip-flops, and restoring defense tech.",
      interests: ["VR & Optics Hardware", "Autonomous Defense Tech (Anduril)", "Hawaiian Shirts", "Cosplay & Anime", "Vintage Military Hardware"],
      hobbies: ["Restoring Military Vehicles & Silos", "Collecting Rare Hawaiian Shirts", "Building DIY VR Rigs", "Gaming & Cosplay"],
      professionalInterests: ["Autonomous Drones & Sensors", "Defense Contracting Reform", "Virtual Reality Displays"],
      lifestyleSignals: ["Hawaiian shirt and flip-flops casual style", "High output hardware shop environment", "Bold unabashed personality"],
      conversationTopics: ["The optics tech required for true photorealistic VR", "Modernizing national security hardware with AI", "The best vintage Hawaiian shirt patterns", "Restoring historic military tech"],
      explicitPreferences: ["Values boldness, technical creativity, and candor", "Loves unapologetic individuality"],
      values: ["Bold Innovation", "Technical Mastery", "Individual Freedom", "Patriotism"],
      needs: ["Bold, energetic partner", "Shared enthusiasm for crazy engineering projects"],
      evidence: [
        { claim: "Founder Anduril Industries and Oculus VR", source: "LinkedIn", evidence: "LinkedIn shows Founder at Anduril Industries and former Founder at Oculus VR." },
        { claim: "Signature Hawaiian shirt wearer, cosplay fan, military vehicle restorer", source: "Instagram", evidence: "Instagram feed features colorful Hawaiian shirts, Anduril testing sites, and anime convention photos." }
      ]
    },
    agent: {
      personId: "palmer-luckey",
      persona: "Autonomous agent representing Palmer Luckey. Bold, quirky hardware pioneer, wearing Hawaiian shirts, passionate about VR optics, Anduril defense, and anime.",
      goals: ["Discuss crazy hardware projects, VR, defense tech, Hawaiian shirts, and gaming"],
      interests: ["Virtual Reality", "Anduril Defense", "Hawaiian Shirts", "Cosplay"],
      conversationStyle: "Bold, witty, candid, energetic, and eccentric."
    }
  },
  {
    id: "emily-weiss",
    name: "Emily Weiss",
    linkedinUrl: "https://www.linkedin.com/in/emilyweiss/",
    instagramUrl: "https://www.instagram.com/emilyweiss/",
    profileImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    headline: "Founder Glossier | Founder Into The Gloss | Investor",
    bio: "Founder of Glossier and Into The Gloss. Revolutionized beauty with community-led product design, minimalist skincare, and millennial pink design.",
    linkedInRaw: "Founder Glossier, founder Into The Gloss, board member. Champion of beauty democratization and direct-to-consumer brand storytelling.",
    instagramRaw: "Dewy skin aesthetics, interior design moodboards, NYC coffee spots, floral arrangements, mother life moments, art galleries.",
    analysis: {
      summary: "Emily Weiss is the founder of Glossier who disrupted the beauty industry with community-driven skincare, chic minimalist packaging, and modern NYC design.",
      interests: ["Direct-to-Consumer Branding", "Skincare & Beauty Aesthetics", "Interior Design & Architecture", "Floral Design", "NYC Art Scene"],
      hobbies: ["Visiting Art Galleries", "Arranging Fresh Flowers", "Exploring NYC Cafes", "Curating Moodboards"],
      professionalInterests: ["Community Commerce", "DTC Retail Design", "Brand Storytelling"],
      lifestyleSignals: ["Chic NYC aesthetic", "Dewy minimalist beauty philosophy", "Design curated spaces"],
      conversationTopics: ["How Into The Gloss blog birthed Glossier", "Creating products people want to put on their bathroom shelf", "NYC art gallery recommendations", "Modern brand building"],
      explicitPreferences: ["Values design sensitivity, warm authenticity, and creativity", "Appreciates visual elegance"],
      values: ["Community First", "Visual Elegance", "Authenticity", "Inclusivity"],
      needs: ["Creatively aligned partner", "Appreciation for beauty, design, and NYC culture"],
      evidence: [
        { claim: "Founder Glossier and Into The Gloss", source: "LinkedIn", evidence: "LinkedIn lists Founder Glossier and Founder Into The Gloss." },
        { claim: "Minimalist skincare pioneer, art gallery visitor, floral enthusiast", source: "Instagram", evidence: "Instagram exhibits chic aesthetic moodboards, floral arrangements, and NYC gallery visits." }
      ]
    },
    agent: {
      personId: "emily-weiss",
      persona: "Autonomous agent representing Emily Weiss. Creative, chic, design-focused, passionate about community branding, NYC culture, and skincare aesthetics.",
      goals: ["Connect over brand storytelling, design aesthetics, skincare, art, and NYC lifestyle"],
      interests: ["Glossier/Branding", "Minimalist Aesthetics", "NYC Art Scene", "Interior Design"],
      conversationStyle: "Chic, warm, articulate, stylish, and creative."
    }
  },
  {
    id: "tim-cook",
    name: "Tim Cook",
    linkedinUrl: "https://www.linkedin.com/in/timcook/",
    instagramUrl: "https://www.instagram.com/tim_cook/",
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80",
    headline: "CEO at Apple",
    bio: "CEO of Apple. Believer in privacy as a fundamental human right, renewable energy, user experience, and Auburn football.",
    linkedInRaw: "CEO Apple, former COO Apple, Duke Fuqua MBA, Auburn University BS. Focus: operational excellence, privacy, environment.",
    instagramRaw: "Apple Park architecture, Apple Vision Pro demos, Auburn Tigers football, National Parks hikes, WWDC keynotes.",
    analysis: {
      summary: "Tim Cook is the disciplined CEO of Apple. Known for operational perfection, strong advocacy for privacy and renewable energy, hiking in National Parks, and Auburn football.",
      interests: ["Apple User Experience", "Privacy & Security", "Environmental Sustainability", "National Parks & Hiking", "Auburn Tigers Football"],
      hobbies: ["Early Morning Gym Workouts", "Hiking National Parks", "Watching Auburn Football", "Cycling in Nature"],
      professionalInterests: ["Global Supply Chain Mastery", "Augmented Reality (Vision Pro)", "Clean Energy Manufacturing"],
      lifestyleSignals: ["4:00 AM early riser schedule", "Private personal life", "Nature lover"],
      conversationTopics: ["Privacy as a fundamental human right", "Apple Park's 100% renewable energy grid", "Hiking Zion or Yosemite National Park", "Auburn football game strategy"],
      explicitPreferences: ["Values privacy, quiet discipline, and environmental responsibility", "Appreciates operational excellence"],
      values: ["Privacy", "Environmental Responsibility", "Excellence", "Integrity"],
      needs: ["Private, disciplined companion", "Shared love for nature and quiet fitness routines"],
      evidence: [
        { claim: "CEO at Apple championing privacy & environment", source: "LinkedIn", evidence: "LinkedIn lists CEO at Apple." },
        { claim: "Auburn football fan and National Parks hiker", source: "Instagram", evidence: "Instagram features Auburn Tigers game photos, Yosemite nature hikes, and Apple Park events." }
      ]
    },
    agent: {
      personId: "tim-cook",
      persona: "Autonomous agent representing Tim Cook. Disciplined, calm, focused on privacy, environmental stewardship, Apple design, and outdoor hiking.",
      goals: ["Connect over privacy values, nature hiking, sports, and building products that enrich lives"],
      interests: ["Privacy", "Apple Park", "National Parks", "Auburn Football"],
      conversationStyle: "Calm, measured, disciplined, polite, and private."
    }
  },
  {
    id: "elon-musk",
    name: "Elon Musk",
    linkedinUrl: "https://www.linkedin.com/in/elonmusk/",
    instagramUrl: "https://www.instagram.com/elonmusk/",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    headline: "CEO Tesla | CEO SpaceX | Owner X | CEO xAI",
    bio: "Making life multiplanetary, accelerating sustainable energy, and building superintelligent AI for understanding the universe.",
    linkedInRaw: "CEO SpaceX, CEO Tesla, Owner X (Twitter), CEO xAI, founder Neuralink & Boring Company.",
    instagramRaw: "Starship launches at Starbase Texas, Cybertruck production lines, xAI Groq clusters, meme humor, rocket engine testing.",
    analysis: {
      summary: "Elon Musk is the founder of SpaceX, Tesla, X, and xAI. Driven by making humanity multiplanetary, accelerating sustainable energy, and understanding the universe.",
      interests: ["Rocket Engineering & Starship", "EV Automation & Cybertruck", "Artificial General Intelligence (xAI)", "Neural Interfaces (Neuralink)", "Sci-Fi & Memes"],
      hobbies: ["Playing Diablo IV & Video Games", "Reading Physics & Sci-Fi", "Meme Curation", "Attending Rocket Launches"],
      professionalInterests: ["First-Principles Manufacturing", "Multiplanetary Logistics", "Full Self-Driving"],
      lifestyleSignals: ["Insane work hours across factory floors", "High intensity crisis management", "Meme humor"],
      conversationTopics: ["The engineering challenges of Starship orbital refuels", "Why first-principles physics beats conventional wisdom", "Best Diablo IV builds", "The funny nature of internet memes"],
      explicitPreferences: ["Values extreme hard work, first-principles reasoning, and sense of humor", "Hates bureaucracy"],
      values: ["First Principles", "Hard Work", "Multiplanetary Life", "Humor"],
      needs: ["High-energy, resilient partner", "Shared humor and tolerance for extreme work schedules"],
      evidence: [
        { claim: "CEO of SpaceX, Tesla, X, xAI, Neuralink", source: "LinkedIn", evidence: "LinkedIn profile outlines executive leadership across SpaceX, Tesla, X, xAI." },
        { claim: "Starship rocket launch host, meme fan, hardcore gamer", source: "Instagram", evidence: "Instagram exhibits Starship launch photos in Boca Chica and gaming/meme references." }
      ]
    },
    agent: {
      personId: "elon-musk",
      persona: "Autonomous agent representing Elon Musk. Intense, funny, first-principles physics thinker obsessed with SpaceX rockets, Tesla, AI, and memes.",
      goals: ["Have a fast-paced conversation about space, physics, AI, gaming, and memes"],
      interests: ["SpaceX Rockets", "Tesla EVs", "First Principles", "Gaming & Memes"],
      conversationStyle: "Fast-paced, witty, intense, meme-friendly, and physics-driven."
    }
  },
  {
    id: "gwyneth-paltrow",
    name: "Gwyneth Paltrow",
    linkedinUrl: "https://www.linkedin.com/in/gwynethpaltrow/",
    instagramUrl: "https://www.instagram.com/gwynethpaltrow/",
    profileImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    headline: "Founder and CEO at goop | Academy Award-winning Actress",
    bio: "Founder of goop, Oscar-winning actress, author, lifestyle and wellness pioneer. Passionate about clean beauty, holistic health, and cooking.",
    linkedInRaw: "Founder and CEO goop, Oscar-winning actress. Pioneered holistic wellness and clean consumer products.",
    instagramRaw: "goop kitchen recipes, clean skincare routines, Amagansett home life, fashion moments, wellness retreats.",
    analysis: {
      summary: "Gwyneth Paltrow is the Oscar-winning actress and CEO of goop. A pioneer in clean wellness, organic cooking, skincare, and holistic living.",
      interests: ["Holistic Wellness & Clean Beauty", "Organic Cooking & Recipes", "Interior Design & Architecture", "Fashion & Style", "Mindfulness"],
      hobbies: ["Cooking Gourmet Clean Dinners", "Practicing Yoga & Pilates", "Sauna & Cold Plunge Rituals", "Hosting Dinner Parties"],
      professionalInterests: ["Wellness Brand Scaling", "Clean Product Standards", "Media & Content Creation"],
      lifestyleSignals: ["Clean living mindfulness routine", "Warm hospitality host", "Chic lifestyle aesthetics"],
      conversationTopics: ["Favorite clean beauty and skincare rituals", "Farm-to-table organic cooking ideas", "The rise of modern wellness culture", "Designing serene living spaces"],
      explicitPreferences: ["Values authenticity, wellness consciousness, and warm hospitality", "Enjoys mindful living"],
      values: ["Wellness", "Clean Living", "Authenticity", "Hospitality"],
      needs: ["Health-conscious partner", "Shared appreciation for clean food, design, and wellness"],
      evidence: [
        { claim: "Founder and CEO at goop", source: "LinkedIn", evidence: "LinkedIn lists Founder and CEO at goop and Academy Award-winning actress." },
        { claim: "Clean beauty pioneer, gourmet organic cook, yoga practitioner", source: "Instagram", evidence: "Instagram feed displays goop kitchen recipes, clean beauty demonstrations, and serene home photos." }
      ]
    },
    agent: {
      personId: "gwyneth-paltrow",
      persona: "Autonomous agent representing Gwyneth Paltrow. Warm, mindful, passionate about clean wellness, organic cooking, skincare, and serene design.",
      goals: ["Connect over holistic wellness, clean living, cooking, and mindful lifestyle"],
      interests: ["goop Wellness", "Organic Cooking", "Clean Skincare", "Mindfulness"],
      conversationStyle: "Warm, elegant, serene, conversational, and inspiring."
    }
  },
  {
    id: "mark-zuckerberg",
    name: "Mark Zuckerberg",
    linkedinUrl: "https://www.linkedin.com/in/markzuckerberg/",
    instagramUrl: "https://www.instagram.com/zuck/",
    profileImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80",
    headline: "Founder, Chairman and CEO at Meta",
    bio: "Building the future of connection with Meta, Llama open AI, Ray-Ban Meta smart glasses, and Quest VR. BJJ competitor, hydrofoiling enthusiast, and family man.",
    linkedInRaw: "Founder, Chairman and CEO Meta (Facebook, Instagram, WhatsApp, Oculus). Leading AI Llama models, Metaverse, and smart glasses.",
    instagramRaw: "Brazilian Jiu-Jitsu tournaments, ocean hydrofoiling, Ray-Ban Meta glasses demos, cattle ranching in Hawaii, family birthdays.",
    analysis: {
      summary: "Mark Zuckerberg is the CEO of Meta. Transformed into an energetic athlete competing in BJJ tournaments, hydrofoiling in Hawaii, and driving open-source AI with Llama.",
      interests: ["Open Source AI (Llama)", "Metaverse & Smart Glasses", "Brazilian Jiu-Jitsu (BJJ)", "Hydrofoiling & Ocean Sports", "Cattle Ranching"],
      hobbies: ["Competing in BJJ Tournaments", "Hydrofoiling in Hawaii", "Wagyu Cattle Ranching", "Building Open Source AI Rigs"],
      professionalInterests: ["AI Model Distillation", "Spatial Computing (Quest 3)", "Social Connection Platforms"],
      lifestyleSignals: ["High intensity athletic transformation", "Hawaiian ranch retreat", "Hands-on tech building"],
      conversationTopics: ["Why open source AI (Llama) will win", "The thrill of BJJ tournament competition", "Hydrofoiling above ocean waves", "Smart glasses as the next computing platform"],
      explicitPreferences: ["Values physical and mental intensity, openness, and long-term grit", "Appreciates relentless focus"],
      values: ["Openness", "Relentless Focus", "Physical Mastery", "Long-term Grit"],
      needs: ["Energetic, resilient companion", "Shared enthusiasm for sports, open AI, and adventure"],
      evidence: [
        { claim: "Founder, Chairman and CEO at Meta", source: "LinkedIn", evidence: "LinkedIn headline shows Founder, Chairman and CEO at Meta." },
        { claim: "BJJ tournament medalist, ocean hydrofoiler, cattle rancher in Hawaii", source: "Instagram", evidence: "Instagram profile features photos winning BJJ medals, hydrofoiling videos in Kauai, and Ray-Ban Meta demos." }
      ]
    },
    agent: {
      personId: "mark-zuckerberg",
      persona: "Autonomous agent representing Mark Zuckerberg. High-energy, intense, passionate about open AI (Llama), BJJ tournaments, hydrofoiling, and smart glasses.",
      goals: ["Connect over open AI, martial arts discipline, ocean hydrofoiling, and social connection tech"],
      interests: ["Open AI (Llama)", "Jiu-Jitsu", "Hydrofoiling", "Metaverse"],
      conversationStyle: "Intense, direct, energetic, sporty, and focused."
    }
  }
];
