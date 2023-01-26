import React, { useState } from 'react'
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
  // TODO to display to user photo he took?
  // const photo = React.useRef(null)
  const [cardNumber, setCardNumber] = useState()
  const [formatted, setFormatted] = useState()
  const [accuracy, setAccuracy] = useState()
  const [showPop, setShowPop] = useState(false)
  const canvas1ref = React.useRef()

  function clearPhoto() {
    const context = canvas.current.getContext('2d')
    context.fillStyle = 'transparent'
    context.fillRect(0, 0, canvas.current.width, canvas.current.height)

    // const data = canvas.current.toDataURL('image/png')
    // TODO to display to user photo he took?
    // photo.current.setAttribute('src', data)
  }

  function startup() {
    video.current = document.getElementById('video')
    video.current.autoplay = true
    video.current.playsInline = true
    canvas.current = document.getElementById('canvas')
    // TODO to display to user photo he took?
    // photo.current = document.getElementById('photo')

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
          // canvas.current.width = width
          // canvas.current.height = height
          // canvas.current.setAttribute('width', width * 0.8)
          // canvas.current.setAttribute('height', height * 0.2)
          // canvas.current.width = width * 0.8
          // canvas.current.height = height * 0.2
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
      canvas1ref.current.width = width
      canvas1ref.current.height = height
      const ctx = canvas1ref.current.getContext('2d')
      ctx.drawImage(video.current, 0, 0, width, height)

      const smallerSide = Math.min(width, height)
      canvas.current.width = smallerSide * 0.8
      canvas.current.height = smallerSide * 0.2
      const squareX0 = (width - smallerSide) / 2
      const squareY0 = (height - smallerSide) / 2

      const percentX0 = (smallerSide - smallerSide * 0.8) / 2
      const percentY0 = (smallerSide - smallerSide * 0.2) / 2

      context.drawImage(
        canvas1ref.current,
        squareX0 + percentX0,
        squareY0 + percentY0,
        smallerSide * 0.8,
        smallerSide * 0.2,
        0,
        0,
        smallerSide * 0.8,
        smallerSide * 0.2,
      )

      const data = canvas.current.toDataURL('image/png')

      setFormatted(data)
      // then show it

      Tesseract.recognize(data, 'eng')
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
            'regex',
            result.data.text.match(/\d{4}\s\d{4}\s\d{4}\s\d{4}/g)?.[0],
          )

          setAccuracy(result?.data?.confidence)
          setCardNumber(
            result?.data?.text.match(/\d{4}\s\d{4}\s\d{4}\s\d{4}/g)?.[0],
          )
        })

      // TODO to display to user photo he took?
      // photo.current.setAttribute('src', data)
      setPhotoTaken(true)
    } else {
      clearPhoto()
    }
  }

  function photoClick(e) {
    takePicture()
    e.preventDefault()
  }

  // function rebootCamera() {
  //   canvas.current
  //     .getContext('2d')
  //     .clearRect(0, 0, canvas.current.width, canvas.current.height)
  //   const data = canvas.current.toDataURL('image/png')
  //   // TODO to display to user photo he took?
  //   // photo.current.setAttribute('src', data)
  //   setPhotoTaken(false)
  // }

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

  // function renderButtons() {
  //   if (!photoTaken)
  //     return (
  //       <Button
  //         type="button"
  //         onClick={(event) => photoClick(event)}
  //         id="start-button"
  //         className={classes.photoBtn}
  //       >
  //         <FormattedMessage
  //           id="camera:TakePhoto"
  //           defaultMessage="Take a photo"
  //         />
  //       </Button>
  //     )
  //   return (
  //     <Button
  //       type="button"
  //       inverted
  //       id="link-button"
  //       onClick={() => rebootCamera()}
  //       className={classes.resetBtn}
  //     >
  //       <FormattedMessage
  //         id="camera:Rephotograph"
  //         defaultMessage="Rephotograph"
  //       />
  //     </Button>
  //   )
  // }

  function renderButtons() {
    return (
      <Button
        type="button"
        onClick={(event) => photoClick(event)}
        id="start-button"
        className={classes.photoBtn}
      >
        <FormattedMessage id="camera:TakePhoto" defaultMessage="Take a photo" />
      </Button>
    )
  }

  function renderPop() {
    if (!showPop) return ''
    return <CameraDenied setShowPop={setShowPop} />
  }

  return (
    <div className={classNames(classes.cameraWrapper)}>
      <div className={classes.contentArea}>
        <div className={classNames(classes.camera)}>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video
            className={classNames(classes.cameraVideo)}
            id="video"
            width={width} // problem here?
            height={height} // problem here?
          >
            Video stream not available.
          </video>
          {/* <div */}
          {/*  className={scanClasses.aim} */}
          {/*  style={{ */}
          {/*    width: width * 0.8, */}
          {/*    height: height * 0.2 , */}
          {/*  }} */}
          {/* /> */}

          <div
            className={classNames(classes.aimWrapper, scanClasses.aimWrapper)}
          >
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

        {/* might be problem here */}
        <canvas className={classes.cameraCanvas} id="canvas" />
        {/* <canvas ref={canvas1ref} id="canvas1" width={width} height={height} /> */}
        <canvas ref={canvas1ref} id="canvas1" />
        {/* TODO to display to user photo he took? */}
        {/* <div className={classes.output}> */}
        {/*  <img */}
        {/*    id="photo" */}
        {/*    className={classes.cameraPhoto} */}
        {/*    alt="The screen capture will appear in this box." */}
        {/*  /> */}
        {/* </div> */}
      </div>
      <Text>{renderText()}</Text>

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
