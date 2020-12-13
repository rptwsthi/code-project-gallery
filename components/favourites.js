import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
  } from 'react-native';
  import {Gallery} from './gallery-components';

  export default class Favourites extends Component {

    constructor(props){
        super(props);
        
    }

    render(){
        return(
               <Gallery type={"fav"} navigation = {this.props.navigation}/>
        )
    }
  }