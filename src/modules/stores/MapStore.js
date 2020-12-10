import { isEmpty } from "@utils/functions";

const latitude = 43.640856;
const longitude = -79.387236;
const latitudeDelta = 0.005;
const longitudeDelta = 0.005;

class Store {
  mapState = {
    loading: false,
    tab_visible: false,
    region: {
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: latitudeDelta,
      longitudeDelta: longitudeDelta
    },
    points: {
      NorthEast: {
        latitude: latitude + latitudeDelta / 1.3,
        longitude: longitude + longitudeDelta / 2
      },
      NorthWest: {
        latitude: latitude + latitudeDelta / 1.3,
        longitude: longitude - longitudeDelta / 2
      },
      SouthWest: {
        latitude: latitude - latitudeDelta / 2.4,
        longitude: longitude - longitudeDelta / 2
      },
      SouthEast: {
        latitude: latitude - latitudeDelta / 2.4,
        longitude: longitude + longitudeDelta / 2
      }
    },
    endpoint: 'listings?resultsPerPage=50',
    searchString: "Search MLS number, Address, City",
    view: false,
    forSale: false,
    sold: false,
    forRent: false,
    rented: false,
    markerStatus: false,
  }

  onSearchFilter(property) {
    let searchString = global.searchString;
    let flag = true;
    flag &= searchString.view ? property.type == "Sale" : property.type == "Lease";
    flag &= searchString.propertyType.allTypes ? true : true;
    flag &= searchString.propertyType.detached ? property.class == "ResidentialProperty" || property.details.propertyType == "Detached" : true;
    flag &= searchString.propertyType.semiDetached ? property.details.propertyType == "Semi-Detached" : true;
    flag &= searchString.propertyType.freeholdTown ? property.details.propertyType == "Att/Row/Twnhouse" : true;
    flag &= searchString.propertyType.condoTown ? property.class == "CondoProperty" || property.details.propertyType == "Condo Townhouse" : true;
    flag &= searchString.propertyType.condoApartment ? property.details.propertyType == "Condo Apt" : true;
    flag &= searchString.propertyType.duplex ? true : true;
    flag &= searchString.propertyType.multiFamily ? property.details.propertyType == "Att/Row/Twnhouse" : true;
    flag &= searchString.propertyType.land ? property.details.propertyType == "Land" || property.details.propertyType == "Vacant Land" : true;
    flag &= searchString.daysOnMarket == 0 ? true : searchString.daysOnMarket >= parseInt((Date.now() - Date.parse(property.listDate)) / (1000 * 60 * 60 * 24));
    flag &= searchString.soldInLast == 0 ? true : searchString.soldInLast >= parseInt((Date.now() - Date.parse(property.updatedOn)) / (1000 * 60 * 60 * 24)) && property.lastStatus === 'Sld';
    flag &= parseInt(searchString.rooms.beds) == 0 ? true : parseInt(searchString.rooms.beds) >= (isEmpty(property.details.numBedrooms) ? 0 : parseInt(property.details.numBedrooms)) + (isEmpty(property.details.numBedroomsPlus) ? 0 : parseInt(property.details.numBedroomsPlus));
    flag &= parseInt(searchString.rooms.baths) == 0 ? true : parseInt(searchString.rooms.baths) >= (isEmpty(property.details.numBathrooms) ? 0 : parseInt(property.details.numBathrooms)) + (isEmpty(property.details.numBathroomsPlus) ? 0 : parseInt(property.details.numBathroomsPlus));
    flag &= parseInt(searchString.rooms.parking) == 0 ? true : parseInt(searchString.rooms.parking) >= isEmpty(property.details.numParkingSpaces) ? 0 : parseInt(property.details.numParkingSpaces);
    flag &= parseInt(searchString.rooms.garage) == 0 ? true : parseInt(searchString.rooms.garage) >= isEmpty(property.details.numGarageSpaces) ? 0 : parseInt(property.details.numGarageSpaces);
    flag &= searchString.price.minPrice == 50000 && searchString.price.maxPrice == 5000000 ? true : searchString.price.minPrice <= parseInt(property.listPrice) && parseInt(property.listPrice) <= searchString.price.maxPrice;
    flag &= isEmpty(property.details.sqft) || (searchString.size.minSize == 200 && searchString.size.maxSize == 5000) ? true : parseInt(searchString.size.minSize) <= parseInt(property.details.sqft.split("-"[0])) && parseInt(property.details.sqft.split("-"[1])) <= parseInt(searchString.size.maxSize);

    return flag;
  }

  getBadge(filters) {
    var badge = 0;

    if (filters.propertyType.allTypes) badge = badge + 1;
    if (filters.propertyType.detached) badge = badge + 1;
    if (filters.propertyType.semiDetached) badge = badge + 1;
    if (filters.propertyType.freeholdTown) badge = badge + 1;
    if (filters.propertyType.condoTown) badge = badge + 1;
    if (filters.propertyType.condoApartment) badge = badge + 1;
    if (filters.propertyType.duplex) badge = badge + 1;
    if (filters.propertyType.multiFamily) badge = badge + 1;
    if (filters.propertyType.land) badge = badge + 1;

    if (filters.price.minPrice > 500) badge = badge + 1;
    if (filters.price.maxPrice < 20000) badge = badge + 1;
    if (filters.daysOnMarket != 0) badge = badge + 1;
    if (filters.soldInLast != 90) badge = badge + 1;

    if (filters.rooms.bath > 0) badge = badge + 1;
    if (filters.rooms.bed > 0) badge = badge + 1;
    if (filters.rooms.garage > 0) badge = badge + 1;
    if (filters.rooms.parking > 0) badge = badge + 1;

    if (filters.size.minSize > 200) badge = badge + 1;
    if (filters.size.maxSize < 5000) badge = badge + 1;

    if (filters.age.minAge > 1) badge = badge + 1;
    if (filters.age.maxAge < 100) badge = badge + 1;

    if (filters.condo.minCondo > 5) badge = badge + 1;
    if (filters.condo.maxCondo < 5000) badge = badge + 1;

    return badge;
  }

  getMarkers(listings) {
    var results = {}
    for (let index = 0; index < listings.length; index++) {
      const listingOne = listings[index];
      // const key = listingOne.latitude + '#' + listingOne.longitude;
      const key = global.zoom < 15 ? listingOne.latitude + '#' + listingOne.longitude : listingOne.streetNumber + listingOne.streetName + listingOne.streetSuffix;
      if (isEmpty(results[key])) results[key] = [];
      results[key].push(listingOne);
    }
    return Object.values(results);
  }

  getRegion(points) {
    let minX, maxX, minY, maxY;
    ((point) => {
      minX = point.latitude;
      maxX = point.latitude;
      minY = point.longitude;
      maxY = point.longitude;
    })(points[0]);

    points.map((point) => {
      minX = Math.min(minX, point.latitude);
      maxX = Math.max(maxX, point.latitude);
      minY = Math.min(minY, point.longitude);
      maxY = Math.max(maxY, point.longitude);
    });

    const midX = (minX + maxX) / 2;
    const midY = (minY + maxY) / 2;
    const deltaX = (maxX - minX);
    const deltaY = (maxY - minY);

    return {
      latitude: midX,
      longitude: midY,
      latitudeDelta: deltaX,
      longitudeDelta: deltaY
    };
  }

  _isInPolygon = (point, polygonArray) => {

    let x = point.latitude
    let y = point.longitude

    let inside = false
    for (let i = 0, j = polygonArray.length - 1; i < polygonArray.length; j = i++) {
      let xLat = polygonArray[i].latitude
      let yLat = polygonArray[i].longitude
      let xLon = polygonArray[j].latitude
      let yLon = polygonArray[j].longitude

      let intersect = ((yLat > y) !== (yLon > y)) && (x < (xLon - xLat) * (y - yLat) / (yLon - yLat) + xLat)
      if (intersect) inside = !inside
    }
    return inside
  }

  async getRegionMarkers(type, points, listings) {
    var results = [];
    listings.map((listing, key) => {
      var point = {
        latitude: type == 1 ? listing[0].latitude : listing.latitude,
        longitude: type == 1 ? listing[0].longitude : listing.longitude
      };
      if (this._isInPolygon(point, points)) {
        results = [...results, listing];
      }
    })
    return results;
  }
}

const MapStore = new Store();
export default MapStore;