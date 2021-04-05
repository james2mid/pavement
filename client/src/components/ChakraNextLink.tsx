import { Link, LinkButton, LinkIconButton } from 'chakra-next-link'

const noFocusOutline = {
  _focus: { outline: 'none' },
}

Link.defaultProps = { ...noFocusOutline }
LinkButton.defaultProps = { ...noFocusOutline }
LinkIconButton.defaultProps = { ...noFocusOutline }

export { Link, LinkButton, LinkIconButton }
