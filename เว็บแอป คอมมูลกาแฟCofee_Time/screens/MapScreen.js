import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import SearchBar from '../component/SearchBar';
import { GlobalStyles } from '../styles/GlobalStyles';
import { collection, getDocs, query } from 'firebase/firestore/lite';
import { DB } from '../AppConfig/firebase';

const MapScreen = () => {
  const [mapList, setMapList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [originalMapList, setOriginalMapList] = useState([]);

  useEffect(() => {
    const getMap = async () => {
      try {
        const mapColRef = collection(DB, 'Markers');
        let mapQuery = query(mapColRef);
        const mapSnapshot = await getDocs(mapQuery);
        const mapListData = mapSnapshot.docs.map((doc) => ({
          id: doc.id,
          latitude: doc.data().location.latitude,
          longitude: doc.data().location.longitude,
          title: doc.data().title,
        }));
        setMapList(mapListData);
        setOriginalMapList(mapListData); // Save the original data
      } catch (error) {
        console.error('Error fetching menu:', error);
      }
    };

    getMap();
  }, []);

  const handleSearch = (searchText) => {
    const formattedSearchText = searchText.trim().toLowerCase();

    if (formattedSearchText === '') {
      // Reset mapList to the original data fetched from Firebase
      setMapList(originalMapList);
    } else {
      const filteredItems = originalMapList.filter((item) =>
        item.title.toLowerCase().includes(formattedSearchText)
      );
      setMapList(filteredItems);
    }
  };

  const initialRegion = {
    latitude: 14.882018,   // Latitude of Suranaree University Of Technology
    longitude: 102.021140, // Longitude of Suranaree University Of Technology
    latitudeDelta: 0.0922,  // Delta values determine the zoom level of the map
    longitudeDelta: 0.0421,
  };

  return (
    <View style={GlobalStyles.SafeAreaViewstyle}>
      <View style={{ backgroundColor: 'transparent' }}>
        <SearchBar onSearch={handleSearch} />
      </View>
      <View style={styles.container}>
        <MapView style={styles.map} initialRegion={initialRegion}>
          {mapList.map((item) => {
            const { id, latitude, longitude, title } = item;
            if (latitude && longitude) {
              return (
                <Marker
                  key={id}
                  coordinate={{ latitude, longitude }}
                  title={title}
                >
                  <Image source={require('../assets/icon/coffee-cup.png')} style={styles.markerImage} />
                </Marker>
              );
            }
            return null;
          })}
        </MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 12, // Adjust the marginTop to avoid the navigation bar
  },
  map: {
    flex: 1,
  },
  markerImage: {
    width: 30,
    height: 30,
  },
});

export default MapScreen;
