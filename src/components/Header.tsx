import { headers as getHeaders } from 'next/headers'
import { getPayload } from 'payload'
import React from 'react'
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
        <a href="/" className="brand-logo" style={{ textDecoration: 'none' }}>
          ACT 3.0
        </a>
        <span className="badge">Headless CMS Demo</span>
      </div>

      <nav className="nav-menu">
        <a href="/" className={`nav-link ${!activeSlug ? 'active' : ''}`}>
          Home
        </a>
        <a href="/blogs" className={`nav-link ${activeSlug === 'blogs' ? 'active' : ''}`}>
          Blogs
        </a>
        {navPages.map((page) => (
          <a
            key={page.id}
            href={`/${page.slug}`}
            className={`nav-link ${activeSlug === page.slug ? 'active' : ''}`}
          >
            {page.title}
          </a>
        ))}
      </nav>

      <div className="auth-section">
        {user && 'email' in user ? (
          <span className="welcome-text" style={{ marginRight: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Hello, {user.email}
          </span>
        ) : null}
        <a
          className="btn btn-primary"
          href={payloadConfig.routes.admin}
          target="_blank"
          rel="noopener noreferrer"
        >
          Go to Admin Panel
        </a>
      </div>
    </header>
  )
}
