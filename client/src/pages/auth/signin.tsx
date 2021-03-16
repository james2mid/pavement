import { Link } from '@/components/Link'
import {
  Box,
  Button,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
} from '@chakra-ui/react'
import { signIn } from 'next-auth/client'
import React, { useState } from 'react'
import { CgLogIn, CgMail } from 'react-icons/cg'

const signin: React.FC = () => {
  const [email, setEmail] = useState('')

  return (
    <Box mt={20} mb={10} textAlign="center">
      <Heading size="2xl" mb={12}>
        Sign In
      </Heading>

      <VStack
        p={5}
        w="sm"
        mx="auto"
        spacing={5}
        borderWidth={1}
        rounded={10}
        shadow="sm"
      >
        <InputGroup size="lg">
          <InputLeftElement children={<Icon as={CgMail} />} />
          <Input
            placeholder="Email"
            type="email"
            value={email}
            onInput={(e: any) => setEmail(e.value)}
          />
        </InputGroup>

        <Button
          leftIcon={<CgLogIn />}
          isFullWidth
          colorScheme="blue"
          onClick={() => signIn('email', { email })}
        >
          Sign In
        </Button>
      </VStack>

      <Box mt={8}>
        <Text color="gray.500">
          Don't have an account?{' '}
          <Link href="/contact" textDecoration="underline">
            Request access
          </Link>
        </Text>
      </Box>
    </Box>
  )
}

export default signin
