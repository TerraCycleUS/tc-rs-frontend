import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { ReactComponent as CameraIcon } from '../../assets/icons/camera.svg'
import classes from './CameraView.module.scss'
import CameraDenied from '../PopUps/CameraDenied'

export default function CameraView({ goTo, imageSrc, setPhoto, valuesToSave }) {
  const [width] = useState(480)
  const [height, setHeight] = useState(0)
  let streaming = false
  const video = React.useRef(null)
  const canvas = React.useRef(null)
  const photo = React.useRef(null)
  const [showPop, setShowPop] = useState(false)
  const compressing = 0.5

  function clearPhoto() {
    const context = canvas.current.getContext('2d')
    context.fillStyle = 'transparent'
    context.fillRect(0, 0, canvas.current.width, canvas.current.height)

    const data = canvas.current.toDataURL('image/png', compressing)
    photo.current.setAttribute('src', data)
  }

  function displayPhoto() {
    photo.current.setAttribute('src', imageSrc.productPhoto)
    setPhoto(imageSrc.productPhoto)
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
    if (!imageSrc) {
      clearPhoto()
      return
    }
    displayPhoto()
  }

  React.useEffect(() => {
    startup()
  }, [])

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
          <Link to={goTo} state={valuesToSave}>
            <button
              type="button"
              id="link-button"
              className={classes.photoButton}
            >
              <CameraIcon />
            </button>
          </Link>
        </div>
        <canvas className={classes.cameraCanvas} id="canvas" />
        <div className={classes.output}>
          <img
            id="photo"
            className={classes.cameraPhoto}
            alt="The screen capture will appear in this box."
          />
        </div>
      </div>
      {renderPop()}
    </div>
  )
}

CameraView.propTypes = {
  goTo: PropTypes.string,
  setPhoto: PropTypes.func,
  imageSrc: PropTypes.object,
  valuesToSave: PropTypes.object,
}
