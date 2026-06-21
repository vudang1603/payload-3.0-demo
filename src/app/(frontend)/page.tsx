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

      <main className="main flex-grow container mx-auto px-6 py-10 flex flex-col gap-16 max-[640px]:gap-12">
        {/* Redesigned Hero Section */}
        <section
          className="hero-block relative py-24 px-8 text-center flex items-center justify-center overflow-hidden shadow-sm"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.18), rgba(0, 0, 0, 0.50)), url('/images/hero-girls.webp')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            borderRadius: '24px',
          }}
        >
          <div className="max-w-3xl z-10 text-white flex flex-col items-center gap-6">
            <h1 className="font-title text-4xl max-[640px]:text-3xl font-black leading-tight tracking-tight drop-shadow-sm select-none">
              Backing breakthrough innovations for population-scale impact in India
            </h1>
            <div className="flex gap-3 mt-4 max-[640px]:flex-col max-[640px]:w-full">
              <button className="btn btn-primary max-[640px]:w-full" data-coming-soon>
                Apply for a Grant
              </button>
              <a href="#portfolio" className="btn btn-outline-white max-[640px]:w-full">
                Explore Our Work
              </a>
            </div>
          </div>
        </section>

        {/* Section: What ACT does */}
        <section className="py-16 relative overflow-hidden" id="about">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(139,92,246,0.07)_0%,_transparent_70%)] pointer-events-none" />
          <div className="relative z-10">
            <div className="section-title-wrapper mb-12 text-center max-w-3xl mx-auto">
              <h2 className="font-title text-3xl font-extrabold text-gray-900 tracking-tight">
                What ACT{' '}
                <span className="bg-gradient-to-r from-[#1863DC] to-[#B30B7E] bg-clip-text text-transparent inline-block font-black">
                  does
                </span>
              </h2>
              <p className="text-gray-500 font-body mt-2 max-[640px]:text-sm">
                As a non-profit tech-led venture philanthropy platform, ACT is built upon the
                premise that an entrepreneurial mindset, technology &amp; innovation and collective
                action have the power to create meaningful social impact at scale.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 max-[1024px]:grid-cols-1">
              {/* Card 1: Risk Capital — image by default, purple curve reveals on hover */}
              <div
                className="act-card group relative rounded-2xl overflow-hidden shadow-sm h-[340px] bg-cover bg-center"
                style={{ backgroundImage: `url('/images/wmremove-transformed.webp')` }}
              >
                <div
                  className="absolute inset-x-0 bottom-0 h-[62%] bg-[linear-gradient(140deg,#3F1E8C_0%,#7A1C9E_45%,#B30B7E_100%)] flex items-center justify-center text-center px-7 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"
                  style={{ clipPath: 'ellipse(120% 100% at 50% 100%)' }}
                >
                  <p className="text-white/95 text-sm leading-relaxed font-body">
                    Providing hard-to-find, early-stage risk capital to take long-term bets and
                    additionally supporting portfolio founders in mobilising follow-on capital.
                  </p>
                </div>
              </div>

              {/* Card 2: Connections */}
              <div className="act-card group relative rounded-2xl overflow-hidden shadow-sm h-[340px] bg-white border border-gray-100">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
                  <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
                    <circle cx="45" cy="18" r="7" fill="#1863DC" opacity="0.3" />
                    <circle
                      cx="45"
                      cy="18"
                      r="7"
                      fill="#1863DC"
                      opacity="0.15"
                      stroke="#1863DC"
                      strokeWidth="1.5"
                    />
                    <circle cx="18" cy="55" r="7" fill="#B30B7E" opacity="0.3" />
                    <circle
                      cx="18"
                      cy="55"
                      r="7"
                      fill="#B30B7E"
                      opacity="0.15"
                      stroke="#B30B7E"
                      strokeWidth="1.5"
                    />
                    <circle cx="72" cy="55" r="7" fill="#1863DC" opacity="0.3" />
                    <circle
                      cx="72"
                      cy="55"
                      r="7"
                      fill="#1863DC"
                      opacity="0.15"
                      stroke="#1863DC"
                      strokeWidth="1.5"
                    />
                    <circle cx="30" cy="76" r="5" fill="#7C3AED" opacity="0.2" />
                    <circle
                      cx="30"
                      cy="76"
                      r="5"
                      fill="#7C3AED"
                      opacity="0.1"
                      stroke="#7C3AED"
                      strokeWidth="1"
                    />
                    <circle cx="60" cy="76" r="5" fill="#7C3AED" opacity="0.2" />
                    <circle
                      cx="60"
                      cy="76"
                      r="5"
                      fill="#7C3AED"
                      opacity="0.1"
                      stroke="#7C3AED"
                      strokeWidth="1"
                    />
                    <line
                      x1="45"
                      y1="25"
                      x2="18"
                      y2="48"
                      stroke="#1863DC"
                      strokeWidth="1.2"
                      opacity="0.25"
                    />
                    <line
                      x1="45"
                      y1="25"
                      x2="72"
                      y2="48"
                      stroke="#1863DC"
                      strokeWidth="1.2"
                      opacity="0.25"
                    />
                    <line
                      x1="18"
                      y1="55"
                      x2="30"
                      y2="71"
                      stroke="#B30B7E"
                      strokeWidth="1.2"
                      opacity="0.25"
                    />
                    <line
                      x1="72"
                      y1="55"
                      x2="60"
                      y2="71"
                      stroke="#1863DC"
                      strokeWidth="1.2"
                      opacity="0.25"
                    />
                    <line
                      x1="18"
                      y1="55"
                      x2="72"
                      y2="55"
                      stroke="#7C3AED"
                      strokeWidth="1"
                      opacity="0.15"
                      strokeDasharray="4 4"
                    />
                  </svg>
                  <h3 className="font-title text-xl font-bold text-[#1863DC]">Connections</h3>
                </div>
                <div
                  className="absolute inset-x-0 bottom-0 h-[58%] bg-[linear-gradient(140deg,#3F1E8C_0%,#7A1C9E_45%,#B30B7E_100%)] flex items-center justify-center text-center px-7 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"
                  style={{ clipPath: 'ellipse(120% 100% at 50% 100%)' }}
                >
                  <p className="text-white/95 text-sm leading-relaxed font-body">
                    Facilitating connections and partnerships across the ecosystem between
                    start-ups, corporate partners, non-profits, domain experts, and government.
                  </p>
                </div>
              </div>

              {/* Card 3: Collectives */}
              <div className="act-card group relative rounded-2xl overflow-hidden shadow-sm h-[340px] bg-white border border-gray-100">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
                  <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
                    <circle cx="45" cy="12" r="7" fill="#1863DC" opacity="0.3" />
                    <circle
                      cx="45"
                      cy="12"
                      r="7"
                      fill="#1863DC"
                      opacity="0.15"
                      stroke="#1863DC"
                      strokeWidth="1.5"
                    />
                    <circle cx="16" cy="38" r="6" fill="#1863DC" opacity="0.25" />
                    <circle
                      cx="16"
                      cy="38"
                      r="6"
                      fill="#1863DC"
                      opacity="0.1"
                      stroke="#1863DC"
                      strokeWidth="1.2"
                    />
                    <circle cx="74" cy="38" r="6" fill="#B30B7E" opacity="0.25" />
                    <circle
                      cx="74"
                      cy="38"
                      r="6"
                      fill="#B30B7E"
                      opacity="0.1"
                      stroke="#B30B7E"
                      strokeWidth="1.2"
                    />
                    <circle cx="28" cy="68" r="5" fill="#7C3AED" opacity="0.2" />
                    <circle
                      cx="28"
                      cy="68"
                      r="5"
                      fill="#7C3AED"
                      opacity="0.1"
                      stroke="#7C3AED"
                      strokeWidth="1"
                    />
                    <circle cx="62" cy="68" r="5" fill="#7C3AED" opacity="0.2" />
                    <circle
                      cx="62"
                      cy="68"
                      r="5"
                      fill="#7C3AED"
                      opacity="0.1"
                      stroke="#7C3AED"
                      strokeWidth="1"
                    />
                    <circle cx="45" cy="80" r="5" fill="#B30B7E" opacity="0.2" />
                    <circle
                      cx="45"
                      cy="80"
                      r="5"
                      fill="#B30B7E"
                      opacity="0.1"
                      stroke="#B30B7E"
                      strokeWidth="1"
                    />
                    <line
                      x1="45"
                      y1="19"
                      x2="16"
                      y2="32"
                      stroke="#1863DC"
                      strokeWidth="1.2"
                      opacity="0.25"
                    />
                    <line
                      x1="45"
                      y1="19"
                      x2="74"
                      y2="32"
                      stroke="#B30B7E"
                      strokeWidth="1.2"
                      opacity="0.25"
                    />
                    <line
                      x1="16"
                      y1="38"
                      x2="28"
                      y2="63"
                      stroke="#1863DC"
                      strokeWidth="1.2"
                      opacity="0.2"
                    />
                    <line
                      x1="74"
                      y1="38"
                      x2="62"
                      y2="63"
                      stroke="#B30B7E"
                      strokeWidth="1.2"
                      opacity="0.2"
                    />
                    <line
                      x1="28"
                      y1="68"
                      x2="45"
                      y2="75"
                      stroke="#7C3AED"
                      strokeWidth="1"
                      opacity="0.2"
                    />
                    <line
                      x1="62"
                      y1="68"
                      x2="45"
                      y2="75"
                      stroke="#7C3AED"
                      strokeWidth="1"
                      opacity="0.2"
                    />
                  </svg>
                  <h3 className="font-title text-xl font-bold text-[#1863DC]">Collectives</h3>
                </div>
                <div
                  className="absolute inset-x-0 bottom-0 h-[58%] bg-[linear-gradient(140deg,#3F1E8C_0%,#7A1C9E_45%,#B30B7E_100%)] flex items-center justify-center text-center px-7 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"
                  style={{ clipPath: 'ellipse(120% 100% at 50% 100%)' }}
                >
                  <p className="text-white/95 text-sm leading-relaxed font-body">
                    Building collaborative groups focused on solving systemic social problems in
                    education, healthcare, environment, and women&apos;s empowerment.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-10">
              <a
                href="#portfolio"
                className="btn btn-primary rounded-full bg-gradient-to-r from-[#B30B7E] to-[#5C1081] border-0"
              >
                Know more
              </a>
            </div>
          </div>
        </section>

        {/* Section: Focus areas */}
        <section className="py-8" id="focus-areas">
          <div className="section-title-wrapper mb-12 text-center max-w-3xl mx-auto">
            <h2 className="font-title text-3xl font-extrabold text-gray-900 tracking-tight">
              Focus{' '}
              <span className="bg-gradient-to-r from-[#1863DC] to-[#8E2DE2] bg-clip-text text-transparent inline-block font-black">
                areas
              </span>
            </h2>
            <p className="text-gray-500 font-body mt-2 max-[640px]:text-sm">
              As a non-profit tech-led venture philanthropy platform, ACT is built upon the premise
              that an entrepreneurial mindset, technology &amp; innovation and collective action
              have the power to create meaningful social impact at scale.
            </p>
          </div>

          <div className="focus-grid flex gap-1.5 h-[480px] rounded-3xl overflow-hidden max-[1024px]:flex-col max-[1024px]:h-auto">
            {/* Card 1: Education (expanded-default) */}
            <div className="focus-card flex-1 relative overflow-hidden cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] expanded-default max-[1024px]:h-[200px] max-[1024px]:hover:h-[360px]">
              <div
                className="focus-card-bg absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                style={{ backgroundImage: `url('/images/report-cover-2.webp')` }}
              />
              <span className="focus-label-vertical">Education</span>
              <div className="focus-expand-content absolute bottom-0 inset-x-0 p-8 z-10 flex flex-col items-start gap-2 text-white/90 opacity-0 translate-y-3 transition-all duration-300">
                <div className="font-title text-[0.68rem] font-bold tracking-wider uppercase text-white/60">
                  ACT FOR Education
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
                  ACT FOR Environment
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
                  ACT FOR Health
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
                style={{ backgroundImage: `url('/images/report-cover-5.webp')` }}
              />
              <span className="focus-label-vertical">Women</span>
              <div className="focus-expand-content absolute bottom-0 inset-x-0 p-8 z-10 flex flex-col items-start gap-2 text-white/90 opacity-0 translate-y-3 transition-all duration-300">
                <div className="font-title text-[0.68rem] font-bold tracking-wider uppercase text-white/60">
                  ACT FOR Women
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
        </section>

        {/* Section: How ACT works */}
        <section
          id="how-it-works"
          className="relative py-16 pb-8 bg-[#F8F4FF]/50 border border-gray-100/50 rounded-[40px] max-[640px]:py-10 max-[640px]:rounded-3xl overflow-hidden"
        >
          <div className="section-title-wrapper mb-12 text-center max-w-3xl mx-auto px-4">
            <h2 className="font-title text-3xl font-extrabold text-gray-900 tracking-tight">
              How ACT{' '}
              <span className="bg-gradient-to-r from-[#1863DC] to-[#B30B7E] bg-clip-text text-transparent inline-block font-black">
                works
              </span>
            </h2>
            <p className="text-gray-500 font-body mt-2 max-[640px]:text-sm">
              As a non-profit tech-led venture philanthropy platform, ACT is built upon the premise
              that an entrepreneurial mindset, technology &amp; innovation and collective action
              have the power to create meaningful social impact at scale.
            </p>
          </div>

          <InteractiveHowItWorks />
        </section>

        {/* Dynamic Portfolio Section wrapped in Suspense */}
        <Suspense
          fallback={
            <section className="py-16 px-4" id="portfolio">
              <div className="section-title-wrapper mb-8">
                <h2 className="font-title text-3xl font-extrabold text-gray-900 text-center tracking-tight">
                  Portfolio{' '}
                  <span className="bg-gradient-to-r from-[#B30B7E] to-[#5C1081] bg-clip-text text-transparent inline-block font-black">
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
        <section id="impact" className="py-8">
          <div className="w-full max-w-[1180px] mx-auto bg-gradient-to-b from-[#1A237E] via-[#4A148C] to-[#B30B7E] rounded-[48px] px-16 py-20 text-white max-[1024px]:px-8 max-[1024px]:py-14 max-[640px]:rounded-[32px] shadow-lg">
            <div className="grid grid-cols-[1.5fr_1fr] gap-10 items-center max-[900px]:grid-cols-1 max-[900px]:gap-10">
              {/* Left: India map + heading */}
              <div className="flex flex-col gap-8">
                <div className="relative w-full">
                  {/* Interactive India map — hover a state to highlight + show its name */}
                  <IndiaMap />
                </div>

                <div>
                  <h2 className="font-title text-6xl max-[640px]:text-4xl font-black text-white leading-none tracking-tight">
                    Impact
                  </h2>
                  <p className="text-sm text-white/80 leading-relaxed font-body mt-4 max-w-md">
                    As a non-profit tech-led venture philanthropy platform, ACT is built upon the
                    premise that an entrepreneurial mindset, technology &amp; innovation and
                    collective action have the power to create meaningful social impact at scale.
                  </p>
                </div>
              </div>

              {/* Right: stat cards column */}
              <div className="flex flex-col gap-4 w-full">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center justify-between text-left">
                  <div className="font-title text-4xl font-extrabold text-white">58</div>
                  <div className="text-xs text-white/80 font-semibold tracking-wide uppercase text-right leading-tight max-w-[150px]">
                    Innovations supported
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center justify-between text-left">
                  <div className="font-title text-4xl font-extrabold text-white">30</div>
                  <div className="text-xs text-white/80 font-semibold tracking-wide uppercase text-right leading-tight max-w-[150px]">
                    Millions life touched
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-2 text-left">
                  <div className="flex items-center justify-between">
                    <div className="font-title text-4xl font-extrabold text-white">4x</div>
                    <div className="text-xs text-white/80 font-semibold tracking-wide uppercase leading-tight text-right">
                      Follow-on capitals
                    </div>
                  </div>
                  <p className="text-[0.7rem] text-white/70 leading-relaxed font-body border-t border-white/15 pt-2 mt-1">
                    39 portfolio founders raised additional external funding after demonstrating
                    measurable impact.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-2 text-left">
                  <div className="flex items-center justify-between">
                    <div className="font-title text-4xl font-extrabold text-white">26</div>
                    <div className="text-xs text-white/80 font-semibold tracking-wide uppercase leading-tight text-right">
                      Government partnerships
                    </div>
                  </div>
                  <p className="text-[0.7rem] text-white/70 leading-relaxed font-body border-t border-white/15 pt-2 mt-1">
                    Established government partnerships to unlock greater scale and long-term
                    sustainability.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Stories from the field */}
        <InteractiveStories />

        {/* Dynamic Blogs / Insights Section wrapped in Suspense */}
        <section id="insights" className="py-8">
          <div className="section-title-wrapper mb-12 text-center max-w-3xl mx-auto">
            <h2 className="font-title text-3xl font-extrabold text-gray-900 tracking-tight">
              Latest{' '}
              <span className="bg-gradient-to-r from-[#B30B7E] to-[#5C1081] bg-clip-text text-transparent inline-block font-black">
                insights
              </span>
            </h2>
            <p className="text-gray-500 font-body mt-2 max-[640px]:text-sm">
              As a non-profit tech-led venture philanthropy platform, ACT is built upon the premise
              that an entrepreneurial mindset, technology &amp; innovation and collective action
              have the power to create meaningful social impact at scale.
            </p>
          </div>

          <div className="insights-grid">
            {/* Reports */}
            <a
              href="#"
              data-coming-soon
              className="group relative bg-[#FAF9FF] border border-gray-100 rounded-[28px] p-8 min-h-[210px] flex flex-col justify-between no-underline hover:shadow-md transition-shadow duration-300"
            >
              <span className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#1863DC] group-hover:bg-[#1863DC] group-hover:text-white transition-colors duration-200">
                ↗
              </span>
              <img src="/images/insight-reports.png" alt="Reports" className="w-24 h-24 object-contain drop-shadow-md" />
              <h3 className="font-title text-2xl font-bold text-[#1863DC]">Reports</h3>
            </a>

            {/* Blog */}
            <Link
              href="/blogs"
              className="group relative bg-[#FAF9FF] border border-gray-100 rounded-[28px] p-8 min-h-[210px] flex flex-col justify-between no-underline hover:shadow-md transition-shadow duration-300"
            >
              <span className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#1863DC] group-hover:bg-[#1863DC] group-hover:text-white transition-colors duration-200">
                ↗
              </span>
              <img src="/images/insight-blog.png" alt="Blog" className="w-24 h-24 object-contain drop-shadow-md" />
              <h3 className="font-title text-2xl font-bold text-[#1863DC]">Blog</h3>
            </Link>

            {/* Media */}
            <a
              href="#"
              data-coming-soon
              className="group relative bg-[#FAF9FF] border border-gray-100 rounded-[28px] p-8 min-h-[210px] flex flex-col justify-between no-underline hover:shadow-md transition-shadow duration-300"
            >
              <span className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#1863DC] group-hover:bg-[#1863DC] group-hover:text-white transition-colors duration-200">
                ↗
              </span>
              <img src="/images/insight-media.png" alt="Media" className="w-24 h-24 object-contain drop-shadow-md" />
              <h3 className="font-title text-2xl font-bold text-[#1863DC]">Media</h3>
            </a>

            {/* Podcast */}
            <a
              href="#"
              data-coming-soon
              className="group relative bg-[#FAF9FF] border border-gray-100 rounded-[28px] p-8 min-h-[210px] flex flex-col justify-between no-underline hover:shadow-md transition-shadow duration-300"
            >
              <span className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#1863DC] group-hover:bg-[#1863DC] group-hover:text-white transition-colors duration-200">
                ↗
              </span>
              <img src="/images/insight-podcast.png" alt="Podcast" className="w-24 h-24 object-contain drop-shadow-md" />
              <h3 className="font-title text-2xl font-bold text-[#1863DC]">Podcast</h3>
            </a>
          </div>

          {/* (replaced report archive + dynamic blogs with the 4-card design) */}
          <div className="hidden">
            <div className="w-full bg-[#FAF9FF] border border-gray-100 rounded-[32px] p-8 max-[640px]:p-5">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-title text-lg font-bold text-gray-800 tracking-tight">
                  Reports &amp; Newsletters
                </h3>
                <span className="text-xs font-bold text-primary uppercase tracking-wider">
                  Mock Archive
                </span>
              </div>
              <div className="grid grid-cols-2 gap-6 max-[768px]:grid-cols-1">
                {/* Report Card 1 */}
                <div className="bg-white border border-gray-150/60 rounded-2xl overflow-hidden p-5 flex gap-5 items-center hover:shadow-sm transition-shadow duration-200">
                  <div className="w-[120px] h-[80px] bg-gray-50 rounded-xl overflow-hidden shrink-0 border border-gray-100 flex items-center justify-center">
                    <img
                      src="/images/report-cover-2.webp"
                      alt="Annual Report cover"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="text-left flex flex-col gap-1.5">
                    <span className="px-2 py-0.5 bg-gray-100 rounded-full text-[0.62rem] text-gray-450 font-bold tracking-wider uppercase w-fit select-none">
                      Annual Report
                    </span>
                    <h4 className="font-title text-sm font-bold text-gray-900">
                      ACT Grants Annual Highlight 2023-24
                    </h4>
                    <span className="text-[0.68rem] font-bold text-[#1863DC] flex items-center gap-1 cursor-pointer">
                      Download PDF ↗
                    </span>
                  </div>
                </div>

                {/* Report Card 2 */}
                <div className="bg-white border border-gray-150/60 rounded-2xl overflow-hidden p-5 flex gap-5 items-center hover:shadow-sm transition-shadow duration-200">
                  <div className="w-[120px] h-[80px] bg-gray-50 rounded-xl overflow-hidden shrink-0 border border-gray-100 flex items-center justify-center">
                    <img
                      src="/images/report-cover-3.webp"
                      alt="impACT Newsletter cover"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="text-left flex flex-col gap-1.5">
                    <span className="px-2 py-0.5 bg-gray-100 rounded-full text-[0.62rem] text-gray-450 font-bold tracking-wider uppercase w-fit select-none">
                      Newsletter
                    </span>
                    <h4 className="font-title text-sm font-bold text-gray-900">
                      impACT Newsletter Q1 Edition
                    </h4>
                    <span className="text-[0.68rem] font-bold text-[#1863DC] flex items-center gap-1 cursor-pointer">
                      Read Online ↗
                    </span>
                  </div>
                </div>

                {/* Report Card 3 */}
                <div className="bg-white border border-gray-150/60 rounded-2xl overflow-hidden p-5 flex gap-5 items-center hover:shadow-sm transition-shadow duration-200">
                  <div className="w-[120px] h-[80px] bg-gray-50 rounded-xl overflow-hidden shrink-0 border border-gray-100 flex items-center justify-center">
                    <img
                      src="/images/report-cover-1.webp"
                      alt="Education Report cover"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="text-left flex flex-col gap-1.5">
                    <span className="px-2 py-0.5 bg-gray-100 rounded-full text-[0.62rem] text-gray-450 font-bold tracking-wider uppercase w-fit select-none">
                      Sector Report
                    </span>
                    <h4 className="font-title text-sm font-bold text-gray-900">
                      Education Technology in India Report
                    </h4>
                    <span className="text-[0.68rem] font-bold text-[#1863DC] flex items-center gap-1 cursor-pointer">
                      Download PDF ↗
                    </span>
                  </div>
                </div>

                {/* Report Card 4 */}
                <div className="bg-white border border-gray-150/60 rounded-2xl overflow-hidden p-5 flex gap-5 items-center hover:shadow-sm transition-shadow duration-200">
                  <div className="w-[120px] h-[80px] bg-gray-50 rounded-xl overflow-hidden shrink-0 border border-gray-100 flex items-center justify-center">
                    <img
                      src="/images/report-cover-4.webp"
                      alt="Healthcare Study cover"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="text-left flex flex-col gap-1.5">
                    <span className="px-2 py-0.5 bg-gray-100 rounded-full text-[0.62rem] text-gray-450 font-bold tracking-wider uppercase w-fit select-none">
                      Sector Report
                    </span>
                    <h4 className="font-title text-sm font-bold text-gray-900">
                      Healthcare Access &amp; Advisory Study
                    </h4>
                    <span className="text-[0.68rem] font-bold text-[#1863DC] flex items-center gap-1 cursor-pointer">
                      Download PDF ↗
                    </span>
                  </div>
                </div>

                {/* Report Card 5 */}
                <div className="bg-white border border-gray-150/60 rounded-2xl overflow-hidden p-5 flex gap-5 items-center hover:shadow-sm transition-shadow duration-200">
                  <div className="w-[120px] h-[80px] bg-gray-50 rounded-xl overflow-hidden shrink-0 border border-gray-100 flex items-center justify-center">
                    <img
                      src="/images/report-cover-5.webp"
                      alt="Climate Innovation cover"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="text-left flex flex-col gap-1.5">
                    <span className="px-2 py-0.5 bg-gray-100 rounded-full text-[0.62rem] text-gray-450 font-bold tracking-wider uppercase w-fit select-none">
                      Sector Report
                    </span>
                    <h4 className="font-title text-sm font-bold text-gray-900">
                      Clean Energy &amp; Climate Innovation
                    </h4>
                    <span className="text-[0.68rem] font-bold text-[#1863DC] flex items-center gap-1 cursor-pointer">
                      Download PDF ↗
                    </span>
                  </div>
                </div>

                {/* Report Card 6 */}
                <div className="bg-white border border-gray-150/60 rounded-2xl overflow-hidden p-5 flex gap-5 items-center hover:shadow-sm transition-shadow duration-200">
                  <div className="w-[120px] h-[80px] bg-gray-50 rounded-xl overflow-hidden shrink-0 border border-gray-100 flex items-center justify-center">
                    <img
                      src="/images/report-cover-6.webp"
                      alt="Women Livelihood Newsletter cover"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="text-left flex flex-col gap-1.5">
                    <span className="px-2 py-0.5 bg-gray-100 rounded-full text-[0.62rem] text-gray-450 font-bold tracking-wider uppercase w-fit select-none">
                      Newsletter
                    </span>
                    <h4 className="font-title text-sm font-bold text-gray-900">
                      Women Empowerment Livelihood Q3
                    </h4>
                    <span className="text-[0.68rem] font-bold text-[#1863DC] flex items-center gap-1 cursor-pointer">
                      Read Online ↗
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dynamic Blog Insights posts */}
            <div className="w-full">
              <h3 className="font-title text-lg font-bold text-gray-800 tracking-tight mb-6 text-left">
                Recent Articles
              </h3>
              <Suspense
                fallback={
                  <div className="grid grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="skeleton-card skeleton-shimmer h-[320px]" />
                    ))}
                  </div>
                }
              >
                <DynamicBlogs />
              </Suspense>
            </div>
          </div>
        </section>

        {/* Section: Engagement pathways */}
        <InteractivePathways />
      </main>

      <Footer />
    </div>
  )
}
