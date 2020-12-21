import React, { Component } from "react";
import { Platform, StatusBar, StyleSheet, View, TouchableOpacity, Text, Share } from "react-native";
import MapView, { Marker, Polygon, Polyline, PROVIDER_GOOGLE, PROVIDER_DEFAULT } from "react-native-maps";
import Grid from 'react-native-infinite-scroll-grid';
import SwitchSelector from "react-native-switch-selector";
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";
import { setTab } from "@modules/redux/auth/actions";
import { setLikes } from "@modules/redux/lists/actions";
import { Loading, Loading2, Header, PropertyFilter, PropertySort, PropertyMarker, PropertyItem, PropertySave } from "@components";
import { MapStore } from '@modules/stores';
import { ListingsService, MapService } from "@modules/services";
import { isEmpty, isNumber, isCurrency } from "@utils/functions";
import { colors } from "@constants/themes";

class PropertiesHome extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      loading2: false,
      tab: true,

      view: (global.filters.type == 'Sale' || global.filters.lastStatus == 'Sld') ? true : false,
      forSale: global.filters.type == 'Sale' ? true : false,
      sold: global.filters.lastStatus == 'Sld' ? true : false,
      forRent: global.filters.type == 'Lease' ? true : false,
      rented: global.filters.lastStatus == 'Lsd' ? true : false,
      filter: false,
      badge: global.badge,
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
        latitude: global.region.latitude,
        longitude: global.region.longitude,
        latitudeDelta: global.region.latitudeDelta,
        longitudeDelta: global.region.longitudeDelta
      },
      listings: [],
      listings2: [],
      listings3: [],
      details: [],
      likes: []
    };
    this.props.setTab(true);
  }

  onTab() {
    if (this.state.tab) {
      this.props.setTab(true);
      global.marker = false;
      this.setState({ details: [], tab: false }, () => {
        this.loadData(global.filters, true, 0);
      })
    } else {
      this.setState({ tab: true }, () => {
        this.onRegionChangeComplete(global.region);
      })
    }
  }

  onRegionChangeComplete(region) {
    if (!this.state.polygon) {
      global.region = region;
      if (global.coordinates.length > 3) {
        this.setState({ drawing: true, coordinates: global.coordinates }, () => {
          global.coordinates = [];
        });
      }
      global.zoom = Math.round(Math.log(360 / global.region.longitudeDelta) / Math.LN2);
      this.setState({ region, loading: true }, () => this.onStatus(global.filters));
    }
  }

  async onAppleFilters(filters, close) {
    global.badge = await MapStore.getBadge(filters);
    this.setState({ badge: global.badge, loading: true }, () => {
      this.state.tab ? this.onStatus(filters) : this.loadData(filters, true, 0);
    });
    this.setState({ filter: !close ? true : false });
  }

  async onStatus(filters) {
    filters.type = this.state.view ? this.state.forSale ? "Sale" : null : this.state.forRent ? "Lease" : null;
    filters.lastStatus = this.state.view ? this.state.sold ? "Sld" : null : this.state.rented ? "Lsd" : null;
    global.filters = filters;
    var listings = await ListingsService.getListingsMap();
    listings = await MapStore.getMarkers(listings);
    var listings3 = this.state.coordinates.length < 3 ? [] : await MapStore.getRegionMarkers(1, this.state.coordinates, listings);
    var likes = await ListingsService.getLike(isEmpty(this.props.user) ? 0 : this.props.user.id);
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
      var sort = this.state.sortValue == 0 ? 'Price' : this.state.forSale || this.state.forRent ? 'List' : 'Sold';
      global.filters = filters;
      var region = !this.state.drawing ? global.region : await MapStore.getRegion(this.state.coordinates);
      var listings = await ListingsService.getListingsList(region, offset, sort);
      var likes = await ListingsService.getLike(isEmpty(this.props.user) ? 0 : this.props.user.id);
      this.props.setLikes(likes);
      if (!this.state.drawing) {
        this.setState({ listings2: refresh ? listings : [...this.state.listings2, ...listings], likes, loadingMore: false, offset: offset + 1, filter: false, loading: false });
      } else {
        this.setState({ listings2: refresh ? await MapStore.getRegionMarkers(2, this.state.coordinates, listings) : [...this.state.listings2, ...await MapStore.getRegionMarkers(2, this.state.coordinates, listings)], likes, loadingMore: false, offset: offset + 1, filter: false, loading: false });
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      this.setState({ isLoading: false, loadingMore: false, refreshing: false, filter: false, loading: false, loading2: false });
    }
  }

  async onDetail(id) {
    var listing = await ListingsService.getListingDetail(id);
    this.props.navigation.navigate('PropertiesDetail', { listing });
  }

  onView() {
    this.setState({ view: !this.state.view }, () => {
      this.state.view && this.setState({ loading: true, forSale: true, sold: false, forRent: false, rented: false }, () => {
        this.state.tab ? this.onStatus(global.filters) : this.loadData(global.filters, true, 0);
      });
      !this.state.view && this.setState({ loading: true, forSale: false, sold: false, forRent: true, rented: false }, () => {
        this.state.tab ? this.onStatus(global.filters) : this.loadData(global.filters, true, 0);
      });
    });
  }

  onForSale() {
    if (this.state.forSale && !this.state.sold) {
      return;
    } else {
      this.setState({ loading: true, forSale: !this.state.forSale }, () => {
        this.onStatus(global.filters);
      });
    }
  }
  onForRent() {
    if (this.state.forRent && !this.state.rented) {
      return;
    } else {
      this.setState({ loading: true, forRent: !this.state.forRent }, () => {
        this.onStatus(global.filters);
      });
    }
  }
  onSold() {
    if (!this.state.forSale && this.state.sold) {
      return;
    } else {
      this.setState({ loading: true, sold: !this.state.sold }, () => {
        this.onStatus(global.filters);
      });
    }
  }
  onRented() {
    if (!this.state.forRent && this.state.rented) {
      return;
    } else {
      this.setState({ loading: true, rented: !this.state.rented }, () => {
        this.onStatus(global.filters);
      });
    }
  }

  onSort(sortValue) {
    this.setState({ sortValue, sort: false }, () => {
      this.loadData(filters, true, 0);
    });
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
          global.region = region;
          var address = await MapService.getGeoCode(global.region);
          global.location = address.results[0].formatted_address;
          global.description = 'Property Type: ';
          global.description += global.filters.propertyType.detached ? 'Detached, ' : '';
          global.description += global.filters.propertyType.semiDetached ? 'Semi-Detached, ' : '';
          global.description += global.filters.propertyType.freeholdTown ? 'Row/Freehold Town, ' : '';
          global.description += global.filters.propertyType.condoTown ? 'Condo Town, ' : '';
          global.description += global.filters.propertyType.condoApartment ? 'Condo Apartment, ' : '';
          global.description += global.filters.propertyType.duplex ? 'Duplex, ' : '';
          global.description += global.filters.propertyType.multiFamily ? 'Multi Family, ' : '';
          global.description += global.filters.propertyType.land ? 'Land, ' : '';
          global.description += (!global.filters.propertyType.detached && !global.filters.propertyType.semiDetached && !global.filters.propertyType.freeholdTown && !global.filters.propertyType.condoTown && !global.filters.propertyType.condoApartment && !global.filters.propertyType.duplex && !global.filters.propertyType.multiFamily && !global.filters.propertyType.land) ? 'Any, ' : '';
          global.description += parseFloat(global.filters.price.minPrice) > 0 ? 'MinPrice: ' + isCurrency(global.filters.price.minPrice).split('.')[0] + ', ' : '';
          global.description += parseFloat(global.filters.price.maxPrice) < 5000000 ? 'MaxPrice: ' + isCurrency(global.filters.price.maxPrice).split('.')[0] + ', ' : '';
          global.description += parseFloat(global.filters.rooms.bed) > 0 ? 'BedRooms: ' + global.filters.rooms.bed + '+, ' : '';
          global.description += parseFloat(global.filters.rooms.bath) > 0 ? 'BathRooms: ' + global.filters.rooms.bath + '+, ' : '';
          global.description += parseFloat(global.filters.rooms.garage) > 0 ? 'Garage: ' + global.filters.rooms.garage + '+, ' : '';
          global.description += parseFloat(global.filters.rooms.parking) > 0 ? 'Parking: ' + global.filters.rooms.parking + '+, ' : '';
          global.description += parseFloat(global.filters.size.minSize) > 0 ? 'MinSize: ' + global.filters.size.minSize + ', ' : '';
          global.description += parseFloat(global.filters.size.maxSize) < 5000 ? 'MaxSize: ' + global.filters.size.maxSize + ', ' : '';
          global.description += parseFloat(global.filters.condo.minCondo) > 0 ? 'MinCondo: ' + isCurrency(global.filters.condo.minCondo).split('.')[0] + ', ' : '';
          global.description += parseFloat(global.filters.condo.maxCondo) < 5000 ? 'MaxCondo: ' + isCurrency(global.filters.condo.maxCondo).split('.')[0] + ', ' : '';
          this.setState({ saveSearches: true, polygon: false });
        }
      }
    } else {
      this.props.navigation.push("Auth");
    }
  }

  onApply() {
    if (this.state.coordinates.length > 2) {
      this.setState({ polygon: false, coordinates: [...this.state.coordinates, this.state.coordinates[0]] }, () => {
        this.onStatus(global.filters)
      });
    }
  }

  async onSave(name) {
    this.mapRef.animateToRegion(global.region, 100);
    await ListingsService.setSearches(name, this.state.coordinates, this.props.user.id);
    this.setState({ loading: true, saveSearches: false, drawing: false, polygon: false, coordinates: [], listings3: [] });
  }


  onMap(e) {
    // if (this.state.drawing && this.state.polygon) {
    //   this.setState({ coordinates: [...this.state.coordinates, e.nativeEvent.coordinate] });
    // } else {
    setTimeout(() => {
      if (!global.marker) {
        this.props.setTab(true);
        this.setState({ details: [] });
      }
      global.marker = false;
    }, 100)
    // }
  }

  async onMarker(e) {
    // if (this.state.drawing && this.state.polygon) {
    //   if (this.state.coordinates.length > 1 && e.nativeEvent.coordinate.latitude == this.state.coordinates[0].latitude && e.nativeEvent.coordinate.longitude == this.state.coordinates[0].longitude) {
    //     this.setState({ polygon: false });
    //   }
    // } else {
    if (global.details[0].count <= 1) {
      global.marker = true;
      this.props.setTab(false);
      this.setState({ details: global.details });
    } else {
      global.region = {
        latitude: global.details[0].latitude,
        latitudeDelta: global.region.latitudeDelta / 3,
        longitude: global.details[0].longitude,
        longitudeDelta: global.region.longitudeDelta / 3
      }
      this.mapRef.animateToRegion(global.region, 100);
    }
    // }
  }

  onPanDrag(e) {
    if (this.state.drawing && this.state.polygon) {
      this.setState({ coordinates: [...this.state.coordinates, e.nativeEvent.coordinate] });
    }
  }

  async onCurrentPosition() {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      alert('Permission to access location was denied');
    }
    let location = await Location.getCurrentPositionAsync({});
    if (location) {
      global.region = {
        latitude: location.coords.latitude,
        latitudeDelta: global.region.latitudeDelta,
        longitude: location.coords.longitude,
        longitudeDelta: global.region.longitudeDelta
      }
      this.mapRef.animateToRegion(global.region, 100);
    }
  }

  async onLike(id) {
    if (!this.props.logged) {
      this.props.navigation.push("Auth");
    } else {
      await ListingsService.setLike(this.props.user.id, id).then((response) => {
        this.setState({ likes: response });
        this.props.setLikes(response);
      })
    }
  }

  async onShare(listing) {
    var listing = await ListingsService.getListingDetail(listing.id);
    console.log(listing);
    if (!this.props.logged) {
      this.props.navigation.push("Auth");
    } else {
      Share.share({
        title: `Brokier - ${listing.streetNumber}`,
        url: 'https://brokier.com/' + listing.mlsNumber
      })
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Header style={{ paddingLeft: 10, paddingRight: 10 }}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.searchBar} onPress={() => this.props.navigation.navigate('PropertiesSearch')}>
              <View style={styles.searchIcon}><Icon name="search" type="material" size={25} /></View>
              <View style={{ marginLeft: 5 }}><Text>{"Search MLS number, Address, City"}</Text></View>
            </TouchableOpacity>
            <View style={styles.listButton}>
              <TouchableOpacity onPress={async () => this.onTab()}>
                <Text>{this.state.tab ? 'List' : 'Map'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Header>

        <View style={styles.container}>
          {this.state.tab ?
            <View style={[styles.statusBar, { justifyContent: "space-between" }]}>
              {this.state.view ?
                <TouchableOpacity style={this.state.forSale ? styles.greenButton : styles.whiteButton} onPress={() => this.onForSale()}>
                  <Text style={this.state.forSale ? { fontSize: 12, fontWeight: "500", color: colors.WHITE, fontWeight: 'bold' } : { fontSize: 12, color: colors.BLACK }}>FOR SALE</Text>
                </TouchableOpacity> :
                <TouchableOpacity style={this.state.forRent ? styles.blueButton : styles.whiteButton} onPress={() => this.onForRent()}>
                  <Text style={this.state.forRent ? { fontSize: 12, fontWeight: "500", color: colors.WHITE, fontWeight: 'bold' } : { fontSize: 12, color: colors.BLACK }}>FOR RENT</Text>
                </TouchableOpacity>}
              {this.state.view ?
                <TouchableOpacity style={this.state.sold ? styles.redButton : styles.white2Button} onPress={() => this.onSold()}>
                  <Text style={this.state.sold ? { fontSize: 12, fontWeight: "500", color: colors.WHITE, fontWeight: 'bold' } : { fontSize: 12, color: colors.BLACK }}>SOLD</Text>
                </TouchableOpacity> :
                <TouchableOpacity style={this.state.rented ? styles.orangeButton : styles.white2Button} onPress={() => this.onRented()}>
                  <Text style={this.state.rented ? { fontSize: 12, fontWeight: "500", color: colors.WHITE, fontWeight: 'bold' } : { fontSize: 12, color: colors.BLACK }}>RENTED</Text>
                </TouchableOpacity>}
              <TouchableOpacity style={styles.filters} onPress={() => this.setState({ filter: true })}>
                <Icon name="keyboard-arrow-down" type="material" size={20} />
                <Text style={{ fontSize: 12, color: colors.BLACK }}>Filters</Text>
                {this.state.badge > 0 ? <View style={styles.badge}><Text style={styles.badgeText}>{this.state.badge}</Text></View> : <View style={{ width: 10 }} />}
              </TouchableOpacity>
              <TouchableOpacity style={styles.save} onPress={() => this.onSaveSearch()}>
                <Text style={{ fontSize: 12, color: colors.BLACK }}>Save Search</Text>
                <Icon name="heart" type="material-community" size={15} />
              </TouchableOpacity>
            </View> :
            <View style={[styles.statusBar, { justifyContent: "space-around" }]}>
              <TouchableOpacity style={styles.sort} onPress={() => this.setState({ sort: true })}>
                <Icon name="keyboard-arrow-down" type="material" size={20} />
                <Text style={{ fontSize: 12, color: colors.BLACK }}>Sort</Text>
                <Icon name="sort" type="material-community" size={15} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.filters} onPress={() => this.setState({ filter: true })}>
                <Icon name="keyboard-arrow-down" type="material" size={20} />
                <Text style={{ fontSize: 12, color: colors.BLACK }}>Filters</Text>
                {this.state.badge > 0 ? <View style={styles.badge}><Text style={styles.badgeText}>{this.state.badge}</Text></View> : <View style={{ width: 10 }} />}
              </TouchableOpacity>
              <TouchableOpacity style={styles.save} onPress={() => this.onSaveSearch()}>
                <Text style={{ fontSize: 12, color: colors.BLACK }}>Save Search</Text>
                <Icon name="heart" type="material-community" size={15} />
              </TouchableOpacity>
            </View>
          }
          {this.state.tab ?
            <MapView
              ref={map => this.mapRef = map}
              provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
              mapType={this.state.mapType}
              showsUserLocation={true}
              minZoomLevel={5}
              initialRegion={this.state.region}
              style={{ width: wp("100%"), height: hp("100%") - 120 }}
              onPress={(e) => this.onMap(e)}
              onMarkerPress={(e) => this.onMarker(e)}
              onRegionChangeComplete={this.onRegionChangeComplete.bind(this)}

              showsPointsOfInterest={this.state.drawing}
              showsBuildings={this.state.drawing}
              showsMyLocationButton={!this.state.drawing}
              loadingEnabled={this.state.drawing}
              moveOnMarkerPress={!this.state.drawing}
              scrollEnabled={!this.state.drawing}
              clusterColor={"#140c98"}
              spiderLineColor={"#140c98"}
              onPanDrag={(e) => this.onPanDrag(e)}
              // onMarkerDragEnd={() => alert("OK")}
            >
              {/* {(this.state.drawing && !isEmpty(this.state.coordinates)) ? (
                this.state.coordinates.map((marker, key) => (
                  <Marker key={key} coordinate={{ latitude: parseFloat(marker.latitude), longitude: parseFloat(marker.longitude) }}>
                    <View style={styles.polygonMarker} />
                  </Marker>
                ))
              ) : null} */}
              {(this.state.drawing && !isEmpty(this.state.coordinates)) ? (
                <React.Fragment>
                  <Polyline coordinates={this.state.coordinates} strokeColor={colors.BLUE.PRIMARY} strokeWidth={5} fillColor="rgba(0,0,255,0.3)" />
                  {!this.state.polygon && (<Polygon coordinates={this.state.coordinates} strokeColor={colors.BLUE.PRIMARY} strokeWidth={0.1} fillColor="rgba(0,0,255,0.3)" />)}
                </React.Fragment>
              ) : null}
              {!this.state.drawing ? (
                this.state.listings.map((item, key) => (
                  item[0].count > 1 ?
                    <Marker key={key} coordinate={{ latitude: parseFloat(item[0].latitude), longitude: parseFloat(item[0].longitude) }} onPress={() => { global.details = item }}>
                      <View style={[styles.clusterMarker, { backgroundColor: this.state.borderColor }, {
                        width: item[0].count > 10000 ? 56 : item[0].count > 1000 ? 50 : item[0].count > 100 ? 44 : 40,
                        height: item[0].count > 10000 ? 56 : item[0].count > 1000 ? 50 : item[0].count > 100 ? 44 : 40,
                        borderRadius: item[0].count > 10000 ? 28 : item[0].count > 1000 ? 25 : item[0].count > 100 ? 22 : 20,
                      }]}>
                        <View style={[styles.clusterMarker, { backgroundColor: this.state.backgroundColor }, {
                          width: item[0].count > 10000 ? 48 : item[0].count > 1000 ? 42 : item[0].count > 100 ? 38 : 34,
                          height: item[0].count > 10000 ? 48 : item[0].count > 1000 ? 42 : item[0].count > 100 ? 38 : 34,
                          borderRadius: item[0].count > 10000 ? 24 : item[0].count > 1000 ? 21 : item[0].count > 100 ? 19 : 17,
                        }]}>
                          <Text style={{ fontSize: 11, fontWeight: 'bold', color: colors.WHITE }}>{item[0].count}</Text>
                        </View>
                      </View>
                    </Marker> :
                    <Marker key={key} coordinate={{ latitude: parseFloat(item[0].latitude), longitude: parseFloat(item[0].longitude) }} onPress={() => { global.details = item }}>
                      <View style={{ alignItems: 'center', marginBottom: 20 }}>
                        <View style={[styles.customMarker, {
                          backgroundColor: !isEmpty(this.state.details) && (item[0].id === global.details[0].id) ? '#7864A3' : (item[0].status == 'A' && item[0].type == 'Sale') ? '#549E65' : (item[0].status == 'U' && item[0].lastStatus == 'Sld') ? '#E45757' : (item[0].status == 'A' && item[0].type == 'Lease') ? '#4E9EE9' : (item[0].status = 'U' && item[0].lastStatus == 'Lsd') ? '#FF9900' : null,
                          borderColor: !isEmpty(this.state.details) && (item[0].id === global.details[0].id) ? '#615282' : (item[0].status == 'A' && item[0].type == 'Sale') ? '#4d8a5b' : (item[0].status == 'U' && item[0].lastStatus == 'Sld') ? '#cc5252' : (item[0].status == 'A' && item[0].type == 'Lease') ? '#4688c7' : (item[0].status = 'U' && item[0].lastStatus == 'Lsd') ? '#d6860f' : null,
                        }]}>
                          <Text style={{ fontWeight: 'bold', color: colors.WHITE }}>{item.length > 1 ? `${item.length} Units` : isNumber(parseFloat(item[0].listPrice))}</Text>
                        </View>
                        <View style={[styles.triangle, { borderBottomColor: !isEmpty(this.state.details) && (item[0].id === global.details[0].id) ? '#7864A3' : (item[0].status == 'A' && item[0].type == 'Sale') ? '#549E65' : (item[0].status == 'U' && item[0].lastStatus == 'Sld') ? '#E45757' : (item[0].status == 'A' && item[0].type == 'Lease') ? '#4E9EE9' : (item[0].status = 'U' && item[0].lastStatus == 'Lsd') ? '#FF9900' : null }]} />
                      </View>
                    </Marker>
                ))
              ) :
                this.state.listings3.map((item, key) => (
                  item[0].count > 1 ?
                    <Marker key={key} coordinate={{ latitude: parseFloat(item[0].latitude), longitude: parseFloat(item[0].longitude) }} onPress={() => { global.details = item }}>
                      <View style={[styles.clusterMarker, { backgroundColor: this.state.borderColor }, {
                        width: item[0].count > 10000 ? 56 : item[0].count > 1000 ? 50 : item[0].count > 100 ? 44 : 40,
                        height: item[0].count > 10000 ? 56 : item[0].count > 1000 ? 50 : item[0].count > 100 ? 44 : 40,
                        borderRadius: item[0].count > 10000 ? 28 : item[0].count > 1000 ? 25 : item[0].count > 100 ? 22 : 20,
                      }]}>
                        <View style={[styles.clusterMarker, { backgroundColor: this.state.backgroundColor }, {
                          width: item[0].count > 10000 ? 48 : item[0].count > 1000 ? 42 : item[0].count > 100 ? 38 : 34,
                          height: item[0].count > 10000 ? 48 : item[0].count > 1000 ? 42 : item[0].count > 100 ? 38 : 34,
                          borderRadius: item[0].count > 10000 ? 24 : item[0].count > 1000 ? 21 : item[0].count > 100 ? 19 : 17,
                        }]}>
                          <Text style={{ fontSize: 11, fontWeight: 'bold', color: colors.WHITE }}>{item[0].count}</Text>
                        </View>
                      </View>
                    </Marker>
                    :
                    <Marker key={key} coordinate={{ latitude: parseFloat(item[0].latitude), longitude: parseFloat(item[0].longitude) }} onPress={() => { global.details = item }}>
                      <View style={{ alignItems: 'center', marginBottom: 20 }}>
                        <View style={[styles.customMarker, {
                          backgroundColor: !isEmpty(this.state.details) && (item[0].id === global.details[0].id) ? '#7864A3' : (item[0].status == 'A' && item[0].type == 'Sale') ? '#549E65' : (item[0].status == 'U' && item[0].lastStatus == 'Sld') ? '#E45757' : (item[0].status == 'A' && item[0].type == 'Lease') ? '#4E9EE9' : (item[0].status = 'U' && item[0].lastStatus == 'Lsd') ? '#FF9900' : null,
                          borderColor: !isEmpty(this.state.details) && (item[0].id === global.details[0].id) ? '#615282' : (item[0].status == 'A' && item[0].type == 'Sale') ? '#4d8a5b' : (item[0].status == 'U' && item[0].lastStatus == 'Sld') ? '#cc5252' : (item[0].status == 'A' && item[0].type == 'Lease') ? '#4688c7' : (item[0].status = 'U' && item[0].lastStatus == 'Lsd') ? '#d6860f' : null,
                        }]}>
                          <Text style={{ fontWeight: 'bold', color: colors.WHITE }}>{item.length > 1 ? `${item.length} Units` : isNumber(parseFloat(item[0].listPrice))}</Text>
                        </View>
                        <View style={[styles.triangle, {
                          borderBottomColor: !isEmpty(this.state.details) && (item[0].id === global.details[0].id) ? '#7864A3' : (item[0].status == 'A' && item[0].type == 'Sale') ? '#549E65' : (item[0].status == 'U' && item[0].lastStatus == 'Sld') ? '#E45757' : (item[0].status == 'A' && item[0].type == 'Lease') ? '#4E9EE9' : (item[0].status = 'U' && item[0].lastStatus == 'Lsd') ? '#FF9900' : null,
                        }]} />
                      </View>
                    </Marker>
                ))}
            </MapView> :
            <Grid
              data={this.state.listings2}
              renderItem={(listing) => (
                <PropertyItem
                  listing={listing.item}
                  likes={this.props.likes}
                  onPress={() => this.onDetail(listing.item.id)}
                  onLike={(id) => this.onLike(id)}
                  onShare={(id) => this.onShare(id)}
                  onComment={() => this.props.navigation.push("Auth")}
                />
              )}
              refreshing={this.state.refreshing}
              loadingMore={this.state.loadingMore}
              onRefresh={() => this.loadData(global.filters, true, 0)}
              onEndReached={() => this.loadData(global.filters, false, this.state.offset)}
            />
          }
        </View>

        {(this.state.tab && !this.state.drawing) && (
          <View style={styles.drawView}>
            <TouchableOpacity style={styles.drawButton} onPress={() => {
              this.props.logged ? this.setState({ drawing: true, polygon: true, coordinates: [], listings3: [] }) : this.props.navigation.push("Auth")
            }}>
              <Icon name="vector-polyline" type="material-community" size={15} color={colors.BLACK} />
              <Text style={{ fontSize: 12 }}>Draw Border</Text>
            </TouchableOpacity>
          </View>
        )}
        {(this.state.tab && this.state.drawing) && (
          <View style={styles.drawView}>
            <TouchableOpacity style={styles.applyButton} onPress={() => this.onApply()}>
              <Icon name="check" type="feather" size={12} color='#45AB62' />
              <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#45AB62' }}>Apply</Text>
            </TouchableOpacity>
            <View style={{ width: 10 }} />
            <TouchableOpacity style={styles.cancelButton} onPress={() => this.setState({ drawing: false, polygon: false, coordinates: [], listings3: [] })}>
              <Icon name="close" type="evil-icons" size={12} color='#EA4A4A' />
              <Text style={{ fontSize: 10, fontWeight: 'normal', color: '#EA4A4A' }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}
        {this.state.tab && (
          <TouchableOpacity style={styles.locationButton} onPress={() => this.state.mapType === 'standard' ? this.setState({ mapType: 'satellite' }) : this.setState({ mapType: 'standard' })}>
            <Icon name={this.state.mapType === 'standard' ? "earth" : "map-outline"} type="material-community" size={20} color={colors.BLACK} />
          </TouchableOpacity>
        )}
        {this.state.tab && (
          <TouchableOpacity style={styles.satButton}>
            <Icon name="location-searching" type="material" size={20} color={colors.BLACK} onPress={() => this.onCurrentPosition()} />
          </TouchableOpacity>
        )}
        {this.state.tab && (
          <View style={styles.viewButton}>
            <SwitchSelector
              initial={this.state.view ? 0 : 1}
              onPress={() => this.onView()}
              height={27}
              fontSize={12}
              buttonMargin={0}
              backgroundColor='#D1CFCF'
              buttonColor={colors.WHITE}
              selectedColor='#3C3C3C'
              selectedTextStyle={{ fontWeight: 'bold' }}
              textColor='#4E4E4E'
              textStyle={{ fontWeight: 'bold' }}
              borderColor='#D1CFCF'
              hasPadding
              options={[
                { label: "For Sale", value: true },
                { label: "For Rent", value: false }
              ]}
            />
          </View>
        )}
        <PropertyFilter
          visible={this.state.filter}
          view={this.state.view}
          onView={() => this.onView()}
          onAppleFilters={(filters, close) => this.onAppleFilters(filters, close)}
          onClearFilters={(filters, close) => this.onAppleFilters(filters, close)}
          onClose={() => this.setState({ filter: false })}
        />
        <PropertySave
          visible={this.state.saveSearches}
          onSave={(name) => this.onSave(name)}
          onClose={() => this.setState({ saveSearches: false })}
        />
        <PropertySort
          visible={this.state.sort}
          sortValue={this.state.sortValue}
          onSort={(sortValue) => this.onSort(sortValue)}
          onClose={() => this.setState({ sort: false })} />
        <Loading loading={this.state.loading} />
        <Loading2 loading={this.state.loading2} />
        {!isEmpty(this.state.details) && (
          <PropertyMarker
            listings={this.state.details}
            likes={this.props.likes}
            navigation={this.props.navigation}
            onLogin={() => this.props.navigation.push("Auth")}
            onLike={(id) => this.onLike(id)}
            onShare={(id) => this.onShare(id)} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    padding: 2,
    width: "100%",
    height: 35,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 2,
    width: wp("100%") - 90,
    height: 30,
    borderWidth: 0,
    borderRadius: 5,
    backgroundColor: colors.GREY.SECONDARY
  },
  searchIcon: {
    justifyContent: "center",
    alignItems: "center",
    width: 26,
    height: 26,
    backgroundColor: colors.WHITE,
    borderRadius: 5,
  },
  inputContainerStyle: {
    height: 30,
    borderBottomWidth: 0,
  },
  textInputStyle: {
    height: 30,
    width: wp("100%") - 120,
  },
  inputTextStyle: {
    height: 30,
    fontSize: 14,
  },
  listButton: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    width: 50,
    height: 30,
    borderWidth: 0,
    borderRadius: 5,
    backgroundColor: colors.GREY.PRIMARY,
  },
  statusBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    width: wp("100%"),
    height: 40,
    backgroundColor: colors.GREY.SECONDARY,
  },
  greenButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: 20,
    borderRadius: 5,
    backgroundColor: colors.GREEN.PRIMARY,
  },
  blueButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: 20,
    borderRadius: 5,
    backgroundColor: '#4E9EE9',
  },
  orangeButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 20,
    borderRadius: 5,
    backgroundColor: '#FF9900',
  },
  whiteButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: 20,
    borderRadius: 5,
    borderWidth: 0.5,
    backgroundColor: colors.WHITE,
  },
  redButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 20,
    borderRadius: 5,
    backgroundColor: colors.RED.PRIMARY,
  },
  white2Button: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 20,
    borderRadius: 5,
    borderWidth: 0.5,
    backgroundColor: colors.WHITE,
  },
  sort: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 85,
    height: 20,
    paddingLeft: 5,
    paddingRight: 5,
    borderWidth: 0.5,
    borderRadius: 5,
    backgroundColor: colors.WHITE,
  },
  filters: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 90,
    height: 20,
    paddingLeft: 5,
    paddingRight: 5,
    borderWidth: 0.5,
    borderRadius: 5,
    backgroundColor: colors.WHITE,
  },
  badge: {
    backgroundColor: colors.RED.PRIMARY,
    borderRadius: 7,
    width: 14,
    height: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  save: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 100,
    height: 20,
    paddingLeft: 5,
    paddingRight: 5,
    borderWidth: 0.5,
    borderRadius: 5,
    backgroundColor: colors.WHITE,
  },
  touch: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  locationButton: {
    position: "absolute",
    bottom: 60,
    right: 20,
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    height: 30,
    backgroundColor: colors.WHITE,
    borderRadius: 15,
    shadowColor: colors.BLACK,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 1,
  },
  drawView: {
    position: "absolute",
    top: 140,
    right: 20,
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
  },
  drawButton: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    width: 100,
    height: 25,
    padding: 5,
    backgroundColor: colors.WHITE,
    borderRadius: 5,
    borderWidth: 0.5,
    shadowColor: colors.BLACK,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 1,
  },
  applyButton: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 3,
    paddingBottom: 3,
    backgroundColor: colors.WHITE,
    borderRadius: 5,
    borderWidth: 0.9,
    borderColor: '#45AB62',
    shadowColor: colors.BLACK,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 1,
  },
  cancelButton: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 3,
    paddingBottom: 3,
    backgroundColor: colors.WHITE,
    borderRadius: 5,
    borderWidth: 0.9,
    borderColor: '#EA4A4A',
    shadowColor: colors.BLACK,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 1,
  },
  satButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    height: 30,
    backgroundColor: colors.WHITE,
    borderRadius: 15,
    shadowColor: colors.BLACK,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 1,
  },
  viewButton: {
    position: "absolute",
    bottom: 20,
    left: wp('100%') / 2 - 80,
    justifyContent: "center",
    alignItems: "center",
    width: 160,
    height: 25,
    borderRadius: 5,
    shadowColor: colors.BLACK,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
  },
  customMarker: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 5,
    paddingRight: 5,
    height: 20,
    borderRadius: 4,
    borderWidth: 2
  },
  triangle: {
    transform: [
      { rotate: '180deg' }
    ],
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#549E65'
  },
  clusterMarker: {
    justifyContent: "center",
    alignItems: "center",
  },
  polygonMarker: {
    width: 20,
    height: 20,
    backgroundColor: colors.BLUE.PRIMARY,
    borderColor: colors.WHITE,
    borderWidth: 3,
    shadowColor: colors.BLACK,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp('50%') - 20,
    marginBottom: 10,
    width: 40,
    height: 40,
    borderRadius: 5,
    backgroundColor: '#00000080',
    shadowColor: colors.BLACK,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
  }
});

const mapStateToProps = state => {
  return {
    logged: state.auth.logged,
    user: state.auth.user_info,
    likes: state.lists.likes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setTab: (data) => {
      dispatch(setTab(data));
    },
    setLikes: (data) => {
      dispatch(setLikes(data));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PropertiesHome);
