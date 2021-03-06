import styled from 'styled-components'

export const PopContainer = styled.div`
  position: relative;
  height: fit-content;
  max-height: 100vh;
  width: 100%;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.terraWhite};
  box-shadow: 0px 14px 20px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 24px;
  overflow-y: auto;
  z-index: 101;

  .no-bg-btn {
    margin-top: 12px;
    margin-bottom: 26px;
  }

  .close-btn {
    position: absolute;
    top: 24px;
    right: 24px;
    cursor: pointer;
  }

  @media (min-width: 768px) {
    max-width: 50%;
  }

  &.max400 {
    max-width: 400px;
  }
`

export const PopWrapper = styled.div`
  position: fixed;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  z-index: 99;
  height: 100vh;
  width: 100vw;
  padding: 24px;
  background: rgba(108, 108, 108, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;

  ::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(15px);
    z-index: -100;
  }
`
