import { Asset, getAssetType } from '../util'
import { resolveStrapiPath } from './client'

export type StrapiImageFormat = 'thumbnail' | 'small' | 'medium' | 'large'

export const parseStrapiAsset = (
  asset: any,
  imageFormat?: StrapiImageFormat,
): Asset | null => {
  imageFormat ??= 'small'

  if (!asset || typeof asset !== 'object' || !asset.url) {
    return null
  }

  const rawUrl: string = asset.url
  const assetType = getAssetType(rawUrl)

  const src = resolveStrapiPath(
    assetType === 'image' ? asset.formats?.[imageFormat].url : rawUrl,
  )

  const alt: string = asset.alternativeText || ''

  return {
    assetType,
    src,
    alt,
  }
}
