'use client'

import React, { useState } from 'react'

type PathwayKey = 'founder' | 'philanthropist' | 'partner' | 'expert' | 'career' | 'volunteer'

const pathwaysData: Record<
  PathwayKey,
  {
    label: string
    avatar: string
    link: string
  }
> = {
  founder: {
    label: 'Founder',
    avatar: 'https://actgrants.in/wp-content/uploads/2023/06/Utsav-Kheria.png',
    link: '/admin',
  },
  philanthropist: {
    label: 'Philanthropist',
    avatar: 'https://actgrants.in/wp-content/uploads/2023/06/Utsav-Kheria.png',
    link: '/admin',
  },
  partner: {
    label: 'Partner',
    avatar:
      'https://actgrants.in/wp-content/themes/act/images/Industry%20experts/Ashish-Dhawan-(The-Convergence-Foundation).png',
    link: '#portfolio',
  },
  expert: {
    label: 'Expert',
    avatar:
      'https://actgrants.in/wp-content/themes/act/images/Industry%20experts/Ashish-Dhawan-(The-Convergence-Foundation).png',
    link: '#portfolio',
  },
  career: {
    label: 'A career',
    avatar: 'https://actgrants.in/wp-content/uploads/2023/06/Utsav-Kheria.png',
    link: '/blogs',
  },
  volunteer: {
    label: 'Volunteer',
    avatar: 'https://actgrants.in/wp-content/uploads/2023/06/Utsav-Kheria.png',
    link: '#',
  },
}

export const InteractivePathways: React.FC = () => {
  const [activePathway, setActivePathway] = useState<PathwayKey>('philanthropist')

  const items = [
    { key: 'founder' as PathwayKey },
    { key: 'philanthropist' as PathwayKey },
    { key: 'partner' as PathwayKey },
    { key: 'expert' as PathwayKey },
    { key: 'career' as PathwayKey },
    { key: 'volunteer' as PathwayKey },
  ]

  return (
    <section className="engagement-pathways-section" id="engagement-pathways">
      <div className="section-title-wrapper">
        <h2>
          <span className="bg-gradient-to-r from-[#1863DC] to-[#B30B7E] bg-clip-text text-transparent">
            Engagement
          </span>{' '}
          pathways
        </h2>
        <p className="section-subtitle">
          Whether you build, fund, support, or advise, find your path to accelerate social change.
        </p>
      </div>

      <div className="pathways-list-design">
        {/* "I'M A" micro-label */}
        <div className="im-a-label">I&#39;M A</div>

        {items.map(({ key }) => {
          const data = pathwaysData[key]
          const isActive = activePathway === key
          return (
            <div
              key={key}
              className={`pathway-row ${isActive ? 'active' : ''}`}
              onClick={() => setActivePathway(key)}
            >
              {/* Label */}
              <span className="pathway-row-label">{data.label}</span>

              {/* Active: show avatar + arrow */}
              {isActive && (
                <div className="pathway-row-actions">
                  <img src={data.avatar} alt={data.label} className="pathway-avatar" />
                  <a
                    href={data.link}
                    className="pathway-cta-arrow"
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`Go to ${data.label}`}
                    data-coming-soon
                  >
                    ↗
                  </a>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
