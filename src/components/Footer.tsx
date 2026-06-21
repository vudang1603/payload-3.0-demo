import React from 'react'

export const Footer: React.FC = () => {
  return (
    <footer
      className="w-full text-[rgba(255,255,255,0.85)] text-[0.85rem]"
      style={{
        background: 'linear-gradient(to right, #1A237E 0%, #4A148C 50%, #B30B7E 100%)',
      }}
    >
      {/* Main content area */}
      <div className="max-w-[1280px] mx-auto pt-10 pb-4">
        {/* Top row: nav links + social icons */}
        <div className="px-16 max-[640px]:px-6 flex flex-col items-start gap-5 md:flex-row md:justify-between md:items-center mb-6">
          <nav className="flex flex-wrap gap-4 md:gap-7">
            <button
              className="bg-none border-none text-white font-title text-sm font-bold cursor-pointer p-0 no-underline transition-opacity duration-200 hover:opacity-80 text-left"
              data-coming-soon
            >
              Careers
            </button>
            <button
              className="bg-none border-none text-white font-title text-sm font-bold cursor-pointer p-0 no-underline transition-opacity duration-200 hover:opacity-80 text-left"
              data-coming-soon
            >
              Contact Us
            </button>
            <button
              className="bg-none border-none text-white font-title text-sm font-bold cursor-pointer p-0 no-underline transition-opacity duration-200 hover:opacity-80 text-left"
              data-coming-soon
            >
              Privacy Policy
            </button>
            <button
              className="bg-none border-none text-white font-title text-sm font-bold cursor-pointer p-0 no-underline transition-opacity duration-200 hover:opacity-80 text-left"
              data-coming-soon
            >
              Disclosures &amp; CSR Policy
            </button>
          </nav>

          <div className="flex gap-2.5">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/act-grants/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-[30px] h-[30px] rounded-full border border-[rgba(255,255,255,0.6)] text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-[#1A237E] hover:border-white"
              aria-label="LinkedIn"
            >
              <svg viewBox="0 0 24 24" className="w-[15px] h-[15px]">
                <path
                  fill="currentColor"
                  d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                />
              </svg>
            </a>
            {/* X (Twitter) */}
            <a
              href="https://x.com/actgrants"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-[30px] h-[30px] rounded-full border border-[rgba(255,255,255,0.6)] text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-[#1A237E] hover:border-white"
              aria-label="X (Twitter)"
            >
              <svg viewBox="0 0 24 24" className="w-[15px] h-[15px]">
                <path
                  fill="currentColor"
                  d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                />
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="https://www.instagram.com/actgrants/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-[30px] h-[30px] rounded-full border border-[rgba(255,255,255,0.6)] text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-[#1A237E] hover:border-white"
              aria-label="Instagram"
            >
              <svg viewBox="0 0 24 24" className="w-[15px] h-[15px]">
                <path
                  fill="currentColor"
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                />
              </svg>
            </a>
            {/* Spotify */}
            <a
              href="https://open.spotify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-[30px] h-[30px] rounded-full border border-[rgba(255,255,255,0.6)] text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-[#1A237E] hover:border-white"
              aria-label="Spotify"
            >
              <svg viewBox="0 0 24 24" className="w-[15px] h-[15px]">
                <path
                  fill="currentColor"
                  d="M12.012 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.5 17.3c-.2.3-.6.4-.9.2-2.4-1.5-5.5-1.8-9.1-1-.4.1-.7-.2-.8-.6s.2-.7.6-.8c3.9-.9 7.4-.5 10 1.1.3.1.4.6.2.9zm1.5-3.3c-.3.4-.8.5-1.1.3-2.8-1.7-7-2.2-10.2-1.2-.5.1-1-.1-1.2-.6s.1-1 .6-1.2c3.7-1.1 8.3-.6 11.6 1.4.4.3.5.9.3 1.3zm.1-3.4c-.3.5-1 .6-1.5.3-3.2-1.9-8.6-2.1-11.7-1.2-.6.2-1.2-.2-1.4-.8s.2-1.2.8-1.4c3.7-1.1 9.7-.9 13.5 1.4.5.3.7 1 .3 1.7z"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Legal disclaimer */}
        <div className="px-16 max-[640px]:px-6 mb-6">
          <p className="text-[0.8rem] leading-[1.65] text-[rgba(255,255,255,0.7)] font-normal font-body max-w-4xl">
            ACT Capital Foundation For Social Impact is a not-for-profit company incorporated and
            registered under Section 8 of the Companies Act, 2013 (CIN: U85300KA2021NPL148543). All
            donations made to ACT Capital Foundation are eligible for income tax deduction under
            Section 80G of the Income Tax Act.
          </p>
        </div>
      </div>

      {/* Bottom bar with logo + copyright */}
      <div className="border-t border-[rgba(255,255,255,0.15)]">
        <div className="max-w-[1280px] mx-auto py-4">
          <div className="px-16 max-[640px]:px-6 flex items-center gap-5 max-[640px]:flex-col max-[640px]:text-center">
          {/* Copyright text */}
          <p className="font-title text-[0.8rem] font-semibold text-[rgba(255,255,255,0.75)] tracking-wide">
            ACT Capital Foundation For Social Impact &copy; 2026 | All Rights Reserved
          </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
