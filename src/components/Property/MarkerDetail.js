import React from "react";
import { useSelector } from 'react-redux'
import { Platform, StyleSheet, View, Text, Image, TouchableOpacity, TouchableHighlight } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Swiper from "react-native-swiper";
import { LinearGradient } from 'expo-linear-gradient';

import configs from "@constants/configs";
import { Icon } from "react-native-elements";
import { colors } from "@constants/themes";
import { images } from "@constants/assets";
import { ListingsService } from "@modules/services";
import { isEmpty, isCurrency } from "@utils/functions";

export default MarkerDetail = ({ listing, likes, navigation, onLogin, onLike, onShare }) => {
  const { logged } = useSelector(state => state.auth);
  return (
    <View key={listing.id} style={styles.imageContainer} >
      <Swiper autoplay={false} showsPagination={false} >
        {!isEmpty(listing.images.split('#')) && listing.images.split('#').map((image, key) => {
          return (
            <TouchableHighlight key={key} onPress={async () => {
              if ((listing.lastStatus == 'Sld' || listing.lastStatus == 'Lsd') && !logged) {
                onLogin;
              } else {
                var listingOne = await ListingsService.getListingDetail(listing.id);
                navigation.navigate('PropertiesDetail', { listing: listingOne });
              }
            }}>
              <Image
                style={styles.image}
                source={{ uri: configs.resURL + image, cache: 'force-cache' }}
                defaultSource={images.loading}
              />
            </TouchableHighlight>
          );
        })}
      </Swiper>
      <View style={styles.view1}>
        <TouchableOpacity style={{ marginTop: 1, marginRight: -4, shadowColor: colors.BLACK, shadowOffset: { width: 2, height: 2 }, shadowOpacity: 0.5, shadowRadius: 1, elevation: 1, }}
          onPress={logged ? onLike : onLogin}>
          <Icon name={likes.indexOf(listing.id) > -1 ? "heart-box-outline" : "heart-box"} type="material-community" size={35} color={likes.indexOf(listing.id) > -1 ? colors.RED.PRIMARY : colors.WHITE} />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginTop: 5, shadowColor: colors.BLACK, shadowOffset: { width: 2, height: 2 }, shadowOpacity: 0.5, shadowRadius: 1, elevation: 1, }}
          onPress={logged ? onShare : onLogin}>
          <Icon name="share-square" type="font-awesome" size={30} color={colors.WHITE} />
        </TouchableOpacity>
      </View>
      <View style={styles.view2}>
        <LinearGradient colors={['transparent', 'rgba(0, 0, 0, 0.9)']} style={{ padding: 10 }}>
          <View style={styles.view21}>
            <View style={{ width: wp('100%') - 200 }}>
              <Text style={[{ fontSize: 18, fontWeight: 'bold', color: colors.WHITE }, (listing.lastStatus === 'Sld' || listing.lastStatus === 'Lsd') && { textDecorationLine: 'line-through' }]}>{isCurrency(listing.listPrice)}</Text>
              <Text style={{ fontSize: 14, color: colors.WHITE }} numberOfLines={1}>{listing.streetNumber + " " + listing.streetName + " " + listing.streetSuffix}. {listing.district}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold', color: colors.WHITE }}>{listing.numBedrooms} {!isEmpty(listing.numBedroomsPlus) && " | " + listing.numBedroomsPlus}</Text>
                <Text style={{ color: colors.WHITE }}>{`Beds`}</Text>
              </View>
              <View style={{ alignItems: 'center', marginLeft: 10 }}>
                <Text style={{ fontWeight: 'bold', color: colors.WHITE }}>{listing.numBathrooms} {!isEmpty(listing.numBathroomsPlus) && " | " + listing.numBathroomsPlus}</Text>
                <Text style={{ color: colors.WHITE }}>{`Baths`}</Text>
              </View>
              <View style={{ alignItems: 'center', marginLeft: 10 }}>
                <Text style={{ fontWeight: 'bold', color: colors.WHITE }}>{listing.numParkingSpaces}</Text>
                <Text style={{ color: colors.WHITE }}>{`Parking`}</Text>
              </View>
            </View>
          </View>
          {((listing.lastStatus === 'Sld' || listing.lastStatus === 'Lsd') && logged) &&
            <View style={{ backgroundColor: colors.WHITE, width: 180, paddingTop: 2, paddingBottom: 2 }}>
              <Text style={{ fontSize: 14, color: listing.lastStatus === 'Sld' ? colors.RED.PRIMARY : '#FF9900', textAlign: 'center' }}>{listing.lastStatus === 'Sld' ? 'Sold For: ' : 'Rented For: '}{isCurrency(listing.soldPrice)}</Text>
            </View>}
          {((listing.lastStatus === 'Sld' || listing.lastStatus === 'Lsd') && !logged) &&
            <TouchableOpacity style={{ backgroundColor: colors.WHITE, paddingTop: 2, paddingBottom: 2, width: 200 }} onPress={onLogin}>
              <Text style={{ fontSize: 14, color: listing.lastStatus === 'Sld' ? colors.RED.PRIMARY : '#FF9900', textAlign: 'center' }}>{listing.lastStatus === 'Sld' ? 'Sold For: ' : 'Rented For: '}{'PLEASE LOGIN'}</Text>
            </TouchableOpacity>}
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: "100%",
    height: (hp('100%') - 100) / 3,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  view1: {
    position: 'absolute',
    top: 0,
    width: wp('100%'),
    padding: 10,
    alignItems: 'flex-end'
  },
  view2: {
    position: 'absolute',
    bottom: Platform.OS == 'ios' ? 0 : 0,
    width: wp('100%')
  },
  view21: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 5
  },
});