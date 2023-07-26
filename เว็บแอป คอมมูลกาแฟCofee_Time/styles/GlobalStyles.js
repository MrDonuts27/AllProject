import { StyleSheet, StatusBar } from 'react-native';

export const GlobalStyles = StyleSheet.create({
    SafeAreaViewstyle: {
        paddingTop: StatusBar.currentHeight,
        flex: 1,
        paddingHorizontal: 4,
        marginBottom: 90,
    },
    H1: {
        marginVertical: 5,
        fontSize: 24,
    },
    container: {
        flex: 1,
        alignItems: 'center',
    },
});