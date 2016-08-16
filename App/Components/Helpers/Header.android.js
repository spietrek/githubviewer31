import React, { Component } from 'react';
import { View, Text, StyleSheet
} from 'react-native';

class Header extends Component {
  render() {
    /* beautify ignore:start */
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>
          {this.props.title}
        </Text>
      </View>
    );
    /* beautify ignore:end */
  }
}

Header.propTypes = {
  title: React.PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 40,
    backgroundColor: '#333333',
    justifyContent: 'center'
  },
  headerText: {
    fontSize: 16,
    color: '#FFF',
    marginLeft: 15,
    textAlign: 'left',
    textAlignVertical: 'center'
  }
});

export default Header;
