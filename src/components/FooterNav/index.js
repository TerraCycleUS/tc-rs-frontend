import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

import PropTypes from 'prop-types'
import { ReactComponent as Location } from '../../assets/icons/filled-location.svg'
import { ReactComponent as Box } from '../../assets/icons/filled-box.svg'
import { ReactComponent as HomeIcon } from '../../assets/icons/home.svg'
import { ReactComponent as Coupon } from '../../assets/icons/coupon.svg'
import { ReactComponent as Avatar } from '../../assets/icons/avatar.svg'

export default function FooterNav({ className }) {
  return (
    <NavWrapper className={`footer-nav-wrapper ${className}`}>
      <Nav>
        <StyledNavLink to="/map">
          <Location className="nav-icon" />
          <NavText>Monoprix</NavText>
        </StyledNavLink>
        <StyledNavLink to="/recycling-bin">
          <Box className="nav-icon" />
          <NavText>Recycle Bin</NavText>
        </StyledNavLink>
        <StyledNavLink to="/">
          <HomeIconCircle className="nav-icon--home">
            <HomeIcon />
          </HomeIconCircle>
          <NavText>Home</NavText>
        </StyledNavLink>
        <StyledNavLink to="/registration">
          <Coupon className="nav-icon" />
          <NavText>Rewards</NavText>
        </StyledNavLink>
        <StyledNavLink to="/scan">
          <Avatar className="nav-icon" />
          <NavText>Profile</NavText>
        </StyledNavLink>
      </Nav>
    </NavWrapper>
  )
}

FooterNav.propTypes = {
  className: PropTypes.string,
}

export const NavWrapper = styled.div`
  background-color: ${({ theme }) => theme.terraWhite};
  border-radius: 20px 20px 0px 0px;
  box-shadow: 0px -10px 20px rgba(174, 174, 174, 0.2);
  display: flex;
  justify-content: center;
  position: fixed;
  width: 100%;
  bottom: 0;

  @media (min-width: 768px) {
    border-radius: 0;
  }
`

export const Nav = styled.nav`
  display: flex;
  justify-content: space-around;
  padding-bottom: 8px;
  padding-top: 11px;
  max-width: 768px;
  width: 100%;
`

export const StyledNavLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 1 0;

  .nav-icon {
    margin-bottom: 1px;
  }

  &.active {
    .nav-icon {
      path {
        fill: ${({ theme }) => theme.main};
      }
    }

    .nav-icon--home {
      background-color: ${({ theme }) => theme.main};
    }

    p {
      color: ${({ theme }) => theme.main};
    }
  }
`

export const NavText = styled.p`
  font-weight: 500;
  font-size: 9px;
  line-height: 16px;
  color: ${({ theme }) => theme.navGrey};
`

export const HomeIconCircle = styled.span`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  background-color: ${({ theme }) => theme.navGrey};
`
