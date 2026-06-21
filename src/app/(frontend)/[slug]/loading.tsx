import React from 'react';
import { Header } from '@/components/Header';

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col bg-white w-full">
      <Header />
      <main className="main flex-grow container mx-auto px-6 py-10" style={{ padding: '2rem 0' }}>
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
