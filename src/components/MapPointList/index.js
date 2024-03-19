import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import classNames from "classnames";
import Text from "../Text";
import { ReactComponent as Next } from "../../assets/icons/next.svg";
import classes from "./MapPointList.module.scss";
import {
  getDivisionIndexesFromLocations,
  getMapItems,
  getSelectedRetailerIds,
} from "../../pages/MapPage/mapUtils";

export default function MapPointList({
  className,
  searchValue,
  geocodedLocations,
  retailers,
  publicRetailers,
  coords,
  locationsHandlerRef,
  setShowList,
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

    retailers.forEach(({ id, smallLogo }) => {
      result[id] = smallLogo;
    });

    return result;
  }, [retailers]);

  const handleLocationSelect = (location) => {
    locationsHandlerRef.current.selectLocation(location);
    setShowList(false);
  };

  useEffect(() => {
    const { lat, lng } = coords;
    const retailerIds = getSelectedRetailerIds(retailers, publicRetailers);
    getMapItems({ retailerIds, multiple_retailers: true, lat, lng })
      .then((data) =>
        data.map((location) =>
          locationsHandlerRef.current.addLocation(location)
        )
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

  const divisionIndexes = getDivisionIndexesFromLocations(displayLocations);

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
        {displayLocations?.map((location, i) => {
          return (
            <>
              {divisionIndexes.includes(i) ? (
                <Text
                  className={classNames(
                    classes.description,
                    classes.oterRetailers
                  )}
                >
                  <FormattedMessage
                    id="mapPointList:DescriptionOtherRetailers"
                    defaultMessage="Drop-off locations"
                  />
                </Text>
              ) : null}
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
                    <h6 className={classes.locationTitle}>
                      {location.location}
                    </h6>
                    <p className={classes.locationDescription}>
                      {location.address}
                    </p>
                  </div>
                </div>
                <div>
                  <Next />
                </div>
              </button>
            </>
          );
        })}
      </div>
    </div>
  );
}

MapPointList.propTypes = {
  className: PropTypes.string,
  searchValue: PropTypes.string,
  geocodedLocations: PropTypes.array,
  retailers: PropTypes.array,
  publicRetailers: PropTypes.array,
  coords: PropTypes.object,
  locationsHandlerRef: PropTypes.object,
  setShowList: PropTypes.func,
};
