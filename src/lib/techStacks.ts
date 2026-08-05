import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import {
  faReact,
  faVuejs,
  faNode,
  faPython,
  faJava,
  faPhp,
  faGolang,
  faRust,
  faJs,
  faDocker,
  faGit,
  faAws,
  faGoogle,
  faMicrosoft,
  faStripe,
  faFigma,
  faAngular,
  faSass,
  faBootstrap,
  faGithub,
  faGitlab,
  faJenkins,
  faLinux,
  faNpm,
  faYarn,
  faApple,
  faAndroid,
  faSwift,
  faHtml5,
  faCss3Alt,
  faLaravel,
  faSvelte,
  faTypescript,
  faTailwindCss,
} from '@fortawesome/free-brands-svg-icons'
import {
  faDatabase,
  faServer,
  faCubes,
  faPalette,
  faGem,
  faChartBar,
  faChartPie,
  faVial,
  faBolt,
  faBoxOpen,
  faFire,
  faProjectDiagram,
  faDesktop,
  faPlug,
  faEnvelope,
  faLeaf,
  faMobileScreen,
} from '@fortawesome/free-solid-svg-icons'

export interface TechStack {
  name: string
  icon?: IconDefinition
  category?: string
}

export const TECH_STACKS: TechStack[] = [
  // Frontend
  { name: 'React', icon: faReact, category: 'Frontend' },
  { name: 'Vue.js', icon: faVuejs, category: 'Frontend' },
  { name: 'Angular', icon: faAngular, category: 'Frontend' },
  { name: 'Svelte', icon: faSvelte, category: 'Frontend' },
  { name: 'Next.js', icon: faReact, category: 'Frontend' },
  { name: 'Nuxt.js', icon: faVuejs, category: 'Frontend' },
  { name: 'TypeScript', icon: faTypescript, category: 'Language' },
  { name: 'JavaScript', icon: faJs, category: 'Language' },
  { name: 'HTML', icon: faHtml5, category: 'Markup' },
  { name: 'CSS', icon: faCss3Alt, category: 'Styling' },
  { name: 'Tailwind CSS', icon: faTailwindCss, category: 'Styling' },
  { name: 'Sass', icon: faSass, category: 'Styling' },
  { name: 'Styled Components', icon: faPalette, category: 'Styling' },
  { name: 'Bootstrap', icon: faBootstrap, category: 'Styling' },
  { name: 'Material-UI', icon: faPalette, category: 'Styling' },
  { name: 'Redux', icon: faCubes, category: 'State Management' },
  { name: 'Zustand', icon: faCubes, category: 'State Management' },
  { name: 'React Query', icon: faServer, category: 'State Management' },
  { name: 'Vite', icon: faBolt, category: 'Build Tool' },
  { name: 'Webpack', icon: faBoxOpen, category: 'Build Tool' },

  // Backend
  { name: 'Node.js', icon: faNode, category: 'Backend' },
  { name: 'Express', icon: faNode, category: 'Backend' },
  { name: 'NestJS', icon: faNode, category: 'Backend' },
  { name: 'Python', icon: faPython, category: 'Language' },
  { name: 'Django', icon: faPython, category: 'Backend' },
  { name: 'FastAPI', icon: faPython, category: 'Backend' },
  { name: 'Flask', icon: faPython, category: 'Backend' },
  { name: 'Java', icon: faJava, category: 'Language' },
  { name: 'Spring', icon: faLeaf, category: 'Backend' },
  { name: 'Go', icon: faGolang, category: 'Language' },
  { name: 'Rust', icon: faRust, category: 'Language' },
  { name: 'PHP', icon: faPhp, category: 'Language' },
  { name: 'Laravel', icon: faLaravel, category: 'Backend' },
  { name: 'Ruby', icon: faGem, category: 'Language' },
  { name: 'Ruby on Rails', icon: faGem, category: 'Backend' },
  { name: 'C#', icon: faMicrosoft, category: 'Language' },
  { name: '.NET', icon: faMicrosoft, category: 'Backend' },
  { name: 'Kotlin', icon: faAndroid, category: 'Language' },

  // Database
  { name: 'PostgreSQL', icon: faDatabase, category: 'Database' },
  { name: 'MongoDB', icon: faDatabase, category: 'Database' },
  { name: 'MySQL', icon: faDatabase, category: 'Database' },
  { name: 'MariaDB', icon: faDatabase, category: 'Database' },
  { name: 'SQLite', icon: faDatabase, category: 'Database' },
  { name: 'Firebase', icon: faFire, category: 'Backend' },
  { name: 'Supabase', icon: faDatabase, category: 'Backend' },
  { name: 'Redis', icon: faDatabase, category: 'Database' },
  { name: 'Elasticsearch', icon: faDatabase, category: 'Database' },
  { name: 'DynamoDB', icon: faAws, category: 'Database' },

  // Tools & DevOps
  { name: 'Git', icon: faGit, category: 'Tool' },
  { name: 'GitHub Actions', icon: faGithub, category: 'DevOps' },
  { name: 'GitLab CI', icon: faGitlab, category: 'DevOps' },
  { name: 'Jenkins', icon: faJenkins, category: 'DevOps' },
  { name: 'Docker', icon: faDocker, category: 'DevOps' },
  { name: 'Kubernetes', icon: faCubes, category: 'DevOps' },
  { name: 'Terraform', icon: faCubes, category: 'DevOps' },
  { name: 'Ansible', icon: faCubes, category: 'DevOps' },
  { name: 'Linux', icon: faLinux, category: 'DevOps' },
  { name: 'Nginx', icon: faServer, category: 'Server' },
  { name: 'AWS', icon: faAws, category: 'Cloud' },
  { name: 'Google Cloud', icon: faGoogle, category: 'Cloud' },
  { name: 'Azure', icon: faMicrosoft, category: 'Cloud' },
  { name: 'Stripe', icon: faStripe, category: 'Tool' },
  { name: 'Figma', icon: faFigma, category: 'Design' },
  { name: 'npm', icon: faNpm, category: 'Package Manager' },
  { name: 'Yarn', icon: faYarn, category: 'Package Manager' },

  // Mobile & Desktop
  { name: 'React Native', icon: faReact, category: 'Mobile' },
  { name: 'Flutter', icon: faMobileScreen, category: 'Mobile' },
  { name: 'Swift', icon: faSwift, category: 'Mobile' },
  { name: 'Android', icon: faAndroid, category: 'Mobile' },
  { name: 'iOS', icon: faApple, category: 'Mobile' },
  { name: 'Electron', icon: faDesktop, category: 'Desktop' },

  // Data & Visualization
  { name: 'D3.js', icon: faChartBar, category: 'Visualization' },
  { name: 'Chart.js', icon: faChartPie, category: 'Visualization' },
  { name: 'GraphQL', icon: faProjectDiagram, category: 'API' },
  { name: 'REST API', icon: faServer, category: 'API' },

  // Testing
  { name: 'Jest', icon: faVial, category: 'Testing' },
  { name: 'Vitest', icon: faVial, category: 'Testing' },
  { name: 'Cypress', icon: faVial, category: 'Testing' },
  { name: 'Playwright', icon: faVial, category: 'Testing' },
  { name: 'Puppeteer', icon: faVial, category: 'Testing' },

  // Other
  { name: 'Prisma', icon: faDatabase, category: 'ORM' },
  { name: 'WebSocket', icon: faPlug, category: 'Protocol' },
  { name: 'Socket.io', icon: faPlug, category: 'Protocol' },
  { name: 'RabbitMQ', icon: faEnvelope, category: 'Message Broker' },
  { name: 'Kafka', icon: faEnvelope, category: 'Message Broker' },
]

export const getTechByName = (name: string): TechStack | undefined => {
  return TECH_STACKS.find((t) => t.name.toLowerCase() === name.toLowerCase())
}

export const filterTechs = (query: string): TechStack[] => {
  if (!query.trim()) return TECH_STACKS
  const lower = query.toLowerCase()
  return TECH_STACKS.filter((t) => t.name.toLowerCase().includes(lower))
}
