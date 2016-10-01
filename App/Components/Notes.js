import React, { Component } from 'react';
import {
  View,
  TextView,
  Text,
  ListView,
  WebView,
  StyleSheet
} from 'react-native';

import api from '../Utils/api';
import Separator from '../Helpers/Separator';


var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    buttonText: {
        fontSize: 18,
        color: 'white'
    },
    button: {
        height: 60,
        backgroundColor: '#48BBEC',
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchInput: {
        height: 60,
        padding: 10,
        fontSize: 18,
        color: '#111',
        flex: 10
    },
    rowContainer: {
        padding: 10
    },
    footerContainer: {
        backgroundColor: '#E3E3E3',
        alignItems: 'center',
        flexDirection: 'row'
    }
});

class Notes extends React.Component{

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    this.state = {
      dataSource: this.ds.cloneWithRows(this.props.notes),
      note: '',
      error: ''
    }
  }

  handleChange(e) {
    this.setState({
      note: e.nativeEvent.text
    });
  }

  handleSubmit() {
    var note = this.state.note;

    this.setState({
      note: ''
    });

    api.addNote(this.props.userInfo.login, note)
       .then((data) => {
        api.getNotes(this.props.userInfo.login)
           .then((data) => {
              this.setState({
                dataSource: this.ds.cloneWithRows(data)
              })
           });
       }).catch((err) => {
        console.log('Error', err);
        this.setState({error});
       }) 
  }

  footer() {
    return(
      <View style={styles.footerContainer}>
        <TextInput
          style={styles.searchInput}
          value={this.state.note}
          onChange={(e) => this.handleChange(e)}
          placeholder='New Note' />
          <TouchableHighlight
            style={styles.button}
            onPress={() => this.handleSubmit()}
            underlayColor='#88D4F5'>
              <Text style={styles.buttonText}>Submit</Text>
          </TouchableHighlight>
      </View>
    )
  }

  renderRow() {
    return (
      <View>
        <View style={styles.rowContainer}>
          <Text> {rowDataText} </Text>
        </View>
        <Separator />
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          render={this.renderRow}
          renderHeader={() => <Badge userInfo={this.props.userInfo} />} />
      </View>
    )
  }
};

Notes.propTypes = {
    userInfo: React.PropTypes.object.isRequired,
    notes: React.PropTypes.object.isRequired
}

module.exports = Notes;