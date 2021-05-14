import React, { Component, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Modal } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

import { Input } from "react-native-elements";
import { colors } from "@constants/themes";
import { isEmpty } from "@utils/functions";

export default PropertySave = props => {
  const [name, setName] = useState('');

  return (
    <Modal visible={props.visible} animationType="none" swipeArea={50} transparent={true}>
      <View style={styles.modalView}>
        <Text style={styles.title}>{`Save search`}</Text>
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text>{`Name`}<Text style={{ color: colors.RED.DEFAULT }}>*</Text>:</Text>
          <Input
            editable={true}
            autoFocus={true}
            placeholder={"Enter search name"}
            placeholderTextColor={colors.GREY.DEFAULT}
            value={name}
            inputContainerStyle={styles.inputContainerStyle}
            containerStyle={styles.textInputStyle}
            inputStyle={styles.inputTextStyle}
            onChangeText={(value) => setName(value)}
          />
        </View>
        <View style={{ marginTop: 15, width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Text>{`Location: `}</Text>
          <Text style={{ width: 180, fontSize: 13, color: colors.BLUE.PRIMARY }}>{global.location}</Text>
        </View>
        <View style={{ marginTop: 15, width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text>{`Current map filters: `}</Text>
        </View>
        <View style={{ marginTop: 5, width: '100%' }}>
          <Text style={{ color: colors.BLUE.PRIMARY, fontSize: 13 }}>{global.description}</Text>
        </View>
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity style={[styles.button, { borderBottomLeftRadius: 10, backgroundColor: colors.RED.PRIMARY }]} onPress={() => {
          isEmpty(name) ? alert('Please enter name') : props.onSave(name)
        }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: colors.WHITE }}>{`SAVE SEARCH`}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { borderBottomRightRadius: 10, backgroundColor: colors.GREY.PRIMARY }]} onPress={props.onClose} >
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: colors.BLACK }}>{`CANCEL`}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={{ zIndex: 500, position: 'absolute', backgroundColor: '#00000080', width: wp('100%'), height: hp('100%') }} onPress={props.onClose} />
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    alignItems: 'center',
    marginLeft: wp('100') / 2 - 150,
    marginTop: hp('100%') / 2 - 200,
    width: 300,
    padding: 30,
    backgroundColor: colors.WHITE,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000
  },
  title: {
    marginBottom: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: wp('100%') / 2 - 150,
    width: 300,
    height: 40,
    backgroundColor: colors.WHITE,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    zIndex: 1000
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 40,
    zIndex: 1000
  },
  inputContainerStyle: {
    height: 25,
    padding: 0,
    borderBottomWidth: 1,
  },
  textInputStyle: {
    margin: 0,
    height: 25,
    width: 200,
  },
  inputTextStyle: {
    height: 25,
    fontSize: 14,
  },
});
