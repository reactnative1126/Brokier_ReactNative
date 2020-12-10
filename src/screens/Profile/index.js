import React, { Component } from "react";
import { Platform, StatusBar, StyleSheet, View, Text, TouchableOpacity } from "react-native";

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";
import { signOut } from "@modules/redux/auth/actions";
import { setLikes } from "@modules/redux/lists/actions";
import { Loading, Header } from "@components";
import { colors } from "@constants/themes";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  signOut() {
    this.props.signOut();
    var likes = [];
    this.props.setLikes(likes);
    this.props.navigation.reset({
      index: 1,
      routes: [
        { name: 'App' }
      ]
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <Loading loading={this.state.loading} />
        <Header style={{ backgroundColor: colors.GREY.PRIMARY, paddingLeft: 10, paddingRight: 10 }}>
          <View style={styles.header}>
            <Text style={{ marginLeft: 10, fontSize: 18, fontWeight: 'bold' }}>{this.props.user.user_name}</Text>
            <TouchableOpacity>
              <Text style={{ marginLeft: 5, fontSize: 14, fontWeight: 'bold', color: colors.BLUE.PRIMARY }}>Edit</Text>
            </TouchableOpacity>
          </View>
        </Header>
        <View style={{ width: wp('100%'), justifyContent: 'center', padding: 20, borderBottomWidth: 0.5, borderBottomColor: '#DEDEDE' }}>
          <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Contact Details:</Text>
          <Text style={{ fontSize: 12 }}>Email: {this.props.user.user_email}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 12 }}>Phone: </Text>
            <TouchableOpacity>
              <Text style={{ fontSize: 12, color: colors.BLUE.PRIMARY }}>Add Phone for Text notifications</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <Text style={{ fontSize: 12, color: colors.BLUE.PRIMARY }}>Edit Info</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{ width: wp('100%'), height: 50, flexDirection: 'row', alignItems: 'center', paddingLeft: 20, borderBottomWidth: 0.5, borderBottomColor: '#DEDEDE' }}>
          <Icon name="calendar" type="font-awesome" size={15} />
          <Text style={{ marginLeft: 20, fontSize: 12 }}>Selected Book a Viewing listings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: wp('100%'), height: 50, flexDirection: 'row', alignItems: 'center', paddingLeft: 20, borderBottomWidth: 0.5, borderBottomColor: '#DEDEDE' }}>
          <Icon name="search" type="font-awesome" size={15} />
          <Text style={{ marginLeft: 20, fontSize: 12 }}>Saved Searches</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: wp('100%'), height: 50, flexDirection: 'row', alignItems: 'center', paddingLeft: 20, borderBottomWidth: 0.5, borderBottomColor: '#DEDEDE' }}>
          <Icon name="heart" type="font-awesome" size={15} />
          <Text style={{ marginLeft: 20, fontSize: 12 }}>Saved Listings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: wp('100%'), height: 50, flexDirection: 'row', alignItems: 'center', paddingLeft: 20, borderBottomWidth: 0.5, borderBottomColor: '#DEDEDE' }}
          onPress={() => this.props.navigation.navigate('AgentUserProfile')}>
          <Icon name="user-secret" type="font-awesome" size={15} />
          <Text style={{ marginLeft: 20, fontSize: 12 }}>I'm an Agent: build profile for clients and Marketing</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: wp('100%'), height: 50, flexDirection: 'row', alignItems: 'center', paddingLeft: 20, borderBottomWidth: 0.5, borderBottomColor: '#DEDEDE' }}
          onPress={() => this.props.navigation.navigate('AccountSettings')}>
          <Icon name="settings" type="feather" size={15} />
          <Text style={{ marginLeft: 20, fontSize: 12 }}>Settings and Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: wp('100%'), height: 50, flexDirection: 'row', alignItems: 'center', paddingLeft: 20, borderBottomWidth: 0.5, borderBottomColor: '#DEDEDE' }}
          onPress={() => this.signOut()}>
          <Icon name="logout" type="material-community" size={15} />
          <Text style={{ marginLeft: 20, fontSize: 12 }}>Log Out</Text>
        </TouchableOpacity>
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
    alignItems: 'flex-end'
  },
});

const mapStateToProps = state => {
  return {
    logged: state.auth.logged,
    user: state.auth.user_info
  }
}
const mapDispatchToProps = dispatch => {
  return {
    signOut: (data) => {
      dispatch(signOut(data))
    },
    setLikes: (data) => {
      dispatch(setLikes(data));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
