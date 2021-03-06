import React from 'react'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
import Text from '../Text'
import { ReactComponent as Next } from '../../assets/icons/next.svg'

export default function MapPointList({
  className,
  searchValue,
  locations,
  setCurrentItem,
}) {
  const validLocation = new RegExp(searchValue, 'igd')
  const filteredLocations = filterLocations()

  function filterLocations() {
    if (!searchValue) return locations.slice(0, 5)
    return locations?.filter((location) =>
      validLocation.test(location.location),
    )
  }

  return (
    <MapPointListWrapper className={className}>
      <MapPointListContainer>
        <DescriptionContainer>
          <Text className="description">
            <FormattedMessage
              id="mapPointList:Description"
              defaultMessage="Drop-off locations"
            />
          </Text>
        </DescriptionContainer>
        {filteredLocations?.map((location) => (
          <LocationContainer key={location.id}>
            <LocationDescriptionContainer>
              <LocationTitle>{location.location}</LocationTitle>
              <LocationDescription>{location.address}</LocationDescription>
            </LocationDescriptionContainer>
            <button
              type="button"
              onClick={() => {
                setCurrentItem(location)
              }}
            >
              <Next />
            </button>
          </LocationContainer>
        ))}
      </MapPointListContainer>
    </MapPointListWrapper>
  )
}

MapPointList.propTypes = {
  className: PropTypes.string,
  searchValue: PropTypes.string,
  locations: PropTypes.array,
  setCurrentItem: PropTypes.func,
}

const MapPointListWrapper = styled.div`
  min-height: 100%;
  width: 100%;
  background-color: #ebebeb;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 16px;
  transition: opacity 0.5s;
  .description {
    font-weight: 700;
    font-size: 13px;
    line-height: 22px;
    color: ${({ theme }) => theme.textSecondary};
    margin-bottom: 16px;
  }
`
const MapPointListContainer = styled.div`
  width: 100%;
  max-width: 768px;
  margin-top: 94px;
`

const DescriptionContainer = styled.div`
  display: flex;
  width: 100%;
`

const LocationContainer = styled.div`
  background-color: ${({ theme }) => theme.terraWhite};
  box-shadow: 0px 14px 20px rgba(0, 0, 0, 0.05);
  border-radius: 15px;
  overflow: hidden;
  padding: 15px 24px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
  align-items: flex-start;
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
  margin-bottom: 6px;
`
