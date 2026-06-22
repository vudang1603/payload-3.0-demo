import React from 'react'

export function LatestInsights() {
  const insightCards = [
    {
      title: 'Reports',
      active: false,
      image: '/images/icon-reports.webp',
    },
    {
      title: 'Blog',
      active: false,
      image: '/images/icon-blog.webp',
    },
    {
      title: 'Media',
      active: false,
      image: '/images/icon-media.webp',
    },
    {
      title: 'Podcast',
      active: false,
      image: '/images/icon-podcast.webp',
    },
  ]

  return (
    <section className="relative z-10 mt-16 bg-white rounded-b-[32px] overflow-hidden px-6 py-16 sm:px-8 lg:px-12">
      {/* Soft corner background gradients from design mockup */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,_rgba(207,56,144,0.06)_0%,_rgba(112,162,255,0.04)_50%,_transparent_70%)]" />
        <div className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,_rgba(207,56,144,0.06)_0%,_rgba(112,162,255,0.04)_50%,_transparent_70%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-title text-4xl font-extrabold tracking-tight text-[#141B34] sm:text-5xl">
            Latest{' '}
            <span className="bg-gradient-to-r from-[#1863DC] to-[#B30B7E] bg-clip-text text-transparent">
              insights
            </span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#4D5874]/70 sm:text-lg">
            Explore our insights library to discover ideas, stories, and conversations shaping social innovation across India.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
          {insightCards.map((card) => {
            return (
              <article
                key={card.title}
                className={`group relative overflow-hidden rounded-[24px] border p-7 transition-all duration-300 ${
                  card.active
                    ? 'border-[#AFC4F6] bg-gradient-to-br from-[#EEF3FF] to-[#F5F8FF] shadow-[0_16px_45px_-26px_rgba(23,75,172,0.45)]'
                    : 'border-[#E2E8F0] bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_0_0_1px_rgba(35,67,124,0.05)] hover:border-[#AFC4F6] hover:bg-gradient-to-br hover:from-[#EEF3FF] hover:to-[#F5F8FF] hover:shadow-[0_16px_45px_-26px_rgba(23,75,172,0.45)]'
                }`}
              >
                {/* Arrow button that gets active gradient background on hover */}
                <button
                  type="button"
                  aria-label={`Open ${card.title}`}
                  className={`absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-lg transition-all duration-300 ${
                    card.active
                      ? 'bg-gradient-to-br from-[#1863DC] to-[#B30B7E] text-white border-transparent shadow-lg shadow-[#4A6FD8]/35'
                      : 'border border-[#D6E1F5] bg-white text-[#38558E] group-hover:bg-gradient-to-br group-hover:from-[#1863DC] group-hover:to-[#B30B7E] group-hover:text-white group-hover:border-transparent group-hover:shadow-lg'
                  }`}
                >
                  ↗
                </button>

                <div className="relative z-10 flex min-h-[120px] items-center justify-between gap-4">
                  <h3 className="font-title text-3xl font-bold tracking-tight text-[#1863DC]">
                    {card.title}
                  </h3>

                  <div className="relative">
                    <img
                      src={card.image}
                      alt={card.title}
                      className={`h-64 w-64 object-contain transition-all duration-500 group-hover:opacity-100 group-hover:scale-105 ${
                        card.active ? 'opacity-100' : 'opacity-90'
                      }`}
                    />
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
