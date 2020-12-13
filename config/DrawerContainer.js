import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TouchableOpacity
  } from 'react-native';
  var obj;
export default class DrawerContainer extends Component {

    constructor(props){
        super(props);
        obj = this;
        this.state = {
            selected : 1
        }
    }

    onHome = () => {
        this.setState({selected:1})
        this.props.navigation.navigate('Home')
    }

    onFav = () => {
        this.setState({selected:2})
        this.props.navigation.navigate('Favourites')
    }

    render(){
        obj = this;
        return(
            <View style = {styles.container}>
                <TouchableOpacity onPress = {this.onHome}>
                    <Text style = {(obj.state.selected ==1) ? styles.uglyDrawerItemSelected : styles.uglyDrawerItem}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress = {this.onFav}>
                    <Text style = {(obj.state.selected ==2) ? styles.uglyDrawerItemSelected : styles.uglyDrawerItem}>Favourites</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        paddingTop : 100,
        paddingLeft : 30

    },
    uglyDrawerItem: {
        fontSize: 18,
        // fontFamily:light,
        color: '#000000',
        padding: 15,
        margin: 0,
        textAlign: 'left'
      },
      uglyDrawerItemSelected: {
        fontSize: 18,
        fontWeight: 'bold',
        // fontFamily:light,
        color: '#000000',
        padding: 15,
        margin: 0,
        
        textAlign: 'left'
      },
})