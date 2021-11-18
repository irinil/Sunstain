import React from "react";

import {View, ScrollView, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import PickerSelect from 'react-native-picker-select';
import { CheckedIcon, UncheckedIcon } from '../images/svg-icons';
import { connect } from "react-redux";
import { add, userID } from '../utils/utils'
import {AddProductStyle} from "../AppStyles";
import Geolocation from '@react-native-community/geolocation';



const mapStateToProps = state => ({
  user: state.auth.user
});

const AddProductScreen = function ({ navigation }) {
  const clearItem = { userID: userID(), type: 'Sell', name: '', description: '', location: '', contact: '', quantity: '1',price: '' }
  const [item, setItem] = React.useState(clearItem);
  const [useLocation, setUseLocation] = React.useState(true);
  const [position, setPosition] = React.useState({})

  React.useEffect(() => {
    navigation.addListener('focus', () => {
      Geolocation.getCurrentPosition((pos) => {
        setPosition(pos)
        if (useLocation) {
          setItem({
            ...item,
            location: `${pos.coords.latitude},${pos.coords.longitude}`
          })
        }
      });
    })
  }, []);

  const toggleUseLocation = () => {
    if (!useLocation && position) {
      setItem({
        ...item,
        location: `${position.coords.latitude},${position.coords.longitude}`
      })
    }
    setUseLocation(!useLocation);
  };

  const sendItem = () => {
    const payload = {
      ...item,
      quantity: isNaN(item.quantity) ? 1 : parseInt(item.quantity)
    };

    add(payload)
      .then(() => {
        Alert.alert('Thank you!', 'Your item has been added.', [{text: 'OK'}]);
        setItem({ ...clearItem, location: payload.location });
      })
      .catch(err => {
        console.log(err);
        Alert.alert('ERROR', 'Please try again. If the problem persists contact an administrator.', [{text: 'OK'}]);
      });
  };

  return (
    <ScrollView style={AddProductStyle.outerView}>
      <View style={AddProductStyle.splitView}>
        <View style={AddProductStyle.typeArea}>
          <Text style={AddProductStyle.label}>Type</Text>
          <PickerSelect
            style={{ inputIOS: AddProductStyle.selector }}
            value={item.type}
            onValueChange={(t) => setItem({ ...item, type: t })}
            items={[
                { label: 'Sell', value: 'Sell' },
            ]}
          />
        </View>
        <View style={AddProductStyle.quantityArea}>
          <Text style={AddProductStyle.label}>Quantity</Text>
          <TextInput
            style={AddProductStyle.textInput}
            value={item.quantity}
            onChangeText={(t) => setItem({ ...item, quantity: t})}
            onSubmitEditing={sendItem}
            returnKeyType='send'
            enablesReturnKeyAutomatically={true}
            placeholder='e.g., 10'
            keyboardType='numeric'
          />
        </View>
      </View>
  
      <Text style={AddProductStyle.label}>Name</Text>
      <TextInput
        style={AddProductStyle.textInput}
        value={item.name}
        onChangeText={(t) => setItem({ ...item, name: t})}
        onSubmitEditing={sendItem}
        returnKeyType='send'
        enablesReturnKeyAutomatically={true}
        placeholder='e.g., 10 kWh'
        blurOnSubmit={false}
      />
      <Text style={AddProductStyle.label}>Contact</Text>
      <TextInput
        style={AddProductStyle.textInput}
        value={item.contact}
        onChangeText={(t) => setItem({ ...item, contact: t})}
        onSubmitEditing={sendItem}
        returnKeyType='send'
        enablesReturnKeyAutomatically={true}
        placeholder='user@domain.com'
      />
      <Text style={AddProductStyle.label}>Description</Text>
      <TextInput
        style={AddProductStyle.textInput}
        value={item.description}
        onChangeText={(t) => setItem({ ...item, description: t})}
        onSubmitEditing={sendItem}
        returnKeyType='send'
        enablesReturnKeyAutomatically={true}
        placeholder='e.g., 10 kWh from solar panels'
      />

      <Text style={AddProductStyle.label}>Price</Text>
      <TextInput
        style={AddProductStyle.textInput}
        value={item.price}
        onChangeText={(t) => setItem({ ...item, price: t})}
        onSubmitEditing={sendItem}
        returnKeyType='send'
        enablesReturnKeyAutomatically={true}
        placeholder='10$'
      />
      <Text style={AddProductStyle.label}>Location</Text>
      <View style={AddProductStyle.checkboxContainer}>
        <TouchableOpacity onPress={toggleUseLocation}>
          {
            (useLocation)
              ?
              <CheckedIcon height='18' width='18'/>
              :
              <UncheckedIcon height='18' width='18'/>
          }
        </TouchableOpacity>
        <Text style={AddProductStyle.checkboxLabel}> Use my current location </Text>
      </View>
      <TextInput
        style={AddProductStyle.textInput}
        value={item.location}
        onChangeText={(t) => setItem({ ...item, location: t})}
        onSubmitEditing={sendItem}
        returnKeyType='send'
        enablesReturnKeyAutomatically={true}
        placeholder='street address, city, state'
        editable={!useLocation}
      />
  
      {
        item.type !== '' &&
        item.name.trim() !== '' &&
        item.contact.trim() !== '' &&
        <TouchableOpacity onPress={sendItem}>
          <Text style={AddProductStyle.button}>Add</Text>
        </TouchableOpacity>
      }
    </ScrollView>
  );

};


export default connect(mapStateToProps)(AddProductScreen);


