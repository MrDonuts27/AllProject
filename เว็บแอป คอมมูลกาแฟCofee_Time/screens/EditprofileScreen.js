import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, TextInput, Text, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { auth } from '../AppConfig/firebase';
import { reauthenticateWithCredential, EmailAuthProvider, updateEmail, updatePassword, signOut } from 'firebase/auth';

const EditprofileScreen = ({ navigation }) => {
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailCurrentPassword, setEmailCurrentPassword] = useState('');
  const [passwordCurrentPassword, setPasswordCurrentPassword] = useState('');

  const handleBack = () => {
    navigation.navigate('ProfilePage');
  };

  const handleChangeEmail = () => {
    const user = auth.currentUser;

    if (user) {
      if (newEmail.trim() === '') {
        Alert.alert('Error', 'Please enter a new email.');
        return;
      }

      if (emailCurrentPassword.trim() === '') {
        Alert.alert('Error', 'Please enter your current password.');
        return;
      }

      const credential = EmailAuthProvider.credential(user.email, emailCurrentPassword);

      reauthenticateWithCredential(user, credential)
        .then(() => {
          updateEmail(user, newEmail)
            .then(() => {
              Alert.alert('Success', 'Email successfully updated.');
              setNewEmail('');
              setEmailCurrentPassword('');
              signOutUser();
            })
            .catch((error) => {
              Alert.alert('Error', error.message);
            });
        })
        .catch((error) => {
          Alert.alert('Error', error.message);
        });
    }
  };

  const handleChangePassword = () => {
    const user = auth.currentUser;

    if (user) {
      if (newPassword.trim() === '') {
        Alert.alert('Error', 'Please enter a new password.');
        return;
      }

      if (confirmPassword.trim() === '') {
        Alert.alert('Error', 'Please confirm your new password.');
        return;
      }

      if (newPassword !== confirmPassword) {
        Alert.alert('Error', "Passwords don't match.");
        return;
      }

      if (passwordCurrentPassword.trim() === '') {
        Alert.alert('Error', 'Please enter your current password.');
        return;
      }

      const credential = EmailAuthProvider.credential(user.email, passwordCurrentPassword);

      reauthenticateWithCredential(user, credential)
        .then(() => {
          updatePassword(user, newPassword)
            .then(() => {
              Alert.alert('Success', 'Password successfully updated.');
              setNewPassword('');
              setConfirmPassword('');
              setPasswordCurrentPassword('');
              signOutUser();
            })
            .catch((error) => {
              Alert.alert('Error', error.message);
            });
        })
        .catch((error) => {
          Alert.alert('Error', error.message);
        });
    }
  };

  const signOutUser = () => {
    auth.signOut()
      .then(() => {
        navigation.navigate('SignIn');
      })
      .catch((error) => {
        Alert.alert('Error', error.message);
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
      <TouchableOpacity style={styles.blackBtn} onPress={handleBack}>
        <Image source={require('../assets/icon/Back.png')} style={styles.iconSize} />
        <Text style={styles.blackText}>Back</Text>
      </TouchableOpacity>
      <View style={styles.profileContainer}>
        <Text style={{
          alignContent: 'center',
          marginTop: 10, fontSize: 24, fontWeight: 'bold',
        }}>
          Edit Profile
        </Text>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="New Email"
          value={newEmail}
          onChangeText={setNewEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Current Password"
          secureTextEntry={true}
          value={emailCurrentPassword}
          onChangeText={setEmailCurrentPassword}
        />
        <TouchableOpacity style={styles.saveButton} onPress={handleChangeEmail}>
          <Text style={styles.saveButtonText}>Change Email</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Current Password"
          secureTextEntry={true}
          value={passwordCurrentPassword}
          onChangeText={setPasswordCurrentPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="New Password"
          secureTextEntry={true}
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity style={styles.saveButton} onPress={handleChangePassword}>
          <Text style={styles.saveButtonText}>Change Password</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default EditprofileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  editProfileButton: {
    backgroundColor: '#8B4513',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    marginBottom: 10,
  },
  editProfileText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
  },
  input: {
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 10,
    borderColor:'black',
    borderWidth: 1,
  },
  saveButton: {
    backgroundColor: '#8B4513',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    marginVertical: 16,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  blackBtn: {
    width: '100%',
    flexDirection: 'row',
    marginVertical: 10,
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
