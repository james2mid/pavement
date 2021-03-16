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
