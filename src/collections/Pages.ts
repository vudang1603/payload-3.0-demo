import type { CollectionConfig } from 'payload'
import { HeroBlock } from '../blocks/Hero'
import { BannerBlock } from '../blocks/Banner'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Page Title',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug (URL path, e.g. "about")',
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [HeroBlock, BannerBlock],
      label: 'Page Layout Builder',
    },
  ],
}
