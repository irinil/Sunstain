import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import PickerSelect from 'react-native-picker-select';
import { CheckedIcon, UncheckedIcon } from '../images/svg-icons';
import Geolocation from '@react-native-community/geolocation';
import {AddProductStyle} from "../AppStyles";
import { update, remove, userID } from '../utils/utils'

const EditProductScreen = (props) => {
  const clearItem = { userID: userID(), e: 'Sell', name: '', description: '',price:'', location: '', contact: '', quantity: '1' }
  const [item, setItem] = React.useState(clearItem);
  const [useLocation, setUseLocation] = React.useState(false);
  const [position, setPosition] = React.useState({})

  React.useEffect(() => {
    props.navigation.addListener('focus', () => {
      const item = props.route.params.item;
      setItem({ 
        ...item,
        quantity: item.quantity.toString()
       });

      Geolocation.getCurrentPosition((pos) => {
        setPosition(pos);
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

  const updateItem = () => {
    const payload = {
      ...item,
      quantity: isNaN(item.quantity) ? 1 : parseInt(item.quantity),
      id: item.id || item['_id']
    };

    update(payload)
      .then(() => {
        Alert.alert('Done', 'Your item has been updated.', [{text: 'OK'}]);
        props.navigation.goBack();
      })
      .catch(err => {
        console.log(err);
        Alert.alert('ERROR', err.message, [{text: 'OK'}]);
      });
  };

  const confirmDelete = () => {
    Alert.alert(
      'Delete',
      'Are you sure you want to delete this item?',
      [
        { text: 'Cancel' },
        { text: 'Delete', onPress: () => deleteItem() }
      ]
    )
  }

  const deleteItem = () => {
    const payload = {
      ...item,
      id: item.id || item['_id']
    };

    remove(payload)
      .then(() => {
        Alert.alert('Done', 'Your item has been deleted.', [{text: 'OK'}]);
        props.navigation.goBack();
      })
      .catch(err => {
        console.log(err);
        Alert.alert('ERROR', err.message, [{text: 'OK'}]);
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
                { label: 'Sell', value: 'Sell' }
            ]}
          />
        </View>
        <View style={AddProductStyle.quantityArea}>
          <Text style={AddProductStyle.label}>Quantity</Text>
          <TextInput
            style={AddProductStyle.textInput}
            value={item.quantity}
            onChangeText={(t) => setItem({ ...item, quantity: t})}
            onSubmitEditing={updateItem}
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
        onSubmitEditing={updateItem}
        returnKeyType='send'
        enablesReturnKeyAutomatically={true}
        placeholder='e.g., 10 kwh'
        blurOnSubmit={false}
      />
      <Text style={AddProductStyle.label}>Contact</Text>
      <TextInput
        style={AddProductStyle.textInput}
        value={item.contact}
        onChangeText={(t) => setItem({ ...item, contact: t})}
        onSubmitEditing={updateItem}
        returnKeyType='send'
        enablesReturnKeyAutomatically={true}
        placeholder='user@domain.com'
      />
      <Text style={AddProductStyle.label}>Energy Provider</Text>
      <TextInput
        style={AddProductStyle.textInput}
        value={item.description}
        onChangeText={(t) => setItem({ ...item, description: t})}
        onSubmitEditing={updateItem}
        returnKeyType='send'
        enablesReturnKeyAutomatically={true}
        placeholder='e.g., Energy Provider'
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
        style={useLocation ? AddProductStyle.textInputDisabled : AddProductStyle.textInput}
        value={item.location}
        onChangeText={(t) => setItem({ ...item, location: t})}
        onSubmitEditing={updateItem}
        returnKeyType='send'
        enablesReturnKeyAutomatically={true}
        placeholder='street address, city, state'
      />

      {
        item.type !== '' &&
        item.name.trim() !== '' &&
        item.contact.trim() !== '' &&
        <TouchableOpacity onPress={updateItem}>
          <Text style={AddProductStyle.updateButton}>Update</Text>
        </TouchableOpacity>
      }

      <TouchableOpacity onPress={confirmDelete}>
        <Text style={AddProductStyle.deleteButton}>Delete</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditProductScreen;
