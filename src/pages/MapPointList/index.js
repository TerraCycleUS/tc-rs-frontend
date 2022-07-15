import React from 'react'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'
import Text from '../../components/Text'

export default function MapPointList() {
  return (
    <MapPointListWrapper>
      <Text class="desciption">
        <FormattedMessage
          id="mapPointList:Description"
          defaultMessage="Drop-off locations"
        />
      </Text>
    </MapPointListWrapper>
  )
}

const MapPointListWrapper = styled.div`
  background-color: #ebebeb;
`
