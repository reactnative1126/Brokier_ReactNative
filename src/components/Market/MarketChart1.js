import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { LineChart } from 'react-native-svg-charts';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

import { Icon } from "react-native-elements";

export default MarketChart1 = (props) => {
  const data1 = [50, 45, 30, 25, 10, 0, 0, 0, -10, -20, -25, -20, -10, -9, -5]
  const data2 = [-80, -60, -65, -65, -45, -49, -50, -62, -50, -30, -25, -17, 10, 25, 50]
  const data = [
    {
      data: data1,
      svg: { stroke: '#FF9900' },
    },
    {
      data: data2,
      svg: { stroke: '#EC5A5A' },
    },
  ]

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={{ width: 30 }} />
        <Text style={styles.title}>{`Price Change and time on market`}</Text>
        <TouchableOpacity>
          <Icon name="share-apple" type="evilicon" size={25} />
        </TouchableOpacity>
      </View>
      <View style={styles.price}>
        <Text style={{ fontSize: 12, transform: [{ rotate: '-90deg' }] }}>{`Price`}</Text>
        <View style={styles.priceChart}>
          <LineChart
            style={{ width: 180, height: 80 }}
            data={data}
            contentInset={{ top: 20, bottom: 20 }}
          >
          </LineChart>
        </View>
        <Text style={styles.days}>{`Days`}</Text>
      </View>
      <Text style={{ marginTop: 5 }}>{`Time`}</Text>
      <View style={styles.priceWrapper}>
        <View style={{ width: 20, height: 3, backgroundColor: '#D12F2F' }} />
        <Text style={{ fontSize: 8, width: 100, marginLeft: 10 }}>{`Median Price`}</Text>
        <View style={{ width: 20, height: 3, backgroundColor: '#FF782D' }} />
        <Text style={{ fontSize: 8, width: 100, marginLeft: 10 }}>{`Avg. Days On Market`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
    width: wp('100%'),
    paddingBottom: 10,
    borderTopWidth: 0.5,
    borderTopColor: '#C0C0C0',
    borderBottomWidth: 0.5,
    borderBottomColor: '#C0C0C0'
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp('100%'),
    padding: 10
  },
  title: {
    fontSize: 12,
    color: '#848484',
    textDecorationLine: 'underline',
  },
  price: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  priceChart: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    width: 200,
    height: 80,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderBottomWidth: 0.5
  },
  days: {
    fontSize: 12,
    transform: [{ rotate: '90deg' }]
  },
  priceWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  }
});
