import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import PropTypes from 'prop-types'

import { ReactComponent as EditIcon } from '../../assets/icons/edit.svg'
import { ReactComponent as LearnMore } from '../../assets/icons/learn-more.svg'
import Header from '../../components/Header'
import classes from './Profile.module.scss'
import FooterNav from '../../components/FooterNav'

const accountOverview = [
  {
    to: 'change-password',
    label: (
      <FormattedMessage
        id="profile:ChangePwLabel"
        defaultMessage="Change password"
      />
    ),
  },
  {
    to: 'monoprix-id',
    label: (
      <FormattedMessage
        id="profile:MonoprixIdLabel"
        defaultMessage="Monoprix ID"
      />
    ),
  },
  {
    to: 'language',
    label: (
      <FormattedMessage id="profile:LanguageLabel" defaultMessage="Language" />
    ),
  },
]

const generalInfo = [
  {
    to: 'faq',
    label: <FormattedMessage id="profile:FAQLabel" defaultMessage="FAQ" />,
  },
  {
    to: 'tutorial',
    label: (
      <FormattedMessage id="profile:TutorialLabel" defaultMessage="Tutorial" />
    ),
  },
  {
    to: 'terms',
    label: (
      <FormattedMessage
        id="profile:TermsLabel"
        defaultMessage="Terms and conditions"
      />
    ),
  },
  {
    to: 'privacy',
    label: (
      <FormattedMessage
        id="profile:PrivacyLabel"
        defaultMessage="Privacy policy"
      />
    ),
  },
]

export default function Profile() {
  const user = useSelector((state) => state.user)

  const { name, email } = user

  return (
    <div
      className={classNames(classes.wrapper, 'd-flex', 'flex-column', 'h-100')}
    >
      <Header
        title={
          <FormattedMessage
            defaultMessage="Hello {name}!"
            id="profile:HeaderTitle"
            values={{ name }}
          />
        }
      />
      <div
        className={classNames(
          classes.content,
          'position-relative',
          'my-bg-color-main',
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
              value={50}
              desc={
                <FormattedMessage
                  id="profile:ItemsRecycled"
                  defaultMessage="Items recycled"
                />
              }
            />
            <Box
              value={50}
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
              {accountOverview.map((item) => (
                <MenuItem {...item} key={item.to} />
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
              {generalInfo.map((item) => (
                <MenuItem {...item} key={item.to} />
              ))}
            </ul>
            <div className={classes.divider} />
            <button
              type="button"
              className={classNames(
                classes.menuItem,
                classes.logout,
                'd-flex',
                'align-items-center',
                'my-text',
                'w-100',
              )}
            >
              <FormattedMessage id="profile:Logout" defaultMessage="Logout" />
            </button>
          </div>
          <div
            className={classNames(
              classes.contactUs,
              'd-flex align-items-center',
            )}
          >
            <span className="tool-btn">
              <LearnMore />
            </span>
            <p className="my-text-description my-color-main">
              <FormattedMessage
                id="profile:ContactUs"
                defaultMessage="Feel free to contact us, we are here to help!"
              />
            </p>
          </div>
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
