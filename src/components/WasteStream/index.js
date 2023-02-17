import React from 'react'
import PropTypes from 'prop-types'
import { getCategoryIcon } from '../Bin'
import classes from './WasteStream.module.scss'

export default function WasteStream({ enableLabels, categories, className }) {
  return (
    <div className={className || classes.categoryWrapper}>
      {categories?.map(({ id, title }) =>
        enableLabels ? (
          <div key={`category-${id}-${title}`} className={classes.category}>
            {getCategoryIcon(id, classes.categoryIcon)}
            <p className={classes.categoryText}>{title}</p>
          </div>
        ) : (
          getCategoryIcon(id, classes.categoryIcon, `category-${id}-${title}`)
        ),
      )}
    </div>
  )
}
WasteStream.propTypes = {
  enableLabels: PropTypes.bool,
  categories: PropTypes.array,
  className: PropTypes.string,
}
