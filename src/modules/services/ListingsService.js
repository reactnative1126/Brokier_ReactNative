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
        return axios.get(`/listings/detail`, {
            params: {
                id: id
            }
        }).then((response) => {
            return response.data.listings[0];
        });
    },

    getDetailHistories: function (streetNumber, streetName, streetSuffix, unitNumber) {
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
        return axios.get(`/listings/rooms`, {
            params: {
                mlsNumber
            }
        }).then((response) => {
            return response.data.listings;
        });
    },

    getSearch: function (search) {
        return axios.get(`/listings/search`, {
            params: {
                search: search
            }
        }).then((response) => {
            return response.data.listings;
        });
    },

    setSearches: function (name, coordinates, userId) {
        return axios.get(`/listings/setSearches`, {
            params: {
                name,
                userId,
                region: global.region,
                filters: global.filters,
                location: global.location,
                coordinates,
                description: global.description
            }
        }).then((response) => {
            return response.data.listings;
        });
    },

    getSearches: function (userId) {
        return axios.get(`/listings/getSearches`, {
            params: {
                userId
            }
        }).then((response) => {
            return response.data.searches;
        });
    },

    setLike: function (userId, listingId) {
        return axios.get(`/listings/setLike`, {
            params: {
                userId: userId,
                listingId: listingId
            }
        }).then((response) => {
            return response.data.likes;
        });
    },

    getLike: function (userId) {
        return axios.get(`/listings/getLike`, {
            params: {
                userId: userId
            }
        }).then((response) => {
            return response.data.likes;
        });
    },

    getFavoriteList: function (userId, offset) {
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
        return axios.get(`/listings/setViewings`, {
            params: {
                listingId,
                agentUniqueId,
                userId
            }
        }).then((response) => {
            return response.data.listings;
        });
    },

    getViewings: function (agentId, userId, offset) {
        console.log({
            agentId,
            userId,
            offset
        })
        return axios.get(`/listings/getViewings`, {
            params: {
                agentId,
                userId,
                offset
            }
        }).then((response) => {
            console.log('----------------',response.data.listings)
            return response.data.listings;
        });
    },
}
