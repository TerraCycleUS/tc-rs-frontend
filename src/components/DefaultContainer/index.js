import styled from 'styled-components'

const DefaultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 16px;
  background-color: ${({ theme }) => theme.terraGrey};

  &.for-home {
    margin-bottom: 23px;
  }
`

export default DefaultContainer
