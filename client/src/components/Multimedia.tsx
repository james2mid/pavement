import { parseStrapiAsset, StrapiImageFormat } from '@/strapi/assets'
import { Asset, getAssetType } from '@/util'
import Icon from '@chakra-ui/icon'
import { Image, ImageProps } from '@chakra-ui/image'
import { Flex, Spacer, Text } from '@chakra-ui/layout'
import { chakra } from '@chakra-ui/system'
import { FaFileDownload } from 'react-icons/fa'
import { IoDocumentTextOutline } from 'react-icons/io5'
import { IconType } from 'react-icons/lib'
import {
  SiMicrosoftexcel,
  SiMicrosoftpowerpoint,
  SiMicrosoftword,
} from 'react-icons/si'

interface PropsBase extends ImageProps {}

interface StrapiMediaProps {
  strapiAsset: unknown
  imageFormat: StrapiImageFormat
}

interface MarkdownMediaProps {
  markdownAsset: {
    src: string
    alt: string
  }
}

const parseMixedMediaProps = (
  props: StrapiMediaProps | MarkdownMediaProps,
): Asset | null => {
  if ('strapiAsset' in props) {
    return parseStrapiAsset(props.strapiAsset, props.imageFormat)
  } else {
    const { src, alt } = props.markdownAsset
    const assetType = getAssetType(src)

    return {
      assetType,
      src,
      alt,
    }
  }
}

type Props = PropsBase & (StrapiMediaProps | MarkdownMediaProps)

export const Multimedia: React.FC<Props> = (props) => {
  const asset = parseMixedMediaProps(props)

  if (!asset) {
    return <></>
  }

  const styleProps = Object.fromEntries(
    Object.entries(props).filter(
      ([k]) => !['strapiAsset', 'imageFormat', 'markdownAsset'].includes(k),
    ),
  )

  switch (asset.assetType) {
    case 'image':
      return (
        <Image
          src={asset.src}
          alt={asset.alt}
          rounded={10}
          shadow="md"
          minW="100%"
          fit="cover"
          {...styleProps}
        />
      )
    case 'video':
      return (
        <Video
          controls
          src={asset.src}
          title={asset.alt}
          rounded={10}
          _focus={{ outline: 'none' }}
          shadow="md"
          minW="100%"
          {...styleProps}
        />
      )
    case 'audio':
      return (
        <Audio
          controls
          src={asset.src}
          title={asset.alt}
          rounded={10}
          _focus={{ outline: 'none' }}
          minW="100%"
          {...styleProps}
        />
      )
    case 'document':
    case 'unknown':
      return (
        <a href={asset.src} target="_blank">
          <Flex
            bgColor="gray.600"
            color="white"
            w="100%"
            alignItems="center"
            justifyItems="flex-start"
            p={5}
            {...styleProps}
          >
            <Text
              as="span"
              fontSize="xl"
              fontWeight="semibold"
              mr={3}
              noOfLines={2}
            >
              {asset.alt}
            </Text>
            <Spacer />
            <Icon as={getFileIcon(asset.src)} boxSize={7} />
          </Flex>
        </a>
      )
  }
}

const getFileIcon = (path: string): IconType => {
  const fileIcons: Record<string, IconType> = {
    doc: SiMicrosoftword,
    docx: SiMicrosoftword,
    txt: IoDocumentTextOutline,
    ppt: SiMicrosoftpowerpoint,
    pptx: SiMicrosoftpowerpoint,
    xls: SiMicrosoftexcel,
    xlsx: SiMicrosoftexcel,
  }

  path = path.toLowerCase()

  const [_, icon] =
    Object.entries(fileIcons).find(([ext]) => path.endsWith(ext)) || []

  return icon || FaFileDownload
}

const Audio = chakra((props) => (
  <audio {...props}>
    Your web browser does not support HTML5 audio, but you can still{' '}
    <a href={props.src}>download this track</a> to listen offline.
  </audio>
))
const Video = chakra((props) => (
  <video {...props}>
    Your web browser does not support HTML5 video, but you can still{' '}
    <a href={props.src}>download this video</a> to watch offline.
  </video>
))
