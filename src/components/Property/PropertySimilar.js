import React from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

import { colors } from "@constants/themes";
import Card from '../Card/Card';
import SimilarDetail from '../Property/SimilarDetail';

export default PropertySimilar = ({ navigation, similars, similar, onSimilar }) => {
  return (
    <Card index='similar1' style={styles.similar}>
      <Text style={{ fontSize: 14, fontWeight: "bold" }}>
        Similar Listings:
      </Text>
      <View style={styles.toggleButton}>
        <TouchableOpacity key="ForSale" onPress={() => onSimilar('For Sale')}
          style={[styles.oneButton, { width: wp('30%'), backgroundColor: similar === 'For Sale' ? colors.WHITE : colors.GREY.PRIMARY }]}>
          <Text>For Sale</Text>
        </TouchableOpacity>
        <TouchableOpacity key="Sold" onPress={() => onSimilar('Sold')}
          style={[styles.oneButton, { width: wp('30%'), backgroundColor: similar === 'Sold' ? colors.WHITE : colors.GREY.PRIMARY }]}>
          <Text>Sold</Text>
        </TouchableOpacity>
        <TouchableOpacity key="Rented" onPress={() => onSimilar('Rented')}
          style={[styles.oneButton, { width: wp('30%'), backgroundColor: similar === 'Rented' ? colors.WHITE : colors.GREY.PRIMARY }]}>
          <Text>Rented</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal={true}
        // scrollEnabled={false}
        data={similars}
        renderItem={(listing) => (
          <SimilarDetail navigation={navigation} listing={listing.item} />
        )}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  similar: {
    width: "100%",
    padding: 10,
    borderBottomWidth: 0
  },
  toggleButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    width: wp('100%') - 20,
    height: 25,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: colors.GREY.PRIMARY,
    borderRadius: 5,
  },
  oneButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('50%') - 16,
    height: 20,
    backgroundColor: colors.WHITE,
    borderRadius: 2
  },
});
