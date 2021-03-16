import { Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'

const error: React.FC = () => {
  const router = useRouter()
  const message = router.query['error']
  return <Box>{message}</Box>
}

export default error
