import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

class Badge extends Component {
  render() {
    /* beautify ignore:start */
    return (
      <View style={styles.container}>
        <Image source={{ uri: this.props.userInfo.avatar_url }}
          style={styles.image}
        />
        <Text style={styles.name}>
          {this.props.userInfo.name}
        </Text>
        <Text style={styles.handle}>
          {this.props.userInfo.login}
        </Text>
      </View>
    );
    /* beautify ignore:end */
  }
}

Badge.propTypes = {
  userInfo: React.PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4d4d4d',
    paddingBottom: 10
  },
  name: {
    alignSelf: 'center',
    fontSize: 21,
    marginTop: 10,
    marginBottom: 5,
    color: 'white'
  },
  handle: {
    alignSelf: 'center',
    fontSize: 16,
    color: 'white'
  },
  image: {
    height: 125,
    width: 125,
    borderRadius: 65,
    marginTop: 10,
    alignSelf: 'center'
  }
});

export default Badge;
