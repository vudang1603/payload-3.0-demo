import { getPayload } from 'payload'
import React, { Suspense } from 'react'
import Link from 'next/link'
import { getImageUrl } from '@/utils/imageUrl'

import config from '@/payload.config'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { InteractivePortfolio } from '@/components/InteractivePortfolio'
import { InteractivePathways } from '@/components/InteractivePathways'
import { InteractiveHowItWorks } from '@/components/InteractiveHowItWorks'
import { InteractiveStories } from '@/components/InteractiveStories'
import { IndiaMap } from '@/components/IndiaMap'
import { LatestInsights } from '@/components/LatestInsights'

interface LexicalTextNode {
  text?: string
  [key: string]: unknown
}

interface LexicalChildNode {
  children?: LexicalTextNode[]
  [key: string]: unknown
}

interface LexicalRichText {
  root?: {
    children?: LexicalChildNode[]
  }
}

interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt?: string
  content?: unknown
  featuredImage?: unknown
}

// Helper to extract plain text preview from Lexical Editor JSON state
const getPreviewText = (richText: unknown): string => {
  if (!richText) return ''
  try {
    if (typeof richText === 'string') return richText

    const lexicalJson = richText as LexicalRichText
    const root = lexicalJson.root
    if (root && root.children) {
      return root.children
        .map((child) => {
          if (child.children) {
            return child.children.map((c) => c.text || '').join('')
          }
          return ''
        })
        .join(' ')
    }
  } catch (e) {
    // Ignore error
  }
  return 'View details in CMS'
}

// Component to dynamically load and render Portfolios
async function DynamicPortfolios() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const portfolioData = await payload.find({
    collection: 'portfolios',
    depth: 1,
    limit: 100,
    sort: '-createdAt',
  })
  const portfolios = portfolioData.docs

  return <InteractivePortfolio initialPortfolios={portfolios as any} />
}

// Component to dynamically load and render Blogs
async function DynamicBlogs() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const blogData = await payload.find({
    collection: 'blogs',
    depth: 1,
    limit: 100,
    sort: '-createdAt',
  })
  const blogs = blogData.docs as unknown as BlogPost[]

  return (
    <div className="w-full">
      {blogs.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-2xl py-12 text-center text-gray-500 font-body">
          <p>No blog posts found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-6 max-[1024px]:grid-cols-2 max-[640px]:grid-cols-1">
          {blogs.map((post) => {
            const excerpt = post.excerpt || getPreviewText(post.content)
            const imageUrl = getImageUrl(post.featuredImage, 'collaboration.png')
            return (
              <Link
                key={post.id}
                href={`/blogs/${post.slug}`}
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col group no-underline text-gray-900"
              >
                {imageUrl && (
                  <div className="h-[200px] w-full overflow-hidden bg-gray-50 border-b border-gray-100">
                    <img
                      src={imageUrl}
                      alt={`${post.title} image`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                    />
                  </div>
                )}
                <div className="p-5 flex-grow flex flex-col justify-between gap-4">
                  <div>
                    <h3 className="font-title text-base font-bold text-gray-900 group-hover:text-[var(--primary)] transition-colors duration-200">
                      {post.title}
                    </h3>
                    {excerpt && (
                      <div className="text-xs text-gray-500 line-clamp-3 leading-relaxed mt-2 font-body">
                        {excerpt}
                      </div>
                    )}
                  </div>
                  <div className="font-title text-xs font-bold text-[var(--primary)] uppercase tracking-wider flex items-center gap-1 group-hover:text-[var(--primary-hover)] transition-colors duration-200">
                    Read Article →
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default async function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white w-full">
      <Header />

      <main
        className="main flex-grow container mx-auto px-6 pt-0 pb-0 flex flex-col w-full"
        style={{ paddingTop: '0' }}
      >
        {/* Redesigned Hero Section */}
        <section
          className="hero-block hero-home relative px-8 text-center flex justify-center overflow-hidden shadow-sm !rounded-none"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.18), rgba(0, 0, 0, 0.50)), url('/images/hero-girls.webp')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            // borderRadius: '24px',
            minHeight: '520px',
          }}
        >
          <div className="max-w-3xl z-10 text-white flex flex-col items-center gap-6 w-full">
            <h1 className="font-title text-3xl max-[640px]:text-2xl font-black leading-tight tracking-tight drop-shadow-sm select-none">
              Backing breakthrough innovations for population-scale impact in India
            </h1>
            <div className="flex gap-3 mt-2 max-[640px]:flex-col max-[640px]:w-full">
              <button className="btn btn-primary max-[640px]:w-full" data-coming-soon>
                Apply for a Grant
              </button>
              <a href="#portfolio" className="btn btn-outline-white max-[640px]:w-full">
                Explore our Work
              </a>
            </div>
          </div>
        </section>

        {/* Section: What ACT does */}
        <section
          className="py-12 relative overflow-hidden rounded-t-[32px] bg-white z-10 -mt-8"
          id="about"
        >
          <div className="relative z-10 w-full">
            <div className="section-title-wrapper mb-12 text-center max-w-3xl mx-auto">
              <h2 className="font-title text-3xl font-extrabold text-gray-900 tracking-tight">
                What we{' '}
                <span className="bg-gradient-to-r from-[#1863DC] to-[#B30B7E] bg-clip-text text-transparent inline-block font-black">
                  do
                </span>
              </h2>
              <p className="text-gray-500 font-body mt-2 max-[640px]:text-sm">
                As a non-profit tech-led venture philanthropy platform, ACT is built upon the
                premise that an entrepreneurial mindset, technology &amp; innovation and collective
                action have the power to create meaningful social impact at scale.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 px-8 py-4 max-[1024px]:hidden">
              {/* Card 1: Capital */}
              <div className="act-card group relative rounded-2xl overflow-hidden shadow-sm h-[340px] bg-white border border-gray-100 cursor-pointer transition-all duration-500 hover:bg-[linear-gradient(140deg,#3F1E8C_0%,#7A1C9E_45%,#B30B7E_100%)] hover:border-transparent hover:shadow-lg">
                {/* Default State: Centered circle image and title */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center transition-all duration-300 group-hover:opacity-0 group-hover:scale-95">
                  <img
                    src="/images/icon-capital.webp"
                    alt="Capital"
                    className="w-64 h-64 object-contain"
                  />
                  <h3 className="font-title text-3xl font-black text-[#4F7CC9]">Capital</h3>
                </div>

                {/* Hover State: Curved top-left image and white description text below */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-7 text-center">
                  <div
                    className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
                    style={{
                      backgroundImage: `url('/images/wmremove-transformed.webp')`,
                      clipPath: 'ellipse(80% 70% at 0% 0%)',
                    }}
                  />
                  <p className="text-white/95 text-xs sm:text-sm leading-relaxed font-body z-10">
                    Providing hard-to-find, early-stage risk capital to take long-term bets and
                    additionally supporting portfolio founders in mobilising follow-on capital.
                  </p>
                </div>
              </div>

              {/* Card 2: Connections */}
              <div className="act-card group relative rounded-2xl overflow-hidden shadow-sm h-[340px] bg-white border border-gray-100 cursor-pointer transition-all duration-500 hover:bg-[linear-gradient(140deg,#3F1E8C_0%,#7A1C9E_45%,#B30B7E_100%)] hover:border-transparent hover:shadow-lg">
                {/* Default State: Centered circle image and title */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center transition-all duration-300 group-hover:opacity-0 group-hover:scale-95">
                  <img
                    src="/images/icon-connections.webp"
                    alt="Connections"
                    className="w-64 h-64 object-contain"
                  />
                  <h3 className="font-title text-3xl font-black text-[#4F7CC9]">Connections</h3>
                </div>

                {/* Hover State: Curved top-left image and white description text below */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-center">
                  <div
                    className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
                    style={{
                      backgroundImage: `url('/images/connection-transformed.webp')`,
                      clipPath: 'ellipse(80% 70% at 0% 0%)',
                    }}
                  />
                  <p className="text-white/95 text-xs sm:text-sm leading-relaxed font-body z-10">
                    Facilitating connections and partnerships across the ecosystem between
                    start-ups, corporate partners, non-profits, domain experts, and government.
                  </p>
                </div>
              </div>

              {/* Card 3: Collectives */}
              <div className="act-card group relative rounded-2xl overflow-hidden shadow-sm h-[340px] bg-white border border-gray-100 cursor-pointer transition-all duration-500 hover:bg-[linear-gradient(140deg,#3F1E8C_0%,#7A1C9E_45%,#B30B7E_100%)] hover:border-transparent hover:shadow-lg">
                {/* Default State: Centered circle image and title */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center transition-all duration-300 group-hover:opacity-0 group-hover:scale-95">
                  <img
                    src="/images/icon-collectives.webp"
                    alt="Collectives"
                    className="w-64 h-64 object-contain"
                  />
                  <h3 className="font-title text-3xl font-black text-[#4F7CC9]">Collectives</h3>
                </div>

                {/* Hover State: Curved top-left image and white description text below */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-center">
                  <div
                    className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
                    style={{
                      backgroundImage: `url('/images/collective-transformed.webp')`,
                      clipPath: 'ellipse(80% 70% at 0% 0%)',
                    }}
                  />
                  <p className="text-white/95 text-xs sm:text-sm leading-relaxed font-body z-10">
                    Building collaborative groups focused on solving systemic social problems in
                    education, healthcare, environment, and women&apos;s empowerment.
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile/tablet: always-visible stacked cards (no hover dependency) */}
            <div className="hidden max-[1024px]:grid grid-cols-1 gap-4 px-6 py-4">
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm flex flex-col gap-2.5">
                <h3 className="font-title text-2xl font-black text-[#4F7CC9]">Capital</h3>
                <p className="text-sm text-gray-600 leading-relaxed font-body">
                  Providing hard-to-find, early-stage risk capital to take long-term bets and
                  additionally supporting portfolio founders in mobilising follow-on capital.
                </p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm flex flex-col gap-2.5">
                <h3 className="font-title text-2xl font-black text-[#4F7CC9]">Connections</h3>
                <p className="text-sm text-gray-600 leading-relaxed font-body">
                  Facilitating connections and partnerships across the ecosystem between start-ups,
                  corporate partners, non-profits, domain experts, and government.
                </p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm flex flex-col gap-2.5">
                <h3 className="font-title text-2xl font-black text-[#4F7CC9]">Collectives</h3>
                <p className="text-sm text-gray-600 leading-relaxed font-body">
                  Building collaborative groups focused on solving systemic social problems in
                  education, healthcare, environment, and women&apos;s empowerment.
                </p>
              </div>
            </div>

            <div className="flex justify-center mt-10">
              <a
                href="#portfolio"
                className="btn btn-primary rounded-full bg-gradient-to-r from-[#B30B7E] to-[#5C1081] border-0"
              >
                Find out more
              </a>
            </div>
          </div>

          <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_90%_10%,_rgba(195,9,159,0.15)_0%,_transparent_65%)] pointer-events-none" />
          <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_10%_90%,_rgba(112,150,209,0.12)_0%,_transparent_60%)] pointer-events-none" />
        </section>

        {/* Section: Focus areas */}
        <section className="pt-10 pb-0" id="focus-areas">
          <div className="section-title-wrapper mb-12 text-center max-w-3xl mx-auto">
            <h2 className="font-title text-3xl font-extrabold text-gray-900 tracking-tight">
              Focus{' '}
              <span className="bg-gradient-to-r from-[#1863DC] to-[#8E2DE2] bg-clip-text text-transparent inline-block font-black">
                areas
              </span>
            </h2>
            <p className="text-gray-500 font-body mt-2 max-[640px]:text-sm">
              We channel the power of collective action into four critical focus areas, seeding
              innovations that can create sustainable social impact across India.
            </p>
          </div>

          <div className="focus-grid flex gap-0 h-[480px] overflow-hidden max-[1024px]:hidden !rounded-none">
            {/* Card 1: Education (expanded-default) */}
            <div className="focus-card flex-1 relative overflow-hidden cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] expanded-default max-[1024px]:h-[200px] max-[1024px]:hover:h-[360px]">
              <div
                className="focus-card-bg absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                style={{ backgroundImage: `url('/images/report-cover-2.webp')` }}
              />
              <span className="focus-label-vertical">Education</span>
              <div className="focus-expand-content absolute bottom-0 inset-x-0 p-8 z-10 flex flex-col items-start gap-2 text-white/90 opacity-0 translate-y-3 transition-all duration-300">
                <div className="font-title text-[0.68rem] font-bold tracking-wider uppercase text-white/60">
                  ACT FOR
                </div>
                <h3 className="font-title text-2xl font-black text-white">Education</h3>
                <p className="text-xs text-white/80 leading-relaxed max-w-sm font-body">
                  Enabling the bottom three quartiles of India&apos;s population to learn at home by
                  harnessing the power of affordable, accessible and high-quality ed-tech
                  interventions.
                </p>
                <div className="w-9 h-9 rounded-full border border-white/40 bg-white/10 hover:bg-white text-white hover:text-gray-900 flex items-center justify-center font-bold text-sm mt-2 transition-all duration-200 hover:scale-105">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Card 2: Environment */}
            <div className="focus-card flex-1 relative overflow-hidden cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] max-[1024px]:h-[200px] max-[1024px]:hover:h-[360px]">
              <div
                className="focus-card-bg absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                style={{
                  backgroundImage: `url('/images/stock-photo-aerial-view-of-mountain-hills-covered-with-dense-green-lush-woods-on-bright-summer-day-2075127775.webp')`,
                }}
              />
              <span className="focus-label-vertical">Environment</span>
              <div className="focus-expand-content absolute bottom-0 inset-x-0 p-8 z-10 flex flex-col items-start gap-2 text-white/90 opacity-0 translate-y-3 transition-all duration-300">
                <div className="font-title text-[0.68rem] font-bold tracking-wider uppercase text-white/60">
                  ACT FOR
                </div>
                <h3 className="font-title text-2xl font-black text-white">Environment</h3>
                <p className="text-xs text-white/80 leading-relaxed max-w-sm font-body">
                  Backing tech-led start-ups working to improve air quality, manage water &amp;
                  waste, and accelerate transition to clean energy.
                </p>
                <div className="w-9 h-9 rounded-full border border-white/40 bg-white/10 hover:bg-white text-white hover:text-gray-900 flex items-center justify-center font-bold text-sm mt-2 transition-all duration-200 hover:scale-105">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Card 3: Health */}
            <div className="focus-card flex-1 relative overflow-hidden cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] max-[1024px]:h-[200px] max-[1024px]:hover:h-[360px]">
              <div
                className="focus-card-bg absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                style={{ backgroundImage: `url('/images/report-cover-3.webp')` }}
              />
              <span className="focus-label-vertical">Health</span>
              <div className="focus-expand-content absolute bottom-0 inset-x-0 p-8 z-10 flex flex-col items-start gap-2 text-white/90 opacity-0 translate-y-3 transition-all duration-300">
                <div className="font-title text-[0.68rem] font-bold tracking-wider uppercase text-white/60">
                  ACT FOR
                </div>
                <h3 className="font-title text-2xl font-black text-white">Health</h3>
                <p className="text-xs text-white/80 leading-relaxed max-w-sm font-body">
                  Strengthening India&apos;s healthcare system by funding tech-driven solutions that
                  improve access, quality, and affordability of primary care.
                </p>
                <div className="w-9 h-9 rounded-full border border-white/40 bg-white/10 hover:bg-white text-white hover:text-gray-900 flex items-center justify-center font-bold text-sm mt-2 transition-all duration-200 hover:scale-105">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Card 4: Women */}
            <div className="focus-card flex-1 relative overflow-hidden cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] max-[1024px]:h-[200px] max-[1024px]:hover:h-[360px]">
              <div
                className="focus-card-bg absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                style={{ backgroundImage: `url('/images/report-cover-11.webp')` }}
              />
              <span className="focus-label-vertical">Women</span>
              <div className="focus-expand-content absolute bottom-0 inset-x-0 p-8 z-10 flex flex-col items-start gap-2 text-white/90 opacity-0 translate-y-3 transition-all duration-300">
                <div className="font-title text-[0.68rem] font-bold tracking-wider uppercase text-white/60">
                  ACT FOR
                </div>
                <h3 className="font-title text-2xl font-black text-white">Women</h3>
                <p className="text-xs text-white/80 leading-relaxed max-w-sm font-body">
                  Enabling women to participate in the workforce and access economic opportunities
                  through tech-led livelihood and skill building.
                </p>
                <div className="w-9 h-9 rounded-full border border-white/40 bg-white/10 hover:bg-white text-white hover:text-gray-900 flex items-center justify-center font-bold text-sm mt-2 transition-all duration-200 hover:scale-105">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile/tablet: always-visible focus cards (no hover dependency) */}
          <div className="hidden max-[1024px]:grid grid-cols-1 gap-4 px-6 mt-4">
            {[
              {
                label: 'Education',
                image: '/images/report-cover-2.webp',
                desc: "Enabling the bottom three quartiles of India's population to learn at home by harnessing the power of affordable, accessible and high-quality ed-tech interventions.",
              },
              {
                label: 'Environment',
                image:
                  '/images/stock-photo-aerial-view-of-mountain-hills-covered-with-dense-green-lush-woods-on-bright-summer-day-2075127775.webp',
                desc: 'Backing tech-led start-ups working to improve air quality, manage water & waste, and accelerate transition to clean energy.',
              },
              {
                label: 'Health',
                image: '/images/report-cover-3.webp',
                desc: "Strengthening India's healthcare system by funding tech-driven solutions that improve access, quality, and affordability of primary care.",
              },
              {
                label: 'Women',
                image: '/images/report-cover-5.webp',
                desc: 'Enabling women to participate in the workforce and access economic opportunities through tech-led livelihood and skill building.',
              },
            ].map((card) => (
              <div
                key={card.label}
                className="relative h-[240px] rounded-2xl overflow-hidden shadow-sm"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${card.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-6 flex flex-col items-start gap-1.5 text-white">
                  <div className="font-title text-[0.68rem] font-bold tracking-wider uppercase text-white/60">
                    ACT FOR
                  </div>
                  <h3 className="font-title text-2xl font-black text-white">{card.label}</h3>
                  <p className="text-xs text-white/80 leading-relaxed font-body">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section: How ACT works */}
        <section
          id="how-it-works"
          className="relative pt-12 pb-12 bg-white max-[640px]:py-10 overflow-hidden"
        >
          <div className="section-title-wrapper mb-12 text-center max-w-3xl mx-auto px-4">
            <h2 className="font-title text-3xl font-extrabold text-gray-900 tracking-tight">
              How we{' '}
              <span className="bg-gradient-to-r from-[#1863DC] to-[#B30B7E] bg-clip-text text-transparent inline-block font-black">
                work
              </span>
            </h2>
            <p className="text-gray-500 font-body mt-2 max-[640px]:text-sm">
              Our efforts are guided by a data-driven approach that allows us to take calculated
              risks, stay focused on intended outcomes, and remain fully accountable for every rupee
              entrusted to our vision.
            </p>
          </div>

          <InteractiveHowItWorks />
        </section>

        {/* Dynamic Portfolio Section wrapped in Suspense */}
        <Suspense
          fallback={
            <section
              className="relative py-16 px-4 overflow-hidden shadow-sm rounded-b-[16px] bg-gradient-to-r from-[#1A237E] via-[#4A148C] to-[#B30B7E] "
              id="portfolio"
            >
              <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_10%_15%,_rgba(195,9,159,0.06)_0%,_transparent_60%)] pointer-events-none" />
              <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_90%_85%,_rgba(195,9,159,0.12)_0%,_transparent_65%)] pointer-events-none" />
              <div className="section-title-wrapper mb-8">
                <h2 className="font-title text-3xl font-extrabold text-gray-900 text-center tracking-tight">
                  Portfolio{' '}
                  <span className="bg-gradient-to-r from-[#1863DC] to-[#B30B7E] bg-clip-text text-transparent inline-block font-black">
                    proof
                  </span>
                </h2>
              </div>
              <div className="skeleton-image skeleton-shimmer h-[400px] rounded-3xl" />
            </section>
          }
        >
          <DynamicPortfolios />
        </Suspense>

        {/* Section: Impact */}
        <section id="impact" className="relative z-0 -mt-8">
          <div className="w-full mx-auto bg-gradient-to-r from-[#1A237E] via-[#4A148C] to-[#B30B7E] px-16 py-20 text-white max-[1024px]:px-8 max-[1024px]:py-14 shadow-lg rounded-none">
            <div className="max-w-[1180px] mx-auto mb-12">
              <div className="grid grid-cols-1 md:grid-cols-[1.15fr_1fr] gap-16 items-center">
                {/* Left Column: Map + Description */}
                <div className="relative w-full flex flex-col items-start text-left gap-6">
                  <div className="w-full max-w-[460px] mx-auto md:mx-0">
                    <IndiaMap />
                  </div>

                  <div className="w-full max-w-[460px] text-left">
                    <h2 className="font-title text-6xl max-[640px]:text-4xl font-black text-white leading-none tracking-tight">
                      Impact
                    </h2>
                    <p className="text-xs text-white/80 leading-relaxed font-body mt-4">
                      Across India, ACT backs bold ideas at the point where support can change their
                      trajectory. Our impact lies in helping those ideas move from possibility to
                      lasting change.
                    </p>
                  </div>
                </div>

                {/* Right Column: Statistics Grid */}
                <div className="flex flex-col gap-4 w-full">
                  {/* Card 1: 58 */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center gap-6 text-left">
                    <div className="font-title text-5xl font-extrabold text-white min-w-[70px]">
                      58
                    </div>
                    <div className="text-sm text-white font-medium leading-snug">
                      Innovations supported
                    </div>
                  </div>

                  {/* Card 2: 30 */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center gap-6 text-left">
                    <div className="font-title text-5xl font-extrabold text-white min-w-[70px]">
                      30
                    </div>
                    <div className="text-sm text-white font-medium leading-snug">
                      Millions life touched
                    </div>
                  </div>

                  {/* Card 3: 4x */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-3 text-left">
                    <div className="flex items-center gap-6">
                      <div className="font-title text-5xl font-extrabold text-white min-w-[70px]">
                        4x
                      </div>
                      <div className="text-sm text-white font-medium leading-snug">
                        Follow-on capital
                      </div>
                    </div>
                    <div className="w-full border-t border-white/10 pt-3 mt-1">
                      <p className="text-[0.75rem] text-white/70 leading-relaxed font-body">
                        39 portfolio founders raised additional external funding after their
                        solutions began showing tangible impact.
                      </p>
                    </div>
                  </div>

                  {/* Card 4: 26 */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-3 text-left">
                    <div className="flex items-center gap-6">
                      <div className="font-title text-5xl font-extrabold text-white min-w-[70px]">
                        26
                      </div>
                      <div className="text-sm text-white font-medium leading-snug">
                        Government partnerships
                      </div>
                    </div>
                    <div className="w-full border-t border-white/10 pt-3 mt-1">
                      <p className="text-[0.75rem] text-white/70 leading-relaxed font-body">
                        Our portfolio organisations have secured government partnerships, unlocking
                        greater scale and sustainability.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Stories from the field */}
        <InteractiveStories />

        {/* ── Section: Latest Insights */}
        <LatestInsights />

        {/* Section: Engagement pathways */}
        <InteractivePathways />
      </main>

      <Footer />
    </div>
  )
}
