export const PROFILE_DATA = {
  name: "Ajay Teli",
  title: "Full Stack Developer & AI Engineer",
  degree: "B.Tech in Electronics and Computer Engineering (Data Science & AI)",
  university: "BML Munjal University",
  batch: "2023 - 2027",
  cgpa: "7.89",
  phone: "+91 9116847163",
  email: "ajay.teli.23ece@bmu.edu.in",
  location: "Gurugram / Rajasthan, India",
  links: {
    github: "https://github.com/ajayteli5252",
    linkedin: "https://linkedin.com/",
    playbook: "#matcher",
  },
  rolesCycling: [
    "Full Stack Developer",
    "AI & RAG Engineer",
    "React & Frontend Specialist",
    "Problem Solver & Builder"
  ]
};

export const SKILLS_DATA = [
  // Programming
  { name: "C++", category: "Programming", level: 85, highlight: "DSA & Core Algorithms" },
  { name: "Python", category: "Programming", level: 88, highlight: "Data Science, AI & RAG" },
  { name: "JavaScript (ES6+)", category: "Programming", level: 92, highlight: "Modern Asynchronous JS" },
  { name: "HTML5 & CSS3", category: "Programming", level: 95, highlight: "Semantic & Responsive" },
  // Frontend
  { name: "React.js", category: "Frontend", level: 92, highlight: "Custom Hooks & Architecture" },
  { name: "Tailwind CSS", category: "Frontend", level: 95, highlight: "Modern UI & Micro-animations" },
  // Backend
  { name: "Node.js", category: "Backend", level: 88, highlight: "Event-driven runtime" },
  { name: "Express.js", category: "Backend", level: 86, highlight: "RESTful Endpoints & Middleware" },
  { name: "REST APIs", category: "Backend", level: 90, highlight: "Stateless architecture" },
  // Databases
  { name: "Supabase (PostgreSQL)", category: "Databases", level: 85, highlight: "Relational & Real-time" },
  { name: "MongoDB", category: "Databases", level: 84, highlight: "NoSQL & Mongoose modeling" },
  { name: "MySQL", category: "Databases", level: 82, highlight: "Schema design & SQL queries" },
  { name: "IndexedDB", category: "Databases", level: 88, highlight: "Client-side offline storage" },
  // Core & Tools
  { name: "DBMS", category: "Core & Tools", level: 86, highlight: "ACID & Normalization" },
  { name: "OOP", category: "Core & Tools", level: 88, highlight: "Encapsulation & Design Patterns" },
  { name: "Git & GitHub", category: "Core & Tools", level: 90, highlight: "Version control & Workflows" },
  { name: "VS Code", category: "Core & Tools", level: 95, highlight: "Daily driver IDE" },
];

export const INITIAL_PROJECTS = [
  {
    id: "proj-1",
    title: "Document QA System Using RAG",
    year: "2026",
    badge: "90% Answer Relevance",
    tech: ["LangChain", "FAISS", "Chroma", "Llama 3", "BM25", "Streamlit"],
    recruiterDesc:
      "Developed an enterprise-grade RAG Document Question Answering system combining FAISS dense vector search and BM25 sparse keyword retrieval with Sentence Transformers, optimizing chunk parameters to achieve 90% answer relevance with zero hallucinations.",
    honestDesc:
      "Taught Llama 3 to actually read the uploaded PDF instead of hallucinating wild answers. Spent hours tuning chunk overlap parameters until it finally hit 90% accuracy without melting my RAM.",
    liveUrl: "",
    githubUrl: "https://github.com/ajayteli5252",
    metrics: "Sub-2s semantic retrieval over 500+ page PDFs"
  },
  {
    id: "proj-2",
    title: "Diet Dost: AI Personal Nutritionist & Health Tracker",
    year: "2026",
    badge: "Full-Stack AI Platform",
    tech: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "Supabase", "Groq Vision AI"],
    recruiterDesc:
      "Built a full-stack nutrition platform integrating Groq Vision AI for real-time meal image macro estimation, secured with JWT authentication, Brevo OTP verification, and automated Node-cron reminders.",
    honestDesc:
      "Built an AI that judges my evening street-food snacks in real time. Snap a photo of your plate and Groq Vision calculates the calories and macros before you even take the first bite.",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/ajayteli5252",
    metrics: "Instant image recognition under 450ms via Groq"
  },
  {
    id: "proj-3",
    title: "Utsav Rental Bartan-Kiraya App PWA",
    year: "2026",
    badge: "100% Offline Capable",
    tech: ["JavaScript", "HTML5", "CSS3", "IndexedDB", "PWA"],
    recruiterDesc:
      "Engineered an offline-capable Progressive Web App for rental inventory and booking management using IndexedDB for persistent client-side storage, service workers, and validated booking workflows.",
    honestDesc:
      "Because Wi-Fi disappears right when someone needs 500 wedding plates in rural areas. Built with IndexedDB so the entire inventory and order registry works smoothly completely offline.",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/ajayteli5252",
    metrics: "Zero network dependency, 100% local persistence"
  },
];

export const EXPERIENCE_DATA = [
  {
    role: "Full Stack Developer Intern",
    company: "Uptoskill",
    period: "May 2025",
    project: "AI Resume Builder",
    tech: ["Node.js", "MongoDB", "JavaScript", "REST APIs"],
    recruiterPoints: [
      "Developed an AI-powered resume builder using Node.js, MongoDB, JavaScript, and REST APIs for creating and managing professional resumes.",
      "Built backend APIs and database workflows for storing user profiles, resume sections, and dynamically generated content.",
      "Integrated AI-assisted content generation to help users improve resume descriptions and create role-relevant professional content.",
    ],
    honestNote:
      "Built an AI tool that writes better resumes so developers don't have to stare at a blank Word doc at 2 AM wondering how to turn 'fixed a bug' into a bullet point.",
  },
];

export const EDUCATION_DATA = [
  {
    degree: "B.Tech in Electronics and Computer Engineering (Data Science & AI)",
    institution: "BML Munjal University",
    period: "2023 - 2027",
    score: "CGPA: 7.89",
    highlight: "Specialization in Machine Learning, Deep Learning, RAG, and Distributed Web Architectures."
  },
  {
    degree: "12th (Science), Board of Secondary Education, Rajasthan",
    institution: "RBSE",
    period: "2022",
    score: "Percentage: 74.00%",
    highlight: "Physics, Chemistry & Advanced Mathematics foundation."
  },
  {
    degree: "10th, Board of Secondary Education, Rajasthan",
    institution: "RBSE",
    period: "2020",
    score: "Percentage: 73.50%",
    highlight: "Secondary School Examination with distinction in Science and Math."
  },
];

export const ACHIEVEMENTS_DATA = [
  {
    title: "Seed Grant Finalist - Project Pitch Competition (2025)",
    desc: "Selected as university finalist for pitching an AI-driven automated solution with high market impact.",
    badge: "Innovation"
  },
  {
    title: "Awarded 50% Merit Scholarship for Academic Excellence",
    desc: "Recognized by BML Munjal University for stellar academic performance throughout engineering coursework.",
    badge: "Academic"
  },
  {
    title: "IBM Developer Skills Network (Chatbot) Certification (2025)",
    desc: "Credentialed in conversational AI, prompt structuring, and natural language query systems.",
    badge: "AI Certification"
  },
  {
    title: "Uptoskill Full Stack Certification (2025)",
    desc: "Demonstrated production competency in full-stack MERN architecture and REST API development.",
    badge: "Full Stack"
  },
];

export const MARQUEE_ITEMS = [
  "⚡ Seed Grant Finalist (2025)",
  "⭐ 50% Merit Scholarship Awardee",
  "🤖 RAG & LangChain Developer",
  "⚛️ React.js & Tailwind Specialist",
  "💼 Uptoskill Full Stack Intern",
  "🎓 BML Munjal University (CGPA 7.89)",
  "📱 100% Offline-First PWA Builder",
  "🔥 Groq Vision AI & Supabase Integrator",
  "☕ Fueled by Kadak Chai & Clean Code"
];

export const MATCHER_DATA = {
  roles: [
    "Frontend / React Engineer",
    "Full-Stack MERN Developer",
    "AI / RAG Engineer",
    "Software Development Engineer"
  ],
  vibes: [
    "Scalable UI + Tailwind",
    "LLM + Vector Search",
    "Offline-First PWA",
    "Node.js + Supabase"
  ],
  perks: [
    "Unlimited Kadak Chai",
    "High-Impact Sprints",
    "Zero-Bug Production"
  ]
};