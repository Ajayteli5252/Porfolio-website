export const PROFILE_DATA = {
  name: "Ajay Teli",
  tagline: "Electronics & Computer Engineering (Data Science & AI)",
  university: "BML Munjal University",
  batch: "2023 - 2027",
  cgpa: "7.89",
  phone: "+91 9116847163",
  email: "ajay.teli.23ece@bmu.edu.in",
  links: {
    github: "https://github.com/",
    linkedin: "https://linkedin.com/",
    playbook: "#playbook",
  },
};

export const SKILLS_DATA = [
  { name: "C++", category: "Programming" },
  { name: "Python", category: "Programming" },
  { name: "JavaScript", category: "Programming" },
  { name: "HTML5", category: "Programming" },
  { name: "CSS3", category: "Programming" },
  { name: "React.js", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "Express.js", category: "Backend" },
  { name: "REST APIs", category: "Backend" },
  { name: "MySQL", category: "Databases" },
  { name: "MongoDB", category: "Databases" },
  { name: "IndexedDB", category: "Databases" },
  { name: "Supabase", category: "Databases" },
  { name: "DBMS", category: "Core & Tools" },
  { name: "OOP", category: "Core & Tools" },
  { name: "Git & GitHub", category: "Core & Tools" },
  { name: "VS Code", category: "Core & Tools" },
];

export const INITIAL_PROJECTS = [
  {
    id: "proj-1",
    title: "Document QA System Using RAG",
    year: "2026",
    tech: ["LangChain", "FAISS", "Chroma", "Llama 3", "BM25", "Streamlit"],
    recruiterDesc:
      "Developed a RAG-based Document Question Answering system combining FAISS vector search and BM25 keyword search with Sentence Transformers, optimizing chunk parameters to achieve 90% answer relevance.",
    honestDesc:
      "Taught Llama 3 to actually read the uploaded PDF instead of hallucinating wild answers. Spent hours tuning chunk sizes until it finally hit 90% accuracy without melting my RAM.",
    liveUrl: "",
    githubUrl: "https://github.com/",
  },
  {
    id: "proj-2",
    title: "Diet Dost: AI Personal Nutritionist & Health Tracker",
    year: "2026",
    tech: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "Supabase", "Groq Vision AI"],
    recruiterDesc:
      "Built a full-stack nutrition platform integrating Groq Vision AI for real-time meal image macro estimation, secured with JWT authentication, Brevo OTP verification, and automated Node-cron reminders.",
    honestDesc:
      "Built an AI that judges my evening street-food snacks in real time. Snap a photo of your plate and Groq Vision calculates the macros before you even take the first bite.",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/",
  },
  {
    id: "proj-3",
    title: "Utsav Rental Bartan-Kiraya App (PWA)",
    year: "2026",
    tech: ["JavaScript", "HTML5", "CSS3", "IndexedDB", "PWA"],
    recruiterDesc:
      "Engineered an offline-capable Progressive Web App for rental inventory and booking management using IndexedDB for persistent client-side storage and validated booking workflows.",
    honestDesc:
      "Because Wi-Fi disappears right when someone needs 500 wedding plates. Built with IndexedDB so the entire inventory and booking system works smoothly completely offline.",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/",
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
      "Built an AI tool that writes better resumes so developers don't have to stare at a blank Word doc at 2 AM.",
  },
];

export const EDUCATION_DATA = [
  {
    degree: "B.Tech in Electronics and Computer Engineering",
    institution: "BML Munjal University",
    period: "2023 - 2027",
    score: "CGPA: 7.89",
  },
  {
    degree: "12th (Science), Board of Secondary Education, Rajasthan",
    institution: "RBSE",
    period: "2022",
    score: "Percentage: 74.00%",
  },
  {
    degree: "10th, Board of Secondary Education, Rajasthan",
    institution: "RBSE",
    period: "2020",
    score: "Percentage: 73.50%",
  },
];

export const ACHIEVEMENTS_DATA = [
  "Seed Grant Finalist - Project Pitch Competition (2025)",
  "Awarded 50% Merit Scholarship for Academic Excellence",
  "IBM Developer Skills Network (Chatbot) Certification (2025)",
  "Uptoskill Full Stack Certification (2025)",
];