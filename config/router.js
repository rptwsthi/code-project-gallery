import React from 'react';
import {createDrawerNavigator } from 'react-navigation-drawer';
import {createStackNavigator } from 'react-navigation-stack';
import { createAppContainer} from 'react-navigation';
import Home from '../components/home';
import Detail from '../components/detail';
import Favourites from '../components/favourites';
import DrawerContainer from './DrawerContainer';
import {
    TouchableOpacity,
   Image,
    StyleSheet,
  
  } from 'react-native';

const HomeStack  = createStackNavigator({
    Home : {screen : Home,
        navigationOptions: ({ navigation }) => ({
            title: "Home",
            headerLeft:(
              <TouchableOpacity style={styles.navBarButton} onPress={()=> navigation.toggleDrawer()}>
                <Image source={require('../assets/hamburger.png')} style={{width:20,height:20}}/>
              </TouchableOpacity>
            ),
        })
    },
    Detail : {screen : Detail},
    Favourites : {screen : Favourites,
        navigationOptions: ({ navigation }) => ({
            title: "Favourites",
            headerLeft:(
              <TouchableOpacity style={styles.navBarButton} onPress={()=> navigation.toggleDrawer()}>
                <Image source={require('../assets/hamburger.png')} style={{width:20,height:20}}/>
              </TouchableOpacity>
            ),
        })}
});

export const Drawernav = createDrawerNavigator({
    HomeStack : {screen : HomeStack}
},{
    initialRouteName:'HomeStack',
    contentComponent : DrawerContainer,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    gesturesEnabled: true,
    navigationOptions: ({navigation}) => ({
        headerStyle: {backgroundColor: '#ffffff'},
        headerTintColor: 'black',
        headerLeft:(
         <TouchableOpacity style={styles.navBarButton} onPress={()=> navigation.toggleDrawer()}>
         <Image source={require('../assets/hamburger.png')} style={{width:20,height:20}}/>
       </TouchableOpacity>
       ),
      })
})

export const AppContainer = createAppContainer(Drawernav);

const styles = StyleSheet.create({
    navBarButton : {
        width:44,
        height:44,
        resizeMode:'contain',
        alignItems : 'center',
        justifyContent : 'center',
    },
})
