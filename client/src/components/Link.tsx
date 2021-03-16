import { Box, chakra, SystemProps } from '@chakra-ui/react'
import NextLink from 'next/link'
import React from 'react'

interface Props extends SystemProps {
  href: string
}

const WrappedLink = chakra(NextLink, {
  shouldForwardProp: (prop) => ['href', 'children'].includes(prop),
})

export const Link: React.FC<Props> = ({ href, ...props }) => {
  return (
    <WrappedLink href={href}>
      <Box as="span" cursor="pointer" {...props} />
    </WrappedLink>
  )
}
