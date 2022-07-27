import React from 'react'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { ReactComponent as HairCareIcon } from '../../assets/icons/hair-care.svg'
import { ReactComponent as DeodorantsIcon } from '../../assets/icons/deoderants.svg'
import { ReactComponent as ShowerBathSoapIcon } from '../../assets/icons/shower-bath-soap.svg'
import { ReactComponent as OralCareIcon } from '../../assets/icons/oral-care.svg'
import { ReactComponent as MakeupSkincareIcon } from '../../assets/icons/makeup-&-skincare.svg'
import { ReactComponent as GroomingIcon } from '../../assets/icons/grooming.svg'
import { ReactComponent as TrashBin } from '../../assets/icons/trash-bin.svg'
import Text from '../Text'
import classes from './Bin.module.scss'

export function getCategoryIcon(category) {
  switch (category) {
    case 1:
      return <HairCareIcon />

    case 2:
      return <DeodorantsIcon />

    case 3:
      return <ShowerBathSoapIcon />

    case 4:
      return <OralCareIcon />

    case 5:
      return <MakeupSkincareIcon />

    case 6:
      return <GroomingIcon />

    default:
      return null
  }
}

export function NoItemsWrapper() {
  return (
    <div className={classes.noItems}>
      <div className={classes.circleBinIcon}>
        <TrashBin className="bin-icon" />
      </div>
      <Text className="empty-text">
        <FormattedMessage
          id="recyclingBin:CollectProducts"
          defaultMessage="Collect products for your virtual recycling bin"
        />
      </Text>
    </div>
  )
}

export function BinWrapper({ children }) {
  return <div className={classes.binWrapper}>{children}</div>
}
BinWrapper.propTypes = {
  children: PropTypes.node,
}

export function ProductContainer({ children, className }) {
  return (
    <div className={classNames(classes.productContainer, className)}>
      {children}
    </div>
  )
}
ProductContainer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

export function ProductDescription({ children, className }) {
  return (
    <div className={classNames(classes.productDescription, className)}>
      {children}
    </div>
  )
}
ProductDescription.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

export function ProductBrand({ children }) {
  return <p className={classes.productBrand}>{children}</p>
}
ProductBrand.propTypes = {
  children: PropTypes.node,
}

export function ProductCategory({ children }) {
  return <p className={classes.productCategory}>{children}</p>
}
ProductCategory.propTypes = {
  children: PropTypes.node,
}

export function ProductImage({ src, className }) {
  return (
    <img
      alt=""
      src={src}
      className={classNames(classes.productImage, className)}
    />
  )
}
ProductImage.propTypes = {
  src: PropTypes.string,
  className: PropTypes.string,
}

export function CategoryContainer({ children }) {
  return <div className={classes.categoryContainer}>{children}</div>
}
CategoryContainer.propTypes = {
  children: PropTypes.node,
}

export function CategoryName({ children }) {
  return <p className={classes.categoryName}>{children}</p>
}
CategoryName.propTypes = {
  children: PropTypes.node,
}
