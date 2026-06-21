'use client';

import React, { useState } from 'react';

type Story = {
  id: number;
  image: string;
  tag: string;
  quote: string;
};

const MOCK_STORIES: Story[] = [
  {
    id: 1,
    image: 'https://actgrants.in/wp-content/uploads/2023/09/Home.jpg',
    tag: 'FOUNDER\'S STORY',
    quote: 'ACT has been an instrumental partner in our journey. Beyond capital, their access to corporate advisors and policy mentorship accelerated our growth and helped us deploy learning tablets to over 100,000 students in remote rural schools.'
  },
  {
    id: 2,
    image: 'https://actgrants.in/wp-content/uploads/2023/09/Home.jpg',
    tag: 'IMPACT STORY',
    quote: 'We deploy strategic advisory and ecosystem networks to scale primary healthcare access, telemedicine, and rural health infrastructure to serve millions in remote districts.'
  },
  {
    id: 3,
    image: 'https://actgrants.in/wp-content/uploads/2023/06/collaboration.png',
    tag: 'PARTNER\'S STORY',
    quote: 'Building collaborative groups focused on solving systemic social problems in education, healthcare, environment, and women\'s empowerment for lasting social equity.'
  }
];

export const InteractiveStories: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextStory = () => {
    setActiveIndex((prev) => (prev + 1) % MOCK_STORIES.length);
  };

  const prevStory = () => {
    setActiveIndex((prev) => (prev - 1 + MOCK_STORIES.length) % MOCK_STORIES.length);
  };

  const current = MOCK_STORIES[activeIndex];

  return (
    <section id="stories" className="py-12 w-full">
      <div className="section-title-wrapper mb-10 text-center">
        <h2 className="font-title text-3xl font-extrabold text-gray-900 tracking-tight">
          <span className="bg-gradient-to-r from-[#B30B7E] to-[#5C1081] bg-clip-text text-transparent inline-block font-black">Stories</span> from the field
        </h2>
        <p className="text-gray-500 font-body mt-2 max-[640px]:text-sm">Hear directly from portfolio founders building solutions for population-scale impact.</p>
      </div>

      {/* Full-bleed Carousel Card */}
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

        {/* Next/Prev Navigation Arrows */}
        <button
          onClick={prevStory}
          className="absolute left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/20 hover:bg-white/90 border border-white/40 text-white hover:text-gray-900 flex items-center justify-center cursor-pointer transition-all duration-200 z-20 backdrop-blur-sm hover:scale-105 active:scale-95"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextStory}
          className="absolute right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/20 hover:bg-white/90 border border-white/40 text-white hover:text-gray-900 flex items-center justify-center cursor-pointer transition-all duration-200 z-20 backdrop-blur-sm hover:scale-105 active:scale-95"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Slide Text Content overlaid on top of image */}
        <div className="absolute bottom-0 inset-x-0 p-10 max-[640px]:p-6 z-20 flex flex-col items-start gap-4 text-left max-w-3xl">
          <span className="px-3 py-1 bg-white/15 border border-white/20 rounded-full text-[0.68rem] text-white font-bold tracking-widest uppercase backdrop-blur-sm">
            {current.tag}
          </span>
          <p className="font-body text-sm max-[640px]:text-xs font-medium text-white/95 leading-relaxed drop-shadow-sm select-none max-w-xl">
            &ldquo;{current.quote}&rdquo;
          </p>
          <button className="btn btn-primary" data-coming-soon>
            Explore
          </button>
        </div>

        {/* Carousel indicator dots */}
        <div className="absolute bottom-6 right-10 z-20 flex gap-2 max-[640px]:hidden">
          {MOCK_STORIES.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === idx ? 'w-6 bg-white' : 'w-1.5 bg-white/45'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
