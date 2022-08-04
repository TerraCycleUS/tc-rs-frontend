import React from 'react'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
import Container from 'react-bootstrap/Container'
import classNames from 'classnames'

import { ReactComponent as Xmark } from '../../../assets/icons/x-mark.svg'
import { ReactComponent as Navigate } from '../../../assets/icons/arrow-navigate.svg'
import { ReactComponent as LearnMore } from '../../../assets/icons/learn-more.svg'
import { ReactComponent as MakeupSkincareIcon } from '../../../assets/icons/makeup-&-skincare.svg'
import { ReactComponent as OralCareIcon } from '../../../assets/icons/oral-care.svg'
import { ReactComponent as GroomingIcon } from '../../../assets/icons/grooming.svg'
import { ReactComponent as HairCareIcon } from '../../../assets/icons/hair-care.svg'
import { ReactComponent as DeodorantsIcon } from '../../../assets/icons/deoderants.svg'
import { ReactComponent as ShowerBathSoapIcon } from '../../../assets/icons/shower-bath-soap.svg'
import classes from './DetailsPopup.module.scss'
import Button from '../../../components/Button'

export default function DetailsPopup({
  item: { address, location, tel: _tel, city },
  onClose,
  onClick,
}) {
  console.log('DetailsPopup location', location)
  console.log('DetailsPopup item', item)
  const searchParams = new URLSearchParams({ query: `${address},${city}` })
  const searchLink = `${
    process.env.REACT_APP_GOOGLE_MAPS_SEARCH_LINK
  }&${searchParams.toString()}`
  const tel = _tel.replaceAll('.', ' ')

  return (
    <div className={classNames(classes.wrapper, 'fixed-bottom bg-white')}>
      <Container className="p-0 my-color-textPrimary">
        <header>
          <div className="d-flex justify-content-between">
            <h4 className="my-text-h4">{location}</h4>
            <button onClick={onClose} type="button">
              <Xmark />
            </button>
          </div>
          <p className="my-text-description">{address}</p>
        </header>
        <div
          className={classNames(classes.tools, 'd-flex my-bg-color-terraGrey')}
        >
          <div
            className={classNames(
              classes.left,
              'w-50 d-flex justify-content-between flex-wrap flex-column position-relative',
            )}
          >
            <div
              className={classNames(
                classes.iconRow,
                'd-flex justify-content-center',
              )}
            >
              <MakeupSkincareIcon />
              <OralCareIcon />
              <GroomingIcon />
              <HairCareIcon />
              <DeodorantsIcon />
              <ShowerBathSoapIcon />
            </div>
            <p className={classNames(classes.description, 'text-center')}>
              <FormattedMessage
                id="mapDetails:WasteStream"
                defaultMessage="Waste stream"
              />
            </p>
          </div>
          <div
            className={classNames(
              classes.right,
              'w-50 d-flex justify-content-between',
            )}
          >
            <div className="navigate">
              <a className="tool-btn" href={searchLink} target="_blank">
                <Navigate />
              </a>
              <a href={searchLink} target="_blank">
                <p className={classes.description}>
                  <FormattedMessage
                    id="mapDetails:Navigate"
                    defaultMessage="Navigate"
                  />
                </p>
              </a>
            </div>
            <div className="learn-more">
              <a
                className="tool-btn"
                href={process.env.REACT_APP_MAP_ITEM_LEARN_MORE_LINK}
              >
                <LearnMore />
              </a>
              <a href={process.env.REACT_APP_MAP_ITEM_LEARN_MORE_LINK}>
                <p className={classes.description}>
                  <FormattedMessage
                    id="mapDetails:LearnMore"
                    defaultMessage="Learn more"
                  />
                </p>
              </a>
            </div>
          </div>
        </div>
        <div className={classes.details}>
          <h4 className="details-title my-text-primary">
            <FormattedMessage
              id="mapDetails:StoreDetails"
              defaultMessage="Store details:"
            />
          </h4>
          <p className={classNames('my-text-description', classes.hours)}>
            8AM - 10PM Mon. - Sat., 10AM - 8PM Sun.
          </p>
          <a
            className={classNames(classes.tel, 'my-text-description')}
            href={`tel:${tel}`}
          >
            {tel}
          </a>
        </div>
        <Button onClick={onClick} className={classes.dropOff}>
          <FormattedMessage
            id="mapDetails:ButtonSubmit"
            defaultMessage="Drop-off your items"
          />
        </Button>
      </Container>
    </div>
  )
}

DetailsPopup.propTypes = {
  item: PropTypes.shape({
    address: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    tel: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
  }),
  onClose: PropTypes.func,
  onClick: PropTypes.func,
}
