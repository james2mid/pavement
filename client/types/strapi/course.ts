import { ICourseContent } from './course-content';

/**
 * Model definition for Course
 */
export interface ICourse {
  id: string;
  title: string;
  slug: string;
  thumbnail?: any;
  description: string;
  price: number;
  courseContent: ICourseContent[];
}