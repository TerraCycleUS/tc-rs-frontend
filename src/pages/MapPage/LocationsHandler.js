import { getMarkerLogo, processMapItem } from "./mapUtils";
import markerSelectedUrl from "../../assets/icons/marker-selected.svg";

export default class LocationsHandler {
  constructor(config) {
    const { map, onLocationSelect } = config;
    this.map = map;
    this.renderedLoactionsMap = {};
    this.renderedLocationsList = [];
    this.selectedLocationId = null;
    this.onLocationSelect = onLocationSelect;
  }

  selectLocation(location) {
    if (location?.id === this.selectedLocationId) return;

    // resetting previous marker
    if (this.selectedLocationId) {
      const prevMarker = this.renderedLoactionsMap[this.selectedLocationId];
      prevMarker.marker.setIcon(getMarkerLogo(prevMarker.retailerId));
    }

    if (!location) {
      this.selectedLocationId = null;
      this.onLocationSelect(null);
      return;
    }

    location.marker.setIcon(markerSelectedUrl);

    this.selectedLocationId = location.id;
    const { lat, lng } = location;
    this.map.panTo({ lat, lng });
    this.onLocationSelect(location);
  }

  addLocation(location) {
    if (this.renderedLoactionsMap[location.id])
      return this.renderedLoactionsMap[location.id];
    const processedLocation = processMapItem(
      location,
      this.map,
      this.selectLocation.bind(this)
    );
    this.renderedLoactionsMap[location.id] = processedLocation;
    this.renderedLocationsList.push(processedLocation);
    return processedLocation;
  }

  setLocations(newLocations) {
    const newLocationsMap = {};
    newLocations.forEach(
      (newLocation) => (newLocationsMap[newLocation.id] = newLocation)
    );

    // remove old locations from map
    this.renderedLocationsList.forEach((oldLocation) => {
      if (!newLocationsMap[oldLocation.id]) {
        oldLocation.marker.setMap(null);

        if (oldLocation.id === this.selectedLocationId) {
          this.selectLocation(null);
        }
      }
    });

    // adding new locations on map
    const processedNewLocations = newLocations.map((newLocation) => {
      const item = this.renderedLoactionsMap[newLocation.id]
        ? this.renderedLoactionsMap[newLocation.id]
        : processMapItem(newLocation, this.map, this.selectLocation.bind(this));

      newLocationsMap[newLocation.id] = item;

      return item;
    });

    this.renderedLoactionsMap = newLocationsMap;
    this.renderedLocationsList = processedNewLocations;
  }
}
