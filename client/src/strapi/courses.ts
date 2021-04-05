import { roundToNearest, withPluralisedUnits } from '@/util'
import { ICourse } from 'types/strapi/course'
import { strapi } from './client'

export const getAllCourses = async (): Promise<ICourse[]> => {
  const resp = await strapi.get<ICourse[]>('/courses')
  return resp.data
}

export const getCourseBySlug = async (
  slug: string,
): Promise<ICourse | null> => {
  const resp = await strapi.get<ICourse[]>(`/courses?slug=${slug}`)
  const [course] = resp.data

  if (!course || Object.keys(course).length === 0) {
    return null
  }

  return course
}

export namespace CourseInfo {
  /** Gets the reading time as a string given the number of minutes. */
  export const readingTimeStr = (course: ICourse): string => {
    const readingTime = course.courseContent.reduce(
      (z, x) => z + x.readingTime,
      0,
    )

    if (readingTime < 45) {
      return withPluralisedUnits('min', readingTime)
    } else {
      return (
        'about ' +
        withPluralisedUnits('hr', roundToNearest(readingTime, 60) / 60)
      )
    }
  }

  export const partsStr = (course: ICourse): string =>
    withPluralisedUnits('part', course.courseContent.length)
}
