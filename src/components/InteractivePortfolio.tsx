'use client'

import React, { useState } from 'react'
import { getImageUrl } from '@/utils/imageUrl'

type PortfolioItem = {
  id: string
  name: string
  sectors: string
  fundingAmount?: number
  logo?: any
  website?: string
  description?: any
}

type InteractivePortfolioProps = {
  initialPortfolios: PortfolioItem[]
}

// Mock community data matching actgrants.in team/community grid
const communityData = {
  vcs: [
    {
      name: 'Anjali Bansal',
      role: 'Founder',
      company: 'Avaana Capital',
      photo: 'https://actgrants.in/wp-content/themes/act/images/Venture%20Capitalist/flip-1-1.jpg',
    },
    {
      name: 'Bejul Somaia',
      role: 'Partner',
      company: 'Lightspeed',
      photo: 'https://actgrants.in/wp-content/themes/act/images/Venture%20Capitalist/flip-1-2.jpg',
    },
    {
      name: 'GV Ravishankar',
      role: 'Managing Director',
      company: 'Peak XV',
      photo: 'https://actgrants.in/wp-content/themes/act/images/Venture%20Capitalist/flip-1-3.jpg',
    },
    {
      name: 'Shekhar Kirani',
      role: 'Partner',
      company: 'Accel',
      photo: 'https://actgrants.in/wp-content/themes/act/images/Venture%20Capitalist/flip-1-8.jpg',
    },
    {
      name: 'Vani Kola',
      role: 'Managing Director',
      company: 'Kalaari Capital',
      photo: 'https://actgrants.in/wp-content/themes/act/images/Venture%20Capitalist/flip-1-10.jpg',
    },
  ],
  strategy: [
    {
      name: 'Abhiraj Bhal',
      role: 'Co-founder & CEO',
      company: 'Urban Company',
      photo: 'https://actgrants.in/wp-content/themes/act/images/Startup/abhiraj-bhal.png',
    },
    {
      name: 'Deepinder Goyal',
      role: 'Founder & CEO',
      company: 'Zomato',
      photo: 'https://actgrants.in/wp-content/themes/act/images/Startup/deepinder-goyal.png',
    },
    {
      name: 'Divya Jain',
      role: 'Co-founder',
      company: 'Seekho',
      photo: 'https://actgrants.in/wp-content/themes/act/images/Startup/Divya-Jain.png',
    },
    {
      name: 'Girish Mathrubootham',
      role: 'Founder & CEO',
      company: 'Freshworks',
      photo: 'https://actgrants.in/wp-content/themes/act/images/Startup/girish-mathrubootham.png',
    },
    {
      name: 'Nithin Kamath',
      role: 'Founder & CEO',
      company: 'Zerodha',
      photo: 'https://actgrants.in/wp-content/themes/act/images/Startup/nithin-kamath.png',
    },
  ],
  ecosystem: [
    {
      name: 'Boston Consulting Group',
      role: 'Knowledge Partner',
      company: 'BCG',
      photo: 'https://actgrants.in/wp-content/themes/act/images/Impact%20Partners/BCG_MONOGRAM.png',
    },
    {
      name: 'Bill & Melinda Gates Foundation',
      role: 'Donor Partner',
      company: 'BMGF',
      photo:
        'https://actgrants.in/wp-content/themes/act/images/Impact%20Partners/Bill%20Melinda%20Gates.png',
    },
    {
      name: 'McKinsey & Company',
      role: 'Knowledge Partner',
      company: 'McKinsey',
      photo: 'https://actgrants.in/wp-content/themes/act/images/Impact%20Partners/McKinsey.png',
    },
    {
      name: 'Michael & Susan Dell Foundation',
      role: 'Philanthropic Partner',
      company: 'MSDF',
      photo:
        'https://actgrants.in/wp-content/themes/act/images/Impact%20Partners/Michael%20and%20susan.png',
    },
    {
      name: 'Sattva Consulting',
      role: 'Implementation Partner',
      company: 'Sattva',
      photo:
        'https://actgrants.in/wp-content/themes/act/images/Impact%20Partners/SattvaConsulting-Logo.png',
    },
  ],
  experts: [
    {
      name: 'Ashish Dhawan',
      role: 'Founder',
      company: 'The Convergence Foundation',
      photo:
        'https://actgrants.in/wp-content/themes/act/images/Industry%20experts/Ashish-Dhawan-(The-Convergence-Foundation).png',
    },
    {
      name: 'Dr. Nachiket Mor',
      role: 'Expert',
      company: 'The Banyan Academy',
      photo:
        'https://actgrants.in/wp-content/themes/act/images/Industry%20experts/Dr.-Nachiket-Mor-(The-Banyan-Academy).png',
    },
    {
      name: 'Mekin Maheshwari',
      role: 'Founder',
      company: 'Udhyam Learning Foundation',
      photo:
        'https://actgrants.in/wp-content/themes/act/images/Industry%20experts/Mekin-Maheshwari-(Udhyam-Learning-Foundation).png',
    },
    {
      name: 'Mridula Ramesh',
      role: 'Founder',
      company: 'Sundaram Climate Institute',
      photo:
        'https://actgrants.in/wp-content/themes/act/images/Industry%20experts/Mridula-Ramesh-(Sundaram-Climate-Institute).png',
    },
    {
      name: 'Vivek Adhia',
      role: 'Partner',
      company: 'BCG',
      photo:
        'https://actgrants.in/wp-content/themes/act/images/Industry%20experts/Vivek-Adhia-(BCG).png',
    },
  ],
}

// Mock portfolio data when CMS is empty
const mockPortfolios: PortfolioItem[] = [
  // Education Sector (as shown in design)
  {
    id: 'edu-1',
    name: 'Adalat AI',
    sectors: 'education',
    logo: '/images/company-logos/adalat-ai.svg',
    website: '#',
  },
  {
    id: 'edu-2',
    name: 'Barabari',
    sectors: 'education',
    logo: '/images/company-logos/barabari.png',
    website: '#',
  },
  {
    id: 'edu-3',
    name: 'ConveGenius',
    sectors: 'education',
    logo: '/images/company-logos/convegenius.png',
    website: '#',
  },
  {
    id: 'edu-4',
    name: 'Curious Jr',
    sectors: 'education',
    logo: '/images/company-logos/curious.png',
    website: '#',
  },
  {
    id: 'edu-5',
    name: 'Disha',
    sectors: 'education',
    logo: '/images/company-logos/disha.png',
    website: '#',
  },
  {
    id: 'edu-6',
    name: 'English Quest',
    sectors: 'education',
    logo: '/images/company-logos/english-quest.png',
    website: '#',
  },
  {
    id: 'edu-7',
    name: 'Frontier Markets',
    sectors: 'education',
    logo: '/images/company-logos/frontier-markets.jpg',
    website: '#',
  },
  {
    id: 'edu-8',
    name: 'Josh Skills',
    sectors: 'education',
    logo: '/images/company-logos/josh-skills.png',
    website: '#',
  },
  {
    id: 'edu-9',
    name: 'LearnTube',
    sectors: 'education',
    logo: '/images/company-logos/learn-tube.png',
    website: '#',
  },
  {
    id: 'edu-10',
    name: 'Karya',
    sectors: 'education',
    logo: '/images/company-logos/karya.png',
    website: '#',
  },
  {
    id: 'edu-11',
    name: 'Kutuki',
    sectors: 'education',
    logo: '/images/company-logos/kutuki.png',
    website: '#',
  },
  {
    id: 'edu-12',
    name: 'Rocket Learning',
    sectors: 'education',
    logo: '/images/company-logos/rocket-learning.png',
    website: '#',
  },
  {
    id: 'edu-13',
    name: 'Super Nan',
    sectors: 'education',
    logo: '/images/company-logos/super-nan.png',
    website: '#',
  },
  {
    id: 'edu-14',
    name: 'The Apprentice Project',
    sectors: 'education',
    logo: '/images/company-logos/the-apprentice-project.png',
    website: '#',
  },
  {
    id: 'edu-15',
    name: 'Top Parent',
    sectors: 'education',
    logo: '/images/company-logos/top-parent.png',
    website: '#',
  },
  {
    id: 'edu-16',
    name: 'V-All',
    sectors: 'education',
    logo: '/images/company-logos/v-all.png',
    website: '#',
  },
  {
    id: 'edu-17',
    name: 'Vidyakul',
    sectors: 'education',
    logo: '/images/company-logos/vidyakul.png',
    website: '#',
  },
  {
    id: 'edu-18',
    name: 'VOPA',
    sectors: 'education',
    logo: '/images/company-logos/vopa.png',
    website: '#',
  },
  {
    id: 'edu-19',
    name: 'YuWaah NXT',
    sectors: 'education',
    logo: '/images/company-logos/yuwaah-nxt.png',
    website: '#',
  },

  // Environment Sector
  {
    id: 'env-1',
    name: 'ConveGenius',
    sectors: 'environment',
    logo: '/images/company-logos/convegenius.png',
    website: '#',
  },
  {
    id: 'env-2',
    name: 'Disha',
    sectors: 'environment',
    logo: '/images/company-logos/disha.png',
    website: '#',
  },
  {
    id: 'env-3',
    name: 'Frontier Markets',
    sectors: 'environment',
    logo: '/images/company-logos/frontier-markets.jpg',
    website: '#',
  },
  {
    id: 'env-4',
    name: 'YuWaah NXT',
    sectors: 'environment',
    logo: '/images/company-logos/yuwaah-nxt.png',
    website: '#',
  },

  // Health Sector
  {
    id: 'hea-1',
    name: 'Adalat AI',
    sectors: 'health',
    logo: '/images/company-logos/adalat-ai.svg',
    website: '#',
  },
  {
    id: 'hea-2',
    name: 'Top Parent',
    sectors: 'health',
    logo: '/images/company-logos/top-parent.png',
    website: '#',
  },
  {
    id: 'hea-3',
    name: 'V-All',
    sectors: 'health',
    logo: '/images/company-logos/v-all.png',
    website: '#',
  },

  // Women Sector
  {
    id: 'wom-1',
    name: 'Karya',
    sectors: 'women',
    logo: '/images/company-logos/karya.png',
    website: '#',
  },
  {
    id: 'wom-2',
    name: 'Super Nan',
    sectors: 'women',
    logo: '/images/company-logos/super-nan.png',
    website: '#',
  },
  {
    id: 'wom-3',
    name: 'Rocket Learning',
    sectors: 'women',
    logo: '/images/company-logos/rocket-learning.png',
    website: '#',
  },
]

export const InteractivePortfolio: React.FC<InteractivePortfolioProps> = ({
  initialPortfolios,
}) => {
  const [selectedSector, setSelectedSector] = useState<string>('education')

  const sectorsList = [
    { id: 'education', label: 'Education' },
    { id: 'environment', label: 'Environment' },
    { id: 'health', label: 'Health' },
    { id: 'women', label: 'Women' },
  ]

  const portfolios = mockPortfolios
  const filteredPortfolios = portfolios.filter((p) => p.sectors === selectedSector)

  // LearnTube is a featured card with blue background
  const FEATURED_ID = 'edu-9'

  return (
    <div className="flex flex-col w-full">
      {/* Portfolio proof Section Wrapper */}
      <section
        className="bg-[#F8F4FF] border border-gray-100/50 px-8 pt-12 pb-16 max-[640px]:px-4 relative z-10 rounded-b-[32px]"
        id="portfolio"
      >
        <div className="section-title-wrapper mb-8">
          <h2 className="font-title text-3xl font-extrabold text-gray-900 text-center tracking-tight">
            Portfolio{' '}
            <span className="bg-gradient-to-r from-[#B30B7E] to-[#5C1081] bg-clip-text text-transparent inline-block font-black">
              proof
            </span>
          </h2>
        </div>

        {/* Sector filter tabs */}
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {sectorsList.map((sec) => (
            <button
              key={sec.id}
              className={`px-5 py-1.5 rounded-full text-sm font-semibold border transition-all duration-200 cursor-pointer ${
                selectedSector === sec.id
                  ? 'bg-[#1863DC] border-[#1863DC] text-white shadow-sm'
                  : 'bg-white border-gray-300 text-gray-500 hover:border-[#1863DC] hover:text-[#1863DC]'
              }`}
              onClick={() => setSelectedSector(sec.id)}
            >
              {sec.label}
            </button>
          ))}
        </div>

        {/* Portfolios Logo Grid */}
        {filteredPortfolios.length === 0 ? (
          <div className="bg-white/50 border border-dashed border-gray-200 rounded-2xl py-12 text-center text-gray-500 font-body">
            No portfolios found under this sector.
          </div>
        ) : (
          <div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
            style={{ gap: '8px' }}
          >
            {filteredPortfolios.map((item) => {
              const logoUrl =
                typeof item.logo === 'string'
                  ? item.logo
                  : item.logo
                    ? getImageUrl(item.logo)
                    : null

              return (
                <a
                  key={item.id}
                  href={item.website || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-center bg-white border border-gray-200 rounded-[16px] w-full p-3 transition-all duration-200 cursor-pointer overflow-hidden hover:border-[#1863DC]"
                  style={{ height: '80px' }}
                >
                  {/* Default: logo */}
                  <div className="flex items-center justify-center w-full h-full transition-opacity duration-200 group-hover:opacity-0">
                    {logoUrl ? (
                      <img
                        src={logoUrl}
                        alt={`${item.name} logo`}
                        className="max-h-full max-w-full object-contain opacity-85"
                      />
                    ) : (
                      <span className="font-title text-sm font-bold text-gray-700">
                        {item.name}
                      </span>
                    )}
                  </div>
                  {/* Hover: blue bg + name */}
                  <div className="absolute inset-0 flex items-center justify-center bg-[#1863DC] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="font-title text-sm font-extrabold text-white tracking-wide text-center px-2">
                      {item.name}
                    </span>
                  </div>
                </a>
              )
            })}
          </div>
        )}

        <div className="flex justify-center mt-10">
          <button
            className="rounded-full px-8 py-3 text-sm font-semibold text-white cursor-pointer transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg, #B30B7E, #5C1081)' }}
            data-coming-soon
          >
            Explore our portfolio
          </button>
        </div>
      </section>
    </div>
  )
}
