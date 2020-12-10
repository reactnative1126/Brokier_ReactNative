import React from "react";
import { View } from "react-native";

import { Icon } from "react-native-elements";
import { colors } from "@constants/themes";

export default ActionButtons = (props) => {
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
        onPress={props.onLike}
      />

      <Icon
        name="share-square"
        type="font-awesome-5"
        size={24}
        color={colors.BLACK}
        onPress={props.onShare}
      />
    </View>
  );
};