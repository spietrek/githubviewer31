import React, { Component } from 'react';
import { View, StyleSheet
} from 'react-native';

class Seperator extends Component {
  render() {
    /* beautify ignore:start */
    return (
      <View style={styles.separator} />
    );
    /* beautify ignore:end */
  }
}

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: '#E4E4E4',
    flex: 1,
    marginLeft: 10,
    marginRight: 10
  }
});

export default Seperator;
