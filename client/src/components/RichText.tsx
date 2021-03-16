import { Media } from '@/components/Media'
import { resolveStrapiPath } from '@/strapi'
import { Heading, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import ReactMarkdown from 'react-markdown'

interface Props {
  content: string
}

const renderers = {
  paragraph: (props: { children: JSX.Element[] }) => {
    const [firstNode] = props.children

    if (!firstNode) {
      return <></>
    }

    if (firstNode.props.node.type === 'image') {
      return <>{props.children}</>
    }

    return <Text fontSize="lg" children={props.children} />
  },

  heading: (props: {
    level: 1 | 2 | 3 | 4 | 5 | 6
    children: JSX.Element[]
  }) => {
    const sizeMap = {
      1: '2xl',
      2: 'xl',
      3: 'lg',
      4: 'md',
      5: 'sm',
      6: 'xs',
    } as const

    return (
      <Heading
        as={`h${props.level}` as any}
        size={sizeMap[props.level]}
        children={props.children}
      ></Heading>
    )
  },

  image: (props: { src: string; alt: string }) => {
    // Strapi embeds all assets in Markdown as an image reference
    // Detect the type of asset using the file extension

    return <Media {...props} />
  },
}

export const RichText: React.FC<Props> = ({ content }) => {
  return (
    <Stack spacing={10}>
      <ReactMarkdown
        children={content}
        transformImageUri={(x) => resolveStrapiPath(x)}
        renderers={renderers as any}
      />
    </Stack>
  )
}
