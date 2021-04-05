import { Link } from '@/components/ChakraNextLink'
import { Multimedia } from '@/components/Multimedia'
import { CourseInfo } from '@/strapi/courses'
import { Badge, Box, BoxProps, Heading, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { ICourse } from 'types/strapi/course'

interface Props extends BoxProps {
  course: ICourse
}

export const CourseItem: React.FC<Props> = ({ course }) => {
  return (
    <Link href={`/course/${course.slug}`}>
      <Box cursor="pointer" w="100%">
        <Multimedia
          strapiAsset={course.thumbnail}
          imageFormat={'medium'}
          h="200px"
          shadow="md"
          mb={5}
        />
        <Box mx={2}>
          <Heading size="lg" mt={2} mb={1} noOfLines={1}>
            {course.title}
          </Heading>
          <HStack align="baseline">
            <Badge colorScheme="blue" mb={1}>
              {course.price === 0
                ? 'INCLUDED'
                : `£${Math.round(course.price / 100)}`}
            </Badge>
            <span>&middot;</span>
            <Text size="sm">{CourseInfo.readingTimeStr(course)}</Text>
          </HStack>
          <Text size="lg" noOfLines={2} textDecoration="none">
            {course.description}
          </Text>
        </Box>
      </Box>
    </Link>
  )
}
