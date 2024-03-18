import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import classNames from "classnames";
import Text from "../Text";
import { ReactComponent as Next } from "../../assets/icons/next.svg";
import classes from "./MapPointList.module.scss";
import {
  getMapItems,
  getMappedLocations,
  getSelectedRetailerIds,
} from "../../pages/MapPage/mapUtils";

export default function MapPointList({
  className,
  searchValue,
  locations,
  geocodedLocations,
  setCurrentItem,
  retailers,
  publicRetailers,
  coords,
  map,
}) {
  const [nearestLocations, setNearestLocations] = useState([]);

  const validLocation = new RegExp(searchValue, "ig");
  const filteredLocations = filterLocationsByLocation(locations);

  function filterLocationsByLocation(newLocations) {
    if (searchValue)
      return newLocations?.filter((location) =>
        validLocation.test(location.location)
      );

    return [];
  }

  const retailerLogos = React.useMemo(() => {
    const result = {};

    retailers.forEach(({ id, smallLogo }) => {
      result[id] = smallLogo;
    });

    return result;
  }, [retailers]);

  const handleLocationSelect = (location) => {
    setCurrentItem(location);
  };

  useEffect(() => {
    const { lat, lng } = coords;
    const retailerIds = getSelectedRetailerIds(retailers, publicRetailers);
    getMapItems({ retailerIds, multiple_retailers: true, lat, lng })
      .then((data) => getMappedLocations(data, map, handleLocationSelect))
      .then(setNearestLocations);
  }, []);

  let displayLocations = nearestLocations;

  if (filteredLocations.length) {
    displayLocations = filteredLocations;
  } else if (geocodedLocations.length) {
    displayLocations = geocodedLocations;
  }

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
        {displayLocations?.map((location) => {
          return (
            <button
              type="button"
              onClick={() => handleLocationSelect(location)}
              className={classes.locationContainer}
              key={location.id}
            >
              <div className={classes.locationDescriptionContainer}>
                <img
                  src={retailerLogos[location.retailerId]}
                  alt="retailer-logo"
                />
                <div>
                  <h6 className={classes.locationTitle}>{location.location}</h6>
                  <p className={classes.locationDescription}>
                    {location.address}
                  </p>
                </div>
              </div>
              <div>
                <Next />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

MapPointList.propTypes = {
  className: PropTypes.string,
  searchValue: PropTypes.string,
  setCurrentItem: PropTypes.func,
  locations: PropTypes.array,
  geocodedLocations: PropTypes.array,
  retailers: PropTypes.array,
  publicRetailers: PropTypes.array,
  coords: PropTypes.object,
  map: PropTypes.object,
};
