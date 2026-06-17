import type { Block } from 'payload'

export const BannerBlock: Block = {
  slug: 'banner',
  labels: {
    singular: 'Announcement Banner',
    plural: 'Announcement Banners',
  },
  fields: [
    {
      name: 'content',
      type: 'text',
      required: true,
      label: 'Banner Message',
    },
    {
      name: 'bannerType',
      type: 'select',
      options: [
        { label: 'Info (Blue)', value: 'info' },
        { label: 'Warning (Orange)', value: 'warning' },
        { label: 'Success (Green)', value: 'success' },
      ],
      defaultValue: 'info',
      label: 'Style / Theme',
    },
    {
      name: 'link',
      type: 'text',
      label: 'Optional Link (URL)',
    },
  ],
}
