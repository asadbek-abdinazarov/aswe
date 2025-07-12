// Default data to use when APIs are unavailable or return no data
export const defaultAboutData = {
  id: 1,
  title: "About Me",
  description: "Crafting robust backend solutions with passion and precision",
  content:
    "I'm a passionate Java Backend Developer with over 2 years of experience building scalable, high-performance applications. My expertise lies in designing and implementing robust microservices architectures using Spring Boot, Docker, and cloud technologies.\n\nI believe in writing clean, maintainable code and following best practices. When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community.",
  image: "/IMG_1372.jpg",
  location: "Uzbekistan, Tashkent",
  experience: "2+ Years",
  specialization: "Backend Development",
  passion: "Clean Code & Architecture",
  availability: true,
  quote: "Code is like humor. When you have to explain it, it's bad.",
  quoteAuthor: "Cory House",
}

export const defaultExperienceData = [
  {
    id: 1,
    title: "Java Backend Developer",
    company: "Furor Progress",
    location: "Tashkent",
    duration: "Mar 2025 - May 2025",
    type: "Full-time & Onsite",
    description:
      "At Furor Progress, I contributed to major systems like HududGazTaminoti and EcoFound as a backend developer, gaining deep experience in Jersey, Oracle, and MyBatis.",
    technologies: ["Java 8", "Jersey", "ORACLE", "MyBatis", "Vue"],
    achievements: [
      "1C integrated",
      "Contributed to various projects",
      "Implemented event-driven architecture",
    ],
  },
  {
    id: 2,
    title: "Mentor | Support Teacher",
    company: "Isystem IT Academy",
    location: "Tashkent",
    duration: "May 2022 - Jul 2024",
    type: "Part Time & Onsite",
    description:
      "As a teacher, I began my tutoring job at Isystem IT Academy. Now, both my students and I are deeply passionate about teaching and learning. In the future, I aim to achieve even greater results through continuous learning and training.",
    technologies: ["Java 17 & 21", "Data Structure", "OOP", "Teaching", "PostgreSQL", "Git", "Maven", "StreamAPI", "Multithreading", "Spring Boot", "Hibernate", "Spring Security", "Spring Data JPA", "Algorithms"],
    achievements: ["Teaching", "Practice Projects", "Taking tests"],
  },
]

export const defaultEducationData = [
  {
    id: 1,
    degree: "Bachelor of Software Development and Programming",
    institution: "PDP University",
    location: "Tashkent",
    duration: "Oct 2022 - Oct 2026",
    gpa: "4.6/5.0",
    description:
      "During my studies, I continue to work as a mentor and consultant, and in this regard, I work with the Group assigned to me on many startup projects.",
    courses: ["Advanced Programming", "Data Structure and Algorithms", "Software Engineering", "Database Systems", "BI - Business Intelligence", "Web Development", "Mobile Development", "Cloud Computing", "BPMN 2.0"],
    achievements: ["Dean's List", "Graduate Teaching Assistant", "Research Publication"],
  },
  {
    id: 2,
    degree: "General English and IELTS",
    institution: "EDU VIBE",
    location: "Tashkent",
    duration: "Sep 2022 - May2024",
    gpa: "",
    description:
      "Edu vibe Academy is a huge source of knowledge for me.",
    courses: ["General English", "B2"],
    achievements: [],
  },
  {
    id: 3,
    degree: "Java Programming Language",
    institution: "Isystem IT Academy",
    location: "Tashkent",
    duration: "Avg 2021 - May 2022",
    gpa: "",
    description:
      "During my studies, I gained a lot of knowledge, made new friends, and improved my practical knowledge of Java.",
    courses: ["Java SE", "Spring Boot", "PostgreSQL", "Docker", "Swagger", "Microservice", "Multithreading"],
    achievements: ["Creative Thinking", "Networking", "Clean Code", "Problem Solving"],
  },
]

export const defaultSkillsData = [
  {
    id: 1,
    title: "Backend Development",
    icon: "Server",
    color: "text-blue-600",
    skills: [
      { name: "Java", level: 95, years: null },
      { name: "Spring Boot", level: 90, years: null},
      { name: "Spring Framework", level: 85, years: null },
      { name: "Hibernate/JPA", level: 80, years: null },
      { name: "RESTful APIs", level: 90, years: null },
      { name: "Microservices", level: 50, years: null },
    ],
  },
  {
    id: 2,
    title: "Databases",
    icon: "Database",
    color: "text-green-600",
    skills: [
      { name: "PostgreSQL", level: 85, years: null },
      { name: "MySQL", level: 80, years: null },
      { name: "MongoDB", level: 75, years: null },
      { name: "Redis", level: 70, years: null },
      { name: "H2", level: 70, years: null },
      { name: "Oracle DB", level: 65, years: null },
    ],
  },
  {
    id: 3,
    title: "Platforms & Running Tools",
    icon: "Cloud",
    color: "text-purple-600",
    skills: [
      { name: "Linux", level: 65, years: null },
      { name: "Docker", level: 85, years: null },
      { name: "Maven", level: 85, years: null },
      { name: "Gradle", level: 60, years: null },
    ],
  },
  {
    id: 4,
    title: "Other Technologies",
    icon: "Settings",
    color: "text-orange-600",
    skills: [
      { name: "Git", level: 90, years: null },
      { name: "Maven", level: 85, years: null },
      { name: "Gradle", level: 50, years: null },
      { name: "IntelliJ IDEA", level: 95, years: null },
      { name: "Postman", level: 85, years: null },
      { name: "Swagger", level: 90, years: null },
    ],
  },
]

export const defaultProjectsData =  [
  {
    id: 1,
    title: "U-SHORT",
    description:
      "A simple, secure, and modern URL shortening web application built with Java Spring Boot, Thymeleaf, and PostgreSQL.",
    shortDescription: "U-SHORT is an open source URL shortening web application written in Spring Boot, Thymeleaf, and PostgreSQL technologies. It provides easy-to-use, modern interface, and secure URL generation.",
    image: "/u-short.png",
    technologies: ["Java 17", "Spring Boot", "PostgreSQL", "Thymeleaf", "HTML", "CSS", "Bootstrap"],
    githubUrl: "https://github.com/asadbek-abdinazarov/u-short",
    liveUrl: "https://u-short-production.up.railway.app",
    developers: [
      {
        name: "Asadbek Abdinazarov",
        avatar: "/placeholder-user.jpg",
        role: "Full Stack Developer",
        email: "a.abdinazarov@student.pdp.university"
      }
    ],
    features: [
      "Safe & Unique Short URLs",
      "Click Tracking (optional)",
      "Custom Domain Support",
      "Modern UI with Thymeleaf and Bootstrap",
      " PostgreSQL database integration",
      "Easy deployment on Railway / Render / VPS",
    ],
    metrics: {
      users: "1K+",
      requests: "500+/day",
      uptime: "85%",
    },
    duration: "2 months",
    team: "1 developers",
    status: "Production",
  },
  {
    id: 2,
    title: "MilliyWay Pos System",
    description: "High-performance Point of Sale (POS) system designed for small and medium businesses. It supports sales management, inventory tracking, receipt printing, and real-time reporting. Built with modern technologies for speed, reliability, and scalability.",
    shortDescription: "Alternative Point of Sale System",
    image: "/projects/pos-img.png",
    technologies: ["Java 17", "Spring Boot", "Dart", "Flutter", "Esc/POS"],
    githubUrl: null,
    liveUrl: null,
    developers: [
      {
        name: "Asadbek Abdinazarov",
        avatar: "/placeholder-user.jpg",
        role: "Full Stack Developer",
        email: "a.abdinazarov@student.pdp.university"
      },
      {
        name: "Muhammad Akhmadaliyev",
        avatar: "/placeholder-user.jpg",
        role: "Flutter Developer",
        email: "akhmadaliyev17x@gmail.com"
      }
    ],
    features: [
      "Sales and invoice management",
      "Product and inventory tracking",
      "Real-time data sync with WebSocket",
      "Receipt printing with ESC/POS support",
      "Barcode scanner integration",
      "Multi-user support with role-based access",
      "Offline mode and sync on reconnect",
      "Daily/weekly sales reports"
    ],
    metrics: {
      endpoints: null,
      coverage: null,
      performance: null,
    },
    duration: "1 month",
    team: "2 developers",
    status: "In Progress",
  },
  {
    id: 3,
    title: "Qo'shniPay | QPay",
    description:
    "Qo‘shniPay (QPay) is a peer-to-peer microcredit and installment payment platform that allows users to lend and borrow money within trusted social circles. The platform integrates with OneID for secure authentication and uses facial recognition for identity verification. It includes borrower rating systems, automated installment tracking, and a transparent lending process.",
    shortDescription: "Trust-based microloan and installment platform",
    image: "/projects/qpay-img.png",
    technologies: ["Java 17", "Spring Framework", "PostgreSQL", "JWT", "OneID Integration", "Face Recognition"],
    githubUrl: null,
    liveUrl: null,
    developers: [
      {
        name: "Asadbek Abdinazarov",
        avatar: "/placeholder-user.jpg",
        role: "Full Stack Developer",
        email: "a.abdinazarov@student.pdp.university"
      },
      {
        name: "Muhammad Akhmadaliyev",
        avatar: "/placeholder-user.jpg",
        role: "Flutter Developer",
        email: "akhmadaliyev17x@gmail.com"
      }
    ],
    features: [
      "User registration and authentication via OneID",
      "Facial recognition verification",
      "Microloan request and approval system",
      "Trust-based scoring and borrower ratings",
      "Automated installment scheduling and tracking",
      "Email/SMS notifications for due dates",
      "Admin dashboard for system monitoring",
      "Secure RESTful API with JWT authorization"
    ],
    metrics: {
      endpoints: null,
      coverage: null,
      performance: null,
    },
    duration: "3 months",
    team: "2 developers",
    status: "In Progress",
  },
  {
    id: 4,
    title: "Texno Tasnim",
    description:
    "Texno Tasnim is a Telegram-based installment sales management system designed for retail shops that sell products on a monthly payment basis. The platform automates the entire sales workflow including customer registration, product selection, payment scheduling, and installment tracking — all through an interactive Telegram bot. It also features admin panels, reporting, and Google Sheets synchronization for backups and analytics.",
    shortDescription: "Telegram bot for managing installment-based product sales",
    image: "/projects/texno-tasnim-img.png",
    technologies: ["Java 17", "Spring Framework", "PostgreSQL", "Google Sheets Integration", "Telegram Bot API"],
    githubUrl: null,
    liveUrl: "https://t.me/TexnoTasnimBot",
    developers: [
      {
        name: "Asadbek Abdinazarov",
        avatar: "/placeholder-user.jpg",
        role: "Full Stack Developer",
        email: "a.abdinazarov@student.pdp.university"
      }
    ],
    features: [
      "Customer registration via Telegram bot",
      "Product selection and order creation through chat",
      "Installment scheduling and due date reminders",
      "Admin commands for managing customers and products",
      "Google Sheets integration for data backup and analytics",
      "Monthly and daily sales summary reports",
      "Role-based access (admin, seller, customer)",
      "Secure backend API with JWT authentication"
    ],
    metrics: {
      endpoints: null,
      coverage: null,
      performance: null,
    },
    duration: "3 months",
    team: "1 developers",
    status: "Completed",
  },
]

export const defaultPostsData = [
  {
    id: 1,
    title: "Building Scalable Microservices with Spring Boot",
    excerpt:
      "Learn how to design and implement microservices architecture using Spring Boot, Docker, and Kubernetes for maximum scalability.",
    content: "Full content would be here...",
    image: "/placeholder.svg?height=200&width=300",
    tags: ["Spring Boot", "Microservices", "Docker"],
    publishedAt: "2024-01-15",
    readTime: "8 min read",
    featured: true,
    published: true,
  },
  {
    id: 2,
    title: "Java Performance Optimization Techniques",
    excerpt:
      "Discover advanced techniques to optimize Java application performance, including JVM tuning and memory management.",
    content: "Full content would be here...",
    image: "/placeholder.svg?height=200&width=300",
    tags: ["Java", "Performance", "JVM"],
    publishedAt: "2024-01-10",
    readTime: "12 min read",
    featured: false,
    published: true,
  },
]

export const defaultArticlesData = [
  {
    id: 1,
    title: "Complete Guide to Spring Boot Security",
    excerpt:
      "An in-depth exploration of Spring Security implementation, from basic authentication to advanced authorization patterns.",
    content: "Full content would be here...",
    image: "/placeholder.svg?height=200&width=300",
    category: "Security",
    tags: ["Spring Security", "JWT", "OAuth2"],
    publishedAt: "2024-01-20",
    readTime: "25 min read",
    difficulty: "Advanced",
    featured: true,
    published: true,
    views: 15420,
  },
  {
    id: 2,
    title: "Mastering JPA and Hibernate Performance",
    excerpt:
      "Deep dive into JPA and Hibernate optimization techniques, query performance tuning, and common pitfalls to avoid.",
    content: "Full content would be here...",
    image: "/placeholder.svg?height=200&width=300",
    category: "Database",
    tags: ["JPA", "Hibernate", "Performance"],
    publishedAt: "2024-01-12",
    readTime: "20 min read",
    difficulty: "Intermediate",
    featured: false,
    published: true,
    views: 8930,
  },
]

export const defaultMessagesData: any[] = []
