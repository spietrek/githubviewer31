import React, {
  Component
} from 'react';
import {
  View,
  Text,
  TextInput,
  ListView,
  TouchableHighlight,
  StyleSheet,
  Alert,
  Platform
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import Badge from './Badge';
import Separator from './Helpers/Separator';
import Api from '../Utils/Api';
import Header from './Helpers/Header';
import Swipeout from 'react-native-swipeout';

class Notes extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });
    this.state = {
      dataSource: this.ds.cloneWithRows(this.props.notes),
      note: '',
      error: ''
    };
  }

  handleChange(e) {
    this.setState({
      note: e.nativeEvent.text
    });
  }

  handleSubmit() {
    const note = this.state.note;
    if (note === '') return;
    this.setState({
      note: ''
    });
    Api.addNote(this.props.userInfo.login, note)
      .then(() => {
        Api.getNotes(this.props.userInfo.login)
          .then((notes) => {
            this.setState({
              dataSource: this.ds.cloneWithRows(notes)
            });
          });
      })
      .catch((error) => {
        console.log('Post request failed', error);
        this.setState({
          error
        });
      });
  }

  deleteNote(rowID, userInfo) {
    Api.deleteNote(userInfo.login, rowID)
      .then(() => {
        Api.getNotes(userInfo.login)
          .then((notes) => {
            this.setState({
              dataSource: this.ds.cloneWithRows(notes)
            });
          });
      })
      .catch((error) => {
        console.log('Delete request failed', error);
        this.setState({
          error
        });
      });
  }

  deleteRow(rowID, userInfo) {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?', [{
        text: 'Delete',
        onPress: () => this.deleteNote(rowID, userInfo)
      }, {
        text: 'Cancel'
      }]
    );
  }

  renderRow(rowData, secID, rowID, userInfo) {
    /* beautify ignore:start */
    const swipeBtns = [{
      text: 'Delete',
      backgroundColor: '#FF0000',
      underlayColor: '#CC0000',
      onPress: () => { this.deleteRow(rowID, userInfo); }
    }];

    return (
      <View style={styles.dataContainer}>
        <Swipeout
          autoClose='true'
          backgroundColor= 'transparent'
          right={swipeBtns}
        >
          <Text
            style={styles.dataText}
          >
            {rowData}
          </Text>
        </Swipeout>
      </View>
    );
    /* beautify ignore:end */
  }

  editor() {
    /* beautify ignore:start */
    return (
      <View style={styles.editorContainer}>
        <TextInput
          onChange={this.handleChange.bind(this)}
          placeholder='New Note'
          style={styles.searchInput}
          value={this.state.note}
        />
        <TouchableHighlight
          onPress={this.handleSubmit.bind(this)}
          style={styles.button}
          underlayColor='#88D4F5'
        >
          <Text style={styles.buttonText}>
            Submit
          </Text>
        </TouchableHighlight>
      </View>
    );
    /* beautify ignore:end */
  }

  render() {
    /* beautify ignore:start */
    const titleConfig = {
      title: 'Notes',
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

    const header = Platform.OS === 'android' ? <Header title='Notes' /> :
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
          <ListView
            dataSource={this.state.dataSource}
            enableEmptySections={true}
            renderHeader={() =>
              <View>
                <Badge userInfo={this.props.userInfo}/>
                {this.editor()}
              </View>
            }
            renderRow={(rowData, secID, rowID) =>
              <View>
                {this.renderRow(rowData, secID, rowID, this.props.userInfo)}
              </View>}
            renderSeparator={(secID, rowID) => <Separator key={`${secID}-${rowID}`}/>}
          />
        </View>
      </View>
    );
    /* beautify ignore:end */
  }
}

Notes.propTypes = {
  navigator: React.PropTypes.object.isRequired,
  notes: React.PropTypes.object.isRequired,
  userInfo: React.PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  viewContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  buttonText: {
    fontSize: 18,
    color: 'white'
  },
  button: {
    height: 50,
    backgroundColor: '#48BBEC',
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchInput: {
    height: 50,
    padding: 10,
    fontSize: 16,
    color: '#111',
    flex: 8
  },
  editorContainer: {
    backgroundColor: '#E3E3E3',
    alignItems: 'center',
    flexDirection: 'row'
  },
  dataContainer: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  dataText: {
    margin: 15,
    fontSize: 16,
    flex: 12
  }
});

export default Notes;