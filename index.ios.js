'use strict';

import React, { Component} from 'react';
import { AppRegistry, StyleSheet, Navigator, View } from 'react-native';
import Main from './App/Components/Main';

class githubviewer extends Component {
  render() {
    /* beautify ignore:start */
    const initialRoute = {
      component: Main
    };

    return (
      <View style={styles.container}>
         <Navigator
           initialRoute={initialRoute}
           renderScene={(route, navigator) => {
             return (
              <route.component navigator={navigator}
                route={route}
                {...route.passProps}
              />
            );
           }}
         />
       </View>
    );
    /* beautify ignore:end */
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

AppRegistry.registerComponent('githubviewer', () => githubviewer);
