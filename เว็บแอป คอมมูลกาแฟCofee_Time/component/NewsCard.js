import React, { useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function NewsCard(props) {
    const [showMore, setShowMore] = useState(false);

    const handleToggleShowMore = () => {
        setShowMore(!showMore);
    };

    return (
        <View style={styles.Cardcontainer}>
            <Image style={styles.imgfream} source={{ uri: props.image }} />
            <View style={styles.Cardcontent}>
                <Text numberOfLines={showMore ? undefined : 1}>{props.title}</Text>
                {!showMore && (
                    <TouchableOpacity onPress={handleToggleShowMore}>
                        <Text style={styles.readMoreText}>...Read more</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Cardcontainer: {
        backgroundColor: '#F5E7C5',
        borderRadius: 15,
        elevation: 5,
        shadowColor: 'black',
        shadowRadius: 2,
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 1,
            width: 3
        },
        flexDirection: 'column',
        padding: 15,
        alignItems: 'center',
        margin: 10,
    },
    imgfream: {
        resizeMode: 'cover',
        borderRadius: 15,
        width: '100%',
        height: undefined,
        aspectRatio: 4 / 3,
        marginBottom: 10
    },
    Cardcontent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    readMoreText: {
        color: 'blue',
        marginTop: 10,
    }
});
