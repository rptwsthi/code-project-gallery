import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,Dimensions,
    FlatList,
    Image
  } from 'react-native';
  import {Gallery} from './gallery-components';

  export default class Home extends Component {

    constructor(props){
        super(props);
        
    }

    render(){
        return(
               <Gallery type={"all"} navigation = {this.props.navigation}/>
        )
    }
  }

