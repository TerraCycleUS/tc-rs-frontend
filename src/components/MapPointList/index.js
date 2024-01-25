import React from "react";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import classNames from "classnames";
import Text from "../Text";
import { ReactComponent as Next } from "../../assets/icons/next.svg";
import classes from "./MapPointList.module.scss";

export default function MapPointList({
  className,
  searchValue,
  locations,
  setCurrentItem,
}) {
  const validLocation = new RegExp(searchValue, "ig");
  const filteredLocations = filterLocationsByLocation(locations);

  function filterLocationsByLocation(newLocations) {
    if (!searchValue) return newLocations.slice(0, 6);
    return newLocations?.filter((location) =>
      validLocation.test(location.location)
    );
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
        {filteredLocations?.map((location) => (
          <div className={classes.locationContainer} key={location.id}>
            <div className={classes.locationDescriptionContainer}>
              <h6 className={classes.locationTitle}>{location.location}</h6>
              <p className={classes.locationDescription}>{location.address}</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setCurrentItem(location);
              }}
            >
              <Next />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

MapPointList.propTypes = {
  className: PropTypes.string,
  searchValue: PropTypes.string,
  setCurrentItem: PropTypes.func,
  locations: PropTypes.array,
};
