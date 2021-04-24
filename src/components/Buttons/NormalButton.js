import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default NormalButton = (props) => {
  return (
    <TouchableOpacity style={[styles.button, {
      width: props.width,
      height: props.height,
      backgroundColor: props.color
    }]} onPress={props.onPress}>
      <Text style={{ fontSize: 16, fontWeight: "bold", color: props.textColor }}>{props.text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3
  }
});