import React from "react";
import { View } from "react-native";
import { useSelector } from 'react-redux'

import { Icon } from "react-native-elements";
import { colors } from "@constants/themes";

export default ActionButtons = (props) => {
  const { logged } = useSelector(state => state.auth);
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: 80,
      }}
    >
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