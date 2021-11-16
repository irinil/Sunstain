import React from 'react';
import {Text, TextInput, FlatList, View, TouchableOpacity, Alert } from 'react-native';
import {SearchProductStyle} from "../AppStyles";

import { search } from '../utils/utils';

const SearchProductScreen = function ({ route, navigation }) {
  const [query, setQuery] = React.useState({ type: 'Food', name: '' });
  const [items, setItems] = React.useState([]);
  const [info, setInfo] = React.useState('');

  const Item = (props) => {
    return (
      <TouchableOpacity style={SearchProductStyle.itemTouchable}
         >
        <View style={SearchProductStyle.itemView}>
          <Text style={SearchProductStyle.itemName}>{props.name}</Text>
          <Text style={SearchProductStyle.itemQuantity}> ( {props.quantity} ) </Text>
        </View>
        <Text style={SearchProductStyle.itemDescription}>{props.description}</Text>
      </TouchableOpacity>
    );
  };

  const searchItem = () => {
    const payload = {
      ...query
    };

    search(payload)
      .then((results) => {
        setInfo(`${results.length} result(s)`)
        setItems(results);
      })
      .catch(err => {
        console.log(err);
        Alert.alert('ERROR', 'Please try again. If the problem persists contact an administrator.', [{text: 'OK'}]);
      });
  };

  return (
    <View style={SearchProductStyle.outerView}>
      <View style={SearchProductStyle.inputsView}>
        <Text style={SearchProductStyle.label}>Name</Text>
        <TextInput
          style={SearchProductStyle.textInput}
          value={query.name}
          onChangeText={(t) => setQuery({ ...query, name: t})}
          onSubmitEditing={searchItem}
          returnKeyType='send'
          enablesReturnKeyAutomatically={true}
          placeholder='e.g., 10 kwh'
          blurOnSubmit={false}
        />
        <TouchableOpacity onPress={searchItem}>
          <Text style={SearchProductStyle.button}>Search</Text>
        </TouchableOpacity>
      </View>

      <Text style={SearchProductStyle.searchResultText}>{info}</Text>

      <FlatList style={SearchProductStyle.flatListView}
        data={items}
        renderItem={({ item }) => <Item {...item} />}
        keyExtractor={item => item.id || item['_id']}
      />
    </View>
  );
};

export default SearchProductScreen;
