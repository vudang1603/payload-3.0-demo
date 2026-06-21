'use client'

import React, { useState } from 'react'

type Story = {
  id: number
  image: string
  tag: string
  quote: string
  author?: string
  role?: string
}

const MOCK_STORIES: Story[] = [
  {
    id: 1,
    image: '/images/report-cover-4.webp',
    tag: "FOUNDER'S STORY",
    quote: "ACT has been a true partner in every sense. From our very first interaction early on in our journey, their support has been consistent, thoughtful, and impactful. They've helped us across the board—from refining our pricing strategy and providing financial support, to opening doors through their network and simply being there whenever we faced a challenge.",
    author: "Mahi Singh",
    role: "Co-Founder - Cancrie (ACT For Environment)"
  },
  {
    id: 2,
    image: '/images/report-cover-4.webp',
    tag: 'IMPACT STORY',
    quote: 'We deploy strategic advisory and ecosystem networks to scale primary healthcare access, telemedicine, and rural health infrastructure to serve millions in remote districts.',
  },
  {
    id: 3,
    image: '/images/report-cover-4.webp',
    tag: "PARTNER'S STORY",
    quote: "Building collaborative groups focused on solving systemic social problems in education, healthcare, environment, and women's empowerment for lasting social equity.",
  },
]

export const InteractiveStories: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  const nextStory = () => {
    setActiveIndex((prev) => (prev + 1) % MOCK_STORIES.length)
  }

  const prevStory = () => {
    setActiveIndex((prev) => (prev - 1 + MOCK_STORIES.length) % MOCK_STORIES.length)
  }

  const current = MOCK_STORIES[activeIndex]

  return (
    <section id="stories" className="py-12 w-full">
      <div className="section-title-wrapper mb-10 text-center max-w-3xl mx-auto px-4">
        <h2 className="font-title text-3xl font-extrabold text-gray-900 tracking-tight">
          <span className="bg-gradient-to-r from-[#1863DC] to-[#B30B7E] bg-clip-text text-transparent inline-block font-black">
            Stories
          </span>{' '}
          from the field
        </h2>
        <p className="text-gray-500 font-body mt-2 max-[640px]:text-sm">
          Hear directly from portfolio founders building solutions for population-scale impact.
        </p>
      </div>

      {/* Main Carousel Wrapper centered and constrained */}
      <div className="mx-auto max-w-5xl px-6 relative">
        <div className="relative w-full h-[420px] max-[640px]:h-[340px] rounded-[28px] overflow-hidden shadow-md group">
          {/* Slide Image Background */}
          <div className="absolute inset-0 z-0">
            <img
              src={current.image}
              alt={current.tag}
              className="w-full h-full object-cover transition-all duration-700 ease-out"
            />
            {/* Bottom vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10 z-10" />
          </div>

          {/* Left Navigation Arrow */}
          <button
            onClick={prevStory}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white text-[#1863DC] hover:text-[#B30B7E] flex items-center justify-center cursor-pointer transition-all duration-200 z-20 shadow-lg hover:scale-105 active:scale-95"
            aria-label="Previous story"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Navigation Arrow */}
          <button
            onClick={nextStory}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white text-[#1863DC] hover:text-[#B30B7E] flex items-center justify-center cursor-pointer transition-all duration-200 z-20 shadow-lg hover:scale-105 active:scale-95"
            aria-label="Next story"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Slide Text Content overlaid on top of image with arrow clearance */}
          <div className="absolute bottom-0 inset-x-0 p-10 max-[640px]:p-6 z-20 flex flex-col items-start gap-3 text-left px-20 md:px-24 max-w-[90%]">
            <span className="px-3 py-1 bg-white/15 border border-white/20 rounded-full text-[0.68rem] text-white font-bold tracking-widest uppercase backdrop-blur-sm">
              {current.tag}
            </span>
            <p className="font-title text-lg md:text-xl font-semibold text-white leading-relaxed drop-shadow-sm select-none">
              &ldquo;{current.quote}&rdquo;
            </p>
            <button className="btn btn-primary bg-gradient-to-r from-[#1863DC] to-[#B30B7E] hover:opacity-90 border-none text-white font-bold px-6 py-2.5 rounded-full text-sm transition-all mt-1" data-coming-soon>
              Read More
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
