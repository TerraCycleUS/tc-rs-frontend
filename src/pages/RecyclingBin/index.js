import React, { useState } from 'react'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-admin'
import {
  Type as ListType,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from 'react-swipeable-list'
import Page from '../../Layouts/Page'
import ProductMenu from '../../components/ProductMenu'
import Text from '../../components/Text'
import { ReactComponent as TrashBin } from '../../assets/icons/trash-bin.svg'
import { ReactComponent as AddProduct } from '../../assets/icons/add-product.svg'
import { ReactComponent as GroomingIcon } from '../../assets/icons/grooming.svg'
import 'react-swipeable-list/dist/styles.css'

const mockedItems = [
  {
    imgSrc:
      'https://asset-apac.unileversolutions.com/content/dam/unilever/dove/singapore/pack_shot/4800888166791-1622254-png.png.ulenscale.460x460.png',
    name: 'Stick deodorant',
    brand: 'Dove',
    category: 'Grooming',
  },
  {
    imgSrc:
      'https://www.colgate.com/content/dam/cp-sites/oral-care/oral-care-center-relaunch/en-us/products/toothbrush/035000896506-packshot.png',
    name: 'Toothbrush',
    brand: 'Colgate',
    category: 'Oral care',
  },
  {
    imgSrc: 'https://u.makeup.com.ua/7/7j/7jpv8x74b04a.jpg',
    name: 'Shower gel',
    brand: 'Old Spice',
    category: 'Cosmetics & scincare',
  },
  {
    imgSrc:
      'https://asset-apac.unileversolutions.com/content/dam/unilever/dove/singapore/pack_shot/4800888166791-1622254-png.png.ulenscale.460x460.png',
    name: 'Razor',
    brand: 'Gilette',
    category: 'Grooming',
  },
  {
    imgSrc:
      'https://asset-apac.unileversolutions.com/content/dam/unilever/dove/singapore/pack_shot/4800888166791-1622254-png.png.ulenscale.460x460.png',
    name: 'Shower gel',
    brand: 'Old Spice',
    category: 'Cosmetics & scincare',
  },
]

const trailingActions = () => (
  <TrailingActions>
    <SwipeAction onClick={() => console.info('swipe 2 action triggered')}>
      Delete
    </SwipeAction>
  </TrailingActions>
)

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
          <SwipeableList fullSwipe={false} type={ListType.IOS}>
            <SwipeableListItem trailingActions={trailingActions()}>
              <ProductContainer>
                <ProductImage
                  alt=""
                  src="https://u.makeup.com.ua/7/7j/7jpv8x74b04a.jpg"
                />
                <div className="description">
                  <h6 className="product-name">Stick deodorant</h6>
                  <p className="brand">Dove</p>
                </div>
                <div className="category-container">
                  <GroomingIcon />
                  <p className="category-name">Grooming</p>
                </div>
              </ProductContainer>
            </SwipeableListItem>
          </SwipeableList>
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
  height: 80px;
  width: 100%;
  flex-direction: row;
  background-color: ${({ theme }) => theme.terraWrite};
  box-shadow: 0px 14px 20px rgba(0, 0, 0, 0.05);
  border-radius: 15px;
  margin-bottom: 10px;
`

export const ProductImage = styled.img`
  width: 80px;
  object-fit: cover;
  border-radius: 15px 0px 0px 15px;
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
