import styled from 'styled-components'

const Text = styled.p`
  font-weight: 400;
  font-size: 15px;
  line-height: 25px;

  a {
    color: ${({ theme }) => theme.main};
  }
`

export const TextPrimary = styled.span`
  font-weight: bold;
  font-size: 15px;
  line-height: 24px;
  color: ${({ theme }) => theme.main};
`

export const TextError = styled.span`
  color: ${({ theme }) => theme.error};
  font-weight: 500;
  font-size: 13px;
  line-height: 22px;
  margin-top: 6px;
  display: block;
  width: 100%;
`

export default Text
