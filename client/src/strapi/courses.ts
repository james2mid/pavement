import { roundToNearest, withPluralisedUnits } from '@/util'
import { ICourse, ICourseContent } from 'types/strapi'
import { strapi } from './client'

export type Course = ICourse
export type CourseContent = ICourseContent

export const getAllCourses = async (): Promise<Course[]> => {
  const resp = await strapi.get<ICourse[]>('/courses')
  return resp.data
}

export const getCourseBySlug = async (slug: string): Promise<Course | null> => {
  const resp = await strapi.get<ICourse[]>(`/courses?slug=${slug}`)
  const [course] = resp.data

  if (!course || Object.keys(course).length === 0) {
    return null
  }

  return course
}

export namespace CourseInfo {
  /** Gets the reading time as a string given the number of minutes. */
  export const readingTimeStr = (course: Course): string => {
    const readingTime = course.courseContent.reduce(
      (z, x) => z + x.readingTime,
      0,
    )

    if (readingTime < 45) {
      return withPluralisedUnits('min', roundToNearest(readingTime, 10))
    } else {
      return withPluralisedUnits('hr', roundToNearest(readingTime, 60) / 60)
    }
  }

  export const partsStr = (course: Course): string =>
    withPluralisedUnits('part', course.courseContent.length)
}
