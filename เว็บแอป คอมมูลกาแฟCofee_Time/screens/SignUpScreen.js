import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, KeyboardAvoidingView } from 'react-native';
import styles from '../styles/AuthStyles';
import { auth } from '../AppConfig/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';


const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged In with :', user.email);
      })
      .catch(error => alert(error.message))
  };
  const handleBack = () => {

    navigation.navigate('SignIn');
  };


  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.contentContainer}>

        <Text style={styles.welcomeText}>Welcome Please Register!</Text>
        <Text style={styles.signInText}>Sign Up</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleBack}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>

    </KeyboardAvoidingView>
  );
};


export default SignUp;
