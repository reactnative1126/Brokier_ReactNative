import React, { Component } from "react";
import { connect } from "react-redux";
import { Platform, StatusBar, StyleSheet, View, Text, TouchableOpacity, ScrollView, Modal, ActivityIndicator } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

import styles from './AccountSettingsStyles';
import { Icon } from "react-native-elements";
import { colors } from "@constants/themes";
import { Header, PickerButton } from "@components";
import { setUser } from "@modules/redux/auth/actions";
import { isEmpty, validateEmail, validateMobile, validateLength } from "@utils/functions";

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
      speed: 'Instant',

      name: '',
      errorName: '',
      visibleName: false,
      email: '',
      errorEmail: '',
      visibleEmail: false,
      phone: '',
      errorPhone: '',
      visiblePhone: false,
    };
  }

  onValidateName(name) {
    this.setState({ name }, () => {
      if (isEmpty(this.state.name)) {
        this.setState({ errorName: 'Please enter user name' });
      } else {
        if (!validateLength(this.state.name, 2)) {
          this.setState({ errorName: 'Please enter 2+ characters' })
        } else {
          this.setState({ errorName: '' });
        }
      }
    })
  }

  onValidateEmail(email) {
    this.setState({ email }, () => {
      if (isEmpty(this.state.email)) {
        this.setState({ errorEmail: 'Please enter user email' });
      } else {
        if (!validateEmail(this.state.email)) {
          this.setState({ errorEmail: 'Please enter correct email format' })
        } else {
          this.setState({ errorEmail: '' });
        }
      }
    })
  }

  onValidatePhone(phone) {
    this.setState({ phone }, () => {
      if (isEmpty(this.state.phone)) {
        this.setState({ errorPhone: 'Please enter Phone number' });
      } else {
        if (!validateMobile(this.state.phone)) {
          this.setState({ errorPhone: 'Please enter correct phone number' });
        } else {
          this.setState({ errorPhone: '' });
        }
      }
    })
  }

  onName() {
    this.setState({ loading: true, visibleName: false });
    AuthService.updateUser({
      user_id: this.props.user.id,
      unique_id: this.props.user.unique_id,
      name: this.state.name,
      email: this.props.user.user_email,
      brokerage_name: this.props.user.brokerage_name,
      phone: this.props.user.user_phone,
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

  onEmail() {
    this.setState({ loading: true, visibleEmail: false });
    AuthService.updateUser({
      user_id: this.props.user.id,
      unique_id: this.props.user.unique_id,
      name: this.props.user.user_name,
      email: this.state.email,
      brokerage_name: this.props.user.brokerage_name,
      phone: this.props.user.user_phone,
      website: this.props.user.user_website,
      instagram_id: this.props.user.user_instagram_id,
      photo: this.props.user.user_photo,
      role: this.props.user.user_role,
      agent_unique_id: this.props.user.agent_unique_id
    }).then((res) => {
      this.setState({ loading: false });
      if (res.count > 0) {
        this.props.setUser(res.users[0]);
      }
    }).catch((err) => {
      this.setState({ loading: false });
    });
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
      agent_unique_id: this.props.user.agent_unique_id
    }).then((res) => {
      this.setState({ loading: false });
      if (res.count > 0) {
        this.props.setUser(res.users[0]);
      }
    }).catch((err) => {
      this.setState({ loading: false });
    });
  }

  renderName() {
    return (
      <Modal visible={this.state.visibleName} animationType="none" swipeArea={50} transparent={true}>
        <View style={styles.wrapper}>
          <Text style={{ marginTop: 20, fontSize: 20, fontWeight: 'bold' }}>Change User Name</Text>
          <Text style={{ marginVertical: 10, width: '80%', textAlign: 'center' }}>Would you change User Name?</Text>
          <TextInput2
            title="User Name" iconName="user" iconType="evilicon" iconSize={20}
            value={this.state.name} autoCapitalize="none"
            onChangeText={(name) => this.onValidateName(name)}
          />
          <Text style={{ width: '90%', marginTop: 5, marginLeft: 100, fontSize: 12, color: colors.RED.DEFAULT }}>{this.state.errorName}</Text>
          <View style={styles.buttonView}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => {
              this.setState({ name: '', errorName: '', visibleName: false })
            }}>
              <Text style={{ fontSize: 16, color: colors.WHITE, fontWeight: 'bold' }}>Discard</Text>
            </TouchableOpacity>
            <TouchableOpacity style={(!isEmpty(this.state.name) && isEmpty(this.state.errorName)) ? styles.submitButton : styles.disableButton}
              disabled={isEmpty(this.state.name) || !isEmpty(this.state.errorName)}
              onPress={() => this.onName()}
            >
              <Text style={{ fontSize: 16, color: colors.WHITE, fontWeight: 'bold' }}>Change</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.overlay} />
      </Modal>
    )
  }

  renderEmail() {
    return (
      <Modal visible={this.state.visibleEmail} animationType="none" swipeArea={50} transparent={true}>
        <View style={styles.wrapper}>
          <Text style={{ marginTop: 20, fontSize: 20, fontWeight: 'bold' }}>Change User Email</Text>
          <Text style={{ marginVertical: 10, width: '80%', textAlign: 'center' }}>Would you change User Email?</Text>
          <TextInput2
            title="User Email" iconName="email" iconType="fontisto" iconSize={20}
            value={this.state.email} autoCapitalize="none"
            onChangeText={(email) => this.onValidateEmail(email)}
          />
          <Text style={{ width: '90%', marginTop: 5, marginLeft: 100, fontSize: 12, color: colors.RED.DEFAULT }}>{this.state.errorEmail}</Text>
          <View style={styles.buttonView}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => {
              this.setState({ email: '', errorEmail: '', visibleEmail: false })
            }}>
              <Text style={{ fontSize: 16, color: colors.WHITE, fontWeight: 'bold' }}>Discard</Text>
            </TouchableOpacity>
            <TouchableOpacity style={(!isEmpty(this.state.email) && isEmpty(this.state.errorEmail)) ? styles.submitButton : styles.disableButton}
              disabled={isEmpty(this.state.email) || !isEmpty(this.state.errorEmail)}
              onPress={() => this.onEmail()}
            >
              <Text style={{ fontSize: 16, color: colors.WHITE, fontWeight: 'bold' }}>Change</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.overlay} />
      </Modal>
    )
  }

  renderPhone() {
    return (
      <Modal visible={this.state.visiblePhone} animationType="none" swipeArea={50} transparent={true}>
        <View style={styles.wrapper}>
          <Text style={{ marginTop: 20, fontSize: 20, fontWeight: 'bold' }}>Change User Phone number</Text>
          <Text style={{ marginVertical: 10, width: '80%', textAlign: 'center' }}>Would you change Phone number?</Text>
          <TextInput2
            title="Phone number" iconName="phone" iconType="font-awesome" iconSize={20}
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

  render() {
    const { appNotification, emailNotification, textNotification, speedStatus, speed } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <Header style={{ backgroundColor: colors.GREY.PRIMARY, paddingLeft: 10, paddingRight: 10 }}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{`Account Settings`}</Text>
            </TouchableOpacity>
          </View>
        </Header>
        <ScrollView contentContainerStyle={{ width: wp('100%') }}>
          <View style={styles.view1}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontWeight: 'bold' }}>{`Name: `}</Text>
              <Text>{this.props.user.user_name}</Text>
            </View>
            <TouchableOpacity onPress={() => this.setState({ name: this.props.user.user_name, visibleName: true })}>
              <Text style={{ fontWeight: 'bold', color: colors.BLUE.PRIMARY }}>{`Edit`}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.view1}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontWeight: 'bold' }}>{`Email: `}</Text>
              <Text>{this.props.user.user_email}</Text>
            </View>
            <TouchableOpacity onPress={() => this.setState({ email: this.props.user.user_email, visibleEmail: true })}>
              <Text style={{ fontWeight: 'bold', color: colors.BLUE.PRIMARY }}>{`Edit`}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.view1}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontWeight: 'bold' }}>{`Phone: `}</Text>
              <Text>{this.props.user.user_phone}</Text>
            </View>
            <TouchableOpacity onPress={() => this.setState({ phone: this.props.user.user_phone, visiblePhone: true })}>
              <Text style={{ fontWeight: 'bold', color: colors.BLUE.PRIMARY }}>{`Edit`}</Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: wp('100%'), height: 50, justifyContent: 'center', alignItems: 'center', paddingLeft: 20, paddingRight: 20, borderBottomWidth: 0.5, borderBottomColor: '#DEDEDE' }}>
            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', width: 170, height: 25, borderRadius: 3, borderWidth: 0.5, borderColor: '#898989' }}>
              <Text style={{ fontWeight: 'bold', color: colors.BLUE.PRIMARY }}>{`Change Password`}</Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: wp('100%'), alignItems: 'center', marginTop: 40 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', height: 25 }}>
              <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 5, width: 150 }}>{`Notifications:`}</Text>
              <View style={{ width: 100, alignItems: 'center' }} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', height: 25 }}>
              <Text style={{ fontSize: 12, width: 150 }}>{`App Notifications`}</Text>
              <View style={{ width: 100, alignItems: 'center' }}>
                <TouchableOpacity onPress={() => this.setState({ appNotification: !appNotification })}>
                  <Icon name={!appNotification ? "checkbox-blank-outline" : "close-box"} type="material-community" size={20} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 12, width: 150 }}>{`Email Notifications`}</Text>
              <View style={{ width: 100, alignItems: 'center' }}>
                <TouchableOpacity onPress={() => this.setState({ emailNotification: !emailNotification })}>
                  <Icon name={!emailNotification ? "checkbox-blank-outline" : "close-box"} type="material-community" size={20} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 12, width: 150 }}>{`Text Notifications`}</Text>
              <View style={{ width: 100, alignItems: 'center' }}>
                <TouchableOpacity onPress={() => this.setState({ textNotification: !textNotification })}>
                  <Icon name={!textNotification ? "checkbox-blank-outline" : "close-box"} type="material-community" size={20} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', height: 25 }}>
              <Text style={{ fontSize: 12, width: 150 }}>{`Alert Speed`}</Text>
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
        {this.renderName()}
        {this.renderEmail()}
        {this.renderPhone()}

        <Modal animationType="fade" transparent={true} visible={this.state.loading} >
          <View style={{ flex: 1, backgroundColor: '#00000080', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ alignItems: 'center', flexDirection: 'row', flex: 1, justifyContent: "center" }}>
              <ActivityIndicator style={{ height: 80 }} size="large" color={colors.BLACK} />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettings);
