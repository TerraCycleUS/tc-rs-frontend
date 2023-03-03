import React from 'react'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
import Container from 'react-bootstrap/Container'
import classNames from 'classnames'

import { ReactComponent as Xmark } from '../../../assets/icons/x-mark.svg'
import { ReactComponent as Navigate } from '../../../assets/icons/arrow-navigate.svg'
import { ReactComponent as LearnMore } from '../../../assets/icons/learn-more.svg'
import classes from './DetailsPopup.module.scss'
import Button from '../../../components/Button'
import WasteStream from '../../../components/WasteStream'

export default function DetailsPopup({
  item: { address, location, tel: _tel, city, retailerId },
  onClose,
  onClick,
  categories,
}) {
  const searchParams = new URLSearchParams({
    query: `${address},${city}`,
  })
  const searchLink = `${
    process.env.REACT_APP_GOOGLE_MAPS_SEARCH_LINK
  }&${searchParams.toString()}`
  const tel = _tel?.replaceAll('.', ' ')

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
              'w-50 d-flex justify-content-between flex-wrap align-content-between position-relative',
            )}
          >
            <WasteStream
              categories={categories?.filter(
                (category) => category.retailerId === retailerId,
              )}
              className={classNames(
                classes.iconRow,
                'd-flex justify-content-center flex-grow-1',
              )}
            />
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
              'w-50 d-flex justify-content-between align-content-between',
            )}
          >
            <a
              className="navigate"
              data-testid="navigate-link-icon"
              href={searchLink}
              target="_blank"
            >
              <div className="tool-btn">
                <Navigate className={classes.navigateIcon} />
              </div>
              <div>
                <p className={classes.description}>
                  <FormattedMessage
                    id="mapDetails:Navigate"
                    defaultMessage="Navigate"
                  />
                </p>
              </div>
            </a>

            <a
              className="learn-more"
              target="_blank"
              data-testid="learn-more-link-icon"
              href={
                retailerId === 2
                  ? process.env.REACT_APP_MAP_ITEM_LEARN_MORE_CARREFOUR_LINK
                  : process.env.REACT_APP_MAP_ITEM_LEARN_MORE_LINK
              }
            >
              <div className="tool-btn">
                <LearnMore />
              </div>
              <div>
                <p className={classNames(classes.description, 'text-nowrap')}>
                  <FormattedMessage
                    id="mapDetails:LearnMore"
                    defaultMessage="Learn more"
                  />
                </p>
              </div>
            </a>
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
            <FormattedMessage
              id="mapDetails:WorkHours"
              defaultMessage="8AM - 10PM Mon. - Sat., 10AM - 8PM Sun."
            />
          </p>
          {tel && (
            <a
              className={classNames(classes.tel, 'my-text-description')}
              href={`tel:${tel}`}
            >
              {tel}
            </a>
          )}
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
    tel: PropTypes.string,
    city: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    retailerId: PropTypes.number.isRequired,
  }),
  onClose: PropTypes.func,
  onClick: PropTypes.func,
  categories: PropTypes.array,
}
