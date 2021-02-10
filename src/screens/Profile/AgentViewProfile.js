import React, { Component } from "react";
import { Platform, StatusBar, StyleSheet, View, Text, TouchableOpacity, ScrollView, Image, Modal, ActivityIndicator } from "react-native";

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";
import { Loading, Header } from "@components";
import { colors } from "@constants/themes";
import { images } from "@constants/assets";
import { setUser, signOut } from "@modules/redux/auth/actions";
import { AuthService } from "@modules/services";
import { isEmpty, validateMobile, validateEmail, validateLength } from "@utils/functions";
import configs from "@constants/configs";

class AgentViewProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,

      phone: '',
      errorPhone: '',
      visiblePhone: false,
      email: '',
      errorEmail: '',
      visibleEmail: false,

      website: '',
      errorWebsite: '',
      visibleWebsite: false,
      instagram: '',
      errorInstagram: '',
      visibleInstagram: false,
    };
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

  onValidateWebsite(website) {
    this.setState({ website }, () => {
      if (isEmpty(this.state.website)) {
        this.setState({ errorWebsite: 'Please enter website url' });
      } else {
        if (!validateLength(this.state.website, 6)) {
          this.setState({ errorWebsite: 'ex: https://xxx.com' })
        } else {
          this.setState({ errorWebsite: '' });
        }
      }
    })
  }

  onValidateInstagram(instagram) {
    this.setState({ instagram }, () => {
      if (isEmpty(this.state.instagram)) {
        this.setState({ errorInstagram: 'Please enter instagram id' });
      } else {
        if (!validateLength(this.state.instagram, 2)) {
          this.setState({ errorInstagram: 'Please enter 2+ characters' })
        } else {
          this.setState({ errorInstagram: '' });
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
    }).then((res) => {
      this.setState({ loading: false });
      if (res.count > 0) {
        this.props.setUser(res.users[0]);
      }
    }).catch((err) => {
      this.setState({ loading: false });
    });
  }

  onWebsite() {
    this.setState({ loading: true, visibleWebsite: false });
    AuthService.updateUser({
      user_id: this.props.user.id,
      unique_id: this.props.user.unique_id,
      name: this.props.user.user_name,
      email: this.props.user.user_email,
      brokerage_name: this.props.user.brokerage_name,
      phone: this.props.user.user_phone,
      website: this.state.website,
      instagram_id: this.props.user.user_instagram_id,
      photo: this.props.user.user_photo,
      role: this.props.user.user_role
    }).then((res) => {
      this.setState({ loading: false });
      if (res.count > 0) {
        this.props.setUser(res.users[0]);
      }
    }).catch((err) => {
      this.setState({ loading: false });
    });
  }

  onInstagram() {
    this.setState({ loading: true, visibleInstagram: false });
    AuthService.updateUser({
      user_id: this.props.user.id,
      unique_id: this.props.user.unique_id,
      name: this.props.user.user_name,
      email: this.props.user.user_email,
      brokerage_name: this.props.user.brokerage_name,
      phone: this.props.user.user_phone,
      website: this.props.user.user_website,
      instagram_id: this.state.instagram,
      photo: this.props.user.user_photo,
      role: this.props.user.user_role
    }).then((res) => {
      this.setState({ loading: false });
      if (res.count > 0) {
        this.props.setUser(res.users[0]);
      }
    }).catch((err) => {
      this.setState({ loading: false });
    });
  }

  renderPhone() {
    return (
      <Modal visible={this.state.visiblePhone} animationType="none" swipeArea={50} transparent={true}>
        <View style={styles.wrapper}>
          <Text style={{ marginTop: 20, fontSize: 20, fontWeight: 'bold' }}>Change User Phone number</Text>
          <Text style={{ marginTop: 20, marginBottom: 20, width: '80%', textAlign: 'center' }}>Would you change User Phone number?</Text>
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

  renderEmail() {
    return (
      <Modal visible={this.state.visibleEmail} animationType="none" swipeArea={50} transparent={true}>
        <View style={styles.wrapper}>
          <Text style={{ marginTop: 20, fontSize: 20, fontWeight: 'bold' }}>Change User Email</Text>
          <Text style={{ marginTop: 20, marginBottom: 20, width: '80%', textAlign: 'center' }}>Would you change User Email?</Text>
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

  renderWebsite() {
    return (
      <Modal visible={this.state.visibleWebsite} animationType="none" swipeArea={50} transparent={true}>
        <View style={styles.wrapper}>
          <Text style={{ marginTop: 20, fontSize: 20, fontWeight: 'bold' }}>Change Website</Text>
          <Text style={{ marginTop: 20, marginBottom: 20, width: '80%', textAlign: 'center' }}>Would you change Website?</Text>
          <TextInput2
            title="Website URL" iconName="web" iconType="material-community" iconSize={20}
            value={this.state.website} autoCapitalize="none"
            onChangeText={(website) => this.onValidateWebsite(website)}
          />
          <Text style={{ width: '90%', marginTop: 5, marginLeft: 100, fontSize: 12, color: colors.RED.DEFAULT }}>{this.state.errorWebsite}</Text>
          <View style={styles.buttonView}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => {
              this.setState({ website: '', errorWebsite: '', visibleWebsite: false })
            }}>
              <Text style={{ fontSize: 16, color: colors.WHITE, fontWeight: 'bold' }}>Discard</Text>
            </TouchableOpacity>
            <TouchableOpacity style={(!isEmpty(this.state.website) && isEmpty(this.state.errorWebsite)) ? styles.submitButton : styles.disableButton}
              disabled={isEmpty(this.state.website) || !isEmpty(this.state.errorWebsite)}
              onPress={() => this.onWebsite()}
            >
              <Text style={{ fontSize: 16, color: colors.WHITE, fontWeight: 'bold' }}>Change</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.overlay} />
      </Modal>
    )
  }

  renderInstagram() {
    return (
      <Modal visible={this.state.visibleInstagram} animationType="none" swipeArea={50} transparent={true}>
        <View style={styles.wrapper}>
          <Text style={{ marginTop: 20, fontSize: 20, fontWeight: 'bold' }}>Change Instagram Id</Text>
          <Text style={{ marginTop: 20, marginBottom: 20, width: '80%', textAlign: 'center' }}>Would you change Instagram Id?</Text>
          <TextInput2
            title="Instagram Id" iconName="instagram" iconType="font-awesome" iconSize={20}
            value={this.state.instagram} autoCapitalize="none"
            onChangeText={(instagram) => this.onValidateInstagram(instagram)}
          />
          <Text style={{ width: '90%', marginTop: 5, marginLeft: 100, fontSize: 12, color: colors.RED.DEFAULT }}>{this.state.errorInstagram}</Text>
          <View style={styles.buttonView}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => {
              this.setState({ instagram: '', errorInstagram: '', visibleInstagram: false })
            }}>
              <Text style={{ fontSize: 16, color: colors.WHITE, fontWeight: 'bold' }}>Discard</Text>
            </TouchableOpacity>
            <TouchableOpacity style={(!isEmpty(this.state.instagram) && isEmpty(this.state.errorInstagram)) ? styles.submitButton : styles.disableButton}
              disabled={isEmpty(this.state.instagram) || !isEmpty(this.state.errorInstagram)}
              onPress={() => this.onInstagram()}
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
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <Header style={{ justifyContent: 'center', height: 120, backgroundColor: colors.GREY.PRIMARY, paddingLeft: 10, paddingRight: 10 }}>
          <View style={styles.header}>
            <Image
              style={{ width: 70, height: 70, borderRadius: 35 }}
              source={isEmpty(this.props.user.user_photo) ? images.avatar : {uri: configs.avatarURL + this.props.user.user_photo}}
            />
            <View style={{ marginLeft: 10, width: 200 }}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Name:{'\n'}{this.props.user.user_name} Agent</Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 12 }}>{this.props.user.brokerage_name}</Text>
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
              <Text style={{ fontSize: 12 }}>Phone: {this.props.user.user_phone}</Text>
              {/* <TouchableOpacity onPress={() => this.setState({ phone: this.props.user.user_phone, visiblePhone: true })}>
                <Text style={{ marginLeft: 5, fontSize: 12, color: colors.BLUE.PRIMARY }}>(Edit)</Text>
              </TouchableOpacity> */}
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 12 }}>Email: {this.props.user.user_email} </Text>
              {/* <TouchableOpacity onPress={() => this.setState({ email: this.props.user.user_email, visibleEmail: true })}>
                <Text style={{ marginLeft: 5, fontSize: 12, color: colors.BLUE.PRIMARY }}>(Edit)</Text>
              </TouchableOpacity> */}
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 12 }}>Website: {this.props.user.user_website}</Text>
              {/* <TouchableOpacity onPress={() => this.setState({ website: this.props.user.user_website, visibleWebsite: true })}>
                <Text style={{ marginLeft: 5, fontSize: 12, color: colors.BLUE.PRIMARY }}>{isEmpty(this.props.user.user_website) ? '(Add)' : '(Edit)'}</Text>
              </TouchableOpacity> */}
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 12 }}>Instagram: {this.props.user.user_instagram_id}</Text>
              {/* <TouchableOpacity onPress={() => this.setState({ instagram: this.props.user.user_instagram_id, visibleInstagram: true })}>
                <Text style={{ marginLeft: 5, fontSize: 12, color: colors.BLUE.PRIMARY }}>{isEmpty(this.props.user.user_instagram_id) ? '(Add)' : '(Connect IG)'}</Text>
              </TouchableOpacity> */}
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
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 20, }}>{this.props.user.user_name} Instagram</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: wp('80%') }}>
              <Image source={images.instagram1} style={{ width: wp('25%'), height: wp('25%') }} />
              <Image source={images.instagram2} style={{ width: wp('25%'), height: wp('25%') }} />
              <Image source={images.instagram3} style={{ width: wp('25%'), height: wp('25%') }} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: wp('80%'), marginTop: 5 }}>
              <Image source={images.instagram4} style={{ width: wp('25%'), height: wp('25%') }} />
              <Image source={images.instagram5} style={{ width: wp('25%'), height: wp('25%') }} />
              <Image source={images.instagram6} style={{ width: wp('25%'), height: wp('25%') }} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: wp('80%'), marginTop: 5 }}>
              <Image source={images.instagram7} style={{ width: wp('25%'), height: wp('25%') }} />
              <Image source={images.instagram8} style={{ width: wp('25%'), height: wp('25%') }} />
              <Image source={images.instagram9} style={{ width: wp('25%'), height: wp('25%') }} />
            </View>
          </View>
        </ScrollView>

        {this.renderPhone()}
        {this.renderEmail()}
        {this.renderWebsite()}
        {this.renderInstagram()}

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
    setUser: (data) => {
      dispatch(setUser(data))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AgentViewProfile);
