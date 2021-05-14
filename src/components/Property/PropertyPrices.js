import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

import { isEmpty, isCurrency, mortgageCalc } from "@utils/functions";
import Card from '../Card/Card';

const InterestRate = 2.5;
const LengthOfLoan = 25;

export default listingOne = ({ listing }) => {
  return (
    <Card index={listing.id} style={styles.price}>
      <View>
        <View style={styles.wrapper}>
          <View style={{ width: "65%" }}>
            <View style={styles.view1}>
              <Text style={{ fontWeight: '500', width: '70%' }}>{`Total Monthly expenses`}</Text>
              <Text style={{ width: '30%', fontSize: 18, textAlign: 'right', fontWeight: "500", marginRight: 5 }} >
                {!isEmpty(listing.monthlyExpenses) && isCurrency(listing.monthlyExpenses)}
              </Text>
            </View>
            <View style={styles.view2}>
              <Text style={{ fontSize: 12, width: "70%" }}>{`Mortgate Payments`}</Text>
              <Text style={styles.text2}>
                {!isEmpty(mortgageCalc(parseFloat(listing.listPrice), InterestRate, LengthOfLoan)) && isCurrency(mortgageCalc(parseFloat(listing.listPrice), InterestRate, LengthOfLoan))}</Text>
            </View>
            <View style={styles.view2}>
              <Text style={{ fontSize: 12, width: "70%" }}>{`Property`}</Text>
              <Text style={styles.text2}>{!isEmpty(listing.propertyTaxes) && isCurrency(listing.propertyTaxes)}</Text>
            </View>
            <View style={styles.view2}>
              <Text style={{ fontSize: 12, width: "70%" }}>{`Maintenance Fees`}</Text>
              <Text style={styles.text2}>{!isEmpty(listing.maintenanceFees) && isCurrency(listing.maintenanceFees)}</Text>
            </View>
          </View>

          <View style={styles.view3} >
            <Text style={{ fontSize: 20, fontWeight: "300", marginRight: 5 }}>
              {"2.5"}%
          </Text>
            <Text style={{ fontSize: 8, textAlign: 'center' }}>{`View Mortgage rates and Ienders`}</Text>
          </View>
        </View>


        <View style={{ width: wp("100%"), padding: 10 }}>
          <View style={styles.twoButton}>
            <TouchableOpacity style={styles.oneButton}>
              <Text style={{ fontSize: 10 }}>{`Edit Payment Calculator`}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.oneButton}>
              <Text style={{ fontSize: 10 }}>
                {`Get Pre-Qualified for Mortgage`} </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  price: {
    width: "100%",
  },
  twoButton: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    height: 30,
  },
  oneButton: {
    justifyContent: "center",
    alignItems: "center",
    width: "46%",
    height: 20,
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: '#414141'
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 20
  },
  view1: {
    flexDirection: "row",
    width: '100%',
    alignItems: "center"
  },
  view2: {
    flexDirection: "row",
    width: '100%',
    alignItems: "center",
    marginTop: 5
  },
  view3: {
    justifyContent: "center",
    alignItems: "center",
    width: 120,
    height: 50,
    borderWidth: 0.5,
    borderRadius: 5
  },
  text2: {
    fontSize: 12,
    width: "30%",
    textAlign: "right"
  }
});

