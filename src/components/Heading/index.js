import styled from 'styled-components'

const Heading = styled.h1`
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 34px;
  text-align: center;
  color: ${({ theme }) => theme.textPrimary};
`
export default Heading
