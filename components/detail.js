import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView, Platform,
    View,
    Text,
    StatusBar,Image,Dimensions,TouchableOpacity
  } from 'react-native';
  import Toast from 'react-native-simple-toast';
  import { updateFavorite, IsFav} from '../config/storage';
  const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');
  import {PERMISSIONS, request, RESULTS, requestMultiple} from 'react-native-permissions';
  import CameraRoll from '@react-native-community/cameraroll';
import RNFetchBlob from 'rn-fetch-blob';

  export default class Detail extends Component {
      constructor(props){
          super(props);
          this.item = this.props.navigation.state.params.item;
          this.imageHeight = (this.item.height/this.item.width)*deviceWidth;
          this.state = {
              imageStyle :  styles.ImageStyle,
              isMarkedFav : false
          }
          this.isFullScreen = true;
          IsFav(this.item).then((res) => {
            //   alert(res)
              this.setState({isMarkedFav : res});
          })
          
      }

      onFullScreen = () => {
        if(!this.isFullScreen){
            this.isFullScreen = true;
            this.setState({imageStyle : styles.ImageStyle})
        }else{
            this.isFullScreen = false;
            this.setState({imageStyle: {marginTop: (deviceHeight-this.imageHeight)/3 ,height:this.imageHeight, width:deviceWidth, resizeMode:'contain', position:"absolute"}})
        }
      }

      onFavorite = () => {
          this.setState({isMarkedFav : !this.state.isMarkedFav})
        updateFavorite(this.item)

      }

      requestPermission () {
        request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then(response => {
            if(response == RESULTS.GRANTED){
                this.startDownload();
            }else{
                alert("App does not have storage permission!")
            }

          })
      }

      onSave = () => {
          if(Platform.OS == "android"){
            this.requestPermission();
          }else{
            this.startDownload();
          }
      }

      startDownload = async () => {
        //   alert("start")
        RNFetchBlob.config({
          fileCache: true,
          appendExt: 'png',
        })
          .fetch('GET', this.item.links.download)
          .then(res => {
            // alert(res)
            CameraRoll.saveToCameraRoll(res.data, 'photo')
              .then(res => Toast.show("Image downloaded!"))
              .catch(err => console.log(err))
          })
          .catch(error =>console.log(error));
      }

    render(){
        return(
            <View style={styles.container}>
                <Image style = {this.state.imageStyle} source = {{uri:this.item.urls.full}}></Image>
                <Text style={styles.name}>{this.item.user.name}</Text>
                <View style={styles.bottomBar}>
                    <TouchableOpacity style={styles.imageConatiner} onPress = {this.onFavorite}>
                        <Image style={styles.bottomIcon} source = {(this.state.isMarkedFav) ? require('../assets/white_star.png') : require('../assets/star_favorite.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.imageConatiner} onPress = {this.onSave}>
                        <Image style={styles.bottomIcon} source = {require('../assets/download.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.imageConatiner} onPress = {this.onFullScreen}>
                        <Image style={styles.bottomIcon,{width:40,height:40}} source = {require('../assets/fullScreen.png')}/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
  }

  const styles = StyleSheet.create({
      name : {
          textAlign : 'center',
          fontSize : 18,
          height : 60,
          color : 'white',
          position : "absolute",
          backgroundColor:'#00000030',
          width:deviceWidth,
          padding : 15
      },
      bottomIcon : {
        width : 30,
        height:30,
        resizeMode:"cover",
      },
      imageConatiner : {
            width : 50,
            height : 70,
            justifyContent:'center'
      },
      bottomBar : {
        justifyContent:'center',
        flexDirection:'row',
        position:'absolute',
        alignSelf : 'flex-end',
        backgroundColor:'#00000030',
        width: deviceWidth,
        height : 120,
        marginTop:deviceHeight - 120 - 50
      },
      container : {
        flex:1,
        backgroundColor:'black',
        position : 'relative',
        // justifyContent:'center'
      },
        ImageStyle : {
            // alignSelf:'center',
            position:'absolute',
            width : deviceWidth,
            height:deviceHeight,
            resizeMode : "cover"
        }
  })