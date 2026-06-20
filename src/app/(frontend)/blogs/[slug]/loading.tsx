import React from 'react';
import { Header } from '@/components/Header';
import '../../styles.css';

export default function Loading() {
  return (
    <div className="container">
      <Header activeSlug="blogs" />
      <main className="main">
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
      </main>
    </div>
  );
}
