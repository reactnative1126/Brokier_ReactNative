import React, { Component, Fragment } from "react";
import { Platform, StatusBar, StyleSheet, View, Text, TouchableOpacity, Modal, ActivityIndicator } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";
import { setUser, signOut } from "@modules/redux/auth/actions";
import { setLikes } from "@modules/redux/lists/actions";
import { AuthService } from "@modules/services";
import { Header, TextInput2 } from "@components";
import { colors } from "@constants/themes";
import { isEmpty, validateMobile, validateLength, generateKey } from "@utils/functions";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      broker: '',
      errorBroker: '',
      visibleBroker: false,
      phone: '',
      errorPhone: '',
      visiblePhone: false,
    };
  }

  signOut() {
    this.props.signOut();
    var likes = [];
    this.props.setLikes(likes);
    this.props.navigation.reset({ index: 1, routes: [{ name: 'App' }] });
  }

  onValidateBroker(broker) {
    this.setState({ broker }, () => {
      if (isEmpty(this.state.broker)) {
        this.setState({ errorBroker: 'Please enter brokerage name' });
      } else {
        if (!validateLength(this.state.broker, 2)) {
          this.setState({ errorBroker: 'Please enter 2+ characters' })
        } else {
          this.setState({ errorBroker: '' });
        }
      }
    })
  }

  onValidatePhone(phone) {
    this.setState({ phone }, () => {
      if (isEmpty(this.state.phone)) {
        this.setState({ errorPhone: 'Please enter phone number' });
      } else {
        if (!validateMobile(this.state.phone)) {
          this.setState({ errorPhone: 'Please enter correct number' })
        } else {
          this.setState({ errorPhone: '' });
        }
      }
    })
  }

  onPhone() {
    this.setState({ loading: true, visiblePhone: false });
    AuthService.updateUser({
      user_id: this.props.user.id,
      unique_id: this.props.user.unique_id,
      name: this.props.user.user_name,
      email: this.props.user.user_email,
      brokerage_name: this.props.user.brokerage_name,
      phone: this.state.phone,
      website: this.props.user.user_website,
      instagram_id: this.props.user.user_instagram_id,
      photo: this.props.user.user_photo,
      role: this.props.user.user_role,
    }).then((res) => {
      this.setState({ loading: false });
      if (res.count > 0) {
        this.props.setUser(res.users[0]);
      }
    }).catch((err) => {
      this.setState({ loading: false });
    });
  }

  onBroker() {
    this.setState({ loading: true, visibleBroker: false });
    AuthService.updateUser({
      user_id: this.props.user.id,
      unique_id: generateKey(16),
      name: this.props.user.user_name,
      email: this.props.user.user_email,
      brokerage_name: this.state.broker,
      phone: this.state.phone,
      website: this.props.user.user_website,
      instagram_id: this.props.user.user_instagram_id,
      photo: this.props.user.user_photo,
      role: 'agent',
    }).then((res) => {
      this.setState({ loading: false });
      if (res.count > 0) {
        this.props.setUser(res.users[0]);
        this.props.navigation.navigate('AgentUserProfile');
      }
    }).catch((err) => {
      this.setState({ loading: false });
    });
  }

  renderPhone() {
    return (
      <Modal visible={this.state.visiblePhone} animationType="none" swipeArea={50} transparent={true}>
        <View style={styles.phoneWrapper}>
          <Text style={{ marginTop: 20, fontSize: 20, fontWeight: 'bold' }}>Change Phone number</Text>
          <Text style={{ marginVertical: 10, width: '80%', textAlign: 'center' }}>Would you change Phone number?</Text>
          <TextInput2
            title="Phone Number" iconName="phone" iconType="font-awesome" iconSize={20}
            value={this.state.phone} autoCapitalize="none"
            keyboardType={'phone-pad'}
            onChangeText={(phone) => this.onValidatePhone(phone)}
          />
          <Text style={{ width: '90%', marginTop: 5, marginLeft: 100, fontSize: 12, color: colors.RED.DEFAULT }}>{this.state.errorPhone}</Text>
          <View style={styles.buttonView}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => {
              this.setState({ phone: '', errorPhone: '', visiblePhone: false })
            }}>
              <Text style={{ fontSize: 16, color: colors.WHITE, fontWeight: 'bold' }}>Discard</Text>
            </TouchableOpacity>
            <TouchableOpacity style={(!isEmpty(this.state.phone) && isEmpty(this.state.errorPhone)) ? styles.submitButton : styles.disableButton}
              disabled={isEmpty(this.state.phone) || !isEmpty(this.state.errorPhone)}
              onPress={() => this.onPhone()}
            >
              <Text style={{ fontSize: 16, color: colors.WHITE, fontWeight: 'bold' }}>Change</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.overlay} />
      </Modal>
    )
  }

  renderBroker() {
    return (<Modal visible={this.state.visibleBroker} animationType="none" swipeArea={50} transparent={true}>
      <View style={styles.brokerWrapper}>
        <Text style={{ marginTop: 20, fontSize: 20, fontWeight: 'bold' }}>Change Agent</Text>
        <Text style={{ marginVertical: 10, width: '80%', textAlign: 'center' }}>You should to add Brokerage name and Phone number</Text>
        <TextInput2
          title="Brokerage Name" iconName="user" iconType="evilicon" iconSize={20}
          value={this.state.brokerageName} secureTextEntry={false} autoCapitalize="none"
          onChangeText={(broker) => this.onValidateBroker(broker)}
        />
        <Text style={{ width: '90%', marginTop: 5, marginLeft: 100, fontSize: 12, color: colors.RED.DEFAULT }}>{this.state.errorBroker}</Text>
        <TextInput2
          title="Phone Number" iconName="phone" iconType="font-awesome" iconSize={20}
          value={this.state.phone} autoCapitalize="none"
          keyboardType={'phone-pad'}
          onChangeText={(phone) => this.onValidatePhone(phone)}
        />
        <Text style={{ width: '90%', marginTop: 5, marginLeft: 100, fontSize: 12, color: colors.RED.DEFAULT }}>{this.state.errorPhone}</Text>
        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.cancelButton} onPress={() => {
            this.setState({ broker: '', errorBroker: '', phone: '', errorPhone: '', visibleBroker: false })
          }}>
            <Text style={{ fontSize: 16, color: colors.WHITE, fontWeight: 'bold' }}>Discard</Text>
          </TouchableOpacity>
          <TouchableOpacity style={(!isEmpty(this.state.broker) && !isEmpty(this.state.phone) && isEmpty(this.state.errorBroker) && isEmpty(this.state.errorPhone)) ? styles.submitButton : styles.disableButton}
            disabled={isEmpty(this.state.broker) || isEmpty(this.state.phone) || !isEmpty(this.state.errorBroker) || !isEmpty(this.state.errorPhone)}
            onPress={() => this.onBroker()}
          >
            <Text style={{ fontSize: 16, color: colors.WHITE, fontWeight: 'bold' }}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.overlay} />
    </Modal>
    )
  }

  render() {
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <StatusBar hidden />
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
            <Text style={{ fontSize: 12, color: colors.BLACK }}>{this.props.user.user_phone}</Text>
            <TouchableOpacity onPress={() => this.setState({ phone: this.props.user.user_phone, visiblePhone: true })}>
              <Text style={{ marginLeft: 5, fontSize: 12, color: colors.BLUE.PRIMARY }}>{isEmpty(this.props.user.user_phone) ? 'Add Phone for Text notifications' : '(Edit)'}</Text>
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
        <TouchableOpacity style={{ width: wp('100%'), height: 50, flexDirection: 'row', alignItems: 'center', paddingLeft: 20, borderBottomWidth: 0.5, borderBottomColor: '#DEDEDE' }}
          onPress={() => this.props.navigation.reset({ routes: [{ name: 'Favorite' }] })}
        >
          <Icon name="search" type="font-awesome" size={15} />
          <Text style={{ marginLeft: 20, fontSize: 12 }}>Saved Searches</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: wp('100%'), height: 50, flexDirection: 'row', alignItems: 'center', paddingLeft: 20, borderBottomWidth: 0.5, borderBottomColor: '#DEDEDE' }}
          onPress={() => this.props.navigation.reset({ routes: [{ name: 'Favorite' }] })}
        >
          <Icon name="heart" type="font-awesome" size={15} />
          <Text style={{ marginLeft: 20, fontSize: 12 }}>Saved Listings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: wp('100%'), height: 50, flexDirection: 'row', alignItems: 'center', paddingLeft: 20, borderBottomWidth: 0.5, borderBottomColor: '#DEDEDE' }}
          onPress={() => {
            // alert(this.props.user.user_role)
            this.props.user.user_role == 'regular' ? this.setState({ phone: this.props.user.user_phone, visibleBroker: true }) : this.props.navigation.navigate('AgentUserProfile')
          }}>
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

        {this.renderBroker()}
        {this.renderPhone()}

        <Modal animationType="fade" transparent={true} visible={this.state.loading} >
          <View style={{ flex: 1, backgroundColor: '#00000080', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ alignItems: 'center', flexDirection: 'row', flex: 1, justifyContent: "center" }}>
              <ActivityIndicator style={{ height: 80 }} size="large" color={colors.BLACK} />
            </View>
          </View>
        </Modal>
      </KeyboardAwareScrollView>
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
  overlay: {
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: '#00000080'
  },
  brokerWrapper: {
    position: 'absolute',
    top: 50,
    left: (wp('100%') - 300) / 2,
    alignItems: 'center',
    width: 300,
    height: 340,
    // backgroundColor: colors.WHITE,
    backgroundColor: '#E3E3E3',
    borderRadius: 10,
    zIndex: 100
  },
  phoneWrapper: {
    position: 'absolute',
    top: 100,
    left: (wp('100%') - 300) / 2,
    alignItems: 'center',
    width: 300,
    height: 230,
    // backgroundColor: colors.WHITE,
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
    height: 35
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
    setUser: (data) => {
      dispatch(setUser(data))
    },
    signOut: (data) => {
      dispatch(signOut(data))
    },
    setLikes: (data) => {
      dispatch(setLikes(data));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
