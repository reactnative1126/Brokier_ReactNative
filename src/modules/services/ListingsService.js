import axios from '@utils/axios';

export default ListingsService = {
    getListingsMap: async function () {
        return await axios.get(`/listings/map`, {
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

    getListingsList: async function (region, offset, sort) {
        return await axios.get(`/listings/list`, {
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

    getListingDetail: async function (id) {
        return await axios.get(`/listings/detail`, {
            params: {
                id: id
            }
        }).then((response) => {
            return response.data.listings[0];
        });
    },

    getDetailHistories: async function (streetNumber, streetName, streetSuffix, unitNumber) {
        return await axios.get(`/listings/histories`, {
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

    getDetailSimilars: async function (latitude, longitude, status, type, lastStatus, propertyType, numBedrooms) {
        return await axios.get(`/listings/similars`, {
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

    getDetailRooms: async function (mlsNumber) {
        return await axios.get(`/listings/rooms`, {
            params: {
                mlsNumber
            }
        }).then((response) => {
            console.log(response.data.listings)
            return response.data.listings;
        });
    },

    getSearch: async function (search) {
        return await axios.get(`/listings/search`, {
            params: {
                search: search
            }
        }).then((response) => {
            return response.data.listings;
        });
    },

    setSearches: async function (name, coordinates, userId) {
        return await axios.post(`/listings/searches`, {
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

    getSearches: async function (userId) {
        return await axios.get(`/listings/searches`, {
            params: {
                userId
            }
        }).then((response) => {
            return response.data.searches;
        });
    },

    setLike: async function (userId, listingId) {
        return await axios.post(`/listings/like`, {
            userId: userId,
            listingId: listingId
        }).then((response) => {
            return response.data.likes;
        });
    },

    getLike: async function (userId) {
        return await axios.get(`/listings/like`, {
            params: {
                userId: userId
            }
        }).then((response) => {
            return response.data.likes;
        });
    },

    getFavoriteList: async function (userId, offset) {
        return await axios.get(`/listings/favorite`, {
            params: {
                userId: userId,
                offset: offset
            }
        }).then((response) => {
            return response.data.listings;
        });
    },
}
