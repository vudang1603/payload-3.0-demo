import React from 'react';
import { Header } from '@/components/Header';
import '../styles.css';

export default function Loading() {
  return (
    <div className="container">
      <Header activeSlug="blogs" />
      <main className="main">
        {/* Skeleton Hero Banner */}
        <section
          className="hero-block skeleton-shimmer"
          style={{
            minHeight: '280px',
            borderRadius: '12px',
            marginBottom: '3rem',
          }}
        />

        {/* Skeleton Blog Section */}
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
      </main>
    </div>
  );
}
