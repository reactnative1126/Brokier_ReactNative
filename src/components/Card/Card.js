import React from "react";
import { StyleSheet, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

import { colors } from "@constants/themes";

export default Card = (props) => {
  return (
    <View key={props.index} style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: wp("100%"),
    backgroundColor: colors.WHITE,
    borderBottomWidth: 0.3,
    borderBottomColor: colors.GREY.CARDLINE,
  },
});