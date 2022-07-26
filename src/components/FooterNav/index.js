import React from 'react'
import { NavLink } from 'react-router-dom'

import classNames from 'classnames'
import PropTypes from 'prop-types'
import { ReactComponent as Location } from '../../assets/icons/filled-location.svg'
import { ReactComponent as Box } from '../../assets/icons/filled-box.svg'
import { ReactComponent as HomeIcon } from '../../assets/icons/home.svg'
import { ReactComponent as Coupon } from '../../assets/icons/coupon.svg'
import { ReactComponent as Avatar } from '../../assets/icons/avatar.svg'
import classes from './FooterNav.module.scss'

const links = [
  {
    to: '/map',
    icon: <Location className={classes.navIcon} />,
    label: 'Monoprix',
  },
  {
    to: '/recycling-bin',
    icon: <Box className={classes.navIcon} />,
    label: 'Recycle Bin',
  },
  {
    to: '/',
    icon: (
      <span className={`${classes.navIconHome} ${classes.homeIconCircle}`}>
        <HomeIcon />
      </span>
    ),
    label: 'Home',
  },
  {
    to: '/scan',
    icon: <Coupon className={classes.navIcon} />,
    label: 'Rewards',
  },
  {
    to: '/profile',
    icon: <Avatar className={classes.navIcon} />,
    label: 'Profile',
  },
]

export default function FooterNav({ className }) {
  return (
    <div className={classNames(classes.footerNavWrapper, className)}>
      <nav className={classes.footerNavNav}>
        {links.map(({ to, icon, label }) => (
          <NavLink
            to={to}
            key={to}
            className={({ isActive }) =>
              classNames(classes.footerNavLink, {
                [classes.active]: isActive,
              })
            }
          >
            {icon}
            <p className={classes.navText}>{label}</p>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}

FooterNav.propTypes = {
  className: PropTypes.string,
}
