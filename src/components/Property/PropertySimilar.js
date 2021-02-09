import React from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from "react-native";

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Card from '../Card/Card';
import SimilarDetail from '../Property/SimilarDetail';
import { colors } from "@constants/themes";

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
  smallDetails: {
    paddingLeft: 10,
    paddingRight: 10,
    width: "100%",
  },
  smallDetailTop: {
    flexDirection: "row",
    alignItems: "flex-end",
    width: "100%",
    height: 50,
  },
  smallStatus: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
    width: 80,
    height: 15,
    borderWidth: 0.2,
    borderColor: colors.RED.PRIMARY,
    borderRadius: 3,
  },
  smallDay: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
    width: 80,
    height: 15,
    backgroundColor: colors.GREY.PRIMARY,
    borderRadius: 3,
  },
  detailBottom: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 30,
  },
  toggleButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp('100%') - 20,
    height: 25,
    backgroundColor: colors.GREY.PRIMARY,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 5,
    paddingRight: 5
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
