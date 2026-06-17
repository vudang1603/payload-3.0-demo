/**
 * Utility to resolve image URLs for Payload CMS Media fields.
 * If running on Netlify/Vercel (serverless) and without Cloud Storage,
 * it returns the static file served from Next.js public/images/ folder.
 */
export const getImageUrl = (image: any, defaultFallback?: string): string | null => {
  if (!image) {
    return defaultFallback ? `/images/${defaultFallback}` : null;
  }

  // If the image is a string (ID), we cannot resolve the filename directly,
  // so we fallback to a default image.
  if (typeof image === 'string') {
    return defaultFallback ? `/images/${defaultFallback}` : null;
  }

  // If the image is an object
  if (typeof image === 'object') {
    if ('filename' in image && image.filename) {
      return `/images/${image.filename}`;
    }
    if ('url' in image && image.url) {
      const parts = image.url.split('/');
      const filename = parts[parts.length - 1];
      return `/images/${filename}`;
    }
  }

  return defaultFallback ? `/images/${defaultFallback}` : null;
};
