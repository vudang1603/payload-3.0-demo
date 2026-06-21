import { getPayload } from 'payload';
import React, { Suspense } from 'react';
import config from '@/payload.config';
import { getImageUrl } from '@/utils/imageUrl';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { RichText } from '@/components/RichText';

async function BlogContent({ slug }: { slug: string }) {
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });

  const blogResult = await payload.find({
    collection: 'blogs',
    where: { slug: { equals: slug } },
    depth: 1,
    limit: 1,
  });

  const blog = blogResult.docs[0];

  if (!blog) {
    return <p>Blog post not found.</p>;
  }

  const imageUrl = getImageUrl(blog.featuredImage, 'collaboration.png');

  return (
    <section className="blog-detail-section">
      <h1>{blog.title}</h1>
      {imageUrl && (
        <div className="blog-image">
          <img src={imageUrl} alt={blog.title} style={{ maxWidth: '100%', borderRadius: '8px' }} />
        </div>
      )}
      <div className="blog-content" style={{ marginTop: '1rem' }}>
        <RichText content={blog.content} />
      </div>
    </section>
  );
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <div className="min-h-screen flex flex-col bg-white w-full">
      <Header activeSlug="blogs" />
      <main className="main flex-grow container mx-auto px-6 py-10">
        <Suspense fallback={
          <section className="blog-detail-section">
            {/* Title Placeholder */}
            <div className="skeleton-title skeleton-shimmer" />
            
            {/* Image Placeholder */}
            <div className="skeleton-image skeleton-shimmer" />
            
            {/* Text Paragraph placeholders */}
            <div style={{ marginTop: '1.5rem' }}>
              <div className="skeleton-text skeleton-shimmer" />
              <div className="skeleton-text skeleton-shimmer" />
              <div className="skeleton-text skeleton-shimmer medium" />
              <br />
              <div className="skeleton-text skeleton-shimmer" />
              <div className="skeleton-text skeleton-shimmer medium" />
              <div className="skeleton-text skeleton-shimmer short" />
            </div>
          </section>
        }>
          <BlogContent slug={slug} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
