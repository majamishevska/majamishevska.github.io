import { readdir, stat, unlink } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const bagDir = join(__dirname, '../src/assets/bag')

const maxByFile = {
  'purse.png': 1280,
  default: 900,
}

async function main() {
  const files = await readdir(bagDir)
  const pngs = files.filter((f) => f.endsWith('.png') && !f.startsWith('.'))

  for (const name of pngs) {
    const input = join(bagDir, name)
    const base = name.replace(/\.png$/i, '')
    const output = join(bagDir, `${base}.webp`)
    const max = maxByFile[name] ?? maxByFile.default

    const before = (await stat(input)).size

    await sharp(input)
      .resize({
        width: max,
        height: max,
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({ quality: 82, alphaQuality: 90, effort: 6 })
      .toFile(output)

    const after = (await stat(output)).size
    await unlink(input)

    console.log(
      `${name} → ${base}.webp  (${(before / 1e6).toFixed(2)} MB → ${(after / 1e3).toFixed(0)} KB)`,
    )
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
