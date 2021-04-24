import React from "react";
import {  StyleSheet, View, Text } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

import { Icon, Input } from "react-native-elements"; 
import { colors } from "@constants/themes"; 

export default TextInput = (props) => {
  return (
    <View style={styles.input}>
      <Text style={{ marginLeft: 50, marginBottom: 5, fontSize: 12 }}>{props.title}</Text>
      <View style={styles.main}>
        <View style={styles.icon}>
          <Icon name={props.iconName} type={props.iconType} size={props.iconSize} />
        </View>
        <Input
          value={props.value}
          secureTextEntry={props.secureTextEntry}
          autoCapitalize={props.autoCapitalize}
          onChangeText={(text) => props.onChangeText(text)}
          inputContainerStyle={styles.inputContainerStyle}
          containerStyle={styles.textInputStyle}
        inputStyle={styles.inputTextStyle}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop: 20,
    width: wp("90%")
  },
  main: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 42,
    backgroundColor: colors.WHITE,
    borderWidth: 1,
    borderColor: "#E4E4E4"
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    width: 47,
    height: 41,
    borderRightWidth: 1,
    borderColor: "#E4E4E4"
  },
  inputContainerStyle: {
    width: wp("90%") - 70,
    borderBottomWidth: 0
  },
  textInputStyle: {
    width: "100%",
    height: "100%"
  },
  inputTextStyle: {
    fontSize: 12
  }
});
