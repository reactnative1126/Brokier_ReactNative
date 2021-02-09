import React from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Icon } from "react-native-elements";
import PropertyItem from '../Property/PropertyItem';
import { isEmpty } from "@utils/functions";

export default SavedSearches = (props) => {
  return (
    isEmpty(props.propertyData) ?
      <View style={[styles.container, { height: 350, paddingLeft: 10, paddingRight: 10 }]}>
        <View style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Text style={{ fontSize: 12, marginBottom: 10 }} >You have no Favorite listings,</Text>
          <Icon name="heart" type="material-community" size={25} />
          <Text style={{ fontSize: 12, marginTop: 10 }} >Tap the Heart on a listing to save it hear!</Text>
        </View>
      </View> :
      <View style={styles.container}>
        <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 5 }}>Saved Listings:</Text>
        <FlatList
          data={props.propertyData}
          renderItem={(propertyItem) => (
            <PropertyItem
              propertyItem={propertyItem.item}
              onPress={() => props.navigation.navigate('PropertiesDetail', { propertyItem: propertyItem.item })}
              onLogin={()=>props.navigation.push("Auth")}
              onShare={(id)=>props.onShare(id)}
              onLike={(id)=>props.onLike(id)}
            />
          )}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('100%')
  },
});
