import styled from 'styled-components'

export const Bubble = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 19px;
  margin-bottom: 30px;
  position: relative;
  box-shadow: 0px 14px 20px rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  background: ${({ theme }) => theme.terraWhite};
  z-index: 5;

  .bubble-icon {
    margin-right: 34px;
    width: 40px;
    flex-shrink: 0;
  }

  .arrow {
    position: absolute;
    transform-origin: center;
    transform: translateX(-50%);
    left: 50%;
    bottom: -10px;
  }

  * {
    z-index: 5;
  }
`

export const BubbleEnd = styled.div`
  background-color: ${({ theme }) => theme.terraWhite};
  width: 40px;
  height: 40px;
  position: absolute;
  z-index: -3;
  bottom: -12px;
  left: 50%;
  transform-origin: center;
  transform: translateX(-50%) rotate(45deg);
  border-radius: 7px;
`

export const BubbleContainer = styled.div`
  padding: 0 8px;
  margin-bottom: 2px;
  width: 100%;
`
