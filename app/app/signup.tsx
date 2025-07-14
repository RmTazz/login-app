import { useTheme } from "@/context/ThemeContext";
import React, { useState } from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator, Alert} from 'react-native';
import Input from '../components/core/Input'
import {Link, router} from "expo-router";
import { validateSignupForm } from '@/app/validation';
import { auth, db, serverTimestamp } from '@/app/firebaseConfig';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, collection } from 'firebase/firestore';

const SignupScreen = () => {
    const {currentTheme} = useTheme();

  const [data,setData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  });
    const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({});
  const [loading ,setLoading] = useState(false);
  const [successMessages, setSuccessMessage] = useState('');


    const handleChange = (key: string, value: string) => {
        setData({ ...data, [key]: value });
        setErrors(prev => ({ ...prev, [key]: undefined }));
    }

  const handleSignup = async () =>{
      const validationErrors = validateSignupForm(data);

      if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          return;
      }

      setLoading(true);
      setErrors({});
      setSuccessMessage('');

      try {
          const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
          const user = userCredential.user;

          await updateProfile(user, { displayName: data.name });

          const usersCollectionRef = collection(db, 'users');
          const userDocRef = doc(usersCollectionRef, user.uid);
          await setDoc(userDocRef, {
              name: data.name,
              email: user.email,
              createdAt: serverTimestamp(),
          });

          setSuccessMessage('Account created and logged in successfully!');
          Alert.alert('Success', 'Your account has been created!');

          setTimeout(() => {
              router.replace({ pathname: '/(app)/(tabs)'});
          }, 1500);

      } catch (error: any) {
          console.error('Firebase Signup Error:', error);

          let errorMessage = 'An unexpected error occurred. Please try again.';
          if (error.code) {
              switch (error.code) {
                  case 'auth/email-already-in-use':
                      errorMessage = 'That email address is already in use!';
                      setErrors(prev => ({ ...prev, email: errorMessage }));
                      break;
                  case 'auth/invalid-email':
                      errorMessage = 'That email address is invalid!';
                      setErrors(prev => ({ ...prev, email: errorMessage }));
                      break;
                  case 'auth/operation-not-allowed':
                      errorMessage = 'Email/password sign up is not enabled. Please check Firebase console settings.';
                      Alert.alert('Signup Error', errorMessage);
                      break;
                  case 'auth/weak-password':
                      errorMessage = 'Password is too weak. Please choose a stronger password (minimum 6 characters).';
                      setErrors(prev => ({ ...prev, password: errorMessage }));
                      break;
                  default:
                      Alert.alert('Signup Error', `Firebase Error: ${error.message}`);
              }
          } else {
              Alert.alert('Signup Error', errorMessage);
          }
      } finally {
          setLoading(false);
      }
  }

  return (
    <View className={`flex-1 justify-center  p-2 ${currentTheme === 'dark' ? 'bg-color-900': 'by-gray-50'}`}>


        <View className="items-center mt-8 mb-12">
          <Text className={`text-3xl font-bold text-gray-800 ${currentTheme === 'dark' ? 'by-gray-50': 'bg-color-900'}`}>Bus Reservation</Text>
        </View>

        {!!successMessages && <Text  className='bg-emerald-600  text-white rounded-lg py-6 px-4 mb-3'>
          {successMessages}
        </Text>}

        <View className="space-y-4">
          <View>
            <Input
              placeholder="Name"
              value={data.name}
              onChangeText={(value)=> handleChange('name',value)}
              error={errors.name}
           />
          </View>

          <View>
             <Input
              placeholder="Email"
              value={data.email}
              keyboardType="email-address"
              onChangeText={(value) => handleChange('email',value)}
              error={errors.email}
           />

          </View>

          <View>
              <Input
              placeholder="Password"
              value={data.password}
              secureTextEntry
              onChangeText={(value) => handleChange('password',value)}
              error={errors.password}
              />
          </View>

          <View>
              <Input
              placeholder="Confirm your password"
              value={data.password_confirmation}
              secureTextEntry
              onChangeText={(value) => handleChange('password_confirmation',value)}
              error={errors.password_confirmation}
              />
          </View>
        </View>

        <TouchableOpacity
            className="w-full h-12 bg-blue-600 rounded-lg justify-center items-center mt-8"
            onPress={handleSignup}
            disabled={loading}
        >
            {loading ? (
                <ActivityIndicator size="small" color="#ffffff" />
            ) : (
                <Text className="text-white font-semibold text-lg">Signup</Text>
            )}
        </TouchableOpacity>


        <View className="flex-row justify-center mt-6">
          <Text className="text-gray-600">Already have an account? </Text>
          <TouchableOpacity>
              <Link href="/sign-in">
                    <Text className="text-blue-600 font-medium">Sign in</Text>
              </Link>
          </TouchableOpacity>
        </View>

    </View>
  );
};

export default SignupScreen;