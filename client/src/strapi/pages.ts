import { IPage } from 'types/strapi/page'
import { strapi } from './client'

export const getAllPages = async (): Promise<IPage[]> => {
  const resp = await strapi.get<IPage[]>('/pages')

  return resp.data
}

export const getPageBySlug = async (slug: string): Promise<IPage | null> => {
  const resp = await strapi.get<IPage[]>(`/pages?slug=${slug}`)

  const [page] = resp.data

  if (!page || Object.keys(page).length === 0) {
    return null
  }

  return page
}
