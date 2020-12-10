import React, { Component } from "react";
import { Platform, StatusBar, StyleSheet, View, Text, TouchableOpacity, ScrollView, Image } from "react-native";

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";
import { Loading, Header } from "@components";
import { colors } from "@constants/themes";
import { images } from "@constants/assets";

class AgentViewProfile extends Component {
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
        <Header style={{ justifyContent: 'center', height: 120, backgroundColor: colors.GREY.PRIMARY, paddingLeft: 10, paddingRight: 10 }}>
          <View style={styles.header}>
            <Image
              style={{ width: 70, height: 70, borderRadius: 35 }}
              source={images.avatar}
            />
            <View style={{ marginLeft: 10, width: 200 }}>
              <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Name:{'\n'}Francis Agent</Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 12 }}>Remax Realty Services</Text>
            </View>
          </View>
        </Header>
        <ScrollView contentContainerStyle={{ width: wp('100%') }}>
          <View style={{ width: wp('100%'), flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingTop: 20, paddingLeft: 60, paddingRight: 60, paddingBottom: 20 }}>
            <TouchableOpacity style={styles.button}>
              <Icon name="local-phone" type="material" size={30} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { borderWidth: 0 }]}>
              <Icon name="email" type="fontisto" size={30} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { borderWidth: 0 }]}>
              <Icon name="earth" type="antdesign" size={30} />
            </TouchableOpacity>
          </View>
          <View style={{ width: wp('100%'), alignItems: 'center', paddingLeft: 40, paddingRight: 40, paddingBottom: 20, borderBottomWidth: 0.5, borderBottomColor: '#DEDEDE' }}>
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
          <View style={{ width: wp('100%'), paddingTop: 10, paddingLeft: 40, paddingRight: 40, paddingBottom: 20, borderBottomWidth: 0.5, borderBottomColor: '#DEDEDE' }}>
            <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Why Work With Francis DoAer</Text>
            <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 10 }}>Listing Service offerings:</Text>
            <Text style={{ fontSize: 12 }}>1% full service listings with free staging consultation, 3D virtual Tours</Text>
            <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 10 }}>Buyer Service offerings:</Text>
            <Text style={{ fontSize: 12 }}>Offers 50% of agents commission as cash back</Text>
            <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 10 }}>Area of specialty:</Text>
            <Text style={{ fontSize: 12 }}>#1 agent in remax office 2017, 2018</Text>
            <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 10 }}>Languages Spoken:</Text>
            <Text style={{ fontSize: 12 }}>English, French, Arabic</Text>
          </View>
          <View style={{ width: wp('100%'), alignItems: 'center', paddingTop: 20, paddingBottom: 20, paddingLeft: 40, paddingRight: 40, borderBottomWidth: 0.5, borderBottomColor: '#DEDEDE' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 20, }}>Francis Instagram</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: wp('80%') }}>
              <Image source={images.instagram1} style={{width: wp('25%'), height: wp('25%')}} />
              <Image source={images.instagram2} style={{width: wp('25%'), height: wp('25%')}} />
              <Image source={images.instagram3} style={{width: wp('25%'), height: wp('25%')}} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: wp('80%'), marginTop: 5 }}>
              <Image source={images.instagram4} style={{width: wp('25%'), height: wp('25%')}} />
              <Image source={images.instagram5} style={{width: wp('25%'), height: wp('25%')}} />
              <Image source={images.instagram6} style={{width: wp('25%'), height: wp('25%')}} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: wp('80%'), marginTop: 5 }}>
              <Image source={images.instagram7} style={{width: wp('25%'), height: wp('25%')}} />
              <Image source={images.instagram8} style={{width: wp('25%'), height: wp('25%')}} />
              <Image source={images.instagram9} style={{width: wp('25%'), height: wp('25%')}} />
            </View>
          </View>
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
    justifyContent: 'space-around',
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

export default connect(undefined, undefined)(AgentViewProfile);
