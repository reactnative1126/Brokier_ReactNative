import React, { Component } from "react";
import { Platform, StatusBar, StyleSheet, View, Text, TouchableOpacity, ScrollView } from "react-native";

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";
import { Loading, Header, PickerButton } from "@components";
import { colors } from "@constants/themes";

const speeds = [
  { value: 0, label: 'Instant' },
  { value: 1, label: 'Fast' },
  { value: 2, label: 'Slow' },
]

class AccountSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      appNotification: false,
      emailNotification: false,
      textNotification: false,
      speedStatus: false,
      speed: 'Instant'
    };
  }

  render() {
    const { appNotification, emailNotification, textNotification, speedStatus, speed } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <Loading loading={this.state.loading} />
        <Header style={{ backgroundColor: colors.GREY.PRIMARY, paddingLeft: 10, paddingRight: 10 }}>
          <View style={styles.header}>
            <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Account Settings</Text>
            </TouchableOpacity>
          </View>
        </Header>
        <ScrollView contentContainerStyle={{ width: wp('100%') }}>
          <View style={{ width: wp('100%'), height: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 20, paddingRight: 20, borderBottomWidth: 0.5, borderBottomColor: '#DEDEDE' }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontWeight: 'bold' }}>Name: </Text>
              <Text>Joseph Cildman</Text>
            </View>
            <TouchableOpacity>
              <Text style={{ fontWeight: 'bold', color: colors.BLUE.PRIMARY }}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: wp('100%'), height: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 20, paddingRight: 20, borderBottomWidth: 0.5, borderBottomColor: '#DEDEDE' }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontWeight: 'bold' }}>Email: </Text>
              <Text>Ben@email.com</Text>
            </View>
            <TouchableOpacity>
              <Text style={{ fontWeight: 'bold', color: colors.BLUE.PRIMARY }}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: wp('100%'), height: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 20, paddingRight: 20, borderBottomWidth: 0.5, borderBottomColor: '#DEDEDE' }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontWeight: 'bold' }}>Phone: </Text>
              <Text>142-402-2314</Text>
            </View>
            <TouchableOpacity>
              <Text style={{ fontWeight: 'bold', color: colors.BLUE.PRIMARY }}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: wp('100%'), height: 50, justifyContent: 'center', alignItems: 'center', paddingLeft: 20, paddingRight: 20, borderBottomWidth: 0.5, borderBottomColor: '#DEDEDE' }}>
            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', width: 170, height: 25, borderRadius: 3, borderWidth: 0.5, borderColor: '#898989' }}>
              <Text style={{ fontWeight: 'bold', color: colors.BLUE.PRIMARY }}>Change Password</Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: wp('100%'), alignItems: 'center', marginTop: 40 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', height: 25 }}>
              <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 5, width: 150 }}>Notifications:</Text>
              <View style={{ width: 100, alignItems: 'center' }} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', height: 25 }}>
              <Text style={{ fontSize: 12, width: 150 }}>App Notifications</Text>
              <View style={{ width: 100, alignItems: 'center' }}>
                <TouchableOpacity onPress={() => this.setState({ appNotification: !appNotification })}>
                  <Icon name={!appNotification ? "checkbox-blank-outline" : "close-box"} type="material-community" size={20} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 12, width: 150 }}>Email Notifications</Text>
              <View style={{ width: 100, alignItems: 'center' }}>
                <TouchableOpacity onPress={() => this.setState({ emailNotification: !emailNotification })}>
                  <Icon name={!emailNotification ? "checkbox-blank-outline" : "close-box"} type="material-community" size={20} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 12, width: 150 }}>Text Notifications</Text>
              <View style={{ width: 100, alignItems: 'center' }}>
                <TouchableOpacity onPress={() => this.setState({ textNotification: !textNotification })}>
                  <Icon name={!textNotification ? "checkbox-blank-outline" : "close-box"} type="material-community" size={20} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', height: 25 }}>
              <Text style={{ fontSize: 12, width: 150 }}>Alert Speed</Text>
              <View style={{ width: 100, alignItems: 'center' }}>
                <TouchableOpacity style={styles.inputView} onPress={() => this.setState({ speedStatus: true })}>
                  <View />
                  <Text style={{ fontSize: 12 }}>{speed}</Text>
                  <Icon name='down' type='antdesign' size={14} color={colors.BLACK} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
        {speedStatus ? <PickerButton data={speeds} label={speed} onSelect={(label) => this.setState({ speed: label, speedStatus: false })} /> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end'
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

export default connect(undefined, undefined)(AccountSettings);
