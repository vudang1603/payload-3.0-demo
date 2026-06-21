'use client'

import React, { useState } from 'react'

type TabType = 'fund' | 'platform'

type Principle = {
  id: string
  title: string
  desc: string
  iconType: 'founder' | 'catalytic' | 'impact'
  color: string
  borderStyle: string
}

const DATA: Record<
  TabType,
  {
    centerText: string
    principles: Principle[]
  }
> = {
  fund: {
    centerText: 'Our philanthropic grant-giving philosophy is rooted in three core principles',
    principles: [
      {
        id: 'founder',
        title: 'Founder First',
        desc: 'ACT backs individuals who are passionate about social change, outcome-oriented, and deeply committed to addressing the access and affordability gap for India’s vulnerable populations.',
        iconType: 'founder',
        color: 'text-[#B30B7E]',
        borderStyle: 'border-[#B30B7E] text-[#B30B7E]',
      },
      {
        id: 'catalytic',
        title: 'Catalytic',
        desc: 'Acting as early-stage funders, ACT provides seed capital to help grantees unlock the next phase of their product journey or business model, with the goal of enabling 10x growth.',
        iconType: 'catalytic',
        color: 'text-[#5C1081]',
        borderStyle: 'border-[#5C1081] text-[#5C1081]',
      },
      {
        id: 'impact',
        title: 'Impact First',
        desc: 'Our grants are mission-led and open to both for-profit and not-for-profit innovations, because we believe each has a role to play in the larger social change we seek to create.',
        iconType: 'impact',
        color: 'text-white',
        borderStyle: 'border-[#B30B7E] text-[#B30B7E]',
      },
    ],
  },
  platform: {
    centerText:
      'Fostering collaboration across the board to seed innovations for population-scale impact',
    principles: [
      {
        id: 'capacity',
        title: 'Enhancing Capacity',
        desc: 'The organization builds strong relationships with founders to provide strategic and operational guidance, facilitating 1:1 advisory relationships to strengthen organizational capacity.',
        iconType: 'founder',
        color: 'text-[#B30B7E]',
        borderStyle: 'border-[#B30B7E] text-[#B30B7E]',
      },
      {
        id: 'incubating',
        title: 'Incubating Entrepreneurs',
        desc: 'ACT designs challenge grants and pilot incubation/acceleration programs to draw attention to critical social issues and inspire entrepreneurs to develop scalable solutions.',
        iconType: 'catalytic',
        color: 'text-[#5C1081]',
        borderStyle: 'border-[#5C1081] text-[#5C1081]',
      },
      {
        id: 'knowledge',
        title: 'Generating Knowledge',
        desc: 'The platform leverages the collective expertise of its members—venture capitalists, tech entrepreneurs, and social impact leaders—to address complex social problems.',
        iconType: 'impact',
        color: 'text-white',
        borderStyle: 'border-[#B30B7E] text-[#B30B7E]',
      },
    ],
  },
}

const IconRenderer: React.FC<{ type: 'founder' | 'catalytic' | 'impact'; className?: string }> = ({
  type,
  className = 'w-6 h-6',
}) => {
  if (type === 'founder') {
    return (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="8.5" cy="7" r="4" />
        <line x1="18" y1="8" x2="22" y2="12" />
        <line x1="22" y1="8" x2="18" y2="12" />
      </svg>
    )
  }
  if (type === 'catalytic') {
    return (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="5" r="3" />
        <circle cx="5" cy="19" r="3" />
        <circle cx="19" cy="19" r="3" />
        <line x1="12" y1="8" x2="6.5" y2="16.5" />
        <line x1="12" y1="8" x2="17.5" y2="16.5" />
      </svg>
    )
  }
  // impact / target
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  )
}

export const InteractiveHowItWorks: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('fund')
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  const currentData = DATA[activeTab]

  // Helper to place popup relative to node
  const getPopupStyles = (id: string) => {
    // left-aligned nodes, popup goes left or right
    if (id === 'founder' || id === 'capacity') {
      return 'absolute right-[115%] top-1/2 -translate-y-1/2 w-[280px] bg-white border border-gray-100 p-4 rounded-xl shadow-lg z-50 text-left'
    }
    if (id === 'impact' || id === 'knowledge') {
      return 'absolute left-[115%] top-1/2 -translate-y-1/2 w-[280px] bg-white border border-gray-100 p-4 rounded-xl shadow-lg z-50 text-left'
    }
    // catalytic / bottom node — open upward so the section's overflow-hidden doesn't clip it
    return 'absolute left-1/2 bottom-[115%] -translate-x-1/2 w-[280px] bg-white border border-gray-100 p-4 rounded-xl shadow-lg z-50 text-center'
  }

  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto px-4">
      {/* Tabs */}
      <div className="flex justify-center gap-3 p-1.5 bg-gray-100/80 rounded-full border border-gray-200 mb-0 relative z-20 max-[640px]:flex-col max-[640px]:rounded-2xl max-[640px]:w-full">
        <button
          onClick={() => {
            setActiveTab('fund')
            setHoveredNode(null)
          }}
          className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${
            activeTab === 'fund'
              ? 'bg-[#7F93D6] text-white shadow-sm'
              : 'text-[#7F93D6] border border-[#7F93D6]/40'
          }`}
        >
          As a Venture Philanthropy Fund
        </button>
        <button
          onClick={() => {
            setActiveTab('platform')
            setHoveredNode(null)
          }}
          className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${
            activeTab === 'platform'
              ? 'bg-[#7F93D6] text-white shadow-sm'
              : 'text-[#7F93D6] border border-[#7F93D6]/40'
          }`}
        >
          As a Collective Action Platform
        </button>
      </div>

      {/* Desktop Concentric Circle Diagram */}
      <div className="relative w-[560px] h-[560px] items-center justify-center flex max-[860px]:hidden -mt-28 mb-4 overflow-visible">
        {/* Decorative rings — darker inside, fading outward */}
        <div className="absolute w-[1160px] h-[1160px] rounded-full border border-dashed border-gray-100 pointer-events-none" />
        <div className="absolute w-[900px] h-[900px] rounded-full border border-dashed border-gray-200 pointer-events-none" />
        <div className="absolute w-[640px] h-[640px] rounded-full border border-dashed border-gray-300 pointer-events-none" />

        {/* Node ring — the 3 principle icons sit on this (darkest) */}
        <div className="absolute w-[380px] h-[380px] rounded-full border border-dotted border-gray-400 pointer-events-none" />

        {/* Center Node */}
        <div className="absolute w-[190px] h-[190px] rounded-full bg-gradient-to-br from-[#1863DC] via-[#5C1081] to-[#B30B7E] p-4 text-white text-center flex flex-col justify-center items-center shadow-md z-10 select-none">
          <IconRenderer type="impact" className="w-6 h-6 mb-1 opacity-90" />
          <p className="text-[11.5px] font-medium leading-snug">{currentData.centerText}</p>
        </div>

        {/* Principle Nodes */}
        {currentData.principles.map((pr, index) => {
          // Positions:
          // 0: Left (Founder First)
          // 1: Bottom (Catalytic)
          // 2: Right (Impact First)
          // order: 0 founder (left), 1 catalytic (bottom), 2 impact (right) — icons centered on the node ring
          const nodePos = [
            'left-[90px] top-1/2 -translate-x-1/2 -translate-y-1/2',
            'left-1/2 top-[470px] -translate-x-1/2 -translate-y-1/2',
            'left-[470px] top-1/2 -translate-x-1/2 -translate-y-1/2',
          ][index]
          const labelPos = [
            'absolute right-full top-1/2 -translate-y-1/2 mr-4 whitespace-nowrap',
            'absolute top-full left-1/2 -translate-x-1/2 mt-3 whitespace-nowrap',
            'absolute left-full top-1/2 -translate-y-1/2 ml-4 whitespace-nowrap',
          ][index]
          const isHovered = hoveredNode === pr.id
          const labelColor = isHovered ? 'text-[#B30B7E]' : 'text-gray-900'

          return (
            <div
              key={pr.id}
              className={`absolute ${nodePos} z-20`}
              onMouseEnter={() => setHoveredNode(pr.id)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              {/* Circle Icon */}
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 shadow-md ${
                  isHovered
                    ? 'bg-gradient-to-br from-[#B30B7E] to-[#5C1081] text-white border-2 border-transparent scale-110 shadow-lg'
                    : 'bg-white border-2 ' + pr.borderStyle
                }`}
              >
                <IconRenderer type={pr.iconType} className="w-6 h-6" />
              </div>

              {/* Label (floats outward from the icon, so the icon stays centered on the ring) */}
              <span
                className={`${labelPos} font-title text-base font-bold ${labelColor} select-none`}
              >
                {pr.title}
              </span>

              {/* Hover Popup */}
              {isHovered && (
                <div className={getPopupStyles(pr.id)}>
                  <h5 className="font-title text-sm font-bold text-gray-900 mb-1.5">{pr.title}</h5>
                  <p className="text-xs text-gray-600 leading-relaxed font-body">{pr.desc}</p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Mobile / Responsive Fallback Layout */}
      <div className="w-full flex-col gap-6 hidden max-[860px]:flex">
        {currentData.principles.map((pr) => (
          <div
            key={pr.id}
            className="flex items-start gap-4 p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div
              className={`w-12 h-12 rounded-full border-2 bg-white flex items-center justify-center shrink-0 ${pr.borderStyle}`}
            >
              <IconRenderer type={pr.iconType} className="w-5 h-5" />
            </div>
            <div className="flex flex-col gap-1 text-left">
              <h4 className="font-title text-base font-bold text-gray-900">{pr.title}</h4>
              <p className="text-sm text-gray-600 leading-relaxed font-body">{pr.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
