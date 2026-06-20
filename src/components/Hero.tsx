import React from 'react'
import Link from 'next/link'
import { getImageUrl } from '@/utils/imageUrl'

type HeroProps = {
  title: string
  subtitle?: string
  backgroundImage?: any
  ctaText?: string
  ctaLink?: string
}

export const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  backgroundImage,
  ctaText,
  ctaLink,
}) => {
  const imageUrl = getImageUrl(backgroundImage, 'collaboration.png')

  const sectionStyle = imageUrl
    ? { backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.75)), url(${imageUrl})` }
    : {}

  return (
    <section className="hero-block" style={sectionStyle}>
      <div className="hero-block-content">
        <h1>{title}</h1>
        {subtitle && <p className="hero-subtitle">{subtitle}</p>}
        {ctaText && ctaLink && (
          <div className="hero-cta">
            <Link className="btn btn-primary btn-large" href={ctaLink}>
              {ctaText}
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
