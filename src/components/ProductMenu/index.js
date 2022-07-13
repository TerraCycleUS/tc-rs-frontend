import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import Carousel, { CarouselItem } from '../Carousel'

export default function ProductMenu({
  categories,
  currentCategory,
  setCurrentCategory,
}) {
  return (
    <>
      <MenuWrapper>
        <MenuItem
          onClick={() => setCurrentCategory('All')}
          key="All"
          disabled={currentCategory === 'All'}
        >
          <FormattedMessage id="productMenu:All" defaultMessage="All" />
        </MenuItem>
        {categories?.map((category) => (
          <MenuItem
            onClick={() => setCurrentCategory(category.title)}
            key={category.id}
            disabled={currentCategory === category}
          >
            {category.title}
          </MenuItem>
        ))}
      </MenuWrapper>
      {/*<MenuWrapper1>*/}
      {/*  <Carousel>*/}
      {/*    <CarouselItem>*/}
      {/*      <MenuItem1*/}
      {/*        onClick={() => setCurrentCategory('All')}*/}
      {/*        disabled={currentCategory === 'All'}*/}
      {/*      >*/}
      {/*        <FormattedMessage id="productMenu:All" defaultMessage="All" />*/}
      {/*      </MenuItem1>*/}
      {/*    </CarouselItem>*/}
      {/*    {categories?.map((category) => (*/}
      {/*      <CarouselItem>*/}
      {/*        <MenuItem1*/}
      {/*          onClick={() => setCurrentCategory(category.title)}*/}
      {/*          disabled={currentCategory === category.title}*/}
      {/*        >*/}
      {/*          {category.title}*/}
      {/*        </MenuItem1>*/}
      {/*      </CarouselItem>*/}
      {/*    ))}*/}
      {/*  </Carousel>*/}
      {/*</MenuWrapper1>*/}
    </>
  )
}

ProductMenu.propTypes = {
  categories: PropTypes.array,
  currentCategory: PropTypes.string,
  setCurrentCategory: PropTypes.func,
}

export const MenuWrapper = styled.nav`
  width: 100%;
  margin-bottom: 15px;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  display: flex;
`

export const MenuWrapper1 = styled.nav`
  width: 100%;
  margin-bottom: 15px;
  display: flex;
`

export const MenuItem = styled.button`
  height: 40px;
  font-weight: 700;
  font-size: 12px;
  line-height: 13px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: ${({ theme }) => theme.main};
  background: rgba(169, 222, 152, 0.4);
  border-radius: 10px;
  margin-right: 10px;
  padding: 8px 14px;

  &:disabled {
    background: ${({ theme }) => theme.terraGreen};
    color: ${({ theme }) => theme.terraWhite};
  }

  &:last-child {
    margin-right: 0;
  }
`

export const MenuItem1 = styled.button`
  height: 40px;
  max-width: 125px;
  font-weight: 700;
  font-size: 12px;
  line-height: 13px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: ${({ theme }) => theme.main};
  background: rgba(169, 222, 152, 0.4);
  border-radius: 10px;
  margin-right: 10px;
  padding: 8px 14px;

  &:disabled {
    background: ${({ theme }) => theme.terraGreen};
    color: ${({ theme }) => theme.terraWhite};
  }
`
