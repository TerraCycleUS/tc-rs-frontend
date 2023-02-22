/* eslint-disable */
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import classes from './Camera.module.scss'
import Button from '../Button'
import CameraDenied from '../PopUps/CameraDenied'
import Text from '../Text'

export function takePictureFromVideo({
  canvasEl,
  width,
  height,
  videoEl,
  compressing,
  type,
}) {
  const context = canvasEl.getContext('2d')
  // eslint-disable-next-line no-param-reassign
  canvasEl.width = width
  // eslint-disable-next-line no-param-reassign
  canvasEl.height = height
  context.drawImage(videoEl, 0, 0, width, height)
  return canvasEl.toDataURL(type, compressing)
}

// export function stop(videoEl) {
//   if (!videoEl) return
//   const stream = videoEl.srcObject
//   const tracks = stream?.getTracks()
//
//   tracks?.forEach((track) => {
//     track.stop()
//   })
//
//   // eslint-disable-next-line no-param-reassign
//   videoEl.srcObject = null
// }

export default function CameraScan2() {
  const [width] = useState(480)
  const [height, setHeight] = useState(0)
  let streaming = false
  const [photoTaken, setPhotoTaken] = useState(false)
  const video = React.useRef(null)
  const canvas = React.useRef(null)
  const photo = React.useRef(null)
  const navigate = useNavigate()
  const [productPhoto, setProductPhoto] = useState()
  const [showPop, setShowPop] = useState(false)
  const location = useLocation()
  const values = location.state
  const compressing = 0.5
  const barRef = React.useRef()
  const canvasRef = React.useRef()
  const canvas1Ref = React.useRef()
  const photoRef = React.useRef()
  const photoRef1 = React.useRef()
  const pw = 0.95
  const ph = 0.2

  function clearPhoto() {
    const context = canvas.current.getContext('2d')
    context.fillStyle = 'transparent'
    context.fillRect(0, 0, canvas.current.width, canvas.current.height)

    const data = canvas.current.toDataURL('image/png', compressing)
    photo.current.setAttribute('src', data)
  }

  function startup() {
    video.current = document.getElementById('video')
    video.current.autoplay = true
    video.current.playsInline = true
    canvas.current = document.getElementById('canvas')
    photo.current = document.getElementById('photo')

    const constraints = {
      audio: false,
      video: {
        facingMode: 'environment',
      },
    }

    if (!navigator.mediaDevices) {
      navigator.getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia
      navigator.getUserMedia(
        constraints,
        (stream) => {
          video.current.srcObject = stream
          video.current.load()
        },
        (error) => {
          setShowPop(true)
          console.log(`An error occurred: ${error}`) // eslint-disable-line
        },
      )
    }
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        video.current.srcObject = stream
        video.current.load()
      })
      .catch((err) => {
        setShowPop(true)
        console.log(`An error occurred: ${err}`) // eslint-disable-line
      })

    video.current.addEventListener(
      'canplay',
      () => {
        if (!streaming) {
          setHeight(
            video.current.videoHeight / (video.current.videoWidth / width),
          )
          // Firefox currently has a bug where the height can't be read from
          // the video, so we will make assumptions if this happens.

          if (Number.isNaN(height)) {
            setHeight(width / (4 / 3))
          }

          video.current.setAttribute('width', width)
          video.current.setAttribute('height', height)
          canvas.current.setAttribute('width', width)
          canvas.current.setAttribute('height', height)
          streaming = true
        }
      },
      false,
    )
    clearPhoto()
  }

  React.useEffect(() => {
    startup()
  }, [])

  function takePicture() {
    const context = canvas.current.getContext('2d')
    const { videoWidth, videoHeight } = video.current
    const side = Math.min(videoWidth, videoHeight)
    const offsetX = (videoWidth - side) / 2
    const offsetY = (videoHeight - side) / 2
    console.log({ offsetX, offsetY })
    canvas.current.width = side
    canvas.current.height = side
    const sx = offsetX + (side * (1 - pw)) / 2
    const sy = offsetY + (side * (1 - ph)) / 2
    context.drawImage(
      video.current,
      offsetX,
      offsetY,
      side,
      side,
      0,
      0,
      side,
      side,
    )

    const data = canvas.current.toDataURL('image/png', compressing)
    setProductPhoto(data)
    photo.current.setAttribute('src', data)
    setPhotoTaken(true)

    const ctx = canvasRef.current.getContext('2d')
    canvasRef.current.width = side * pw
    canvasRef.current.height = side * ph
    ctx.drawImage(
      video.current,
      sx,
      sy,
      side * pw,
      side * ph,
      0,
      0,
      side * pw,
      side * ph,
    )
    const data1 = canvasRef.current.toDataURL('image/png', compressing)
    photoRef1.current.src = data1
  }

  function photoClick(e) {
    takePicture()
    e.preventDefault()
  }

  function rebootCamera() {
    canvas.current
      .getContext('2d')
      .clearRect(0, 0, canvas.current.width, canvas.current.height)
    const data = canvas.current.toDataURL('image/png', compressing)
    photo.current.setAttribute('src', data)
    setPhotoTaken(false)
  }

  function renderText() {
    if (!photoTaken)
      return (
        <FormattedMessage
          id="camera:ClickPicture"
          defaultMessage="Take a picture to save your item.\nPicture must be of the entire product with label."
        />
      )
    return (
      <FormattedMessage
        id="camera:PictureTaken"
        defaultMessage="Picture taken"
      />
    )
  }

  function sendPhotoAndGo() {
    if (!values) {
      const data = { productPhoto }
      navigate('../save-item', { state: data })
      return
    }
    const { currentCategory, currentBrand, otherBrandValue } = values
    const data = {
      productPhoto,
      currentCategory,
      currentBrand,
      otherBrandValue,
    }
    navigate('../save-item', { state: data })
  }

  function renderButtons() {
    if (!photoTaken)
      return (
        <Button
          type="button"
          onClick={(event) => photoClick(event)}
          id="start-button"
          className={classes.photoBtn}
        >
          <FormattedMessage
            id="camera:TakePhoto"
            defaultMessage="Take a photo"
          />
        </Button>
      )
    return (
      <>
        <Button
          type="button"
          id="link-button"
          className={classes.continueBtn}
          onClick={() => sendPhotoAndGo()}
        >
          <FormattedMessage id="camera:Continue" defaultMessage="Continue" />
        </Button>
        <Button
          type="button"
          inverted
          id="link-button"
          onClick={() => rebootCamera()}
          className={classes.resetBtn}
        >
          <FormattedMessage
            id="camera:Rephotograph"
            defaultMessage="Rephotograph"
          />
        </Button>
      </>
    )
  }

  function renderPop() {
    if (!showPop) return ''
    return <CameraDenied setShowPop={setShowPop} />
  }
  const { videoWidth, videoHeight } = video.current || {}
  const a = videoWidth / videoHeight
  return (
    <div className={classes.cameraWrapper}>
      <div className={classes.contentArea}>
        <div className={classes.camera}>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video className={classes.cameraVideo} id="video">
            Video stream not available.
          </video>
        </div>
        <canvas className={classes.cameraCanvas} id="canvas" />
        <div className={classes.output}>
          <img
            id="photo"
            className={classes.cameraPhoto}
            alt="The screen capture will appear in this box."
          />
        </div>
        <div className={classes.bar} ref={barRef}></div>
      </div>
      <img ref={photoRef} className="w-100" />
      <img ref={photoRef1} className="" />
      {renderButtons()}
      {video.current ? (
        <>
          <h1>videoWidth: {videoWidth}</h1>
          <h1>videoHeight: {videoHeight}</h1>
          <h1>a: {a}</h1>
        </>
      ) : null}
      <Text className={classes.cameraText}>{renderText()}</Text>
      <canvas ref={canvasRef} className="d-none"></canvas>
      <canvas ref={canvas1Ref}></canvas>
      {renderPop()}
    </div>
  )
}
