import fs from 'node:fs'
import path from 'node:path'

export default defineEventHandler(async (event) => {
  const contentDir = path.resolve(process.cwd(), 'content/advice')

  try {
    const files = await fs.promises.readdir(contentDir)
    const adviceList = await Promise.all(
      files
        .filter((file: string) => file.endsWith('.md'))
        .map(async (file: string) => {
          const filePath = path.join(contentDir, file)
          const content = await fs.promises.readFile(filePath, 'utf-8')

          // Extract title from first line (# Title) or filename
          const titleMatch = content.match(/^#\s+(.+)$/m)
          const title = titleMatch ? titleMatch[1] : file.replace('.md', '').replace(/^\d+-/, '').replace(/-/g, ' ')

          return {
            slug: file.replace('.md', ''),
            title: title,
            filename: file
          }
        })
    )

    return adviceList.sort((a: any, b: any) => a.filename.localeCompare(b.filename))
  } catch (error) {
    console.error('Error reading advice directory:', error)
    return []
  }
})
