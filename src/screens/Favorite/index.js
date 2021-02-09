import React, { Component } from "react";
import { Platform, StatusBar, StyleSheet, View, Text, TouchableOpacity, Share } from "react-native";
import Grid from 'react-native-infinite-scroll-grid';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { connect } from "react-redux";
import { setLikes } from "@modules/redux/lists/actions";
import { Loading2, Header, PickerButton, PropertyItem } from "@components";
import { ListingsService } from "@modules/services";
import { isEmpty, isCurrency } from "@utils/functions";
import { colors } from "@constants/themes";

const speeds = [
  { value: 0, label: 'Instant' },
  { value: 1, label: 'Fast' },
  { value: 2, label: 'Slow' },
]

class Favorite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      saved: 'listings',
      speedStatus: false,
      speedLabel: 'Instant',

      isLoading: false,
      loadingMore: false,
      refreshing: false,
      offset: 0,

      listings: [],
      searches: [],
      details: [],
    };
  }

  UNSAFE_componentWillMount() {
    this.setState({ loading: true });
    this.loadData(true, 0);
    this.getSearches();
  }

  async loadData(refresh, offset) {
    if (this.state.isLoading) return;

    if (refresh) {
      this.setState({ refreshing: true });
    } else {
      this.setState({ loadingMore: true });
    }

    try {
      this.setState({ isLoading: true });
      var listings = await ListingsService.getFavoriteList(this.props.user.id, offset);
      var likes = await ListingsService.getLike(this.props.user.id);
      this.props.setLikes(likes);
      this.setState({ listings: refresh ? listings : [...this.state.listings, ...listings], loadingMore: false, offset: offset + 1, loading: false });
    } catch (error) {
      console.log(error.message);
    } finally {
      this.setState({ isLoading: false, loadingMore: false, refreshing: false, loading: false });
    }
  }

  async getSearches() {
    var searches = await ListingsService.getSearches(this.props.user.id);
    this.setState({ searches });
  }

  async onDetail(id) {
    var listing = await ListingsService.getListingDetail(id);
    this.props.navigation.navigate('PropertiesDetail', { listing });
  }

  onMap(search) {
    global.region = JSON.parse(search.region);
    global.filters = JSON.parse(search.filters);
    global.location = search.location;
    global.coordinates = JSON.parse(search.coordinates);
    global.description = search.description;
    this.props.navigation.reset({ routes: [{ name: 'App' }] })
  }

  async onLike(id) {
    await ListingsService.setLike(this.props.user.id, id).then((response) => {
      this.props.setLikes(response);
    });
  }

  async onShare(id) {
    const user = this.props.user;
    var listing = await ListingsService.getListingDetail(id);
    var status = listing.lastStatus === 'Sus' ? 'Suspended' : listing.lastStatus === 'Exp' ? 'Expires' : listing.lastStatus === 'Sld' ? 'Sold' : listing.lastStatus === 'Ter' ? 'Terminated' : listing.lastStatus === 'Dft' ? 'Deal' : listing.lastStatus === 'Lsd' ? 'Leased' : listing.lastStatus === 'Sc' ? 'Sold Con' : listing.lastStatus === 'Lc' ? 'Leased Con' : listing.lastStatus === 'Pc' ? 'Price Change' : listing.lastStatus === 'Ext' ? 'Extended' : listing.lastStatus === 'New' ? 'For Sale' : null;
    var image = `${configs.resURL}${listing.images.split('#')[0]}`;

    if (Platform.OS === 'ios') {
      var subject = `Brokier - ${listing.streetNumber} ${listing.streetName} ${listing.streetSuffix} Home Detail`;
      var message = `${listing.streetNumber} ${listing.streetName} ${listing.streetSuffix}: ${status}, ${isCurrency(listing.listPrice).split('.')[0]}, ${listing.neighborhood} ${listing.city}, ${listing.mlsNumber} - Brokier${'\n'}`;
      if (!isEmpty(user) && user.user_role === 'regular') {
        message += `https://brokier.web.app/home/A11real0926queen/${listing.streetNumber}-${listing.streetName.replace(' ', '-')}-${listing.streetSuffix}/${listing.mlsNumber}`;
      } else {
        message += `https://brokier.web.app/home/${user.unique_id}/${listing.streetNumber}-${listing.streetName.replace(' ', '-')}-${listing.streetSuffix}/${listing.mlsNumber}`;
      }

      Share.share({ message }, { subject });
    } else {
      var dialogTitle = `Brokier - ${listing.streetNumber} ${listing.streetName} ${listing.streetSuffix} Home Detail`;
      var message = `${listing.streetNumber} ${listing.streetName} ${listing.streetSuffix}: ${status}, ${isCurrency(listing.listPrice).split('.')[0]}, ${listing.neighborhood} ${listing.city}, ${listing.mlsNumber} - Brokier${'\n'}`;
      var title = `Brokier - ${listing.streetNumber} ${listing.streetName} ${listing.streetSuffix} Home Detail`;

      if (!isEmpty(user) && user.user_role === 'regular') {
        message += `https://brokier.web.app/home/A11real0926queen/${listing.streetNumber}-${listing.streetName.replace(' ', '-')}-${listing.streetSuffix}/${listing.mlsNumber}`;
      } else {
        message += `https://brokier.web.app/home/${user.unique_id}/${listing.streetNumber}-${listing.streetName.replace(' ', '-')}-${listing.streetSuffix}/${listing.mlsNumber}`;
      }

      Share.share({ message, title }, { dialogTitle });
    }
  };

  render() {
    const { saved, speedStatus, speedLabel } = this.state;
    return (
      <View style={styles.container}>
        {/* <StatusBar hidden /> */}
        <Header style={{ backgroundColor: colors.GREY.PRIMARY, paddingLeft: 10, paddingRight: 10 }}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => this.setState({ saved: 'listings' })}
              style={[styles.oneButton, { width: wp('48%'), backgroundColor: saved === 'listings' ? colors.WHITE : colors.GREY.PRIMARY }]}>
              <Text>Saved Listings</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({ saved: 'searches' })}
              style={[styles.oneButton, { width: wp('48%'), backgroundColor: saved === 'searches' ? colors.WHITE : colors.GREY.PRIMARY }]}>
              <Text>Saved Searches</Text>
            </TouchableOpacity>
          </View>
        </Header>
        {saved === 'searches' ?
          <View style={styles.container}>
            {/* <Text style={{ width: wp('100%'), paddingLeft: 10, fontSize: 12, fontWeight: 'bold', marginTop: 15 }}>Saved Searches:</Text> */}
            <Grid
              data={this.state.searches}
              renderItem={(search) => (
                <TouchableOpacity
                  style={{ width: wp('100%'), paddingTop: 10, paddingLeft: 10, paddingRight: 10, paddingBottom: 5, borderBottomWidth: 1, borderBottomColor: '#DEDEDE' }}
                  onPress={() => this.onMap(search.item)}
                >
                  <Text style={{ fontSize: 12 }}>Name: {search.item.name}</Text>
                  <Text style={{ fontSize: 12 }}>Location: {search.item.location}</Text>
                  <Text style={{ fontSize: 12 }}>Filters: {search.item.description}</Text>
                </TouchableOpacity>
              )}
            // refreshing={this.state.refreshing}
            // loadingMore={this.state.loadingMore}
            // onRefresh={() => this.loadData(true, 0)}
            // onEndReached={() => this.loadData(false, this.state.offset)}
            />
          </View>
          : (isEmpty(this.state.listings) && !this.state.loading) ?
            null :
            <View style={[styles.container, { backgroundColor: colors.GREY.PRIMARY }]}>
              <Grid
                data={this.state.listings}
                renderItem={(listing) => (
                  <PropertyItem
                    listing={listing.item}
                    likes={this.props.likes}
                    onPress={() => this.onDetail(listing.item.id)}
                    onLogin={() => this.props.navigation.push("Auth")}
                    onLike={(id) => this.onLike(id)}
                    onShare={(id) => this.onShare(id)}
                  />
                )}
                refreshing={this.state.refreshing}
                loadingMore={this.state.loadingMore}
                onRefresh={() => this.loadData(true, 0)}
                onEndReached={() => this.loadData(false, this.state.offset)}
              />
            </View>
        }
        <Loading2 loading={this.state.loading} />
        {/* <TouchableOpacity style={styles.mapSearchButton} onPress={() => this.props.navigation.navigate('Home')}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.WHITE }}>Map Search</Text>
          </TouchableOpacity> */}
        {speedStatus ? <PickerButton data={speeds} label={speedLabel} onSelect={(label) => this.setState({ speedLabel: label, speedStatus: false })} /> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.WHITE
  },
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  oneButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('50%') - 16,
    height: 25,
    backgroundColor: colors.WHITE,
    borderRadius: 5
  },
  statusBar: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 25,
    backgroundColor: colors.WHITE
  },
  mapSearchButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('50%'),
    height: 30,
    backgroundColor: '#B9B9B9',
    borderRadius: 5
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
    setLikes: (data) => {
      dispatch(setLikes(data));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorite);
