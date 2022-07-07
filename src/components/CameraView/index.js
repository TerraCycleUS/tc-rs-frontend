import styled from 'styled-components'

export const GelImg = styled.img`
  width: 161px;
  height: 161px;
`

export const CameraImageWrapper = styled.div`
  position: relative;
  margin-bottom: 27px;
`

export const ChangeCamera = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  background-color: ${({ theme }) => theme.main};

  position: absolute;
  top: -25px;
  right: -25px;
`
