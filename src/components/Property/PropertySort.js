import React from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Modal } from "react-native";

import { Icon } from "react-native-elements";
import { colors } from "@constants/themes";
import Header from '../Header/Header';

const sorts = [{ sort: "Price: Low to High" }, { sort: "New to market/ Most Recently Sold" }]

export default PropertySort = props => {
  const { sortValue, onSort, visible, onClose } = props;

  return (
    <Modal visible={visible} animationType={"slide"} position={'bottom'} swipeArea={50}>
      <Header>
        <View style={styles.header}>
          <Icon name="down" type="antdesign" size={25} onPress={onClose} />
          <View style={{ marginLeft: 5 }}>
            <Text style={{ fontWeight: 'bold' }}>{`Sort`}</Text>
          </View>
          <View style={{ width: 50 }} />
        </View>
      </Header>
      <ScrollView>
        {sorts.map((sort, key) => {
          return (
            <TouchableOpacity key={key} style={styles.item} onPress={() => onSort(key)}>
              <Text style={{ fontWeight: 'bold' }}>{sort.sort}</Text>
              <Icon name="check" type="material-community" size={25} color={sortValue == key ? colors.BLACK : colors.WHITE} />
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "center",
    marginTop: 10,
    width: "100%",
    height: 35,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.GREY.SECONDARY
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.GREY.SECONDARY
  }
});
