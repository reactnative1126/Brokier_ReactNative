import axios from '../../utils/axios.js';

export const getListingsMap = () => {
    return axios.get(`/listings/map`, {
        params: {
            zoom: window.zoom,
            nw_latitude: window.bounds.nw_latitude,
            nw_longitude: window.bounds.nw_longitude,
            se_latitude: window.bounds.se_latitude,
            se_longitude: window.bounds.se_longitude,
            filters: window.filters
        }
    }).then((response) => {
        return response.data.listings;
    });
};

export const getListingsList = (region, offset, sort) => {
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
    }).then((response) => {
        return response.data.listings;
    });
};

export const getListingDetail = (id) => {
    return axios.get(`/listings/detail`, {
        params: {
            id: id
        }
    }).then((response) => {
        return response.data.listings[0];
    });
};

export const getDetailHistories = (streetNumber, streetName, streetSuffix, unitNumber) => {
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

export const getDetailSimilars = (latitude, longitude, status, type, lastStatus, propertyType, numBedrooms) => {
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

export const getDetailRooms = (mlsNumber) => {
    return axios.get(`/listings/rooms`, {
        params: {
            mlsNumber
        }
    }).then((response) => {
        console.log(response.data.listings)
        return response.data.listings;
    });
};

export const getSearch = (search) => {
    return axios.get(`/listings/search`, {
        params: {
            search: search
        }
    }).then((response) => {
        return response.data.listings;
    });
};

export const setSearches = (name, coordinates, userId) => {
    return axios.post(`/listings/searches`, {
        name,
        userId,
        region: global.region,
        filters: global.filters,
        location: global.location,
        coordinates,
        description: global.description
    }).then((response) => {
        return response.data.listings;
    });
};

export const getSearches = (userId) => {
    return axios.get(`/listings/searches`, {
        params: {
            userId
        }
    }).then((response) => {
        return response.data.searches;
    });
};

export const setLike = (userId, listingId) => {
    return axios.post(`/listings/like`, {
        userId: userId,
        listingId: listingId
    }).then((response) => {
        return response.data.likes;
    });
};

export const getLike = (userId) => {
    return axios.get(`/listings/like`, {
        params: {
            userId: userId
        }
    }).then((response) => {
        return response.data.likes;
    });
};

export const getFavoriteList = (userId, offset) => {
    return axios.get(`/listings/favorite`, {
        params: {
            userId: userId,
            offset: offset
        }
    }).then((response) => {
        return response.data.listings;
    });
};

export const setViewings = (listingId, agentUniqueId, userId) => {
    return axios.post(`/listings/viewings`, {
        listingId,
        agentUniqueId,
        userId
    }).then((response) => {
        return response.data.listings;
    });
};

export const getViewings = (agentId, userId, offset) => {
    return axios.get(`/listings/viewings`, {
        params: {
            agentId,
            userId,
            offset
        }
    }).then((response) => {
        return response.data.listings;
    });
};