import { CourseItem } from '@/components/CourseItem'
import { Course, getAllCourses } from '@/strapi'
import { Container, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import React from 'react'

interface Props {
  courses: Course[]
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const courses = Array.from(Array(7)).fill((await getAllCourses())[0]!)

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
      <SimpleGrid gap={8} bgColor="blue.100" minChildWidth="250px">
        {courses.map((course, index) => (
          <CourseItem course={course} key={index} />
        ))}
      </SimpleGrid>
    </Container>
  )
}

export default courses
