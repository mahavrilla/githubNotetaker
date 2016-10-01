import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableHighlight,
} from 'react-native';
import Profile from './Profile';
import Repositories from './Repositories';
import Notes from './Notes';
import api from '../Utils/api';

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
    this.props.navigator.push({
      title: 'Profile Page',
      component: Profile,
      passProps: {userInfo: this.props.userInfo}
    });
  }

  goToRepos() {

    api.getRepos(this.props.userInfo.login)
      .then((res) => {
        this.props.navigator.push({
          title: 'Repos',
          component: Repositories,
          passProps: {
            userInfo: this.props.userInfo, 
            repos: res
          }
        });
      });
  }

  goToNotes() {
    console.log('Go to Notes')
    api.getNotes(this.props.userInfo.login)
      .then((res) => {
        res == res || {};
        this.props.navigator.push({
          title: 'Notes',
          component: Notes,
          passProps: {
            userInfo: this.props.userInfo, 
            notes: res
          }
        });
      });
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