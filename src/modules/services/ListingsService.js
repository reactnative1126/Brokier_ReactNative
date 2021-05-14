import axios from '@utils/axios';

export default ListingsService = {
    getListingsMap: function () {
        return axios.get(`/listings/map`, {
            params: {
                zoom: Math.round(Math.log(360 / global.region.longitudeDelta) / Math.LN2),
                nw_latitude: global.region.latitude + global.region.latitudeDelta / 2,
                nw_longitude: global.region.longitude - global.region.longitudeDelta / 2,
                se_latitude: global.region.latitude - global.region.latitudeDelta / 2,
                se_longitude: global.region.longitude + global.region.longitudeDelta / 2,
                filters: global.filters
            }
        }).then((response) => {
            return response.data.listings;
        });
    },
    getListingsList: function (region, offset, sort) {
        console.log(`${region}:${offset}:${sort}`);
        return axios.get(`/listings/list`, {
            params: {
                offset: offset,
                sort: sort,
                nw_latitude: region.latitude + region.latitudeDelta / 2,
                nw_longitude: region.longitude - region.longitudeDelta / 2,
                se_latitude: region.latitude - region.latitudeDelta / 2,
                se_longitude: region.longitude + region.longitudeDelta / 2,
                filters: global.filters
            }
        }).then((response) => {
            return response.data.listings;
        });
    },
    getListingDetail: function (id) {
        console.log(`${id}`);
        return axios.get(`/listings/detail`, {
            params: {
                id: id
            }
        }).then((response) => {
            return response.data.listings[0];
        });
    },
    getDetailHistories: function (streetNumber, streetName, streetSuffix, unitNumber) {
        console.log(`${streetNumber}:${streetName}:${streetSuffix}:${unitNumber}`);
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
    },
    getDetailSimilars: function (latitude, longitude, status, type, lastStatus, propertyType, numBedrooms) {
        console.log(`${latitude}:${longitude}:${status}:${type}:${lastStatus}:${propertyType}:${numBedrooms}`);
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
    },
    getDetailRooms: function (mlsNumber) {
        console.log(`${mlsNumber}`);
        return axios.get(`/listings/rooms`, {
            params: {
                mlsNumber
            }
        }).then((response) => {
            return response.data.listings;
        });
    },
    getSearch: function (search) {
        console.log(`${search}`);
        return axios.get(`/listings/search`, {
            params: {
                search: search
            }
        }).then((response) => {
            return response.data.listings;
        });
    },
    setSearches: function (name, coordinates, userId) {
        console.log(`${name}:${coordinates}:${userId}`);
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
    },
    getSearches: function (userId) {
        console.log(`${userId}`);
        return axios.get(`/listings/searches`, {
            params: {
                userId
            }
        }).then((response) => {
            return response.data.searches;
        });
    },
    setLike: function (userId, listingId) {
        console.log(`${userId}:${listingId}`);
        return axios.post(`/listings/like`, {
            userId: userId,
            listingId: listingId
        }).then((response) => {
            return response.data.likes;
        });
    },
    getLike: function (userId) {
        console.log(`${userId}`);
        return axios.get(`/listings/like`, {
            params: {
                userId: userId
            }
        }).then((response) => {
            return response.data.likes;
        });
    },
    getFavoriteList: function (userId, offset) {
        console.log(`${userId}:${offset}`);
        return axios.get(`/listings/favorite`, {
            params: {
                userId: userId,
                offset: offset
            }
        }).then((response) => {
            return response.data.listings;
        });
    },
    setViewings: function (listingId, agentUniqueId, userId) {
        console.log(`${listingId}:${agentUniqueId}:${userId}`);
        return axios.post(`/listings/viewings`, {
            listingId,
            agentUniqueId,
            userId
        }).then((response) => {
            return response.data.listings;
        });
    },
    getViewings: function (agentId, userId, offset) {
        console.log(`${agentId}:${userId}:${offset}`);
        return axios.get(`/listings/viewings`, {
            params: {
                agentId,
                userId,
                offset
            }
        }).then((response) => {
            return response.data.listings;
        });
    },
}
