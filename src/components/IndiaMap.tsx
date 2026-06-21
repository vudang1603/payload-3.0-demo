'use client'

import React, { useEffect, useRef, useState } from 'react'
import { INDIA_STATES, INDIA_VIEWBOX } from './indiaStates'

// State highlighted by default (Rajasthan)
const DEFAULT_ID = 'rj'

type LabelInfo = { x: number; y: number; name: string }

export const IndiaMap: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null)
  const [active, setActive] = useState<string>(DEFAULT_ID)
  const [label, setLabel] = useState<LabelInfo | null>(null)

  const placeLabel = (id: string, el: SVGGraphicsElement | null) => {
    if (!el) return
    const b = el.getBBox()
    const st = INDIA_STATES.find((s) => s.id === id)
    setLabel({ x: b.x + b.width / 2, y: b.y, name: st?.name || '' })
  }

  // Position the default (Rajasthan) label once the map has rendered
  useEffect(() => {
    const el = svgRef.current?.querySelector<SVGGraphicsElement>(`[data-id="${DEFAULT_ID}"]`)
    placeLabel(DEFAULT_ID, el ?? null)
  }, [])

  const resetToDefault = () => {
    setActive(DEFAULT_ID)
    placeLabel(DEFAULT_ID, svgRef.current?.querySelector<SVGGraphicsElement>(`[data-id="${DEFAULT_ID}"]`) ?? null)
  }

  return (
    <svg
      ref={svgRef}
      viewBox={INDIA_VIEWBOX}
      className="w-full h-auto drop-shadow-[0_8px_24px_rgba(0,0,0,0.3)]"
      role="img"
      aria-label="Map of India — hover a state to highlight it"
    >
      {INDIA_STATES.map((st) => {
        const isActive = active === st.id
        const fill = isActive ? '#C2188F' : '#D9D0F2'
        return (
          <path
            key={st.id}
            data-id={st.id}
            d={st.path}
            fill={fill}
            stroke="#ffffff"
            strokeWidth={0.8}
            strokeOpacity={0.6}
            className="cursor-pointer transition-colors duration-200 hover:brightness-105"
            onMouseEnter={(e) => {
              setActive(st.id)
              placeLabel(st.id, e.currentTarget)
            }}
            onMouseLeave={resetToDefault}
            onFocus={(e) => {
              setActive(st.id)
              placeLabel(st.id, e.currentTarget)
            }}
            onBlur={resetToDefault}
            tabIndex={0}
          />
        )
      })}

      {label && (
        <g pointerEvents="none">
          <rect
            x={label.x - (label.name.length * 3.3 + 9)}
            y={label.y - 25}
            width={label.name.length * 6.6 + 18}
            height={19}
            rx={9.5}
            fill="#ffffff"
          />
          <text
            x={label.x}
            y={label.y - 11.5}
            textAnchor="middle"
            fontSize={10}
            fontWeight={700}
            fill="#B30B7E"
            fontFamily="Inter, sans-serif"
          >
            {label.name}
          </text>
        </g>
      )}
    </svg>
  )
}
