import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Swiper from "react-native-swiper";
import ImageView from 'react-native-image-viewing';
import moment from 'moment';

import configs from "@constants/configs";
import { colors } from "@constants/themes";
import { isEmpty, isCurrency } from "@utils/functions";
import Card from '../Card/Card';

const renderPagination = (index, total) => {
  return (
    <View style={styles.paginationStyle}>
      <Text style={{ color: colors.white }}>
        <Text style={styles.paginationText}>{index + 1}</Text><Text style={styles.paginationText2}>/{total}</Text>
      </Text>
    </View>
  )
}

export default PropertyDetail = ({ listing }) => {
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const [images, setImages] = useState([]);

  useEffect(() => {
    var imagesArray = [];
    listing.images.split('#').map((image, key) => {
      imagesArray = [...imagesArray, { uri: configs.resURL + image }];
    });
    setImages(imagesArray);

    return () => console.log(images);
  }, []);

  return (
    <Card index='52'>
      <View>
        <View style={styles.imageContainer}>
          <Swiper
            renderPagination={renderPagination}
            loop={false}
            autoplay={false} dotColor={colors.GREY.PRIMARY} activeDotColor={colors.WHITE}
          >
            {listing.images.split('#').map((image, key) => {
              return (
                <TouchableOpacity key={key} onPress={() => {
                  setVisible(true);
                  setIndex(key);

                }}>
                  <Image style={styles.image} source={{ uri: configs.resURL + image, cache: 'force-cache' }} defaultSource={images.loading} />
                </TouchableOpacity>
              );
            })}
          </Swiper>
        </View>
        <View style={styles.details}>
          <View style={styles.detailTop}>
            <View style={{ width: "30%" }}>
              <Text style={{ fontSize: 12, marginBottom: 5 }}>Listed:</Text>
              <Text style={[{ fontSize: 16, fontWeight: "bold" }, (listing.lastStatus == 'Sld' || listing.lastStatus == 'Lsd') && { textDecorationLine: 'line-through' }]}>{isCurrency(listing.listPrice).split('.')[0]}</Text>
            </View>
            {isCurrency(listing.soldPrice).split('.')[0] != '$0' ?
              <View style={{ width: "30%" }}>
                <Text style={{ fontSize: 12, marginBottom: 5 }}>Sold:</Text>
                <Text style={{ fontSize: 16, fontWeight: "bold", color: colors.RED.PRIMARY }}>{isCurrency(listing.soldPrice).split('.')[0]}</Text>
              </View> : <View style={{ width: "30%" }} />}
            <View style={{ width: "40%", alignItems: "center" }}>
              <View style={styles.day}>
                <Text style={{ fontSize: 12, fontWeight: "300" }}>
                  {listing.daysOnMarket} Days on Market
                </Text>
              </View>
            </View>
          </View>
          <View>
            <View style={styles.status}>
              <Text style={[
                { fontSize: 14, color: listing.lastStatus === 'Sus' ? colors.BLACK : listing.lastStatus === 'Exp' ? colors.BLACK : listing.lastStatus === 'Sld' ? colors.RED.PRIMARY : listing.lastStatus === 'Ter' ? colors.BLACK : listing.lastStatus === 'Dft' ? colors.GREEN.PRIMARY : listing.lastStatus === 'Lsd' ? '#FF9900' : listing.lastStatus === 'Sc' ? colors.BLUE.PRIMARY : listing.lastStatus === 'Lc' ? colors.BLUE.PRIMARY : listing.lastStatus === 'Pc' ? colors.GREEN.PRIMARY : listing.lastStatus === 'Ext' ? colors.GREEN.PRIMARY : listing.lastStatus === 'New' ? colors.GREEN.PRIMARY : null },
                { paddingHorizontal: 5, borderRadius: 3, borderWidth: 1, borderColor: listing.lastStatus === 'Sus' ? colors.BLACK : listing.lastStatus === 'Exp' ? colors.BLACK : listing.lastStatus === 'Sld' ? colors.RED.PRIMARY : listing.lastStatus === 'Ter' ? colors.BLACK : listing.lastStatus === 'Dft' ? colors.GREEN.PRIMARY : listing.lastStatus === 'Lsd' ? '#FF9900' : listing.lastStatus === 'Sc' ? colors.BLUE.PRIMARY : listing.lastStatus === 'Lc' ? colors.BLUE.PRIMARY : listing.lastStatus === 'Pc' ? colors.GREEN.PRIMARY : listing.lastStatus === 'Ext' ? colors.GREEN.PRIMARY : listing.lastStatus === 'New' ? colors.GREEN.PRIMARY : null }]} >
                {listing.lastStatus === 'Sus' ? 'Suspended' : listing.lastStatus === 'Exp' ? 'Expires' : listing.lastStatus === 'Sld' ? 'Sold' : listing.lastStatus === 'Ter' ? 'Terminated' : listing.lastStatus === 'Dft' ? 'Deal' : listing.lastStatus === 'Lsd' ? 'Leased' : listing.lastStatus === 'Sc' ? 'Sold Con' : listing.lastStatus === 'Lc' ? 'Leased Con' : listing.lastStatus === 'Pc' ? 'Price Change' : listing.lastStatus === 'Ext' ? 'Extended' : listing.lastStatus === 'New' ? 'For Sale' : null}
                {listing.lastStatus == 'Sld' && ' ' + moment(listing.soldDate).format('MMM YYYY')}
                {listing.lastStatus == 'Lsd' && ' ' + moment(listing.soldDate).format('DD MMM YYYY')}
              </Text>
            </View>
          </View>
          <View style={styles.detailBottom}>
            <Text style={{ fontSize: 13, fontWeight: "500", color: colors.GREY.DEFAULT, marginRight: 10 }}>
              {listing.numBedrooms}{!isEmpty(listing.numBedroomsPlus) && ' + ' + listing.numBedroomsPlus} Beds
            </Text>
            <View style={{ width: 1, height: "60%", backgroundColor: colors.GREY.SECONDARY, marginRight: 10 }} />
            <Text style={{ fontSize: 13, fontWeight: "500", color: colors.GREY.DEFAULT, marginRight: 10 }} >
              {listing.numBathrooms}{!isEmpty(listing.numBathroomsPlus) && ' + ' + listing.numBathroomsPlus} Baths
            </Text>
            <View style={{ width: 1, height: "60%", backgroundColor: colors.GREY.SECONDARY, marginRight: 10 }} />
            <Text style={{ fontSize: 13, fontWeight: "500", color: colors.GREY.DEFAULT, marginRight: 10 }}>
              {listing.numParkingSpaces} Parking
            </Text>
            <View style={{ width: 1, height: "60%", backgroundColor: colors.GREY.SECONDARY, marginRight: 10 }} />
            <Text style={{ fontSize: 13, fontWeight: "500", color: colors.GREY.DEFAULT, marginRight: 10 }}>
              {listing.type}
            </Text>
          </View>
        </View>
      </View>
      <ImageView images={images} imageIndex={index} visible={visible} onRequestClose={() => setVisible(false)} />
    </Card>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: "100%",
    height: 220,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  details: {
    paddingLeft: 10,
    paddingRight: 10,
    width: "100%",
    height: 110,
  },
  detailTop: {
    flexDirection: "row",
    alignItems: "flex-end",
    width: "100%",
    height: 50,
  },
  status: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginVertical: 5,
    height: 20,
  },
  day: {
    justifyContent: "center",
    alignItems: "center",
    width: 130,
    height: 20,
    backgroundColor: colors.GREY.PRIMARY,
    borderRadius: 3,
  },
  detailBottom: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 20
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
