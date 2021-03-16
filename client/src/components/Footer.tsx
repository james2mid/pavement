import { Center, Flex, Text } from '@chakra-ui/react'
import React from 'react'

export const FOOTER_HEIGHT = '8rem'

const Footer: React.FC = () => {
  return (
    <Flex
      as="footer"
      position="absolute"
      bottom={`-${FOOTER_HEIGHT}`}
      width="100%"
      height={FOOTER_HEIGHT}
      direction="column"
      justify="center"
    >
      <Center color="gray.500">
        <Text>Copyright &copy; Adrian Machon {new Date().getFullYear()}</Text>
      </Center>
    </Flex>
  )
}

export { Footer }
