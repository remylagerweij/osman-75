import fs from 'node:fs'
import path from 'node:path'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing slug'
    })
  }

  const contentDir = path.resolve(process.cwd(), 'content/advice')
  const filePath = path.join(contentDir, `${slug}.md`)

  try {
    // Prevent directory traversal
    if (!filePath.startsWith(contentDir)) {
       throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
    }

    const content = await fs.promises.readFile(filePath, 'utf-8')
    return {
      slug,
      content
    }
  } catch (error) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Advice not found'
    })
  }
})
