import React from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { ReactComponent as HairCareIcon } from '../../assets/icons/hair-care.svg'
import { ReactComponent as DeodorantsIcon } from '../../assets/icons/deoderants.svg'
import { ReactComponent as ShowerBathSoapIcon } from '../../assets/icons/shower-bath-soap.svg'
import { ReactComponent as OralCareIcon } from '../../assets/icons/oral-care.svg'
import { ReactComponent as MakeupSkincareIcon } from '../../assets/icons/makeup-&-skincare.svg'
import { ReactComponent as GroomingIcon } from '../../assets/icons/grooming.svg'
import { ReactComponent as TrashBin } from '../../assets/icons/trash-bin.svg'
import Text from '../Text'

export function getCategoryIcon(category) {
  switch (category) {
    case 1:
      return <HairCareIcon />

    case 2:
      return <DeodorantsIcon />

    case 3:
      return <ShowerBathSoapIcon />

    case 4:
      return <OralCareIcon />

    case 5:
      return <MakeupSkincareIcon />

    case 6:
      return <GroomingIcon />

    default:
      return null
  }
}

export function NoItemsWrapper() {
  return (
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
  )
}

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
    background-color: ${({ theme }) => theme.terraWhite};
  }

  .bin-icon {
    z-index: 3;
  }
`

export const ProductContainer = styled.div`
  display: flex;
  height: 80px;
  width: 100%;
  flex-direction: row;
  background-color: ${({ theme }) => theme.terraWhite};
  box-shadow: 0px 14px 20px rgba(0, 0, 0, 0.05);
  border-radius: 15px;
`
export const ProductDescription = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 16px;
  margin-top: 12px;
  flex-grow: 1;
`

export const ProductBrand = styled.p`
  font-weight: 700;
  font-size: 15px;
  line-height: 24px;
  margin-bottom: 6px;
  color: ${({ theme }) => theme.textPrimary};
`

export const ProductCategory = styled.p`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: ${({ theme }) => theme.textPrimary};
`

export const ProductImage = styled.img`
  width: 80px;
  object-fit: cover;
  border-radius: 15px 0px 0px 15px;
`

export const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  margin-right: 15px;
  width: 52px;
`

export const CategoryName = styled.p`
  font-weight: 400;
  font-size: 9px;
  line-height: 12px;
  text-align: center;
  color: ${({ theme }) => theme.main};
  max-width: 56px;
`
