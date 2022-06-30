import React, { useState } from 'react'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-admin'
import Page from '../../Layouts/Page'
import ProductMenu from '../../components/ProductMenu'
import Text from '../../components/Text'
import { ReactComponent as TrashBin } from '../../assets/icons/trash-bin.svg'
import { ReactComponent as AddProduct } from '../../assets/icons/add-product.svg'

const mockedItems = [
  { name: 'Stick deodorant', brand: 'Dove', category: 'Grooming' },
  { name: 'Toothbrush', brand: 'Colgate', category: 'Oral care' },
  { name: 'Shower gel', brand: 'Old Spice', category: 'Cosmetics & scincare' },
  { name: 'Razor', brand: 'Gilette', category: 'Grooming' },
  { name: 'Shower gel', brand: 'Old Spice', category: 'Cosmetics & scincare' },
]

export default function RecyclingBin() {
  const [items] = useState(mockedItems)
  const [currentCategory, setCurrentCategory] = useState('All')
  return (
    <Page
      footer
      backgroundGrey
      pdTop25
      title={
        <FormattedMessage
          id="recyclingBin:Title"
          defaultMessage="Recycling bin"
        />
      }
    >
      <Wrapper>
        <ProductMenu
          currentCategory={currentCategory}
          setCurrentCategory={setCurrentCategory}
        />
        {items.length ? (
          <ProductContainer />
        ) : (
          <NoItems>
            <CircleBinIcon>
              <TrashBin className="bin-icon" />
            </CircleBinIcon>
            <Text className="empty-text">
              <FormattedMessage
                id="recyclingBin:CollectProducts"
                defaultMessage="Collect products for your virtual recycling bin"
              />
            </Text>
          </NoItems>
        )}
        <ScanItemLink to="/">
          <AddProduct className="add-product" />
        </ScanItemLink>
      </Wrapper>
    </Page>
  )
}

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .empty-text {
    width: 300px;
    text-align: center;
  }
`

export const ProductContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: maroon;
  height: 30px;
  width: 100%;
`

export const NoItems = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`

export const CircleBinIcon = styled.div`
  position: relative;
  margin-bottom: 50px;
  z-index: 2;
  display: flex;
  justify-content: center;
  &:before {
    content: '';
    z-index: -1;
    position: absolute;
    transform: translateX(-50%);
    left: 50%;
    bottom: -20px;
    display: block;
    width: 137px;
    height: 137px;
    border-radius: 100%;
    background-color: ${({ theme }) => theme.terraWrite};
  }

  .bin-icon {
    z-index: 3;
  }
`

export const ScanItemLink = styled(Link)`
  position: fixed;
  width: 50px;
  height: 50px;
  left: calc(100vw - 60px);
  top: calc(100vh - 120px);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.terraGreen};
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.17);
  border-radius: 100%;

  .add-product {
    flex-shrink: 0;
  }
`
