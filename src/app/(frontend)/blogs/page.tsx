import { getPayload } from 'payload';
import React from 'react';
import config from '@/payload.config';
import { Header } from '@/components/Header';
import '../styles.css';

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

export default async function BlogsPage() {
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
    <div className="container">
      <Header activeSlug="blogs" />
      <main className="main">
        <section className="blog-section">
          <h2>All Blogs ({blogs.length})</h2>
          {blogs.length === 0 ? (
            <div className="empty-state">
              <p>No blog posts found.</p>
            </div>
          ) : (
            <div className="grid">
              {blogs.map((post) => {
                const excerpt = post.excerpt || getPreviewText(post.content);
                const imageUrl =
                  post.featuredImage && typeof post.featuredImage === 'object' && 'url' in post.featuredImage
                    ? post.featuredImage.url
                    : null;
                return (
                  <a key={post.id} href={`/blogs/${post.slug}`} className="blog-card card">
                    <div className="card-header">
                      {imageUrl ? (
                        <div className="card-logo">
                          <img src={imageUrl} alt={`${post.title} image`} />
                        </div>
                      ) : (
                        <div className="card-logo-placeholder">
                          {post.title.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="card-body">
                      <h3>{post.title}</h3>
                      {excerpt && <div className="description">{excerpt}</div>}
                    </div>
                  </a>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
