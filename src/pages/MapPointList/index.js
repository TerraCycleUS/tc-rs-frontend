import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'
import { useSelector } from 'react-redux'
import Text from '../../components/Text'
import { ReactComponent as Next } from '../../assets/icons/next.svg'
import http from '../../utils/http'

export default function MapPointList() {
  const [locations, setLocation] = useState([])
  const user = useSelector((state) => state.user)
  const config = {
    headers: {
      Authorization: `Bearer ${user.authorization}`,
    },
  }
  useEffect(() => {
    http
      .get('/api/map-items', config)
      .then((response) => {
        setLocation(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <MapPointListWrapper>
      <DescriptionContainer>
        <Text className="description">
          <FormattedMessage
            id="mapPointList:Description"
            defaultMessage="Drop-off locations"
          />
        </Text>
      </DescriptionContainer>
      {locations?.map((location) => (
        <LocationContainer key={location.id}>
          <LocationDescriptionContainer>
            <LocationTitle>{location.location}</LocationTitle>
            <LocationDescription>{location.address}</LocationDescription>
          </LocationDescriptionContainer>
          <Next />
        </LocationContainer>
      ))}
    </MapPointListWrapper>
  )
}

const MapPointListWrapper = styled.div`
  min-height: 100%;
  background-color: #ebebeb;
  display: flex;
  flex-direction: column;
  align-items: center;

  .description {
    font-weight: 700;
    font-size: 13px;
    line-height: 22px;
    color: ${({ theme }) => theme.textSecondary};
    margin-bottom: 16px;
  }
`
const DescriptionContainer = styled.div`
  display: flex;
  min-width: 343px;
`

const LocationContainer = styled.div`
  background-color: ${({ theme }) => theme.terraWhite};
  box-shadow: 0px 14px 20px rgba(0, 0, 0, 0.05);
  border-radius: 15px;
  height: 76px;
  overflow: hidden;
  padding: 15px 24px;
  display: flex;
  justify-content: space-between;
  min-width: 343px;
  margin-bottom: 10px;
`

const LocationDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const LocationDescription = styled.p`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: ${({ theme }) => theme.textPrimary};
`

const LocationTitle = styled.h6`
  font-weight: 700;
  font-size: 15px;
  line-height: 24px;
  color: ${({ theme }) => theme.textPrimary};
`
