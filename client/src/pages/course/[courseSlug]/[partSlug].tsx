import { Link } from '@/components/Link'
import { RichText } from '@/components/RichText'
import {
  Course,
  CourseContent,
  getAllCourses,
  getCourseBySlug,
  getImage,
} from '@/strapi'
import {
  Box,
  Divider,
  Flex,
  Heading,
  Img,
  StackDivider,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import React from 'react'

interface Props {
  course: Course
  part: CourseContent
}

interface Params extends ParsedUrlQuery {
  courseSlug: string
  partSlug: string
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const courses = await getAllCourses()

  const params: Params[] = courses.flatMap((course) => [
    { courseSlug: course.slug, partSlug: 'view' },
    ...course.courseContent.map((courseContent) => ({
      courseSlug: course.slug,
      partSlug: courseContent.slug,
    })),
  ])

  return {
    paths: params.flatMap((x) => ({ params: { ...x } })),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const courseSlug = params?.courseSlug
  const partSlug = params?.partSlug

  if (!courseSlug || !partSlug) {
    return {
      redirect: {
        destination: '/courses',
        permanent: false,
      },
    }
  }

  const course = await getCourseBySlug(courseSlug)

  if (!course) {
    return { notFound: true }
  }

  if (partSlug === 'view') {
    const firstPartSlug = course.courseContent[0]?.slug

    if (!firstPartSlug) {
      return { redirect: { destination: '/courses', permanent: false } }
    }

    return {
      redirect: {
        destination: `/course/${course.slug}/${firstPartSlug}`,
        permanent: false,
      },
    }
  }

  const part = course.courseContent.find((x) => x.slug === partSlug)

  if (!part) {
    return { notFound: true }
  }

  return { props: { course, part } }
}

const coursePart: React.FC<Props> = ({ course, part }) => {
  return (
    <Box bgColor={useColorModeValue('gray.100', 'gray.700')} py="10">
      <Flex maxW="4xl" mx="auto">
        <Flex
          minWidth="xs"
          direction="column"
          height="min-content"
          align="flex-start"
          p="5"
          mt="20"
          roundedLeft="md"
          bgColor={useColorModeValue('white', 'gray.900')}
          border="1px"
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          divider={<StackDivider />}
        >
          <Heading as="h3" size="md" my="3">
            {course.title}
          </Heading>
          {course.courseContent.map((x, index) => (
            <Box key={index} w="100%">
              <Divider />
              <Link href={`/course/${course.slug}/${x.slug}`}>
                <Box py="5">
                  <Text fontWeight={x.id === part.id ? 'semibold' : 'initial'}>
                    {index + 1}. {x.title}
                  </Text>
                </Box>
              </Link>
            </Box>
          ))}
        </Flex>
        <Box
          p="10"
          bgColor={useColorModeValue('white', 'gray.900')}
          shadow="md"
          rounded="md"
        >
          <Heading size="xl" mb="5">
            {part.title}
          </Heading>

          {part.feature && (
            <Img
              {...getImage(part.feature, 'large')}
              maxH="500px"
              display="block"
              mr="3"
              mb="7"
              fit="cover"
              minW="100%"
              rounded={5}
            />
          )}

          <RichText content={part.description} />
        </Box>
      </Flex>
    </Box>
  )
}

export default coursePart
