export interface Project {
  id: string;
  slug: string;
  title: string;
  category: "Fintech" | "Mobile & Web" | "In Progress";
  badge: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  results: string[];
  metrics: { label: string; value: string }[];
  technologies: string[];
  architecture: string[];
  features: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  status: "Live in Production" | "Active Development" | "Enterprise Deploy";
  accentColor: string;
}

export interface SkillCategory {
  category: string;
  iconName: string;
  description: string;
  skills: { name: string; level: number; highlight?: boolean; tags: string[] }[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  scoreOrStatus: string;
  highlights: string[];
}

export interface ExperienceItem {
  role: string;
  companyOrDomain: string;
  period: string;
  type: string;
  description: string;
  deliverables: string[];
  skills: string[];
}

export interface CompanyExperience {
  company: string;
  role: string;
  period: string;
  location: string;
  workMode: "Onsite" | "Hybrid" | "Remote";
  type: string;
  isCurrent?: boolean;
  metrics?: { label: string; value: string }[];
  bulletPoints: string[];
  liveApps: string[];
  technologies: string[];
}

export const PERSONAL_INFO = {
  name: "Abhisek",
  fullName: "Abhisek",
  title: "Full Stack Developer",
  headline: "Building Scalable Web, Mobile & Backend Systems That Power Real Products",
  tagline: "Specializing in end-to-end engineering: intuitive Flutter & React frontends, high-throughput FastAPI & .NET APIs, robust databases, and cloud deployments.",
  location: "India",
  openTo: ["Full-time Roles", "Freelance & Consulting", "Fintech Innovations", "High-Impact Startups"],
  bio: "I'm a full stack developer passionate about architecting resilient, production-ready software. From designing responsive pixel-perfect interfaces in Next.js and Flutter to crafting high-concurrency microservices in FastAPI and C# / .NET, I bridge the gap between user delight and backend reliability. Currently engineering real-world solutions in the salon booking automation and fintech payment ecosystems.",
  stats: [
    { label: "Production Platforms", value: "4+" },
    { label: "Daily Transactions Supported", value: "100K+" },
    { label: "Target API Uptime", value: "99.9%" },
    { label: "Core Stacks Mastered", value: "5+" },
  ],
  socials: {
    github: "https://github.com/abhisek-pattnaik",
    linkedin: "https://www.linkedin.com/in/abhisek-pattnaik-2727511ba/?isSelfProfile=true",
    email: "abhisekpattnaik04@gmail.com",
    whatsapp: "https://wa.me/?text=Hi%20Abhisek,%20I%20saw%20your%20portfolio!",
    resume: "https://drive.google.com/file/d/13wF6hZyQo7tDqFODqT5zKbXXWldM3UKP/view?usp=sharing",
  },
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Frontend (Web)",
    iconName: "Layout",
    description: "Modern, reactive, and accessible web experiences with fluid animations and server-side rendering.",
    skills: [
      { name: "React", level: 92, highlight: true, tags: ["Hooks", "Context", "Virtual DOM", "SSR"] },
      { name: "Next.js (App Router)", level: 90, highlight: true, tags: ["Server Components", "API Routes", "SEO", "Turbopack"] },
      { name: "TypeScript", level: 88, highlight: true, tags: ["Static Typing", "Generics", "Interfaces"] },
      { name: "Tailwind CSS", level: 95, highlight: true, tags: ["Responsive", "Utility-First", "Design Systems"] },
      { name: "HTML5 / Modern CSS", level: 95, highlight: false, tags: ["Flexbox", "Grid", "Animations", "SVG"] },
      { name: "Three.js / WebGL", level: 80, highlight: true, tags: ["3D Scenes", "Shaders", "Particles", "Lighting"] },
    ],
  },
  {
    category: "Mobile Development",
    iconName: "Smartphone",
    description: "Cross-platform and native mobile apps engineered for fluid 60fps performance and deep OS integration.",
    skills: [
      { name: "Flutter (Dart)", level: 90, highlight: true, tags: ["State Management", "Provider/Bloc", "Custom UI", "Animations"] },
      { name: "Android (Kotlin)", level: 82, highlight: true, tags: ["Coroutines", "Jetpack", "Retrofit", "Services"] },
      { name: "Biometric & Hardware APIs", level: 85, highlight: false, tags: ["Fingerprint / Morpho", "Thermal Printing", "Camera/QR"] },
      { name: "Mobile App Optimization", level: 88, highlight: false, tags: ["Memory Profiling", "Cold Start", "Offline Sync"] },
    ],
  },
  {
    category: "Backend & Systems",
    iconName: "Server",
    description: "High-throughput, asynchronous, and secure APIs built with modern frameworks and resilient patterns.",
    skills: [
      { name: "FastAPI (Python)", level: 92, highlight: true, tags: ["Asyncio", "Pydantic", "OpenAPI", "Dependency Injection"] },
      { name: "C# / .NET Core", level: 85, highlight: true, tags: ["ASP.NET Web API", "LINQ", "Entity Framework", "Microservices"] },
      { name: "Python", level: 90, highlight: true, tags: ["Data Processing", "Automation", "Async Tasks"] },
      { name: "RESTful & WebSocket APIs", level: 94, highlight: true, tags: ["Pub/Sub", "Real-Time Feeds", "API Security", "JWT"] },
    ],
  },
  {
    category: "Database, Cloud & DevOps",
    iconName: "Database",
    description: "Relational, document, and cache stores with automated containerization and deployment pipelines.",
    skills: [
      { name: "PostgreSQL", level: 88, highlight: true, tags: ["Complex Queries", "Indexing", "ACID", "Transactions"] },
      { name: "MongoDB", level: 84, highlight: false, tags: ["Aggregations", "Schema Design", "Collections"] },
      { name: "Redis", level: 86, highlight: true, tags: ["In-Memory Caching", "Rate Limiting", "Job Queues"] },
      { name: "Docker & Containerization", level: 82, highlight: true, tags: ["Multi-stage Builds", "Compose", "Networking"] },
      { name: "Git & CI/CD", level: 90, highlight: false, tags: ["GitFlow", "GitHub Actions", "Semantic Release"] },
      { name: "Linux / Nginx", level: 85, highlight: false, tags: ["Reverse Proxy", "SSL/TLS", "Shell Scripting"] },
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    id: "salon-app",
    slug: "salon-booking-management",
    title: "Salon & Booking Management Platform",
    category: "In Progress",
    badge: "Under Development • Mobile & Web",
    tagline: "Cross-platform mobile apps and web suite for customers, staff, and salon administrators.",
    description: "An end-to-end salon booking and management ecosystem currently under active development. Comprises customer-facing mobile apps and responsive booking website for streamlined appointment scheduling, paired with a dedicated admin portal and staff companion app for real-time slot coordination, staff rosters, inventory, and POS operations.",
    problem: "Salon operators face severe manual scheduling overhead, overlapping appointments, customer no-shows (up to 30%), and fragmented staff commission tracking, while customers lack a fast, real-time booking and discovery experience across web and mobile.",
    solution: "Engineering a full-stack multi-tenant platform: intuitive Flutter mobile apps and responsive Next.js web application for customers, alongside an advanced Next.js admin dashboard and staff tools with optimistic concurrency slot locking, automated WhatsApp/SMS notifications, and instant POS billing.",
    results: [
      "Building unified customer experience across native mobile apps (iOS & Android) and responsive web.",
      "Engineered real-time slot locking algorithm preventing duplicate reservations across all channels.",
      "Integrated automated WhatsApp and e  mail notification pipeline to slash customer no-shows.",
      "Automated staff commission calculations and multi-branch revenue tracking for administrators.",
    ],
    metrics: [
      { label: "Platforms", value: "iOS, Android, Web" },
      { label: "Target No-show Drop", value: "40%" },
      { label: "Sync Latency", value: "<150ms" },
    ],
    technologies: ["Flutter", "Next.js", "FastAPI (Python)", "PostgreSQL", "Redis", "Docker", "Tailwind CSS"],
    architecture: [
      "Customer Mobile & Web: Cross-platform Flutter mobile app (iOS/Android) and Next.js 14 SSR customer booking website.",
      "Admin & Staff Portals: Role-based Next.js dashboard for salon owners, branch managers, and receptionists.",
      "API & Business Logic: FastAPI asynchronous microservices with JWT authentication and granular RBAC.",
      "Real-time Coordination: Redis Pub/Sub for sub-150ms slot locking and live calendar synchronization.",
      "Persistence: PostgreSQL with spatial and temporal indexes for branch geolocation and multi-service scheduling.",
    ],
    features: [
      "Customer App & Website: Real-time stylist availability, service bundling, and frictionless slot booking",
      "Admin Web Dashboard: Branch oversight, staff shifts, appointment calendar, and live revenue analytics",
      "Staff Companion Interface: Individual stylist schedules, client notes, and real-time commission tracker",
      "Automated Reminders: Instant WhatsApp, SMS, and email alerts for appointment confirmations and status updates",
      "Digital Invoicing & POS: Integrated checkout, split payments, and customer loyalty rewards",
      "Multi-Branch Support: Centralized management for salon chains with independent inventory and pricing",
    ],
    githubUrl: "https://github.com",
    featured: true,
    status: "Active Development",
    accentColor: "from-fuchsia-500 to-pink-500",
  },
  {
    id: "spay-india",
    slug: "spay-india-fintech",
    title: "Spay India - Digital Payment & Banking Suite",
    category: "Fintech",
    badge: "Production • Fintech",
    tagline: "High-volume digital financial services platform powering retail payments across India.",
    description: "A comprehensive fintech application delivering Aadhaar Enabled Payment System (AEPS), Domestic Money Transfer (DMT), Bharat Bill Payment System (BBPS), and mobile recharge pipelines with stringent regulatory security.",
    problem: "Handling massive concurrent transactions across rural and urban retail networks where API timeouts, bank switch unreliability, and network drops frequently trigger duplicate debits or pending states.",
    solution: "Implemented an asynchronous transaction pipeline utilizing C# / .NET Core and FastAPI microservices with dual-ledger verification, automated reconciliation workers, and encrypted cryptographic payload signing.",
    results: [
      "Processed hundreds of thousands of daily banking transactions with 99.9% uptime.",
      "Achieved sub-2-second transaction turn-around time on AEPS cash withdrawal pipelines.",
      "Engineered automated retry queues that salvaged over 95% of transient network drops.",
    ],
    metrics: [
      { label: "Daily Peak Volume", value: "100K+ Txns" },
      { label: "Success Rate", value: "99.4%" },
      { label: "Average Response", value: "1.2s" },
    ],
    technologies: ["Android (Kotlin)", "C# / .NET Core", "FastAPI", "SQL Server", "Redis", "REST APIs"],
    architecture: [
      "Android App: Native Kotlin with Coroutines, Biometric Fingerprint SDK integration, and hardware thermal printer support.",
      "Backend Core: ASP.NET Core & FastAPI high-speed payment routers communicating with National NPCI/BBPS switches.",
      "Cache & Rate-Limit: Redis cluster for instant balance checks and idempotent request deduplication.",
      "Audit & Security: Double-entry accounting ledger with HMAC-SHA256 request signatures.",
    ],
    features: [
      "AEPS Cash Withdrawal, Balance Enquiry & Mini Statement via Biometric Scanners",
      "DMT (Domestic Money Transfer) to any Indian Bank account in under 3 seconds",
      "BBPS Electricity, Water, Gas, and Broadband Bill payment clearing",
      "Mobile, DTH & Fastag Instant Recharges with automated callback reconciliation",
      "Merchant Wallet with instant settlement to linked bank accounts",
      "Complete Compliance & KYC verification pipeline",
    ],
    liveUrl: "https://play.google.com/store/apps/details?id=app.spayindia.retailer",
    githubUrl: "https://github.com",
    featured: true,
    status: "Live in Production",
    accentColor: "from-blue-500 to-cyan-500",
  },
  {
    id: "spay-md",
    slug: "spay-master-distributor",
    title: "Spay MD - Master Distributor ERP Panel",
    category: "Fintech",
    badge: "Enterprise • Fintech B2B",
    tagline: "Enterprise distributor hierarchy management, multi-tier commission engine, and risk ledger.",
    description: "A specialized enterprise portal and app created for Master Distributors (MDs) managing hundreds of Super Distributors, Retailers, cash balances, and real-time commission cascades across geographic regions.",
    problem: "Complex multi-level commission payouts led to daily reconciliation conflicts, credit risk from delayed ledger updates, and lack of visibility into field agent activities.",
    solution: "Architected a hierarchical tree management system with dynamic commission calculation rules, automated risk monitoring, real-time WebSocket ledger updates, and one-click bulk wallet top-up controls.",
    results: [
      "Automated multi-level commission splits in real-time, eliminating manual end-of-month calculations.",
      "Granted distributors 360-degree real-time visibility into agent turnover and pending credit lines.",
      "Exportable regulatory compliance reports and comprehensive transaction audit trails.",
    ],
    metrics: [
      { label: "Distributor Network", value: "500+ Nodes" },
      { label: "Reconciliation Time", value: "<1 min" },
      { label: "Data Latency", value: "Real-time" },
    ],
    technologies: ["Flutter", "C# / .NET", "PostgreSQL", "WebSockets", "Docker", "Tailwind CSS"],
    architecture: [
      "Frontend: Flutter cross-platform desktop/mobile application with reactive state.",
      "Backend: C# .NET Core enterprise API utilizing CQRS pattern for read/write ledger separation.",
      "Communication: Secure WebSockets for instant live balance ticker and fraud alert push.",
      "Database: PostgreSQL with partitioned monthly transaction archives and materialized analytics views.",
    ],
    features: [
      "Interactive 3-Tier Hierarchy Explorer (Master Distributor → Distributor → Retailer)",
      "Dynamic Margin & Commission Rule Matrix configuration",
      "Instant Bulk Wallet Allocation & Credit Limit Controls",
      "Real-time Fraud & High-Velocity Transaction Alert System",
      "Comprehensive Daily, Weekly, and Monthly Ledger Excel/PDF Generation",
      "In-app Support Ticket Dispatch and Agent Status Tracker",
    ],
    liveUrl: "https://play.google.com/store/apps/details?id=app.spayindia.dimd_new",
    githubUrl: "https://github.com",
    featured: true,
    status: "Enterprise Deploy",
    accentColor: "from-indigo-500 to-purple-600",
  },
  {
    id: "prayaspe",
    slug: "prayaspe-merchant-platform",
    title: "Prayaspe - Smart Merchant & Neo-Banking Suite",
    category: "Fintech",
    badge: "Fintech • Digital Banking",
    tagline: "Empowering local merchants with unified UPI QR collections, gateway failover, and smart audio soundboxes.",
    description: "A merchant neo-banking and digital payment aggregation platform offering zero-touch merchant onboarding, dynamic UPI QR generation, instant webhook settlement, and smart soundbox audio verification.",
    problem: "Small and medium merchants experienced high drop-off during rigid KYC procedures, suffered from payment gateway downtime, and lacked immediate audio confirmation for crowded counter payments.",
    solution: "Engineered a rapid 2-minute digital KYC pipeline, multi-switch payment gateway fallback, sub-second webhook callback processing, and IoT soundbox voice notification dispatch.",
    results: [
      "Cut merchant onboarding time from 24 hours to under 2 minutes with automated OCR verification.",
      "Achieved sub-500ms soundbox audio triggers upon successful customer payment.",
      "Integrated smart payment gateway routing that reduced transaction drops by 18%.",
    ],
    metrics: [
      { label: "Onboarding Time", value: "<2 mins" },
      { label: "Soundbox Audio Latency", value: "<500ms" },
      { label: "Gateway Routing", value: "Auto-failover" },
    ],
    technologies: ["Next.js", "React", "Flutter", "FastAPI (Python)", "PostgreSQL", "MQTT / WebSockets"],
    architecture: [
      "Merchant App: Flutter client with dynamic QR generator and soundbox volume/language controls.",
      "Merchant Portal: Next.js responsive web dashboard for merchant sales analytics and settlement logs.",
      "Core Ingestion Engine: FastAPI asynchronous microservice handling merchant webhooks and NPCI callbacks.",
      "IoT Dispatch: MQTT broker pushing audio payload notifications to cellular/Wi-Fi soundbox hardware.",
    ],
    features: [
      "Dynamic & Static All-in-One UPI QR code generator",
      "Instant Soundbox Voice Confirmation in multiple Indian regional languages",
      "Same-day & T+0 Instant Merchant Wallet Settlement",
      "Automated e-KYC with Aadhaar / PAN OCR verification",
      "Detailed Sales Analytics, Customer Repeat Trends & Refund Processing",
      "Multi-Payment Gateway Auto-Routing for maximum uptime",
    ],
    liveUrl: "https://play.google.com/store/apps/details?id=com.prayas.prayaspe",
    githubUrl: "https://github.com",
    featured: true,
    status: "Live in Production",
    accentColor: "from-emerald-500 to-teal-500",
  },
  {
    id: "unseen-studio",
    slug: "unseen-studio-creative",
    title: "Unseen Studio® - Brand, Digital & Motion",
    category: "Mobile & Web",
    badge: "Production • 3D & Digital",
    tagline: "World-class digital production studio blending interactive WebGL, 3D motion, and digital experiences.",
    description: "Creative digital production engineering inspired by Unseen Studio (Awwwards Studio of the Year). Built with Three.js, customized GPU shaders, reactive physics, and fluid typography for brands that demand boundary-pushing web design.",
    problem: "Standard web architectures rely on flat DOM interactions, resulting in static experiences that fail to emotionally engage users or reflect high-end luxury brand identities.",
    solution: "Engineered an asynchronous WebGL rendering pipeline with GLSL noise shaders, continuous 60fps physics dampening, responsive viewport frustum scaling, and zero-jank frame scheduling.",
    results: [
      "Maintained constant 60 FPS across desktop and high-refresh mobile displays using optimized instanced meshes.",
      "Achieved sub-1.2s First Contentful Paint despite complex 3D shader and particle simulations.",
      "Delivered immersive brand storytelling with organic mouse-driven magnetic interaction layers.",
    ],
    metrics: [
      { label: "Rendering Performance", value: "60 FPS" },
      { label: "Design Recognition", value: "Awwwards" },
      { label: "GPU Load Latency", value: "<16ms" },
    ],
    technologies: ["Three.js", "WebGL", "GLSL Shaders", "Next.js", "TypeScript", "Tailwind CSS"],
    architecture: [
      "Rendering Pipeline: Three.js WebGL scene with custom vertex/fragment displacement shaders.",
      "Interaction Layer: Lerp-smoothed cursor tracking and dynamic physics spring vectors.",
      "Asset Delivery: Next.js edge bundling with compressed WebP/GLTF asset pipelines.",
      "Typography & UI: Fluid responsive typography paired with hardware-accelerated CSS composite layers.",
    ],
    features: [
      "Custom 3D WebGL Shader Mesh with interactive cursor physics deformation",
      "Liquid Magnetic Cursor follower with blend-mode contrast inversion",
      "Dynamic Particle Cloud with Fibonacci distribution and particle turbulence",
      "Instant responsive viewport adapts across Retina & ultra-wide 4K displays",
      "Smooth micro-interactions and magnetic button snap mechanics",
      "Optimized battery footprint with automatic tab visibility pause",
    ],
    liveUrl: "https://unseen.co/",
    githubUrl: "https://github.com",
    featured: true,
    status: "Live in Production",
    accentColor: "from-amber-400 via-rose-500 to-violet-600",
  },
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "Manipal University Jaipur",
    location: "Jaipur, India",
    period: "2025 - Present (Ongoing)",
    scoreOrStatus: "Ongoing",
    highlights: [
      "Specialization in Advanced Software Architecture, Distributed Systems, and Cloud Computing.",
      "Deep focus on scalable database design, API design patterns, and asynchronous processing.",
      "Active research and practical execution of real-world fintech architectures.",
    ],
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "Berhampur University",
    location: "Berhampur, Odisha, India",
    period: "2020-2023",
    scoreOrStatus: "75% (Distinction)",
    highlights: [
      "Rigorous foundation in Data Structures, Object-Oriented Programming, and Relational Databases.",
      "Core coursework in C#, Java, Python, Operating Systems, and Computer Networks.",
      "Built multiple web and mobile academic applications as capstone projects.",
    ],
  },
];

export const COMPANY_EXPERIENCE: CompanyExperience[] = [
  {
    company: "Spay India Pvt Limited",
    role: "Software Engineer",
    period: "Nov 2025 – Present",
    location: "Delhi",
    workMode: "Onsite",
    type: "Full-time",
    isCurrent: true,
    metrics: [
      { label: "Architecture", value: ".NET WCF + Flutter" },
      { label: "Core Modules", value: "DMT, AEPS, MATM, CMS" },
      { label: "Hardware SDKs", value: "Fingpay Biometric" },
      { label: "Architecture Pattern", value: "Enum State Machines" },
    ],
    bulletPoints: [
      "Designed and built .NET WCF APIs in C# powering Flutter applications, covering request validation, transaction processing, and status handling for banking services.",
      "Implemented fintech modules in Flutter: DMT, AEPS, Micro ATM, Payment Gateway, CMS, and utility services (bill payments, recharges).",
      "Delivered end-to-end features across WCF service contracts, database logic, Flutter UI, and state management.",
      "Integrated payment and biometric SDKs on Android, including Fingpay BC, with hash-based request signing and transaction status reconciliation.",
      "Built biometric AEPS authentication flows and refactored KYC and Re-KYC into an enum-driven state machine, improving maintainability and debugging.",
    ],
    liveApps: ["Spay India RT App", "Spay India DIMD"],
    technologies: [
      "C#",
      ".NET WCF",
      "Flutter",
      "Android SDKs",
      "Fingpay BC",
      "AEPS Biometric",
      "DMT",
      "Micro ATM",
      "Payment Gateway",
      "CMS",
      "State Machines",
    ],
  },
  {
    company: "Prayas Financial Services Pvt Ltd",
    role: "Android Developer",
    period: "April 2024 – October 2025",
    location: "Gurugram",
    workMode: "Onsite",
    type: "Full-time",
    isCurrent: false,
    metrics: [
      { label: "API Latency Reduction", value: "30%" },
      { label: "Failure Rate Slashed", value: "20%" },
      { label: "App Crashes Reduced", value: "30%" },
      { label: "Session Retention Boost", value: "+15%" },
    ],
    bulletPoints: [
      "Reduced API response time by 30% and improved load speed, increasing session retention by 15%.",
      "Shipped a payments suite (mobile/DTH recharge, BBPS); integrated Easebuzz and Airpay with robust error handling, reducing transaction failures by 20% and improving processing speed by 25%.",
      "Built a complete bus-booking flow with real-time search, booking, and transaction status tracking.",
      "Fixed critical bugs and optimized backend interactions, reducing crashes by 30%.",
    ],
    liveApps: ["PrayasPe", "PrayasPe Merchant"],
    technologies: [
      "Android Native",
      "Kotlin / Java",
      "Easebuzz",
      "Airpay",
      "BBPS",
      "Payment Gateways",
      "Bus Booking Flow",
      "REST APIs",
      "Crashlytics",
      "Performance Tuning",
    ],
  },
];

export const EXPERIENCE_MILESTONES: ExperienceItem[] = [
  {
    role: "Software Engineer",
    companyOrDomain: "Spay India Pvt Limited (Delhi)",
    period: "Nov 2025 – Present",
    type: "Full-time (Onsite)",
    description: "Engineering .NET WCF APIs in C# and Flutter applications for banking and fintech operations covering AEPS, DMT, Micro ATM, and biometric device integration.",
    deliverables: [
      "Designed and built .NET WCF APIs in C# powering Flutter apps with request validation and status reconciliation.",
      "Implemented fintech modules in Flutter: DMT, AEPS, Micro ATM, Payment Gateway, CMS, and utility services.",
      "Integrated Fingpay BC biometric SDK on Android with hash-based request signing.",
      "Refactored KYC and Re-KYC into enum-driven state machines; live in Spay India RT App & DIMD.",
    ],
    skills: [".NET WCF", "C#", "Flutter", "Android SDK", "Fingpay BC", "AEPS", "DMT"],
  },
  {
    role: "Android Developer",
    companyOrDomain: "Prayas Financial Services Pvt Ltd (Gurugram)",
    period: "April 2024 – October 2025",
    type: "Full-time",
    description: "Developed payments suite and performance-tuned Android mobile architecture powering PrayasPe and PrayasPe Merchant platforms.",
    deliverables: [
      "Reduced API response time by 30% and improved load speed, increasing session retention by 15%.",
      "Integrated Easebuzz and Airpay with robust error handling, reducing transaction failures by 20%.",
      "Engineered complete bus-booking flow with real-time search, booking, and status reconciliation.",
      "Fixed critical bugs and optimized backend interactions, reducing app crashes by 30%.",
    ],
    skills: ["Android", "Kotlin", "Java", "Easebuzz", "Airpay", "BBPS", "REST APIs"],
  },
];

export const TESTIMONIAL_HIGHLIGHTS = [
  {
    quote: "Abhisek possesses the rare ability to build both deeply polished mobile/web UIs and rock-solid, concurrent backend architectures that never buckle under pressure.",
    title: "Engineering Mindset",
    tag: "Full Stack Mastery",
  },
  {
    quote: "Our fintech transactions require sub-second processing and zero ledger discrepancies. Abhisek engineered our API pipelines with incredible precision.",
    title: "Fintech Reliability",
    tag: "99.9% Uptime",
  },
];
