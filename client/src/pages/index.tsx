import { Box, Heading, Text } from '@chakra-ui/react'
import { NextPage } from 'next'
import React from 'react'

const Home: NextPage = () => {
  return (
    <Box>
      <Box my={20} textAlign="center">
        <Heading>We help people find their path</Heading>
        <Text>Adipiscing etiam lobortis nunc nisi varius tempus</Text>
      </Box>
    </Box>
  )
}

export default Home
