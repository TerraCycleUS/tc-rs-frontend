/* eslint-disable */
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import Tesseract from 'tesseract.js'
import classNames from 'classnames'
import Button from '../Button'
// import classes from '../Camera/Camera.module.scss'
import scanClasses from './ScanLoyaltyCard.module.scss'
import CameraDenied from '../PopUps/CameraDenied'
import Text from '../Text'

export default function ScanLoyaltyCard() {
  const [width] = useState(720)
  const height = width * 0.75
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
  const canvas1ref = React.useRef()

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
      ctx.drawImage(video.current, 0, 0, width, height) // OG

      canvas.current.width = width * 0.8
      canvas.current.height = height * 0.2
      context.drawImage(
        canvas1ref.current,
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
          // className={classes.photoBtn}
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
          inverted
          id="link-button"
          onClick={() => rebootCamera()}
          // className={classes.resetBtn}
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
    <div className={classNames( scanClasses.wrapper)}>
      <div >
        <div className={scanClasses.camera}>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video className={classNames( scanClasses.video)} id="video" width={width} height={height}>
            Video stream not available.
          </video>
          <div className={scanClasses.aim}
           style={{width: width * 0.8, height: height * 0.2,/* left: width * 0.1, top: height * 0.4*/}}></div>
        </div>
        <canvas id="canvas" />
        <canvas ref={canvas1ref} id="canvas1" width={width} height={height} />
        <div >
          <img
            id="photo"
            
            alt="The screen capture will appear in this box."
          />
        </div>
       
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

