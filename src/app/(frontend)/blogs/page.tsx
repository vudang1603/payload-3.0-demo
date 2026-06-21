import { getPayload } from 'payload';
import React, { Suspense } from 'react';
import Link from 'next/link';
import config from '@/payload.config';
import { getImageUrl } from '@/utils/imageUrl';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

// Helper to extract plain text preview from Lexical Editor JSON state
const getPreviewText = (richText: any) => {
  if (!richText) return '';
  try {
    if (typeof richText === 'string') return richText;
    const root = richText.root;
    if (root && root.children) {
      return root.children
        .map((child: any) => {
          if (child.children) {
            return child.children.map((c: any) => c.text || '').join('');
          }
          return '';
        })
        .join(' ');
    }
  } catch (e) {
    // ignore
  }
  return 'View details in CMS';
};

async function BlogsContent() {
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });

  const blogData = await payload.find({
    collection: 'blogs',
    depth: 1,
    limit: 100,
    sort: '-createdAt',
  });
  const blogs = blogData.docs;

  return (
    <section className="blog-section">
      <div className="section-title-wrapper">
        <h2>All Articles <span style={{ color: 'var(--text-muted)', fontWeight: 400, fontSize: '1.25rem' }}>({blogs.length})</span></h2>
        <p className="section-subtitle">Browse our latest thinking, portfolio stories, and grant announcements.</p>
      </div>
      {blogs.length === 0 ? (
        <div className="empty-state">
          <p>No blog posts found. Add posts via the <Link href="/admin" className="btn btn-primary" style={{ display: 'inline-block', marginTop: '1rem' }}>CMS Admin Panel</Link>.</p>
        </div>
      ) : (
        <div className="grid">
          {blogs.map((post) => {
            const excerpt = post.excerpt || getPreviewText(post.content);
            const imageUrl = getImageUrl(post.featuredImage, 'collaboration.png');
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
  );
}

export default async function BlogsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white w-full">
      <Header activeSlug="blogs" />
      <main className="main flex-grow container mx-auto px-6 py-10">

        {/* Page Hero Banner */}
        <section
          className="hero-block"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.75)), url('https://actgrants.in/wp-content/uploads/2023/09/Home.jpg')`,
            minHeight: '280px',
            paddingTop: '3rem',
            paddingBottom: '3rem',
          }}
        >
          <div className="hero-block-content" style={{ textAlign: 'center' }}>
            <div className="badge" style={{ margin: '0 auto 1rem auto', display: 'inline-flex' }}>
              Insights &amp; Updates
            </div>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>Our Blog</h1>
            <p className="hero-subtitle" style={{ maxWidth: '580px', margin: '0 auto' }}>
              Updates, announcements, research, and stories from the ACT Grants team and community.
            </p>
          </div>
        </section>

        {/* Dynamic content inside Suspense to trigger instant loading skeleton */}
        <Suspense fallback={
          <section className="blog-section">
            <div className="section-title-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem' }}>
              <div className="skeleton-title skeleton-shimmer" style={{ width: '250px', height: '2rem', marginBottom: '0.75rem' }} />
              <div className="skeleton-text skeleton-shimmer" style={{ width: '380px', height: '0.9rem' }} />
            </div>

            <div className="grid">
              {[1, 2, 3].map((i) => (
                <div key={i} className="skeleton-card">
                  <div className="skeleton-card-img skeleton-shimmer" />
                  <div className="skeleton-card-body">
                    <div className="skeleton-card-title skeleton-shimmer" />
                    <div className="skeleton-card-desc skeleton-shimmer" />
                    <div className="skeleton-card-desc skeleton-shimmer" style={{ width: '70%' }} />
                  </div>
                  <div className="skeleton-card-footer">
                    <div className="skeleton-card-button skeleton-shimmer" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        }>
          <BlogsContent />
        </Suspense>

      </main>

      <Footer />
    </div>
  );
}
