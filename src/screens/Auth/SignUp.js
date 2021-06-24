import React, { Component } from "react";
import { connect } from "react-redux";
import { Platform, StatusBar, StyleSheet, View, Text, TouchableOpacity, Modal, ActivityIndicator, Alert } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';

import styles from './SignUpStyles';
import configs from "@constants/configs";
import { Icon } from "react-native-elements";
import { colors } from "@constants/themes";
import { setUser } from "@modules/redux/auth/actions";
import { setLikes } from "@modules/redux/lists/actions";
import { TextInput, NormalButton } from "@components";
import { AuthService, ListingsService } from "@modules/services";
import { isEmpty, validateEmail, validateLength, generateKey } from "@utils/functions";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      name: "",
      email: "",
      password: "",
      errorName: "",
      errorEmail: "",
      errorPassword: ""
    };
  }

  onValidateName(name) {
    this.setState({ name }, () => {
      if (isEmpty(this.state.name)) {
        this.setState({ errorName: 'Please enter name' });
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
        this.setState({ errorEmail: 'Please enter email' });
      } else {
        if (!validateEmail(this.state.email)) {
          this.setState({ errorEmail: "Invaild email, please enter correct email again" })
        } else {
          this.setState({ errorEmail: '' });
        }
      }
    })
  }

  onValidatePassword(password) {
    this.setState({ password }, () => {
      if (isEmpty(this.state.password)) {
        this.setState({ errorPassword: 'Please enter password' });
      } else {
        if (!validateLength(this.state.password, 6)) {
          this.setState({ errorPassword: 'Please enter 6+ characters' })
        } else {
          this.setState({ errorPassword: '' });
        }
      }
    })
  }

  async FBSIGNUP() {
    try {
      await Facebook.initializeAsync(configs.facebookID);
      const result = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', "email"],
      });
      if (result.type == "success") {
        fetch(`https://graph.facebook.com/me?access_token=${result.token}`)
          .then(response => response.json())
          .then((res) => {
            fetch(`https://graph.facebook.com/${res.id}?fields=name,email&access_token=${result.token}`)
              .then(resp => resp.json())
              .then((json) => {
                this.setState({ name: json.name, email: json.email, password: '123456', loading: true }, () => {
                  this.SIGNUP();
                });
              })
              .catch((error) => {
                console.log(error.message);
              });
          })
          .catch((error) => {
            console.log(error.message);
          });
      }
    } catch (e) {
      return { error: true }
    }
  }

  async GGSIGNUP() {
    try {
      const result = await Google.logInAsync({
        androidClientId: configs.google_auth_config.androidClientId,
        iosClientId: configs.google_auth_config.iosClientId,
        scopes: ['profile', 'email']
      });

      if (result.type === 'success') {
        this.setState({ name: result.user.name, email: result.user.email, password: '123456', loading: true }, () => {
          this.SIGNUP();
        })
      } else {
        return { cancelled: true }
      }
    } catch (e) {
      return { error: true };
    }
  }

  EPSIGNUP() {
    if (isEmpty(this.state.name)) {
      this.setState({ errorName: 'Please enter name' });
    }
    if (isEmpty(this.state.email)) {
      this.setState({ errorEmail: 'Please enter email' });
    }
    if (isEmpty(this.state.password)) {
      this.setState({ errorPassword: 'Please enter password' });
    }
    if (!isEmpty(this.state.name) && !isEmpty(this.state.email) && !isEmpty(this.state.password) && isEmpty(this.state.errorName) && isEmpty(this.state.errorEmail) && isEmpty(this.state.errorPassword)) {
      this.setState({ loading: true });
      this.SIGNUP();
    }
  }

  async SIGNUP() {
    var homeUrl = global.homeUrl;
    AuthService.getEmail(this.state.email).then(async (response) => {
      if (response.count == 0) {
        AuthService.setUser({
          unique_id: generateKey(16),
          name: this.state.name,
          email: this.state.email,
          password: this.state.password
        }).then(async (res) => {
          if (res.count > 0) {
            this.setState({ loading: false });
            this.props.setUser(res.users[0]);
            var likes = await ListingsService.getLike(res.users[0].id);
            this.props.setLikes(likes);
            this.props.navigation.pop();

            if (global.homeUrl.agentId !== undefined && global.homeUrl.agentId !== 'AthenaHein0916' && global.homeUrl.mlsNumber !== undefined && global.homeUrl.mlsNumber === 'Z901126S') {
              var agentName = await AuthService.getAgent({ agentId: global.homeUrl.agentId });
              Alert.alert(
                'Connect with Agent',
                `Would you connect to this Agent: ${!isEmpty(agentName.users) ? agentName.users[0].user_name : global.homeUrl.agentId} now?`,
                [
                  {
                    text: 'Cancel',
                    onPress: () => global.homeUrl = { agentId: undefined, address: undefined, mlsNumber: undefined, listingId: undefined }
                  },
                  {
                    text: 'OK',
                    onPress: async () => {
                      AuthService.updateUser({
                        user_id: res.users[0].id,
                        unique_id: res.users[0].unique_id,
                        name: res.users[0].user_name,
                        email: res.users[0].user_email,
                        brokerage_name: res.users[0].brokerage_name,
                        phone: res.users[0].user_phone,
                        website: res.users[0].user_website,
                        instagram_id: res.users[0].user_instagram_id,
                        photo: res.users[0].user_photo,
                        role: res.users[0].user_role,
                        agent_unique_id: global.homeUrl.agentId
                      }).then((res1) => {
                        if (res1.count > 0) {
                          this.props.setUser(res1.users[0]);
                          global.homeUrl = { agentId: undefined, address: undefined, mlsNumber: undefined, listingId: undefined };
                        }
                      }).catch((error) => {
                        console.log(error.message);
                      });
                    }
                  }
                ], { cancelable: false }
              );
            } else if (global.homeUrl.agentId !== undefined && global.homeUrl.agentId !== 'AthenaHein0916' && global.homeUrl.mlsNumber !== undefined && global.homeUrl.mlsNumber !== 'Z901126S') {
              var agentName = await AuthService.getAgent({ agentId: global.homeUrl.agentId });
              Alert.alert(
                'Connect with Agent',
                `Would you connect to this Agent: ${!isEmpty(agentName.users) ? agentName.users[0].user_name : global.homeUrl.agentId} now?`,
                [
                  {
                    text: 'Cancel',
                    onPress: async () => {
                      global.homeUrl = { agentId: undefined, address: undefined, mlsNumber: undefined, listingId: undefined };
                      var listing = await ListingsService.getListingDetail(homeUrl.listingId);
                      this.props.navigation.navigate('PropertiesDetail', { listing });
                    }
                  },
                  {
                    text: 'OK',
                    onPress: async () => {
                      AuthService.updateUser({
                        user_id: res.users[0].id,
                        unique_id: res.users[0].unique_id,
                        name: res.users[0].user_name,
                        email: res.users[0].user_email,
                        brokerage_name: res.users[0].brokerage_name,
                        phone: res.users[0].user_phone,
                        website: res.users[0].user_website,
                        instagram_id: res.users[0].user_instagram_id,
                        photo: res.users[0].user_photo,
                        role: res.users[0].user_role,
                        agent_unique_id: global.homeUrl.agentId
                      }).then(async (res1) => {
                        if (res1.count > 0) {
                          global.homeUrl = { agentId: undefined, address: undefined, mlsNumber: undefined, listingId: undefined };
                          this.props.setUser(res1.users[0]);
                          var listing = await ListingsService.getListingDetail(homeUrl.listingId);
                          this.props.navigation.navigate('PropertiesDetail', { listing });
                        }
                      }).catch((error) => {
                        console.log(error.message);
                      });
                    }
                  }
                ], { cancelable: false }
              );
            }
          } else {
            this.setState({ loading: false }, () => {
              this.setState({ errorEmail: "Email is restricted" });
            });
          }
        })
      } else {
        this.setState({ loading: false }, () => {
          this.setState({ errorEmail: "Email has already registed" });
        });
      }
    });
  }


  onConfirm1() {
    AuthService.updateUser({
      user_id: this.props.user.id,
      unique_id: this.props.user.unique_id,
      name: this.props.user.user_name,
      email: this.props.user.user_email,
      brokerage_name: this.props.user.brokerage_name,
      phone: this.props.user.user_phone,
      website: this.props.user.user_website,
      instagram_id: this.props.user.user_instagram_id,
      photo: this.props.user.user_photo,
      role: this.props.user.user_role,
      agent_unique_id: global.homeUrl.agentId
    }).then((res) => {
      if (res.count > 0) {
        this.props.setUser(res.users[0]);
      }
    }).catch((error) => {
      console.log(error.message);
    });
  }

  onConfirm2() {
    AuthService.updateUser({
      user_id: this.props.user.id,
      unique_id: this.props.user.unique_id,
      name: this.props.user.user_name,
      email: this.props.user.user_email,
      brokerage_name: this.props.user.brokerage_name,
      phone: this.props.user.user_phone,
      website: this.props.user.user_website,
      instagram_id: this.props.user.user_instagram_id,
      photo: this.props.user.user_photo,
      role: this.props.user.user_role,
      agent_unique_id: global.homeUrl.agentId
    }).then(async (res) => {
      if (res.count > 0) {
        this.props.setUser(res.users[0]);
        var listing = await ListingsService.getListingDetail(global.homeUrl.listingId);
        this.props.navigation.navigate('PropertiesDetail', { listing });
      }
    }).catch((error) => {
      console.log(error.message);
    });
  }

  render() {
    const { name, email, password } = this.state;
    return (
      <View style={styles.whole}>
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
          <StatusBar hidden />
          <View style={styles.view1}>
            <TouchableOpacity onPress={() => this.props.navigation.pop()}><Icon name="close" type="ant-design" size={30} /></TouchableOpacity>
          </View>
          <Text style={{ marginVertical: 10, fontSize: 34, fontWeight: 'bold' }}>{`Create Account`}</Text>
          <TextInput
            title="Name" iconName="user" iconType="evilicon" iconSize={25}
            value={name} secureTextEntry={false}
            onChangeText={(name) => this.onValidateName(name)}
          />
          <Text style={styles.text1}>{this.state.errorName}</Text>
          <TextInput
            title="Email" iconName="email" iconType="fontisto" iconSize={20}
            value={email} secureTextEntry={false} autoCapitalize="none"
            onChangeText={(email) => this.onValidateEmail(email)}
          />
          <Text style={styles.text1}>{this.state.errorEmail}</Text>
          <TextInput
            title="Password" iconName="lock" iconType="entypo" iconSize={20}
            value={password} secureTextEntry={true} autoCapitalize="none"
            onChangeText={(password) => this.onValidatePassword(password)}
          />
          <Text style={styles.text1}>{this.state.errorPassword}</Text>
          <NormalButton
            width={wp("90%")}
            height={40}
            color="#0073E4"
            text="Sign Up"
            textColor={colors.WHITE}
            onPress={() => this.EPSIGNUP()}
          />
          <View style={{ flexDirection: "row", marginTop: 5 }}>
            <Text style={{ fontSize: 12 }}>{`by registering you accept `}</Text>
            <TouchableOpacity><Text style={styles.text2}>{`our terms of you`}</Text></TouchableOpacity>
            <Text style={{ fontSize: 12 }}>{` and`}</Text>
          </View>
          <TouchableOpacity><Text style={styles.text2}>{`privacy policy`}</Text></TouchableOpacity>
          <NormalButton
            width={wp("90%")}
            height={40}
            color="#C4DAF0"
            text="Sign in Facebook"
            textColor="#0072DC"
            onPress={() => this.FBSIGNUP()}
          />
          <NormalButton
            width={wp("90%")}
            height={40}
            color="#F0C4C4"
            text="Sign in Google"
            textColor="#EA5050"
            onPress={() => this.GGSIGNUP()}
          />
          <View style={{ flexDirection: "row", marginTop: 5 }}>
            <Text style={{ fontSize: 12 }}>{`Do you have already account? `}</Text>
            <TouchableOpacity onPress={() => this.props.navigation.replace('SignIn')}><Text style={styles.text2}>{`Sign In`}</Text></TouchableOpacity>
          </View>
          <View style={{ height: 50 }} />
          <Modal animationType="fade" transparent={true} visible={this.state.loading} >
            <View style={styles.view2}>
              <View style={styles.view3}>
                <ActivityIndicator style={{ height: 80 }} size="large" color={colors.BLACK} />
              </View>
            </View>
          </Modal>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    logged: state.auth.logged,
    user: state.auth.user_info,
    likes: state.lists.likes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUser: (data) => dispatch(setUser(data)),
    setLikes: (data) => dispatch(setLikes(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
