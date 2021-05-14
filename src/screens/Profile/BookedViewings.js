import React, { Component } from "react";
import { connect } from "react-redux";
import { Platform, StatusBar, StyleSheet, View, Text, TouchableOpacity, Share } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Grid from 'react-native-infinite-scroll-grid';

import styles from './BookedViewingsStyles';
import { colors } from "@constants/themes";
import { setLikes } from "@modules/redux/lists/actions";
import { Loading2, Header, PickerButton, PropertyItem } from "@components";
import { ListingsService } from "@modules/services";
import { isEmpty, isCurrency } from "@utils/functions";

class BookedViewings extends Component {
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
      var listings = await ListingsService.getViewings(this.props.route.params.agentId, this.props.route.params.userId, this.state.offset);
      var likes = await ListingsService.getLike(this.props.user.id);
      this.props.setLikes(likes);
      this.setState({ listings: refresh ? listings : [...this.state.listings, ...listings], loadingMore: false, offset: offset + 1, loading: false });
    } catch (error) {
      console.log(error.message);
    } finally {
      this.setState({ isLoading: false, loadingMore: false, refreshing: false, loading: false });
    }
  }

  async onDetail(id) {
    var listing = await ListingsService.getListingDetail(id);
    this.props.navigation.navigate('PropertiesDetail', { listing });
  }

  onLike(id) {
    ListingsService.setLike(this.props.user.id, id).then((response) => {
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
        message += `https://brokier-0916.web.app/home/AthenaHein0916/${listing.streetNumber}-${listing.streetName.replace(' ', '-')}-${listing.streetSuffix}/${listing.mlsNumber}/${id}`;
      } else {
        message += `https://brokier-0916.web.app/home/${user.unique_id}/${listing.streetNumber}-${listing.streetName.replace(' ', '-')}-${listing.streetSuffix}/${listing.mlsNumber}/${id}`;
      }

      Share.share({ message }, { subject });
    } else {
      var dialogTitle = `Brokier - ${listing.streetNumber} ${listing.streetName} ${listing.streetSuffix} Home Detail`;
      var message = `${listing.streetNumber} ${listing.streetName} ${listing.streetSuffix}: ${status}, ${isCurrency(listing.listPrice).split('.')[0]}, ${listing.neighborhood} ${listing.city}, ${listing.mlsNumber} - Brokier${'\n'}`;
      var title = `Brokier - ${listing.streetNumber} ${listing.streetName} ${listing.streetSuffix} Home Detail`;

      if (!isEmpty(user) && user.user_role === 'regular') {
        message += `https://brokier-0916.web.app/home/AthenaHein0916/${listing.streetNumber}-${listing.streetName.replace(' ', '-')}-${listing.streetSuffix}/${listing.mlsNumber}/${id}`;
      } else {
        message += `https://brokier-0916.web.app/home/${user.unique_id}/${listing.streetNumber}-${listing.streetName.replace(' ', '-')}-${listing.streetSuffix}/${listing.mlsNumber}/${id}`;
      }

      Share.share({ message, title }, { dialogTitle });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {/* <StatusBar hidden /> */}
        <Header style={{ justifyContent: 'center', height: 90, backgroundColor: colors.GREY.PRIMARY, paddingLeft: 10, paddingRight: 10 }}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: 'bold' }}>Regular Connected {this.props.route.params.userName}{'\n'}Viewing Requests</Text>
            </TouchableOpacity>
          </View>
        </Header>
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
        <Loading2 loading={this.state.loading} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    logged: state.auth.logged,
    user: state.auth.user_info,
    likes: state.lists.likes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setLikes: (data) => dispatch(setLikes(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookedViewings);
