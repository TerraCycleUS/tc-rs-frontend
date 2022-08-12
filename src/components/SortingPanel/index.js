import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { FormattedMessage, useIntl } from 'react-intl'

export default function SortingPanel({
  types,
  currentType,
  setCurrentType,
  className,
}) {
  const { formatMessage } = useIntl()

  function getButtonText(type) {
    if (type?.title) return type.title
    return formatMessage(type.label)
  }

  return (
    <MenuWrapper>
      <MenuItem
        onClick={() => setCurrentType('All')}
        key="All"
        disabled={currentType === 'All'}
        className={className}
      >
        <FormattedMessage id="productMenu:All" defaultMessage="All" />
      </MenuItem>
      {types?.map((type) => (
        <MenuItem
          onClick={() => setCurrentType(type.id)}
          key={type.id}
          disabled={currentType === type.id}
          className={className}
        >
          {getButtonText(type)}
        </MenuItem>
      ))}
    </MenuWrapper>
  )
}

SortingPanel.propTypes = {
  types: PropTypes.array,
  currentType: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setCurrentType: PropTypes.func,
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
