import React from 'react'

type BannerProps = {
  content: string
  bannerType: 'info' | 'warning' | 'success'
  link?: string
}

export const Banner: React.FC<BannerProps> = ({ content, bannerType, link }) => {
  const bannerContent = (
    <div className={`banner-block banner-block-${bannerType}`}>
      <span className="banner-icon">
        {bannerType === 'info' && 'ℹ️'}
        {bannerType === 'warning' && '⚠️'}
        {bannerType === 'success' && '✅'}
      </span>
      <p className="banner-message">{content}</p>
      {link && <span className="banner-arrow">→</span>}
    </div>
  )

  if (link) {
    return (
      <a href={link} className="banner-link-wrapper">
        {bannerContent}
      </a>
    )
  }

  return bannerContent
}
