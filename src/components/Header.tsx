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
    <header className="header">
      <div className="logo-section">
        <Link href="/" className="brand-logo" style={{ textDecoration: 'none' }}>
          <img src="https://actgrants.in/wp-content/themes/act/images/logo.png" alt="ACT logo" className="logo-image" />
        </Link>
        <span className="badge">CMS Demo</span>
      </div>

      <nav className="nav-menu">
        <Link href="/" className={`nav-link ${!activeSlug ? 'active' : ''}`}>
          Home
        </Link>
        <a href="/#about" className="nav-link">
          About ACT
        </a>
        <a href="/#focus-areas" className="nav-link">
          Focus Areas
        </a>
        <a href="/#portfolio" className="nav-link">
          Our Work
        </a>
        <a href="/#engagement-pathways" className="nav-link">
          Engagement
        </a>
        <Link href="/blogs" className={`nav-link ${activeSlug === 'blogs' ? 'active' : ''}`}>
          Insights
        </Link>
        {navPages.length > 0 && (
          <div className="nav-dropdown">
            <button className="nav-dropdown-trigger">
              Pages <span className="arrow">▼</span>
            </button>
            <div className="nav-dropdown-content">
              {navPages.map((page) => (
                <Link
                  key={page.id}
                  href={`/${page.slug}`}
                  className={activeSlug === page.slug ? 'active' : ''}
                >
                  {page.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      <div className="auth-section">
        {user && 'email' in user ? (
          <span className="welcome-text" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Hello, {user.email.split('@')[0]}
          </span>
        ) : null}
        
        <button className="btn btn-primary" data-coming-soon>
          Apply for a Grant
        </button>

        <a
          className="btn btn-secondary"
          href={payloadConfig.routes.admin}
          target="_blank"
          rel="noopener noreferrer"
        >
          Admin
        </a>
      </div>
    </header>
  )
}
