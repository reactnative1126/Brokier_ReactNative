const functions = require('firebase-functions');
// firebase configuration
const firebase = require('firebase');
// axios configuration
const axios = require('axios');
axios.defaults.baseURL = "https://api.repliers.io";
axios.defaults.headers.common = { "Content-Type": "application/json" };
axios.defaults.headers.common['REPLIERS-API-KEY'] = "ygmJxh2vUhNxWgpWSU9AM3t7NE5YFa";
axios.defaults.responseType = "json";

const runtimeOpts = {
    timeoutSeconds: 300
}
exports.getListings = functions.runWith(runtimeOpts).https.onRequest(async (req, res) => {
    const firebaseConfig = {
        apiKey: "AIzaSyD_xrLheTDJ_PCGWtZIJhGoDd9u4QA7Hbs",
        authDomain: "brokier-1126.firebaseapp.com",
        databaseURL: "https://brokier-1126.firebaseio.com",
        projectId: "brokier-1126",
        storageBucket: "brokier-1126.appspot.com",
        messagingSenderId: "453223822262",
        appId: "1:453223822262:web:2c90f3e750786006e40717",
        measurementId: "G-WH0GYZ9J6V"
    };
    const firestore = !firebase.apps.length ? firebase.initializeApp(firebaseConfig).firestore() : firebase.app().firestore();
    await firestore.collection('listings').where('daysOnMarket', '==', '394').get().then(listings => {
        return listings.docs.map((doc) => doc.data());
    });
});

// exports.scheduledFunction = functions.pubsub.schedule(`every 2 minutes`).onRun(async () => {
//     const firebaseConfig = {
//         apiKey: "AIzaSyD_xrLheTDJ_PCGWtZIJhGoDd9u4QA7Hbs",
//         authDomain: "brokier-1126.firebaseapp.com",
//         databaseURL: "https://brokier-1126.firebaseio.com",
//         projectId: "brokier-1126",
//         storageBucket: "brokier-1126.appspot.com",
//         messagingSenderId: "453223822262",
//         appId: "1:453223822262:web:2c90f3e750786006e40717",
//         measurementId: "G-WH0GYZ9J6V"
//     };
//     const firestore = !firebase.apps.length ? firebase.initializeApp(firebaseConfig).firestore() : firebase.app().firestore();
//     var currentTime = new Date();
//     var currentPage = 1;
//     var totalPages = 400;
//     await axios.get("listings").then((listings) => {
//         totalPages = listings.data.numPages;
//     })
//     await firestore.collection('configs').doc('updateTime').update({ currentTime });
//     await firestore.collection('configs').get().then(async (configs) => {
//         configs.forEach(async (config) => {
//             if (config.id === 'pageNumber') {
//                 currentPage = parseInt(config.data().currentPage) + 1;
//                 firestore.collection('configs').doc('pageNumber').update({ currentPage });
//             };
//         });
//     });
//     if (currentPage <= totalPages) {
//         axios.get(`listings?pageNum=${currentPage}`).then(async (res) => {
//             var batch = firestore.batch();
//             res.data.listings.map((listingOne, key) => {
//                 console.log(`current page: ${currentPage}, total pages: ${totalPages}, current time: ${currentTime}, mlsNumber: ${listingOne.mlsNumber}`);
//                 var listingRef = firestore.collection('listings').doc(listingOne.mlsNumber);
//                 batch.set(listingRef, listingOne);
//             });
//             await batch.commit();
//         });
//     };
// });


// exports.updateFunction = functions.pubsub.schedule(`every 120 minutes`).onRun(async () => {
//     const firebaseConfig = {
//         apiKey: "AIzaSyD_xrLheTDJ_PCGWtZIJhGoDd9u4QA7Hbs",
//         authDomain: "brokier-1126.firebaseapp.com",
//         databaseURL: "https://brokier-1126.firebaseio.com",
//         projectId: "brokier-1126",
//         storageBucket: "brokier-1126.appspot.com",
//         messagingSenderId: "453223822262",
//         appId: "1:453223822262:web:2c90f3e750786006e40717",
//         measurementId: "G-WH0GYZ9J6V"
//     };
//     const firestore = !firebase.apps.length ? firebase.initializeApp(firebaseConfig).firestore() : firebase.app().firestore();
//     var currentTime = new Date();
//     var currentPage = 1;
//     var totalPages = 400;
//     await axios.get("listings").then((listings) => {
//         totalPages = listings.data.numPages;
//     })
//     await firestore.collection('configs').doc('updateTime').update({ currentTime });
//     await firestore.collection('configs').get().then(async (configs) => {
//         configs.forEach(async (config) => {
//             if (config.id === 'pageNumber') {
//                 currentPage = parseInt(config.data().currentPage) + 1;
//                 firestore.collection('configs').doc('pageNumber').update({ currentPage });
//             };
//         });
//     });
//     if (currentPage <= totalPages) {
//         axios.get(`listings?pageNum=${currentPage}`).then(async (res) => {
//             var batch = firestore.batch();
//             res.data.listings.map((listingOne, key) => {
//                 console.log(`current page: ${currentPage}, total pages: ${totalPages}, current time: ${currentTime}, mlsNumber: ${listingOne.mlsNumber}`);
//                 var listingRef = firestore.collection('listings').doc(listingOne.mlsNumber);
//                 batch.set(listingRef, listingOne);
//             });
//             await batch.commit();
//         });
//     };
// });



// exports.listings = functions.runWith({ timeoutSeconds: 300 }).https.onRequest(async (req, res) => {
//     const firebaseConfig = {
//         apiKey: "AIzaSyD_xrLheTDJ_PCGWtZIJhGoDd9u4QA7Hbs",
//         authDomain: "brokier-1126.firebaseapp.com",
//         databaseURL: "https://brokier-1126.firebaseio.com",
//         projectId: "brokier-1126",
//         storageBucket: "brokier-1126.appspot.com",
//         messagingSenderId: "453223822262",
//         appId: "1:453223822262:web:2c90f3e750786006e40717",
//         measurementId: "G-WH0GYZ9J6V"
//     };
//     const firestore = !firebase.apps.length ? firebase.initializeApp(firebaseConfig).firestore() : firebase.app().firestore();
//     var currentPage = 1;
//     axios.get(`listings?pageNum=${currentPage}`).then(async (res) => {
//         var batch = firestore.batch();
//         res.data.listings.map(async (listingOne, key) => {
//             await firestore.collection('listings-latest').doc(listingOne.mlsNumber).get().then(async (listing) => {
//                 if (listing.exists) {
//                     await batch.delete(firestore.collection('listings-latest').doc(listingOne.mlsNumber));
//                     await batch.set(firestore.collection('listings-latest').doc(listingOne.mlsNumber), listingOne);
                    // await batch.set(firestore.collection('listings-latest').doc(listingOne.mlsNumber), {
                    //     mlsNumber: listingOne.mlsNumber,
                    //     status: listingOne.status,
                    //     class: listingOne.class,
                    //     type: listingOne.type,
                    //     listPrice: listingOne.listPrice,
                    //     daysOnMarket: listingOne.daysOnMarket,
                    //     occupancy: listingOne.occupancy,
                    //     listDate: listingOne.listDate,
                    //     updatedOn: listingOne.updatedOn,
                    //     lastStatus: listingOne.lastStatus,
                    //     soldPrice: listingOne.soldPrice,
                    //     soldDate: listingOne.soldDate,
                    //     images: listingOne.images,
                    //     agents: listingOne.agents
                    // });
                    // await batch.commit();
                    // var batchSecond = firestore.batch();
                    // await batchSecond.set(firestore.collection('listings-latest').doc(listingOne.mlsNumber).collection('address').doc(), {
                    //     area: listingOne.address.area,
                    //     city: listingOne.address.city,
                    //     country: listingOne.address.country,
                    //     district: listingOne.address.district,
                    //     majorIntersection: listingOne.address.majorIntersection,
                    //     neighborhood: listingOne.address.neighborhood,
                    //     streetDirection: listingOne.address.streetDirection,
                    //     streetName: listingOne.address.streetName,
                    //     streetNumber: listingOne.address.streetNumber,
                    //     streetSuffix: listingOne.address.streetSuffix,
                    //     unitNumber: listingOne.address.unitNumber,
                    //     zip: listingOne.address.zip,
                    //     state: listingOne.address.state
                    // });
                    // await batchSecond.set(firestore.collection('listings-latest').doc(listingOne.mlsNumber).collection('condominium').doc(), {
                    //     ammenities: listingOne.condominium.ammenities,
                    //     buildingInsurance: listingOne.condominium.buildingInsurance,
                    //     condoCorp: listingOne.condominium.condoCorp,
                    //     condoCorpNum: listingOne.condominium.condoCorpNum,
                    //     exposure: listingOne.condominium.exposure,
                    //     lockerNumber: listingOne.condominium.lockerNumber,
                    //     locker: listingOne.condominium.locker,
                    //     parkingType: listingOne.condominium.parkingType,
                    //     pets: listingOne.condominium.pets,
                    //     propertyMgr: listingOne.condominium.propertyMgr,
                    //     stories: listingOne.condominium.stories
                    // });
                    // await batchSecond.set(firestore.collection('listings-latest').doc(listingOne.mlsNumber).collection('details').doc(), {
                    //     airConditioning: listingOne.details.airConditioning,
                    //     basement1: listingOne.details.basement1,
                    //     basement2: listingOne.details.basement2,
                    //     centralVac: listingOne.details.centralVac,
                    //     den: listingOne.details.den,
                    //     description: listingOne.details.description,
                    //     elevator: listingOne.details.elevator,
                    //     exteriorConstruction1: listingOne.details.exteriorConstruction1,
                    //     exteriorConstruction2: listingOne.details.exteriorConstruction2,
                    //     extras: listingOne.details.extras,
                    //     furnished: listingOne.details.furnished,
                    //     garage: listingOne.details.garage,
                    //     heating: listingOne.details.heating,
                    //     numBathrooms: listingOne.details.numBathrooms,
                    //     numBathroomsPlus: listingOne.details.numBathroomsPlus,
                    //     numBedrooms: listingOne.details.numBedrooms,
                    //     numBedroomsPlus: listingOne.details.numBedroomsPlus,
                    //     numFireplaces: listingOne.details.numFireplaces,
                    //     numGarageSpaces: listingOne.details.numGarageSpaces,
                    //     numParkingSpaces: listingOne.details.numParkingSpaces,
                    //     numRooms: listingOne.details.numRooms,
                    //     numRoomsPlus: listingOne.details.numRoomsPlus,
                    //     patio: listingOne.details.patio,
                    //     propertyType: listingOne.details.propertyType,
                    //     sqft: listingOne.details.sqft,
                    //     style: listingOne.details.style,
                    //     swimmingPool: listingOne.details.swimmingPool,
                    //     virtualTourUrl: listingOne.details.virtualTourUrl,
                    //     yearBuilt: listingOne.details.yearBuilt
                    // });
                    // await batchSecond.set(firestore.collection('listings-latest').doc(listingOne.mlsNumber).collection('lot').doc(), {
                    //     acres: listingOne.lot.acres,
                    //     depth: listingOne.lot.depth,
                    //     irregular: listingOne.lot.irregular,
                    //     legalDescription: listingOne.lot.legalDescription,
                    //     measurement: listingOne.lot.measurement,
                    //     width: listingOne.lot.width
                    // });
                    // await batchSecond.set(firestore.collection('listings-latest').doc(listingOne.mlsNumber).collection('map').doc(), {
                    //     latitude: listingOne.map.latitude,
                    //     longitude: listingOne.map.longitude
                    // });
                    // await batchSecond.set(firestore.collection('listings-latest').doc(listingOne.mlsNumber).collection('nearby').doc(), {
                    //     ammenities: listingOne.nearby.ammenities
                    // });
                    // await batchSecond.set(firestore.collection('listings-latest').doc(listingOne.mlsNumber).collection('office').doc(), {
                    //     brokerageName: listingOne.office.brokerageName
                    // });
                    // await batchSecond.set(firestore.collection('listings-latest').doc(listingOne.mlsNumber).collection('permissions').doc(), {
                    //     displayAddressOnInternet: listingOne.permissions.displayAddressOnInternet,
                    //     displayPublic: listingOne.permissions.displayPublic
                    // });
                    // await batchSecond.set(firestore.collection('listings-latest').doc(listingOne.mlsNumber).collection('taxes').doc(), {
                    //     annualAmount: listingOne.taxes.annualAmount,
                    //     assessmentYear: listingOne.taxes.assessmentYear
                    // });
                    // await batchSecond.set(firestore.collection('listings-latest').doc(listingOne.mlsNumber).collection('timestamps').doc(), {
                    //     idxUpdated: listingOne.timestamps.idxUpdated,
                    //     listingUpdated: listingOne.timestamps.listingUpdated,
                    //     photosUpdated: listingOne.timestamps.photosUpdated,
                    //     conditionalExpiryDate: listingOne.timestamps.conditionalExpiryDate,
                    //     terminatedDate: listingOne.timestamps.terminatedDate,
                    //     suspendedDate: listingOne.timestamps.suspendedDate,
                    //     listingEntryDate: listingOne.timestamps.listingEntryDate,
                    //     closedDate: listingOne.timestamps.closedDate,
                    //     unavailableDate: listingOne.timestamps.unavailableDate,
                    //     expiryDate: listingOne.timestamps.expiryDate,
                    //     extensionEntryDate: listingOne.timestamps.extensionEntryDate
                    // });
                    // await batchSecond.set(firestore.collection('listings-latest').doc(listingOne.mlsNumber).collection('images').doc(), {
                    //     images: listingOne.images,
                    // });
                    // await batchSecond.set(firestore.collection('listings-latest').doc(listingOne.mlsNumber).collection('agents').doc(), {
                    //     images: listingOne.agents,
                    // });
                    // await batchSecond.commit();
//                 } else {
//                     await batch.set(firestore.collection('listings-latest').doc(listingOne.mlsNumber), listingOne);
//                 }
//             })
//         });
//         await batch.commit();
//     });
// });
