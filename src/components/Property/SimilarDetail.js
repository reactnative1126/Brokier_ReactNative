import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import Swiper from "react-native-swiper";

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Card from '../Card/Card';
import Loading2 from '../Athena/Loading2';
import { ListingsService } from "@modules/services";
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

export default SimilarDetail = ({ navigation, listing }) => {
  const [loading, setLoading] = useState(false);

  const onDetail = async (id) => {
    setLoading(true);
    var listing = await ListingsService.getListingDetail(id);
    setLoading(false);
    navigation.replace('PropertiesDetail', { listing });
  }

  return (
    <Card style={styles.container} index={listing.id.toString()}>
      <Loading2 loading={loading} />
      <TouchableOpacity key={listing.id.toString()} onPress={() => onDetail(listing.id)}>
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={() => onDetail(listing.id)}>
            <Image style={styles.image} source={{ uri: configs.resURL + listing.images.split('#')[0], cache: 'force-cache' }} defaultSource={images.loading} />
          </TouchableOpacity>
        </View>
        <View style={styles.details}>
          <View style={styles.detailTop}>
            <View style={{ width: "30%" }}>
              <Text style={[{ fontSize: 10, fontWeight: "bold" }, (listing.lastStatus == 'Sld' || listing.lastStatus == 'Lsd') && { textDecorationLine: 'line-through' }]}>{isCurrency(listing.listPrice).split('.')[0]}</Text>
            </View>
            {isCurrency(listing.soldPrice).split('.')[0] != '$0' ?
              <View style={{ width: "30%" }}>
                <Text style={{ fontSize: 10, fontWeight: "bold", color: colors.RED.PRIMARY }}>{isCurrency(listing.soldPrice).split('.')[0]}</Text>
              </View> : <View style={{ width: "30%" }} />}
            <View style={{ alignItems: "flex-start" }}>
              <View style={styles.day}>
                <Text style={{ fontSize: 8, fontWeight: "normal" }}>
                  {listing.daysOnMarket} Days on Market
                </Text>
              </View>
            </View>
          </View>
          <View style={{ height: 10 }}>
            <View style={styles.status}>
              <Text style={{ fontSize: 8 }}>{listing.streetNumber + " " + listing.streetName + " " + listing.streetSuffix.replace('St', 'Street')} {!isEmpty(listing.unitNumber) && `#${listing.unitNumber}`}</Text>
            </View>
          </View>
          <View style={styles.detailBottom}>
            <Text style={{ fontSize: 8, fontWeight: "500", color: colors.GREY.DEFAULT, marginRight: 5 }}>
              {listing.numBedrooms}{!isEmpty(listing.numBedroomsPlus) && '+' + listing.numBedroomsPlus} Br
            </Text>
            <Text style={{ fontSize: 8, fontWeight: "500", color: colors.GREY.DEFAULT, marginRight: 5 }} >
              {listing.numBathrooms}{!isEmpty(listing.numBathroomsPlus) && '+' + listing.numBathroomsPlus} Bath
            </Text>
            <Text style={{ fontSize: 8, fontWeight: "500", color: colors.GREY.DEFAULT, marginRight: 5 }}>
              {listing.numParkingSpaces} Parking
            </Text>
            <Text style={{ fontSize: 8, fontWeight: "500", color: colors.GREY.DEFAULT, marginRight: 5 }}>
              {listing.type}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 230,
    height: 150,
    marginRight: 10,
    marginBottom: 5,
    borderRadius: 5,
  },
  imageContainer: {
    borderRadius: 5,
    width: "100%",
    height: 100,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  details: {
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    width: "100%",
    height: 100,
  },
  detailTop: {
    flexDirection: "row",
    width: "100%",
    height: 10,
  },
  status: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginBottom: 5,
    width: 130,
    height: 20,
    borderRadius: 3,
  },
  day: {
    justifyContent: "center",
    alignItems: "center",
    width: 90,
    height: 15,
  },
  detailBottom: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 25,
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