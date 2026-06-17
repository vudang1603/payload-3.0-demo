import type { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero Section',
    plural: 'Hero Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Main Heading',
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subheading',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
    },
    {
      name: 'ctaText',
      type: 'text',
      label: 'Call to Action Button Text',
    },
    {
      name: 'ctaLink',
      type: 'text',
      label: 'Call to Action Button Link',
    },
  ],
}
