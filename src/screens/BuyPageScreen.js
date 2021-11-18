import React from "react";
//import { Button } from 'react-bootstrap';
//import {Card } from 'react-bootstrap'
//import {Col} from 'react-bootstrap'
import {
    ScrollView,
    Text,
    Alert,
    TouchableOpacity
  } from 'react-native'

import {AddProductStyle} from "../AppStyles";

const BuyPageScreen =(props) => {
const [items, setItems] = React.useState([]);

const sendItem = () => {
    Alert.alert('Thank you!', 'Your Service provider has accepted your request and the provided amount will be discounted from your next electricity bill.', [{text: 'OK'}]);
  };

    //const clearItem = { userID: userID(), e: 'Sell', name: '', description: '',price:'', location: '', contact: '', quantity: '1' }
    //const [item, setItem] = React.useState(clearItem);
        return (
            <ScrollView style={AddProductStyle.outerView}>
                    <Text>Title: {props.name}</Text>
                    <Text>Price : {props.price} </Text>
                    <TouchableOpacity onPress={sendItem}>
                         <Text style={AddProductStyle.button}>Buy</Text>
                    </TouchableOpacity>
            </ScrollView>  )
}

export default BuyPageScreen;
