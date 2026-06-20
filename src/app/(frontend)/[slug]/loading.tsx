import React from 'react';
import { Header } from '@/components/Header';
import '../styles.css';

export default function Loading() {
  return (
    <div className="container">
      <Header />
      <main className="main" style={{ padding: '2rem 0' }}>
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
      </main>
    </div>
  );
}
