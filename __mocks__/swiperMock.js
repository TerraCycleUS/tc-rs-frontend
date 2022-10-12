// eslint-disable-next-line import/no-import-module-exports
import React from 'react'
// eslint-disable-next-line import/no-import-module-exports
import PropTypes from 'prop-types'

export function Swiper({ children }) {
  return <div>{children}</div>
}
Swiper.propTypes = {
  children: PropTypes.node,
}

export function SwiperSlide({ children }) {
  return <div>{children}</div>
}
SwiperSlide.propTypes = {
  children: PropTypes.node,
}

module.exports = {
  Swiper,
  SwiperSlide,
}
