import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Route, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { setLikes } from '../modules/redux/lists/actions';
import { setLoading } from '../modules/redux/auth/actions';
import { MapStore } from '../modules/stores';
import { getListingsMap, getListingsList, getLike, getListingDetail } from '../modules/services/ListingsService';
import { MapService } from '../modules/services';
import { isEmpty, isCurrency } from '../utils/functions';
import { PropertyItem, PropertyModal, PropertyImage, MarkerDetail, MarkerCircle, MarkerMain } from '../components';
import configs from '../constants/configs';
import axios from '../utils/axios';

class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            view: (window.filters.type === 'Sale' || window.filters.lastStatus === 'Sld') ? true : false,
            forSale: window.filters.type === 'Sale' ? true : false,
            sold: window.filters.lastStatus === 'Sld' ? true : false,
            forRent: window.filters.type === 'Lease' ? true : false,
            rented: window.filters.lastStatus === 'Lsd' ? true : false,
            filter: false,
            badge: window.badge,
            borderColor: '#549E6550',
            backgroundColor: '#549E65',

            sort: false,
            sortValue: 0,
            isLoading: false,
            loadingMore: false,
            refreshing: false,
            offset: 0,

            mapType: 'standard',
            drawing: false,
            polygon: false,
            coordinates: [],
            editing: null,
            saveSearches: false,
            region: {
                lat: window.region.lat,
                lng: window.region.lng,
                latitudeDelta: window.region.latitudeDelta,
                longitudeDelta: window.region.longitudeDelta
            },
            listings: [],
            listings2: [],
            listings3: [],
            details: [],
            detail: null,
            likes: [],

            visible: false,
            scrollwheel: true,
            imageVisible: false,
            images: [],
            imageIndex: 0,
        };
        this.cancelTokenSource = axios.CancelToken.source("Operation canceled due to new request.");
    }

    componentDidMount() {
        this.onRegionChangeComplete([configs.lat, configs.lng], window.zoom, [
            window.bounds.nw_latitude, window.bounds.nw_longitude,
            window.bounds.se_latitude, window.bounds.se_longitude,
            window.bounds.se_latitude, window.bounds.nw_longitude,
            window.bounds.nw_latitude, window.bounds.se_longitude
        ]);
    }

    onRegionChangeComplete(center, zoom, bounds) {
        if (!this.state.polygon) {
            window.region = {
                lat: center[0],
                lng: center[1],
                latitudeDelta: configs.latitudeDelta,
                longitudeDelta: configs.longitudeDelta
            };
            if (window.coordinates.length > 3) {
                this.setState({ drawing: true, coordinates: window.coordinates }, () => {
                    window.coordinates = [];
                });
            }
            window.zoom = zoom;
            window.bounds = {
                nw_latitude: bounds[0],
                nw_longitude: bounds[1],
                se_latitude: bounds[2],
                se_longitude: bounds[3]
            }
            // this.props.setLoading(true);
            this.setState({ region: window.region }, () => {
                this.cancelTokenSource.cancel();
                this.onStatus(window.filters);
                this.loadData(window.filters, true, 0);
            });
        }
    }

    async onStatus(filters) {
        filters.type = this.state.view ? this.state.forSale ? "Sale" : null : this.state.forRent ? "Lease" : null;
        filters.lastStatus = this.state.view ? this.state.sold ? "Sld" : null : this.state.rented ? "Lsd" : null;
        window.filters = filters;
        var listings = await getListingsMap(this.cancelTokenSource);
        listings = await MapStore.getMarkers(listings);
        var listings3 = this.state.coordinates.length < 3 ? [] : await MapStore.getRegionMarkers(1, this.state.coordinates, listings);
        var likes = await getLike(isEmpty(this.props.user) ? 0 : this.props.user.id);
        this.props.setLikes(likes);
        this.setState({
            listings, listings3, likes, loading: false,
            borderColor: (this.state.forSale && !this.state.sold) || (this.state.forSale && this.state.sold) ? '#549E6550' :
                (this.state.forRent && !this.state.rented) || (this.state.forRent && this.state.rented) ? '#4E9EE950' :
                    (!this.state.forSale && this.state.sold) ? '#E4575750' : (!this.state.forRent && this.state.rented) ? '#FF990050' : null,
            backgroundColor: (this.state.forSale && !this.state.sold) || (this.state.forSale && this.state.sold) ? '#549E65' :
                (this.state.forRent && !this.state.rented) || (this.state.forRent && this.state.rented) ? '#4E9EE9' :
                    (!this.state.forSale && this.state.sold) ? '#E45757' : (!this.state.forRent && this.state.rented) ? '#FF9900' : null,
        });
    }

    async loadData(filters, refresh, offset) {
        // this.props.setLoading(true);
        if (this.state.isLoading) return;

        if (refresh) {
            this.setState({ refreshing: true });
        } else {
            this.setState({ loadingMore: true });
        }

        try {
            this.setState({ isLoading: true });
            filters.type = this.state.view ? this.state.forSale ? "Sale" : null : this.state.forRent ? "Lease" : null;
            filters.lastStatus = this.state.view ? this.state.sold ? "Sld" : null : this.state.rented ? "Lsd" : null;
            var sort = this.state.sortValue === 0 ? 'Price' : this.state.forSale || this.state.forRent ? 'List' : 'Sold';
            window.filters = filters;
            var region = !this.state.drawing ? window.region : await MapStore.getRegion(this.state.coordinates);
            var listings = await getListingsList(this.cancelTokenSource, region, offset, sort);
            var likes = await getLike(isEmpty(this.props.user) ? 0 : this.props.user.id);
            this.props.setLikes(likes);
            if (!this.state.drawing) {
                this.setState({ listings2: refresh ? listings : [...this.state.listings2, ...listings], likes, loadingMore: false, offset: offset + 1, filter: false });
            } else {
                this.setState({ listings2: refresh ? await MapStore.getRegionMarkers(2, this.state.coordinates, listings) : [...this.state.listings2, ...await MapStore.getRegionMarkers(2, this.state.coordinates, listings)], likes, loadingMore: false, offset: offset + 1, filter: false });
            }
        } catch (error) {
            console.log(error.message);
        } finally {
            // this.props.setLoading(false);
            this.setState({ isLoading: false, loadingMore: false, refreshing: false, filter: false });
        }
    }

    onView() {
        this.setState({ view: !this.state.view }, () => {
            this.state.view && this.setState({ forSale: true, sold: false, forRent: false, rented: false }, () => {
                this.onStatus(window.filters);
                this.loadData(window.filters, true, 0);
            });
            !this.state.view && this.setState({ forSale: false, sold: false, forRent: true, rented: false }, () => {
                this.onStatus(window.filters);
                this.loadData(window.filters, true, 0);
            });
        });
    }


    onForSale() {
        if (this.state.forSale && !this.state.sold) {
            return;
        } else {
            this.setState({ forSale: !this.state.forSale }, () => {
                this.onStatus(window.filters);
                this.loadData(window.filters, true, 0);
            });
        }
    }
    onForRent() {
        if (this.state.forRent && !this.state.rented) {
            return;
        } else {
            this.setState({ forRent: !this.state.forRent }, () => {
                this.onStatus(window.filters);
                this.loadData(window.filters, true, 0);
            });
        }
    }
    onSold() {
        if (!this.state.forSale && this.state.sold) {
            return;
        } else {
            this.setState({ sold: !this.state.sold }, () => {
                this.onStatus(window.filters);
                this.loadData(window.filters, true, 0);
            });
        }
    }
    onRented() {
        if (!this.state.forRent && this.state.rented) {
            return;
        } else {
            this.setState({ rented: !this.state.rented }, () => {
                this.onStatus(window.filters);
                this.loadData(window.filters, true, 0);
            });
        }
    }

    async onSaveSearch() {
        if (this.props.logged) {
            if (isEmpty(this.state.coordinates)) {
                this.setState({ drawing: true, polygon: true, coordinates: [], listings3: [] }, () => {
                    alert('Select search area');
                });
            } else {
                if (this.state.coordinates.length < 3) {
                    this.setState({ drawing: true, polygon: true }, () => {
                        alert('Select 2+ points at least');
                    });
                } else {
                    var region = await MapStore.getRegion(this.state.coordinates);
                    window.region = region;
                    var address = await MapService.getGeoCode(window.region);
                    window.location = address.results[0].formatted_address;
                    window.description = 'Property Type: ';
                    window.description += window.filters.propertyType.detached ? 'Detached, ' : '';
                    window.description += window.filters.propertyType.semiDetached ? 'Semi-Detached, ' : '';
                    window.description += window.filters.propertyType.freeholdTown ? 'Row/Freehold Town, ' : '';
                    window.description += window.filters.propertyType.condoTown ? 'Condo Town, ' : '';
                    window.description += window.filters.propertyType.condoApartment ? 'Condo Apartment, ' : '';
                    window.description += window.filters.propertyType.duplex ? 'Duplex, ' : '';
                    window.description += window.filters.propertyType.multiFamily ? 'Multi Family, ' : '';
                    window.description += window.filters.propertyType.land ? 'Land, ' : '';
                    window.description += (!window.filters.propertyType.detached && !window.filters.propertyType.semiDetached && !window.filters.propertyType.freeholdTown && !window.filters.propertyType.condoTown && !window.filters.propertyType.condoApartment && !window.filters.propertyType.duplex && !window.filters.propertyType.multiFamily && !window.filters.propertyType.land) ? 'Any, ' : '';
                    window.description += parseFloat(window.filters.price.minPrice) > 0 ? 'MinPrice: ' + isCurrency(window.filters.price.minPrice).split('.')[0] + ', ' : '';
                    window.description += parseFloat(window.filters.price.maxPrice) < 5000000 ? 'MaxPrice: ' + isCurrency(window.filters.price.maxPrice).split('.')[0] + ', ' : '';
                    window.description += parseFloat(window.filters.rooms.bed) > 0 ? 'BedRooms: ' + window.filters.rooms.bed + '+, ' : '';
                    window.description += parseFloat(window.filters.rooms.bath) > 0 ? 'BathRooms: ' + window.filters.rooms.bath + '+, ' : '';
                    window.description += parseFloat(window.filters.rooms.garage) > 0 ? 'Garage: ' + window.filters.rooms.garage + '+, ' : '';
                    window.description += parseFloat(window.filters.rooms.parking) > 0 ? 'Parking: ' + window.filters.rooms.parking + '+, ' : '';
                    window.description += parseFloat(window.filters.size.minSize) > 0 ? 'MinSize: ' + window.filters.size.minSize + ', ' : '';
                    window.description += parseFloat(window.filters.size.maxSize) < 5000 ? 'MaxSize: ' + window.filters.size.maxSize + ', ' : '';
                    window.description += parseFloat(window.filters.condo.minCondo) > 0 ? 'MinCondo: ' + isCurrency(window.filters.condo.minCondo).split('.')[0] + ', ' : '';
                    window.description += parseFloat(window.filters.condo.maxCondo) < 5000 ? 'MaxCondo: ' + isCurrency(window.filters.condo.maxCondo).split('.')[0] + ', ' : '';
                    this.setState({ saveSearches: true, polygon: false });
                }
            }
        } else {
            // this.props.navigation.push("Auth");
        }
    }

    async onDetail(id) {
        this.props.setLoading(true);
        var listing = await getListingDetail(id);
        this.setState({ detail: listing }, () => {
            this.props.setLoading(false);
            this.setState({ visible: true });
        });
    }

    render() {
        return (
            <div className='hm-main-panel'>
                <div className='hm-left-panel'>
                    <div className='hm-status-wrapper'>
                        <div className='hm-view-wrapper'>
                            <button className={'hm-view-btn' + (this.state.view ? ' hm-active' : '')} onClick={() => this.onView()}>For Sale</button>
                            <button className={'hm-view-btn' + (!this.state.view ? ' hm-active' : '')} onClick={() => this.onView()}>For Rent</button>
                        </div>
                        <div className='hm-status-buttons'>
                            {this.state.view ?
                                <button className={this.state.forSale ? 'hm-forSale-btn' : 'hm-inactive-btn'} onClick={() => this.onForSale()}>FOR SALE</button>
                                :
                                <button className={this.state.forRent ? 'hm-forRent-btn' : 'hm-inactive-btn'} onClick={() => this.onForRent()}>FOR RENT</button>
                            }
                            {this.state.view ?
                                <button className={this.state.sold ? 'hm-sold-btn' : 'hm-inactive-btn'} onClick={() => this.onSold()}>SOLD</button>
                                :
                                <button className={this.state.rented ? 'hm-rented-btn' : 'hm-inactive-btn'} onClick={() => this.onRented()}>RENTED</button>
                            }
                            <button className='hm-inactive-btn'>
                                <i className='fas fa-angle-down f-s-16'></i>
                                <span>Filters</span>
                                <div className='hm-badge'>1</div>
                            </button>
                            <button className='hm-inactive-btn' onClick={() => this.onSaveSearch()}>
                                <span>Save Search</span>
                                <i className='fas fa-heart f-s-12'></i>
                            </button>
                            <button className='hm-inactive-btn'>
                                <i className='fas fa-heart f-s-12'></i>
                                <span>Drawing</span>
                            </button>
                        </div>
                    </div>
                    <div className='hm-map-view'>
                        <GoogleMapReact
                            bootstrapURLKeys={{
                                key: 'AIzaSyDoi0kDoetjxsvsctCrRb99I5lu1GJMj_8',
                                language: 'en',
                                region: 'US'
                            }}
                            options={{
                                scrollwheel: this.state.scrollwheel
                            }}
                            // defaultZoom={15}
                            zoom={17}
                            // center={this.state.region}
                            defaultCenter={this.state.region}
                            onBoundsChange={(center, zoom, bounds) => this.onRegionChangeComplete(center, zoom, bounds)}
                            onClick={() => this.setState({ details: [], scrollwheel: true })}
                        >
                            {!this.state.drawing ? (
                                this.state.listings.map((item, key) => (
                                    item[0].count > 1 ?
                                        <MarkerCircle
                                            key={key}
                                            lat={parseFloat(item[0].latitude)}
                                            lng={parseFloat(item[0].longitude)}
                                            item={item}
                                            borderColor={this.state.borderColor}
                                            backgroundColor={this.state.backgroundColor}
                                            onClick={() => this.setState({ visible: true })}
                                        />
                                        :
                                        <MarkerMain
                                            key={key}
                                            lat={parseFloat(item[0].latitude)}
                                            lng={parseFloat(item[0].longitude)}
                                            item={item}
                                            details={this.state.details}
                                            onClick={() => {
                                                window.details = item;
                                                this.setState({ details: item, scrollwheel: false });
                                            }}
                                        />
                                ))
                            ) :
                                this.state.listings3.map((item, key) => (
                                    item[0].count > 1 ?
                                        <MarkerCircle
                                            key={key}
                                            lat={parseFloat(item[0].latitude)}
                                            lng={parseFloat(item[0].longitude)}
                                            item={item}
                                            borderColor={this.state.borderColor}
                                            backgroundColor={this.state.backgroundColor}
                                            onClick={() => this.setState({ visible: true })}
                                        />
                                        :
                                        <MarkerMain
                                            key={key}
                                            lat={parseFloat(item[0].latitude)}
                                            lng={parseFloat(item[0].longitude)}
                                            item={item}
                                            details={this.state.details}
                                            onClick={() => {
                                                window.details = item;
                                                this.setState({ details: item, scrollwheel: false });
                                            }}
                                        />
                                ))}
                            {
                                !isEmpty(this.state.details) && (
                                    <MarkerDetail
                                        key='overMarker'
                                        lat={parseFloat(this.state.details[0].latitude)}
                                        lng={parseFloat(this.state.details[0].longitude)}
                                        details={this.state.details}
                                        likes={this.state.likes}
                                        onClick={(item) => this.onDetail(item.id)}
                                    />
                                )
                            }
                        </GoogleMapReact>

                    </div>
                </div>
                <div className='hm-right-panel'>
                    <div className='hm-estate-list'>
                        {!isEmpty(this.state.listings2) && this.state.listings2.map((listing, key) => (
                            <PropertyItem
                                key={key}
                                listing={listing}
                                likes={this.state.likes}
                                onClick={(item) => this.onDetail(item.id)}
                            />
                        ))}
                    </div>
                </div>
                <PropertyModal
                    visible={this.state.visible}
                    listing={this.state.detail}
                    onClose={() => this.setState({ visible: false })}
                    onDetail={(id)=>this.props.history.push(`/detail/${id}`)}
                    onImage={(images, index) => {
                        this.setState({ images, imageIndex: index }, () => {
                            this.setState({ imageVisible: true });
                        })
                    }}
                />
                <PropertyImage
                    visible={this.state.imageVisible}
                    images={this.state.images}
                    index={this.state.imageIndex}
                    onClose={() => this.setState({ imageVisible: false })}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        logged: state.auth.logged,
        user: state.auth.user_info,
        likes: state.lists.likes
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setLoading: (data) => {
            dispatch(setLoading(data));
        },
        setLikes: (data) => {
            dispatch(setLikes(data));
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));