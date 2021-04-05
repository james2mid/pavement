import { extendTheme } from '@chakra-ui/react'

const noFocusOutline = {
  baseStyle: {
    track: {
      _focus: {
        outline: 'none',
      },
    },
  },
}

export default extendTheme({
  components: {
    Link: noFocusOutline,
    Header: noFocusOutline,
    IconButton: noFocusOutline,
  },
})
