export const profile = {
  name: "Utsab Sinha",
  title: "AI / ML ENGINEER & CS UNDERGRADUATE",
  tagline: "I BUILD INTELLIGENT SYSTEMS.",
  description:
    "Computer Science undergraduate (CGPA 8.29/10) with hands-on experience in natural language processing, sentiment analysis, computer vision, and predictive modeling.",
  email: "utsabsinha468@gmail.com",
  phone: "+91-74395-43514",
  location: "Kolkata, West Bengal / Jaipur, Rajasthan",
  github: "https://github.com/Utsabsinha19",
  linkedin: "https://linkedin.com/in/utsab-sinha-9801a5287",
  resumeUrl: "/utsab_sinha_resume.pdf",
  systemStatus: "ONLINE",
};

export const techStrip = [
  "PYTHON",
  "PYTORCH",
  "OPENCV",
  "SCIKIT-LEARN",
  "VADER",
  "TEXTBLOB",
  "LDA",
  "FASTAPI",
  "REACT.JS",
  "POSTGRESQL",
  "SMOTE",
  "GRIDSEARCHCV",
  "DOCKER",
  "TWEEPY",
  "PRAW",
];

export type StackCategory = {
  id: string;
  label: string;
  short: string;
  technologies: string[];
  accent: string;
};

export const aiStack: StackCategory[] = [
  {
    id: "nlp",
    label: "NLP & TEXT MINING",
    short: "Natural Language Processing",
    technologies: [
      "VADER",
      "TextBlob",
      "LDA Topic Modelling",
      "Social Media Mining",
      "Twitter / Reddit APIs",
      "Text Classification",
    ],
    accent: "#06B6D4",
  },
  {
    id: "cv",
    label: "COMPUTER VISION",
    short: "Visual Intelligence",
    technologies: [
      "PyTorch",
      "OpenCV",
      "CNN Architectures",
      "Biometric Authentication",
      "Data Augmentation",
      "Real-time Inference",
    ],
    accent: "#8B5CF6",
  },
  {
    id: "ml",
    label: "PREDICTIVE MACHINE LEARNING",
    short: "Predictive Analytics",
    technologies: [
      "Scikit-learn",
      "SMOTE Class Balancing",
      "GridSearchCV",
      "Random Forest",
      "Gradient Boosting",
      "Feature Engineering",
    ],
    accent: "#EC4899",
  },
  {
    id: "genai",
    label: "EMBEDDINGS & INTENT AI",
    short: "Semantic Systems",
    technologies: [
      "Vector Embeddings",
      "Clustering",
      "Intent Classification",
      "Recommendation Systems",
      "LLM Integration",
      "RAG Workflows",
    ],
    accent: "#3B82F6",
  },
  {
    id: "data",
    label: "DATA & BI ENGINEERING",
    short: "Data Systems",
    technologies: [
      "Pandas & NumPy",
      "PostgreSQL & MySQL",
      "Tableau & Streamlit",
      "REST APIs & FastAPI",
      "ETL Data Pipelines",
      "Jupyter & EDA",
    ],
    accent: "#10B981",
  },
  {
    id: "devops",
    label: "LANGUAGES & TOOLING",
    short: "Production Tools",
    technologies: [
      "Python",
      "C++",
      "Java",
      "SQL",
      "Git & GitHub",
      "Docker",
    ],
    accent: "#D946EF",
  },
];

export type Project = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  problem: string;
  solution: string;
  architecture: { label: string; accent?: boolean }[];
  metrics: { value: string; label: string }[];
  technologies: string[];
  github: string;
  demo: string;
  gradient: string;
  accent: string;
  category: string;
};

export const projects: Project[] = [
  {
    id: "antar-ai",
    number: "01",
    title: "ANTAR AI",
    subtitle: "Human Engagement Intelligence Platform",
    description:
      "Antar AI is a human engagement intelligence platform designed to transform interaction data into meaningful, actionable insights through AI-driven analysis.",
    longDescription:
      "Antar AI explores how AI can be used to understand human engagement, interaction patterns, and behavioral signals through an intelligent analytical interface. It converts real-time digital engagement activity into structured intelligence, enabling unified tracking of attention, voice energy, focus stability, and session metrics.",
    problem:
      "Modern digital platforms generate enormous amounts of engagement and interaction data, but raw activity does not automatically translate into meaningful understanding.",
    solution:
      "Antar AI is designed around turning complex engagement signals into structured, interpretable intelligence through automated analytical workflows, real-time signal metrics, and interactive decision-support dashboards.",
    architecture: [
      { label: "Engagement Signals" },
      { label: "Data Processing Engine" },
      { label: "Intelligence Layer", accent: true },
      { label: "Behavioral Signal Model", accent: true },
      { label: "Signal Dashboard (Recharts)", accent: true },
      { label: "Decision Support" },
    ],
    metrics: [
      { value: "AI Engine", label: "Intelligence Platform" },
      { value: "Real-Time", label: "Signal Processing" },
      { value: "Recharts", label: "Interactive BI" },
      { value: "Production", label: "Deployed Platform" },
    ],
    technologies: [
      "TypeScript",
      "Next.js",
      "React.js",
      "Tailwind CSS",
      "Framer Motion",
      "Recharts",
      "REST APIs",
      "Vercel",
    ],
    github: "https://github.com/Utsabsinha19",
    demo: "https://antar-ai-v3.vercel.app/",
    gradient: "linear-gradient(135deg, #8B5CF6 0%, #06B6D4 100%)",
    accent: "#8B5CF6",
    category: "AI / ML · INTELLIGENCE PLATFORM",
  },
  {
    id: "brand-intelligence",
    number: "02",
    title: "AI BRAND INTELLIGENCE SYSTEM",
    subtitle: "Ingesting 10,000+ social posts per query run to detect consumer complaints & brand risks.",
    description:
      "A 3-stage NLP pipeline that ingests live Twitter & Reddit data to extract VADER/TextBlob sentiment, 10-theme LDA topics, and risk alerts.",
    longDescription:
      "Built a full-stack brand monitoring platform ingesting live Twitter and Reddit data, processing 10,000+ posts per query run through a 3-stage NLP pipeline (VADER/TextBlob sentiment, LDA topic modelling across 10 themes, keyword trend tracking). Automated detection of top 5 consumer complaints and brand risks per cycle, cutting manual monitoring effort by 70%, and delivered insights via a 4-module Streamlit/React.js dashboard.",
    problem:
      "Brands struggle to synthesize public perception across fragmented social platforms into actionable risk alerts.",
    solution:
      "An automated NLP ingestion pipeline combining VADER/TextBlob sentiment classification, 10-theme LDA topic modeling, and risk alerting.",
    architecture: [
      { label: "Twitter / Reddit API" },
      { label: "Data Ingestion" },
      { label: "VADER & TextBlob NLP", accent: true },
      { label: "LDA Topic Modelling", accent: true },
      { label: "Complaint Detection", accent: true },
      { label: "4-Module Dashboard" },
    ],
    metrics: [
      { value: "10,000+", label: "Posts / Query Run" },
      { value: "70%", label: "Manual Effort Cut" },
      { value: "10", label: "LDA Themes" },
      { value: "3-Stage", label: "NLP Pipeline" },
    ],
    technologies: [
      "Python",
      "NLP",
      "VADER",
      "TextBlob",
      "LDA",
      "Streamlit",
      "React.js",
      "Tweepy",
      "PRAW",
    ],
    github: "https://github.com/Utsabsinha19",
    demo: "#",
    gradient: "linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)",
    accent: "#06B6D4",
    category: "NLP · SOCIAL MEDIA MINING",
  },
  {
    id: "genauth-ai",
    number: "03",
    title: "GENAUTH AI – REAL-TIME FACE RECOGNITION",
    subtitle: "Sub-100ms CNN-based biometric authentication with 4 data augmentations.",
    description:
      "A deep learning biometric authentication pipeline achieving sub-100ms inference latency across 500+ test frames from live feeds.",
    longDescription:
      "Developing a CNN-based biometric authentication pipeline achieving sub-100ms inference latency across 500+ test frames from live webcam feeds. Applied 4 data augmentation techniques (rotation, brightness shift, occlusion simulation, horizontal flip) to improve out-of-distribution accuracy by 11%.",
    problem:
      "Real-time biometric systems face latency bottlenecks and accuracy degradation under real-world lighting and occlusion.",
    solution:
      "A CNN feature extraction network paired with 4 data augmentation techniques delivering sub-100ms facial verification.",
    architecture: [
      { label: "Webcam Feed" },
      { label: "OpenCV Preprocessing" },
      { label: "Data Augmentation", accent: true },
      { label: "PyTorch CNN", accent: true },
      { label: "<100ms Biometric Match", accent: true },
      { label: "Auth Decision" },
    ],
    metrics: [
      { value: "<100ms", label: "Inference Latency" },
      { value: "500+", label: "Test Frames" },
      { value: "+11%", label: "OOD Accuracy Gain" },
      { value: "4", label: "Augmentations" },
    ],
    technologies: [
      "Python",
      "OpenCV",
      "PyTorch",
      "CNN",
      "Deep Learning",
      "Computer Vision",
    ],
    github: "https://github.com/Utsabsinha19",
    demo: "#",
    gradient: "linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)",
    accent: "#8B5CF6",
    category: "COMPUTER VISION · DEEP LEARNING",
  },
  {
    id: "booking-prediction",
    number: "04",
    title: "CONSUMER BOOKING BEHAVIOR PREDICTION",
    subtitle: "ML pipeline on 50,000 airline records achieving 0.88 ROC-AUC via SMOTE & GridSearchCV.",
    description:
      "Benchmarked 3 classifiers on 50,000 airline records with 15+ engineered features, correcting a 4:1 imbalance with SMOTE.",
    longDescription:
      "Built an end-to-end ML pipeline on a 50,000-record airline dataset, engineering 15+ features and benchmarking 3 classifiers to achieve a cross-validated ROC-AUC of 0.88 (12% above baseline). Corrected a 4:1 class imbalance with SMOTE and tuned 8 hyperparameters via GridSearchCV, producing a feature-importance report ranking top 7 purchase-intent drivers.",
    problem:
      "High class imbalance (4:1) and raw feature distributions hinder accurate prediction of consumer booking decisions.",
    solution:
      "Feature engineering, SMOTE balancing, and GridSearchCV hyperparameter tuning across Random Forest and Gradient Boosting models.",
    architecture: [
      { label: "50,000 Records" },
      { label: "15+ Feature Eng" },
      { label: "SMOTE Resampling", accent: true },
      { label: "GridSearchCV Tuning", accent: true },
      { label: "Classifier Benchmark", accent: true },
      { label: "ROC-AUC 0.88" },
    ],
    metrics: [
      { value: "0.88", label: "ROC-AUC Score" },
      { value: "50,000", label: "Airline Records" },
      { value: "4:1", label: "SMOTE Class Fix" },
      { value: "15+", label: "Engineered Features" },
    ],
    technologies: [
      "Python",
      "scikit-learn",
      "pandas",
      "NumPy",
      "SMOTE",
      "GridSearchCV",
      "Random Forest",
    ],
    github: "https://github.com/Utsabsinha19",
    demo: "#",
    gradient: "linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)",
    accent: "#EC4899",
    category: "PREDICTIVE ML · DATA SCIENCE",
  },
  {
    id: "address-intelligence",
    number: "05",
    title: "INDIAN ADDRESS INTELLIGENCE",
    subtitle: "Hierarchical location intelligence modeling 512K+ Indian village records.",
    description:
      "A structured REST API for hierarchical location search across 29 Indian states, districts, subdistricts, and villages.",
    longDescription:
      "A data engineering and API project modeling 512K+ location records across 29 Indian states with hierarchical search and autocomplete, exposed via a fast REST API.",
    problem:
      "Indian village-level location data is fragmented and lacks a clean hierarchical search API.",
    solution:
      "Relational modeling and fast hierarchical search served via PostgreSQL and FastAPI.",
    architecture: [
      { label: "State Level" },
      { label: "District Level" },
      { label: "Subdistrict Level", accent: true },
      { label: "Village Level", accent: true },
      { label: "FastAPI Layer" },
      { label: "Search Endpoint" },
    ],
    metrics: [
      { value: "512K+", label: "Village Records" },
      { value: "29", label: "Indian States" },
      { value: "FastAPI", label: "REST Server" },
      { value: "SQL", label: "Hierarchical Data" },
    ],
    technologies: ["Python", "PostgreSQL", "FastAPI", "Pandas", "SQL"],
    github: "https://github.com/Utsabsinha19",
    demo: "#",
    gradient: "linear-gradient(135deg, #10B981 0%, #06B6D4 100%)",
    accent: "#10B981",
    category: "DATA ENGINEERING · API",
  },
];

export type LabExperiment = {
  id: string;
  title: string;
  description: string;
  type: "text" | "image" | "chat" | "number";
  sampleInput?: string;
  sampleOutput?: string;
  tech: string[];
};

export const labExperiments: LabExperiment[] = [
  {
    id: "gibli-sketch",
    title: "Ghibli & Pencil Sketch Stylizer",
    description: "Drop your photo to transform it into Studio Ghibli Anime art or Charcoal Pencil Sketch in real-time.",
    type: "image",
    sampleOutput: "In-Browser HTML5 Canvas Sobel Edge & Ghibli Tone Mapping Engine",
    tech: ["Computer Vision", "HTML5 Canvas", "Sobel Filter", "Color Grading"],
  },
  {
    id: "sentiment",
    title: "VADER / TextBlob Sentiment",
    description: "Multi-source sentiment classifier used in AI Brand Intelligence.",
    type: "text",
    sampleInput: "The brand campaign launch exceeded all engagement metrics.",
    sampleOutput: "Positive · 0.87 confidence score (VADER + TextBlob)",
    tech: ["VADER", "TextBlob", "NLP"],
  },
  {
    id: "classifier",
    title: "Biometric Face Recognition",
    description: "Sub-100ms CNN biometric inference simulation.",
    type: "image",
    sampleOutput: "Facial Landmarks Verified · Latency: 84ms · Match: 0.94",
    tech: ["PyTorch", "OpenCV", "CNN"],
  },
  {
    id: "rag",
    title: "Embeddings & Intent Classifier",
    description: "Clustering & intent classification search demo.",
    type: "chat",
    sampleInput: "How does vector clustering work in FlyRank AI?",
    sampleOutput:
      "Dense embeddings map query intent into cluster spaces for fast semantic recommendation.",
    tech: ["Embeddings", "Clustering", "Intent AI"],
  },
  {
    id: "prediction",
    title: "SMOTE Booking Predictor",
    description: "Classifier scoring driver importance across 15+ features.",
    type: "number",
    sampleOutput: "Booking Intent Score: 0.88 ROC-AUC · Top Feature: Price_Sensitivity",
    tech: ["scikit-learn", "SMOTE", "GridSearchCV"],
  },
];

export const processSteps = [
  { id: "01", title: "UNDERSTAND", desc: "Frame business & ML problem" },
  { id: "02", title: "COLLECT", desc: "Ingest & clean social/market data" },
  { id: "03", title: "ENGINEER", desc: "Feature selection & SMOTE balancing" },
  { id: "04", title: "TRAIN", desc: "CNN / Classifier hyperparameter tuning" },
  { id: "05", title: "EVALUATE", desc: "ROC-AUC & Sub-100ms latency validation" },
  { id: "06", title: "DEPLOY", desc: "Ship FastAPI & Streamlit/React dashboards" },
  { id: "07", title: "MONITOR", desc: "Track model outputs & OOD accuracy" },
];

export type ExperienceItem = {
  id: string;
  title: string;
  org: string;
  period: string;
  year: string;
  description: string;
  accent: string;
};

export const experience: ExperienceItem[] = [
  {
    id: "flyrank",
    title: "AI / ML Intern",
    org: "FlyRank AI (Remote)",
    period: "July 2026 – Present",
    year: "2026",
    description:
      "Working on the ML layer of the product – embeddings, clustering, and intent classification – to power search and recommendation features beyond API-level integration. Collaborating with the product team to translate model outputs into user-facing insights.",
    accent: "#06B6D4",
  },
  {
    id: "twidix",
    title: "AI / ML & Business Intelligence Intern",
    org: "Twidix (Remote)",
    period: "April 2026 – July 2026",
    year: "2026",
    description:
      "Built and shipped full-stack AI/ML features for a live production platform, including consumer-analytics dashboards, predictive insight tools, and workflow automation modules. Implemented data pipelines integrated into production using REST APIs and Git.",
    accent: "#3B82F6",
  },
  {
    id: "bluestock",
    title: "Data Analyst Intern",
    org: "Bluestock Fintech (Remote)",
    period: "April 2026 – May 2026",
    year: "2026",
    description:
      "Analyzed 5+ financial and market datasets to support data-driven decision-making, cutting manual data-cleaning time by 25% through structured exploration and reporting workflows.",
    accent: "#8B5CF6",
  },
  {
    id: "acehack",
    title: "Event Coordinator — AceHack 4.0 Hackathon",
    org: "UEM Jaipur",
    period: "2024 – 2025",
    year: "2024–2025",
    description:
      "Led operations for a 500+ participant national hackathon across 12 colleges with a 20-person volunteer team, redesigning logistics workflows to cut wait times by 25%.",
    accent: "#EC4899",
  },
  {
    id: "pradyog",
    title: "Software Department Member",
    org: "Pradyog Robotics Club — UEM Jaipur",
    period: "2023 – 2024",
    year: "2023–2024",
    description:
      "Contributed to the software department of Pradyog Robotics Club, developing embedded control logic, telemetry data processing, and hardware-software communication interfaces for autonomous robotic systems.",
    accent: "#10B981",
  },
];

export const education = [
  {
    degree: "B.Tech in Computer Science Engineering",
    institution: "University of Engineering and Management (UEM), Jaipur",
    location: "Jaipur, Rajasthan",
    period: "July 2023 – May 2027",
    score: "SGPA: 8.17 / 10.0 · CGPA: 8.29 / 10",
  },
  {
    degree: "WBCHSE (Class XII)",
    institution: "New Andul H.C. School",
    location: "Howrah, West Bengal",
    period: "2021",
    score: "82.40%",
  },
  {
    degree: "WBBSE (Class X)",
    institution: "New Andul H.C. School",
    location: "Howrah, West Bengal",
    period: "2019",
    score: "77.57%",
  },
];

export const certifications = [
  {
    name: "Data Analytics Virtual Internship",
    issuer: "Deloitte",
    year: "2024",
  },
  {
    name: "Data Science Virtual Internship",
    issuer: "British Airways",
    year: "2024",
  },
  {
    name: "Quantitative Research Virtual Internship",
    issuer: "J.P. Morgan",
    year: "2024",
  },
  {
    name: "App Development Certification",
    issuer: "EduSkills Foundation",
    year: "2023",
  },
];

export const capabilities = [
  {
    category: "NLP & AI",
    items: [
      "VADER",
      "TextBlob",
      "LDA Topic Modelling",
      "Social Media Mining",
      "Twitter / Reddit APIs",
    ],
  },
  {
    category: "Machine Learning",
    items: [
      "scikit-learn",
      "PyTorch",
      "OpenCV",
      "SMOTE",
      "GridSearchCV",
      "Random Forest",
    ],
  },
  {
    category: "Data & BI",
    items: ["Pandas", "NumPy", "Tableau", "Streamlit", "Jupyter Notebook"],
  },
  {
    category: "Web & Databases",
    items: ["React.js", "Node.js", "REST APIs", "PostgreSQL", "MySQL", "MongoDB"],
  },
  {
    category: "Languages & Tools",
    items: ["Python", "C++", "Java", "SQL", "Git", "Docker"],
  },
];
