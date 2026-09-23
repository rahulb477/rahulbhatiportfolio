import { PROJECT_IMAGES, PROJECT_URLS } from "./config";

export const profile = {
  name: "Rahul Bhati",
  wordmark: "RAHUL BHATI",
  role: "Full-Stack Web Developer",
  secondaryRole: "AI-Assisted App & Web Developer",
  email: "rahulbhatidevelopment@gmail.com",
  phone: "7568329747",
  whatsapp: "917568329747",
  location: "Rajasthan, India",
  socials: {
    instagram: "https://www.instagram.com/nexora.xstudio?stkn=MTRqbzUxYTR4YWRvNQ==",
  },
};

export const navItems = ["Home", "About", "Service", "Project", "Certificate", "Contact"];

export interface AboutWord {
  text: string;
  strong?: boolean;
  grad?: boolean;
}

export const aboutWords: AboutWord[] = [
  { text: "Hey," },
  { text: "I'm" },
  { text: "Rahul.", grad: true },
  { text: "A" },
  { text: "self-taught," },
  { text: "project-based" },
  { text: "Full-Stack" },
  { text: "Web" },
  { text: "Developer", strong: true },
  { text: "focused" },
  { text: "on" },
  { text: "building" },
  { text: "thoughtful" },
  { text: "web" },
  { text: "experiences" },
  { text: "and" },
  { text: "exploring" },
  { text: "AI-Assisted", strong: true },
  { text: "App" },
  { text: "&" },
  { text: "Web" },
  { text: "Development.", strong: true },
  { text: "I" },
  { text: "care" },
  { text: "about" },
  { text: "clear" },
  { text: "interfaces," },
  { text: "reliable" },
  { text: "foundations," },
  { text: "responsive" },
  { text: "behavior," },
  { text: "and" },
  { text: "using" },
  { text: "modern" },
  { text: "tools" },
  { text: "with" },
  { text: "purpose." },
  { text: "Every" },
  { text: "project" },
  { text: "is" },
  { text: "a" },
  { text: "chance" },
  { text: "to" },
  { text: "learn," },
  { text: "test" },
  { text: "ideas," },
  { text: "and" },
  { text: "make" },
  { text: "the" },
  { text: "next" },
  { text: "build" },
  { text: "stronger." },
];

export interface StackRow {
  label: string;
  items: string[];
  duration: number;
  reverse?: boolean;
}

export const stackRows: StackRow[] = [
  {
    label: "Build",
    items: [
      "Full-Stack Web Development", "Frontend Interfaces", "Backend Systems",
      "Responsive Layouts", "Accessible UX",
    ],
    duration: 54,
  },
  {
    label: "Workflow",
    items: [
      "AI-Assisted Development", "Iterative Prototyping", "Problem Solving",
      "Testing", "Version Control",
    ],
    duration: 46,
    reverse: true,
  },
  {
    label: "Principles",
    items: [
      "Clarity", "Performance", "Maintainability", "Accessibility", "Useful Motion",
    ],
    duration: 60,
  },
  {
    label: "Explore",
    items: [
      "Web Apps", "App Experiences", "APIs", "Data", "Automation", "Developer Experiments",
    ],
    duration: 50,
    reverse: true,
  },
];

export interface Service {
  id: string;
  title: string;
  description: string;
  capabilities: string[];
  buttonText?: string;
}

export const services: Service[] = [
  {
    id: "01",
    title: "FULL-STACK WEB DEVELOPMENT",
    description:
      "End-to-end project work across interface and server-side logic, with each build shaped around a clear problem and a practical scope.",
    capabilities: [
      "Frontend Architecture", "Backend Logic", "Data Flows", "API Integration",
      "Responsive Delivery",
    ],
    buttonText: "VIEW PROJECTS",
  },
  {
    id: "02",
    title: "FRONTEND & INTERFACE SYSTEMS",
    description:
      "Clean interfaces with strong hierarchy, responsive behavior, accessible interaction, and motion used only where it helps the experience.",
    capabilities: [
      "Responsive UI", "Interaction Design", "Accessibility", "Animation",
      "Component Systems", "Performance",
    ],
  },
  {
    id: "03",
    title: "BACKEND & CONNECTED EXPERIENCES",
    description:
      "Server-side foundations that connect interfaces to data, services, and the logic a useful web experience needs.",
    capabilities: [
      "API Design", "Data Modeling", "Authentication Flows", "Integrations",
      "Validation", "Error Handling",
    ],
  },
  {
    id: "04",
    title: "AI-ASSISTED DEVELOPMENT",
    description:
      "AI-assisted workflows used as a practical development tool for research, prototyping, iteration, and careful implementation.",
    capabilities: [
      "Rapid Prototyping", "Technical Research", "Workflow Design",
      "Iteration", "Review", "Human-Guided Decisions",
    ],
  },
  {
    id: "05",
    title: "RESPONSIVE & ACCESSIBLE DELIVERY",
    description:
      "Experiences considered across small phones, tablets, desktops, and large screens without losing clarity or usability.",
    capabilities: [
      "Mobile-First Layouts", "Keyboard Access", "Touch Interaction",
      "Readable Type", "Performance", "Progressive Enhancement",
    ],
  },
  {
    id: "06",
    title: "PROJECT-BASED COLLABORATION",
    description:
      "A focused, project-based approach built around understanding the problem, defining the work, and improving through feedback.",
    capabilities: [
      "Project Scoping", "Clear Communication", "Incremental Delivery",
      "Feedback Loops", "Documentation", "Continuous Learning",
    ],
  },
];

export interface Project {
  name: string;
  category: string;
  description: string;
  capabilities: string[];
  image: string;
  imageAlt: string;
  liveUrl: string;
}

export const projects: Project[] = [
  {
    name: "Granth Laptop Hub",
    category: "E-Commerce / Business Website",
    description:
      "A modern laptop and computer business website designed to present products, services and business information through a clean e-commerce-style experience.",
    capabilities: [
      "Product-focused UI",
      "Responsive design",
      "E-commerce-style layout",
      "Business information architecture",
      "Mobile-first interface",
    ],
    image: PROJECT_IMAGES.granthLaptopHub,
    imageAlt: "Granth Laptop Hub website preview",
    liveUrl: PROJECT_URLS.granthLaptopHub,
  },
  {
    name: "Architectural Renovation Studio",
    category: "Architecture / Service Website",
    description:
      "A polished service-business website created for an architectural and renovation studio, focused on visual presentation, services and professional brand positioning.",
    capabilities: [
      "Premium visual presentation",
      "Service-based website architecture",
      "Responsive layouts",
      "Editorial typography",
      "Client-focused UX",
    ],
    image: PROJECT_IMAGES.architecturalRenovation,
    imageAlt: "Architectural Renovation Studio website preview",
    liveUrl: PROJECT_URLS.architecturalRenovation,
  },
  {
    name: "Jai Jinendra Collection",
    category: "Fashion / E-Commerce Website",
    description:
      "A fashion e-commerce experience for a men's clothing brand, combining product discovery, categories, offers, WhatsApp ordering and store information.",
    capabilities: [
      "Fashion e-commerce UI",
      "Product categories",
      "Product discovery",
      "WhatsApp ordering flow",
      "Offers and promotional sections",
      "Store information",
      "Responsive mobile experience",
    ],
    image: PROJECT_IMAGES.jaiJinendraCollection,
    imageAlt: "Jai Jinendra Collection website preview",
    liveUrl: PROJECT_URLS.jaiJinendraCollection,
  },
];
