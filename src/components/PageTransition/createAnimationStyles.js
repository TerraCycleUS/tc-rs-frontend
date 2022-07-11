import { css } from 'styled-components'

const createAnimationStyles = ({
  keyframes,
  delay,
  duration,
  timing,
  fill,
  origin,
  onTop,
}) => css`
  animation-name: ${keyframes};
  animation-delay: ${delay};
  animation-duration: ${duration}ms;
  animation-timing-function: ${timing};
  animation-fill-mode: ${fill};
  transform-origin: ${origin || '50% 50%'};
  ${onTop &&
  css`
    z-index: 1;
  `}
`

export default createAnimationStyles
