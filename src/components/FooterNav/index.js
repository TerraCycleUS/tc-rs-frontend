import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

import { ReactComponent as Location } from '../../assets/icons/filled-location.svg'
import { ReactComponent as Box } from '../../assets/icons/filled-box.svg'
import { ReactComponent as HomeIcon } from '../../assets/icons/home.svg'
import { ReactComponent as Coupon } from '../../assets/icons/coupon.svg'
import { ReactComponent as Avatar } from '../../assets/icons/avatar.svg'

export default function FooterNav() {
  return (
    <NavWrapper>
      <StyledNavLink to="/">
        <Location className="nav-icon" />
        <NavText>Monoprix</NavText>
      </StyledNavLink>
      <StyledNavLink to="/registration">
        <Box className="nav-icon" />
        <NavText>Recycle Bin</NavText>
      </StyledNavLink>
      <StyledNavLink to="/">
        <HomeIconCircle className="nav-icon">
          <HomeIcon />
        </HomeIconCircle>
        <NavText>Home</NavText>
      </StyledNavLink>
      <StyledNavLink to="/">
        <Coupon className="nav-icon" />
        <NavText>Rewards</NavText>
      </StyledNavLink>
      <StyledNavLink to="/">
        <Avatar className="nav-icon" />
        <NavText>Profile</NavText>
      </StyledNavLink>
    </NavWrapper>
  )
}

export const NavWrapper = styled.nav`
  background-color: white;
  border-radius: 20px 20px 0px 0px;
  box-shadow: 0px -10px 20px rgba(174, 174, 174, 0.2);
  display: flex;
  justify-content: space-around;
  padding-bottom: 8px;
  padding-top: 11px;
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
    .nav-icon path {
      fill: ${({ theme }) => theme.main}!important;
    }

    p {
      color: ${({ theme }) => theme.main}!important;
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
