import React, { Component } from "react";
import { Platform, StatusBar, StyleSheet, View, Text, TouchableOpacity, ScrollView } from "react-native";

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";
import { setTab, signOut } from "@modules/redux/auth/actions";
import { setLikes } from "@modules/redux/lists/actions";
import { Loading, Header } from "@components";
import { colors } from "@constants/themes";

class AgentUserProfile extends Component {
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
            <View style={{ marginLeft: 10 }}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Francis Agent</Text>
              </TouchableOpacity>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 12 }}>Re/Max Realty Inc. Brokerage</Text>
                <TouchableOpacity onPress={() => {
                  // this.props.setTab(false);
                  this.props.navigation.navigate('AgentEditProfile');
                }}>
                  <Text style={{ marginLeft: 5, fontSize: 12, color: colors.BLUE.PRIMARY }}>(Edit)</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: '#C4C4C4', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 12, fontWeight: 'bold', color: colors.BLUE.PRIMARY, textAlign: 'center' }}>Add{'\n'}Photo</Text>
            </View>
          </View>
        </Header>
        <ScrollView contentContainerStyle={{ width: wp('100%') }}>
          <View style={{ width: wp('100%'), padding: 20, borderBottomWidth: 0.5, borderBottomColor: '#DEDEDE' }}>
            <Text style={{ fontSize: 10 }}>Share your unique Brokier Profile Link and new users using your link to download this app will become your connections. Your connections will see your image on listings and all book a viewing requests are ONLY sent to you.</Text>
            <View style={{ width: '100%', alignItems: 'center', marginTop: 10 }}>
              <TouchableOpacity style={styles.linkButton}>
                <Text style={{ fontWeight: 'bold', color: colors.WHITE }}>Share My Unique Link</Text>
              </TouchableOpacity>
            </View>
            <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 20 }}>Contact Details:</Text>
            <Text style={{ fontSize: 12 }}>Phone: 415-231-1234</Text>
            <Text style={{ fontSize: 12 }}>Email: francis@realty.com</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 12 }}>Website: </Text>
              <TouchableOpacity>
                <Text style={{ fontSize: 12, color: colors.BLUE.PRIMARY }}>(Add)</Text>
              </TouchableOpacity>
            </View>
            <Text style={{ fontSize: 12 }}>Instagram: francistheagent</Text>
            <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 10 }}>Marketing Profile:</Text>
            <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 10 }}>Listing Service offerings:</Text>
            <View style={{ fontSize: 12, flexDirection: 'row' }}>
              <Text style={{ fontSize: 12, width: 250 }}>1% full service listings with free staging consultation, 3D virtual Tours. </Text>
              <TouchableOpacity>
                <Text style={{ fontSize: 12, color: colors.BLUE.PRIMARY }}>{'\n'}(Edit)</Text>
              </TouchableOpacity>
            </View>
            <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 10 }}>Buyer Service offerings:</Text>
            <Text style={{ fontSize: 12 }}>Offers 50% of agents commission as cash back </Text>
            <TouchableOpacity>
              <Text style={{ fontSize: 12, color: colors.BLUE.PRIMARY }}>(Edit)</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 10 }}>Area of specialty:</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 12 }}>Chesterfield and Surounding areas </Text>
              <TouchableOpacity>
                <Text style={{ fontSize: 12, color: colors.BLUE.PRIMARY }}>(Edit)</Text>
              </TouchableOpacity>
            </View>
            <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 10 }}>Designations:</Text>
            <TouchableOpacity>
              <Text style={{ fontSize: 12, color: colors.BLUE.PRIMARY }}>Add Designations to stand out</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 10 }}>Awards and Achievements:</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 12 }}>#1 agent in remax office 2017, 2018 </Text>
              <TouchableOpacity>
                <Text style={{ fontSize: 12, color: colors.BLUE.PRIMARY }}>(Edit)</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={{ width: wp('100%'), height: 50, flexDirection: 'row', alignItems: 'center', paddingLeft: 20, borderBottomWidth: 0.5, borderBottomColor: '#DEDEDE' }}>
            <Icon name="hand-holding" type="font-awesome-5" size={15} />
            <Text style={{ marginLeft: 20, fontSize: 12 }}>Edit Profile and Marketing Details</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ width: wp('100%'), height: 50, flexDirection: 'row', alignItems: 'center', paddingLeft: 20, borderBottomWidth: 0.5, borderBottomColor: '#DEDEDE' }}>
            <Icon name="search" type="font-awesome" size={15} />
            <Text style={{ marginLeft: 20, fontSize: 12 }}>Saved Searches</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ width: wp('100%'), height: 50, flexDirection: 'row', alignItems: 'center', paddingLeft: 20, borderBottomWidth: 0.5, borderBottomColor: '#DEDEDE' }}>
            <Icon name="heart" type="font-awesome" size={15} />
            <Text style={{ marginLeft: 20, fontSize: 12 }}>Saved Listings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ width: wp('100%'), height: 50, flexDirection: 'row', alignItems: 'center', paddingLeft: 20, borderBottomWidth: 0.5, borderBottomColor: '#DEDEDE' }}>
            <Icon name="users" type="font-awesome" size={15} />
            <Text style={{ marginLeft: 20, fontSize: 12 }}>Referred Connections</Text>
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
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: -10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  linkButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('60%'),
    height: 25,
    backgroundColor: '#DC4646',
    borderRadius: 5,
  }
});
const mapDispatchToProps = dispatch => {
  return {
    setTab: (data) => {
      dispatch(setTab(data))
    },
    signOut: (data) => {
      dispatch(signOut(data))
    },
    setLikes: (data) => {
      dispatch(setLikes(data));
    }
  }
}

export default connect(undefined, mapDispatchToProps)(AgentUserProfile);
