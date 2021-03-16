import { FaFileDownload } from 'react-icons/fa'
import { IoDocumentTextOutline } from 'react-icons/io5'
import { IconType } from 'react-icons/lib'
import {
  SiMicrosoftexcel,
  SiMicrosoftpowerpoint,
  SiMicrosoftword,
} from 'react-icons/si'
import { resolveStrapiPath } from '.'

export type AssetType = 'image' | 'video' | 'document'

const documentIcons: Record<string, IconType> = {
  doc: SiMicrosoftword,
  docx: SiMicrosoftword,
  txt: IoDocumentTextOutline,
  ppt: SiMicrosoftpowerpoint,
  pptx: SiMicrosoftpowerpoint,
  xls: SiMicrosoftexcel,
  xlsx: SiMicrosoftexcel,
}

export function getDocumentIcon(path: string): IconType {
  path = path.toLowerCase()

  const [_, icon] =
    Object.entries(documentIcons).find(([ext]) => path.endsWith(ext)) || []

  return icon || FaFileDownload
}

const assetTypes: Record<AssetType, string[]> = {
  image: ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'],
  video: ['mp4', 'ogg', 'webm'],
  document: Object.keys(documentIcons),
}

export function getAssetType(path: string): AssetType | null {
  path = path.toLowerCase()

  for (const assetType of Object.keys(assetTypes) as AssetType[]) {
    if (assetTypes[assetType].some((x) => path.endsWith(x))) {
      return assetType
    }
  }

  return null
}

type ImageFormat = 'thumbnail' | 'small' | 'medium' | 'large'

interface Image {
  src: string
  alt: string
}

export function getImage(
  media: any | undefined,
  format: ImageFormat,
): Image | null {
  if (!media) {
    return {
      src: process.env.NEXT_PUBLIC_FALLBACK_IMAGE_SRC || '',
      alt: 'Fallback image',
    }
  }

  const f = media.formats[format]
  const src = resolveStrapiPath(f.url)

  return {
    src,
    alt: media.alternativeText,
  }
}
