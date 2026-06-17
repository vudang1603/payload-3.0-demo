import { getPayload } from 'payload';
import React from 'react';
import config from '@/payload.config';
import { getImageUrl } from '@/utils/imageUrl';
import { Header } from '@/components/Header';
import { RichText } from '@/components/RichText';
import '../../styles.css';

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

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
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
    return (
      <div className="container">
        <Header activeSlug="blogs" />
        <p>Blog post not found.</p>
      </div>
    );
  }

  const imageUrl = getImageUrl(blog.featuredImage, 'collaboration.png');

  return (
    <div className="container">
      <Header activeSlug="blogs" />
      <main className="main">
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
      </main>
    </div>
  );
}
