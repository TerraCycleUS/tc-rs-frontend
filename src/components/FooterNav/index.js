import React from "react";
import { NavLink } from "react-router-dom";
import { useIntl } from "react-intl";

import classNames from "classnames";
import PropTypes from "prop-types";
import { ReactComponent as Location } from "../../assets/icons/filled-location.svg";
import { ReactComponent as Box } from "../../assets/icons/filled-box.svg";
import { ReactComponent as HomeIcon } from "../../assets/icons/home.svg";
import { ReactComponent as Coupon } from "../../assets/icons/coupon.svg";
import { ReactComponent as Avatar } from "../../assets/icons/avatar.svg";
import classes from "./FooterNav.module.scss";

const links = [
  {
    to: "/map",
    icon: <Location className={classes.navIcon} />,
    label: {
      id: "footer:Map",
      defaultMessage: "Monoprix",
    },
    end: false,
  },
  {
    to: "/recycling-bin",
    icon: <Box className={classes.navIcon} />,
    label: {
      id: "footer:RecycleBin",
      defaultMessage: "Recycle Bin",
    },
    end: false,
  },
  {
    to: "/",
    icon: <HomeIcon className={classes.navIcon} />,
    label: {
      id: "footer:Home",
      defaultMessage: "Home",
    },
    end: true,
  },
  {
    to: "/rewards-wallet",
    icon: <Coupon className={classes.navIcon} />,
    label: {
      id: "footer:Rewards",
      defaultMessage: "Rewards",
    },
    end: false,
  },
  {
    to: "/profile",
    icon: <Avatar className={classes.navIcon} />,
    label: {
      id: "footer:Profile",
      defaultMessage: "Profile",
    },
    end: false,
  },
];

export default function FooterNav({ className }) {
  const { formatMessage } = useIntl();
  return (
    <div
      data-testid="footer-nav"
      className={classNames(classes.footerNavWrapper, className)}
    >
      <nav className={classes.footerNavNav}>
        {links.map(({ to, icon, label, end }) => (
          <NavLink
            to={to}
            key={to}
            end={end}
            className={({ isActive }) =>
              classNames(classes.footerNavLink, {
                [classes.active]: isActive,
              })
            }
          >
            {icon}
            <p className={classes.navText}>{formatMessage(label)}</p>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

FooterNav.propTypes = {
  className: PropTypes.string,
};
