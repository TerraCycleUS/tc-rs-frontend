import React from 'react'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'

const productButtons = [
  {
    category: 'All',
    text: { id: 'productMenu:All', defaultMessage: 'All' },
  },
  {
    category: 'Cosmetics & skincare',
    text: {
      id: 'productMenu:Cosmetics&Skin',
      defaultMessage: 'Cosmetics & skin care',
    },
  },
  {
    category: 'Oral care',
    text: { id: 'productMenu:OralCare', defaultMessage: 'Oral care' },
  },
  {
    category: 'Grooming',
    text: { id: 'productMenu:Grooming', defaultMessage: 'Grooming' },
  },
]

export default function ProductMenu({ currentCategory, setCurrentCategory }) {
  return (
    <MenuWrapper>
      {productButtons.map(({ category, text }) => (
        <MenuItem
          onClick={() => setCurrentCategory(category)}
          key={category}
          disabled={currentCategory === category}
        >
          <FormattedMessage id={text.id} defaultMessage={text.defaultMessage} />
        </MenuItem>
      ))}
    </MenuWrapper>
  )
}

ProductMenu.propTypes = {
  currentCategory: PropTypes.string,
  setCurrentCategory: PropTypes.func,
}

export const MenuWrapper = styled.nav`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-bottom: 15px;
  justify-content: space-between;
  max-width: 768px;
`

export const MenuItem = styled.button`
  height: 40px;
  padding: 0 14px;
  max-width: 104px;
  min-width: 44px;
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

  &:disabled {
    background: ${({ theme }) => theme.terraGreen};
    color: ${({ theme }) => theme.terraWhite};
  }
`
