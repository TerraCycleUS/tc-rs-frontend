import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import Tesseract from 'tesseract.js'
import classNames from 'classnames'
import Button from '../Button'
import classes from '../Camera/Camera.module.scss'
import scanClasses from './ScanLoyaltyCard.module.scss'
import CameraDenied from '../PopUps/CameraDenied'
import Text from '../Text'

export default function ScanLoyaltyCard() {
  const [width] = useState(480)
  const [height, setHeight] = useState(0)
  let streaming = false
  const [photoTaken, setPhotoTaken] = useState(false)
  const video = React.useRef(null)
  const canvas = React.useRef(null)
  const photo = React.useRef(null)
  const navigate = useNavigate()
  const [productPhoto, setProductPhoto] = useState()
  const [cardNumber, setCardNumber] = useState()
  const [formatted, setFormatted] = useState()
  const [accuracy, setAccuracy] = useState()
  const [showPop, setShowPop] = useState(false)
  const location = useLocation()
  const values = location.state

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
          // video.current.play()
          video.current.load() // may create more problems
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
        // video.current.play()
        video.current.load() // may create more problems
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

          canvas.current.setAttribute('width', width) // OG
          canvas.current.setAttribute('height', height) // OG
          // canvas.current.setAttribute('width', width * 0.8)
          // canvas.current.setAttribute('height', height * 0.2)
          canvas.current.width = width * 0.8
          canvas.current.height = height * 0.2
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

  async function takePicture() {
    const context = canvas.current.getContext('2d')
    if (width && height) {
      canvas.current.width = width
      canvas.current.height = height

      // context.drawImage(video.current, 0, 0, width, height) // OG

      // context.drawImage(
      //   video.current,
      //   width * 0.01,
      //   height * 0.35,
      //   width * 0.98,
      //   height * 0.3,
      //   0,
      //   0,
      //   width * 0.98,
      //   height * 0.3,
      // )
      // context.drawImage(
      //   video.current,
      //   width * 0.1,
      //   height * 0.4,
      //   width * 0.8,
      //   height * 0.2,
      //   0,
      //   0,
      //   width * 0.8,
      //   height * 0.2,
      // )

      context.drawImage(
        video.current,
        width * 0.1,
        height * 0.4,
        width * 0.8,
        height * 0.2,
        0,
        0,
        width * 0.8,
        height * 0.2,
      )

      const data = canvas.current.toDataURL('image/png')
      // eslint-disable-next-line no-console
      console.log('photo take', data)

      // format image before finding numbers
      // const startWidth = width - (width / 100) * 98
      // const endWidth = (width / 100) * 98
      //
      // const starHeight = width - (width / 100) * 30
      // const endHeight = (width / 100) * 30

      // const newImg = canvas.current
      //   .getContext('2d')
      //   .drawImage(video.current, startWidth, starHeight, endWidth, endHeight)
      //   .toDataURL('image/png')
      //
      // console.log('newImg', newImg)
      // setFormatted(newImg)

      setFormatted(data)
      // then show it

      Tesseract.recognize(data, 'eng', {
        // eslint-disable-next-line no-console
        logger: (m) => console.log(m),
      })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error(err)
        })
        .then((result) => {
          // eslint-disable-next-line no-console
          console.log('result', result)
          // eslint-disable-next-line no-console
          console.log('result', result.data.text)
          // eslint-disable-next-line no-console
          console.log(
            'new regex',
            result.data.text.match(/\d{4}\s\d{4}\s\d{4}\s\d{4}/g)?.[0],
          )
          // console.log('4476 7889 9797 8788'.match(/\d{4}\s\d{4}\s\d{4}\s\d{4}/g))

          setAccuracy(result?.data?.confidence)
          setCardNumber(
            result?.data?.text.match(/\d{4}\s\d{4}\s\d{4}\s\d{4}/g)?.[0],
          )
        })

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
        {/* <Button */}
        {/*  type="button" */}
        {/*  id="link-button" */}
        {/*  className={classes.continueBtn} */}
        {/*  onClick={() => sendPhotoAndGo()} */}
        {/* > */}
        {/*  <FormattedMessage id="camera:Continue" defaultMessage="Continue" /> */}
        {/* </Button> */}
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
        <div className={classNames(classes.aimWrapper, scanClasses.aimWrapper)}>
          <span
            className={`${classes.aim} ${classes.aim1} ${scanClasses.aim1}`}
          />
          <span
            className={`${classes.aim} ${classes.aim2} ${scanClasses.aim2}`}
          />
          <span
            className={`${classes.aim} ${classes.aim3} ${scanClasses.aim3}`}
          />
          <span
            className={`${classes.aim} ${classes.aim4} ${scanClasses.aim4}`}
          />
        </div>
      </div>
      <Text className={classes.cameraText}>{renderText()}</Text>

      {cardNumber && (
        <p style={{ textAlign: 'center' }}>{cardNumber} Is this your number?</p>
      )}
      {renderButtons()}

      {accuracy && accuracy}
      {formatted && (
        <img
          style={{
            position: 'relative',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
          alt="formatted"
          src={formatted}
        />
      )}
      {renderPop()}
    </div>
  )
}

function formatImage() {}

function cropImage() {}
