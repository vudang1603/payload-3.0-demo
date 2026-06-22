'use client'

import React from 'react'

type PathwayItem = {
  key: string
  label: string
  tag: string
  avatar: string
  link: string
}

const pathwaysList: PathwayItem[] = [
  {
    key: 'founder',
    label: 'Founder',
    tag: "I'M A",
    avatar: '/images/report-cover-7.webp',
    link: '/admin',
  },
  {
    key: 'philanthropist',
    label: 'Philanthropist',
    tag: "I'M A",
    avatar: '/images/report-cover-4.webp',
    link: '/admin',
  },
  { 
    key: 'partner',
    label: 'Partner',
    tag: "I'M A",
    avatar: '/images/report-cover-8.webp',
    link: '#portfolio',
  },
  {
    key: 'expert',
    label: 'Expert',
    tag: "I'M AN",
    avatar: '/images/report-cover-6.webp',
    link: '#portfolio',
  },
  {
    key: 'career',
    label: 'Careers',
    tag: "I'M LOOKING FOR",
    avatar: '/images/report-cover-11.webp',
    link: '/blogs',
  },
  {
    key: 'volunteer',
    label: 'Volunteer',
    tag: "I'M A",
    avatar: '/images/report-cover-9.webp',
    link: '#',
  },
]

export const InteractivePathways: React.FC = () => {
  return (
    <section className="engagement-pathways-section relative z-0 -mt-8" id="engagement-pathways">
      <div className="section-title-wrapper">
        <h2>
          Join our
          {' '}
           <span className="bg-gradient-to-r from-[#1863DC] to-[#B30B7E] bg-clip-text text-transparent">
            ecosystem
          </span>{' '}
        </h2>
        {/* <p className="section-subtitle">
          Whether you build, fund, support, or advise, find your path to accelerate social change.
        </p> */}
      </div>

      <div className="pathways-grid-layout">
        {pathwaysList.map((item) => (
          <a
            key={item.key}
            href={item.link}
            className="pathway-grid-card"
            data-coming-soon
          >
            <div
              className="pathway-card-bg"
              style={{ backgroundImage: `url('${item.avatar}')` }}
            />
            <div className="pathway-card-overlay" />
            
            {/* Action arrow in the top right */}
            <div className="pathway-card-arrow">
              <span className="arrow-icon">↗</span>
            </div>

            {/* Label and tag in the bottom left */}
            <div className="pathway-card-content">
              <span className="pathway-card-tag">{item.tag}</span>
              <h3 className="pathway-card-title">{item.label}</h3>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
