import React, { Component } from "react";
import { connect } from "react-redux";
import { Platform, StatusBar, StyleSheet, View, Text, TouchableOpacity, Modal, ActivityIndicator, Alert } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';

import styles from './SignInStyles';
import configs from "@constants/configs";
import { Icon } from "react-native-elements";
import { colors } from "@constants/themes";
import { setUser } from "@modules/redux/auth/actions";
import { setLikes } from "@modules/redux/lists/actions";
import { TextInput, NormalButton } from "@components";
import { AuthService, ListingsService } from "@modules/services";
import { isEmpty, validateEmail, validateLength } from "@utils/functions";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      email: "",
      errorEmail: "",
      password: "",
      errorPassword: ""
    };
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

  async FBSIGNIN() {
    try {
      await Facebook.initializeAsync(configs.facebookID);
      const result = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', "email"],
      });
      if (result.type == "success") {
        fetch(`https://graph.facebook.com/me?access_token=${result.token}`)
          .then(response => response.json())
          .then((res) => {
            fetch(`https://graph.facebook.com/${res.id}?fields=birthday,email,hometown&access_token=${result.token}`)
              .then(resp => resp.json())
              .then((json) => {
                this.setState({ email: json.email, password: '123456', loading: true }, () => {
                  this.SIGNIN();
                });
              })
              .catch((error) => {
                console.error(error);
              });
          })
          .catch((error) => {
            console.error(error);
          });
      }
    } catch (e) {
      return { error: true }
    }
  }

  async GGSIGNIN() {
    try {
      const result = await Google.logInAsync({
        // androidClientId: configs.google_auth_config.androidClientId,
        iosClientId: configs.google_auth_config.iosClientId,
        scopes: ['profile', 'email']
      });
      if (result.type === 'success') {
        this.setState({ email: result.user.email, password: '123456', loading: true }, () => {
          this.SIGNIN();
        })
      } else {
        return { cancelled: true }
      }
    } catch (e) {
      return { error: true };
    }
  }

  EPSIGNIN() {
    if (isEmpty(this.state.email)) {
      this.setState({ errorEmail: 'Please enter email' });
    }
    if (isEmpty(this.state.password)) {
      this.setState({ errorPassword: 'Please enter password' });
    }
    if (!isEmpty(this.state.email) && !isEmpty(this.state.password) && isEmpty(this.state.errorEmail) && isEmpty(this.state.errorPassword)) {
      this.setState({ loading: true });
      this.SIGNIN();
    }
  }

  async SIGNIN() {
    var homeUrl = global.homeUrl;
    AuthService.getUser({
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
          if (res.users[0].user_role === 'regular') {
            if (isEmpty(res.users[0].agent_unique_id)) {
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
            } else {
              if (res.users[0].agent_unique_id === global.homeUrl.agentId) {
                global.homeUrl = { agentId: undefined, address: undefined, mlsNumber: undefined, listingId: undefined };
              } else {
                var oldAgent = await AuthService.getAgent({ agentId: res.users[0].agent_unique_id });
                var newAgent = await AuthService.getAgent({ agentId: global.homeUrl.agentId });
                Alert.alert(
                  'Connect with Agent',
                  `You are already connected to agent: ${!isEmpty(oldAgent.users) ? oldAgent.users[0].user_name : res.users[0].agent_unique_id}. ${'\n'} Would you like to switch to ${!isEmpty(newAgent.users) ? newAgent.users[0].user_name : global.homeUrl.agentId}?`,
                  [
                    {
                      text: `No, Stay with ${!isEmpty(oldAgent.users) ? oldAgent.users[0].user_name : res.users[0].agent_unique_id}`,
                      onPress: () => global.homeUrl = { agentId: undefined, address: undefined, mlsNumber: undefined, listingId: undefined }
                    },
                    {
                      text: `Yes, Switch to ${!isEmpty(newAgent.users) ? newAgent.users[0].user_name : global.homeUrl.agentId}`,
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
                        }).then((res2) => {
                          if (res2.count > 0) {
                            this.props.setUser(res2.users[0]);
                            global.homeUrl = { agentId: undefined, address: undefined, mlsNumber: undefined, listingId: undefined };
                          }
                        }).catch((error) => {
                          console.log(error.message);
                        });
                      }
                    }
                  ], { cancelable: false }
                );
              }
            }
          } else {
            global.homeUrl = { agentId: undefined, address: undefined, mlsNumber: undefined, listingId: undefined };
          }
        } else if (global.homeUrl.agentId !== undefined && global.homeUrl.agentId !== 'AthenaHein0916' && global.homeUrl.mlsNumber !== undefined && global.homeUrl.mlsNumber !== 'Z901126S') {
          if (res.users[0].user_role === 'regular') {
            if (isEmpty(res.users[0].agent_unique_id)) {
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
            } else {
              if (res.users[0].agent_unique_id === global.homeUrl.agentId) {
                global.homeUrl = { agentId: undefined, address: undefined, mlsNumber: undefined, listingId: undefined };
                var listing = await ListingsService.getListingDetail(homeUrl.listingId);
                this.props.navigation.navigate('PropertiesDetail', { listing });
              } else {
                var oldAgent = await AuthService.getAgent({ agentId: res.users[0].agent_unique_id });
                var newAgent = await AuthService.getAgent({ agentId: global.homeUrl.agentId });
                Alert.alert(
                  'Connect with Agent',
                  `You are already connected to agent: ${!isEmpty(oldAgent.users) ? oldAgent.users[0].user_name : res.users[0].agent_unique_id} ${'\n'}. Would you like to switch to ${!isEmpty(newAgent.users) ? newAgent.users[0].user_name : global.homeUrl.agentId}?`,
                  [
                    {
                      text: `No, Stay with ${!isEmpty(oldAgent.users) ? oldAgent.users[0].user_name : res.users[0].agent_unique_id}`,
                      onPress: async () => {
                        global.homeUrl = { agentId: undefined, address: undefined, mlsNumber: undefined, listingId: undefined };
                        var listing = await ListingsService.getListingDetail(homeUrl.listingId);
                        this.props.navigation.navigate('PropertiesDetail', { listing });
                      }
                    },
                    {
                      text: `Yes, Switch to ${!isEmpty(newAgent.users) ? newAgent.users[0].user_name : global.homeUrl.agentId}`,
                      onPress: () => {
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
                        }).then(async (res2) => {
                          if (res2.count > 0) {
                            global.homeUrl = { agentId: undefined, address: undefined, mlsNumber: undefined, listingId: undefined };
                            this.props.setUser(res2.users[0]);
                            var listing = await ListingsService.getListingDetail(homeUrl.listingId);
                            this.props.navigation.navigate('PropertiesDetail', { listing });
                          }
                        }).catch((error) => {
                          console.log(error.message);
                        });
                      }
                    }
                  ], { cancelable: false }
                )
              }
            }
          } else {
            global.homeUrl = { agentId: undefined, address: undefined, mlsNumber: undefined, listingId: undefined };
            var listing = await ListingsService.getListingDetail(homeUrl.listingId);
            this.props.navigation.navigate('PropertiesDetail', { listing });
          }
        }
      } else {
        this.setState({ loading: false }, () => {
          this.setState({ errorEmail: "User email or password is wrong" });
        });
      }
    })
  }

  render() {
    const { email, password } = this.state;
    return (
      <View style={styles.whole}>
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
          <StatusBar hidden />
          <View style={styles.view1}>
            <TouchableOpacity onPress={() => this.props.navigation.pop()}><Icon name="close" type="ant-design" size={30} /></TouchableOpacity>
          </View>
          <Text style={{ marginVertical: 10, fontSize: 34, fontWeight: 'bold' }}> {`Sign In`}</Text>
          <TextInput
            title="Email" iconName="email" iconType="fontisto" iconSize={20}
            value={email} secureTextEntry={false} autoCapitalize="none"
            onChangeText={(email) => this.onValidateEmail(email)}
          />
          <Text style={styles.text1}>{this.state.errorEmail}</Text>
          <TextInput
            title="Password" iconName="lock" iconType="entypo" iconSize={20}
            value={password} secureTextEntry={true}
            onChangeText={(password) => this.onValidatePassword(password)}
          />
          <Text style={styles.text1}>{this.state.errorPassword}</Text>
          <NormalButton
            width={wp("90%")}
            height={40}
            color="#0073E4"
            text="Sign In"
            textColor={colors.WHITE}
            onPress={() => this.EPSIGNIN()}
          />
          <TouchableOpacity style={{ marginTop: 20 }}><Text style={{ color: "#0072DC", textDecorationLine: "underline" }}>{`Forgot Password?`}</Text></TouchableOpacity>
          <NormalButton
            width={wp("90%")}
            height={40}
            color="#C4DAF0"
            text="Sign in Facebook"
            textColor="#0072DC"
            onPress={() => this.FBSIGNIN()}
          />
          <NormalButton
            width={wp("90%")}
            height={40}
            color="#F0C4C4"
            text="Sign in Google"
            textColor="#EA5050"
            onPress={() => this.GGSIGNIN()}
          />
          <View style={{ flexDirection: "row", marginTop: 5 }}>
            <Text style={{ fontSize: 12 }}>{`Don't you have account? `}</Text>
            <TouchableOpacity onPress={() => {
              this.props.navigation.replace("SignUp");
            }}><Text style={styles.text2}>{`Sign Up`}</Text></TouchableOpacity>
          </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
