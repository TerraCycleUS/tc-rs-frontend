import React from 'react'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'
import classNames from 'classnames'
import Button from '../../components/Button'
import { H2 } from '../../components/Text'
import detectIos from '../../utils/detectIos'
import classes from './MapPage.module.scss'
import popClasses from '../../components/PopUps/GenericPop/GenericPop.module.scss'

export default function ErrorPopup({ onClick }) {
  const isIos = detectIos()
  return (
    <div className={popClasses.popWrapper}>
      <div
        className={classNames(popClasses.popContainer, classes.popupContainer)}
      >
        <H2 className={classes.title}>
          <FormattedMessage
            id="map:ErrorPopupTitle"
            defaultMessage="Location disabled"
          />
        </H2>
        <p className={classes.noLocationText}>
          <FormattedMessage
            id="map:ErrorPopupDescription"
            defaultMessage="Enables your location settings to find your nearest drop-off point."
          />
        </p>
        {isIos && (
          <>
            <ol className={classes.instructionList} data-testid="instructions">
              <li className="instructions">
                <FormattedMessage
                  id="map:IosSettings1"
                  defaultMessage="Go to your <b>iPhone settings.</b>"
                  values={{
                    b: (chunks) => <b>{chunks}</b>,
                  }}
                />
              </li>
              <li className="instructions">
                <FormattedMessage
                  id="map:IosSettings2"
                  defaultMessage="Select <b>Privacy</b> and then select <b>Location services. Switch it on</b> if it's off."
                  values={{
                    b: (chunks) => <b>{chunks}</b>,
                  }}
                />
              </li>
              <li className="instructions">
                <FormattedMessage
                  id="map:IosSettings3"
                  defaultMessage="Now scroll down and <b>select the browser</b> that you are using (Chrome, Safari, etc) and make sure that you select <b>Allow (or ask).</b>"
                  values={{
                    b: (chunks) => <b>{chunks}</b>,
                  }}
                />
              </li>
            </ol>

            <p className={classes.stillNeedHelp}>
              <FormattedMessage
                id="map:StillNeedHelp"
                defaultMessage="Do you still need help? <link>Go to FAQs</link>"
                values={{
                  link: (chunks) => (
                    <Link
                      className={classes.link}
                      data-testid="faq"
                      to={{
                        pathname: '/profile/faq',
                      }}
                    >
                      {chunks}
                    </Link>
                  ),
                }}
              />
            </p>
          </>
        )}
        <Button className={classes.okayBtn} onClick={onClick}>
          <FormattedMessage
            id="map:ErrorPopupButton"
            defaultMessage="Continue"
          />
        </Button>
      </div>
    </div>
  )
}

ErrorPopup.propTypes = {
  onClick: PropTypes.func,
}
