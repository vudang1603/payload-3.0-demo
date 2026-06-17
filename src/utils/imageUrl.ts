/**
 * Utility to resolve image URLs for Payload CMS Media fields.
 * If running on Netlify/Vercel (serverless) and without Cloud Storage,
 * it returns the static file served from Next.js public/images/ folder.
 */
const normalizeFilename = (filename: string): string => {
  // Strip suffix like -1, -2, -3 etc. before file extension
  return filename.replace(/-[0-9]+(?=\.[a-z0-9]+$)/i, '');
};

export const getImageUrl = (image: any, defaultFallback?: string): string | null => {
  if (!image) {
    return defaultFallback ? `/images/${normalizeFilename(defaultFallback)}` : null;
  }

  // If the image is a string (ID), we cannot resolve the filename directly,
  // so we fallback to a default image.
  if (typeof image === 'string') {
    return defaultFallback ? `/images/${normalizeFilename(defaultFallback)}` : null;
  }

  // If the image is an object
  if (typeof image === 'object') {
    if ('filename' in image && image.filename) {
      return `/images/${normalizeFilename(image.filename)}`;
    }
    if ('url' in image && image.url) {
      const parts = image.url.split('/');
      const filename = parts[parts.length - 1];
      return `/images/${normalizeFilename(filename)}`;
    }
  }

  return defaultFallback ? `/images/${normalizeFilename(defaultFallback)}` : null;
};
