import React, { Component } from "react";
import { connect } from "react-redux";
import { Platform, StatusBar, StyleSheet, View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

import { Icon } from "react-native-elements";
import {  colors } from "@constants/themes";
import { images } from "@constants/assets";
import { Loading, Header, PickerButton, PropertyQuestions, MarketSummary, MarketChart1, MarketChart2 } from "@components";

const cities = [
  { value: 0, label: 'City' },
  { value: 1, label: 'One' },
  { value: 2, label: 'Two' },
]
const communities = [
  { value: 0, label: 'Community' },
  { value: 1, label: 'One' },
  { value: 2, label: 'Two' },
]
const propertyTypes = [
  { value: 0, label: 'Property Type' },
  { value: 1, label: 'One' },
  { value: 2, label: 'Two' },
]

const questions = [
  { question: "Is this good time to sell?" },
  { question: "Where is the best neighbourhoods to buy?" },
  { question: "How can I get started to invest?" },
]

class Market extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      cityStatus: false,
      city: 'City',
      communityStatus: false,
      community: 'Community',
      propertyTypeStatus: false,
      propertyType: 'Property Type'
    };
  }

  render() {
    const { cityStatus, city, communityStatus, community, propertyTypeStatus, propertyType } = this.state;
    return (
      <View style={styles.container}>
        {/* <StatusBar hidden /> */}
        <Loading loading={this.state.loading} />
        <Header style={{ backgroundColor: colors.GREY.PRIMARY, paddingLeft: 10, paddingRight: 10, height: 100 }}>
          <View style={{ alignItems: 'center' }}>
            <Text>Filter Market Stats</Text>
            <View style={styles.topButton}>
              <TouchableOpacity style={styles.inputView} onPress={() => this.setState({ cityStatus: true })}>
                <Icon name='down' type='antdesign' size={14} color={colors.BLACK} />
                <Text style={{ fontSize: 12 }}>{city}</Text>
                <View />
              </TouchableOpacity>
              <TouchableOpacity style={styles.inputView} onPress={() => this.setState({ communityStatus: true })}>
                <Icon name='down' type='antdesign' size={14} color={colors.BLACK} />
                <Text style={{ fontSize: 12 }}>{community}</Text>
                <View />
              </TouchableOpacity>
              <TouchableOpacity style={styles.inputView} onPress={() => this.setState({ propertyTypeStatus: true })}>
                <Icon name='down' type='antdesign' size={14} color={colors.BLACK} />
                <Text style={{ fontSize: 12 }}>{propertyType}</Text>
                <View />
              </TouchableOpacity>
            </View>
          </View>
        </Header>
        <ScrollView style={styles.container}>
          <MarketSummary />
          <MarketChart1 />
          <MarketChart2 />
          <View style={{height: 10}} />
          <PropertyQuestions
            title="Ask John Doer about the market:"
            questions={questions} />
          <View style={{ height: 150 }} />
        </ScrollView>
        <View style={styles.bottomBar}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image
              style={{ width: 60, height: 60, borderRadius: 30 }}
              source={images.avatar}
            />
            <Text>John Doer</Text>
          </View>
          <View style={{ width: wp("100%") - 150, height: 80 }}>
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: 40,
                borderRadius: 5,
                backgroundColor: colors.RED.PRIMARY,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: colors.WHITE,
                }}
              >
                Questions?
              </Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 10, marginTop: 5 }}>
              Sales Representative
            </Text>
            <Text style={{ fontSize: 10 }}>
              Re/max Realty Specialists Inc. Brokerage
            </Text>
          </View>
        </View>
        {cityStatus ? <PickerButton data={cities} label={city} onSelect={(label) => this.setState({ city: label, cityStatus: false })} /> : null}
        {communityStatus ? <PickerButton data={communities} label={community} onSelect={(label) => this.setState({ community: label, communityStatus: false })} /> : null}
        {propertyTypeStatus ? <PickerButton data={propertyTypes} label={propertyType} onSelect={(label) => this.setState({ propertyType: label, propertyTypeStatus: false })} /> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE
  },
  topButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10
  },
  inputView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp('90%') / 3,
    height: 20,
    paddingLeft: 5, paddingRight: 5,
    borderRadius: 5,
    borderWidth: 0.5,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: wp("100%"),
    height: 100,
    backgroundColor: colors.GREY.PRIMARY,
    padding: 20,
  },
});

export default connect(undefined, undefined)(Market);
