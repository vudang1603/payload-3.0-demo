import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Portfolios } from './collections/Portfolios'
import { Pages } from './collections/Pages'
import { Blogs } from './collections/Blogs'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const usePostgres =
  process.env.USE_POSTGRES === 'true' ||
  (process.env.NODE_ENV === 'production' &&
    (process.env.DATABASE_URI?.startsWith('postgres') || process.env.DATABASE_URI?.startsWith('postgresql')))

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Portfolios, Pages, Blogs],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: usePostgres
    ? postgresAdapter({
        pool: {
          connectionString: process.env.DATABASE_URI || '',
          max: 4, // Giới hạn số lượng kết nối đồng thời tối đa cho mỗi instance
          idleTimeoutMillis: 10000, // Đóng kết nối nhàn rỗi sau 10 giây để tránh rò rỉ kết nối
          connectionTimeoutMillis: 5000, // Tránh treo request nếu không kết nối được
        },
        schemaName: 'payload',
      })
    : sqliteAdapter({
        client: {
          url: 'file:./payload.db',
        },
      }),
  sharp,
  localization: {
    locales: ['en'],
    fallback: true,
    defaultLocale: 'en',
  },
  plugins: [],
})
