import { ICourse } from './course';

/**
 * Model definition for Package
 */
export interface IPackage {
  id: string;
  title: string;
  description?: string;
  price: number;
  slug: string;
  thumbnail?: any;
  courses: ICourse[];
}