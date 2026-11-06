// All copy comes from konten.md. Keep this file in sync with it.

export const person = {
  name: 'Nadine Kay Ludony',
  nickname: 'Din',
  status:
    '5th-semester Informatics student at Universitas Multimedia Nusantara (UMN), Tangerang, Indonesia',
  tagline: 'Student developer at UMN, building web apps and AI projects.',
  email: 'nadineludony@gmail.com',
  github: 'https://github.com/Nadinelud',
  linkedin: 'https://www.linkedin.com/in/nadineludony/',
  // File lives in public/. BASE_URL keeps the path right under the /portfolio/ base.
  cv: `${import.meta.env.BASE_URL}Nadine-Kay-Ludony-CV.pdf`,
}

export const about = [
  "I'm a 5th-semester Informatics student at Universitas Multimedia Nusantara who enjoys working on both sides of a product: the interface people use, and the AI that can make it smarter. I like keeping things simple, practical, and pleasant to use.",
  "I'm currently looking for an internship where I can learn from a real team and contribute to real products.",
]

export const skills = [
  { group: 'Programming languages', items: ['Python', 'JavaScript', 'Kotlin', 'HTML', 'CSS'] },
  {
    group: 'Software development',
    items: [
      'Object-oriented programming (OOP)',
      'React',
      'Tailwind CSS',
      'Vite',
      'Responsive web design',
      'Mobile app programming',
    ],
  },
  { group: 'UI design', items: ['Figma', 'Designing interfaces for multiple user roles'] },
  {
    group: 'Artificial intelligence',
    items: ['Training and testing AI models', 'AI-assisted development'],
  },
  { group: 'Tools and platforms', items: ['Git', 'GitHub', 'GitHub Pages'] },
  {
    group: 'Professional skills',
    items: [
      'Time management',
      'Teamwork',
      'Working under pressure',
      'Quick learning',
      'Explaining difficult concepts clearly',
    ],
  },
  { group: 'Languages', items: ['Fluent English'] },
]

export const sections = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
]
