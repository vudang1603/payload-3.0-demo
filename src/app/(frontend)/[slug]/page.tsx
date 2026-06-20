import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import React, { Suspense } from 'react'

import config from '@/payload.config'
import { Hero } from '@/components/Hero'
import { Banner } from '@/components/Banner'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import '../styles.css'

async function DynamicPageContent({ slug, adminRoute }: { slug: string; adminRoute: string }) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Query pages collection in Payload by slug
  const pageResult = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
    depth: 2,
  })

  const page = pageResult.docs[0]

  if (!page) {
    return notFound()
  }

  return (
    <>
      {page.layout && page.layout.length > 0 ? (
        page.layout.map((block: any, index: number) => {
          switch (block.blockType) {
            case 'hero':
              return (
                <Hero
                  key={index}
                  title={block.title}
                  subtitle={block.subtitle}
                  backgroundImage={block.backgroundImage}
                  ctaText={block.ctaText}
                  ctaLink={block.ctaLink}
                />
              )
            case 'banner':
              return (
                <Banner
                  key={index}
                  content={block.content}
                  bannerType={block.bannerType}
                  link={block.link}
                />
              )
            default:
              return (
                <div key={index} className="badge" style={{ margin: '1rem 0', display: 'block' }}>
                  Unsupported Block Type: {block.blockType}
                </div>
              )
          }
        })
      ) : (
        <div className="empty-state">
          <p>This page has no blocks in its layout yet.</p>
          <a
            className="btn btn-primary"
            href={`${adminRoute}/collections/pages/${page.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Add Blocks in CMS
          </a>
        </div>
      )}
    </>
  )
}

export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payloadConfig = await config

  return (
    <div className="container">
      <Header activeSlug={slug} />

      <main className="main" style={{ padding: '2rem 0' }}>
        <Suspense fallback={
          <>
            {/* Skeleton Hero Layout */}
            <section
              className="hero-block skeleton-shimmer"
              style={{
                minHeight: '380px',
                borderRadius: '12px',
                marginBottom: '2rem',
              }}
            />
            
            {/* Skeleton Banner Layout */}
            <div
              className="skeleton-shimmer"
              style={{
                height: '80px',
                borderRadius: '8px',
                width: '100%',
              }}
            />
          </>
        }>
          <DynamicPageContent slug={slug} adminRoute={payloadConfig.routes.admin} />
        </Suspense>
      </main>

      <Footer />
    </div>
  )
}
