import React, { Component } from "react";
import { connect } from "react-redux";
import { Platform, Image, StatusBar, StyleSheet, View, Text, TouchableOpacity, ScrollView, Modal, ActivityIndicator, Share } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import * as ImagePicker from 'expo-image-picker';

import axios from 'axios';
import styles from './AgentUserProfileStyles';
import configs from "@constants/configs";
import { Icon } from "react-native-elements";
import { colors } from "@constants/themes";
import { setTab, setUser, signOut } from "@modules/redux/auth/actions";
import { setLikes } from "@modules/redux/lists/actions";
import { AuthService } from "@modules/services";
import { Loading, Header } from "@components";
import { isEmpty, validateLength } from "@utils/functions";

class AgentUserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,

      website: '',
      errorWebsite: '',
      visibleWebsite: false,
      instagram: '',
      errorInstagram: '',
      visibleInstagram: false,

      photo: null,
    };
  }

  signOut() {
    this.props.signOut();
    var likes = [];
    this.props.setLikes(likes);
    this.props.navigation.reset({ index: 1, routes: [{ name: 'App' }] });
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

  async onAvatar() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      this.setState({ loading: true });
      let data = new FormData();
      data.append('image', {
        name: `${this.props.user.unique_id}.${result.type}`,
        type: result.type,
        uri: result.uri
      });
      axios.post(`${configs.apiURL}/users/uploadAvatar`, data, {
        headers: {
          'Accept': 'application/json',
          'content-Type': 'multipart/form-data'
        },
        responseType: 'json'
      }).then(res => {
        AuthService.updateUser({
          user_id: this.props.user.id,
          unique_id: this.props.user.unique_id,
          name: this.props.user.user_name,
          email: this.props.user.user_email,
          brokerage_name: this.props.user.brokerage_name,
          phone: this.props.user.user_phone,
          website: this.props.user.user_website,
          instagram_id: this.state.instagram,
          photo: res.data.path,
          role: this.props.user.user_role,
          agent_unique_id: this.props.user.agent_unique_id
        }).then((res) => {
          this.setState({ loading: false });
          if (res.count > 0) {
            this.setState({ loading: false });
            this.props.setUser(res.users[0]);
          }
        }).catch((err) => {
          this.setState({ loading: false });
        });
      })

    }
  }

  onShare() {
    const user = this.props.user;

    if (Platform.OS === 'ios') {
      var subject = `Brokier - ${user.brokerage_name}(Agent) Unique Link`;
      var message = `Brokier - ${user.brokerage_name}(Agent) Unique Link${'\n'}https://brokier-0916.web.app/home/${user.unique_id}/926-Angel-St/Z901126S/000000`;
      // var url = `https://brokier.web.app/home/${user.unique_id}/athena-hein/19910926`;

      Share.share({ message }, { subject });
    } else {
      var dialogTitle = `Brokier - ${user.brokerage_name}(Agent) Unique Link`;
      var message = `Brokier - ${user.brokerage_name}(Agent) Unique Link${'\n'}https://brokier-0916.web.app/home/${user.unique_id}/926-Angel-St/Z901126S/000000`;
      var title = `Brokier - ${user.brokerage_name}(Agent) Unique Link`;

      Share.share({ message, title }, { dialogTitle });
    }
  };

  onReferredConnections() {
    const user = this.props.user;
    this.setState({ loading: true });
    AuthService.getReferral({
      uniqueId: user.unique_id
    }).then((res) => {
      this.setState({ loading: false });
      if (res.count > 0) {
        this.props.navigation.navigate('ReferredConnections', { params: res.users });
      }
    }).catch((err) => {
      this.setState({ loading: false });
    });
  }

  renderWebsite() {
    return (
      <Modal visible={this.state.visibleWebsite} animationType="none" swipeArea={50} transparent={true}>
        <View style={styles.wrapper}>
          <Text style={{ marginTop: 20, fontSize: 20, fontWeight: 'bold' }}>Change Website</Text>
          <Text style={{ marginVertical: 10, width: '80%', textAlign: 'center' }}>Would you change Website?</Text>
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
          <Text style={{ marginVertical: 10, width: '80%', textAlign: 'center' }}>Would you change Instagram Id?</Text>
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
        <Header style={{ backgroundColor: colors.GREY.PRIMARY, paddingLeft: 10, paddingRight: 10 }}>
          <View style={styles.header}>
            <View style={{ marginLeft: 10 }}>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity>
                  <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{this.props.user.user_name}{` Agent`}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('AgentViewProfile')}>
                  <Text style={{ marginLeft: 5, fontSize: 12, color: colors.BLUE.PRIMARY, textDecorationLine: 'underline' }}>{`VIEW PEOPLE`}</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 12 }}>{this.props.user.brokerage_name} {`Brokerage`}</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('AgentEditProfile')}>
                  <Text style={{ marginLeft: 5, fontSize: 12, color: colors.BLUE.PRIMARY }}>{`(Edit)`}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity onPress={() => this.onAvatar()}>
              <Image style={{ width: 50, height: 50, borderRadius: 25 }} source={isEmpty(this.props.user.user_photo) ? require('@assets/images/addphoto.jpg') : { uri: configs.avatarURL + this.props.user.user_photo }} />
            </TouchableOpacity>
          </View>
        </Header>
        <ScrollView contentContainerStyle={{ width: wp('100%') }}>
          <View style={{ width: wp('100%'), padding: 20, borderBottomWidth: 0.5, borderBottomColor: '#DEDEDE' }}>
            <Text style={{ fontSize: 10 }}>{`Share your unique Brokier Profile Link and new users using your link to download this app will become your connections. Your connections will see your image on listings and all book a viewing requests are ONLY sent to you.`}</Text>
            <View style={{ width: '100%', alignItems: 'center', marginTop: 10 }}>
              <TouchableOpacity style={styles.linkButton} onPress={() => this.onShare()}>
                <Text style={{ fontWeight: 'bold', color: colors.WHITE }}>{`Share My Unique Link`}</Text>
              </TouchableOpacity>
            </View>
            <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 20 }}>{`Contact Details:`}</Text>
            <Text style={{ fontSize: 12 }}>{`Phone: `}{this.props.user.user_phone}</Text>
            <Text style={{ fontSize: 12 }}>{`Email: `}{this.props.user.user_email}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 12 }}>{`Website: `}</Text>
              <Text style={{ fontSize: 12, color: colors.BLACK }}>{this.props.user.user_website}</Text>
              <TouchableOpacity onPress={() => this.setState({ website: this.props.user.user_website, visibleWebsite: true })}>
                <Text style={{ marginLeft: 5, fontSize: 12, color: colors.BLUE.PRIMARY }}>{isEmpty(this.props.user.user_website) ? '(Add)' : 'Edit'}</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 12 }}>{`Instagram: `}</Text>
              <Text style={{ fontSize: 12, color: colors.BLACK }}>{this.props.user.user_instagram_id}</Text>
              <TouchableOpacity onPress={() => this.setState({ instagram: this.props.user.user_instagram_id, visibleInstagram: true })}>
                <Text style={{ fontSize: 12, color: colors.BLUE.PRIMARY }}>{isEmpty(this.props.user.user_instagram_id) ? '(Add)' : '(Edit)'}</Text>
              </TouchableOpacity>
            </View>
            <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 10 }}>{`Marketing Profile:`}</Text>
            <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 10 }}>{`Listing Service offerings:`}</Text>
            <View style={{ fontSize: 12, flexDirection: 'row' }}>
              <Text style={{ fontSize: 12, width: 250 }}>{`1% full service listings with free staging consultation, 3D virtual Tours. `}</Text>
              <TouchableOpacity>
                <Text style={{ fontSize: 12, color: colors.BLUE.PRIMARY }}>{'\n'}{`(Edit)`}</Text>
              </TouchableOpacity>
            </View>
            <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 10 }}>{`Buyer Service offerings:`}</Text>
            <Text style={{ fontSize: 12 }}>{`Offers 50% of agents commission as cash back `}</Text>
            <TouchableOpacity>
              <Text style={{ fontSize: 12, color: colors.BLUE.PRIMARY }}>{`(Edit)`}</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 10 }}>{`Area of specialty:`}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 12 }}>{`Chesterfield and Surounding areas `}</Text>
              <TouchableOpacity>
                <Text style={{ fontSize: 12, color: colors.BLUE.PRIMARY }}>{`(Edit)`}</Text>
              </TouchableOpacity>
            </View>
            <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 10 }}>{`Designations:`}</Text>
            <TouchableOpacity>
              <Text style={{ fontSize: 12, color: colors.BLUE.PRIMARY }}>{`Add Designations to stand out`}</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 10 }}>{`Awards and Achievements:`}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 12 }}>{`#1 agent in remax office 2017, 2018 `}</Text>
              <TouchableOpacity>
                <Text style={{ fontSize: 12, color: colors.BLUE.PRIMARY }}>{`(Edit)`}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.view1}>
            <Icon name="hand-holding" type="font-awesome-5" size={15} />
            <Text style={{ marginLeft: 20, fontSize: 12 }}>{`Edit Profile and Marketing Details`}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.view1}
            onPress={() => this.props.navigation.reset({ routes: [{ name: 'Favorite' }] })}
          >
            <Icon name="search" type="font-awesome" size={15} />
            <Text style={{ marginLeft: 20, fontSize: 12 }}>{`Saved Searches`}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.view1}
            onPress={() => this.props.navigation.reset({ routes: [{ name: 'Favorite' }] })}
          >
            <Icon name="heart" type="font-awesome" size={15} />
            <Text style={{ marginLeft: 20, fontSize: 12 }}>{`Saved Listings`}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.view1}
            onPress={() => this.onReferredConnections()}
          >
            <Icon name="users" type="font-awesome" size={15} />
            <Text style={{ marginLeft: 20, fontSize: 12 }}>{`Referred Connections`}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.view1}
            onPress={() => this.props.navigation.navigate('AccountSettings')}>
            <Icon name="settings" type="feather" size={15} />
            <Text style={{ marginLeft: 20, fontSize: 12 }}>{`Settings and Password`}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.view1}
            onPress={() => this.signOut()}>
            <Icon name="logout" type="material-community" size={15} />
            <Text style={{ marginLeft: 20, fontSize: 12 }}>{`Log Out`}</Text>
          </TouchableOpacity>
        </ScrollView>

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

const mapStateToProps = state => {
  return {
    logged: state.auth.logged,
    user: state.auth.user_info
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setTab: (data) => dispatch(setTab(data)),
    signOut: (data) => dispatch(signOut(data)),
    setLikes: (data) => dispatch(setLikes(data)),
    setUser: (data) => dispatch(setUser(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AgentUserProfile);
