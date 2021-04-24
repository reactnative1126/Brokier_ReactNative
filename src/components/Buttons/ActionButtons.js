import React from "react";
import { useSelector } from 'react-redux'
import { StyleSheet, View } from "react-native";

import { Icon } from "react-native-elements";
import { colors } from "@constants/themes";

export default ActionButtons = (props) => {
  const { logged } = useSelector(state => state.auth);
  return (
    <View style={styles.main}>
      <Icon
        name={props.like ? "heart" : "heart-outline"}
        type="material-community"
        size={30}
        color={props.like ? colors.RED.PRIMARY : colors.BLACK}
        onPress={logged ? props.onLike : props.onLogin}
      />

      <Icon
        name="share-square"
        type="font-awesome-5"
        size={24}
        color={colors.BLACK}
        onPress={logged ? props.onShare : props.onLogin}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: 80,
  },
});