import { getStrapiBasePath } from './strapi'

export function isPathExternal(path: string): boolean {
  // TODO: check for host address too
  return !path.startsWith('/') && !path.startsWith(getStrapiBasePath())
}

const pluralise = (base: string, n: number) => (n === 1 ? base : `${base}s`)

export const withPluralisedUnits = (unit: string, n: number) =>
  `${n} ${pluralise(unit, n)}`

export const roundToNearest = (num: number, nearest: number) =>
  Math.round(num / nearest) * nearest

export type AssetType = 'image' | 'audio' | 'video' | 'document' | 'unknown'

export const getAssetType = (path: string): AssetType => {
  const assetExts: { type: AssetType; exts: string[] }[] = [
    { type: 'image', exts: ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'] },
    { type: 'audio', exts: ['mp3', 'wav'] },
    { type: 'video', exts: ['mp4', 'ogg', 'webm'] },
    {
      type: 'document',
      exts: ['doc', 'docx', 'txt', 'ppt', 'pptx', 'xls', 'xlsx', 'rtf'],
    },
  ]

  const ext = path.toLowerCase().split('.').reverse()[0]

  if (!ext) {
    return 'unknown'
  }

  return assetExts.find((x) => x.exts.includes(ext))?.type || 'unknown'
}

export interface Asset {
  assetType: AssetType
  src: string
  alt: string
}
