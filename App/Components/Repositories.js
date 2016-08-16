import React, { Component } from 'react';
import { ScrollView, 
  View, 
  Text, 
  TouchableHighlight, 
  StyleSheet, 
  Platform
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import Badge from './Badge';
import Separator from './Helpers/Separator';
import WebViewer from './WebViewer';
import Header from './Helpers/Header';

class Repositories extends Component {
  openPage(url) {
    this.props.navigator.push({
      component: WebViewer,
      passProps: {
        url
      }
    });
  }

  render() {
    /* beautify ignore:start */
    const userInfo = this.props.userInfo;
    const repos = this.props.repos;
    const list = repos.map((item, index) => {
      const desc = repos[index].description ?
        <Text
          style={styles.description}
        >
          {repos[index].description}
        </Text> : <View />;
      return (
        <View key={index}>
          <TouchableHighlight
            onPress={this.openPage.bind(this, repos[index].html_url)}
            underlayColor='transparent'
          >
            <View style={styles.rowContainer}>
              <View style={styles.columnContainer}>
                <Text style={styles.name}> {repos[index].name} </Text>
                <Text style={styles.stars}> Stars: {repos[index].stargazers_count} </Text>
                {desc}
              </View>
              <Text style={styles.drill}> > </Text>
            </View>
          </TouchableHighlight>
          <Separator />
        </View>
      );
    });

    const titleConfig = {
      title: 'Repos',
      tintColor: '#FFF'
    };

    const leftButtonConfig = {
      title: `< ${this.props.userInfo.login}`,
      tintColor: '#48BBEC',
      handler: () => this.props.navigator.pop(),
    };

    const statusBarConfig = {
      hidden: false,
      showAnimation: 'fade',
      hideAnimation: 'fade',
      style: 'light-content'
    };

    const header = Platform.OS === 'android' ? <Header title='Repos' /> :
      <NavigationBar
        leftButton={leftButtonConfig}
        statusBar={statusBarConfig}
        tintColor='#444444'
        title={titleConfig}
      />;

    return (
      <View style={styles.container}>
        {header}
        <ScrollView style={styles.scrollContainer}>
          <Badge userInfo={userInfo}/>
          {list}
        </ScrollView>
      </View>
    );
    /* beautify ignore:end */
  }
}

Repositories.propTypes = {
  navigator: React.PropTypes.object.isRequired,
  repos: React.PropTypes.array.isRequired,
  userInfo: React.PropTypes.object.isRequired
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
    flex: 2,
    alignItems: 'center'
  },
  columnContainer: {
    flexDirection: 'column',
    flex: 3,
    padding: 10
  },
  name: {
    color: '#48BBEC',
    fontSize: 18,
    paddingBottom: 5
  },
  stars: {
    color: '#48BBEC',
    fontSize: 14,
    paddingBottom: 5,
    marginLeft: 2
  },
  description: {
    fontSize: 14,
    paddingBottom: 5,
    marginLeft: 6,
    marginRight: 6
  },
  drill: {
    fontSize: 18,
    color: '#CCCCCC',
    width: 20,
    marginRight: 5
  }
});

export default Repositories;
