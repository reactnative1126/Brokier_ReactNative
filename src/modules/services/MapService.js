import axios from '../../utils/axios.js';
import configs from "../../constants/configs.js";

class MapService {
    async getPlaces(searchString) {
        let endpoint = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchString}&key=${configs.google_map_key}`;
        return await axios.get(endpoint)
            .then((response) => {
                return response.data;
            });
    };
    async getGeometry(address) {
        let endpoint = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${configs.google_map_key}`;
        return await axios.get(endpoint)
            .then((response) => {
                return response.data;
            });
    };
    async getGeoCode(region) {
        let endpoint = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${region.latitude},${region.longitude}&key=${configs.google_map_key}`;
        return await axios.get(endpoint)
            .then((response) => {
                return response.data;
            });
    };
}

export default MapService