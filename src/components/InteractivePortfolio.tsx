'use client';

import React, { useState } from 'react';
import { getImageUrl } from '@/utils/imageUrl';

type PortfolioItem = {
  id: string;
  name: string;
  sectors: string;
  fundingAmount?: number;
  logo?: any;
  website?: string;
  description?: any;
};

type InteractivePortfolioProps = {
  initialPortfolios: PortfolioItem[];
};

// Mock community data matching actgrants.in team/community grid
const communityData = {
  vcs: [
    { name: 'Anjali Bansal', role: 'Founder', company: 'Avaana Capital', photo: 'https://actgrants.in/wp-content/themes/act/images/Venture%20Capitalist/flip-1-1.jpg' },
    { name: 'Bejul Somaia', role: 'Partner', company: 'Lightspeed', photo: 'https://actgrants.in/wp-content/themes/act/images/Venture%20Capitalist/flip-1-2.jpg' },
    { name: 'GV Ravishankar', role: 'Managing Director', company: 'Peak XV', photo: 'https://actgrants.in/wp-content/themes/act/images/Venture%20Capitalist/flip-1-3.jpg' },
    { name: 'Shekhar Kirani', role: 'Partner', company: 'Accel', photo: 'https://actgrants.in/wp-content/themes/act/images/Venture%20Capitalist/flip-1-8.jpg' },
    { name: 'Vani Kola', role: 'Managing Director', company: 'Kalaari Capital', photo: 'https://actgrants.in/wp-content/themes/act/images/Venture%20Capitalist/flip-1-10.jpg' },
  ],
  strategy: [
    { name: 'Abhiraj Bhal', role: 'Co-founder & CEO', company: 'Urban Company', photo: 'https://actgrants.in/wp-content/themes/act/images/Startup/abhiraj-bhal.png' },
    { name: 'Deepinder Goyal', role: 'Founder & CEO', company: 'Zomato', photo: 'https://actgrants.in/wp-content/themes/act/images/Startup/deepinder-goyal.png' },
    { name: 'Divya Jain', role: 'Co-founder', company: 'Seekho', photo: 'https://actgrants.in/wp-content/themes/act/images/Startup/Divya-Jain.png' },
    { name: 'Girish Mathrubootham', role: 'Founder & CEO', company: 'Freshworks', photo: 'https://actgrants.in/wp-content/themes/act/images/Startup/girish-mathrubootham.png' },
    { name: 'Nithin Kamath', role: 'Founder & CEO', company: 'Zerodha', photo: 'https://actgrants.in/wp-content/themes/act/images/Startup/nithin-kamath.png' },
  ],
  ecosystem: [
    { name: 'Boston Consulting Group', role: 'Knowledge Partner', company: 'BCG', photo: 'https://actgrants.in/wp-content/themes/act/images/Impact%20Partners/BCG_MONOGRAM.png' },
    { name: 'Bill & Melinda Gates Foundation', role: 'Donor Partner', company: 'BMGF', photo: 'https://actgrants.in/wp-content/themes/act/images/Impact%20Partners/Bill%20Melinda%20Gates.png' },
    { name: 'McKinsey & Company', role: 'Knowledge Partner', company: 'McKinsey', photo: 'https://actgrants.in/wp-content/themes/act/images/Impact%20Partners/McKinsey.png' },
    { name: 'Michael & Susan Dell Foundation', role: 'Philanthropic Partner', company: 'MSDF', photo: 'https://actgrants.in/wp-content/themes/act/images/Impact%20Partners/Michael%20and%20susan.png' },
    { name: 'Sattva Consulting', role: 'Implementation Partner', company: 'Sattva', photo: 'https://actgrants.in/wp-content/themes/act/images/Impact%20Partners/SattvaConsulting-Logo.png' },
  ],
  experts: [
    { name: 'Ashish Dhawan', role: 'Founder', company: 'The Convergence Foundation', photo: 'https://actgrants.in/wp-content/themes/act/images/Industry%20experts/Ashish-Dhawan-(The-Convergence-Foundation).png' },
    { name: 'Dr. Nachiket Mor', role: 'Expert', company: 'The Banyan Academy', photo: 'https://actgrants.in/wp-content/themes/act/images/Industry%20experts/Dr.-Nachiket-Mor-(The-Banyan-Academy).png' },
    { name: 'Mekin Maheshwari', role: 'Founder', company: 'Udhyam Learning Foundation', photo: 'https://actgrants.in/wp-content/themes/act/images/Industry%20experts/Mekin-Maheshwari-(Udhyam-Learning-Foundation).png' },
    { name: 'Mridula Ramesh', role: 'Founder', company: 'Sundaram Climate Institute', photo: 'https://actgrants.in/wp-content/themes/act/images/Industry%20experts/Mridula-Ramesh-(Sundaram-Climate-Institute).png' },
    { name: 'Vivek Adhia', role: 'Partner', company: 'BCG', photo: 'https://actgrants.in/wp-content/themes/act/images/Industry%20experts/Vivek-Adhia-(BCG).png' },
  ]
};

// Mock portfolio data when CMS is empty
const mockPortfolios: PortfolioItem[] = [
  { id: 'mock-1', name: 'LearnTube', sectors: 'education', website: '#' },
  { id: 'mock-2', name: 'Vidyatech', sectors: 'education', website: '#' },
  { id: 'mock-3', name: 'EduBridge', sectors: 'education', website: '#' },
  { id: 'mock-4', name: 'GreenGrid', sectors: 'environment', website: '#' },
  { id: 'mock-5', name: 'EcoSense', sectors: 'environment', website: '#' },
  { id: 'mock-6', name: 'CleanAir Labs', sectors: 'environment', website: '#' },
  { id: 'mock-7', name: 'HealthNow', sectors: 'health', website: '#' },
  { id: 'mock-8', name: 'MediConnect', sectors: 'health', website: '#' },
  { id: 'mock-9', name: 'PrimaryRx', sectors: 'health', website: '#' },
  { id: 'mock-10', name: 'SheBuilds', sectors: 'women', website: '#' },
  { id: 'mock-11', name: 'WomenRise', sectors: 'women', website: '#' },
  { id: 'mock-12', name: 'SkillHer', sectors: 'women', website: '#' },
  { id: 'mock-13', name: 'LearnWorld', sectors: 'education', website: '#' },
  { id: 'mock-14', name: 'EduSpark', sectors: 'education', website: '#' },
  { id: 'mock-15', name: 'SolarBridge', sectors: 'environment', website: '#' },
];

export const InteractivePortfolio: React.FC<InteractivePortfolioProps> = ({ initialPortfolios }) => {
  const [selectedSector, setSelectedSector] = useState<string>('education');

  const sectorsList = [
    { id: 'education', label: 'Education' },
    { id: 'environment', label: 'Environment' },
    { id: 'health', label: 'Health' },
    { id: 'women', label: 'Women' }
  ];

  const portfolios = initialPortfolios.length > 0 ? initialPortfolios : mockPortfolios;
  const filteredPortfolios = portfolios.filter(p => p.sectors === selectedSector);

  return (
    <div className="flex flex-col w-full">
      {/* Portfolio proof Section Wrapper */}
      <section className="bg-white rounded-[32px] border border-gray-100/60 px-8 py-16 max-[640px]:px-4" id="portfolio">
        <div className="section-title-wrapper mb-8">
          <h2 className="font-title text-3xl font-extrabold text-gray-900 text-center tracking-tight">
            Portfolio <span className="bg-gradient-to-r from-[#B30B7E] to-[#5C1081] bg-clip-text text-transparent inline-block font-black">proof</span>
          </h2>
        </div>

        {/* Sector filter tabs */}
        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {sectorsList.map((sec) => (
            <button
              key={sec.id}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${
                selectedSector === sec.id
                  ? 'bg-[#1863DC] text-white shadow-sm'
                  : 'border border-gray-200 text-gray-500 bg-white hover:border-gray-300 hover:text-gray-700'
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
          <div className="grid grid-cols-5 gap-4 max-[1024px]:grid-cols-3 max-[640px]:grid-cols-2">
            {filteredPortfolios.map((item) => {
              const logoUrl = item.logo ? getImageUrl(item.logo) : null;

              return (
                <a
                  key={item.id}
                  href={item.website || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-center bg-white border border-gray-200/60 rounded-2xl h-[110px] p-6 transition-all duration-300 hover:bg-[#1863DC] hover:border-transparent shadow-sm hover:shadow-md cursor-pointer overflow-hidden"
                >
                  {/* Default Logo */}
                  <div className="flex items-center justify-center w-full h-full transition-all duration-300 group-hover:opacity-0 group-hover:scale-95">
                    {logoUrl ? (
                      <img
                        src={logoUrl}
                        alt={`${item.name} logo`}
                        className="max-h-full max-w-full object-contain filter opacity-90 transition-all duration-300 group-hover:brightness-200"
                      />
                    ) : (
                      <span className="font-title text-base font-bold text-gray-700">{item.name}</span>
                    )}
                  </div>
                  {/* Hover State: Blue background and white text */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#1863DC] p-3 text-center">
                    <span className="font-title text-sm font-extrabold text-white tracking-wide">
                      {item.name}
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        )}

        <div className="flex justify-center mt-12">
          <button className="btn btn-primary" data-coming-soon>
            Explore Portfolio
          </button>
        </div>
      </section>
    </div>
  );
};
