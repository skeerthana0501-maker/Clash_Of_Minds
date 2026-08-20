import { DebateTopic } from '../types';

export const INITIAL_GENERAL_TOPICS: DebateTopic[] = [
  {
    id: 'gen-1',
    number: 1,
    category: 'general',
    tag: 'Commerce & Lifestyle',
    motion: 'Online Shopping VS Shopping in Stores',
    context: 'Evaluating algorithm-driven e-commerce, instant doorstep delivery, and global discounts versus tactile in-person product verification, immediate gratification, local business ecosystems, and social retail experiences.',
    forStance: 'Online shopping provides unmatched convenience, infinite price comparisons, reviews, and accessibility 24/7.',
    againstStance: 'Physical retail ensures tactile quality checks, supports local shopkeepers, avoids return-waste, and creates real human interactions.',
    theme: {
      gradient: 'from-cyan-950/70 via-slate-900 to-blue-950/60',
      accent: 'cyan',
      glow: 'rgba(6, 182, 212, 0.25)',
      patternName: 'Shopping & Commerce'
    }
  },
  {
    id: 'gen-2',
    number: 2,
    category: 'general',
    tag: 'Higher Education Policy',
    motion: 'Should College Attendance Be Optional?',
    context: 'Weighing mandatory 75-80% attendance quotas against self-directed study, working students, digital lectures, student mental well-being, and individual academic accountability.',
    forStance: 'College students are legal adults; grading should be strictly based on mastery, exams, and projects rather than passive physical presence.',
    againstStance: 'Mandatory attendance builds professional discipline, collaborative peer discussions, laboratory rigor, and team accountability.',
    theme: {
      gradient: 'from-indigo-950/70 via-slate-900 to-sky-950/60',
      accent: 'indigo',
      glow: 'rgba(99, 102, 241, 0.25)',
      patternName: 'Campus & Education'
    }
  },
  {
    id: 'gen-3',
    number: 3,
    category: 'general',
    tag: 'Psychology & Social Dynamics',
    motion: 'Are Introverts Actually More Fun Than Extroverts?',
    context: 'Challenging conventional social stereotypes: intimate, deep, witty, low-drama one-on-one connections versus high-energy, spontaneous group charisma and party energy.',
    forStance: 'Introverts bring deep observational wit, thoughtful conversations, meaningful loyalty, and creative humor without performative noise.',
    againstStance: 'Extroverts generate spontaneous energy, break awkward silences, rally groups together, and thrive in dynamic social adventures.',
    theme: {
      gradient: 'from-purple-950/70 via-slate-900 to-pink-950/60',
      accent: 'purple',
      glow: 'rgba(168, 85, 247, 0.25)',
      patternName: 'Mind & Personality'
    }
  },
  {
    id: 'gen-4',
    number: 4,
    category: 'general',
    tag: 'Philosophy & Wealth',
    motion: 'Money Can Buy Happiness - Agree or Disagree?',
    context: 'Financial freedom, healthcare security, life experiences, debt relief, and quality time versus intrinsic peace, authentic relationships, mental contentment, and diminishing returns of wealth.',
    forStance: 'Money eliminates survival anxieties, buys world-class healthcare, funds education, and affords freedom of time to pursue passions.',
    againstStance: 'Wealth cannot purchase genuine love, inner peace, emotional fulfillment, or shield against existential loneliness and grief.',
    theme: {
      gradient: 'from-emerald-950/70 via-slate-900 to-teal-950/60',
      accent: 'emerald',
      glow: 'rgba(16, 185, 129, 0.25)',
      patternName: 'Wealth & Philosophy'
    }
  },
  {
    id: 'gen-5',
    number: 5,
    category: 'general',
    tag: 'Literature & Cinema',
    motion: 'Books Vs Movies - Which Tells a Better Story?',
    context: 'The depth of inner monologues, world-building, and imaginative freedom in literature versus cinematic visuals, emotive performances, musical scores, and immersive shared spectacles.',
    forStance: 'Books offer unconstrained imagination, intricate character psychology, and nuanced backstories that film adaptations routinely cut.',
    againstStance: 'Cinematography, sound design, and acting bring characters to life with immediate emotional resonance and accessible visual storytelling.',
    theme: {
      gradient: 'from-amber-950/70 via-slate-900 to-rose-950/60',
      accent: 'amber',
      glow: 'rgba(245, 158, 11, 0.25)',
      patternName: 'Storytelling & Arts'
    }
  },
  {
    id: 'gen-6',
    number: 6,
    category: 'general',
    tag: 'Identity & Society',
    motion: 'Is It Better to Be Famous or Anonymous?',
    context: 'Public influence, prestige, celebrity privileges, and leaving a legacy versus privacy, peaceful unscrutinized living, authentic friendships, and mental tranquility.',
    forStance: 'Fame opens global doors, grants immense cultural influence, and enables people to champion worldwide causes and build lasting legacies.',
    againstStance: 'Anonymity grants the priceless freedom to live without paparazzi, public scrutiny, constant judgment, and loss of private identity.',
    theme: {
      gradient: 'from-sky-950/70 via-slate-900 to-violet-950/60',
      accent: 'sky',
      glow: 'rgba(14, 165, 233, 0.25)',
      patternName: 'Fame & Anonymity'
    }
  },
  {
    id: 'gen-7',
    number: 7,
    category: 'general',
    tag: 'Automotive & Clean Energy',
    motion: 'Electric Vehicles: Are EVs Really the Future of Transportation?',
    context: 'Zero tailpipe emissions, energy efficiency, and modern smart features versus battery mineral supply chains, grid overload, charging infrastructure gaps, and vehicle purchase costs.',
    forStance: 'EVs dramatically curb urban pollution, decouple transit from fossil fuel volatility, and accelerate green grid transitions.',
    againstStance: 'Lithium mining causes severe environmental degradation, charging networks remain fragile, and dirty grid electricity negates green claims.',
    theme: {
      gradient: 'from-teal-950/70 via-slate-900 to-emerald-950/60',
      accent: 'teal',
      glow: 'rgba(20, 184, 166, 0.25)',
      patternName: 'Clean Transit & EV'
    }
  },
  {
    id: 'gen-8',
    number: 8,
    category: 'general',
    tag: 'Fintech & National Economy',
    motion: 'UPI and Digital Payments: Is India Ready to Become a Truly Cashless Economy?',
    context: 'Instant QR transactions, financial inclusion, digital records, and curbing black money versus cybersecurity vulnerabilities, server downtimes, rural digital literacy, and internet divides.',
    forStance: 'India leads the world in real-time digital payments with UPI democratizing street vendor trade and curbing cash leakage.',
    againstStance: 'Rural connectivity gaps, elderly exclusion, server failures, fraud vulnerabilities, and surveillance make physical cash essential.',
    theme: {
      gradient: 'from-orange-950/70 via-slate-900 to-amber-950/60',
      accent: 'orange',
      glow: 'rgba(249, 115, 22, 0.25)',
      patternName: 'Fintech & Cashless Economy'
    }
  },
  {
    id: 'gen-9',
    number: 9,
    category: 'general',
    tag: 'Sports Culture & Gender Equality',
    motion: "Can Women's Sports Ever Receive the Same Attention as Men's Sports?",
    context: 'Historical media broadcast biases, investment disparities, and corporate sponsorship gaps versus record-breaking modern viewership, rising star athletes, and grassroots leagues.',
    forStance: 'Investments in prime-time broadcasting and commercial marketing will create parity, as seen in recent sold-out women’s world cups and WNBA/WPL.',
    againstStance: 'Decades of entrenched commercial male sporting traditions, slower athletic pace perceptions, and advertising revenues maintain a deep gap.',
    theme: {
      gradient: 'from-rose-950/70 via-slate-900 to-pink-950/60',
      accent: 'rose',
      glow: 'rgba(244, 63, 94, 0.25)',
      patternName: 'Sports & Equity'
    }
  },
  {
    id: 'gen-10',
    number: 10,
    category: 'general',
    tag: 'Student Life & Growth',
    motion: 'Hostel Life vs Home Life - Which is Better?',
    context: 'Independence, peer camaraderie, self-reliance, late-night bonding, and problem-solving versus home-cooked food, parental care, quiet study environment, and financial savings.',
    forStance: 'Hostel living builds vital resilience, adaptability, lifelong friendships, and prepares youth for the real independent world.',
    againstStance: 'Home life provides emotional comfort, superior nutrition, quiet study spaces, zero roommate drama, and lower financial burden.',
    theme: {
      gradient: 'from-blue-950/70 via-slate-900 to-cyan-950/60',
      accent: 'blue',
      glow: 'rgba(59, 130, 246, 0.25)',
      patternName: 'Student Lifestyle'
    }
  },
  {
    id: 'gen-11',
    number: 11,
    category: 'general',
    tag: 'Career & Talent Evaluation',
    motion: 'Marks vs Skills: What Matters More for Success?',
    context: 'Academic grades opening initial recruitment doors and signaling discipline versus hands-on problem-solving, emotional intelligence, communication, and technical domain agility.',
    forStance: 'Skills dictate real-world performance, coding/craft execution, client management, and adaptability far beyond theoretical GPA.',
    againstStance: 'High marks act as the primary filtering gateway for premier institutions, scholarships, visas, and competitive top-tier hiring.',
    theme: {
      gradient: 'from-violet-950/70 via-slate-900 to-indigo-950/60',
      accent: 'violet',
      glow: 'rgba(139, 92, 246, 0.25)',
      patternName: 'Skills vs Academic Marks'
    }
  },
  {
    id: 'gen-12',
    number: 12,
    category: 'general',
    tag: 'Digital Society & Psychology',
    motion: 'Social Media: Connecting Us or Controlling Us?',
    context: 'Instant worldwide communication, creator economies, and community finding versus dopamine loops, algorithmic outrage, attention-span decay, and surveillance capitalism.',
    forStance: 'It unites global families, empowers grassroots activism, and gives every individual a broadcast platform without gatekeepers.',
    againstStance: 'Engagement algorithms deliberately exploit human cognitive vulnerabilities, engineer addiction, and polarize society for ad revenue.',
    theme: {
      gradient: 'from-cyan-950/70 via-slate-900 to-teal-950/60',
      accent: 'cyan',
      glow: 'rgba(6, 182, 212, 0.25)',
      patternName: 'Social Algorithms'
    }
  },
  {
    id: 'gen-13',
    number: 13,
    category: 'general',
    tag: 'Curriculum & Future of Work',
    motion: 'Should College Education Be Skill-Based Rather Than Marks-Based?',
    context: 'Rote memorization and outdated theoretical syllabi versus vocational workshops, project portfolios, industry internships, and practical apprenticeships.',
    forStance: 'Employers need graduates who can execute, build, and solve problems from day one rather than regurgitate textbook theories.',
    againstStance: 'Fundamental theoretical rigor and academic discipline are needed to produce researchers, innovators, and structured analytical thinkers.',
    theme: {
      gradient: 'from-amber-950/70 via-slate-900 to-yellow-950/60',
      accent: 'amber',
      glow: 'rgba(245, 158, 11, 0.25)',
      patternName: 'Skill-Based Education'
    }
  },
  {
    id: 'gen-14',
    number: 14,
    category: 'general',
    tag: 'Core Values & Life Philosophy',
    motion: 'Which Is More Important: Money or Happiness?',
    context: 'Economic survival, providing for family, financial security, and freedom versus inner peace, passion, loving relationships, mental health, and personal fulfillment.',
    forStance: 'Money is the tangible prerequisite that shields from hardship, feeds families, and provides the baseline security needed to seek happiness.',
    againstStance: 'The ultimate purpose of human existence is emotional well-being and joy; accumulated wealth without happiness is an empty burden.',
    theme: {
      gradient: 'from-fuchsia-950/70 via-slate-900 to-rose-950/60',
      accent: 'fuchsia',
      glow: 'rgba(217, 70, 239, 0.25)',
      patternName: 'Values & Well-being'
    }
  },
  {
    id: 'gen-15',
    number: 15,
    category: 'general',
    tag: 'Cinema, Art & Historical Truth',
    motion: 'Should Historical Movies Prioritize Accuracy Over Entertainment?',
    context: 'Cinematic dramatization, box office pacing, emotional narrative arcs, and artistic liberty versus historical integrity, preserving truth, and preventing public misinformation.',
    forStance: 'Cinema shapes public collective memory; distorting real history for cheap thrills misleads generations and disrespects real figures.',
    againstStance: 'Movies are artistic storytelling vehicles, not dry documentaries; dramatic license is essential to engage audiences emotionally.',
    theme: {
      gradient: 'from-yellow-950/70 via-slate-900 to-amber-950/60',
      accent: 'yellow',
      glow: 'rgba(234, 179, 8, 0.25)',
      patternName: 'History & Cinema'
    }
  },
  {
    id: 'gen-16',
    number: 16,
    category: 'general',
    tag: 'Digital Rights & Social Media',
    motion: 'Privacy Vs Fame - What Matters More Today?',
    context: 'The modern obsession with viral fame, influencer culture, public recognition, and monetization versus digital privacy, boundary preservation, peaceful living, and psychological sanity.',
    forStance: 'Privacy is the foundation of mental freedom, security, personal sovereignty, and genuine relationships.',
    againstStance: 'Public recognition and fame provide social leverage, economic wealth, career opportunities, and a wide-reaching voice.',
    theme: {
      gradient: 'from-slate-900 via-indigo-950/70 to-slate-900',
      accent: 'indigo',
      glow: 'rgba(99, 102, 241, 0.25)',
      patternName: 'Privacy & Identity'
    }
  },
  {
    id: 'gen-17',
    number: 17,
    category: 'general',
    tag: 'Environment & Climate Science',
    motion: 'Is Climate Change Mainly Caused by Human Activities?',
    context: 'Industrial emissions, deforestation, global fossil fuel reliance, and consumer carbon footprints versus natural historical planetary climate cycles, solar radiation fluctuations, and volcanic dynamics.',
    forStance: 'Overwhelming scientific consensus proves accelerated post-industrial carbon emissions and greenhouse gas levels directly drive global heating.',
    againstStance: 'Earth has undergone historical cyclical warming and cooling eras; natural planetary forces and solar cycles play extensive roles.',
    theme: {
      gradient: 'from-emerald-950/70 via-slate-900 to-green-950/60',
      accent: 'emerald',
      glow: 'rgba(16, 185, 129, 0.25)',
      patternName: 'Climate Science & Earth'
    }
  },
  {
    id: 'gen-18',
    number: 18,
    category: 'general',
    tag: 'Youth & Milestones',
    motion: 'College Life vs School Life - Which Phase is Truly Better?',
    context: 'The freedom, self-discovery, independence, campus networks, and career launchpads of college versus the simplicity, stress-free innocence, lifelong childhood friends, and structured protection of school days.',
    forStance: 'College offers true personal freedom, autonomy, intellectual maturity, diverse horizons, and identity creation.',
    againstStance: 'School days represent untroubled childhood joy, genuine innocence, minimal financial burdens, and unbreakable lifelong bonds.',
    theme: {
      gradient: 'from-sky-950/70 via-slate-900 to-blue-950/60',
      accent: 'sky',
      glow: 'rgba(14, 165, 233, 0.25)',
      patternName: 'Student Life Stages'
    }
  },
  {
    id: 'gen-19',
    number: 19,
    category: 'general',
    tag: 'Sociology & Human Progress',
    motion: 'Is Competition Better Than Cooperation?',
    context: 'Evaluating whether competitive market rivalry and ambition drive innovation, excellence, and peak performance, or if cooperative teamwork, mutual aid, and collective synergy build sustainable societies.',
    forStance: 'Competition fuels ambition, pushes human limits, sparks groundbreaking innovations, and prevents complacency.',
    againstStance: 'Cooperation unites collective strengths, builds compassionate communities, avoids toxic burnout, and achieves grand global goals.',
    theme: {
      gradient: 'from-amber-950/70 via-slate-900 to-orange-950/60',
      accent: 'amber',
      glow: 'rgba(245, 158, 11, 0.25)',
      patternName: 'Competition vs Synergy'
    }
  },
  {
    id: 'gen-20',
    number: 20,
    category: 'general',
    tag: 'Behavioral Psychology',
    motion: 'Does First Impression Really Matter?',
    context: 'The psychological reality of thin-slicing, rapid subconscious evaluation in interviews and meetings versus long-term character depth, continuous consistency, and overcoming superficial initial biases.',
    forStance: 'First impressions form within seconds and prime cognitive biases; they heavily dictate hiring, negotiation, and relationship trajectories.',
    againstStance: 'True character, integrity, skills, and emotional depth are revealed over time; judging people on fleeting first moments is inherently flawed.',
    theme: {
      gradient: 'from-purple-950/70 via-slate-900 to-pink-950/60',
      accent: 'purple',
      glow: 'rgba(168, 85, 247, 0.25)',
      patternName: 'Psychology & Perceptions'
    }
  }
];

export const INITIAL_TECHNICAL_TOPICS: DebateTopic[] = [
  {
    id: 'tech-1',
    number: 1,
    category: 'technical',
    tag: 'Infrastructure & Enterprise IT',
    motion: 'Cloud Computing vs Traditional On-Premise Computing',
    context: 'Evaluating elastic multi-tenant cloud scalability, managed redundancy, and pay-as-you-go OPEX models versus sovereign on-premise hardware control, offline reliability, zero subscription lock-in, and strict air-gapped security.',
    forStance: 'Cloud delivers unmatched global elasticity, automated failover, serverless architecture, and eliminates massive up-front hardware capital expenditures.',
    againstStance: 'On-premise infrastructure guarantees complete data sovereignty, zero cloud vendor lock-in, predictable long-term costs, and immunity to cloud provider outages.',
    theme: {
      gradient: 'from-amber-950/70 via-slate-900 to-sky-950/60',
      accent: 'amber',
      glow: 'rgba(245, 158, 11, 0.25)',
      patternName: 'Cloud & Infrastructure'
    }
  },
  {
    id: 'tech-2',
    number: 2,
    category: 'technical',
    tag: 'AI & Software Engineering',
    motion: 'Will AI Replace Software Developers in the Future?',
    context: 'Autonomous multi-modal coding agents, prompt-based code generation, and automated debugging versus architectural system design, human empathy, business logic translation, and security auditing.',
    forStance: 'Autonomous AI agents write, test, and refactor code at zero marginal cost, rapidly reducing the demand for traditional human software engineers.',
    againstStance: 'Coding syntax is just a small tool; true software engineering demands requirements negotiation, architectural judgment, security auditing, and human empathy.',
    theme: {
      gradient: 'from-purple-950/70 via-slate-900 to-indigo-950/60',
      accent: 'purple',
      glow: 'rgba(168, 85, 247, 0.25)',
      patternName: 'AI & Coding Future'
    }
  },
  {
    id: 'tech-3',
    number: 3,
    category: 'technical',
    tag: 'Biometrics & Security',
    motion: 'Face Recognition vs Fingerprint Authentication',
    context: 'Contactless hands-free convenience, 3D structured light sensors, and crowd identification versus physical capacitive spoof-resistance, low false-positive rates, and clear user consent.',
    forStance: 'Facial recognition offers seamless, hygienic, hands-free authentication that works instantly even when fingers are wet, injured, or occupied.',
    againstStance: 'Fingerprint scanning requires explicit deliberate physical interaction, cannot be covertly scanned from a distance, and is less vulnerable to 3D mask spoofing.',
    theme: {
      gradient: 'from-cyan-950/70 via-slate-900 to-blue-950/60',
      accent: 'cyan',
      glow: 'rgba(6, 182, 212, 0.25)',
      patternName: 'Biometric Security'
    }
  },
  {
    id: 'tech-4',
    number: 4,
    category: 'technical',
    tag: 'Programming Languages & Pedagogy',
    motion: 'Java vs Python - Which is Better for Beginners?',
    context: 'Strict static typing, object-oriented memory discipline, and enterprise scaffolding in Java versus readable pseudo-code syntax, rapid prototyping, and immediate beginner satisfaction in Python.',
    forStance: 'Python enables beginners to build real programs and understand core algorithmic thinking without getting bogged down by boilerplate syntax.',
    againstStance: 'Java instills rigorous static typing, memory concepts, and disciplined object-oriented architecture that builds rock-solid software engineering foundations.',
    theme: {
      gradient: 'from-orange-950/70 via-slate-900 to-yellow-950/60',
      accent: 'orange',
      glow: 'rgba(249, 115, 22, 0.25)',
      patternName: 'Language Pedagogy'
    }
  },
  {
    id: 'tech-5',
    number: 5,
    category: 'technical',
    tag: 'Digital Rights & Society',
    motion: 'Is the Internet Becoming a Basic Human Necessity?',
    context: 'Universal digital access to banking, healthcare, job portals, citizen services, and education versus the foundational biological definition of life necessities (food, clean water, and shelter).',
    forStance: 'Modern socioeconomic survival, employment, healthcare access, and civic participation are virtually impossible without internet connectivity.',
    againstStance: 'Human life and fundamental survival depend strictly on biological necessities; labeling internet access as a basic need dilutes urgent poverty and food crises.',
    theme: {
      gradient: 'from-teal-950/70 via-slate-900 to-emerald-950/60',
      accent: 'teal',
      glow: 'rgba(20, 184, 166, 0.25)',
      patternName: 'Digital Human Rights'
    }
  },
  {
    id: 'tech-6',
    number: 6,
    category: 'technical',
    tag: 'Cybersecurity & UX',
    motion: 'Is Two Factor Authentication Necessary for Everyone?',
    context: 'Stopping credential stuffing, brute force breaches, and phishing attacks versus onboarding friction, SMS SIM-swapping vulnerabilities, and device loss lockout risks for non-technical users.',
    forStance: '2FA eliminates over 99% of automated account takeover breaches and is indispensable in an era of billions of compromised credential databases.',
    againstStance: '2FA creates severe friction that locks elderly and non-tech users out of critical accounts, and SMS-based 2FA offers false security due to SIM swapping.',
    theme: {
      gradient: 'from-blue-950/70 via-slate-900 to-indigo-950/60',
      accent: 'blue',
      glow: 'rgba(59, 130, 246, 0.25)',
      patternName: 'Auth & Cybersecurity'
    }
  },
  {
    id: 'tech-7',
    number: 7,
    category: 'technical',
    tag: 'Cognitive Computing & AI',
    motion: 'Can Machines Ever Think Like Humans?',
    context: 'Artificial neural networks, neuromorphic computing, and synthetic reasoning versus biological embodiment, emotional consciousness, intuition, and subjective qualia.',
    forStance: 'The human brain is fundamentally a biological neural network; with sufficient computational scale and sensory embodiment, machines will replicate true cognition.',
    againstStance: 'Silicon computers only perform statistical symbol manipulation; genuine human thought requires biological emotion, subjective consciousness, and lived experience.',
    theme: {
      gradient: 'from-violet-950/70 via-slate-900 to-fuchsia-950/60',
      accent: 'violet',
      glow: 'rgba(139, 92, 246, 0.25)',
      patternName: 'Artificial Consciousness'
    }
  },
  {
    id: 'tech-8',
    number: 8,
    category: 'technical',
    tag: 'Code Synthesis & Automation',
    motion: 'Can AI Write Better Code than Humans?',
    context: 'AI code generators optimizing algorithms, catching syntax bugs, and referencing millions of repos versus human domain context, nuanced business rules, and security edge cases.',
    forStance: 'AI can synthesize optimized, bug-free standard algorithms and cross-reference millions of repositories in milliseconds without human cognitive fatigue.',
    againstStance: 'AI lacks holistic architectural foresight, frequently hallucinates subtle security vulnerabilities, and cannot comprehend complex bespoke business edge cases.',
    theme: {
      gradient: 'from-emerald-950/70 via-slate-900 to-cyan-950/60',
      accent: 'emerald',
      glow: 'rgba(16, 185, 129, 0.25)',
      patternName: 'Code Synthesis'
    }
  },
  {
    id: 'tech-9',
    number: 9,
    category: 'technical',
    tag: 'Fintech & Critical Infrastructure',
    motion: 'Is Digital Payment Technology Making Society Too Dependent on the Internet?',
    context: 'Real-time contactless transactions and economic velocity versus internet outages, power grid blackouts, cyber warfare vulnerabilities, and the total loss of offline commerce.',
    forStance: 'A single telecommunications outage or power grid failure can instantly paralyze commerce, leaving entire communities unable to buy essential food or fuel.',
    againstStance: 'Modern digital financial networks feature robust multi-bank failovers, dramatically curtail physical cash theft, and drive transparent global economic growth.',
    theme: {
      gradient: 'from-amber-950/70 via-slate-900 to-red-950/60',
      accent: 'amber',
      glow: 'rgba(245, 158, 11, 0.25)',
      patternName: 'Fintech Dependency'
    }
  },
  {
    id: 'tech-10',
    number: 10,
    category: 'technical',
    tag: 'EdTech & Immersive Tech',
    motion: 'Is Virtual Reality the Future of Education?',
    context: 'Hands-on experiential learning, 3D simulations, and virtual field trips versus high hardware costs, motion sickness, visual fatigue, and the erosion of real classroom socialization.',
    forStance: 'VR transforms passive textbook memorization into immersive 3D experiences, allowing students to explore molecules, perform virtual surgery, and visit historical eras.',
    againstStance: 'Expensive VR equipment widens educational inequality, causes eye strain and motion sickness, and cannot replace direct human teacher-student mentoring.',
    theme: {
      gradient: 'from-rose-950/70 via-slate-900 to-indigo-950/60',
      accent: 'rose',
      glow: 'rgba(244, 63, 94, 0.25)',
      patternName: 'Virtual Education'
    }
  },
  {
    id: 'tech-11',
    number: 11,
    category: 'technical',
    tag: 'App Architecture & Platforms',
    motion: 'Mobile Apps Vs Web Apps - Which Has a Better Future?',
    context: 'Native performance, sensor access, push notifications, and app store ecosystems versus cross-platform Progressive Web Apps (PWAs), instant link sharing, and bypassing 30% store fees.',
    forStance: 'Web apps and PWAs run frictionlessly on any device through a single URL, require no app store downloads or updates, and bypass restrictive platform commissions.',
    againstStance: 'Native mobile apps deliver unmatched graphics performance, deeper device hardware integration, background services, and offline dependability.',
    theme: {
      gradient: 'from-cyan-950/70 via-slate-900 to-teal-950/60',
      accent: 'cyan',
      glow: 'rgba(6, 182, 212, 0.25)',
      patternName: 'Mobile vs Web'
    }
  },
  {
    id: 'tech-12',
    number: 12,
    category: 'technical',
    tag: 'Software Engineering Mindset',
    motion: 'Programming Skills vs Problem-Solving Skills - Which Matters More?',
    context: 'Syntax fluency, language features, and framework mastery versus logical reasoning, mathematical decomposition, algorithmic thinking, and structural problem breakdown.',
    forStance: 'Programming frameworks and syntax change constantly; strong logical problem-solving and algorithmic thinking remain timeless and adaptable to any tech stack.',
    againstStance: 'Abstract problem-solving is ineffective without deep programming fluency and practical code execution skills required to build real, deployable systems.',
    theme: {
      gradient: 'from-sky-950/70 via-slate-900 to-indigo-950/60',
      accent: 'sky',
      glow: 'rgba(14, 165, 233, 0.25)',
      patternName: 'Problem Solving'
    }
  },
  {
    id: 'tech-13',
    number: 13,
    category: 'technical',
    tag: 'IT Work Culture & Productivity',
    motion: 'Remote IT Jobs vs Office-Based IT Jobs',
    context: 'Zero commutes, global opportunity, flexible schedules, and deep work focus versus in-person whiteboard synergy, spontaneous hallway problem-solving, and junior mentorship.',
    forStance: 'Remote work saves hours of daily commute fatigue, unlocks global career mobility, and provides developers with quiet deep-focus environments for productive output.',
    againstStance: 'Office collaboration fosters spontaneous creative breakthroughs, accelerates junior engineer mentorship, and builds stronger organizational bonds.',
    theme: {
      gradient: 'from-blue-950/70 via-slate-900 to-slate-900',
      accent: 'blue',
      glow: 'rgba(59, 130, 246, 0.25)',
      patternName: 'Work Culture'
    }
  },
  {
    id: 'tech-14',
    number: 14,
    category: 'technical',
    tag: 'Web Engineering Architecture',
    motion: 'Frontend vs Backend - Which is More Important in Web Development?',
    context: 'User interface design, accessibility, responsiveness, conversion rates, and visual polish versus database design, server scalability, business logic, cybersecurity, and data integrity.',
    forStance: 'The frontend is the direct point of contact for users; even the most powerful backend is useless if the user interface is confusing, slow, or inaccessible.',
    againstStance: 'The backend handles data consistency, financial transactions, authentication, and security; without backend reliability, the frontend is merely a cosmetic shell.',
    theme: {
      gradient: 'from-fuchsia-950/70 via-slate-900 to-purple-950/60',
      accent: 'fuchsia',
      glow: 'rgba(217, 70, 239, 0.25)',
      patternName: 'Frontend vs Backend'
    }
  },
  {
    id: 'tech-15',
    number: 15,
    category: 'technical',
    tag: 'Cybersecurity & Public Networks',
    motion: 'Public Wi-Fi: Convenience or Security Risk?',
    context: 'Free public accessibility for travelers, remote workers, and students versus man-in-the-middle attacks, rogue access points (evil twins), and packet sniffing vulnerabilities.',
    forStance: 'With ubiquitous HTTPS encryption, modern DNS-over-HTTPS, and automated VPNs, public Wi-Fi is an essential and adequately safe public utility.',
    againstStance: 'Unsecured public Wi-Fi networks expose unsuspecting users to rogue hotspots, packet sniffing, credential theft, and malware injection attacks.',
    theme: {
      gradient: 'from-red-950/70 via-slate-900 to-amber-950/60',
      accent: 'red',
      glow: 'rgba(239, 68, 68, 0.25)',
      patternName: 'Public Wi-Fi Risk'
    }
  },
  {
    id: 'tech-16',
    number: 16,
    category: 'technical',
    tag: 'Career Growth & IT Industry',
    motion: 'Startups vs MNCs - Which Is Better for an IT Career?',
    context: 'Rapid end-to-end responsibility, multifaceted roles, steep learning curves, and equity upside versus corporate stability, structured mentorship, global brand recognition, and work-life balance.',
    forStance: 'Startups offer unmatched hands-on ownership, direct impact on products, fast-tracked promotions, and a comprehensive understanding of end-to-end engineering.',
    againstStance: 'MNCs provide invaluable experience with enterprise-scale distributed systems, structured mentorship, superior financial stability, and prestigious resume branding.',
    theme: {
      gradient: 'from-indigo-950/70 via-slate-900 to-sky-950/60',
      accent: 'indigo',
      glow: 'rgba(99, 102, 241, 0.25)',
      patternName: 'Startup vs MNC'
    }
  },
  {
    id: 'tech-17',
    number: 17,
    category: 'technical',
    tag: 'IT Recruitment & Talent',
    motion: 'Projects vs Academic Marks - What Impresses IT Recruiters More?',
    context: 'Live deployed web applications, open-source code repositories, and technical portfolios versus university GPA, academic honors, and theoretical exam performance.',
    forStance: 'Functional deployed projects and public GitHub commits prove practical competence, engineering passion, and the ability to write production-ready code immediately.',
    againstStance: 'High academic marks demonstrate disciplined work ethic, theoretical computer science mastery, and serve as essential initial recruitment qualification filters.',
    theme: {
      gradient: 'from-teal-950/70 via-slate-900 to-cyan-950/60',
      accent: 'teal',
      glow: 'rgba(20, 184, 166, 0.25)',
      patternName: 'Projects vs Marks'
    }
  },
  {
    id: 'tech-18',
    number: 18,
    category: 'technical',
    tag: 'Credentials & Resume Value',
    motion: 'Internships vs Certifications - Which Adds More Value to an IT Resume?',
    context: 'Practical production experience, team collaboration, agile sprints, and real workplace accountability versus standardized, verifiable vendor certifications (AWS, Cisco, Google Cloud).',
    forStance: 'Internship experience proves an applicant can work in team codebases, handle agile deadlines, and collaborate effectively with real developers and product managers.',
    againstStance: 'Industry-standard cloud and security certifications provide objective, standardized, and globally recognized validation of technical competency.',
    theme: {
      gradient: 'from-amber-950/70 via-slate-900 to-emerald-950/60',
      accent: 'amber',
      glow: 'rgba(245, 158, 11, 0.25)',
      patternName: 'Internship vs Certs'
    }
  },
  {
    id: 'tech-19',
    number: 19,
    category: 'technical',
    tag: 'E-Commerce & Digital Trust',
    motion: 'Can Online Reviews Be Trusted?',
    context: 'Crowdsourced consumer feedback, verified purchase badges, and accountability versus paid review syndicates, AI-generated fake testimonials, and competitor review bombing.',
    forStance: 'Aggregated community reviews empower consumers, reveal genuine product defects, and hold global businesses accountable to high quality standards.',
    againstStance: 'The prevalence of AI-generated fake reviews, review farm syndicates, and competitor sabotage makes online review metrics increasingly unreliable and deceptive.',
    theme: {
      gradient: 'from-yellow-950/70 via-slate-900 to-orange-950/60',
      accent: 'yellow',
      glow: 'rgba(234, 179, 8, 0.25)',
      patternName: 'Online Review Trust'
    }
  },
  {
    id: 'tech-20',
    number: 20,
    category: 'technical',
    tag: 'Deepfakes & Media Law',
    motion: 'Should Face-Morphing Technology Be Legally Regulated?',
    context: 'Preventing non-consensual deepfakes, identity fraud, and election disinformation versus safeguarding artistic freedom, cinematic visual effects, satire, and gaming avatar creativity.',
    forStance: 'Unchecked face-morphing tools enable severe identity theft, digital defamation, and non-consensual exploitation; strict legal regulation and watermarking are imperative.',
    againstStance: 'Overly restrictive legislation risks criminalizing legitimate cinematic VFX, creative digital art, video game avatar creation, and protected free speech.',
    theme: {
      gradient: 'from-rose-950/70 via-slate-900 to-purple-950/60',
      accent: 'rose',
      glow: 'rgba(244, 63, 94, 0.25)',
      patternName: 'Face Morphing Laws'
    }
  }
];

const STORAGE_KEY = 'clash_of_minds_topics_v8_20_exact';

export function getStoredTopics(): { general: DebateTopic[]; technical: DebateTopic[] } {
  try {
    // Purge old versions to ensure users get 20 topics immediately
    [
      'clash_of_minds_topics_v1', 
      'clash_of_minds_topics_v2', 
      'clash_of_minds_topics_v3', 
      'clash_of_minds_topics_v4', 
      'clash_of_minds_topics_v5_20', 
      'clash_of_minds_topics_v6',
      'clash_of_minds_topics_v7_tech_complete'
    ].forEach(key => {
      try { localStorage.removeItem(key); } catch (_) {}
    });

    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.general && parsed.technical && parsed.general.length === 20 && parsed.technical.length === 20) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error reading stored topics:', e);
  }
  return { general: INITIAL_GENERAL_TOPICS, technical: INITIAL_TECHNICAL_TOPICS };
}

export function saveStoredTopics(topics: { general: DebateTopic[]; technical: DebateTopic[] }) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(topics));
  } catch (e) {
    console.error('Error saving topics to localStorage:', e);
  }
}

export function resetStoredTopics() {
  localStorage.removeItem(STORAGE_KEY);
  return { general: INITIAL_GENERAL_TOPICS, technical: INITIAL_TECHNICAL_TOPICS };
}
