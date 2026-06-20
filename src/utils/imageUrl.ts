/**
 * Utility to resolve image URLs for Payload CMS Media fields.
 * If running on Netlify/Vercel (serverless) and without Cloud Storage,
 * it returns the static file served from Next.js public/images/ folder.
 */
const getLiveUrl = (filename: string): string => {
  const clean = filename.toLowerCase().replace(/-[0-9]+(?=\.[a-z0-9]+$)/i, '').trim();
  const map: Record<string, string> = {
    'education.png': 'https://actgrants.in/wp-content/uploads/2023/07/ACT-For-Education-4.jpg',
    'environment.png': 'https://actgrants.in/wp-content/uploads/2023/08/ACT-For-Environment.png',
    'healthcare.png': 'https://actgrants.in/wp-content/uploads/2023/07/Health_slider.png',
    'collaboration.png': 'https://actgrants.in/wp-content/uploads/2023/07/ACT-For-Women-1-2.jpg',
    'act-logo.png': 'https://actgrants.in/wp-content/themes/act/images/logo.png',
    'logo.png': 'https://actgrants.in/wp-content/themes/act/images/logo.png',
    'hero-home.jpg': 'https://actgrants.in/wp-content/uploads/2023/09/Home.jpg',
    'home.jpg': 'https://actgrants.in/wp-content/uploads/2023/09/Home.jpg',
    'education_icon.png': 'https://actgrants.in/wp-content/uploads/2023/06/Education_icon.png',
    'environment_icon.png': 'https://actgrants.in/wp-content/uploads/2023/06/Environment_icon.png',
    'healthcare_icon.png': 'https://actgrants.in/wp-content/uploads/2023/06/HealthCare_Icon.png',
    'women_icon.png': 'https://actgrants.in/wp-content/uploads/2023/06/Women_Icon.png',
    'boy.gif': 'https://actgrants.in/wp-content/uploads/2023/06/Boy.gif',
    'globe.gif': 'https://actgrants.in/wp-content/uploads/2023/06/Globe.gif',
    'heart.gif': 'https://actgrants.in/wp-content/uploads/2023/06/Heart.gif',
    'gender.gif': 'https://actgrants.in/wp-content/uploads/2023/06/Gender.gif',
    'focus-bg.png': 'https://actgrants.in/wp-content/themes/act/images/col-1-BG.png',
  };
  return map[clean] || `/images/${clean}`;
};

export const getImageUrl = (image: any, defaultFallback?: string): string | null => {
  if (!image) {
    return defaultFallback ? getLiveUrl(defaultFallback) : null;
  }

  // If the image is a string (could be an ID or direct URL)
  if (typeof image === 'string') {
    if (image.startsWith('http://') || image.startsWith('https://')) {
      return image;
    }
    return defaultFallback ? getLiveUrl(defaultFallback) : null;
  }

  // If the image is an object
  if (typeof image === 'object') {
    // Zero-migration workaround: use alt field as external URL container if it is a URL
    if ('alt' in image && typeof image.alt === 'string' && (image.alt.startsWith('http://') || image.alt.startsWith('https://'))) {
      return image.alt;
    }
    // Return externalUrl directly if provided (for backward compatibility)
    if ('externalUrl' in image && image.externalUrl) {
      return image.externalUrl;
    }
    if ('filename' in image && image.filename) {
      return getLiveUrl(image.filename);
    }
    if ('url' in image && image.url) {
      const parts = image.url.split('/');
      const filename = parts[parts.length - 1];
      return getLiveUrl(filename);
    }
  }

  return defaultFallback ? getLiveUrl(defaultFallback) : null;
};
