import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import classNames from "classnames";
import Text from "../Text";
import { ReactComponent as Next } from "../../assets/icons/next.svg";
import classes from "./MapPointList.module.scss";
import {
  getMapItems,
  getRetailerIdsParamValue,
} from "../../pages/MapPage/mapUtils";

export default function MapPointList({
  className,
  searchValue,
  locations,
  setCurrentItem,
  retailers,
  publicRetailers,
  coords,
}) {
  const validLocation = new RegExp(searchValue, "ig");
  const filteredLocations = filterLocationsByLocation(locations);

  function filterLocationsByLocation(newLocations) {
    if (!searchValue) return newLocations.slice(0, 6);
    return newLocations?.filter((location) =>
      validLocation.test(location.location)
    );
  }

  const retailerLogos = React.useMemo(() => {
    const result = {};

    retailers.forEach(({ id, smallLogo }) => {
      result[id] = smallLogo;
    });

    return result;
  }, [retailers]);

  useEffect(() => {
    const { lat, lng } = coords;
    const retailerIds = getRetailerIdsParamValue(retailers, publicRetailers);
    getMapItems({ retailerIds, multiple_retailers: true, lat, lng }).then(
      console.log
    );
  }, []);

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
        {filteredLocations?.map((location) => {
          return (
            <button
              type="button"
              onClick={() => {
                setCurrentItem(location);
              }}
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
  retailers: PropTypes.array,
  publicRetailers: PropTypes.array,
  coords: PropTypes.object,
};
