import React from 'react'
import PropTypes from 'prop-types'
import { getCategoryIcon } from '../Bin'
import classes from './WasteStream.module.scss'

export default function WasteStream({ enableLabels, categories }) {
  return (
    <div className={classes.categoryWrapper}>
      {categories?.map(({ id, title }) => (
        <div key={`category-${id}-${title}`} className={classes.category}>
          {getCategoryIcon(id, classes.categoryIcon)}
          {enableLabels && <p className={classes.categoryText}>{title}</p>}
        </div>
      ))}
    </div>
  )
}
WasteStream.propTypes = {
  enableLabels: PropTypes.bool,
  categories: PropTypes.array,
}
