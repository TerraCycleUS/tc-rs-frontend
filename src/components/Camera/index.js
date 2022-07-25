import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { ReactComponent as CameraIcon } from '../../assets/icons/camera.svg'
import classes from './Camera.module.scss'

export default function Camera({ goTo, setPhoto }) {
  const width = 1080
  let height = 810
  let streaming = false
  const video = React.useRef(null)
  const canvas = React.useRef(null)
  const photo = React.useRef(null)

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

    if (!navigator.mediaDevices) {
      navigator
        .mozGetUserMedia({ video: true, audio: false })
        .then((stream) => {
          video.current.srcObject = stream
          video.current.play()
        })
        .catch((err) => {
          console.log(`An error occurred: ${err}`)
        })
    }
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        video.current.srcObject = stream
        video.current.play()
      })
      .catch((err) => {
        console.log(`An error occurred: ${err}`)
      })

    video.current.addEventListener(
      'canplay',
      () => {
        if (!streaming) {
          height =
            video.current.videoHeight / (video.current.videoWidth / width)
          // Firefox currently has a bug where the height can't be read from
          // the video, so we will make assumptions if this happens.

          if (Number.isNaN(height)) {
            height = width / (4 / 3)
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
      setPhoto(data)
      photo.current.setAttribute('src', data)
    } else {
      clearPhoto()
    }
  }

  function photoClick(e) {
    takePicture()
    e.preventDefault()
  }

  function renderButton() {
    if (!goTo)
      return (
        <button
          type="button"
          onClick={(event) => photoClick(event)}
          id="start-button"
          className={classes.photoButton}
        >
          <CameraIcon />
        </button>
      )
    return (
      <Link to={goTo}>
        <button type="button" id="link-button" className={classes.photoButton}>
          <CameraIcon />
        </button>
      </Link>
    )
  }

  return (
    <div className={classes.cameraWrapper}>
      <div className={classes.contentArea}>
        <div className={classes.camera}>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video className={classes.cameraVideo} id="video">
            Video stream not available.
          </video>
          {renderButton()}
        </div>
        <canvas className={classes.cameraCanvas} id="canvas" />
        <div className="output">
          <img
            id="photo"
            className={classes.cameraPhoto}
            alt="The screen capture will appear in this box."
          />
        </div>
      </div>
    </div>
  )
}

Camera.propTypes = {
  goTo: PropTypes.string,
  setPhoto: PropTypes.func,
}
