/* eslint-disable react/jsx-props-no-spreading */
import { Footer, FOOTER_HEIGHT } from '@/components/Footer'
import { Header } from '@/components/Header'
import ChakraTheme from '@/styles/chakra-theme'
import { Box, ChakraProvider, Progress } from '@chakra-ui/react'
import { Provider as NextAuthProvider } from 'next-auth/client'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const App = ({ Component, pageProps }: AppProps) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    router.events.on('routeChangeStart', () => setLoading(true))
    router.events.on('routeChangeComplete', () => setLoading(false))
    router.events.on('routeChangeError', () => setLoading(false))
  })

  return (
    <NextAuthProvider session={pageProps.session}>
      <ChakraProvider theme={ChakraTheme}>
        {loading && (
          <Progress
            size="xs"
            isIndeterminate
            position="fixed"
            top="0"
            left="0"
            right="0"
            color="turquoise"
            bgColor="unset"
          />
        )}
        <Box position="relative" minH="100vh">
          <Box mb={FOOTER_HEIGHT}>
            <Header />
            <Component {...pageProps} />
          </Box>
          <Footer />
        </Box>
      </ChakraProvider>
    </NextAuthProvider>
  )
}

export default App
