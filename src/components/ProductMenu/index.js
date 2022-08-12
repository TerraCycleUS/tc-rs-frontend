import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { FormattedMessage, useIntl } from 'react-intl'

export default function ProductMenu({
  categories,
  currentCategory,
  setCurrentCategory,
  className,
}) {
  const { formatMessage } = useIntl()

  function getButtonText(category) {
    if (category?.title) return category.title
    return formatMessage(category.label)
  }

  return (
    <MenuWrapper>
      <MenuItem
        onClick={() => setCurrentCategory('All')}
        key="All"
        disabled={currentCategory === 'All'}
        className={className}
      >
        <FormattedMessage id="productMenu:All" defaultMessage="All" />
      </MenuItem>
      {categories?.map((category) => (
        <MenuItem
          onClick={() => setCurrentCategory(category.id)}
          key={category.id}
          disabled={currentCategory === category.id}
          className={className}
        >
          {getButtonText(category)}
        </MenuItem>
      ))}
    </MenuWrapper>
  )
}

ProductMenu.propTypes = {
  categories: PropTypes.array,
  currentCategory: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setCurrentCategory: PropTypes.func,
  className: PropTypes.string,
}

export const MenuWrapper = styled.nav`
  width: 100%;
  margin-bottom: 15px;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  display: flex;
  min-height: 40px;
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
