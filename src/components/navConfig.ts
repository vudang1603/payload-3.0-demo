// Shared navigation configuration — single source of truth for the desktop
// header dropdowns (Header.tsx) and the mobile hamburger menu (HeaderMobileMenu.tsx),
// mirroring the site sitemap.
//
// Each item either links somewhere real (`href`) or, when the destination page
// does not exist yet, opens the "Coming soon" modal (`comingSoon: true`).

export type NavItem = { label: string; href?: string; comingSoon?: boolean; children?: NavItem[] }
export type NavSection = { label: string; href: string; items: NavItem[] }

export const NAV_SECTIONS: NavSection[] = [
  {
    label: 'About ACT',
    href: '/#about',
    items: [
      { label: 'Mission & Strategy', comingSoon: true },
      {
        label: 'Origin Story',
        href: '/about',
        children: [{ label: 'COVID Response Legacy', comingSoon: true }],
      },
      { label: 'Leadership & Governance', comingSoon: true },
      { label: 'Our Collective', href: '/#about' },
      { label: 'Careers', comingSoon: true },
    ],
  },
  {
    label: 'How We Work',
    href: '/#how-it-works',
    items: [
      { label: 'Venture Philanthropy Model', href: '/#how-it-works' },
      { label: 'Capital, Connections, Collectives', href: '/#about' },
      { label: 'Grantmaking Approach', comingSoon: true },
      { label: 'Platform Building', comingSoon: true },
      { label: 'Support Beyond Funding', comingSoon: true },
      { label: 'Measuring Impact', href: '/#impact' },
    ],
  },
  {
    label: 'What We Fund',
    href: '/#focus-areas',
    items: [
      { label: 'Overview', href: '/#focus-areas' },
      { label: 'ACT for Education', href: '/#focus-areas' },
      { label: 'ACT for Environment', href: '/#focus-areas' },
      { label: 'ACT for Health', href: '/#focus-areas' },
      { label: 'ACT for Women', href: '/#focus-areas' },
      { label: 'Eligibility & FAQs', comingSoon: true },
    ],
  },
  {
    label: 'Portfolio',
    href: '/#portfolio',
    items: [
      { label: 'Portfolio Directory', href: '/#portfolio' },
      { label: 'Case Studies', comingSoon: true },
      { label: 'Founder Stories', href: '/#stories' },
      { label: 'Portfolio Updates', comingSoon: true },
    ],
  },
  {
    label: 'Impact',
    href: '/#impact',
    items: [
      { label: 'Impact Overview', href: '/#impact' },
      { label: 'Impact by Focus Area', href: '/#impact' },
      { label: 'Government & Ecosystem Partnerships', href: '/#impact' },
      { label: 'Reports', comingSoon: true },
      { label: 'Impact Methodology', comingSoon: true },
    ],
  },
  {
    label: 'Insights',
    href: '/blogs',
    items: [
      { label: 'Blog', href: '/blogs' },
      { label: 'Reports & Publications', href: '/#insights' },
      { label: 'Media', href: '/#insights' },
      { label: 'Podcast', href: '/#insights' },
      { label: 'Webinars', comingSoon: true },
      { label: 'Newsletter', comingSoon: true },
    ],
  },
  {
    label: 'Get Involved',
    href: '/#engagement-pathways',
    items: [
      { label: 'Apply for a Grant', comingSoon: true },
      { label: 'Partner With Us', href: '/#engagement-pathways' },
      { label: 'Support ACT', comingSoon: true },
      { label: 'Become an Advisor', href: '/#engagement-pathways' },
      { label: 'Refer a Founder', comingSoon: true },
      { label: 'Join the Fellowship', comingSoon: true },
      { label: 'Work With Us', href: '/#engagement-pathways' },
      { label: 'Contact Us', comingSoon: true },
    ],
  },
]

// Footer "Utility" group from the sitemap.
export const UTILITY_LINKS: NavItem[] = [
  { label: 'Privacy Policy', comingSoon: true },
  { label: 'Disclosures & CSR Policy', comingSoon: true },
  { label: 'Accessibility Statement', comingSoon: true },
  { label: 'Sitemap', comingSoon: true },
]
