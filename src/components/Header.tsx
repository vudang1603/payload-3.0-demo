import { headers as getHeaders } from 'next/headers'
import { getPayload } from 'payload'
import React from 'react'
import Link from 'next/link'
import config from '@/payload.config'
import { HeaderMobileMenu } from '@/components/HeaderMobileMenu'
import { NAV_SECTIONS, type NavItem } from '@/components/navConfig'

// Render a dropdown entry (link or coming-soon button). Child items get a
// branch connector so the parent→child relationship is visually obvious.
const renderDropdownItem = (item: NavItem, isChild = false) => {
  const interaction =
    'py-[0.55rem] text-sm font-medium transition-colors duration-200 text-left hover:bg-[var(--primary-light)] hover:text-[var(--primary)]'
  const layout = isChild
    ? 'flex items-center gap-2 pl-3 pr-[1.15rem] text-[13px] text-gray-500'
    : 'block px-[1.15rem] text-gray-600'
  const content = isChild ? (
    <>
      <span className="h-px w-2.5 shrink-0 bg-[#CBD3E6]" aria-hidden="true" />
      {item.label}
    </>
  ) : (
    item.label
  )
  return item.comingSoon ? (
    <button
      key={item.label}
      data-coming-soon
      className={`w-full bg-transparent border-0 cursor-pointer ${layout} ${interaction}`}
    >
      {content}
    </button>
  ) : (
    <Link key={item.label} href={item.href!} className={`no-underline ${layout} ${interaction}`}>
      {content}
    </Link>
  )
}

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
      <div className="max-w-[1280px] mx-auto px-6 py-3.5 flex justify-between items-center max-[860px]:gap-4 max-[860px]:py-4 overflow-visible">
        {/* Logo container with White rounded rectangle overlapping effect */}
        <div className="flex items-center gap-2 shrink-0 relative">
          <div className="relative z-50 mr-1 max-[860px]:mr-0">
            <Link href="/" className="absolute top-[-10px] left-0 bg-white rounded-2xl p-[3px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] border border-gray-200/40 flex items-center justify-center transition-transform duration-200 hover:scale-[1.03] w-[96px] h-[96px]">
              <img src="/images/logo.png" alt="ACT logo" className="h-[84px] w-[84px] object-contain" />
            </Link>
            {/* Dummy spacer to hold horizontal place for the overlapping absolute element */}
            <div className="w-[96px] h-[50px]" />
          </div>
        </div>

        <nav className="flex items-center gap-[1.25rem] transition-all duration-300 max-[1140px]:gap-[0.95rem] max-[980px]:gap-[0.6rem] max-[860px]:hidden">
          {NAV_SECTIONS.map((section) => (
            <div key={section.label} className="group relative inline-block">
              <Link
                href={section.href}
                className="no-underline text-[13px] font-semibold text-gray-800 transition-colors duration-200 py-2 flex items-center gap-0.5 hover:text-[var(--primary)] whitespace-nowrap"
              >
                {section.label}
                <svg className="w-2.5 h-2.5 text-gray-400 transition-transform duration-200 group-hover:rotate-180 group-hover:text-[var(--primary)] shrink-0" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              <div className="opacity-0 invisible absolute top-full left-1/2 -translate-x-1/2 translate-y-2.5 bg-white min-w-[210px] max-w-[280px] shadow-[0_10px_25px_rgba(0,0,0,0.08)] border border-gray-150 rounded-xl py-2 z-[200] transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
                {section.items.map((item) => (
                  <React.Fragment key={item.label}>
                    {renderDropdownItem(item)}
                    {item.children && item.children.length > 0 && (
                      <div className="ml-[1.5rem] border-l border-[#E2E8F0]">
                        {item.children.map((child) => renderDropdownItem(child, true))}
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}

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

        <div className="flex items-center gap-3 shrink-0 max-[860px]:hidden">
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

        {/* Mobile hamburger menu (visible below 860px) */}
        <HeaderMobileMenu pages={navPages} />
      </div>
    </header>
  )
}
