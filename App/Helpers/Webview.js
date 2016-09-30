import React, { Component } from 'react';

import {
  View,
  WebView,
  StyleSheet
} from 'react-native';


var styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#F6F6EF'
  }
});

class Web extends React.Component{

  render() {
    console.log('this.props.url', this.props.url);
    return (
      <View style={styles.container}>
        <WebView source={{uri: this.props.url}} />
      </View>
    )
  }
};

Web.propTypes = {
  url: React.PropTypes.string.isRequired
}

module.exports = Web;