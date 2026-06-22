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
    image: '/images/founder-mahi.webp',
    tag: "FOUNDER'S STORY",
    quote:
      'ACT has been a true partner in every sense. From our very first interaction early on in our journey, their support has been consistent, thoughtful, and impactful.',
    author: 'Mahi Singh',
    role: 'Co-Founder - Cancrie',
  },
  {
    id: 2,
    image: '/images/founder-manu.webp',
    tag: "FOUNDER'S STORY",
    quote:
      'The ACT team has been among the most incredible supporters of Karya in our journey. From constantly connecting us to the most special mentors to giving us guidance on how we can do better, ACT has pushed to be a more impactful organisation.',
    author: 'Manu Chopra',
    role: 'Co-Founder - Karya',
  },
  {
    id: 3,
    image: '/images/founder-ruchit.webp',
    tag: "FOUNDER'S STORY",
    quote:
      'ACT For Health was one of our earliest champions from India. Their catalytic funding enabled us to rapidly scale our digital health platform to two additional states within a year.',
    author: 'Ruchit Nagar',
    role: 'Co-Founder - Khushi Baby',
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
      </div>

      {/* Main Carousel Wrapper centered and constrained */}
      <div className="mx-auto max-w-5xl px-6 relative">
        <div className="relative w-full h-[520px] max-[640px]:h-[440px] rounded-[28px] overflow-hidden shadow-md group">
          {/* Slide Image Background */}
          <div className="absolute inset-0 z-0">
            <img
              src={current.image}
              alt={current.tag}
              className="w-full h-full object-cover transition-all duration-700 ease-out"
              style={{ objectPosition: 'center 20%' }}
            />
            {/* Bottom vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10 z-10" />
          </div>

          {/* Left Navigation Arrow */}
          <button
            onClick={prevStory}
            type="button"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white text-[#5C1081] hover:text-[#B30B7E] flex items-center justify-center cursor-pointer transition-all duration-200 z-30 shadow-lg hover:scale-105 active:scale-95"
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
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white text-[#5C1081] hover:text-[#B30B7E] flex items-center justify-center cursor-pointer transition-all duration-200 z-30 shadow-lg hover:scale-105 active:scale-95"
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
          <div
            className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center gap-4 text-center px-16 sm:px-24 md:px-32"
            style={{ justifyContent: 'flex-end', paddingBottom: '3rem' }}
          >
            {current.author && (
              <div className="flex flex-col gap-1">
                <h3 className="font-title text-2xl md:text-4xl font-black text-white leading-tight drop-shadow-sm">
                  {current.author}
                </h3>
                {current.role && (
                  <p className="font-title text-base md:text-xl font-semibold text-white/90 drop-shadow-sm">
                    {current.role}
                  </p>
                )}
              </div>
            )}
            <p className="text-sm md:text-base font-medium text-white/85 leading-relaxed drop-shadow-sm select-none max-w-2xl font-body">
              &ldquo;{current.quote}&rdquo;
            </p>
            <button
              className="pointer-events-auto btn btn-primary bg-gradient-to-r from-[#1863DC] to-[#B30B7E] hover:opacity-90 border-none text-white font-bold px-6 py-2.5 rounded-full text-sm transition-all mt-1"
              data-coming-soon
            >
              Read more
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
