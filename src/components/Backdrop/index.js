import styled from 'styled-components'

const Backdrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(108, 108, 108, 0.4);
  backdrop-filter: blur(15px);
  max-width: none;
  max-height: none;
`

export default Backdrop
