import axios from '@utils/axios';
import configs from "@constants/configs";

export default MapService = {
    getPlaces: async function (searchString) {
        let endpoint = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchString}&key=${configs.google_map_key}`;
        return await axios.get(endpoint)
            .then((response) => {
                return response.data;
            });
    },
    getGeometry: async function (address) {
        let endpoint = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${configs.google_map_key}`;
        return await axios.get(endpoint)
            .then((response) => {
                return response.data;
            });
    },
    getGeoCode: async function (region) {
        let endpoint = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${region.latitude},${region.longitude}&key=${configs.google_map_key}`;
        return await axios.get(endpoint)
            .then((response) => {
                // console.log(response.data);
                return response.data;
            });
    }
}
