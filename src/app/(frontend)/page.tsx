import { getPayload } from 'payload'
import React from 'react'
import Link from 'next/link'
import { getImageUrl } from '@/utils/imageUrl'

import config from '@/payload.config'
import { Header } from '@/components/Header'
import './styles.css'

// Helper to extract plain text preview from Lexical Editor JSON state
const getPreviewText = (richText: any) => {
  if (!richText) return ''
  try {
    if (typeof richText === 'string') return richText
    const root = richText.root
    if (root && root.children) {
      return root.children
        .map((child: any) => {
          if (child.children) {
            return child.children.map((c: any) => c.text || '').join('')
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

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Fetch portfolios dynamically from Payload Local API
  const portfolioData = await payload.find({
    collection: 'portfolios',
    depth: 1,
    limit: 100,
    sort: '-createdAt',
  })
  const portfolios = portfolioData.docs
  // Fetch blogs dynamically
  const blogData = await payload.find({
    collection: 'blogs',
    depth: 1,
    limit: 100,
    sort: '-createdAt',
  })
  const blogs = blogData.docs

  return (
    <div className="container">
      <Header />

      <main className="main">
        <section className="hero">
          <h1>Venture Philanthropy Portfolio</h1>
          <p>
            An interactive showcase of technology-led innovations funded to accelerate social impact across India. 
            All items below are managed in real-time using **Payload CMS**.
          </p>
        </section>

        <section className="portfolio-section">
          <h2>Current Portfolio ({portfolios.length})</h2>
          {portfolios.length === 0 ? (
            <div className="empty-state">
              <p>No portfolio items found in the database.</p>
              <a
                className="btn btn-secondary"
                href={payloadConfig.routes.admin}
                target="_blank"
                rel="noopener noreferrer"
              >
                Add Your First Portfolio Item
              </a>
            </div>
          ) : (
            <div className="grid">
              {portfolios.map((item) => {
                const sectorLabel = {
                  health: 'Health',
                  education: 'Education',
                  environment: 'Environment',
                }[item.sectors] || item.sectors

                const formattedFunding = item.fundingAmount
                  ? new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      maximumFractionDigits: 0,
                    }).format(item.fundingAmount)
                  : null

                // Resolve logo URL
                const defaultImage = {
                  health: 'healthcare.png',
                  education: 'education.png',
                  environment: 'environment.png',
                }[item.sectors] || 'logo.png'

                const logoUrl = getImageUrl(item.logo, defaultImage)

                return (
                  <div key={item.id} className="card">
                    {logoUrl && (
                      <div className="card-image-wrapper">
                        <img src={logoUrl} alt={`${item.name} logo`} />
                      </div>
                    )}
                    <div className="card-header">
                      <span className={`tag tag-${item.sectors}`}>{sectorLabel}</span>
                    </div>
                    <div className="card-body">
                      <h3>{item.name}</h3>
                      {formattedFunding && (
                        <div className="funding">
                          <strong>Funding: </strong> {formattedFunding}
                        </div>
                      )}
                      {item.description && (
                        <div className="description">
                          {getPreviewText(item.description)}
                        </div>
                      )}
                    </div>
                    {item.website && (
                      <div className="card-footer">
                        <a href={item.website} target="_blank" rel="noopener noreferrer">
                          Visit Website →
                        </a>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </section>

        <section className="blog-section">
          <h2>Latest Blogs ({blogs.length})</h2>
          {blogs.length === 0 ? (
            <div className="empty-state">
              <p>No blog posts found.</p>
              <a
                className="btn btn-secondary"
                href={payloadConfig.routes.admin}
                target="_blank"
                rel="noopener noreferrer"
              >
                Add a Blog Post
              </a>
            </div>
          ) : (
            <div className="grid">
              {blogs.map((post) => {
                const excerpt = post.excerpt || getPreviewText(post.content);
                const imageUrl = getImageUrl(post.featuredImage, 'collaboration.png')
                return (
                  <Link key={post.id} href={`/blogs/${post.slug}`} className="blog-card card">
                    {imageUrl && (
                      <div className="card-image-wrapper">
                        <img src={imageUrl} alt={`${post.title} image`} />
                      </div>
                    )}
                    <div className="card-body">
                      <h3>{post.title}</h3>
                      {excerpt && <div className="description">{excerpt}</div>}
                    </div>
                    <div className="blog-card-footer">
                      Read Article →
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </main>

      <footer className="page-footer">
        <p>Built with Next.js App Router & Payload CMS 3.x using SQLite.</p>
      </footer>
    </div>
  )
}
