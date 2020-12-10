import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

import Card from '../Card/Card';
import { colors } from "@constants/themes";
import { images } from "@constants/assets";

export default PropertyProfile = (props) => {
  return (
    <Card index={54} style={styles.profile}>
      <Text style={{ fontSize: 14, marginBottom: 5 }}>Ben Johnson Long Name</Text>
      <Image
        style={{ width: 80, height: 80, borderRadius: 40 }}
        source={images.avatar}
      />
      <Text style={{ fontSize: 12 }}>Re-Max Realtron</Text>
      <Text style={{ fontSize: 12, marginBottom: 5 }}>Sales Representative</Text>
      <View style={{ width: '60%', flexDirection: 'row', justifyContent: 'space-around' }}>
        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', width: 100, height: 30, borderWidth: 0.5, borderRadius: 3 }}>
          <Text style={{ fontSize: 12, }}>Call Agent</Text>
        </TouchableOpacity>
        <View style={{width: 50}} />
        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', width: 100, height: 30, borderWidth: 0.5, borderRadius: 3 }}>
          <Text style={{ fontSize: 12, }}>Message Agent</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  profile: {
    alignItems: "center",
    width: "100%",
    padding: 20
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: colors.GREY.SECONDARY
  }
});

