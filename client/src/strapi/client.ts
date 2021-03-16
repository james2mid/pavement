import Axios from 'axios'

export const strapi = Axios.create({
  baseURL: getStrapiBasePath(),
  responseType: 'json',
})

export function getStrapiBasePath() {
  return process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'
}

export function resolveStrapiPath(path: string): string {
  const base = getStrapiBasePath()
  return new URL(path, base).toString()
}
