import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity,Image } from 'react-native';
import NewsCard from '../component/NewsCard';
import { GlobalStyles } from '../styles/GlobalStyles';
import { collection, getDocs } from 'firebase/firestore/lite';
import { DB } from '../AppConfig/firebase';
import { createStackNavigator } from '@react-navigation/stack';
import NewsDetailScreen from './NewsDetailScreen';
import ShakeItScreen from './ShakeScreen';

import { useNavigation } from '@react-navigation/native';


const MenuStack = createStackNavigator();

export default function HomeScreen() {
  return (
    <MenuStack.Navigator>
      <MenuStack.Screen name="HomePage" component={HomePage} options={{ headerShown: false }} />
      <MenuStack.Screen name="NewsDetail" component={NewsDetailScreen} options={{ headerShown: false }} />
      <MenuStack.Screen name="ShakeIt" component={ShakeItScreen} options={{ headerShown: false }} />
    </MenuStack.Navigator>
  );
}

function HomePage() {
  const [NewList, setNewList] = useState([]);
  const [filteredMenuList, setFilteredMenuList] = useState([]);

  useEffect(() => {
    const getMenu = async () => {
      try {
        const menuColRef = collection(DB, 'News');
        const menuSnapshot = await getDocs(menuColRef);
        const menuListData = menuSnapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          description: doc.data().description,
          ...doc.data(),
        }));
        setNewList(menuListData);
      } catch (error) {
        console.error('Error fetching menu:', error);
      }
    };

    getMenu();
  }, []);

  const navigation = useNavigation();

  const handleShake = () => {
    navigation.navigate('ShakeIt');

  };
  return (
    <SafeAreaView style={GlobalStyles.SafeAreaViewstyle}>
      <View style={styles.viewContainer}>
        <Text style={GlobalStyles.H1}>News</Text>
        <ScrollView contentContainerStyle={styles.view} horizontal={true}
          showsHorizontalScrollIndicator={false}>
          {(filteredMenuList.length > 0 ? filteredMenuList : NewList).map((item) => (
            <TouchableOpacity
              style={styles.box}
              key={item.id}
              onPress={() => navigation.navigate('NewsDetail', { ...item })}
            >
              <NewsCard {...item} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.viewContainer}>
        <Text style={GlobalStyles.H1}>Other</Text>

        <TouchableOpacity onPress={handleShake} style={styles.ButtonBox}>
          <Image source={require('../assets/icon/shake.png')}
          style={styles.ImageSize}/>
          <Text style={GlobalStyles.H1}>Shake It!!</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    padding: 10,
  },
  box: {
    width: 275,
    borderRadius: 15,
  },
  ButtonBox: {
    width: 150,
    height: 150,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5E7C5',
    borderRadius: 15,
    elevation: 5,
    shadowColor: 'black',
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
        height: 3,
        width: 2
    },
    flexDirection: 'column',
  },
  ImageSize: {
    width: '50%',
    height: undefined,
    aspectRatio: 1,

  },


});
