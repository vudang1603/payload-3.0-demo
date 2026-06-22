'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { NAV_SECTIONS, type NavItem } from '@/components/navConfig'

type NavPage = { id: string | number; slug: string; title: string }

export const HeaderMobileMenu: React.FC<{ pages?: NavPage[] }> = ({ pages = [] }) => {
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)

  const close = () => {
    setOpen(false)
    setExpanded(null)
  }

  const toggleSection = (label: string) => {
    setExpanded((prev) => (prev === label ? null : label))
  }

  const extraPages = pages.filter((p) => p.slug !== 'about')

  const subItemClass =
    'w-full block text-left px-6 py-2.5 text-sm font-medium text-gray-500 no-underline bg-transparent border-0 cursor-pointer hover:text-[var(--primary)] hover:bg-[var(--primary-light)] transition-colors duration-200'
  const childItemClass =
    'w-full flex items-center gap-2 text-left pl-4 pr-6 py-2.5 text-sm font-medium text-gray-500 no-underline bg-transparent border-0 cursor-pointer hover:text-[var(--primary)] hover:bg-[var(--primary-light)] transition-colors duration-200'

  const renderSubItem = (item: NavItem, isChild = false) => {
    const cls = isChild ? childItemClass : subItemClass
    const content = isChild ? (
      <>
        <span className="h-px w-3 shrink-0 bg-[#CBD3E6]" aria-hidden="true" />
        {item.label}
      </>
    ) : (
      item.label
    )
    return item.comingSoon ? (
      <button key={item.label} data-coming-soon onClick={close} className={cls}>
        {content}
      </button>
    ) : (
      <Link key={item.label} href={item.href!} onClick={close} className={cls}>
        {content}
      </Link>
    )
  }

  return (
    <div className="hidden max-[860px]:flex items-center">
      <button
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-center w-10 h-10 rounded-lg text-gray-800 hover:text-[var(--primary)] hover:bg-gray-50 transition-colors duration-200"
      >
        {open ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {open && (
        <>
          {/* Slide-down panel */}
          <div className="absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-[0_12px_30px_rgba(0,0,0,0.10)] z-[200] max-h-[80vh] overflow-y-auto">
            <nav className="flex flex-col py-2">
              {NAV_SECTIONS.map((section) => {
                const isOpen = expanded === section.label
                return (
                  <div key={section.label} className="border-b border-gray-50 last:border-b-0">
                    <button
                      type="button"
                      onClick={() => toggleSection(section.label)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between px-6 py-3.5 text-left text-[15px] font-semibold text-gray-800 hover:text-[var(--primary)] transition-colors duration-200"
                    >
                      {section.label}
                      <svg
                        className={`w-3.5 h-3.5 text-gray-400 shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {isOpen && (
                      <div className="flex flex-col pb-2">
                        {section.items.map((item) => (
                          <React.Fragment key={item.label}>
                            {renderSubItem(item)}
                            {item.children && item.children.length > 0 && (
                              <div className="ml-8 border-l border-gray-200">
                                {item.children.map((child) => renderSubItem(child, true))}
                              </div>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}

              {extraPages.length > 0 && (
                <div className="border-t border-gray-100 pt-1">
                  {extraPages.map((page) => (
                    <Link
                      key={page.id}
                      href={`/${page.slug}`}
                      onClick={close}
                      className="block px-6 py-3.5 text-[15px] font-semibold text-gray-800 no-underline hover:text-[var(--primary)] transition-colors duration-200"
                    >
                      {page.title}
                    </Link>
                  ))}
                </div>
              )}
            </nav>

            <div className="p-5 border-t border-gray-100">
              <button className="btn btn-primary w-full" data-coming-soon onClick={close}>
                Apply for a Grant
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
