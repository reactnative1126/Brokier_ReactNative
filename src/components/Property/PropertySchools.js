import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

import { colors } from "@constants/themes";
import Card from '../Card/Card';

export default PropertySchools = ({ school, onSchool }) => {
  return (
    <Card index="similar" style={styles.similar}>
      <Text style={{ fontSize: 14, fontWeight: "bold" }}>
        Schools <Text style={styles.title}>(IGNORE FOR NOW)</Text>
      </Text>
      <View style={styles.toggleButton}>
        <TouchableOpacity key="All" onPress={() => onSchool('All')}
          style={[styles.oneButton, { width: wp('20%'), backgroundColor: school === 'All' ? colors.WHITE : colors.GREY.PRIMARY }]}>
          <Text>All</Text>
        </TouchableOpacity>
        <TouchableOpacity key="Elementary" onPress={() => onSchool('Elementary')}
          style={[styles.oneButton, { width: wp('20%'), backgroundColor: school === 'Elementary' ? colors.WHITE : colors.GREY.PRIMARY }]}>
          <Text>Elementary</Text>
        </TouchableOpacity>
        <TouchableOpacity key="Middle" onPress={() => onSchool('Middle')}
          style={[styles.oneButton, { width: wp('20%'), backgroundColor: school === 'Middle' ? colors.WHITE : colors.GREY.PRIMARY }]}>
          <Text>Middle</Text>
        </TouchableOpacity>
        <TouchableOpacity key="High" onPress={() => onSchool('High')}
          style={[styles.oneButton, { width: wp('20%'), backgroundColor: school === 'High' ? colors.WHITE : colors.GREY.PRIMARY }]}>
          <Text>High</Text>
        </TouchableOpacity>
      </View>

    </Card>
  );
};

const styles = StyleSheet.create({
  similar: {
    width: "100%",
    padding: 10,
  },
  title: {
    fontWeight: 'bold',
    color: colors.RED.PRIMARY
  },
  toggleButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    width: wp('100%') - 20,
    height: 25,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: colors.GREY.PRIMARY,
    borderRadius: 5,
  },
  oneButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('50%') - 16,
    height: 20,
    backgroundColor: colors.WHITE,
    borderRadius: 2
  },
});
