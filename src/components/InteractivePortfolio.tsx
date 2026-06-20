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

export const InteractivePortfolio: React.FC<InteractivePortfolioProps> = ({ initialPortfolios }) => {
  const [activeTab, setActiveTab] = useState<'vcs' | 'strategy' | 'ecosystem' | 'experts'>('vcs');
  const [selectedSector, setSelectedSector] = useState<string>('all');

  const tabs = [
    { id: 'vcs', label: 'Venture Capitalists' },
    { id: 'strategy', label: 'Startups & Strategy' },
    { id: 'ecosystem', label: 'Ecosystem Supporters' },
    { id: 'experts', label: 'Industry Experts' }
  ] as const;

  const sectorsList = [
    { id: 'all', label: 'All Sectors' },
    { id: 'health', label: 'Health' },
    { id: 'education', label: 'Education' },
    { id: 'environment', label: 'Environment' }
  ];

  const filteredPortfolios = selectedSector === 'all'
    ? initialPortfolios
    : initialPortfolios.filter(p => p.sectors === selectedSector);

  const activePeople = communityData[activeTab];

  return (
    <section className="portfolio-proof-section" id="portfolio">
      <div className="section-title-wrapper">
        <h2>Portfolio <span style={{ color: 'var(--primary)' }}>proof</span></h2>
        <p className="section-subtitle">
          Backed by India's leading venture capitalists, startup founders, ecosystem leaders, and domain experts.
        </p>
      </div>

      {/* Tabs for People Grid */}
      <div className="tabs-container">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

            {/* People Grid */}
      <div className="people-grid">
        {activePeople.map((person, idx) => (
          <div key={idx} className="people-card">
            <div className="people-img-wrapper">
              <img src={person.photo} alt={person.name} loading="lazy" />
            </div>
            <div className="people-info">
              <h4>{person.name}</h4>
              <span className="people-role">{person.role}</span>
              <p className="people-company">{person.company}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Explore Portfolio CTA */}
      <div className="explore-portfolio-wrapper">
        <a href="#portfolio-grid" className="btn btn-primary">Explore Portfolio</a>
      </div>

      {/* Dynamic Portfolios Section */}
      <div className="section-title-wrapper" style={{ marginTop: '5rem', marginBottom: '2rem' }}>
        <h3>Funded Grants & Projects ({filteredPortfolios.length})</h3>
        <p className="section-subtitle">Browse through our dynamically managed portfolios in real-time.</p>
      </div>

      {/* Sector filter */}
      <div className="portfolio-filters">
        {sectorsList.map((sec) => (
          <button
            key={sec.id}
            className={`tab-btn ${selectedSector === sec.id ? 'active' : ''}`}
            onClick={() => setSelectedSector(sec.id)}
          >
            {sec.label}
          </button>
        ))}
      </div>

      {/* Portfolios Grid */}
      {filteredPortfolios.length === 0 ? (
        <div className="empty-state">
          <p>No portfolios found under this sector.</p>
        </div>
      ) : (
        <div className="grid">
          {filteredPortfolios.map((item) => {
            const sectorLabel = {
              health: 'Health',
              education: 'Education',
              environment: 'Environment',
            }[item.sectors] || item.sectors;

            const formattedFunding = item.fundingAmount
              ? new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  maximumFractionDigits: 0,
                }).format(item.fundingAmount)
              : null;

            const defaultImage = {
              health: 'healthcare.png',
              education: 'education.png',
              environment: 'environment.png',
            }[item.sectors] || 'logo.png';

            const logoUrl = getImageUrl(item.logo, defaultImage);

            // Simple preview text resolver
            let descText = 'View details in CMS';
            if (item.description) {
              if (typeof item.description === 'string') {
                descText = item.description;
              } else if (item.description.root && item.description.root.children) {
                descText = item.description.root.children
                  .map((child: any) => {
                    if (child.children) {
                      return child.children.map((c: any) => c.text || '').join('');
                    }
                    return '';
                  })
                  .join(' ');
              }
            }

            return (
              <div key={item.id} className="card">
                {logoUrl && (
                  <div className="card-image-wrapper">
                    <img src={logoUrl} alt={`${item.name} logo`} />
                  </div>
                )}
                <div className="card-header">
                  <span className={`tag tag-${item.sectors}`}>{sectorLabel}</span>
                </div>
                <div className="card-body">
                  <h3>{item.name}</h3>
                  {formattedFunding && (
                    <div className="funding">
                      Funding: {formattedFunding}
                    </div>
                  )}
                  <div className="description">
                    {descText}
                  </div>
                </div>
                {item.website && (
                  <div className="card-footer">
                    <a href={item.website} target="_blank" rel="noopener noreferrer">
                      Visit Website →
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
