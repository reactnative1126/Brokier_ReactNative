import React from "react";
import { useSelector } from 'react-redux'
import { StyleSheet, View, Text, Image, TouchableOpacity, TouchableHighlight } from "react-native";
import Swiper from "react-native-swiper";
import moment from 'moment';

import Card from '../Card/Card';
import ActionButtons from '../Buttons/ActionButtons';
import { isEmpty, isCurrency } from "@utils/functions";
import configs from "@constants/configs";
import { colors } from "@constants/themes";
import { images } from "@constants/assets";

const renderPagination = (index, total) => {
  return (
    <View style={styles.paginationStyle}>
      <Text style={{ color: colors.white }}>
        <Text style={styles.paginationText}>{index + 1}</Text><Text style={styles.paginationText2}>/{total}</Text>
      </Text>
    </View>
  )
}

export default PropertyItem = ({ listing, likes, onPress, onLogin, onLike, onShare }) => {
  const logged = useSelector(state => state.auth.logged);
  return (
    <Card index={listing.id} style={{ marginBottom: 7 }}>
      <TouchableOpacity style={styles.topBar} onPress={onPress}>
        {/* <View style={{ width: 80 }} /> */}
        <View style={{ alignItems: 'flex-start' }}>
          <Text style={{ fontWeight: 'bold' }}>{listing.streetNumber + " " + listing.streetName + " " + listing.streetSuffix.replace('St', 'Street')} {!isEmpty(listing.unitNumber) && `#${listing.unitNumber}`}</Text>
          <Text style={{ fontSize: 14 }}>{listing.neighborhood} {listing.city}</Text>
        </View>
        <ActionButtons
          like={likes.indexOf(listing.id) > -1}
          onLogin={() => onLogin()}
          onLike={() => onLike(listing.id)}
          onShare={() => onShare(listing.id)}
        />
      </TouchableOpacity>
      <View>
        <View style={styles.imageContainer}>
          <Swiper
            renderPagination={renderPagination}
            loop={false}
            autoplay={false}
            dotColor={colors.GREY.PRIMARY}
            activeDotColor={colors.WHITE}
          >
            {!isEmpty(listing.images.split('#')) && listing.images.split('#').map((image, key) => {
              return (
                <TouchableHighlight key={key} onPress={onPress}>
                  <Image
                    style={styles.image}
                    source={{ uri: configs.resURL + image, cache: 'force-cache' }}
                    defaultSource={images.loading}
                  />
                </TouchableHighlight>
              );
            })}
          </Swiper>
        </View>
        <TouchableOpacity style={styles.details} onPress={onPress}>
          <View style={styles.detailTop}>
            <View style={{ width: "30%" }}>
              <Text style={{ fontSize: 12, marginBottom: 5 }}>Listed:</Text>
              <Text style={[{ fontSize: 16, fontWeight: "bold" }, (listing.lastStatus === 'Sld' || listing.lastStatus === 'Lsd') && { textDecorationLine: 'line-through' }]}>
                {isCurrency(listing.listPrice).split('.')[0]}
              </Text>
            </View>
            {isCurrency(listing.soldPrice).split('.')[0] != '$0' ?
              <View style={{ width: "30%" }}>
                <Text style={{ fontSize: 12, marginBottom: 5 }}>Sold:</Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: colors.RED.PRIMARY,
                  }}
                >
                  {isCurrency(listing.soldPrice).split('.')[0]}
                </Text>
              </View> : <View style={{ width: "30%" }} />}
            <View style={{ width: "40%", alignItems: "center" }}>
              <View style={styles.day}>
                <Text style={{ fontSize: 12 }} >{listing.daysOnMarket} Days on Market</Text>
              </View>
            </View>
          </View>
          <View style={{ marginTop: 5 }}>
            <View style={[styles.status, { borderColor: listing.lastStatus === 'Sus' ? colors.BLACK : listing.lastStatus === 'Exp' ? colors.BLACK : listing.lastStatus === 'Sld' ? colors.RED.PRIMARY : listing.lastStatus === 'Ter' ? colors.BLACK : listing.lastStatus === 'Dft' ? colors.GREEN.PRIMARY : listing.lastStatus === 'Lsd' ? colors.RED.PRIMARY : listing.lastStatus === 'Sc' ? colors.BLUE.PRIMARY : listing.lastStatus === 'Lc' ? colors.BLUE.PRIMARY : listing.lastStatus === 'Pc' ? colors.GREEN.PRIMARY : listing.lastStatus === 'Ext' ? colors.GREEN.PRIMARY : listing.lastStatus === 'New' ? colors.GREEN.PRIMARY : null }]}>
              <Text style={{ fontSize: 14, color: listing.lastStatus === 'Sus' ? colors.BLACK : listing.lastStatus === 'Exp' ? colors.BLACK : listing.lastStatus === 'Sld' ? colors.RED.PRIMARY : listing.lastStatus === 'Ter' ? colors.BLACK : listing.lastStatus === 'Dft' ? colors.GREEN.PRIMARY : listing.lastStatus === 'Lsd' ? colors.RED.PRIMARY : listing.lastStatus === 'Sc' ? colors.BLUE.PRIMARY : listing.lastStatus === 'Lc' ? colors.BLUE.PRIMARY : listing.lastStatus === 'Pc' ? colors.GREEN.PRIMARY : listing.lastStatus === 'Ext' ? colors.GREEN.PRIMARY : listing.lastStatus === 'New' ? colors.GREEN.PRIMARY : null }} >
                {listing.lastStatus === 'Sus' ? 'Suspended' : listing.lastStatus === 'Exp' ? 'Expires' : listing.lastStatus === 'Sld' ? 'Sold' : listing.lastStatus === 'Ter' ? 'Terminated' : listing.lastStatus === 'Dft' ? 'Deal' : listing.lastStatus === 'Lsd' ? 'Leased' : listing.lastStatus === 'Sc' ? 'Sold Con' : listing.lastStatus === 'Lc' ? 'Leased Con' : listing.lastStatus === 'Pc' ? 'Price Change' : listing.lastStatus === 'Ext' ? 'Extended' : listing.lastStatus === 'New' ? 'For Sale' : null}
                {listing.lastStatus == 'Sld' && ' ' + moment(listing.soldDate).format('MMM YYYY')}
              </Text>
            </View>
          </View>
          <View style={styles.detailBottom}>
            <Text style={{ fontSize: 13, fontWeight: "500", color: colors.GREY.DEFAULT, marginRight: 10 }} >
              {listing.numBedrooms}{!isEmpty(listing.numBedroomsPlus) && ' + ' + listing.numBedroomsPlus} Beds
            </Text>
            <View style={{ width: 1, height: "60%", backgroundColor: colors.GREY.SECONDARY, marginRight: 10 }} />
            <Text style={{ fontSize: 13, fontWeight: "500", color: colors.GREY.DEFAULT, marginRight: 10 }} >
              {listing.numBathrooms}{!isEmpty(listing.numBathroomsPlus) && ' + ' + listing.numBathroomsPlus} Baths
            </Text>
            <View style={{ width: 1, height: "60%", backgroundColor: colors.GREY.SECONDARY, marginRight: 10 }} />
            <Text style={{ fontSize: 13, fontWeight: "500", color: colors.GREY.DEFAULT, marginRight: 10 }} >
              {listing.numParkingSpaces} Parking
            </Text>
            <View style={{ width: 1, height: "60%", backgroundColor: colors.GREY.SECONDARY, marginRight: 10 }} />
            <Text style={{ fontSize: 13, fontWeight: "500", color: colors.GREY.DEFAULT, marginRight: 10 }} >
              {listing.type}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 40,
    paddingLeft: 10,
    paddingRight: 5
  },
  imageContainer: {
    width: "100%",
    height: 200,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  details: {
    padding: 5,
    width: "100%",
    padding: 10
  },
  detailTop: {
    flexDirection: "row",
    alignItems: "flex-end",
    width: "100%",
  },
  detailBottom: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 30,
  },
  status: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginBottom: 5,
    // width: 5,
    height: 20,
    // borderWidth: 0.5,
    borderRadius: 3,
  },
  day: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 0,
    width: 130,
    height: 20,
    backgroundColor: colors.GREY.PRIMARY,
    borderRadius: 3,
  },
  paginationStyle: {
    position: 'absolute',
    bottom: 10,
    right: 10
  },
  paginationText: {
    color: 'white',
    fontSize: 20
  },
  paginationText2: {
    color: 'white',
    fontSize: 14
  }
});

