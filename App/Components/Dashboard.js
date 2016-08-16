import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight, Platform } from 'react-native';
import NavigationBar from 'react-native-navbar';
import Header from './Helpers/Header';
import Profile from './Profile';
import Repositories from './Repositories';
import Notes from './Notes';
import Api from '../Utils/Api';
import Badge from './Badge';

class Dashboard extends Component {
  makeButton(btn) {
    const obj = {
      justifyContent: 'center',
      height: 90,
      width: 90,
      borderRadius: 8,
      marginLeft: 20,
      alignSelf: 'flex-start',
      marginTop: 80
    };

    if (btn === 0) {
      obj.backgroundColor = '#43bbef';
    } else if (btn === 1) {
      obj.backgroundColor = '#ff5c33';
    } else if (btn === 2) {
      obj.backgroundColor = '#758BF4';
    }

    return obj;
  }

  gotoProfile() {
    this.props.navigator.push({
      title: 'Profile',
      component: Profile,
      passProps: {
        userInfo: this.props.userInfo
      }
    });
  }

  gotoRepos() {
    Api.getRepos(this.props.userInfo.login)
      .then((res) => {
        this.props.navigator.push({
          title: 'Repos',
          component: Repositories,
          passProps: {
            userInfo: this.props.userInfo,
            repos: res
          }
        });
      });
  }

  gotoNotes() {
    Api.getNotes(this.props.userInfo.login)
      .then((res) => {
        res = res || {};
        this.props.navigator.push({
          title: 'Notes',
          component: Notes,
          passProps: {
            notes: res,
            userInfo: this.props.userInfo
          }
        });
      });
  }

  render() {
    /* beautify ignore:start */
    const { userInfo } = this.props;
    const title = userInfo.login;
    const titleConfig = {
      title,
      tintColor: '#FFF'
    };

    const leftButtonConfig = {
      title: '< Back',
      tintColor: '#48BBEC',
      handler: () => this.props.navigator.pop(),
    };

    const statusBarConfig = {
      hidden: false,
      showAnimation: 'fade',
      hideAnimation: 'fade',
      style: 'light-content'
    };

    const header = Platform.OS === 'android' ? <Header title={title}/> :
      <NavigationBar
        leftButton={leftButtonConfig}
        statusBar={statusBarConfig}
        tintColor='#444444'
        title={titleConfig}
      />;

    return (
      <View style={styles.container}>
        {header}
        <View style={styles.viewContainer}>
          <Badge userInfo={userInfo}/>
          <View style={styles.buttonContainer}>
            <TouchableHighlight
              onPress={this.gotoProfile.bind(this)}
              style={this.makeButton(0)}
              underlayColor='#14aaeb'
            >
              <Text style={styles.buttonText}>
                Profile
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={this.gotoRepos.bind(this)}
              style={this.makeButton(1)}
              underlayColor='#e62e00'
            >
              <Text style={styles.buttonText}>
                Repos
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={this.gotoNotes.bind(this)}
              style={this.makeButton(2)}
              underlayColor='#425ff0'
            >
              <Text style={styles.buttonText}>
                Notes
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
    /* beautify ignore:end */
  }
}

Dashboard.propTypes = {
  navigator: React.PropTypes.object.isRequired,
  userInfo: React.PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333'
  },
  viewContainer: {
    flex: 1,
    backgroundColor: '#4d4d4d'
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  title: {
    color: 'black',
    fontSize: 30
  }
});

export default Dashboard;
