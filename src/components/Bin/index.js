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
import { ReactComponent as Stockings } from '../../assets/icons/stockings.svg'
import { ReactComponent as Toys } from '../../assets/icons/toys.svg'
import { ReactComponent as Pan } from '../../assets/icons/pan.svg'
import { ReactComponent as Pen } from '../../assets/icons/pen.svg'
import { ReactComponent as Razors } from '../../assets/icons/razors.svg'
import Text from '../Text'
import classes from './Bin.module.scss'

export function getCategoryIcon(category, iconClass = null) {
  switch (category) {
    case 1:
      return <HairCareIcon className={iconClass} />

    case 2:
      return <DeodorantsIcon className={iconClass} />

    case 3:
      return <ShowerBathSoapIcon className={iconClass} />

    case 4:
      return <OralCareIcon className={iconClass} />

    case 5:
      return <MakeupSkincareIcon className={iconClass} />

    case 6:
      return <GroomingIcon className={iconClass} />

    case 7:
      return <OralCareIcon className={iconClass} />

    case 8:
      return <Razors className={iconClass} />

    case 9:
      return <Pen className={iconClass} />

    case 10:
      return <Stockings className={iconClass} />

    case 11:
      return <Toys className={iconClass} />

    case 12:
      return <Pan className={iconClass} />

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
      <Text className="empty-text text-center">
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
