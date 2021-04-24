import React from 'react';
import { StyleSheet, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

import { colors } from "@constants/themes";

export default Header = props => {
  return <View style={{ ...styles.header, ...props.style }}>{props.children}</View>;
};

const styles = StyleSheet.create({
  header: {
    width: wp('100%'),
    height: 90,
    backgroundColor: colors.WHITE,
    paddingTop: 40,
  }
});