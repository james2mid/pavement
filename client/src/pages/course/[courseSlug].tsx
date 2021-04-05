import { LinkButton } from '@/components/ChakraNextLink'
import { Multimedia } from '@/components/Multimedia'
import { RichText } from '@/components/RichText'
import { CourseInfo, getAllCourses, getCourseBySlug } from '@/strapi/courses'
import { withPluralisedUnits } from '@/util'
import {
  Box,
  Container,
  Heading,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import React from 'react'
import { ICourse } from 'types/strapi/course'

interface Props {
  course: ICourse
}

interface Params extends ParsedUrlQuery {
  courseSlug: string
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const courses = await getAllCourses()

  const paths = courses
    .map((x) => x.slug)
    .map((courseSlug) => ({ params: { courseSlug } }))

  return {
    paths,
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
      <Multimedia
        strapiAsset={course.thumbnail}
        imageFormat="medium"
        maxH="300px"
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

        <Text fontStyle="oblique" mb={2}>
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
                <Td>{withPluralisedUnits('min', x.readingTime)}</Td>
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
