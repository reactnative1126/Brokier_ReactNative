import React, { Component } from "react";
import { Platform, StatusBar, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Grid from 'react-native-infinite-scroll-grid';

import { Icon } from "react-native-elements";
import { connect } from "react-redux";
import { Header } from "@components";
import { colors } from "@constants/themes";
import { setUser } from "@modules/redux/auth/actions";

class ReferredConnections extends Component {
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
        <Header style={{ justifyContent: 'center', height: 90, backgroundColor: colors.GREY.PRIMARY, paddingLeft: 10, paddingRight: 10 }}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Connected Users</Text>
            </TouchableOpacity>
          </View>
        </Header>
        <Grid
          data={this.props.route.params.params}
          renderItem={(user) => (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: wp('100%'), paddingHorizontal: 20, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
              <View style={{ width: wp('50%') }}>
                <Text >{user.item.user_name}</Text>
                <Text>{user.item.user_email}</Text>
              </View>
              <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 5, alignItems: 'center', width: 150, height: 30, borderWidth: 1, borderColor: '#888', borderRadius: 3, backgroundColor: '#EBEBEB' }}
                onPress={() => this.props.navigation.navigate('BookedViewings', { userId: user.item.id, userName: user.item.user_name, agentId: user.item.agent_unique_id })}
              >
                <Icon type='material-community' name='calendar-month-outline' size={20} color='black' />
                <Text>Booked Viewings</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
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
  },
  overlay: {
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: '#00000080'
  },
  wrapper: {
    position: 'absolute',
    top: (hp('100%') - 400) / 2,
    left: (wp('100%') - 300) / 2,
    alignItems: 'center',
    width: 300,
    height: 240,
    backgroundColor: '#E3E3E3',
    borderRadius: 10,
    zIndex: 100
  },
  buttonView: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 35,
  },
  cancelButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: 35,
    backgroundColor: colors.RED.PRIMARY,
    borderBottomLeftRadius: 10,
  },
  submitButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: 35,
    backgroundColor: colors.BLUE.PRIMARY,
    borderBottomRightRadius: 10
  },
  disableButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: 35,
    backgroundColor: '#0072DC80',
    borderBottomRightRadius: 10
  }
});

const mapStateToProps = state => {
  return {
    logged: state.auth.logged,
    user: state.auth.user_info
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setUser: (data) => dispatch(setUser(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReferredConnections);
