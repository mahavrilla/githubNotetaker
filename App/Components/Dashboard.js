import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableHighlight,
} from 'react-native';

var styles = StyleSheet.create({
  container: {
    marginTop: 65,
    flex: 1
  },
  image: {
    height: 350,
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  }
});


class Dashboard extends React.Component{
  makeBackgound(btn) {
    var obj = {
      flexDirection: 'row',
      alignSelf: 'stretch',
      justifyContent: 'center',
      flex: 1
    }

    if( btn === 0) {
      obj.backgroundColor = '#48BBEC'
    } else if (btn === 1) {
      obj.backgroundColor = '#E77AAE'
    } else {
      obj.backgroundColor = '#7588F4'
    }

    return obj;
  }

  goToProfile() {
    console.log('Go to Profile')
  }

  goToRepos() {
    console.log('Go to Repos')
  }

  goToNotes() {
    console.log('Go to Notes')
  }

  render() {
    console.log( this.props.userInfo);
    return(
      <View style={styles.container}>
        <Image source={{uri: this.props.userInfo.avatar_url}} style={styles.image}/>
        <TouchableHighlight
          style={this.makeBackgound(0)}
          onPress={() => this.goToProfile()}
          underlayColor="#88D4F5">
            <Text style={styles.buttonText}> View Profile </Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={this.makeBackgound(1)}
          onPress={() => this.goToRepos()}
          underlayColor="#88D4F5">
            <Text style={styles.buttonText}> View Repos </Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={this.makeBackgound(3)}
          onPress={() => this.goToNotes()}
          underlayColor="#88D4F5">
            <Text style={styles.buttonText}> View Notes </Text>
        </TouchableHighlight>
      </View>
    );
  }
};



module.exports = Dashboard;