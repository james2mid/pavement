import { RichText } from '@/components/RichText'
import {
  Course,
  CourseInfo,
  getAllCourses,
  getCourseBySlug,
  getImage,
} from '@/strapi'
import {
  Box,
  Container,
  Heading,
  Image,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { LinkButton } from 'chakra-next-link'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import React from 'react'

interface Props {
  course: Course
}

interface Params extends ParsedUrlQuery {
  courseSlug: string
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const courses = await getAllCourses()

  return {
    paths: courses.map((course) => ({ params: { courseSlug: course.slug } })),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const slug = params?.courseSlug

  if (!slug) {
    return {
      redirect: {
        destination: '/courses',
        permanent: false,
      },
    }
  }

  const course = await getCourseBySlug(slug)

  if (!course) {
    return { notFound: true }
  }

  return { props: { course } }
}

const course: React.FC<Props> = ({ course }) => {
  return (
    <Container maxW="container.md">
      <Image
        {...getImage(course.thumbnail, 'large')}
        height="200px"
        display="block"
        mr="3"
        fit="cover"
        minW="100%"
        rounded={5}
      />

      <Heading size="2xl" mt={10} mb={5}>
        {course.title}
      </Heading>

      <LinkButton
        href={`/course/${course.slug}/view`}
        colorScheme="blue"
        size="lg"
      >
        {course.price === 0 ? 'View Now' : 'Purchase Experience'}
      </LinkButton>

      <Box as="section" my={10}>
        <Heading size="lg" mb={3}>
          Content
        </Heading>

        <Text fontStyle="oblique">
          This course has {CourseInfo.partsStr(course)}, with a total study time
          of {CourseInfo.readingTimeStr(course)}.
        </Text>

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Title</Th>
              <Th>Study Time</Th>
            </Tr>
          </Thead>
          <Tbody>
            {course.courseContent.map((x, index) => (
              <Tr key={index}>
                <Td isNumeric>{index + 1}</Td>
                <Td>{x.title}</Td>
                <Td>{CourseInfo.readingTimeStr(course)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <Heading size="lg" mb={3}>
        Description
      </Heading>

      <RichText content={course.description}></RichText>
    </Container>
  )
}

export default course
