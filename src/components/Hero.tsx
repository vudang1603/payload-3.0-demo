import React from 'react'
import Link from 'next/link'

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
  const imageUrl =
    backgroundImage && typeof backgroundImage === 'object' && 'url' in backgroundImage
      ? backgroundImage.url
      : null

  const sectionStyle = imageUrl
    ? { backgroundImage: `linear-gradient(rgba(9, 9, 11, 0.85), rgba(9, 9, 11, 0.98)), url(${imageUrl})` }
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
