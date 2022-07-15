import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'

export default function ProductMenu({
  categories,
  currentCategory,
  setCurrentCategory,
}) {
  return (
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
          disabled={currentCategory === category.title}
        >
          {category.title}
        </MenuItem>
      ))}
    </MenuWrapper>
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
