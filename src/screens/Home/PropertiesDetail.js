import React, { Component } from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from "react-native";
import GoogleStaticMap from 'react-native-google-static-map';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";
import { setLikes } from "@modules/redux/lists/actions";
import { Loading2, Header, ActionButtons, PropertyDetail, PropertyHistory, PropertyDescription, PropertySimilar, PropertySchools, PropertyPrices, PropertyProfile, PropertyQuestions } from "@components";
import { ListingsService } from "@modules/services";
import { isEmpty } from "@utils/functions";
import configs from "@constants/configs";
import { colors } from "@constants/themes";

class PropertiesDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      similar: 'For Sale',
      school: 'All',
      listing: null,
      histories: [],
      similars: [],
      images: []
    };
  }

  async componentDidMount() {
    const { listing } = this.props.route.params;
    ListingsService.getDetailHistories(listing.streetNumber, listing.streetName, listing.streetSuffix, listing.unitNumber)
      .then((histories) => {
        this.setState({ histories });
      });
    var status = 'A';
    var type = 'Sale';
    var lastStatus = null;
    ListingsService.getDetailSimilars(listing.latitude, listing.longitude, status, type, lastStatus, listing.propertyType, listing.numBedrooms)
      .then((similars) => {
        this.setState({ similars });
      });
  }

  async onLike(id) {
    if (!this.props.logged) {
      this.props.navigation.push("Auth");
    } else {
      await ListingsService.setLike(this.props.user.id, id).then((response) => {
        this.props.setLikes(response);
      })
    }
  }
  async onSimilar(similar) {
    var status = 'A';
    var type = 'Sale';
    var lastStatus = null;
    if (similar === 'For Sale') {
      status = 'A';
      type = 'Sale';
      lastStatus = null;
    } else if (similar === 'Sold') {
      status = 'U';
      type = null;
      lastStatus = 'Sld';
    } else {
      status = 'U';
      type = null;
      lastStatus = 'Lsd';
    }
    this.setState({ loading: true });
    const { listing } = this.props.route.params;
    ListingsService.getDetailSimilars(listing.latitude, listing.longitude, status, type, lastStatus, listing.propertyType, listing.numBedrooms)
      .then((similars) => {
        this.setState({ loading: false, similar, similars });
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  }


  render() {
    const { listing } = this.props.route.params;
    return (
      <View style={styles.container}>
        <Loading2 loading={this.state.loading} />
        <Header style={{ backgroundColor: colors.GREY.PRIMARY, paddingRight: 10 }}>
          <View style={styles.header}>
            <View style={styles.topBar}>
              <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: "flex-start" }}>
                <View style={{ width: 30, height: 30, marginTop: -5, marginLeft: -5, justifyContent: 'center', alignItems: 'center' }}>
                  <Icon name="keyboard-arrow-left" type="material" size={40} onPress={() => this.props.navigation.goBack()} />
                </View>
                <View style={{ alignItems: "flex-start", marginLeft: 10 }}>
                  <Text style={{ fontWeight: 'bold' }}>{listing.streetNumber + " " + listing.streetName + " " + listing.streetSuffix.replace('St', 'Street')} {!isEmpty(listing.unitNumber) && `#${listing.unitNumber}`}</Text>
                  <Text style={{ fontSize: 11 }}>{listing.neighborhood} {listing.city}</Text>
                </View>
              </View>
              <ActionButtons like={this.props.likes.indexOf(listing.id) > -1} onLike={() => this.onLike(listing.id)} />
            </View>
          </View>
        </Header>
        <ScrollView style={styles.container}>
          <PropertyDetail listing={listing} />
          <PropertyHistory navigation={this.props.navigation} histories={this.state.histories} />
          <GoogleStaticMap
            latitude={listing.latitude.toString()}
            longitude={listing.longitude.toString()}
            zoom={13}
            size={{ width: wp("100%"), height: 250 }}
            apiKey={configs.google_map_key}
          />
          <PropertyDescription listing={listing} loading={() => this.setState({ loading: !this.state.loading })} />
          <PropertyPrices listing={listing} />
          <PropertyProfile />
          <PropertySimilar
            navigation={this.props.navigation}
            similar={this.state.similar}
            onSimilar={(similar) => this.onSimilar(similar)}
            similars={this.state.similars}
          />
          <View style={{ height: 150 }} />
        </ScrollView>
        <View style={styles.bottomBar}>
          <View style={{ width: wp("100%") - 170, height: 60 }}>
            <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", width: "100%", height: 35, borderRadius: 5, backgroundColor: colors.RED.PRIMARY }}>
              <Text style={{ fontSize: 16, fontWeight: "bold", color: colors.WHITE, }} >
                Schedule Viewing
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: 120, height: 60 }}>
            <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", width: "100%", height: 35, borderRadius: 5, backgroundColor: '#E1E1E1', borderWidth: 1, borderColor: '#B0AEAE' }}>
              <Text style={{ fontSize: 12, fontWeight: "bold", color: '#7E7E7E' }} >
                Ask Questions
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    padding: 2,
    width: "100%",
    height: 35,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingTop: 10,
    height: 50,
    backgroundColor: colors.GREY.PRIMARY,
  },
  twoButton: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    height: 30,
  },
  oneButton: {
    justifyContent: "center",
    alignItems: "center",
    width: "46%",
    height: 20,
    borderWidth: 0.5,
    borderRadius: 5,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: wp("100%"),
    height: 80,
    backgroundColor: colors.GREY.PRIMARY,
    padding: 20,
  },
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

export default connect(mapStateToProps, mapDispatchToProps)(PropertiesDetail);
