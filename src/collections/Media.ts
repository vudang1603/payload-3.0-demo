import type { CollectionConfig } from 'payload'
import path from 'path'

const isProduction = process.env.NODE_ENV === 'production'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    staticDir: isProduction ? '/tmp/media' : path.resolve('./public/media'),
  },
}
