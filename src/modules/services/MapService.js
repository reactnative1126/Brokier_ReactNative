import axios from '@utils/axios';
import configs from "@constants/configs";

export default MapService = {
    getPlaces: function (searchString) {
        let endpoint = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchString}&key=${configs.google_map_key}`;
        return axios.get(endpoint)
            .then((response) => {
                return response.data;
            });
    },
    getGeometry: function (address) {
        let endpoint = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${configs.google_map_key}`;
        return axios.get(endpoint)
            .then((response) => {
                return response.data;
            });
    },
    getGeoCode: function (region) {
        let endpoint = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${region.latitude},${region.longitude}&key=${configs.google_map_key}`;
        return axios.get(endpoint)
            .then((response) => {
                return response.data;
            });
    }
}
