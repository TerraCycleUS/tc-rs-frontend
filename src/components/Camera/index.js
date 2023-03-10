import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import classes from './Camera.module.scss'
import Button from '../Button'
import Text from '../Text'
import CameraDenied from '../PopUps/CameraDenied'
import getUserMedia from '../../utils/getUserMedia'

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

export default function Camera() {
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
  const [videoStream, setStream] = React.useState()
  const location = useLocation()
  const values = location.state
  const compressing = 0.5

  function clearPhoto() {
    const context = canvas.current.getContext('2d')
    context.fillStyle = 'transparent'
    context.fillRect(0, 0, canvas.current.width, canvas.current.height)

    const data = canvas.current.toDataURL('image/png', compressing)
    photo.current.setAttribute('src', data)
  }

  function startup() {
    if (videoStream) return
    video.current.autoplay = true
    video.current.playsInline = true

    const constraints = {
      audio: false,
      video: {
        facingMode: 'environment',
      },
    }

    getUserMedia(constraints)
      .then((stream) => {
        if (!video.current) return
        video.current.srcObject = stream
        setStream(stream)
        video.current.load()
      })
      .catch((err) => {
        if (err.name === 'NotAllowedError') setShowPop(true)
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

  function close() {
    videoStream?.getTracks().forEach((track) => {
      track.stop()
    })
  }

  React.useLayoutEffect(() => {
    startup()

    return close
  }, [videoStream])

  function takePicture() {
    const context = canvas.current.getContext('2d')
    if (width && height) {
      canvas.current.width = width
      canvas.current.height = height
      context.drawImage(video.current, 0, 0, width, height)

      const data = canvas.current.toDataURL('image/png', compressing)
      setProductPhoto(data)
      photo.current.setAttribute('src', data)
      setPhotoTaken(true)
    } else {
      clearPhoto()
    }
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

  return (
    <div className={classes.cameraWrapper}>
      <div className={classes.contentArea}>
        <div className={classes.camera}>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video className={classes.cameraVideo} id="video" ref={video}>
            Video stream not available.
          </video>
        </div>
        <canvas className={classes.cameraCanvas} id="canvas" ref={canvas} />
        <div className={classes.output}>
          <img
            id="photo"
            className={classes.cameraPhoto}
            alt="The screen capture will appear in this box."
            ref={photo}
          />
        </div>
        <div className={classes.aimWrapper}>
          <span className={`${classes.aim} ${classes.aim1}`} />
          <span className={`${classes.aim} ${classes.aim2}`} />
          <span className={`${classes.aim} ${classes.aim3}`} />
          <span className={`${classes.aim} ${classes.aim4}`} />
        </div>
      </div>
      <Text className={classes.cameraText}>{renderText()}</Text>
      {renderButtons()}
      {renderPop()}
    </div>
  )
}
