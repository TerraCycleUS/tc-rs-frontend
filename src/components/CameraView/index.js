import React from 'react'
import Camera from 'react-html5-camera-photo'
import styled from 'styled-components'
import CameraIcon from '../../assets/icons/camera.svg'

export default function CameraView() {
  function handleTakePhoto(dataUri) {
    console.log(dataUri)
  }

  return (
    <CameraImageWrapper>
      <Camera
        idealResolution={{ width: 161, height: 161 }}
        isSilentMode
        onTakePhoto={(dataUri) => {
          handleTakePhoto(dataUri)
        }}
      />
    </CameraImageWrapper>
  )
}

export const CameraImageWrapper = styled.div`
  position: relative;
  margin-bottom: 27px;
  width: 161px;
  height: 161px;

  .react-html5-camera-photo {
    border-radius: 20px;
    video {
      width: auto;
      border-radius: 20px;
    }
    img {
      width: auto;
      border-radius: 20px;
    }
    #container-circles {
      #outer-circle {
        position: static;
        width: 50px;
        height: 50px;
        border-radius: 100%;
        background-color: ${({ theme }) => theme.main};
        background-image: url(${CameraIcon});
        background-repeat: no-repeat;
        background-position: center;
        #inner-circle {
          display: none;
        }
      }
    }
  }

  #container-circles {
    top: -25px;
    right: -25px;
    left: auto;
  }
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
