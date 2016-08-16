import React, { Component } from 'react';
import { WebView, 
  View, 
  StyleSheet, 
  Platform
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import Header from './Helpers/Header';

class WebViewer extends Component {
  render() {
    /* beautify ignore:start */
    const titleConfig = {
      title: 'Repo',
      tintColor: '#FFF'
    };

    const leftButtonConfig = {
      title: '< Repos',
      tintColor: '#48BBEC',
      handler: () => this.props.navigator.pop(),
    };

    const statusBarConfig = {
      hidden: false,
      showAnimation: 'fade',
      hideAnimation: 'fade',
      style: 'light-content'
    };

    const header = Platform.OS === 'android' ? <Header title='Repo' /> :
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
          <WebView source={{ uri: this.props.url }}/>
        </View>
      </View>
    );
    /* beautify ignore:end */
  }
}

WebViewer.propTypes = {
  navigator: React.PropTypes.object.isRequired,
  url: React.PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  viewContainer: {
    flex: 1,
    backgroundColor: '#F6F6EF',
    flexDirection: 'column',
  }
});

export default WebViewer;
