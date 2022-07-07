import React from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import Page from '../../Layouts/Page'
import GelImgSrc from '../../assets/images/nivea-gel.png'
import Text from '../../components/Text'
import Button from '../../components/Button'
import { ReactComponent as Camera } from '../../assets/icons/camera.svg'
import {
  CameraImageWrapper,
  ChangeCamera,
  GelImg,
} from '../../components/CameraView'

// const productCategories = ['Cosmetics & skincare', 'Oral care', 'Grooming']
// const Brands = ['Dove', 'Nivea', 'Gilette', 'Old Spice', 'Colgate']

export default function SaveItem() {
  return (
    <Page
      backButton
      title={
        <FormattedMessage id="scanItem:Title" defaultMessage="Scan item" />
      }
      steps="1/2 "
    >
      <Wrapper>
        {/* should be live image from camera */}
        <CameraImageWrapper>
          <ChangeCamera>
            <Camera />
          </ChangeCamera>
          <GelImg alt="" src={GelImgSrc} />
        </CameraImageWrapper>
        <Text className="description">
          <FormattedMessage
            id="saveItem:Description"
            defaultMessage="Please provide details of your item below:"
          />
        </Text>
        <Button>
          <FormattedMessage id="saveItem:Save" defaultMessage="Save" />
        </Button>
      </Wrapper>
    </Page>
  )
}

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  .description {
    margin-bottom: 30px;
    text-align: center;
    color: ${({ theme }) => theme.textBlack};
  }
`
