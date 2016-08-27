import React, {
  Component
} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Platform
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import Header from './Helpers/Header';
import Api from '../Utils/Api';
import Dashboard from './Dashboard';
import Search from './Search';
import SearchIcon from './Helpers/SearchIcon';

class Main extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      username: '',
      isLoading: false,
      error: false
    };
  }

  handleChange(event) {
    this.setState({
      username: event.nativeEvent.text
    });
  }

  handleSubmit() {
    this.setState({
      isLoading: true
    });
    Api.getBio(this.state.username).then((res) => {
      if (res.message === 'Not Found') {
        this.setState({
          error: 'User not found',
          isLoading: false
        });
      } else {
        this.props.navigator.push({
          title: res.name || 'Select an Option',
          component: Dashboard,
          passProps: {
            userInfo: res
          }
        });
        this.setState({
          isLoading: false,
          error: false,
          username: ''
        });
      }
    });
  }

  input() {
    /* beautify ignore:start */
    return (
      <TextInput
        autoCapitalize='none'
        onChange={this.handleChange.bind(this)}
        style={styles.searchInput}
        value={this.state.username}
      />
    );
    /* beautify ignore:end */
  }

  handleSearch() {
    this.props.navigator.push({
      title: 'Search Users',
      component: Search
    });
  }

  searchButton() {
    /* beautify ignore:start */
    return (
      <SearchIcon
        onPress={this.handleSearch.bind(this)}
        style={{ marginRight: 8 }}
      />
    );
    /* beautify ignore:end */
  }

  render() {
    /* beautify ignore:start */
    const showErr = (this.state.error
      ? <Text style={styles.error}>{this.state.error}</Text>
      : <View/>);

    const titleConfig = {
      tintColor: '#FFF',
      title: 'GitHub Viewer'
    };

    const statusBarConfig = {
      hidden: false,
      showAnimation: 'fade',
      hideAnimation: 'fade',
      style: 'light-content'
    };

    const header = Platform.OS === 'android' ? <Header title='GitHub Viewer'/> :
      <NavigationBar
        rightButton={this.searchButton()}
        statusBar={statusBarConfig}
        tintColor='#444444'
        title={titleConfig}
      />;

    return (
      <View style={styles.container}>
        {header}
        <View style={styles.viewContainer}>
          <Text style={styles.title}>
            Enter a GitHub User Name
          </Text>
          {this.input()}
          <TouchableHighlight onPress={this.handleSubmit.bind(this)}
            style={styles.button}
            underlayColor='white'
          >
            <Text style={styles.buttonText}>
              GO
            </Text>
          </TouchableHighlight>
          {showErr}
        </View>
      </View>
    );
    /* beautify ignore:end */
  }
}

Main.propTypes = {
  navigator: React.PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  viewContainer: {
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 110,
    flexDirection: 'column',
    backgroundColor: '#404040'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff'
  },
  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  error: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center'
  }
});

export default Main;
