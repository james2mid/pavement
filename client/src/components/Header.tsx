import { Link } from '@/components/Link'
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Spacer,
  Stack,
  Text,
  Tooltip,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import { signIn, signOut, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import React from 'react'
import { BiLogInCircle, BiLogOutCircle } from 'react-icons/bi'
import { FaMoon, FaSun } from 'react-icons/fa'

const navItems: HeaderItemProps[] = [
  {
    text: 'Experiences',
    path: '/courses',
    matchPath: (path) => path.startsWith('/course'),
  },
  {
    text: 'About',
    path: '/about',
  },
]

interface HeaderItemProps {
  text: string
  path: string
  matchPath?: (path: string) => boolean
}

const HeaderItem: React.FC<HeaderItemProps> = ({ text, path, matchPath }) => {
  const router = useRouter()
  const activePath = matchPath
    ? matchPath(router.pathname)
    : router.pathname === path

  return (
    <Link href={path}>
      <Text fontSize="lg" fontWeight={activePath ? 'bold' : 'normal'}>
        {text}
      </Text>
    </Link>
  )
}

const Header: React.FC = () => {
  const [session] = useSession()

  const { toggleColorMode } = useColorMode()
  const switchText = useColorModeValue('dark', 'light')
  const SwitchIcon = useColorModeValue(FaMoon, FaSun)

  return (
    <Flex align="center" py={10} px={8}>
      <Flex align="center" mr={20}>
        <Link href="/">
          <Heading as="h1" size="lg" letterSpacing={'-.1rem'}>
            Pavement of Life
          </Heading>
        </Link>
      </Flex>

      <Stack as="nav" direction="row" spacing={10}>
        {navItems.map((props, index) => (
          <HeaderItem {...props} key={index} />
        ))}
      </Stack>

      <Spacer></Spacer>

      <Box>
        {!session && (
          <Tooltip label="Sign In" hasArrow>
            <IconButton
              size="lg"
              fontSize="2xl"
              aria-label="Login"
              variant="ghost"
              color="current"
              ml={{ base: '0', md: '3' }}
              icon={<BiLogInCircle />}
              onClick={() => signIn()}
            />
          </Tooltip>
        )}

        {session && (
          <Tooltip label="Sign Out" hasArrow>
            <IconButton
              size="lg"
              fontSize="2xl"
              aria-label="Login"
              variant="ghost"
              color="current"
              ml={{ base: '0', md: '3' }}
              icon={<BiLogOutCircle />}
              onClick={() => signOut()}
            />
          </Tooltip>
        )}

        <Tooltip label={`Switch to ${switchText} mode`} hasArrow>
          <IconButton
            size="lg"
            fontSize="2xl"
            aria-label={`Switch to ${switchText} mode`}
            variant="ghost"
            color="current"
            ml={{ base: '0', md: '3' }}
            onClick={toggleColorMode}
            icon={<SwitchIcon />}
          />
        </Tooltip>
      </Box>
    </Flex>
  )
}

export { Header }
