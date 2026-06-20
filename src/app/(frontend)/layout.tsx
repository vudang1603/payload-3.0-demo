import React from 'react'
import NextTopLoader from 'nextjs-toploader'
import { ComingSoonModal } from '@/components/ComingSoonModal'
import './styles.css'

export const metadata = {
  description: 'ACT is a non-profit tech-led venture philanthropy platform. We deploy early-stage risk capital and strategic advisory to accelerate social impact.',
  title: 'ACT Grants - Venture Philanthropy Platform',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <NextTopLoader
          color="#B30B7E"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #B30B7E,0 0 5px #B30B7E"
        />
        <main>{children}</main>
        <ComingSoonModal />
      </body>
    </html>
  )
}

