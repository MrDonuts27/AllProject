import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import MenuCard from '../component/MenuCard';
import SearchBar from '../component/SearchBar';
import { GlobalStyles } from '../styles/GlobalStyles';
import { collection, getDocs } from 'firebase/firestore/lite';
import { DB } from '../AppConfig/firebase';
import { createStackNavigator } from '@react-navigation/stack';
import CoffeeDetailScreen from './CoffeeDetailScreen';
import { useNavigation } from '@react-navigation/native';

const MenuStack = createStackNavigator();

export default function MenuScreen() {
  return (
    <MenuStack.Navigator>
      <MenuStack.Screen name="MenuList" component={MenuList} options={{ headerShown: false }} />
      <MenuStack.Screen name="CoffeeDetail" component={CoffeeDetailScreen} options={{ headerShown: false }} />
    </MenuStack.Navigator>
  );
}

function MenuList() {
  const [menuList, setMenuList] = useState([]);
  const [filteredMenuList, setFilteredMenuList] = useState([]);

  useEffect(() => {
    const getMenu = async () => {
      try {
        const menuColRef = collection(DB, 'Coffee-Menu');
        const menuSnapshot = await getDocs(menuColRef);
        const menuListData = menuSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMenuList(menuListData);
      } catch (error) {
        console.error('Error fetching menu:', error);
      }
    };

    getMenu();
  }, []);

  const navigation = useNavigation();

  const handleSearch = (searchText) => {
    const formattedSearchText = searchText.trim().toLowerCase();
    const filteredItems = menuList.filter((item) =>
      item.name.toLowerCase().includes(formattedSearchText)
    );
    setFilteredMenuList(filteredItems);
  };

  return (
    <SafeAreaView style={GlobalStyles.SafeAreaViewstyle}>
      <SearchBar onSearch={handleSearch} />
      <ScrollView contentContainerStyle={styles.view} showsVerticalScrollIndicator={false}>
        {(filteredMenuList.length > 0 ? filteredMenuList : menuList).map((item) => (
          <TouchableOpacity
            style={styles.CardStyle}
            key={item.id}
            onPress={() => navigation.navigate('CoffeeDetail', { ...item })}
          >
            <MenuCard {...item} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  view: {
    paddingTop: 5,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  CardStyle: {
    width: '45%',
  },
});
