import React, { Fragment } from 'react';
import GoogleMapReact from 'google-map-react';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { setLikes } from '../modules/redux/lists/actions';
import { setLoading, setVisible } from '../modules/redux/auth/actions';
import {
    PropertyItem,
    PropertyModal,
    PropertyImage,
    PropertyFilter,
    PropertySave,
    MarkerDetail,
    MarkerCircle,
    MarkerMain,
} from '../components';
import {
    getListingsMap,
    getListingsList,
    getListingDetail,
    getLike,
    setLike,
    setSearches
} from '../modules/services/ListingsService';
import { MapStore } from '../modules/stores';
import { isEmpty, isCurrency } from '../utils/functions';
import configs from '../constants/configs';

class MobileHome extends React.Component {

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
            google: null,
            drawingManager: null,
            polygonShape: null
        };
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
            this.setState({ region: window.region }, () => {
                this.onStatus(window.filters);
                this.loadData(window.filters, true, 0);
            });
        }
    }

    async onAppleFilters(filters, close) {
        window.badge = await MapStore.getBadge(filters);
        this.setState({ badge: window.badge, loading: true }, () => {
            this.onStatus(filters);
            this.loadData(filters, true, 0)
        });
        this.setState({ filter: !close ? true : false });
    }

    async onStatus(filters) {
        filters.type = this.state.view ? this.state.forSale ? "Sale" : null : this.state.forRent ? "Lease" : null;
        filters.lastStatus = this.state.view ? this.state.sold ? "Sld" : null : this.state.rented ? "Lsd" : null;
        window.filters = filters;
        var listings = await getListingsMap();
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
            var listings = await getListingsList(region, offset, sort);
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
            this.props.setLoading(false);
            this.setState({ isLoading: false, loadingMore: false, refreshing: false, filter: false });
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

    async onLike(id) {
        if (!this.props.logged) {
            this.props.setVisible(true);
        } else {
            await setLike(this.props.user.id, id).then((response) => {
                this.setState({ likes: response });
                this.props.setLikes(response);
            })
        }
    }

    async onShare(listing) {
        // var list = await getListingDetail(listing.id);
        if (!this.props.logged) {
            this.props.setVisible(true);
        } else {
            //   Share.share({
            //     title: `Brokier - ${listing.streetNumber}`,
            //     url: 'https://brokier.com/' + listing.mlsNumber
            //   })
        }
    };

    handleGoogleMapApi(google) {
        const map = google.map;
        if (this.state.google === null) this.setState({ google });
        if (this.state.drawing) {
            const drawingManager = new google.maps.drawing.DrawingManager({
                drawingMode: google.maps.drawing.OverlayType.POLYGON,
                drawingControl: true,
                drawingControlOptions: {
                    drawingModes: [
                        google.maps.drawing.OverlayType.POLYGON,
                    ]
                },
                markerOptions: { icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png' },
                polygonOptions: {
                    fillColor: 'rgba(0, 0, 200, 0.2)',
                    fillOpacity: 1,
                    strokeWeight: 5,
                    strokeColor: '#140c98',
                    clickable: false,
                    editable: false,
                    zIndex: 1
                }
            });
            this.setState({ drawingManager }, () => {
                drawingManager.setMap(map);

                const _this = this;
                google.maps.event.addListener(this.state.drawingManager, 'polygoncomplete', function (polygon) {
                    var coordinates = [];
                    polygon.getPath().Mb.map(coordinate => {
                        coordinates = [...coordinates, { lat: coordinate.lat(), lng: coordinate.lng() }];
                    })
                    if (_this.state.polygonShape !== null) _this.state.polygonShape.setMap(null);
                    _this.setState({ polygonShape: polygon, coordinates, polygon: false });
                });
            });
        } else {
            if (this.state.drawingManager !== null) this.state.drawingManager.setMap(null);
            if (this.state.polygonShape !== null) this.state.polygonShape.setMap(null);
            this.setState({ drawingManager: null, polygonShape: null, coordinates: [] });
        }
    }

    _onChildClick = (key, childProps) => {
        const center = this.state.region;
        this.setState({
            region: {
                lat: childProps.lat,
                lng: childProps.lng,
                latitudeDelta: center.latitudeDelta,
                longitudeDelta: center.longitudeDelta
            }
        });
    }

    onApply() {
        if (this.state.coordinates.length > 2) {
            this.setState({ polygon: false, coordinates: [...this.state.coordinates, this.state.coordinates[0]] }, () => {
                if (this.state.drawingManager !== null) this.state.drawingManager.setMap(null);
                this.setState({ drawingManager: null });
                this.onStatus(window.filters);
                this.loadData(window.filters, true, 0);
            });
        }
    }

    async onSaveSearch() {
        if (this.props.logged) {
            if (isEmpty(this.state.coordinates)) {
                this.setState({ drawing: true, scrollwheel: false, polygon: true, coordinates: [], listings3: [] }, () => {
                    alert('Select search area');
                    if (this.state.drawingManager !== null) this.state.drawingManager.setMap(null);
                    if (this.state.polygonShape !== null) this.state.polygonShape.setMap(null);
                    this.handleGoogleMapApi(this.state.google);
                })
            } else {
                if (this.state.coordinates.length < 3) {
                    this.setState({ drawing: true, polygon: true, scrollwheel: false }, () => {
                        alert('Select 2+ points at least');
                        if (this.state.drawingManager !== null) this.state.drawingManager.setMap(null);
                        if (this.state.polygonShape !== null) this.state.polygonShape.setMap(null);
                        this.handleGoogleMapApi(this.state.google);
                    });
                } else {
                    var region = await MapStore.getRegion(this.state.coordinates);
                    window.region = region;
                    // var address = await getGeoCode(window.region);
                    // window.locations = address.results[0].formatted_address;
                    window.locations = 'address';
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
                    if (this.state.drawingManager !== null) this.state.drawingManager.setMap(null);
                }
            }
        } else {
            this.props.setVisible(true);
        }
    }

    async onSave(name) {
        var coordinates = [];
        this.state.coordinates.map((coor, key) => {
            coordinates.push({
                latitude: coor.lat,
                longitude: coor.lng,
                latitudeDelta: configs.latitudeDelta,
                longitudeDelta: configs.longitudeDelta
            })
        })
        await setSearches(name, coordinates, this.props.user.id);
        this.setState({ loading: true, saveSearches: false, drawing: false, polygon: false, coordinates: [], listings3: [] }, () => {
            this.handleGoogleMapApi(this.state.google);
        });
    }

    render() {
        return (
            <div className='home-wrapper'>
                <div className='home-left-panel'>
                    {this.props.tabs && (
                        <div className='home-status-bar'>
                            <div className='home-view-buttons'>
                                <button className={'home-view-button' + (this.state.view ? ' home-active-button' : '')} onClick={() => this.onView()}>For Sale</button>
                                <button className={'home-view-button' + (!this.state.view ? ' home-active-button' : '')} onClick={() => this.onView()}>For Rent</button>
                            </div>
                            <div className='home-status-buttons'>
                                {this.state.view ?
                                    <button className={this.state.forSale ? 'home-forSale-button' : 'home-inactive-button'} onClick={() => this.onForSale()}>FOR SALE</button>
                                    :
                                    <button className={this.state.forRent ? 'home-forRent-button' : 'home-inactive-button'} onClick={() => this.onForRent()}>FOR RENT</button>
                                }
                                {this.state.view ?
                                    <button className={this.state.sold ? 'home-sold-button' : 'home-inactive-button'} onClick={() => this.onSold()}>SOLD</button>
                                    :
                                    <button className={this.state.rented ? 'home-rented-button' : 'home-inactive-button'} onClick={() => this.onRented()}>RENTED</button>
                                }
                                <button className='home-inactive-button' onClick={() => this.setState({ filter: true })}>
                                    <i className='fas fa-angle-down f-s-12' style={{ paddingRight: 5 }}></i>
                                    <span>Filters</span>
                                    {this.state.badge > 0 ? <div className='home-badge'>{window.badge}</div> : <div style={{ width: 10 }} />}
                                </button>
                                <button className='home-inactive-button' onClick={() => this.onSaveSearch()}>
                                    <span>Save Search</span>
                                    <i className='far fa-heart f-s-12' style={{ paddingLeft: 5 }}></i>
                                </button>
                                {!this.state.drawing ? (
                                    <button className='home-inactive-button' onClick={() => {
                                        this.setState({ drawing: true, scrollwheel: false, polygon: true, coordinates: [], listings3: [] }, () => {
                                            this.handleGoogleMapApi(this.state.google);
                                        })
                                    }}>
                                        <i className='far fa-object-ungroup f-s-12' style={{ paddingRight: 5 }}></i>
                                        <span>Drawing</span>
                                    </button>
                                ) : (
                                        <Fragment>
                                            <button className='home-apply-button' onClick={() => this.onApply()}>
                                                <i className='fas fa-check f-s-12' style={{ color: '#45AB62' }}></i>
                                                <span className='home-apply-text'>Apply</span>
                                            </button>
                                            <button className='home-cancel-button' onClick={() => {
                                                this.setState({ drawing: false, scrollwheel: true, polygon: false, coordinates: [], listings3: [] }, () => {
                                                    this.handleGoogleMapApi(this.state.google);
                                                });
                                            }}>
                                                <i className='fas fa-times f-s-12' style={{ color: '#EA4A4A' }}></i>
                                                <span className='home-cancel-text'>Cancel</span>
                                            </button>
                                        </Fragment>
                                    )}
                            </div>
                        </div>
                    )}
                    <div className='home-left-panel-map'>
                        <GoogleMapReact
                            bootstrapURLKeys={{
                                key: 'AIzaSyDoi0kDoetjxsvsctCrRb99I5lu1GJMj_8',
                                language: 'en',
                                region: 'US',
                                libraries: 'drawing'
                            }}
                            options={{
                                scrollwheel: this.state.scrollwheel,
                                panControl: false,
                                fullscreenControl: false,
                                zoomControl: false
                            }}
                            defaultZoom={window.zoom}
                            center={[this.state.region.lat, this.state.region.lng]}
                            onBoundsChange={(center, zoom, bounds) => this.onRegionChangeComplete(center, zoom, bounds)}
                            onClick={() => this.setState({ details: [], scrollwheel: true })}
                            onChildClick={this._onChildClick}
                            yesIWantToUseGoogleMapApiInternals //this is important!
                            onGoogleApiLoaded={this.handleGoogleMapApi.bind(this)}
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
                                        onLogin={() => this.props.setVisible(true)}
                                    />
                                )
                            }
                        </GoogleMapReact>

                    </div>
                </div>
                <div className='home-right-panel'>
                    <div className='home-right-panel-list'>
                        {!isEmpty(this.state.listings2) && this.state.listings2.map((listing, key) => (
                            <PropertyItem
                                key={key}
                                listing={listing}
                                likes={this.state.likes}
                                onLike={(id) => this.onLike(id)}
                                onClick={(item) => this.onDetail(item.id)}
                                onLogin={() => this.props.setVisible(true)}
                            />
                        ))}
                        {!isEmpty(this.state.listings2) && (<div className='home-load-more'>
                            <button className='home-load-more-button' onClick={() => {
                                this.setState({ offset: this.state.offset + 1 }, () => {
                                    this.props.setLoading(true);
                                    this.loadData(window.filters, false, this.state.offset);
                                })
                            }}><span>Load more</span></button>
                        </div>)}
                    </div>
                </div>
                <PropertyModal
                    visible={this.state.visible}
                    listing={this.state.detail}
                    onClose={() => this.setState({ visible: false })}
                    onDetail={(id, streetNumber, streetName, streetSuffix) => {
                        const win = window.open(`/detail/${streetNumber}-${streetName.replace(' ', '-')}-${streetSuffix}/${id}`, '_blank');
                        win.focus();
                    }}
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
                {this.state.filter && (
                    <PropertyFilter
                        view={this.state.view}
                        onView={() => this.onView()}
                        onAppleFilters={(filters, close) => this.onAppleFilters(filters, close)}
                        onClearFilters={(filters, close) => this.onAppleFilters(filters, close)}
                        onClose={() => this.setState({ filter: false })}
                    />
                )}
                {this.state.saveSearches && (
                    <PropertySave
                        onSave={(name) => this.onSave(name)}
                        onClose={() => this.setState({ saveSearches: false })}
                    />
                )}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        logged: state.auth.logged,
        user: state.auth.user_info,
        likes: state.lists.likes,
        tabs: state.lists.tabs
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setLoading: (data) => {
            dispatch(setLoading(data));
        },
        setLikes: (data) => {
            dispatch(setLikes(data));
        },
        setVisible: (data) => {
            dispatch(setVisible(data));
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MobileHome));