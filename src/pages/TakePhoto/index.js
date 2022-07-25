import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Camera from '../../components/Camera'

export default function TakePhoto() {
  const [photo, setPhoto] = useState()

  return (
    <div>
      <div>
        <Link>Back</Link>
      </div>
      <Camera setPhoto={setPhoto} />
      <button type="button">Take a photo</button>
    </div>
  )
}
