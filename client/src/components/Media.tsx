import { getAssetType, getDocumentIcon } from '@/strapi'
import Icon from '@chakra-ui/icon'
import { Image } from '@chakra-ui/image'
import { Flex, Spacer, Text } from '@chakra-ui/layout'
import { chakra } from '@chakra-ui/system'

interface Props {
  src: string
  alt: string
}

const Video = chakra((props) => <video {...props} />)

export const Media: React.FC<Props> = ({ src, alt }) => {
  const assetType = getAssetType(src) || 'document'

  switch (assetType) {
    case 'image':
      return <Image src={src} alt={alt} rounded={10} shadow="md" minW="100%" />
    case 'video':
      return (
        <Video
          src={src}
          title={alt}
          rounded={10}
          controls
          shadow="md"
          minW="100%"
        />
      )
    case 'document':
      const icon = getDocumentIcon(src)

      return (
        <a href={src} target="_blank">
          <Flex
            bgColor="gray.600"
            color="white"
            w="100%"
            alignItems="center"
            justifyItems="flex-start"
            p={5}
          >
            <Text
              as="span"
              fontSize="xl"
              fontWeight="semibold"
              mr={3}
              noOfLines={2}
            >
              {alt}
            </Text>
            <Spacer />
            <Icon as={icon} boxSize={7} />
          </Flex>
        </a>
      )
  }
}
