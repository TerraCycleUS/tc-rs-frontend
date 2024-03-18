import { processMapItem } from "./mapUtils";

export default class LocationsHandler {
  constructor(config) {
    const { map, onLocationSelect } = config;
    this.map = map;
    this.renderedLoactionsMap = {};
    this.renderedLocationsList = [];
    this.selectedLocationId = null;
    this.onLocationSelect = onLocationSelect;
  }

  addLocation(location) {
    if (this.renderedLoactionsMap[location.id]) return;
    const processedLocation = processMapItem(
      location,
      this.map,
      this.onLocationSelect
    );
    this.renderedLoactionsMap[location.id] = processedLocation;
    this.renderedLocationsList.push(processedLocation);
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
          this.selectedLocationId = null;
          this.onLocationSelect(null);
        }
      }
    });

    // adding new locations on map
    const processedNewLocations = newLocations.map((newLocation) => {
      const item = this.renderedLoactionsMap[newLocation.id]
        ? this.renderedLoactionsMap[newLocation.id]
        : processMapItem(newLocation, this.map, this.onLocationSelect);

      newLocationsMap[newLocation.id] = item;

      return item;
    });

    this.renderedLoactionsMap = newLocationsMap;
    this.renderedLocationsList = processedNewLocations;
  }
}
