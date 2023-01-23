import React from 'react'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { PopContainer, PopWrapper } from '../GenericPop'
import { ReactComponent as Xmark } from '../../../assets/icons/x-mark.svg'
import Button from '../../Button'
import classes from './ApiError.module.scss'
import { useApiErrorContext } from '../../../context/apiError'
import apiErrorImageUrl from '../../../assets/images/api-error.svg'

export default function ApiError() {
  const [config, setConfig] = useApiErrorContext()

  if (!config) return null

  return (
    <PopWrapper className={classes.wrapper}>
      <PopContainer className={classes.container}>
        <Xmark onClick={() => setConfig(null)} className="close-btn" />
        <h3 className={classNames(classes.heading, 'my-color-textBlack')}>
          <FormattedMessage
            id="apiError:Title"
            defaultMessage="It’ s us not you"
          />
        </h3>
        <img src={apiErrorImageUrl} alt="api error" className="d-block" />
        <p className="my-text my-color-textPrimary text-center">
          <FormattedMessage
            id="apiError:Desc1"
            defaultMessage="Excuse us, we froze!"
          />
        </p>
        <p className="my-text my-color-textPrimary">
          <FormattedMessage
            id="apiError:Desc2"
            defaultMessage="Try again later."
            values={{
              link: (chunks) => (
                <Link className="my-text" to="/profile/contact-us">
                  {chunks}
                </Link>
              ),
            }}
          />
        </p>
        <Button className={classes.retry} onClick={config.onRetry}>
          <FormattedMessage id="apiError:Retry" defaultMessage="Try again" />
        </Button>
      </PopContainer>
    </PopWrapper>
  )
}
