import React, { Component } from "react";
import { connect } from "react-redux";
import { Platform, StatusBar, StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

import styles from './styles';
import { colors } from "@constants/themes";
import { images } from "@constants/assets";
import { Loading, Header, PaymentCalculator, MortgageRates, PickerButton } from "@components";

const purposes = [
  { value: 0, label: 'Purpose' },
  { value: 1, label: 'One' },
  { value: 2, label: 'Two' },
]
const terms = [
  { value: 0, label: 'Term' },
  { value: 1, label: 'One' },
  { value: 2, label: 'Two' },
]
const types = [
  { value: 0, label: 'Type' },
  { value: 1, label: 'One' },
  { value: 2, label: 'Two' },
]
const deposits = [
  { value: 0, label: 'Deposit' },
  { value: 1, label: 'One' },
  { value: 2, label: 'Two' },
]

class Mortgage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      tab: 'Payment Calculator',

      purposeStatus: false,
      purpose: 'Purpose',
      termStatus: false,
      term: 'Term',
      typeStatus: false,
      type: 'Type',
      depositStatus: false,
      deposit: 'Deposit'
    };
  }

  render() {
    const { tab, purposeStatus, purpose, termStatus, term, typeStatus, type, depositStatus, deposit } = this.state;
    return (
      <View style={styles.container}>
        <Loading loading={this.state.loading} />
        <Header style={{ backgroundColor: colors.GREY.PRIMARY, paddingLeft: 10, paddingRight: 10 }}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => this.setState({ tab: 'Payment Calculator' })}
              style={[styles.oneButton, { width: wp('48%'), backgroundColor: tab === 'Payment Calculator' ? colors.WHITE : colors.GREY.PRIMARY }]}>
              <Text>{`Payment Calculator`}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({ tab: 'Mortgage Rates' })}
              style={[styles.oneButton, { width: wp('48%'), backgroundColor: tab === 'Mortgage Rates' ? colors.WHITE : colors.GREY.PRIMARY }]}>
              <Text>{`Mortgage Rates`}</Text>
            </TouchableOpacity>
          </View>
        </Header>
        <View style={styles.container}>
          {tab === 'Payment Calculator' ?
            <PaymentCalculator
              purpose={purpose}
              purposeStatus={() => this.setState({ purposeStatus: true })}
              term={term}
              termStatus={() => this.setState({ termStatus: true })}
              type={type}
              typeStatus={() => this.setState({ typeStatus: true })}
              deposit={deposit}
              depositStatus={() => this.setState({ depositStatus: true })}
            /> : <MortgageRates />}
        </View>
        <View style={styles.bottomBar}>
          <Image
            style={{ width: 60, height: 60, borderRadius: 30 }}
            source={images.avatar}
          />
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: wp('100%') - 130,
              height: 30,
              borderRadius: 5,
              backgroundColor: colors.RED.PRIMARY,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: "bold",
                color: colors.WHITE,
              }}
            >
              {`Get Pre-Qualified For a Mortgage`}
            </Text>
          </TouchableOpacity>
        </View>

        {purposeStatus ? <PickerButton data={purposes} label={purpose} onSelect={(label) => this.setState({ purpose: label, purposeStatus: false })} /> : null}
        {termStatus ? <PickerButton data={terms} label={term} onSelect={(label) => this.setState({ term: label, termStatus: false })} /> : null}
        {typeStatus ? <PickerButton data={types} label={type} onSelect={(label) => this.setState({ type: label, typeStatus: false })} /> : null}
        {depositStatus ? <PickerButton data={deposits} label={deposit} onSelect={(label) => this.setState({ deposit: label, depositStatus: false })} /> : null}
      </View>
    );
  }
}

export default connect(undefined, undefined)(Mortgage);
