import React, { useState,useEffect } from 'react';
import { StyleSheet, View, Image, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { GlobalStyles } from '../styles/GlobalStyles';
import { getFirestore, collection, addDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


const CoffeeDetailScreen = ({ navigation }) => {
  const route = useRoute();
  const { image, description, name, recipe, step } = route.params;

  const formattedRecipe = recipe.map((item, index) => `${index + 1}. ${item}`);
  const formattedStep = step.map((item, index) => `${index + 1}. ${item}`);

  const [isFavorite, setIsFavorite] = useState(false); // เพิ่มสถานะใหม่

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
          const uid = user.uid;
          const db = getFirestore();
          const favoriteMenuRef = collection(db, 'users', uid, 'favoriteMenu');
          const favoriteMenusSnapshot = await getDocs(favoriteMenuRef);
          const existingFavoriteMenus = favoriteMenusSnapshot.docs.map((doc) => doc.data());
  
          const isMenuAlreadyFavorite = existingFavoriteMenus.some(
            (menu) => menu.name === name && menu.description === description
          );
  
          setIsFavorite(isMenuAlreadyFavorite);
        }
      } catch (error) {
        console.log('เกิดข้อผิดพลาดในการเรียกดูสถานะเมนูโปรด:', error);
      }
    };

    fetchFavoriteStatus();
  }, []);

  const handleBack = () => {
    navigation.navigate('MenuList');
  };

  const handleAddToFavorites = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const uid = user.uid;
        const db = getFirestore();
        const favoriteMenuRef = collection(db, 'users', uid, 'favoriteMenu');
        const favoriteMenusSnapshot = await getDocs(favoriteMenuRef);
        const existingFavoriteMenus = favoriteMenusSnapshot.docs.map((doc) => doc.data());
  
        // เช็คว่าเมนูนี้มีอยู่ในรายการโปรดแล้วหรือไม่
        const isMenuAlreadyFavorite = existingFavoriteMenus.some(
          (menu) => menu.name === name && menu.description === description
        );
  
        if (!isMenuAlreadyFavorite) {
          const favoriteMenu = {
            image,
            description,
            name,
            recipe,
            step,
          };
          await addDoc(favoriteMenuRef, favoriteMenu);
          console.log('เพิ่มเมนูโปรดเรียบร้อยแล้ว');
          setIsFavorite(true);
        } else {
          console.log('เมนูนี้อยู่ในรายการโปรดแล้ว');
        }
      }
    } catch (error) {
      console.log('เกิดข้อผิดพลาดในการเพิ่มเมนูโปรด:', error);
    }
  };
  
  const handleRemoveFromFavorites = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const uid = user.uid;
        const db = getFirestore();
        const favoriteMenuRef = collection(db, 'users', uid, 'favoriteMenu');
        const favoriteMenusSnapshot = await getDocs(favoriteMenuRef);
        const favoriteMenus = favoriteMenusSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  
        // หาเมนูที่ต้องการลบในรายการโปรด
        const menuToDelete = favoriteMenus.find((menu) => menu.name === name && menu.description === description);
  
        if (menuToDelete) {
          await deleteDoc(doc(favoriteMenuRef, menuToDelete.id));
          console.log('นำเมนูออกจากรายการโปรดเรียบร้อยแล้ว');
          setIsFavorite(false);
        } else {
          console.log('ไม่พบเมนูนี้ในรายการโปรด');
        }
      }
    } catch (error) {
      console.log('เกิดข้อผิดพลาดในการนำเมนูออกจากรายการโปรด:', error);
    }
  };
  

  return (
    <SafeAreaView style={GlobalStyles.SafeAreaViewstyle}>
      <View style={GlobalStyles.container}>
        <TouchableOpacity style={styles.blackBtn} onPress={handleBack}>
          <Image source={require('../assets/icon/Back.png')} style={styles.iconSize} />
          <Text style={styles.blackText}>Back</Text>
        </TouchableOpacity>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: image }} />
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.HeaderText}>{name}</Text>
          <TouchableOpacity style={styles.wrapimg} onPress={isFavorite ? handleRemoveFromFavorites : handleAddToFavorites}>
            <Image source={isFavorite ? require('../assets/icon/heart_red.png') : require('../assets/icon/heart.png')} style={styles.ImageSize} />
          </TouchableOpacity>
        </View>
        <View style={styles.descContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.HeaderText}>Description</Text>
            <Text style={styles.contentText}>{description}</Text>
            <Text style={styles.HeaderText}>Recipe</Text>
            {formattedRecipe.map((item, index) => (
              <Text style={styles.contentText} key={index}>{item}</Text>
            ))}
            <Text style={styles.HeaderText}>Step</Text>
            {formattedStep.map((item, index) => (
              <Text style={styles.contentText} key={index}>{item}</Text>
            ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CoffeeDetailScreen;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 16 / 9,
    resizeMode: 'center',
  },
  iconSize: {
    width: 20,
    height: 20,
  },
  imageContainer: {
    marginHorizontal: 15,
    backgroundColor: 'black',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'black',
    shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    flexWrap: 'wrap',
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameContainer: {
    width: '90%',
    flex: 1,
    backgroundColor: '#F5E7C5',
    borderRadius: 15,
    marginVertical: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  HeaderText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },
  descContainer: {
    padding: 10,
    width: '90%',
    flex: 6,
    backgroundColor: '#F5E7C5',
    borderRadius: 15,
  },
  contentText: {
    fontSize: 14,
    textAlign: 'justify',
    color: 'black',
    marginHorizontal: 10,
  },
  blackBtn: {
    width: '90%',
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
  },
  blackText: {
    marginLeft: 3,
  },
  ImageSize: {
    width: '50%',
    height: undefined,
    aspectRatio: 1,
  },
  wrapimg: {
    height: '100%',
    width: undefined,
    aspectRatio: 1,
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
});
