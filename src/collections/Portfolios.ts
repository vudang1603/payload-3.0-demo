import type { CollectionConfig } from 'payload'

export const Portfolios: CollectionConfig = {
  slug: 'portfolios',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'sectors', 'fundingAmount'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'sectors',
      type: 'select',
      options: [
        { label: 'Health', value: 'health' },
        { label: 'Education', value: 'education' },
        { label: 'Environment', value: 'environment' },
      ],
      required: true,
    },
    {
      name: 'fundingAmount',
      type: 'number',
      label: 'Funding Amount (USD)',
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'website',
      type: 'text',
    },
  ],
}
