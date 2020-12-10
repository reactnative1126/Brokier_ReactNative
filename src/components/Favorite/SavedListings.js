import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Icon } from "react-native-elements";

import { colors } from "@constants/themes";

export default SavedListings = (props) => {
  const [appNotification, setAppNotification] = useState(false);
  const [emailNotification, setEmailNotification] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 5, marginTop: 10 }}>Notifications:</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', height: 25 }}>
        <Text style={{ fontSize: 12, width: 150 }}>App Notifications</Text>
        <View style={{ width: 100, alignItems: 'center' }}>
          <TouchableOpacity onPress={() => setAppNotification(!appNotification)}>
            <Icon name={!appNotification ? "checkbox-blank-outline" : "close-box"} type="material-community" size={20} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{ fontSize: 12, width: 150 }}>Email Notifications</Text>
        <View style={{ width: 100, alignItems: 'center' }}>
          <TouchableOpacity onPress={() => setEmailNotification(!emailNotification)}>
            <Icon name={!emailNotification ? "checkbox-blank-outline" : "close-box"} type="material-community" size={20} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', height: 25}}>
        <Text style={{ fontSize: 12, width: 150 }}>Alert Speed</Text>
        <View style={{ width: 100, alignItems: 'center' }}>
          <TouchableOpacity style={styles.inputView} onPress={props.setAlertSpeed}>
            <View />
            <Text style={{ fontSize: 12 }}>{props.speedLabel}</Text>
            <Icon name='down' type='antdesign' size={14} color={colors.BLACK} />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 15 }}>Saved Searches:</Text>
      <View style={{ width: '100%', paddingTop: 10, paddingBottom: 5, borderBottomWidth: 1, borderBottomColor: '#DEDEDE'}}>
        <Text style={{ fontSize: 12 }}>Name: Toronto(1)</Text>
        <Text style={{ fontSize: 12 }}>Location: Toronto, Ontario</Text>
        <Text style={{ fontSize: 12 }}>Filters: 4+ Bedroom | Max Price: $2,500,00</Text>
      </View>
      <View style={{ width: '100%', paddingTop: 10, paddingBottom: 5, borderBottomWidth: 1, borderBottomColor: '#DEDEDE'}}>
        <Text style={{ fontSize: 12 }}>Name: Toronto affordable Condos(1)</Text>
        <Text style={{ fontSize: 12 }}>Location: Toronto, Ontario</Text>
        <Text style={{ fontSize: 12 }}>Filters Type: Condo | Max Price: $4,000,00</Text>
      </View>
      <View style={{ width: '100%', paddingTop: 10, paddingBottom: 5, borderBottomWidth: 0, borderBottomColor: '#DEDEDE'}}>
        <Text style={{ fontSize: 12 }}>Name: Toronto Luxury Condos(1)</Text>
        <Text style={{ fontSize: 12 }}>Location: Toronto, Ontario</Text>
        <Text style={{ fontSize: 12 }}>Filters Type: Condo | Min Price: $4,000,00</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: 350,
    paddingLeft: 10,
    paddingRight: 10
  },
  inputView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 100,
    height: 15,
    paddingLeft: 5, paddingRight: 5,
    borderRadius: 5,
    borderWidth: 0.5,
  },
});

