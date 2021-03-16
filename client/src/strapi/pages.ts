import { IAboutPage } from 'types/strapi'
import { strapi } from './client'

export async function getAboutPage(): Promise<IAboutPage> {
  return (await strapi.get<IAboutPage>('/about-page')).data
}
