import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

import { Input } from "react-native-elements";
import { colors } from "@constants/themes";
import Card from '../Card/Card';

export default PropertyQuestions = ({ title, questions }) => {
  return (
    <Card index={55} style={styles.questions}>
      <Text style={{ fontSize: 12, fontWeight: "bold" }}>{title}</Text>
      <View style={styles.wrapper}>
        <Input
          editable={true}
          placeholder={"Write a message..."}
          placeholderTextColor={'#969696'}
          inputContainerStyle={styles.inputContainerStyle}
          containerStyle={styles.textInputStyle}
          inputStyle={styles.inputTextStyle}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          {questions.map((question, key) => {
            return (
              <TouchableOpacity key={key} style={styles.button}>
                <Text style={{ fontSize: 11, color: colors.BLUE.SECONDARY }}>{question.question}</Text>
              </TouchableOpacity>
            )
          })}
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  questions: {
    padding: 10
  },
  wrapper: {
    marginTop: 5,
    paddingBottom: 5,
    borderWidth: 1,
    borderColor: '#E2E0E0',
    borderRadius: 5,
  },
  inputContainerStyle: {
    height: 30,
    borderBottomWidth: 0,
  },
  textInputStyle: {
    height: 30,
    width: wp("100%") - 120,
  },
  inputTextStyle: {
    height: 30,
    fontSize: 14,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('30%'),
    height: 40,
    padding: 5,
    borderWidth: 0.5,
    borderColor: colors.BLUE.SECONDARY,
    borderRadius: 5,
  }
});

