import dotenv from 'dotenv'
dotenv.config()

import { getPayload } from 'payload'
import fs from 'fs'
import path from 'path'

const mediaDir = path.join(process.cwd(), 'media')

const filesToUpload = [
  {
    fileName: 'collaboration.png',
    alt: 'ACT Collaboration and Teamwork',
  },
  {
    fileName: 'education.png',
    alt: 'EduTech Student with Device',
  },
  {
    fileName: 'environment.png',
    alt: 'Hands holding growing sprouts',
  },
  {
    fileName: 'healthcare.png',
    alt: 'Patient consulting doctor via phone',
  },
]

// Simple helper to construct Lexical Editor State JSON
function createLexicalState(text: string) {
  return {
    root: {
      type: 'root',
      format: '' as any,
      indent: 0,
      version: 1,
      direction: 'ltr' as any,
      children: [
        {
          type: 'paragraph',
          format: '' as any,
          indent: 0,
          version: 1,
          children: [
            {
              type: 'text',
              text: text,
              version: 1,
            },
          ],
        },
      ],
    },
  }
}

async function run() {
  console.log('Starting Payload CMS seeding process...')
  const config = (await import('./payload.config')).default
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // 1. Clean up existing data to start fresh
  console.log('Cleaning up existing collections...')
  await payload.delete({ collection: 'pages', where: { id: { exists: true } } })
  await payload.delete({ collection: 'blogs', where: { id: { exists: true } } })
  await payload.delete({ collection: 'portfolios', where: { id: { exists: true } } })
  await payload.delete({ collection: 'media', where: { id: { exists: true } } })

  // 2. Create Admin user if not exists
  console.log('Ensuring admin user exists...')
  const users = await payload.find({
    collection: 'users',
    where: { email: { equals: 'admin@actgrants.in' } },
  })

  if (users.totalDocs === 0) {
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@actgrants.in',
        password: 'Password123!',
      },
    })
    console.log('Admin user created successfully (admin@actgrants.in / Password123!).')
  }

  // 3. Upload Media items
  console.log('Uploading media files...')
  const mediaMap: Record<string, any> = {}

  for (const fileSpec of filesToUpload) {
    const srcPath = path.join(mediaDir, fileSpec.fileName)
    if (fs.existsSync(srcPath)) {
      const fileBuffer = fs.readFileSync(srcPath)
      const fileSize = fs.statSync(srcPath).size

      const mediaDoc = await payload.create({
        collection: 'media',
        data: {
          alt: fileSpec.alt,
        },
        file: {
          name: fileSpec.fileName,
          mimetype: 'image/png',
          data: fileBuffer,
          size: fileSize,
        },
      })
      mediaMap[fileSpec.fileName] = mediaDoc
      console.log(`Uploaded media: ${fileSpec.fileName} (ID: ${mediaDoc.id})`)
    } else {
      console.warn(`File not found: ${srcPath}`)
    }
  }

  // 4. Create Portfolios with uploaded logos
  console.log('Creating portfolio items...')
  
  const portfolios = [
    {
      name: 'InnovateHealth India',
      sectors: 'health',
      fundingAmount: 200000,
      logoName: 'healthcare.png',
      website: 'https://innovatehealth.org',
      desc: 'Developing next-generation digital healthcare delivery and telemedicine infrastructure for rural clinics in India.',
    },
    {
      name: 'EduTech Learn',
      sectors: 'education',
      fundingAmount: 450000,
      logoName: 'education.png',
      website: 'https://edutechlearn.org',
      desc: 'Empowering children in remote villages with interactive digital learning modules and internet-enabled tablets.',
    },
    {
      name: 'GreenAir Carbon',
      sectors: 'environment',
      fundingAmount: 300000,
      logoName: 'environment.png',
      website: 'https://greenaircarbon.org',
      desc: 'Deploying low-cost air quality monitoring sensors and carbon-offset verification databases across urban centers.',
    },
  ]

  for (const item of portfolios) {
    const logoDoc = mediaMap[item.logoName]
    await payload.create({
      collection: 'portfolios',
      data: {
        name: item.name,
        sectors: item.sectors as any,
        fundingAmount: item.fundingAmount,
        logo: logoDoc ? logoDoc.id : undefined,
        website: item.website,
        description: createLexicalState(item.desc),
      },
    })
    console.log(`Created Portfolio: ${item.name}`)
  }

  // 5. Create Blog post
  console.log('Creating blog post...')
  const featuredImageDoc = mediaMap['collaboration.png']
  await payload.create({
    collection: 'blogs',
    data: {
      title: 'Announcing ACT 3.0 Platform',
      slug: 'act-3-launch',
      excerpt: 'We enter our next phase of venture philanthropy, backing organizations with population-scale social impact.',
      content: createLexicalState('We are thrilled to introduce ACT 3.0. Moving forward, we are expanding our focus to fund and scale tech-led innovations across environment, healthcare, and education in partnership with government bodies and LPs.'),
      featuredImage: featuredImageDoc ? featuredImageDoc.id : undefined,
    },
  })
  console.log('Created Blog post: Announcing ACT 3.0 Platform')

  // 6. Create Dynamic Pages (About Us and dynamic Home Page content)
  console.log('Creating dynamic pages...')
  
  // Create About Us page with Hero and Banner blocks
  await payload.create({
    collection: 'pages',
    data: {
      title: 'About Us',
      slug: 'about',
      layout: [
        {
          blockType: 'hero',
          title: 'Empowering Social Innovators',
          subtitle: 'We deploy flexible capital and mentorship to solve India\'s systemic challenges.',
          backgroundImage: featuredImageDoc ? featuredImageDoc.id : undefined,
          ctaText: 'Explore Our Portfolio',
          ctaLink: '/',
        },
        {
          blockType: 'banner',
          content: 'Read our launch announcement!',
          bannerType: 'success',
          link: '/blog/act-3-launch',
        },
      ],
    },
  })
  console.log('Created dynamic page: About Us (/about)')

  console.log('Database seeded successfully!')
  process.exit(0)
}

run().catch((err) => {
  console.error('Seeding failed:', err)
  process.exit(1)
})
