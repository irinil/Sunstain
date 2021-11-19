import React from "react";
import {
    ScrollView,
    Text,
    Alert,
    TouchableOpacity
  } from 'react-native'

import {BuyProductStyle} from "../AppStyles";
import {AddProductStyle} from "../AppStyles";

const BuyPageScreen =(props) => {

const sendItem = () => {
    Alert.alert('Thank you!', 'Your Service provider has accepted your request and the provided amount will be discounted from your next electricity bill.', [{text: 'OK'}]);
  };
        return (
            <ScrollView style={AddProductStyle.outerView}>
                    <Text style={BuyProductStyle.title}>Name: {props.name}</Text>
                    <Text style={BuyProductStyle.price}> Quantity : {props.quantity} </Text>
                    <Text style={BuyProductStyle.price}> Contact : {props.contact} </Text>
                    <Text style={BuyProductStyle.price}> Price : {props.price} </Text>
                    <TouchableOpacity onPress={sendItem}>
                         <Text style={AddProductStyle.button}>Buy</Text>
                    </TouchableOpacity>
            </ScrollView>  )
}

export default BuyPageScreen;
