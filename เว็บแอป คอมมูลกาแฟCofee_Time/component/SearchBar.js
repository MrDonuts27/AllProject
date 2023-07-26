import React, { useState } from 'react';
import { TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SearchBar({ onSearch }) {
  const [searchText, setSearchText] = useState('');

  const handleSearch = (text) => {
    
    setSearchText(text);
    onSearch(text);
  };


  return (
    <View
      style={{
        marginVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
      }}
    >
      <TextInput
        style={{
          width: '90%',
          backgroundColor: '#F5E7C5',
          fontSize: 16,
          padding: 10,
          paddingLeft: 15,
          borderRadius: 25,
          shadowColor: 'black',
          shadowOffset: {
            width: 1,
            height: 3,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3,
          elevation: 5,
        }}
        placeholder="Search Here..."
        value={searchText}
        onChangeText={handleSearch}
      />
      <Ionicons style={{ position: 'absolute', right: 40 }} size={20} name="search" />
    </View>
  );
}
