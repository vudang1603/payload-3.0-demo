import { getPayload } from 'payload';
import React, { Suspense } from 'react';
import Link from 'next/link';
import { getImageUrl } from '@/utils/imageUrl';

import config from '@/payload.config';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { InteractivePortfolio } from '@/components/InteractivePortfolio';
import { InteractivePathways } from '@/components/InteractivePathways';
import './styles.css';

interface LexicalTextNode {
  text?: string;
  [key: string]: unknown;
}

interface LexicalChildNode {
  children?: LexicalTextNode[];
  [key: string]: unknown;
}

interface LexicalRichText {
  root?: {
    children?: LexicalChildNode[];
  };
}

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  content?: unknown;
  featuredImage?: unknown;
}

// Helper to extract plain text preview from Lexical Editor JSON state
const getPreviewText = (richText: unknown): string => {
  if (!richText) return '';
  try {
    if (typeof richText === 'string') return richText;
    
    const lexicalJson = richText as LexicalRichText;
    const root = lexicalJson.root;
    if (root && root.children) {
      return root.children
        .map((child) => {
          if (child.children) {
            return child.children.map((c) => c.text || '').join('');
          }
          return '';
        })
        .join(' ');
    }
  } catch (e) {
    // Ignore error
  }
  return 'View details in CMS';
};

// Component to dynamically load and render Portfolios
async function DynamicPortfolios() {
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });

  const portfolioData = await payload.find({
    collection: 'portfolios',
    depth: 1,
    limit: 100,
    sort: '-createdAt',
  });
  const portfolios = portfolioData.docs;

  return <InteractivePortfolio initialPortfolios={portfolios as any} />;
}

// Component to dynamically load and render Blogs
async function DynamicBlogs() {
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });

  const blogData = await payload.find({
    collection: 'blogs',
    depth: 1,
    limit: 100,
    sort: '-createdAt',
  });
  const blogs = blogData.docs as unknown as BlogPost[];

  return (
    <section className="blog-section">
      <div className="section-title-wrapper">
        <h2>Latest <span style={{ color: 'var(--primary)' }}>insights</span></h2>
        <p className="section-subtitle">Read updates, announcements, and reports from the ACT team and community.</p>
      </div>

      {blogs.length === 0 ? (
        <div className="empty-state">
          <p>No blog posts found.</p>
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
                <div className="blog-card-footer">Read Article →</div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default async function HomePage() {
  return (
    <div className="container">
      <Header />

      <main className="main">
        {/* Redesigned Hero Section */}
        <section
          className="hero-block"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.28), rgba(0, 0, 0, 0.55)), url('https://actgrants.in/wp-content/uploads/2023/09/Home.jpg')`,
          }}
        >
          <div className="hero-block-content">
            <h1>Backing breakthrough innovations for population-scale impact in India</h1>
            <p className="hero-subtitle">
              As a non-profit tech-led venture philanthropy platform, we deploy early-stage risk capital and strategic advisory to accelerate social impact.
            </p>
            <div className="hero-ctas">
              <button className="btn btn-primary btn-large" data-coming-soon>
                Apply for a Grant
              </button>
              <a href="#portfolio" className="btn btn-outline-white btn-large">
                Explore Our Work
              </a>
            </div>
          </div>
        </section>

        {/* Section: What ACT does */}
        <section className="what-act-does-section" id="about">
          <div className="section-title-wrapper">
            <h2>What ACT <span style={{ color: 'var(--primary)' }}>does</span></h2>
            <p className="section-subtitle">
              We leverage entrepreneurial mindset, technology &amp; innovation, and collective action to solve systemic social problems at scale.
            </p>
          </div>

          <div className="grid-3-col">
            <div className="act-does-card img-bg">
              <h3>Risk Capital</h3>
              <p>
                Providing hard-to-find, early-stage risk capital to take long-term bets and additionally supporting portfolio founders &amp; mobilising follow-on capital.
              </p>
            </div>

            <div className="act-does-card">
              <div className="card-icon-wrapper">
                <img src="https://actgrants.in/wp-content/uploads/2023/06/Globe.gif" alt="Connections illustration" />
              </div>
              <h3>Connections</h3>
              <p>
                Facilitating connections and partnerships across the ecosystem between start-ups, corporate partners, non-profits, domain experts, and government.
              </p>
            </div>

            <div className="act-does-card">
              <div className="card-icon-wrapper">
                <img src="https://actgrants.in/wp-content/uploads/2023/06/Heart.gif" alt="Collectives illustration" />
              </div>
              <h3>Collectives</h3>
              <p>
                Building collaborative groups focused on solving systemic social problems in education, healthcare, environment, and women{"'"}s empowerment.
              </p>
            </div>
          </div>

          <div className="center-btn-wrapper">
            <a href="#portfolio" className="btn btn-primary">Know more</a>
          </div>
        </section>

        {/* Section: Focus areas */}
        <section className="focus-areas-section" id="focus-areas">
          <div className="section-title-wrapper">
            <h2>Focus <span style={{ color: 'var(--primary)' }}>areas</span></h2>
            <p className="section-subtitle">
              We focus our resources on sectors where tech-led innovation can drive population-scale social impact.
            </p>
          </div>

          <div className="focus-grid">
            <div className="focus-card">
              <div className="focus-card-bg" style={{ backgroundImage: `url('${getImageUrl(null, 'education.png')}')` }} />
              <span className="focus-label-vertical">Education</span>
              <div className="focus-expand-content">
                <div className="focus-tag">01 / Education</div>
                <h3 className="focus-expand-title">Education</h3>
                <p className="focus-expand-desc">Accelerating learning outcomes by leveraging technology and digital tools to reach children in India{"'"}s most underserved communities.</p>
                <div className="focus-expand-arrow">↗</div>
              </div>
            </div>

            <div className="focus-card">
              <div className="focus-card-bg" style={{ backgroundImage: `url('${getImageUrl(null, 'environment.png')}')` }} />
              <span className="focus-label-vertical">Environment</span>
              <div className="focus-expand-content">
                <div className="focus-tag">02 / Environment</div>
                <h3 className="focus-expand-title">Environment</h3>
                <p className="focus-expand-desc">Mitigating climate change, enhancing air quality, and promoting green tech solutions for a sustainable and resilient India.</p>
                <div className="focus-expand-arrow">↗</div>
              </div>
            </div>

            <div className="focus-card">
              <div className="focus-card-bg" style={{ backgroundImage: `url('${getImageUrl(null, 'healthcare.png')}')` }} />
              <span className="focus-label-vertical">Health</span>
              <div className="focus-expand-content">
                <div className="focus-tag">03 / Healthcare</div>
                <h3 className="focus-expand-title">Healthcare</h3>
                <p className="focus-expand-desc">Scaling primary healthcare access, telemedicine, and rural health infrastructure to serve millions in remote districts.</p>
                <div className="focus-expand-arrow">↗</div>
              </div>
            </div>

            <div className="focus-card">
              <div className="focus-card-bg" style={{ backgroundImage: `url('${getImageUrl(null, 'collaboration.png')}')` }} />
              <span className="focus-label-vertical">Women</span>
              <div className="focus-expand-content">
                <div className="focus-tag">04 / Women</div>
                <h3 className="focus-expand-title">Women</h3>
                <p className="focus-expand-desc">Empowering women through livelihood training, financial inclusion, and entrepreneurship for lasting social equity.</p>
                <div className="focus-expand-arrow">↗</div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: How ACT works */}
        <section className="how-act-works-section">
          <div className="section-title-wrapper">
            <h2>How ACT <span style={{ color: 'var(--primary)' }}>works</span></h2>
            <p className="section-subtitle">
              A non-profit tech-led venture philanthropy platform built on the premise that entrepreneurial mindset, technology &amp; innovation and collective action have the power to create meaningful social impact at scale.
            </p>
          </div>
          <div className="how-act-steps">
            <div className="how-step">
              <div className="step-number">1</div>
              <h4>Identify &amp; Fund</h4>
              <p>Rigorously source and select the most promising tech-led social innovations for early-stage grant funding.</p>
            </div>
            <div className="how-step">
              <div className="step-number">2</div>
              <h4>Support &amp; Advise</h4>
              <p>Provide strategic advisory, ecosystem connections, and follow-on capital to help founders scale faster.</p>
            </div>
            <div className="how-step">
              <div className="step-number">3</div>
              <h4>Scale &amp; Impact</h4>
              <p>Mobilize collective action across corporates, government, and philanthropy to amplify population-scale outcomes.</p>
            </div>
          </div>
        </section>

        {/* Dynamic Portfolio Section wrapped in Suspense */}
        <Suspense fallback={
          <section className="portfolio-proof-section" id="portfolio">
            <div className="section-title-wrapper">
              <h2>Portfolio <span style={{ color: 'var(--primary)' }}>proof</span></h2>
              <p className="section-subtitle">
                Backed by India&apos;s leading venture capitalists, startup founders, ecosystem leaders, and domain experts.
              </p>
            </div>
            <div className="skeleton-image skeleton-shimmer" style={{ height: '500px', borderRadius: '12px' }} />
          </section>
        }>
          <DynamicPortfolios />
        </Suspense>

        {/* Section: Impact */}
        <section className="impact-section">
          <div className="impact-card">
            <div className="impact-content">
              <h2 className="impact-title-main">Impact</h2>
              <p>Through flexible capital and deep ecosystem network support, we have scaled tech innovations across India{"'"}s remote and rural districts.</p>
              <div className="impact-stats-grid">
                <div className="stat-item">
                  <div className="stat-num">75+</div>
                  <div className="stat-label">Grants Deployed</div>
                </div>
                <div className="stat-item">
                  <div className="stat-num">$15M+</div>
                  <div className="stat-label">Catalytic Funding Raised</div>
                </div>
                <div className="stat-item">
                  <div className="stat-num">30M+</div>
                  <div className="stat-label">Lives Impacted</div>
                </div>
                <div className="stat-item">
                  <div className="stat-num">4</div>
                  <div className="stat-label">Focus Sectors</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Stories from the field */}
        <section className="stories-section">
          <div className="section-title-wrapper">
            <h2><span style={{ color: 'var(--primary)' }}>Stories</span> from the field</h2>
            <p className="section-subtitle">Hear directly from portfolio founders building solutions for population-scale impact.</p>
          </div>

          <div className="story-card-large">
            <div className="story-img-banner">
              <img src="https://actgrants.in/wp-content/uploads/2023/07/ACT-For-Women-1-2.jpg" alt="Collaboration banner" />
              <div className="story-banner-overlay">
                <span className="badge" style={{ background: 'var(--primary)', color: 'white', marginBottom: '0.5rem', display: 'inline-flex' }}>Seed funding</span>
                <h3>Founder{"'"}s story</h3>
              </div>
              <div className="story-nav-arrow" data-coming-soon style={{ cursor: 'pointer' }}>
                <span>→</span>
              </div>
            </div>
            <div className="story-body">
              <p className="story-quote">
                {`"`}ACT has been an instrumental partner in our journey. Beyond capital, their access to corporate advisors and policy mentorship accelerated our growth and helped us deploy learning tablets to over 100,000 students in remote rural schools.{`"`}
              </p>
              <div className="story-author">
                <img src="https://actgrants.in/wp-content/uploads/2023/06/Utsav-Kheria.png" alt="Utsav Kheria" className="author-avatar" />
                <div className="author-meta">
                  <h5>Utsav Kheria</h5>
                  <p>Co-founder, EduTech Learn</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Blogs Section wrapped in Suspense */}
        <Suspense fallback={
          <section className="blog-section">
            <div className="section-title-wrapper">
              <h2>Latest <span style={{ color: 'var(--primary)' }}>insights</span></h2>
              <p className="section-subtitle">Read updates, announcements, and reports from the ACT team and community.</p>
            </div>
            <div className="grid">
              {[1, 2, 3].map((i) => (
                <div key={i} className="skeleton-card">
                  <div className="skeleton-card-img skeleton-shimmer" />
                  <div className="skeleton-card-body">
                    <div className="skeleton-card-title skeleton-shimmer" />
                    <div className="skeleton-card-desc skeleton-shimmer" />
                  </div>
                  <div className="skeleton-card-footer">
                    <div className="skeleton-card-button skeleton-shimmer" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        }>
          <DynamicBlogs />
        </Suspense>

        {/* Section: Engagement pathways */}
        <InteractivePathways />
      </main>

      <Footer />
    </div>
  );
}