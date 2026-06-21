import React from 'react'

export function LatestInsights() {
  const insightCards = [
    {
      title: 'Reports',
      active: false,
      icon: (
        <svg className="h-16 w-16" viewBox="0 0 80 80" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="reports-glass" x1="8" y1="8" x2="70" y2="74">
              <stop stopColor="#C9E0FF" />
              <stop offset="0.5" stopColor="#9CC4FF" />
              <stop offset="1" stopColor="#6A9FFF" />
            </linearGradient>
          </defs>
          <rect
            x="8"
            y="10"
            width="64"
            height="56"
            rx="16"
            fill="url(#reports-glass)"
            fillOpacity="0.6"
          />
          <rect x="8" y="10" width="64" height="56" rx="16" stroke="#FFFFFF" strokeOpacity="0.75" />
          <path
            d="M22 49L31 39L41 45L53 30L60 37"
            stroke="#0F3B91"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="22" cy="49" r="3" fill="#0F3B91" />
          <circle cx="31" cy="39" r="3" fill="#0F3B91" />
          <circle cx="41" cy="45" r="3" fill="#0F3B91" />
          <circle cx="53" cy="30" r="3" fill="#0F3B91" />
        </svg>
      ),
    },
    {
      title: 'Blog',
      active: true,
      icon: (
        <svg className="h-16 w-16" viewBox="0 0 80 80" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="blog-glass" x1="12" y1="10" x2="68" y2="72">
              <stop stopColor="#D0DBFF" />
              <stop offset="0.45" stopColor="#B4C5FF" />
              <stop offset="1" stopColor="#8DA6FF" />
            </linearGradient>
          </defs>
          <rect
            x="12"
            y="8"
            width="46"
            height="62"
            rx="14"
            fill="url(#blog-glass)"
            fillOpacity="0.58"
          />
          <rect x="12" y="8" width="46" height="62" rx="14" stroke="#FFFFFF" strokeOpacity="0.8" />
          <path d="M23 25H47" stroke="#143E96" strokeWidth="3" strokeLinecap="round" />
          <path
            d="M23 35H47"
            stroke="#143E96"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.8"
          />
          <path
            d="M23 45H40"
            stroke="#143E96"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.7"
          />
          <path
            d="M52 52L65 39C67 37 70 37 72 39C74 41 74 44 72 46L59 59L50 61L52 52Z"
            fill="#68A5FF"
            fillOpacity="0.8"
            stroke="#0E357F"
            strokeWidth="2"
          />
        </svg>
      ),
    },
    {
      title: 'Media',
      active: false,
      icon: (
        <svg className="h-16 w-16" viewBox="0 0 80 80" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="media-glass" x1="10" y1="12" x2="72" y2="70">
              <stop stopColor="#C4E6FF" />
              <stop offset="0.5" stopColor="#94D2FF" />
              <stop offset="1" stopColor="#6DB8FF" />
            </linearGradient>
          </defs>
          <rect
            x="10"
            y="14"
            width="60"
            height="50"
            rx="15"
            fill="url(#media-glass)"
            fillOpacity="0.58"
          />
          <rect
            x="10"
            y="14"
            width="60"
            height="50"
            rx="15"
            stroke="#FFFFFF"
            strokeOpacity="0.78"
          />
          <circle cx="40" cy="39" r="13" fill="#ECF5FF" fillOpacity="0.85" />
          <path d="M36 33L48 39L36 45V33Z" fill="#0F3B91" />
        </svg>
      ),
    },
    {
      title: 'Podcast',
      active: false,
      icon: (
        <svg className="h-16 w-16" viewBox="0 0 80 80" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="podcast-glass" x1="14" y1="10" x2="66" y2="70">
              <stop stopColor="#D4EAFF" />
              <stop offset="0.55" stopColor="#A1D3FF" />
              <stop offset="1" stopColor="#71B7FF" />
            </linearGradient>
          </defs>
          <rect
            x="23"
            y="12"
            width="34"
            height="42"
            rx="17"
            fill="url(#podcast-glass)"
            fillOpacity="0.6"
          />
          <rect x="23" y="12" width="34" height="42" rx="17" stroke="#FFFFFF" strokeOpacity="0.8" />
          <path d="M40 54V64" stroke="#0F3B91" strokeWidth="4" strokeLinecap="round" />
          <path d="M31 64H49" stroke="#0F3B91" strokeWidth="4" strokeLinecap="round" />
          <path
            d="M19 40C19 51.5 27.5 60 40 60C52.5 60 61 51.5 61 40"
            stroke="#0F3B91"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.65"
          />
        </svg>
      ),
    },
  ]

  return (
    <section className="relative mt-16 bg-white rounded-b-[32px] overflow-hidden px-6 py-16 sm:px-8 lg:px-12">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 left-[-8%] h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,_rgba(75,142,255,0.18)_0%,_rgba(75,142,255,0)_70%)]" />
        <div className="absolute top-1/3 right-[-10%] h-[340px] w-[340px] rounded-full bg-[radial-gradient(circle,_rgba(207,56,144,0.16)_0%,_rgba(207,56,144,0)_72%)]" />
        <div className="absolute -bottom-20 left-1/3 h-[260px] w-[260px] rounded-full bg-[radial-gradient(circle,_rgba(31,94,220,0.1)_0%,_rgba(31,94,220,0)_70%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-title text-4xl font-extrabold tracking-tight text-[#141B34] sm:text-5xl">
            Latest{' '}
            <span className="bg-gradient-to-r from-[#1863DC] to-[#B30B7E] bg-clip-text text-transparent">
              insights
            </span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#4D5874]/70 sm:text-lg">
            Explore fresh perspectives, data-led stories, and multimedia updates from our team and
            portfolio ecosystem.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
          {insightCards.map((card) => {
            return (
              <article
                key={card.title}
                className={`group relative overflow-hidden rounded-2xl border p-8 transition-all duration-300 ${
                  card.active
                    ? 'border-[#AFC4F6] bg-gradient-to-br from-[#EEF3FF] to-[#F5F8FF] shadow-[0_16px_45px_-26px_rgba(23,75,172,0.45)]'
                    : 'border-white/80 bg-[#F7F9FC] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_0_0_1px_rgba(35,67,124,0.05)] hover:border-[#D9E6FF] hover:shadow-[0_14px_40px_-28px_rgba(17,52,116,0.38)]'
                }`}
              >
                <button
                  type="button"
                  aria-label={`Open ${card.title}`}
                  className={`absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-lg transition-all duration-300 ${
                    card.active
                      ? 'bg-gradient-to-br from-[#1863DC] to-[#B30B7E] text-white shadow-lg shadow-[#4A6FD8]/35'
                      : 'border border-[#D6E1F5] bg-white text-[#38558E] group-hover:border-[#B5CBF7] group-hover:text-[#1D4A9D]'
                  }`}
                >
                  ↗
                </button>

                <div className="relative z-10 flex min-h-[168px] items-center justify-between gap-4">
                  <h3 className="font-title text-3xl font-bold tracking-tight text-[#1863DC]">
                    {card.title}
                  </h3>

                  <div className="relative">
                    <div className="absolute inset-1 rounded-full bg-white/35 blur-xl" />
                    <div className="relative rounded-3xl border border-white/70 bg-white/35 p-3 shadow-[0_14px_30px_-16px_rgba(42,91,185,0.6)] backdrop-blur-md">
                      {card.icon}
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
