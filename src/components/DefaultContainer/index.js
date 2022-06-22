import styled from 'styled-components'

const DefaultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 16px;
  height: 100vh;
  background-color: ${({ theme }) => theme.terraGrey};
`

export default DefaultContainer
