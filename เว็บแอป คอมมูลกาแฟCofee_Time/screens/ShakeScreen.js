import React, { useEffect, useState } from 'react';
import { Text, View, Image, Button, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Gyroscope } from 'expo-sensors';
import { collection, getDocs } from 'firebase/firestore/lite';
import { DB } from '../AppConfig/firebase';
import MenuCard from '../component/MenuCard';
import { GlobalStyles } from '../styles/GlobalStyles';

const ShakeRandomizer = ({ navigation }) => {
  const [randomProduct, setRandomProduct] = useState(null);
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    let subscription;

    const startShakeDetection = async () => {
      subscription = Gyroscope.addListener(({ x, y, z }) => {
        const shakeThreshold = 1.2;

        if (!isShaking && (Math.abs(x) > shakeThreshold || Math.abs(y) > shakeThreshold || Math.abs(z) > shakeThreshold)) {
          fetchRandomProduct();
          setIsShaking(true);
        }
      });

      Gyroscope.setUpdateInterval(100); // ตั้งค่าความถี่ในการอัปเดตข้อมูล gyroscope
    };

    const fetchRandomProduct = async () => {
      try {
        const menuColRef = collection(DB, 'Coffee-Menu');
        const menuSnapshot = await getDocs(menuColRef);
        const menuListData = menuSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const randomIndex = Math.floor(Math.random() * menuListData.length);
        const selectedProduct = menuListData[randomIndex];
        setRandomProduct(selectedProduct);
      } catch (error) {
        console.error('Error fetching menu:', error);
      }
    };

    const stopShakeDetection = () => {
      subscription && subscription.remove();
    };

    startShakeDetection();

    return () => {
      stopShakeDetection();
    };
  }, [isShaking]);

  const handleShakeAgain = () => {
    setIsShaking(false);
  };

  const handleBack = () => {
    navigation.navigate('HomePage');
  };

  return (
    <SafeAreaView style={GlobalStyles.SafeAreaViewstyle}>
      <TouchableOpacity style={styles.blackBtn} onPress={handleBack}>
        <Image source={require('../assets/icon/Back.png')} style={styles.iconSize} />
        <Text style={styles.blackText}>Back</Text>
      </TouchableOpacity>
      <View style={styles.Viewcontain}>


        {randomProduct ? (
          <>
            <View style={styles.ViewContent}>
              <MenuCard {...randomProduct} />
              <TouchableOpacity style={styles.btn} onPress={handleShakeAgain}>
                <Text style={styles.Textstyle}>
                  Shake Again
                </Text>
              </TouchableOpacity>
            </View>

          </>
        ) : (
          <Text style={{ fontSize: 24 }}>Shake Shake It!</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Viewcontain: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  ViewContent: {
    marginHorizontal: 20
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    backgroundColor: '#712D0F',
    borderRadius: 15,
    padding: 12,
  },
  Textstyle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
  },
  blackBtn: {
    width: '90%',
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  iconSize: {
    width: 20,
    height: 20,
  },
  blackText: {
    marginLeft: 3
  },
});

export default ShakeRandomizer;
