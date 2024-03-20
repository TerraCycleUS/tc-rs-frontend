import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import classNames from "classnames";
import Text from "../Text";
import { ReactComponent as Next } from "../../assets/icons/next.svg";
import classes from "./MapPointList.module.scss";
import {
  getMapItems,
  splitLocationsBySelectedRetailers,
} from "../../pages/MapPage/mapUtils";

export default function MapPointList({
  className,
  searchValue,
  geocodedLocations,
  publicRetailers,
  selectedRetailerIds,
  coords,
  locationsHandlerRef,
  onSelectLocation,
}) {
  const [nearestLocations, setNearestLocations] = useState([]);
  const validLocation = new RegExp(searchValue, "ig");
  const filteredLocations = filterLocationsByLocation(
    locationsHandlerRef.current.renderedLocationsList
  );

  function filterLocationsByLocation(newLocations) {
    if (searchValue)
      return newLocations?.filter((location) =>
        validLocation.test(location.location)
      );

    return [];
  }

  const retailerLogos = React.useMemo(() => {
    const result = {};

    publicRetailers.forEach(({ id, smallLogo }) => {
      result[id] = smallLogo;
    });

    return result;
  }, [publicRetailers]);

  const handleLocationSelect = (location) => {
    onSelectLocation(location);
    locationsHandlerRef.current.selectLocation(location);
  };

  useEffect(() => {
    const { lat, lng } = coords;
    const retailerIds = selectedRetailerIds.join(",") || undefined;
    getMapItems({ retailerIds, multiple_retailers: true, lat, lng })
      .then((data) =>
        data
          .slice(0, 6)
          .map((location) => locationsHandlerRef.current.addLocation(location))
      )
      .then(setNearestLocations)
      .catch(() =>
        setNearestLocations(
          locationsHandlerRef.current.renderedLocationsList.slice(0, 6)
        )
      );
  }, []);

  let displayLocations = nearestLocations;

  if (filteredLocations.length) {
    displayLocations = filteredLocations;
  } else if (geocodedLocations.length) {
    displayLocations = geocodedLocations;
  }

  const [selectedDisplayLocations, otherDisplaLocations] =
    splitLocationsBySelectedRetailers(
      displayLocations,
      publicRetailers,
      selectedRetailerIds
    );

  return (
    <div className={classNames(classes.mapPointListWrapper, className)}>
      <div className={classes.mapPointListContainer}>
        <div className={classes.descriptionContainer}>
          <Text className={classes.description}>
            <FormattedMessage
              id="mapPointList:Description"
              defaultMessage="Drop-off locations"
            />
          </Text>
        </div>
        {selectedDisplayLocations.length ? (
          selectedDisplayLocations?.map((location) => (
            <LocationItem
              location={location}
              key={location.id}
              onClick={handleLocationSelect}
              retailerLogos={retailerLogos}
            />
          ))
        ) : (
          <Text className="text-center">
            <FormattedMessage
              id="mapPointList:NoLocations"
              defaultMessage="No drop off locations found in this area. Try adding another retailer to recycle nearby. "
            />
          </Text>
        )}
        {otherDisplaLocations.length ? (
          <>
            <Text
              className={classNames(
                classes.description,
                classes.otherRetailers
              )}
            >
              <FormattedMessage
                id="mapPointList:DescriptionOtherRetailers"
                defaultMessage="Other retailers near me"
              />
            </Text>
            {otherDisplaLocations?.map((location) => (
              <LocationItem
                location={location}
                key={location.id}
                onClick={handleLocationSelect}
                retailerLogos={retailerLogos}
              />
            ))}
          </>
        ) : null}
      </div>
    </div>
  );
}

function LocationItem({ location, onClick, retailerLogos }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        onClick(location, e);
      }}
      className={classes.locationContainer}
    >
      <div className={classes.locationDescriptionContainer}>
        <img src={retailerLogos[location.retailerId]} alt="retailer-logo" />
        <div>
          <h6 className={classes.locationTitle}>{location.location}</h6>
          <p className={classes.locationDescription}>{location.address}</p>
        </div>
      </div>
      <div>
        <Next />
      </div>
    </button>
  );
}

MapPointList.propTypes = {
  className: PropTypes.string,
  searchValue: PropTypes.string,
  geocodedLocations: PropTypes.array,
  selectedRetailerIds: PropTypes.array,
  publicRetailers: PropTypes.array,
  coords: PropTypes.object,
  locationsHandlerRef: PropTypes.object,
  onSelectLocation: PropTypes.func,
};

LocationItem.propTypes = {
  location: PropTypes.shape({
    retailerId: PropTypes.number,
    location: PropTypes.string,
    address: PropTypes.string,
  }),
  onClick: PropTypes.func,
  retailerLogos: PropTypes.object,
};
