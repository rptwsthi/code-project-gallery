import AsyncStorage from '@react-native-async-storage/async-storage';

export function updateFavorite(data){
    
    getFavourites().then((response) => {
       
        if(response && response.length>0){
        
            var list = JSON.parse(response);
            var tempList = [];
            var found = false;
            for(var i=0; i<list.length; i++){
                if(list[i].id != data.id){
                    tempList.push(list[i]);
                }else{
                    found = true;
                }
            }
            if(!found){
                tempList.push(data);
                // alert("hi")
            }
            AsyncStorage.setItem('favs', JSON.stringify(tempList))
        }else{
            
            AsyncStorage.setItem('favs', JSON.stringify([data]))
        }
    })

}

export const IsFav = async (data) => {
    var response = await getFavourites();

    // getFavourites().then((response) => {
        if(response && response.length>0){
            var list = JSON.parse(response);
            var found = false;
            // alert(response)
            for(var i=0; i<list.length; i++){
                if(list[i].id == data.id){
                    found = true;
                  
                }
            }
           return found;
        }else{
            return false;
        }
    // })
}

export const getFavourites = async () => {
    let jsonList = '';
    try{
        jsonList = await AsyncStorage.getItem('favs') || '';
        // alert(jsonList)
    }catch(error){
        alert("error get fav")
    }
    return jsonList;
}