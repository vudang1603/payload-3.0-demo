import { headers as getHeaders } from 'next/headers'
import { getPayload } from 'payload'
import React from 'react'
import Link from 'next/link'
import config from '@/payload.config'

interface HeaderProps {
  activeSlug?: string
}

export const Header: React.FC<HeaderProps> = async ({ activeSlug }) => {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  // Fetch dynamic pages to show in the navigation menu
  const pagesData = await payload.find({
    collection: 'pages',
    select: {
      title: true,
      slug: true,
    },
    limit: 100,
    sort: 'title',
  })
  const navPages = pagesData.docs

  return (
    <header className="w-full bg-white border-b border-[rgba(228,228,231,0.8)] sticky top-0 z-[100] transition-all duration-300">
      <div className="max-w-[1280px] mx-auto px-6 py-3.5 flex justify-between items-center max-[860px]:flex-wrap max-[860px]:gap-4 max-[860px]:py-4 overflow-visible">
        {/* Logo container with White rounded rectangle overlapping effect */}
        <div className="flex items-center gap-2 shrink-0 relative">
          <div className="relative z-50 mr-1 max-[860px]:mr-0">
            <Link href="/" className="absolute top-[-10px] left-0 bg-white rounded-2xl p-[3px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] border border-gray-200/40 flex items-center justify-center transition-transform duration-200 hover:scale-[1.03] w-[96px] h-[96px]">
              <img src="/images/logo.png" alt="ACT logo" className="h-[84px] w-[84px] object-contain" />
            </Link>
            {/* Dummy spacer to hold horizontal place for the overlapping absolute element */}
            <div className="w-[96px] h-[50px]" />
          </div>
          <span className="bg-primary-light border border-primary/10 px-[0.55rem] py-[0.15rem] rounded-full text-[0.62rem] text-primary font-bold tracking-wider uppercase max-[980px]:hidden">CMS Demo</span>
        </div>

        <nav className="flex items-center gap-[1.25rem] transition-all duration-300 max-[1140px]:gap-[0.95rem] max-[980px]:gap-[0.6rem] max-[860px]:order-3 max-[860px]:w-full max-[860px]:justify-center max-[860px]:border-t max-[860px]:border-[rgba(228,228,231,0.4)] max-[860px]:pt-[0.85rem] max-[860px]:gap-5 max-[860px]:mt-1">
          {/* About ACT Dropdown */}
          <div className="group relative inline-block">
            <Link href="/#about" className="no-underline text-[13px] font-semibold text-gray-800 transition-colors duration-200 py-2 flex items-center gap-0.5 hover:text-[var(--primary)] whitespace-nowrap">
              About ACT
              <svg className="w-2.5 h-2.5 text-gray-400 transition-transform duration-200 group-hover:rotate-180 group-hover:text-[var(--primary)] shrink-0" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
            <div className="opacity-0 invisible absolute top-full left-1/2 -translate-x-1/2 translate-y-2.5 bg-white min-w-[160px] shadow-[0_10px_25px_rgba(0,0,0,0.08)] border border-gray-150 rounded-xl py-2 z-[200] transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
              <Link href="/about" className="text-gray-600 px-[1.15rem] py-[0.55rem] no-underline block text-sm font-medium transition-colors duration-200 text-left hover:bg-[var(--primary-light)] hover:text-[var(--primary)]">
                Our Story
              </Link>
              <Link href="/#about" className="text-gray-600 px-[1.15rem] py-[0.55rem] no-underline block text-sm font-medium transition-colors duration-200 text-left hover:bg-[var(--primary-light)] hover:text-[var(--primary)]">
                What We Do
              </Link>
            </div>
          </div>

          {/* How We Work Dropdown */}
          <div className="group relative inline-block">
            <Link href="/#how-it-works" className="no-underline text-[13px] font-semibold text-gray-800 transition-colors duration-200 py-2 flex items-center gap-0.5 hover:text-[var(--primary)] whitespace-nowrap">
              How We Work
              <svg className="w-2.5 h-2.5 text-gray-400 transition-transform duration-200 group-hover:rotate-180 group-hover:text-[var(--primary)] shrink-0" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
            <div className="opacity-0 invisible absolute top-full left-1/2 -translate-x-1/2 translate-y-2.5 bg-white min-w-[160px] shadow-[0_10px_25px_rgba(0,0,0,0.08)] border border-gray-150 rounded-xl py-2 z-[200] transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
              <Link href="/#how-it-works" className="text-gray-600 px-[1.15rem] py-[0.55rem] no-underline block text-sm font-medium transition-colors duration-200 text-left hover:bg-[var(--primary-light)] hover:text-[var(--primary)]">
                Core Principles
              </Link>
              <Link href="/#how-it-works" className="text-gray-600 px-[1.15rem] py-[0.55rem] no-underline block text-sm font-medium transition-colors duration-200 text-left hover:bg-[var(--primary-light)] hover:text-[var(--primary)]">
                Philanthropy Model
              </Link>
            </div>
          </div>

          {/* What We Fund Dropdown */}
          <div className="group relative inline-block">
            <Link href="/#focus-areas" className="no-underline text-[13px] font-semibold text-gray-800 transition-colors duration-200 py-2 flex items-center gap-0.5 hover:text-[var(--primary)] whitespace-nowrap">
              What We Fund
              <svg className="w-2.5 h-2.5 text-gray-400 transition-transform duration-200 group-hover:rotate-180 group-hover:text-[var(--primary)] shrink-0" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
            <div className="opacity-0 invisible absolute top-full left-1/2 -translate-x-1/2 translate-y-2.5 bg-white min-w-[160px] shadow-[0_10px_25px_rgba(0,0,0,0.08)] border border-gray-150 rounded-xl py-2 z-[200] transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
              <Link href="/#focus-areas" className="text-gray-600 px-[1.15rem] py-[0.55rem] no-underline block text-sm font-medium transition-colors duration-200 text-left hover:bg-[var(--primary-light)] hover:text-[var(--primary)]">
                Education
              </Link>
              <Link href="/#focus-areas" className="text-gray-600 px-[1.15rem] py-[0.55rem] no-underline block text-sm font-medium transition-colors duration-200 text-left hover:bg-[var(--primary-light)] hover:text-[var(--primary)]">
                Environment
              </Link>
              <Link href="/#focus-areas" className="text-gray-600 px-[1.15rem] py-[0.55rem] no-underline block text-sm font-medium transition-colors duration-200 text-left hover:bg-[var(--primary-light)] hover:text-[var(--primary)]">
                Healthcare
              </Link>
              <Link href="/#focus-areas" className="text-gray-600 px-[1.15rem] py-[0.55rem] no-underline block text-sm font-medium transition-colors duration-200 text-left hover:bg-[var(--primary-light)] hover:text-[var(--primary)]">
                Women Empowerment
              </Link>
            </div>
          </div>

          {/* Portfolio Dropdown */}
          <div className="group relative inline-block">
            <Link href="/#portfolio" className="no-underline text-[13px] font-semibold text-gray-800 transition-colors duration-200 py-2 flex items-center gap-0.5 hover:text-[var(--primary)] whitespace-nowrap">
              Portfolio
              <svg className="w-2.5 h-2.5 text-gray-400 transition-transform duration-200 group-hover:rotate-180 group-hover:text-[var(--primary)] shrink-0" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
            <div className="opacity-0 invisible absolute top-full left-1/2 -translate-x-1/2 translate-y-2.5 bg-white min-w-[160px] shadow-[0_10px_25px_rgba(0,0,0,0.08)] border border-gray-150 rounded-xl py-2 z-[200] transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
              <Link href="/#portfolio" className="text-gray-600 px-[1.15rem] py-[0.55rem] no-underline block text-sm font-medium transition-colors duration-200 text-left hover:bg-[var(--primary-light)] hover:text-[var(--primary)]">
                All Grants
              </Link>
              <Link href="/#stories" className="text-gray-600 px-[1.15rem] py-[0.55rem] no-underline block text-sm font-medium transition-colors duration-200 text-left hover:bg-[var(--primary-light)] hover:text-[var(--primary)]">
                Founder Stories
              </Link>
            </div>
          </div>

          {/* Impact Dropdown */}
          <div className="group relative inline-block">
            <Link href="/#impact" className="no-underline text-[13px] font-semibold text-gray-800 transition-colors duration-200 py-2 flex items-center gap-0.5 hover:text-[var(--primary)] whitespace-nowrap">
              Impact
              <svg className="w-2.5 h-2.5 text-gray-400 transition-transform duration-200 group-hover:rotate-180 group-hover:text-[var(--primary)] shrink-0" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
            <div className="opacity-0 invisible absolute top-full left-1/2 -translate-x-1/2 translate-y-2.5 bg-white min-w-[160px] shadow-[0_10px_25px_rgba(0,0,0,0.08)] border border-gray-150 rounded-xl py-2 z-[200] transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
              <Link href="/#impact" className="text-gray-600 px-[1.15rem] py-[0.55rem] no-underline block text-sm font-medium transition-colors duration-200 text-left hover:bg-[var(--primary-light)] hover:text-[var(--primary)]">
                Lives Impacted
              </Link>
              <Link href="/#portfolio" className="text-gray-600 px-[1.15rem] py-[0.55rem] no-underline block text-sm font-medium transition-colors duration-200 text-left hover:bg-[var(--primary-light)] hover:text-[var(--primary)]">
                Ecosystem Partners
              </Link>
            </div>
          </div>

          {/* Insights Dropdown */}
          <div className="group relative inline-block">
            <Link href="/blogs" className="no-underline text-[13px] font-semibold text-gray-800 transition-colors duration-200 py-2 flex items-center gap-0.5 hover:text-[var(--primary)] whitespace-nowrap">
              Insights
              <svg className="w-2.5 h-2.5 text-gray-400 transition-transform duration-200 group-hover:rotate-180 group-hover:text-[var(--primary)] shrink-0" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
            <div className="opacity-0 invisible absolute top-full left-1/2 -translate-x-1/2 translate-y-2.5 bg-white min-w-[160px] shadow-[0_10px_25px_rgba(0,0,0,0.08)] border border-gray-150 rounded-xl py-2 z-[200] transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
              <Link href="/blogs" className="text-gray-600 px-[1.15rem] py-[0.55rem] no-underline block text-sm font-medium transition-colors duration-200 text-left hover:bg-[var(--primary-light)] hover:text-[var(--primary)]">
                Recent Articles
              </Link>
              <Link href="/#insights" className="text-gray-600 px-[1.15rem] py-[0.55rem] no-underline block text-sm font-medium transition-colors duration-200 text-left hover:bg-[var(--primary-light)] hover:text-[var(--primary)]">
                Reports & Newsletters
              </Link>
            </div>
          </div>

          {/* Get Involved Dropdown */}
          <div className="group relative inline-block">
            <Link href="/#engagement-pathways" className="no-underline text-[13px] font-semibold text-gray-800 transition-colors duration-200 py-2 flex items-center gap-0.5 hover:text-[var(--primary)] whitespace-nowrap">
              Get Involved
              <svg className="w-2.5 h-2.5 text-gray-400 transition-transform duration-200 group-hover:rotate-180 group-hover:text-[var(--primary)] shrink-0" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
            <div className="opacity-0 invisible absolute top-full left-1/2 -translate-x-1/2 translate-y-2.5 bg-white min-w-[160px] shadow-[0_10px_25px_rgba(0,0,0,0.08)] border border-gray-150 rounded-xl py-2 z-[200] transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
              <Link href="/#engagement-pathways" className="text-gray-600 px-[1.15rem] py-[0.55rem] no-underline block text-sm font-medium transition-colors duration-200 text-left hover:bg-[var(--primary-light)] hover:text-[var(--primary)]">
                For Founders
              </Link>
              <Link href="/#engagement-pathways" className="text-gray-600 px-[1.15rem] py-[0.55rem] no-underline block text-sm font-medium transition-colors duration-200 text-left hover:bg-[var(--primary-light)] hover:text-[var(--primary)]">
                For Partners
              </Link>
              <Link href="/#engagement-pathways" className="text-gray-600 px-[1.15rem] py-[0.55rem] no-underline block text-sm font-medium transition-colors duration-200 text-left hover:bg-[var(--primary-light)] hover:text-[var(--primary)]">
                For Experts
              </Link>
              <Link href="/#engagement-pathways" className="text-gray-600 px-[1.15rem] py-[0.55rem] no-underline block text-sm font-medium transition-colors duration-200 text-left hover:bg-[var(--primary-light)] hover:text-[var(--primary)]">
                Careers
              </Link>
            </div>
          </div>

          {/* Dynamic Pages Dropdown */}
          {navPages.filter(p => p.slug !== 'about').length > 0 && (
            <div className="group relative inline-block">
              <button className="bg-none border-none font-body text-[13px] font-semibold text-gray-800 cursor-pointer py-2 flex items-center gap-0.5 transition-colors duration-200 group-hover:text-[var(--primary)] whitespace-nowrap">
                More
                <svg className="w-2.5 h-2.5 text-gray-400 transition-transform duration-200 group-hover:rotate-180 group-hover:text-[var(--primary)] shrink-0" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="opacity-0 invisible absolute top-full left-1/2 -translate-x-1/2 translate-y-2.5 bg-white min-w-[170px] shadow-[0_10px_25px_rgba(0,0,0,0.08)] border border-gray-150 rounded-xl py-2 z-[200] transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
                {navPages.filter(p => p.slug !== 'about').map((page) => (
                  <Link
                    key={page.id}
                    href={`/${page.slug}`}
                    className={`text-gray-600 px-[1.15rem] py-[0.55rem] no-underline block text-sm font-medium transition-colors duration-200 text-left hover:bg-[var(--primary-light)] hover:text-[var(--primary)] ${activeSlug === page.slug ? 'text-[var(--primary)] bg-[var(--primary-light)] font-semibold' : ''}`}
                  >
                    {page.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </nav>

        <div className="flex items-center gap-3 shrink-0 max-[860px]:order-2">
          {user && 'email' in user ? (
            <a
              href={payloadConfig.routes.admin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted text-[0.85rem] mr-1 hover:text-[var(--primary)] transition-colors duration-200"
            >
              {user.email.split('@')[0]} ↗
            </a>
          ) : null}
          
          <button className="btn btn-primary" data-coming-soon>
            Apply for a Grant
          </button>
        </div>
      </div>
    </header>
  )
}
