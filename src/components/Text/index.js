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

export const Description = styled.p`
  font-weight: 400;
  font-size: 13px;
  line-height: 22px;
  padding: 8px 25px;
  background-color: ${({ theme }) => theme.secondaryGreen};
  color: ${({ theme }) => theme.main};
  border-radius: 15px;
`

export const Label = styled.label`
  display: block;
  font-weight: bold;
  font-size: 14px;
  line-height: 21px;
  margin-bottom: 6px;
  color: ${({ theme }) => theme.main};
`

export const H2 = styled.h2`
  font-weight: 700;
  font-size: 28px;
  line-height: 40px;
  text-align: center;
  color: ${({ theme }) => theme.textBlack};
`

export default Text
