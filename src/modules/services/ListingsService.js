import axios from '../../utils/axios.js';

export const getListingsMap = async (cancelTokenSource) => {
    return axios.get(`/listings/map`, {
        params: {
            zoom: window.zoom,
            nw_latitude: window.bounds.nw_latitude,
            nw_longitude: window.bounds.nw_longitude,
            se_latitude: window.bounds.se_latitude,
            se_longitude: window.bounds.se_longitude,
            filters: window.filters
        }
    }, {
        cancelToken: cancelTokenSource.token
    }).then((response) => {
        return response.data.listings;
    });
};

export const getListingsList = async (cancelTokenSource, region, offset, sort) => {
    return axios.get(`/listings/list`, {
        params: {
            offset: offset,
            sort: sort,
            nw_latitude: window.bounds.nw_latitude,
            nw_longitude: window.bounds.nw_longitude,
            se_latitude: window.bounds.se_latitude,
            se_longitude: window.bounds.se_longitude,
            filters: window.filters
        }
    }, {
        cancelToken: cancelTokenSource.token
    }).then((response) => {
        return response.data.listings;
    });
};

export const getListingDetail = async (id) => {
    return axios.get(`/listings/detail`, {
        params: {
            id: id
        }
    }).then((response) => {
        return response.data.listings[0];
    });
};

export const getDetailHistories = async (streetNumber, streetName, streetSuffix, unitNumber) => {
    return axios.get(`/listings/histories`, {
        params: {
            streetNumber,
            streetName,
            streetSuffix,
            unitNumber
        }
    }).then((response) => {
        return response.data.listings;
    });
};

export const getDetailSimilars = async (latitude, longitude, status, type, lastStatus, propertyType, numBedrooms) => {
    return axios.get(`/listings/similars`, {
        params: {
            latitude,
            longitude,
            status,
            type,
            lastStatus,
            propertyType,
            numBedrooms
        }
    }).then((response) => {
        return response.data.listings;
    });
};

export const getDetailRooms = async (mlsNumber) => {
    return axios.get(`/listings/rooms`, {
        params: {
            mlsNumber
        }
    }).then((response) => {
        console.log(response.data.listings)
        return response.data.listings;
    });
};

export const getSearch = async (search) => {
    return axios.get(`/listings/search`, {
        params: {
            search: search
        }
    }).then((response) => {
        return response.data.listings;
    });
};

export const setSearches = async (name, coordinates, userId) => {
    return axios.post(`/listings/searches`, {
        name,
        userId,
        region: window.region,
        filters: window.filters,
        location: window.locations,
        coordinates,
        description: window.description
    }).then((response) => {
        return response.data.listings;
    });
};

export const getSearches = async (userId) => {
    return axios.get(`/listings/searches`, {
        params: {
            userId
        }
    }).then((response) => {
        return response.data.searches;
    });
};

export const setLike = async (userId, listingId) => {
    return axios.post(`/listings/like`, {
        userId: userId,
        listingId: listingId
    }).then((response) => {
        return response.data.likes;
    });
};

export const getLike = async (userId) => {
    return axios.get(`/listings/like`, {
        params: {
            userId: userId
        }
    }).then((response) => {
        return response.data.likes;
    });
};

export const getFavoriteList = async (userId, offset) => {
    return axios.get(`/listings/favorite`, {
        params: {
            userId: userId,
            offset: offset
        }
    }).then((response) => {
        return response.data.listings;
    });
};