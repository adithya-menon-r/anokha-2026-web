import { BotIcon, CarIcon, Cloud, Cpu, Factory, Shield } from 'lucide-react';

export const DOMAINS_DATA = [
  {
    icon: CarIcon,
    name: 'Electric Vehicles',
    color: 'from-[#a855f7] to-[#ec4899]',
  },
  {
    icon: Cpu,
    name: 'AI & IoT',
    color: 'from-[#06b6d4] to-[#3b82f6]',
  },
  {
    icon: BotIcon,
    name: 'Robotics',
    color: 'from-[#a855f7] to-[#ec4899]',
  },
  {
    icon: Factory,
    name: 'Industry 4.0',
    color: 'from-[#06b6d4] to-[#3b82f6]',
  },
  {
    icon: Cloud,
    name: 'Cloud & Digital',
    color: 'from-[#a855f7] to-[#ec4899]',
  },
  {
    icon: Shield,
    name: 'Cyber Security',
    color: 'from-[#06b6d4] to-[#3b82f6]',
  },
] as const;

export const SPEAKERS_DATA = {
  day1: [
    {
      name: 'Elango Narayanan',
      designation: 'MD, Polkart Logistics',
      linkedin: 'https://www.linkedin.com/in/elango-narayanan-2a2a027/',
      expertise: [
        'Supply Chain Optimization',
        'Logistics Digitization',
        'Business Analytics',
        'M&A-led Growth',
      ],
      domains: [
        'Industry 4.0 & Smart Manufacturing',
        'Cloud & Digital Transformation',
      ],
    },
    {
      name: 'Sharmila S',
      designation: 'CEO, Corefactors',
      linkedin: 'https://www.linkedin.com/in/sharmilasundaram/',
      expertise: [
        'CRM Platforms',
        'Revenue Operations (RevOps)',
        'SaaS Product Innovation',
        'Digital Business Leadership',
      ],
      domains: ['Cloud Computing & Digital Transformation', 'AI & Big Data'],
    },
    {
      name: 'C.R. Gopinath',
      designation: 'Global Practice Director, HCLTech',
      linkedin: 'https://www.linkedin.com/in/gopinath-c-r-698555347/',
      expertise: [
        'Enterprise Architecture',
        'CRM/ERP Platforms',
        'Program Management',
        'Digital Consulting',
      ],
      domains: ['Cloud Computing & Digital Transformation', 'AI & Big Data'],
    },
    {
      name: 'Dr. S. Devarajan',
      designation: 'Sr. VP, TVS Motors',
      linkedin:
        'https://www.linkedin.com/in/s-devarajan-ped-hos-devarajan-743677a3/',
      expertise: [
        'Advanced Manufacturing',
        'Digital Manufacturing',
        'Lean/TPM/JIT',
        'Production Engineering',
      ],
      domains: ['Industry 4.0 & Smart Manufacturing', 'Robotics & Automation'],
    },
    {
      name: 'A.N. Chandramouli',
      designation: 'CEO, ANCM Consultants',
      linkedin: 'https://www.linkedin.com/in/chandramouli-mouli-a82580107',
      expertise: [
        'Industry 4.0 Advisory',
        'Automation & Additive Manufacturing',
        'Precision Machining',
        'MSME Transformation',
      ],
      domains: ['Industry 4.0', 'Robotics & Automation', 'Smart Manufacturing'],
    },
    {
      name: 'Jagannath V',
      designation: 'COO, m2nxt',
      linkedin:
        'https://www.linkedin.com/in/jagannath-varadaraja-iyengar-255555186/',
      expertise: [
        'CNC Automation',
        'Robotics & AGVs/AMRs',
        'Smart Factory MES Integration',
        'EV Manufacturing Transition',
      ],
      domains: [
        'Robotics & Automation',
        'IoT & Edge Computing',
        'Industry 4.0',
      ],
    },
  ],
  day2: [
    {
      name: 'Solomon Jones',
      designation: 'CEO, Terracarb',
      linkedin: 'https://www.linkedin.com/in/solomonjones2311/',
      expertise: [
        'Graphene Materials',
        'Sustainable Construction',
        'Advanced Materials Commercialization',
        'Decarbonization',
      ],
      domains: ['Electric Vehicles & Sustainable Mobility', 'Industry 4.0'],
    },
    {
      name: 'Sathish Kumar Krishna',
      designation: 'CEO, Intrcept Labs',
      linkedin: 'https://in.linkedin.com/in/satishkrishna21',
      expertise: [
        'Cybersecurity Strategy',
        'AI/ML for Security',
        'Digital Transformation',
        'M&A Integration',
      ],
      domains: ['Cybersecurity', 'AI & Big Data'],
    },
    {
      name: 'Satish Mohanram',
      designation: 'Sr. Director, SiMa.ai',
      linkedin: 'https://www.linkedin.com/in/satishmohanram/',
      expertise: [
        'Edge AI Semiconductors',
        'Energy-efficient ML Systems',
        'Go-to-Market Strategy',
        'Embedded AI Platforms',
      ],
      domains: ['IoT & Edge Computing', 'AI & Big Data', 'Embedded Systems'],
    },
    {
      name: 'P. Ramakrishnan',
      designation: 'Group Executive Director & CTO, DLF',
      linkedin: 'https://www.linkedin.com/in/p-ramakrishnan-79780923/',
      expertise: [
        'Digital Transformation in Real Estate',
        'Smart Infrastructure',
        'Project Management',
        'Technology Strategy',
      ],
      domains: ['Cloud & Digital Transformation', 'Industry 4.0'],
    },
    {
      name: 'Mr. Jay Nanduri',
      designation: 'CTO, Truveta',
      linkedin: 'https://www.linkedin.com/in/jaynanduri',
      expertise: [
        'Technology Leadership',
        'AI & ML',
        'Big Data',
        'Cloud Platforms',
        'Security',
        'Fraud Protection',
      ],
      domains: ['AI & ML', 'Fraud Protection', 'Data-driven Platforms'],
    },
    {
      name: 'Jaison John',
      designation: 'Marketing Director, MFAR Caron',
      linkedin: 'https://www.linkedin.com/in/jaison-john-28444124/',
      expertise: [
        'Software Engineering',
        'Full-stack & Backend Development',
        'ML & Data Quality',
        'Systems Integration',
      ],
      domains: ['Software Engineering', 'System Integration'],
    },
    {
      name: 'N. Ramachandran',
      designation: 'Chairman, MEL Systems',
      linkedin: 'https://www.linkedin.com/in/ramachandran-natarajan-75279425/',
      expertise: [
        'Industrial Automation',
        'Defense Electronics',
        'Aerospace Systems',
        'Test & Measurement',
      ],
      domains: ['Robotics & Automation', 'Embedded Systems', 'Industry 4.0'],
    },
    {
      name: 'Raj Kishore Naik',
      designation: 'VP, Ashok Leyland',
      linkedin: 'https://www.linkedin.com/in/raj-kishore-naik-a02bb52b/',
      expertise: [
        'Automotive Product Engineering',
        'Supplier Development',
        'Quality Systems',
        'Supply Chain Resilience',
      ],
      domains: ['Electric Vehicles', 'Industry 4.0', 'Smart Manufacturing'],
    },
    {
      name: 'Sanjeev Jain',
      designation: 'COO, Wipro',
      linkedin: 'https://www.linkedin.com/in/sanjeevakjain/',
      expertise: [
        'Global Operations Leadership',
        'Operational Transformation',
        'Customer Advocacy',
        'Centers of Excellence',
      ],
      domains: ['Cloud & Digital Transformation', 'Enterprise IT Operations'],
    },
  ],
  day3: [
    {
      name: 'Dr. T.R. Parasuraman',
      designation: 'Executive Advisor, Toyota Group',
      linkedin: 'https://www.linkedin.com/in/parasuraman/',
      expertise: [
        'Lean Manufacturing',
        'TQM & TPM',
        'Automotive Supply Chains',
        'Japanese Manufacturing Practices',
      ],
      domains: ['Industry 4.0', 'Smart Manufacturing', 'Electric Vehicles'],
    },
  ],
} as const;
