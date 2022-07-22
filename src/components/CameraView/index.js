import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Webcam from 'react-webcam'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { ReactComponent as CameraIcon } from '../../assets/icons/camera.svg'
export default function CameraView({ setPhoto, goTo }) {
  const videoConstraints = {
    width: 1920,
    height: 1920,
    facingMode: 'environment',
  }
  const webcamRef = React.useRef(null)
  const [cameraPermissionGranted, setCameraPermissionGranted] = useState()
  async function getMedia() {
    console.log('navigator.mediaDevices.getUserMedia again')
    // try {
    //   if (navigator.getUserMedia) {
    //     console.log('navigator.getUserMedia', navigator.getUserMedia)
    //     return await navigator.getUserMedia(constraints)
    //   }
    //   if (navigator.webkitGetUserMedia) {
    //     console.log(
    //       'navigator.webkitGetUserMedia',
    //       navigator.webkitGetUserMedia,
    //     )
    //     return await navigator.webkitGetUserMedia(constraints)
    //   }
    //   if (navigator.mediaDevices) {
    //     console.log('navigator.mediaDevices', navigator.mediaDevices)
    //     return await navigator.mediaDevices.getUserMedia(constraints)
    //   }
    //   return null
    // } catch {
    //   return null
    // }
    const constraints = { video: true }
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia

    if (navigator.getUserMedia) {
      navigator.getUserMedia(
        constraints,
        () => {
          setCameraPermissionGranted(true)
        },
        () => {
          setCameraPermissionGranted(false)
        },
      )
    }
  }

  useEffect(() => {
    getMedia().then((response) => {
      setCameraPermissionGranted(response)
    })
  }, [])

  console.log(cameraPermissionGranted)
  function getLinkOrButton(getScreenshot) {
    if (setPhoto) {
      return (
        <ChangeCamera
          type="button"
          onClick={() => {
            setPhoto(getScreenshot())
          }}
        >
          <CameraIcon />
        </ChangeCamera>
      )
    }
    if (goTo) {
      return (
        <Link to={goTo}>
          <ChangeCamera type="button">
            <CameraIcon />
          </ChangeCamera>
        </Link>
      )
    }

    return null
  }

  function renderCamera() {
    if (!cameraPermissionGranted) return ''
    return (
      <Webcam
        audio={false}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={720}
        videoConstraints={videoConstraints}
      >
        {({ getScreenshot }) => getLinkOrButton(getScreenshot)}
      </Webcam>
    )
  }

  return <CameraImageWrapper>{renderCamera()}</CameraImageWrapper>
}

CameraView.propTypes = {
  setPhoto: PropTypes.func,
  goTo: PropTypes.string,
}

export const CameraImageWrapper = styled.div`
  position: relative;
  margin-bottom: 27px;
  width: 161px;
  height: 161px;

  video {
    width: 100%;
    height: 100%;
    border-radius: 20px;
    object-fit: cover;
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
