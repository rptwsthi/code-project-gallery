import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,Dimensions,
    FlatList,
    Image,
    TouchableOpacity
  } from 'react-native';
import { getImagesAsync } from '../config/apis';
const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');
import { getFavourites } from '../config/storage';

export class Gallery extends Component {
    constructor(props){
        super(props);
        this.state = {
            list : []
        }
        this.type = this.props.type;
        this.page = 1;
        this.requestCompleted = true;
        if(this.type == "all"){
            this.makeRequest();
        }else{
            getFavourites().then((response) => {
                var favs = JSON.parse(response);
                this.setState({list : [...this.state.list, ...favs]})
            })
        }
        
    }

    makeRequest() {
        getImagesAsync(this.page).then((response) => {
            // alert(response);
            console.log(JSON.stringify(response))
            this.setState({list : [...this.state.list, ...response]})
            this.requestCompleted = true;
        })
    }

    loadMore = () => {
        if(this.type != "all"){
            return;
        }
        if(!this.requestCompleted)
            return;
        this.requestCompleted = false;
        this.page = this.page +1;
        this.makeRequest();
    }

    render(){
        return(
            <FlatList
                style = {{height:deviceHeight,width:deviceWidth}}
                data = {this.state.list}
                keyExtractor = {(item) => item.id}
                numColumns = {3}
                onEndReached = {this.loadMore}
                renderItem = {
                    ({item}) => 
                    <View>
                        <ImageItem item = {item} navigation = {this.props.navigation} />
                    </View>
                   
                }
            ></FlatList>
        )
    }
}

export class ImageItem extends Component{

    constructor(props){
        super(props);
        this.item = this.props.item
        // alert(this.item.urls.thumb)
    }

    goToDetail = () => {
        this.props.navigation.navigate('Detail',{item:this.item});
    }

    render(){
        return(
            <TouchableOpacity style = {styles.container} onPress={this.goToDetail}>
                <Image style={styles.imageStyle} source = {{uri : this.item.urls.thumb}} />
            </TouchableOpacity>
        )
    }
  }

  const styles = StyleSheet.create({
    container : {
        width : (deviceWidth )/3,
        height : 250.5
    },
    imageStyle : {
        width : (deviceWidth - 2)/3,
        height : 250,
        resizeMode : 'cover'
    }
  })