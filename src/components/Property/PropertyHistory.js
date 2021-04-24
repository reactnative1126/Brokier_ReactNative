import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Clipboard } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Tooltip } from 'react-native-elements';
import moment from 'moment';

import { colors } from "@constants/themes";
import { isEmpty, isCurrency } from "@utils/functions";
import { ListingsService } from "@modules/services";
import Card from '../Card/Card';
import Loading2 from '../Athena/Loading2';

export default PropertyHistory = ({ navigation, histories }) => {
  const [loading, setLoading] = useState(false);
  const onDetail = async (id) => {
    setLoading(true);
    var listing = await ListingsService.getListingDetail(id);
    setLoading(false);
    navigation.replace('PropertiesDetail', { listing });
  }

  return (
    <Card index='53' style={{ borderBottomWidth: 0 }}>
      <Loading2 loading={loading} />
      <View style={styles.twoButton}>
        <TouchableOpacity style={styles.oneButton}>
          <Text>Estimated Home Value</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.oneButton}>
          <Text>Estimated Rental Price</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.historyHeader}>
        <View style={{ width: "35%" }}>
          <Text style={styles.title1}>Property History</Text>
        </View>
        <View style={{ width: "20%" }}>
          <Text style={styles.title2}>List Price</Text>
        </View>
        <View style={{ width: "20%" }}>
          <Text style={styles.title2}>Sold Price</Text>
        </View>
        <View style={{ width: "20%" }}>
          <Text style={styles.title2}>MLS #</Text>
        </View>
      </View>
      {isEmpty(histories) ?
        <View style={{ height: 10 }} /> :
        <ScrollView style={{ height: histories.length > 5 ? 200 : null }}>
          {histories.map((listing, key) => {
            return (
              <TouchableOpacity key={key}
                style={[styles.historyContent, { borderBottomWidth: key == histories.length - 1 ? 0 : 0.3 }]}
                onPress={() => (listing.status === 'U' && listing.lastStatus === 'Sld') ? console.log('') : onDetail(listing.id)}
              >
                <View style={{ width: "40%" }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        width: 80,
                        height: 15,
                        borderWidth: 0.5,
                        borderRadius: 5,
                        borderColor:
                          (listing.status === 'A' && listing.type === 'Sale') ? colors.GREEN.PRIMARY :
                            (listing.status === 'U' && listing.lastStatus === 'Sld') ? colors.RED.PRIMARY :
                              (listing.status === 'A' && listing.lastStatus === 'Ter') ? colors.BLACK :
                                listing.status === 'A' && listing.type === 'Lease' ? colors.BLUE.PRIMARY :
                                  (listing.status === 'U' && listing.lastStatus === 'Lsd') ? '#FF9900' : colors.BLACK
                      }}
                    >
                      <Text style={{
                        fontSize: 12, fontWeight: "300",
                        color:
                          (listing.status === 'A' && listing.type === 'Sale') ? colors.GREEN.PRIMARY :
                            (listing.status === 'U' && listing.lastStatus === 'Sld') ? colors.RED.PRIMARY :
                              (listing.status === 'A' && listing.lastStatus === 'Ter') ? colors.BLACK :
                                listing.status === 'A' && listing.type === 'Lease' ? colors.BLUE.PRIMARY :
                                  (listing.status === 'U' && listing.lastStatus === 'Lsd') ? '#FF9900' : colors.BLACK
                      }}>
                        {
                          (listing.status === 'A' && listing.type === 'Sale') ? 'For Sale' :
                            (listing.status === 'U' && listing.lastStatus === 'Sld') ? 'Sold' :
                              (listing.status === 'A' && listing.lastStatus === 'Ter') ? 'Terminated' :
                                listing.status === 'A' && listing.type === 'Lease' ? 'For Rent' :
                                  (listing.status === 'U' && listing.lastStatus === 'Lsd') ? 'Rented' : 'Other'}
                      </Text>
                    </View>
                    {(listing.status === 'U' && listing.lastStatus === 'Sld') ? null : (
                      <TouchableOpacity onPress={() => onDetail(listing.id)}>
                        <Text style={styles.view}>View</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  <Text style={{ fontSize: 10 }}>{moment(listing.listDate).format('DD/MM/YYYY')}-{isEmpty(listing.soldDate) ? moment().format('DD/MM/YYYY') : moment(listing.soldDate).format('DD/MM/YYYY')}</Text>
                </View>
                <View style={{ width: "20%" }}>
                  <View style={{ height: 15 }} />
                  <Text style={{ fontSize: 10 }}>{isCurrency(listing.listPrice).split('.')[0]}</Text>
                </View>
                <View style={{ width: "20%" }}>
                  <View style={{ height: 15 }} />
                  <Text style={{ fontSize: 10 }}>{isCurrency(listing.soldPrice) === '$0.00' ? '' : isCurrency(listing.soldPrice).split('.')[0]}</Text>
                </View>
                <View style={{ width: "20%" }}>
                  <Tooltip
                    popover={<Text>Copy</Text>}
                    overlayColor='transparent'
                    width={100}
                    height={30}
                    containerStyle={{ padding: 0 }}
                    onOpen={() => {
                      Clipboard.setString(listing.mlsNumber);
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "300",
                      }}
                    >
                      {listing.mlsNumber}
                    </Text>
                  </Tooltip>
                  <Text style={{ fontSize: 10 }}> </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>}
    </Card>
  );
};

const styles = StyleSheet.create({
  twoButton: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    height: 50,
  },
  oneButton: {
    justifyContent: "center",
    alignItems: "center",
    width: "45%",
    height: 20,
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: '#414141'
  },
  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: wp('100%') - 40,
    marginLeft: 20,
    marginRight: 20,
    height: 25,
    borderBottomWidth: 0.3,
    borderColor: colors.BLACK,
  },
  historyContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: wp('100%') - 40,
    marginLeft: 20,
    marginRight: 20,
    height: 40,
    borderBottomWidth: 0.3,
    borderColor: '#C6C6C6'
  },
  title1: {
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center"
  },
  title2: {
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center"
  },
  view: {
    marginLeft: 10,
    fontSize: 12,
    fontWeight: '500',
    color: colors.BLUE.PRIMARY,
    textDecorationLine: 'underline',
  }
});

