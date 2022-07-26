import React from 'react'
import { useNavigate } from 'react-router-dom'
import Camera from '../../components/Camera'
import { ReactComponent as ForwardArrowGreen } from '../../assets/icons/forward-arrow-green.svg'
import classes from './TakePhoto.module.scss'

export default function TakePhoto() {
  const navigate = useNavigate()

  return (
    <div className={classes.takePhotoWrapper}>
      <nav className={classes.takePhotoNav}>
        <button type="button" onClick={() => navigate(-1)}>
          <ForwardArrowGreen />
        </button>
      </nav>
      <Camera />
    </div>
  )
}
