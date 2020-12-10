import React from "react";
import {  StyleSheet, View, Text, ScrollView } from "react-native";

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { colors } from "@constants/themes";

export default MortgageRates = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.statusBar}>
        <Text style={{ fontWeight: 'bold', color: colors.WHITE }}>Total Monthly Cost</Text>
        <Text style={{ fontSize: 20, color: colors.WHITE }}>$1,882/Month</Text>
      </View>
      <ScrollView contentContainerStyle={styles.main}>
        <View style={styles.item}>
          <Text style={{ width: 200, fontSize: 16, textAlign: 'center' }}>Home Price</Text>
          <Text style={{ width: 100 }}>$550,000</Text>
        </View>
        <View style={styles.item}>
          <Text style={{ width: 200, fontSize: 16, textAlign: 'center' }}>Down Payment</Text>
          <Text style={{ width: 100 }}>$200,000</Text>
        </View>
        <View style={styles.item}>
          <Text style={{ width: 200, fontSize: 16, textAlign: 'center' }}>Loan</Text>
          <Text style={{ width: 100 }}>350,000</Text>
        </View>
        <View style={styles.item}>
          <View>
            <Text style={{ width: 200, fontSize: 16, textAlign: 'center' }}>Mortgage Payment</Text>
            <Text style={{ width: 200, fontSize: 12, textAlign: 'center' }}>Fixed Rate, Monthly Payment</Text>
          </View>
          <Text style={{ width: 100 }}>$1,433</Text>
        </View>
        <View style={{ width: wp('100%'), height: 20, backgroundColor: '#F6F6F6' }} />
        <View style={styles.item}>
          <Text style={{ width: 200, fontSize: 16, textAlign: 'center' }}>Property Tax</Text>
          <Text style={{ width: 100 }}>450/Month{'\n'}5,400</Text>
        </View>
        <View style={styles.item}>
          <Text style={{ width: 200, fontSize: 16, textAlign: 'center' }}>Monthly Utilities</Text>
          <Text style={{ width: 100 }}>300</Text>
        </View>
        <View style={styles.item}>
          <Text style={{ width: 200, fontSize: 16, textAlign: 'center' }}>Rental Income</Text>
          <Text style={{ width: 100 }}>$2,500</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
  },
  statusBar: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: wp('100%'),
    height: 65,
    backgroundColor: '#EA6969',
    borderTopWidth: 1,
    borderTopColor: '#BCBCBC'
  },
  main: {
    alignItems: 'center',
    width: wp('100%'),
    backgroundColor: colors.WHITE,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: 70,
    borderBottomWidth: 0.5,
    borderBottomColor: '#DEDEDE',
    shadowColor: colors.BLACK,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
  }
});