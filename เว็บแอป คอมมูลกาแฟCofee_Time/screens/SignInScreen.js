import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import styles from '../styles/AuthStyles';
import { auth } from '../AppConfig/firebase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const SignIn = ({ navigation }) => {
    const [isSignIn, setIsSignin] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                navigation.navigate('Main');
            }
        });

        return () => unsubscribe();
    }, [navigation]);

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                const user = userCredentials.user;
                Alert.alert('Success', `Logged in as: ${user.email}`);
            })
            .catch((error) => Alert.alert('Error', error.message));
    };

    const handleForgotPassword = () => {
        navigation.navigate('Forgot');

    };

    const handleSignUp = () => {
        navigation.navigate('SignUp');
    };

    return (
        <View style={styles.container}>
          <View style={styles.contentContainer}> 
          <Text style={styles.welcomeText}>Welcome to Coffee Time App!</Text>
            <Text style={styles.signInText}>Sign In</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.button} onPress={handleSignIn}>
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
             <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
          </View>
          <View style={styles.signupContainer}>
            <Text style={styles.signUpText}>Don't have an account? <Text style={styles.signUpLink} onPress={handleSignUp}>Sign Up</Text></Text>
          </View>
        </View>
      );
    };

export default SignIn;
