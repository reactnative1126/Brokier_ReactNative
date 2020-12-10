import React, { Component } from "react";
import { Platform, StatusBar, StyleSheet, View, Text } from "react-native";
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import { colors } from "@constants/themes";

export default Splash = () => {
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <AnimatedCircularProgress
        size={100}
        width={2}
        fill={this.state.progress}
        tintColor={colors.BLUE.DEFAULT}
        backgroundColor={colors.WHITE} />
      <Text style={{ marginTop: -65, fontSize: 25, color: colors.WHITE }}>{parseFloat(this.state.progress).toFixed(0)}<Text>%</Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D35400'
  },
});