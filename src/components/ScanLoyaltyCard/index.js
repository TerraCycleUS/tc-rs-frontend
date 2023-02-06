import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import Tesseract from 'tesseract.js'
import classNames from 'classnames'
import cameraClasses from '../Camera/Camera.module.scss'
import classes from './ScanLoyaltyCard.module.scss'
import CameraDenied from '../PopUps/CameraDenied'
import Text from '../Text'
import CarrefourLoyaltyHint from '../PopUps/CarrefourLoyaltyHint'
import Loader from '../Loader'
import LearnMoreBtn from '../LearnMoreBtn'

export default function ScanLoyaltyCard() {
  const [width] = useState(480)
  const [height, setHeight] = useState(0)
  let streaming = false
  const video = React.useRef(null)
  const canvas = React.useRef(null)
  const [showPop, setShowPop] = useState(false)
  const canvas1ref = React.useRef()
  const [digits, setDigits] = useState()
  const [showHint, setShowHint] = useState(false)
  const [loading, setLoading] = useState(false)

  function clearPhoto() {
    const context = canvas.current.getContext('2d')
    context.fillStyle = 'transparent'
    context.fillRect(0, 0, canvas.current.width, canvas.current.height)
  }

  function startup() {
    video.current = document.getElementById('video')
    video.current.autoplay = true
    video.current.playsInline = true
    canvas.current = document.getElementById('canvas')

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
    if (width && height) {
      canvas1ref.current.width = width
      canvas1ref.current.height = height
      const ctx = canvas1ref.current.getContext('2d')
      ctx.drawImage(video.current, 0, 0, width, height)

      const smallerSide = Math.min(width, height)
      // crop percentages should be the same as in css for user's aim
      const croppedWidth = smallerSide * 0.8
      const croppedHeight = smallerSide * 0.15
      const squareX0 = (width - smallerSide) / 2
      const squareY0 = (height - smallerSide) / 2
      const percentX0 = (smallerSide - croppedWidth) / 2
      const percentY0 = (smallerSide - croppedHeight) / 2

      canvas.current.width = croppedWidth
      canvas.current.height = croppedHeight

      context.drawImage(
        canvas1ref.current,
        squareX0 + percentX0,
        squareY0 + percentY0,
        croppedWidth,
        croppedHeight,
        0,
        0,
        croppedWidth,
        croppedHeight,
      )

      const data = canvas.current.toDataURL('image/png')
      Tesseract.recognize(data, 'eng')
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error(err)
          setLoading(false)
        })
        .then((result) => {
          // eslint-disable-next-line no-console
          console.log(result)
          setDigits(result?.data?.text.replace(/\D+/g, ''))
          setLoading(false)
        })
    } else {
      clearPhoto()
    }
  }

  function photoClick(e) {
    setLoading(true)
    takePicture()
    e.preventDefault()
  }

  function renderPop() {
    if (!showPop) return ''
    return <CameraDenied setShowPop={setShowPop} />
  }

  return (
    <div className={classNames(cameraClasses.cameraWrapper)}>
      <div className={cameraClasses.contentArea}>
        <div className={classNames(cameraClasses.camera)}>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video className={classNames(cameraClasses.cameraVideo)} id="video">
            Video stream not available.
          </video>

          <div className={classNames(classes.aimWrapper)}>
            <span className={`${classes.aim} ${classes.aim1}`} />
            <span className={`${classes.aim} ${classes.aim2}`} />
            <span className={`${classes.aim} ${classes.aim3}`} />
            <span className={`${classes.aim} ${classes.aim4}`} />

            {loading && <Loader className={classes.scanLoader} />}
          </div>
        </div>
        <canvas className={cameraClasses.cameraCanvas} id="canvas" />
        <canvas className={classes.hideCanvas} ref={canvas1ref} id="canvas1" />
      </div>
      <Text className={cameraClasses.cameraText}>
        <FormattedMessage
          id="scanLoyaltyCard:Text"
          defaultMessage="Please take a picture of the loyalty ID on your Carrefour or Pass card to register {learnMore}"
          values={{
            learnMore: <LearnMoreBtn onClick={() => setShowHint(true)} />,
          }}
        />
      </Text>
      {digits && (
        <Text className={cameraClasses.cameraText}>digits : {digits}</Text>
      )}
      <button
        type="button"
        onClick={(event) => photoClick(event)}
        id="start-button"
        className={classes.photoBtn}
        disabled={loading}
      >
        <div className={classes.innerCircle} />
      </button>
      {renderPop()}
      {showHint && <CarrefourLoyaltyHint closePop={() => setShowHint(false)} />}
    </div>
  )
}
