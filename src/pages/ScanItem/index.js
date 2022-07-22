import React from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Page from '../../Layouts/Page'
import Text from '../../components/Text'
import Button from '../../components/Button'
// import CameraView from '../../components/CameraView'
import Camera from './camera'

export default function ScanItem() {
  const user = useSelector((state) => state.user)

  function getNextRoute() {
    if (!user) return '/registration'
    return '../save-item'
  }

  return (
    <Page
      backButton
      title={
        <FormattedMessage id="scanItem:Title" defaultMessage="Scan item" />
      }
      steps="1/2 "
    >
      <Wrapper>
        {/* <CameraView goTo="../camera-scan" /> */}
        <Camera />
        <Text className="description">
          <FormattedMessage
            id="scanItem:Description"
            defaultMessage="Please choose from the following options to provide details of your item:"
          />
        </Text>
        <StyledLink className="bar-code" to="../camera-scan">
          <Button>
            <FormattedMessage
              id="scanItem:BarCode"
              defaultMessage="Bar code scan"
            />
          </Button>
        </StyledLink>

        <StyledLink className="manual" to={getNextRoute()}>
          <Button inverted>
            <FormattedMessage
              id="scanItem:Manual"
              defaultMessage="Manual setup"
            />
          </Button>
        </StyledLink>
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

  .bar-code {
    margin-bottom: 20px;
  }
`

export const StyledLink = styled(Link)`
  width: 100%;
`
