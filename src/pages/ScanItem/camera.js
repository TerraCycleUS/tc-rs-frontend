/* eslint-disable */
import React from 'react'
import styled from 'styled-components'

function init() {
  const width = 320 // We will scale the photo width to this
  let height = 0 // This will be computed based on the input stream

  // |streaming| indicates whether or not we're currently streaming
  // video from the camera. Obviously, we start at false.

  let streaming = false

  // The various HTML elements we need to configure or control. These
  // will be set by the startup() function.

  let video = null
  let canvas = null
  let photo = null
  let startbutton = null

  function startup() {
    video = document.getElementById('video')
    video.autoplay = true
    video.playsInline = true

    canvas = document.getElementById('canvas')
    photo = document.getElementById('photo')
    startbutton = document.getElementById('startbutton')

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        video.srcObject = stream
        video.play()
      })
      .catch((err) => {
        console.log(`An error occurred: ${err}`)
      })

    video.addEventListener(
      'canplay',
      () => {
        if (!streaming) {
          height = video.videoHeight / (video.videoWidth / width)

          // Firefox currently has a bug where the height can't be read from
          // the video, so we will make assumptions if this happens.

          if (Number.isNaN(height)) {
            height = width / (4 / 3)
          }

          video.setAttribute('width', width)
          video.setAttribute('height', height)
          canvas.setAttribute('width', width)
          canvas.setAttribute('height', height)
          streaming = true
        }
      },
      false,
    )

    startbutton.addEventListener(
      'click',
      (ev) => {
        takepicture()
        ev.preventDefault()
      },
      false,
    )

    clearphoto()
  }

  // Fill the photo with an indication that none has been
  // captured.

  function clearphoto() {
    const context = canvas.getContext('2d')
    context.fillStyle = '#AAA'
    context.fillRect(0, 0, canvas.width, canvas.height)

    const data = canvas.toDataURL('image/png')
    photo.setAttribute('src', data)
  }

  // Capture a photo by fetching the current contents of the video
  // and drawing it into a canvas, then converting that to a PNG
  // format data URL. By drawing it on an offscreen canvas and then
  // drawing that to the screen, we can change its size and/or apply
  // other changes before drawing it.

  function takepicture() {
    const context = canvas.getContext('2d')
    if (width && height) {
      canvas.width = width
      canvas.height = height
      context.drawImage(video, 0, 0, width, height)

      const data = canvas.toDataURL('image/png')
      photo.setAttribute('src', data)
    } else {
      clearphoto()
    }
  }

  // Set up our event listener to run the startup process
  // once loading is complete.
  startup()
}

export default function Camera() {
  React.useEffect(() => {
    init()
  }, [])

  return (
    <Wrapper>
      <div className="contentarea">
        <h1>
          MDN - navigator.mediaDevices.getUserMedia(): Still photo capture demo
        </h1>
        <p>
          This example demonstrates how to set up a media stream using your
          built-in webcam, fetch an image from that stream, and create a PNG
          using that image.
        </p>
        <div className="camera">
          <video id="video">Video stream not available.</video>
          <button id="startbutton">Take photo</button>
        </div>
        <canvas id="canvas"></canvas>
        <div className="output">
          <img id="photo" alt="The screen capture will appear in this box." />
        </div>
        <p>
          Visit our article{' '}
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Taking_still_photos">
            {' '}
            Taking still photos with WebRTC
          </a>{' '}
          to learn more about the technologies used here.
        </p>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  #video {
    border: 1px solid black;
    box-shadow: 2px 2px 3px black;
    width: 320px;
    height: 240px;
  }

  #photo {
    border: 1px solid black;
    box-shadow: 2px 2px 3px black;
    width: 320px;
    height: 240px;
  }

  #canvas {
    display: none;
  }

  .camera {
    width: 340px;
    display: block;
    margin: auto;
  }

  .output {
    width: 340px;
    display: block;
    margin: auto;
  }

  #startbutton {
    display: block;
    position: relative;
    margin-left: auto;
    margin-right: auto;
    bottom: 32px;
    background-color: rgba(0, 150, 0, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.7);
    box-shadow: 0px 0px 1px 2px rgba(0, 0, 0, 0.2);
    font-size: 14px;
    font-family: 'Lucida Grande', 'Arial', sans-serif;
    color: rgba(255, 255, 255, 1);
  }

  .contentarea {
    font-size: 16px;
    font-family: 'Lucida Grande', 'Arial', sans-serif;
  }
`
