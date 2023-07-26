import React,{ useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    Text,
    ScrollView,
    SafeAreaView
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { GlobalStyles } from '../styles/GlobalStyles';
import EditprofileScreen from '../screens/EditprofileScreen';
import { auth, currentUser } from '../AppConfig/firebase';
import { signOut } from 'firebase/auth';
import MenuCard from '../component/MenuCard';
import { getFirestore, collection, addDoc, deleteDoc, doc, getDocs,onSnapshot } from 'firebase/firestore';

const ProfileStack = createStackNavigator();

const ProfilePage = ({ navigation }) => {

    const [userEmail, setUserEmail] = useState('');
    const [favoriteMenus, setFavoriteMenus] = useState([]);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUserEmail(user.email);
                fetchFavoriteMenus(user.uid);
            }
        });

        return () => unsubscribe();
    }, []);

    const fetchFavoriteMenus = (uid) => {
        const db = getFirestore();
        const favoriteMenuRef = collection(db, 'users', uid, 'favoriteMenu');
        
        onSnapshot(favoriteMenuRef, (snapshot) => {
          const favoriteMenusData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setFavoriteMenus(favoriteMenusData);
        }, (error) => {
          console.log('เกิดข้อผิดพลาดในการดึงข้อมูลรายการโปรด', error);
        });
      };
      


    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                navigation.navigate('SignIn');
            })
            .catch((error) => {
                console.error('Logout Error:', error);
            });
    };

    return (
        <SafeAreaView style={GlobalStyles.SafeAreaViewstyle}>
            <View style={styles.profileContainer}>
                <Text style={{
                    alignContent: 'center',
                    marginTop: 10, fontSize: 24, fontWeight: 'bold',
                }}>
                    Profile
                </Text>

                <Text style={[styles.cardTitle, { color: 'black' }]}>Login as: {userEmail}</Text>
                {/*ชื่อ user*/}
                <TouchableOpacity style={styles.editProfileButton} onPress={() => navigation.navigate('Edit Profile')}>
                    <Text style={styles.editProfileText}>Edit Profile</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.cardContainer}>
                {/* My Menu Card */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>My Favourites</Text>


                    <View style={styles.coffeeCard}>
                        <ScrollView
                            contentContainerStyle={styles.scrollContainer}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}>

                                
                                    
                            {favoriteMenus.map((menu) => (
                                <TouchableOpacity style={styles.wrapCard} key={menu.id}>
                                <MenuCard
                                    name={menu.name}
                                    image={menu.image}
                                // ส่ง prop เพิ่มเติมตามความต้องการ
                                />
                                </TouchableOpacity>
                            ))}

                                

                        </ScrollView>

                    </View>
                </View>
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
        </SafeAreaView>);
};

const ProfileScreen = () => {
    return (
        <ProfileStack.Navigator>
            <ProfileStack.Screen name="ProfilePage" component={ProfilePage} options={{ headerShown: false }} />
            <ProfileStack.Screen name="Edit Profile" component={EditprofileScreen} options={{ headerShown: false }} />
        </ProfileStack.Navigator>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        marginRight: 1,
    },
    image: {
        backgroundColor: 'black',
        width: 120,
        height: 120,
        padding: 10,
        borderRadius: 15,
    },
    title: {
        fontSize: 18,
        fontWeight: 'normal',
        color: '#000000',
        marginVertical: 5,
    },
    profileContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
        borderWidth: 5,
        borderColor: '#000000',
    },
    editProfileButton: {
        backgroundColor: '#4B1F0B',
        paddingVertical: 10,
        paddingHorizontal: 24,
        borderRadius: 20,
        marginBottom: 10,
    },
    editProfileText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
    },
    cardContainer: {
        borderRadius: 15,
        marginBottom: 5,
        width: '100%',
        padding: 5
    },
    card: {
        backgroundColor: '#4B1F0B',
        borderRadius: 15,
        padding: 15,
        marginBottom: 10,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 10,
        color: 'white',
    },
    coffeeCard: {
        backgroundColor: 'transparent',
        borderRadius: 8,
        // padding: 5,
        marginBottom: 10,
        height: 200,
    },
    scrollContainer: {
        flexWrap: 'wrap',
        flexGrow: 1
    },
    logoutButton: {
        backgroundColor: '#4B1F0B',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 20,
    },
    logoutButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    favButton: {
        backgroundColor: '#4B1F0B',
        paddingVertical: 10,
        paddingHorizontal: 120,
        borderRadius: 20,
        marginBottom: 30,
    },
    favButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    wrapCard: {
        height: undefined,
        width: 160,
        marginLeft: 10
    },

});

export default ProfileScreen;
