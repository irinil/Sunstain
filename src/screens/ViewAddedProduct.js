import React from 'react';
import { FlatList, View, Text, TouchableOpacity, Alert } from 'react-native';
import {ViewAddedProductStyle} from "../AppStyles";
import { search, userID } from '../utils/utils'
import gp from '../utils/globalParams'; 


const ViewAddedProductScreen = function ({ navigation }) {
  const [items, setItems] = React.useState([]);
  
    search({username:gp.userId()})
      .then(setItems)
      .catch(err => {
        console.log(err);
        //Alert.alert('ERROR', 'Please try again. If the problem persists contact an administrator.', [{text: 'OK'}]);
      });
  
  const Item = (props) => {
    return (
      <TouchableOpacity style={ViewAddedProductStyle.itemTouchable}
          onPress={() => { navigation.navigate('EditProduct', { item: props }); }}>
        <View style={ViewAddedProductStyle.itemView}>
          <Text style={ViewAddedProductStyle.itemName}>{props.name}</Text>
          <Text style={ViewAddedProductStyle.itemQuantity}> ( {props.quantity} ) </Text>
        </View>
        <Text style={ViewAddedProductStyle.itemDescription}>{props.description}</Text>
      </TouchableOpacity>
    );
  };
  
  if (items.length > 0) {
    return (
      <FlatList style={ViewAddedProductStyle.flatListView}
        data={items}
        renderItem={({ item }) => <Item {...item} />}
        keyExtractor={item => item.id || item['_id']}
      />
    )
  } else {
    return (
      <View style={ViewAddedProductStyle.emptyListView}>
        <Text style={ViewAddedProductStyle.emptyListText}>You currently have no energy products listed</Text>
      </View>
    )
  }
};

export default ViewAddedProductScreen;
