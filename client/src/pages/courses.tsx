import { CourseItem } from '@/components/CourseItem'
import { getAllCourses } from '@/strapi/courses'
import { Container, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import React from 'react'
import { ICourse } from 'types/strapi/course'

interface Props {
  courses: ICourse[]
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  // const courses = Array.from(Array(7)).fill((await getAllCourses())[0]!)
  const courses = await getAllCourses()

  return {
    props: {
      courses,
    },
  }
}

const courses: React.FC<Props> = ({ courses }) => {
  return (
    <Container pt={[7, null, 20]} px={3} maxW="container.lg" centerContent>
      <Heading as="h1" size="2xl" mb="0.2em" textAlign="center">
        Learning Experiences
      </Heading>
      <Text as="h3" size="lg" mb={10} textAlign="center">
        An opportunity to explore your inner being.
      </Text>
      <SimpleGrid columns={[1, 2, null, 3]} gap={[5, null, 8]}>
        {courses.map((course, index) => (
          <CourseItem course={course} key={index} />
        ))}
      </SimpleGrid>
    </Container>
  )
}

export default courses
