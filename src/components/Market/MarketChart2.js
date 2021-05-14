import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { BarChart } from 'react-native-svg-charts';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

import { Icon } from "react-native-elements";

export default MarketChart2 = (props) => {
  const data1 = [22, 40, 37, 37, 37, 30, 32, 53, 43]
    .map((value) => ({ value }))
  const data2 = [20, 30, 18, 20, 2, 23, 23, 24, 30]
    .map((value) => ({ value }))
  const data = [
    {
      data: data1,
      svg: { fill: '#7ABA80' },
    },
    {
      data: data2,
      svg: { fill: '#D95644' },
    },
  ]

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={{ width: 30 }} />
        <Text style={styles.title}>{`Inventory and Market Temperature`}</Text>
        <TouchableOpacity>
          <Icon name="share-apple" type="evilicon" size={25} />
        </TouchableOpacity>
      </View>
      <View style={styles.wrapper2}>
        <Text style={styles.title2}>{`Number of Homes`}</Text>
        <View style={styles.homeChart}>
          <BarChart
            style={{ width: 180, height: 119 }}
            numberOfTicks={0}
            spacingInner={0.3}
            spacingOuter={0}
            data={data}
            yAccessor={({ item }) => item.value}
            contentInset={{ top: 20, bottom: 0 }}
          >
          </BarChart>
        </View>
        <Text style={styles.title3}>{`Months of Inventory`}</Text>
      </View>
      <Text style={{ marginTop: 5 }}>{`Time`}</Text>
      <View style={styles.wrapper3}>
        <View style={{ width: 5, height: 5, backgroundColor: '#7ABA80' }} />
        <Text style={{ fontSize: 8, width: 80, marginLeft: 10 }}>{`Active Listings`}</Text>
        <View style={{ width: 5, height: 5, backgroundColor: '#D95644' }} />
        <Text style={{ fontSize: 8, width: 50, marginLeft: 10 }}>Sales</Text>
        <View style={{ width: 5, height: 5, backgroundColor: '#445CD9' }} />
        <Text style={{ fontSize: 8, width: 100, marginLeft: 10 }}>{`Market Temperature`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    marginTop: 2,
    borderTopWidth: 0.5,
    borderTopColor: '#C0C0C0',
    borderBottomWidth: 0.5,
    borderBottomColor: '#C0C0C0',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp('100%'),
    padding: 10
  },
  title: {
    textDecorationLine: 'underline',
    fontSize: 12,
    color: '#848484'
  },
  wrapper2: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title2: {
    marginRight: -40,
    fontSize: 12,
    transform: [{ rotate: '-90deg' }],
  },
  homeChart: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    width: 200,
    height: 120,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderBottomWidth: 0.5
  },
  title3: {
    marginLeft: -40,
    fontSize: 12,
    transform: [{ rotate: '90deg' }],
  },
  wrapper3: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  }
});
