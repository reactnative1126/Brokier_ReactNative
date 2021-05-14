import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

import { Icon } from "react-native-elements";
import { colors } from "@constants/themes";

export default MarketSummary = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={{ width: 30 }} />
        <Text style={styles.title}>{`Market Summary`}</Text>
        <TouchableOpacity>
          <Icon name="share-apple" type="evilicon" size={25} />
        </TouchableOpacity>
      </View>
      <View style={styles.wrapper1}>
        <View style={{ width: 30 }} />
        <View style={{ width: (wp('100%') - 60) / 3, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 10, color: '#737373' }}>{`Market Price`}</Text>
          <Text style={{ fontSize: 10, color: '#737373' }}>{`(July 2020)`}</Text>
          <Text style={{ fontSize: 12 }}>{`$750,000`}</Text>
        </View>
        <View style={{ width: 0.5, height: 50, backgroundColor: '#818181' }} />
        <View style={{ width: (wp('100%') - 60) / 3, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 10, color: '#737373' }}>{`Price Change`}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
            <Text style={{ fontSize: 10, color: '#EF4E4E' }}>-2%</Text>
            <Text style={{ fontSize: 9 }}> {`MoM`}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
            <Text style={{ fontSize: 12, color: colors.GREEN.PRIMARY }}>+15%</Text>
            <Text style={{ fontSize: 9 }}> {`YoY`}</Text>
          </View>
        </View>
        <View style={{ width: 0.5, height: 50, backgroundColor: '#818181' }} />
        <View style={{ width: (wp('100%') - 60) / 3, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 12, color: '#EF4E4E' }}>{`Sellers Market`}</Text>
          <Text style={{ fontSize: 8 }}>{`14 Avg. DOM`}</Text>
          <Text style={{ fontSize: 8 }}>{`1.6 MOI`}</Text>
          <Text style={{ fontSize: 8 }}>{`99.5% Sold/ List Ratio`}</Text>
        </View>
        <View style={{ width: 30 }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10
  },
  title: {
    textDecorationLine: 'underline',
    fontSize: 12,
    color: '#848484'
  },
  wrapper1: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#C0C0C0'
  }
});