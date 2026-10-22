export const profile = {
  name: 'JUAN PABLO ORTIZ MURILLO',
  short: 'JUAN PABLO',
  email: 'jpssum41@msn.com',
  location: 'São Paulo, Brazil',
  tagline: 'PRODUCT DESIGNER | UX/UI DESIGNER. COMPLEX DIGITAL PRODUCTS MADE CLEAR.',
  summary:
    'About seven years of UX research, product design and UX/UI, with front-end knowledge that strengthens collaboration with engineering teams. Specialised in design systems and authentication and account-security experiences, including SSO and MFA.',
  dialog:
    '"I work end to end - discovery, research synthesis, flow mapping, high-fidelity design, usability testing and engineering-ready specs - and my front-end knowledge helps me work closely with developers."',
  resume: `${import.meta.env.BASE_URL}resume.pdf`,
  links: [
    ['PORTFOLIO (FRAMER)', 'https://cherished-operations-791449.framer.app/'],
    ['GITHUB PAGES', 'https://juanpib.github.io/JP/'],
  ],
}

export const attributes = [
  ['UX RESEARCH', 9, 'blue'],
  ['PRODUCT DESIGN', 9, 'coral'],
  ['DESIGN SYSTEMS', 8, 'green'],
  ['AUTH & IDENTITY', 7, 'sun'],
  ['PROTOTYPING', 9, 'blue'],
  ['ACCESSIBILITY', 8, 'coral'],
]

export const experience = [
  { status: 'ACTIVE', title: 'BETANO - UX/UI DESIGNER', when: '07/2025 - 11/2026', desc: 'Product design for a next-generation iGaming platform: deposit, betting, withdrawal and account-security flows, including MFA.', tag: 'IGAMING' },
  { title: 'UNITED PARKS & RESORTS - UX/UI DESIGNER', when: '07/2024 - 06/2025', desc: 'B2B SaaS/CRM platform: UI audit, flows, prototypes and design-system patterns.', tag: 'B2B SAAS' },
  { title: 'SBT TV CHANNEL - UX/UI DESIGNER', when: '03/2023 - 08/2024', desc: 'Led the redesign of SBT web and apps, including multi-platform SSO and a scalable design system.', tag: 'MEDIA' },
  { title: 'J.ASSY - UX/UI DESIGNER', when: '06/2022 - 03/2023', desc: 'UX/UI exploration for agricultural products: prototypes, usability tests and design system.', tag: 'AGRO' },
  { title: 'ALLOY MIT - UX/UI DESIGNER', when: '11/2021 - 06/2022', desc: 'Crypto fintech: user journeys, information architecture, design system, MFA and Pix / card payment flows.', tag: 'FINTECH' },
  { title: 'WIZARD SCHOOL - UI/UX RESEARCHER', when: '08/2019 - 11/2021', desc: 'User research across digital and social experiences, turned into content and interface recommendations.', tag: 'RESEARCH' },
]

export const education = [
  { title: "BACHELOR'S DEGREE: GRAPHIC DESIGN", when: 'UNIVERSITY OF CUNDINAMARCA / COLOMBIA', desc: 'Graphic Design foundation.', tag: 'DEGREE' },
  { title: 'UX/UI DESIGN', when: 'EBAC', desc: 'Specialisation in UX/UI design.', tag: 'COURSE' },
  { title: 'WEB DEVELOPMENT', when: 'UDEMY', desc: 'HTML, CSS and React knowledge that strengthens collaboration with engineering teams.', tag: 'COURSE' },
]

export const stages = [
  ['1-1', 'DISCOVER', 'Research and synthesis.', 'blue'],
  ['1-2', 'FLOWS', 'Journeys and flow mapping.', 'green'],
  ['1-3', 'DESIGN', 'High-fidelity and systems.', 'sun'],
  ['1-4', 'TEST', 'Usability testing.', 'coral'],
  ['1-5', 'HANDOFF', 'Engineering-ready specs.', 'purple'],
  ['BOSS', 'MEASURE', 'Impact measurement.', 'orange'],
]
