import React, { Component } from "react";
import { Platform, StatusBar, StyleSheet, View, Text, TouchableOpacity, ScrollView } from "react-native";

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { connect } from "react-redux";
import { setTab } from "@modules/redux/auth/actions";
import { Loading, Header } from "@components";
import { colors } from "@constants/themes";

class AgentEditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <Loading loading={this.state.loading} />
        <Header style={{ backgroundColor: colors.GREY.PRIMARY, paddingLeft: 10, paddingRight: 10 }}>
          <View style={styles.header}>
            <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Edit Agent Profile</Text>
            </TouchableOpacity>
          </View>
        </Header>
        <ScrollView contentContainerStyle={{ width: wp('100%') }}>
          <View style={{ width: wp('100%'), padding: 20, borderBottomWidth: 0.5, borderBottomColor: '#DEDEDE' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Name:{'\n'}Francis Agent</Text>
              <View style={{ justifyContent: 'center', alignItems: 'center', width: 60, height: 60, borderRadius: 30, backgroundColor: '#C4C4C4' }}>
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: colors.BLUE.PRIMARY, textAlign: 'center' }}>Add{'\n'}Photo</Text>
              </View>
            </View>
            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Brokerage Name:</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 12 }}>Remax Realty Services </Text>
              <TouchableOpacity>
                <Text style={{ fontSize: 12, color: colors.BLUE.PRIMARY }}>(Edit)</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ width: wp('100%'), padding: 20, borderBottomWidth: 0.5, borderBottomColor: '#DEDEDE' }}>
            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Contact Details:</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 12 }}>Phone: 415-231-1234 </Text>
              <TouchableOpacity>
                <Text style={{ fontSize: 12, color: colors.BLUE.PRIMARY }}>(Edit)</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 12 }}>Email: francis@realty.com </Text>
              <TouchableOpacity>
                <Text style={{ fontSize: 12, color: colors.BLUE.PRIMARY }}>(Edit)</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 12 }}>Website: </Text>
              <TouchableOpacity>
                <Text style={{ fontSize: 12, color: colors.BLUE.PRIMARY }}>(Add)</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 12 }}>Instagram: </Text>
              <TouchableOpacity>
                <Text style={{ fontSize: 12, color: colors.BLUE.PRIMARY }}>Connect IG</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ width: wp('100%'), padding: 20, borderBottomWidth: 0.5, borderBottomColor: '#DEDEDE' }}>
            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Marketing Profile:</Text>
            <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 10 }}>Listing Service offerings:</Text>
            <View style={{ flexDirection: 'row' }}>
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
            <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 10 }}>Languages Spoken:</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 12 }}>English, French, Arabic </Text>
              <TouchableOpacity>
                <Text style={{ fontSize: 12, color: colors.BLUE.PRIMARY }}>(Edit)</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity style={styles.applyButton} onPress={() => {
          this.props.navigation.navigate('AgentViewProfile')
        }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.WHITE }}>SAVE AGENT PROFILE</Text>
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
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  linkButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('60%'),
    height: 25,
    backgroundColor: '#DC4646',
    borderRadius: 5,
  },
  applyButton: {
    alignItems: 'center',
    paddingTop: 10,
    position: 'absolute',
    bottom: 0,
    width: wp('100%'),
    height: 40,
    backgroundColor: '#DC4646'
  },
});

const mapDispatchToProps = dispatch => {
  return {
    setTab: (data) => {
      dispatch(setTab(data))
    }
  }
}

export default connect(undefined, mapDispatchToProps)(AgentEditProfile);
