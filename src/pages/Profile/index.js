import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FormattedMessage, useIntl } from 'react-intl'
import classNames from 'classnames'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import PropTypes from 'prop-types'

import { ReactComponent as EditIcon } from '../../assets/icons/edit.svg'
import { ReactComponent as LearnMore } from '../../assets/icons/learn-more.svg'
import classes from './Profile.module.scss'
import FooterNav from '../../components/FooterNav'
import useLogout from '../../utils/useLogout'
import http from '../../utils/http'
import useApiCall from '../../utils/useApiCall'

function getAccountOverview(user) {
  const accountOverview = [
    {
      to: 'monoprix-id',
      label: {
        id: 'profile:MonoprixIdLabel',
        defaultMessage: 'Monoprix ID',
      },
    },
    {
      to: 'language',
      label: {
        id: 'profile:LanguageLabel',
        defaultMessage: 'Language',
      },
    },
  ]

  if (user.socialProvider) return accountOverview

  accountOverview.unshift({
    to: 'change-password',
    label: {
      id: 'profile:ChangePwLabel',
      defaultMessage: 'Change password',
    },
  })

  return accountOverview
}

const generalInfo = [
  {
    to: 'faq',
    label: { id: 'profile:FAQLabel', defaultMessage: 'FAQ' },
  },
  {
    to: 'tutorial',
    label: { id: 'profile:TutorialLabel', defaultMessage: 'Tutorial' },
  },
  {
    to: 'terms',
    label: {
      id: 'profile:TermsLabel',
      defaultMessage: 'Terms and conditions',
    },
  },
  {
    to: 'privacy',
    label: {
      id: 'profile:PrivacyLabel',
      defaultMessage: 'Privacy policy',
    },
  },
]

export default function Profile() {
  const user = useSelector((state) => state.user)
  const { formatMessage } = useIntl()
  const { name, email } = user
  const getAmountApiCall = useApiCall()
  const logout = useLogout()
  const [availableAmount, setAvailableAmount] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)

  const config = {
    headers: {
      Authorization: `Bearer ${user?.authorization}`,
    },
  }

  useEffect(() => {
    getAmountApiCall(
      () => http.get('/api/user/profile', config),
      (response) => {
        setAvailableAmount(response.data.availableAmount)
        setTotalAmount(response.data.totalAmount)
      },
      null,
      null,
      { message: true },
    )
  }, [])

  return (
    <div
      className={classNames(
        classes.wrapper,
        'd-flex',
        'flex-column',
        'h-100',
        'hide-on-exit',
      )}
    >
      <div
        className={classNames(
          classes.content,
          'position-relative',
          'my-bg-color-main',
          'bottom-curved',
        )}
      >
        <div
          className={classNames(
            classes.userDetails,
            'text-center',
            'position-relative',
          )}
        >
          <span
            className={classNames(
              classes.nameIcon,
              'my-text-h4',
              'd-block',
              'text-capitalize',
              'my-bg-color-lightGreen',
              'my-color-terraGreen',
              'position-absolute',
              'top-0',
              'start-50',
            )}
          >
            {name[0]}
          </span>
          <Container>
            <Row>
              <Col xs={{ span: 8, offset: 2 }}>
                <h6 className="my-text-primary text-capitalize text-white">
                  {name}
                </h6>
                <p className="my-text-description my-color-successLight">
                  {email}
                </p>
              </Col>
              <Col
                xs={2}
                className={classNames(
                  classes.buttonCol,
                  'd-flex',
                  'align-items-center',
                  'justify-content-center',
                )}
              >
                <Link to="edit">
                  <EditIcon />
                </Link>
              </Col>
            </Row>
          </Container>
          <div
            className={classNames(
              'd-flex',
              'justify-content-center',
              'position-absolute',
              'w-100',
              classes.boxRow,
            )}
          >
            <Box
              value={availableAmount}
              desc={
                <FormattedMessage
                  id="profile:ItemsRecycled"
                  defaultMessage="Items recycled"
                />
              }
            />
            <Box
              value={totalAmount}
              desc={
                <FormattedMessage
                  id="profile:MyTotalImpact"
                  defaultMessage="My total impact"
                />
              }
            />
          </div>
        </div>
      </div>

      <div
        className={classNames(
          classes.menu,
          'position-relative',
          'flex-grow-1',
          'my-bg-color-terraGrey',
        )}
      >
        <Container>
          <div className={classNames(classes.menuItems)}>
            <h6 className={classes.sectionName}>
              <FormattedMessage
                id="profile:AccountOverview"
                defaultMessage="Account overview"
              />
            </h6>
            <ul>
              {getAccountOverview(user).map(({ to, label }) => (
                <MenuItem to={to} label={formatMessage(label)} key={to} />
              ))}
            </ul>
            <div className={classes.divider} />
            <h6 className={classes.sectionName}>
              <FormattedMessage
                id="profile:GeneralInfo"
                defaultMessage="General information"
              />
            </h6>
            <ul>
              {generalInfo.map(({ to, label }) => (
                <MenuItem to={to} label={formatMessage(label)} key={to} />
              ))}
            </ul>
            <div className={classes.divider} />
            <button
              type="button"
              onClick={logout}
              className={classNames(
                classes.menuItem,
                classes.logout,
                'd-flex',
                'align-items-center',
                'my-text',
                'my-color-textPrimary',
                'w-100',
              )}
            >
              <FormattedMessage id="profile:Logout" defaultMessage="Logout" />
            </button>
          </div>
          <Link to="../contact-us">
            <div
              className={classNames(
                classes.contactUs,
                'd-flex align-items-center',
              )}
            >
              <span className="tool-btn flex-shrink-0">
                <LearnMore />
              </span>
              <p
                className={classNames(
                  'my-text-description my-color-main',
                  classes.contactUsText,
                )}
              >
                <FormattedMessage
                  id="profile:ContactUs"
                  defaultMessage="Feel free to contact us, we are here to help!"
                />
              </p>
            </div>
          </Link>
          <p
            className={classNames(
              'my-text-description',
              'text-center',
              'my-color-textSecondary',
              classes.poweredBy,
            )}
          >
            <FormattedMessage
              id="profile:PoweredBy"
              defaultMessage="Powered by <b>TerraCycle</b>"
              values={{
                b: (chunks) => (
                  <strong className="my-color-darkGrey">{chunks}</strong>
                ),
              }}
            />
          </p>
        </Container>
      </div>
      <FooterNav className="position-sticky" />
    </div>
  )
}

function Box({ value, desc }) {
  return (
    <div className={classes.box}>
      <p className={classes.value}>{value}</p>
      <p className={classes.desc}>{desc}</p>
    </div>
  )
}

Box.propTypes = {
  value: PropTypes.node,
  desc: PropTypes.node,
}

function MenuItem({ to, label }) {
  return (
    <li>
      <Link
        className={classNames(
          classes.menuItem,
          classes[to],
          'd-flex',
          'align-items-center',
          'my-text',
          'my-color-textPrimary',
        )}
        to={to}
      >
        {label}
      </Link>
    </li>
  )
}

MenuItem.propTypes = {
  to: PropTypes.string,
  label: PropTypes.node,
}
