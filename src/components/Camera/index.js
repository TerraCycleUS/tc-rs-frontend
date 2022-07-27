import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import classes from './Camera.module.scss'
import Button from '../Button'
import Text from '../Text'
import CameraDenied from '../PopUps/CameraDenied'

export default function Camera() {
  const [width] = useState(1920)
  const [height, setHeight] = useState(0)
  let streaming = false
  const [photoTaken, setPhotoTaken] = useState(false)
  const video = React.useRef(null)
  const canvas = React.useRef(null)
  const photo = React.useRef(null)
  const navigate = useNavigate()
  const [productPhoto, setProductPhoto] = useState()
  const [showPop, setShowPop] = useState(false)

  function clearPhoto() {
    const context = canvas.current.getContext('2d')
    context.fillStyle = 'transparent'
    context.fillRect(0, 0, canvas.current.width, canvas.current.height)

    const data = canvas.current.toDataURL('image/png')
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
          video.current.play()
        },
        (error) => {
          setShowPop(true)
          console.log(`An error occurred: ${error}`)
        },
      )
    }
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        video.current.srcObject = stream
        video.current.play()
      })
      .catch((err) => {
        setShowPop(true)
        console.log(`An error occurred: ${err}`)
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
    if (width && height) {
      canvas.current.width = width
      canvas.current.height = height
      context.drawImage(video.current, 0, 0, width, height)

      const data = canvas.current.toDataURL('image/png')
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
    const data = canvas.current.toDataURL('image/png')
    photo.current.setAttribute('src', data)
    setPhotoTaken(false)
  }

  function renderText() {
    if (!photoTaken)
      return (
        <FormattedMessage
          id="camera:ClickPicture"
          defaultMessage="Please click a photo of the product"
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
    const data = { productPhoto }
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
