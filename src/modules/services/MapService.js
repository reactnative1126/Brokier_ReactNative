import axios, {setAccess, removeAccess} from '../../utils/axios.js';
import configs from "../../constants/configs.js";

export const getPlaces = async (searchString) => {
    let endpoint = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchString}&key=${configs.google_map_key}`;
    setAccess();
    return axios.get(endpoint)
        .then((response) => {
            removeAccess();
            return response.data;
        });
};

export const getGeometry = async (address) => {
    let endpoint = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${configs.google_map_key}`;
    setAccess();
    return axios.get(endpoint)
        .then((response) => {
            removeAccess();
            return response.data;
        });
};

export const getGeoCode = async (region) => {
    let endpoint = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${region.lat},${region.lng}&key=${configs.google_map_key}`;
    setAccess();
    return axios.get(endpoint)
        .then((response) => {
            removeAccess();
            return response.data;
        });
};