import { Link } from '@/components/Link'
import { Course, getImage } from '@/strapi'
import {
  Badge,
  Box,
  BoxProps,
  Heading,
  HStack,
  Image,
  Text,
} from '@chakra-ui/react'
import React from 'react'

interface Props extends BoxProps {
  course: Course
}

export const CourseItem: React.FC<Props> = ({ course, ...props }) => {
  return (
    <Link href={`/course/${course.slug}`}>
      <Box cursor="pointer" w="100%" {...props}>
        <Image
          {...getImage(course.thumbnail, 'medium')}
          rounded={5}
          width="100%"
          height="200px"
          fit="cover"
          loading="lazy"
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
            <Text size="sm">{course.readingTimeString}</Text>
          </HStack>
          <Text size="lg" noOfLines={2} textDecoration="none">
            {course.description}
          </Text>
        </Box>
      </Box>
    </Link>
  )
}
