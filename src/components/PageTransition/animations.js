import { keyframes } from 'styled-components'

const animations = {
  moveFromBottom: {
    keyframes: keyframes`
      from { transform: translateY(100%) rotateZ(0.01deg); }
    `,
    duration: 600,
    timing: 'ease',
    fill: 'both',
  },
  moveToTopFade: {
    keyframes: keyframes`
      from { }
      to { opacity: 0.3; transform: translateY(-100%) rotateZ(0.01deg); }
    `,
    duration: 600,
    timing: 'ease',
    fill: 'both',
  },
}

export default animations
