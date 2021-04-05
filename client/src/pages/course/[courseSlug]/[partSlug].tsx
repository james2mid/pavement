import { Link } from '@/components/ChakraNextLink'
import { Multimedia } from '@/components/Multimedia'
import { RichText } from '@/components/RichText'
import { parseStrapiAsset } from '@/strapi/assets'
import { getAllCourses, getCourseBySlug } from '@/strapi/courses'
import {
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  StackItem,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import React from 'react'
import { FaAlignLeft, FaFile, FaImage, FaMusic, FaVideo } from 'react-icons/fa'
import { ICourse } from 'types/strapi/course'
import { ICourseContent } from 'types/strapi/course-content'

interface Props {
  course: ICourse
  part: ICourseContent
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
  const getPartIcon = (part: ICourseContent) => {
    const asset = part.feature ? parseStrapiAsset(part.feature) : null

    switch (asset?.assetType) {
      case 'image':
        return FaImage
      case 'audio':
        return FaMusic
      case 'video':
        return FaVideo
      case 'document':
        return FaFile
      default:
        return FaAlignLeft
    }
  }

  const isPartSelected = (p: ICourseContent) => {
    return p.id === part.id
  }

  return (
    <Flex maxW="container.lg" mx="auto" mt={30}>
      <Flex
        minWidth="xs"
        direction="column"
        height="min-content"
        align="flex-start"
        p={5}
        mr={13}
        mt={89}
        rounded="xl"
        bgColor={useColorModeValue('gray.100', 'gray.700')}
        shadow="md"
      >
        <Box ml={2} my={5}>
          <Heading as="h2" size="lg" noOfLines={3}>
            {course.title}
          </Heading>
        </Box>

        <VStack spacing={1}>
          {course.courseContent.map((x, index) => (
            <StackItem
              key={index}
              w="100%"
              bg={isPartSelected(x) ? 'gray.100' : 'initial'}
            >
              <Link href={`/course/${course.slug}/${x.slug}`}>
                <HStack
                  align="center"
                  spacing={3}
                  bg={
                    isPartSelected(x)
                      ? useColorModeValue('gray.200', 'gray.600')
                      : 'initial'
                  }
                  px={5}
                  py={3}
                  rounded="lg"
                >
                  <Text fontWeight="semibold">{index + 1}</Text>
                  <Icon
                    as={getPartIcon(x)}
                    color={useColorModeValue('gray.600', 'white')}
                  />
                  <Text
                    fontWeight={isPartSelected(x) ? 'semibold' : 'initial'}
                    noOfLines={2}
                  >
                    {x.title}
                  </Text>
                </HStack>
              </Link>
            </StackItem>
          ))}
        </VStack>
      </Flex>
      <Box px="8" py="13" w="100%">
        <Heading size="xl" mb={5}>
          {part.title}
        </Heading>

        {part.feature && (
          <Multimedia strapiAsset={part.feature} imageFormat="medium" my={8} />
        )}

        <RichText content={part.description} />
      </Box>
    </Flex>
  )
}

export default coursePart
