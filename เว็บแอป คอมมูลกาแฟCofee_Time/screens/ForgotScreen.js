import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, KeyboardAvoidingView } from 'react-native';
import styles from '../styles/AuthStyles';
import { auth } from '../AppConfig/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';


const Forgot = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleForgot = () => {
    sendPasswordResetEmail(auth, email, null)
       .then(() => {
            alert("Email sent to " + email + " Please check your email.");
        })
        .catch(function (e) {
            console.log(e);
        });
  };
  const handleBack = () => {
    navigation.navigate('SignIn');
  };


  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.contentContainer}>

        <Text style={styles.welcomeText}>Please Enter your email to reset the password.</Text>
        <Text style={styles.signInText}>Reset Password </Text>
       <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
           onChangeText={text => setEmail(text)}
          //onPress={handleForgot}
        />
        <TouchableOpacity style={styles.button} onPress={handleForgot} >
          <Text style={styles.buttonText}>Send Email</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleBack}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>

    </KeyboardAvoidingView>
  );
};


export default Forgot;
