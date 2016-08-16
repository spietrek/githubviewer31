import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableHighlight, StyleSheet, Image
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import SearchBar from 'react-native-search-bar';
import Api from '../Utils/Api';
import Separator from './Helpers/Separator';
import Dashboard from './Dashboard';

class Search extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      users: [],
      searchText: '',
      error: false
    };
  }

  handleSearch(search) {
    this.refs.searchBar.blur();
    this.setState({
      users: [],
      showsCancelButton: false
    });
    if (search.length > 3) {
      Api.getSearchUsers(search)
        .then((data) => {
          this.setState({
            users: data.items
          });
        })
        .catch((error) => {
          console.log('Search request failed', error);
          this.setState({
            error,
            users: []
          });
        });
    }
  }

  handleCancel() {
    this.refs.searchBar.blur();
    this.refs.searchBar.showsCancelButton = false;
  }

  openUser(userInfo) {
    Api.getBio(userInfo.login).then((res) => {
      this.props.navigator.push({
        title: res.name || res.login,
        component: Dashboard,
        passProps: {
          userInfo: res
        }
      });
    });
  }

  render() {
    /* beautify ignore:start */
    const titleConfig = {
      title: 'Search',
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

    const users = this.state.users;
    let list = [];
    if (users) {
      list = users.map((item, index) => {
        return (
          <View key={index}>
            <TouchableHighlight
              onPress={this.openUser.bind(this, item)}
              underlayColor='transparent'
            >
              <View style={styles.rowContainer}>
                <Image
                  source={{ uri: item.avatar_url }}
                  style={styles.image}
                />
                <Text style={styles.name}> {item.login} </Text>
                <Text style={styles.drill}> > </Text>
              </View>
            </TouchableHighlight>
            <Separator />
          </View>
        );
      });
    }

    return (
      <View style={styles.container}>
        <NavigationBar
          leftButton={leftButtonConfig}
          statusBar={statusBarConfig}
          tintColor='#444444'
          title={titleConfig}
        />
        <ScrollView
          keyboardDismissMode='on-drag'
          style={styles.scrollContainer}
        >
          <SearchBar
            onCancelButtonPress={() => this.setState({ showsCancelButton: false })}
            onFocus={() => this.setState({ showsCancelButton: true })}
            onSearchButtonPress={this.handleSearch.bind(this)}
            placeholder='Search'
            ref='searchBar'
            showsCancelButton={this.state.showsCancelButton}
          />
          {list}
        </ScrollView>
      </View>
    );
    /* beautify ignore:end */
  }
}

Search.propTypes = {
  navigator: React.PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  scrollContainer: {
    flex: 1
  },
  rowContainer: {
    flexDirection: 'row',
    flex: 1,
    padding: 10
  },
  name: {
    color: '#48BBEC',
    fontSize: 18,
    paddingTop: 3,
    flex: 3
  },
  image: {
    height: 30,
    width: 30,
    borderRadius: 4
  },
  drill: {
    fontSize: 18,
    color: '#CCCCCC',
    width: 20
  }
});

export default Search;
