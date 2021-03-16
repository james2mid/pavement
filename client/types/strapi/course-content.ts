/**
 * Model definition for CourseContent
 */
export interface ICourseContent {
  id: string;
  title: string;
  readingTime: number;
  description: string;
  feature?: any;
  slug: string;
}