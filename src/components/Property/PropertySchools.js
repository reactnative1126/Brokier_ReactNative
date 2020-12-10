import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Card from '../Card/Card';
import { colors } from "@constants/themes";

export default PropertySchools = ({ school, onSchool }) => {
  return (
    <Card index="similar" style={styles.similar}>
      <Text style={{ fontSize: 14, fontWeight: "bold" }}>
        Schools <Text style={{ fontWeight: 'bold', color: colors.RED.PRIMARY }}>(IGNORE FOR NOW)</Text>
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
  smallDetails: {
    paddingLeft: 10,
    paddingRight: 10,
    width: "100%",
  },
  smallDetailTop: {
    flexDirection: "row",
    alignItems: "flex-end",
    width: "100%",
    height: 50,
  },
  smallStatus: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
    width: 80,
    height: 15,
    borderWidth: 0.2,
    borderColor: colors.RED.PRIMARY,
    borderRadius: 3,
  },
  smallDay: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
    width: 80,
    height: 15,
    backgroundColor: colors.GREY.PRIMARY,
    borderRadius: 3,
  },
  detailBottom: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 30,
  },
  toggleButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp('100%') - 20,
    height: 25,
    backgroundColor: colors.GREY.PRIMARY,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 5,
    paddingRight: 5
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
