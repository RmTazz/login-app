import {View, Text, TouchableOpacity, ActivityIndicator, Alert} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import Input from '../components/core/Input'
import { Link, router } from 'expo-router';
import { validateLoginForm } from '@/app/validation';
import { auth } from '@/app/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

const SignInScreen = () => {

   const [loading ,setLoading] = useState(false);
   const [data, setData] = useState({
     email: "",
     password: ""
   });

    const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({});
    const handleChange = (key: string, value: string) => {
        setData({ ...data, [key]: value });
        setErrors(prev => ({ ...prev, [key]: undefined }));
    }

    const handleLogin = async () => {
       const validationErrors = validateLoginForm(data);

       if (Object.keys(validationErrors).length > 0) {
           setErrors(validationErrors);
           return;
       }

        setLoading(true);
        setErrors({});

        try {
            const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
            const user = userCredential.user;

            Alert.alert('Success', 'Logged in successfully!');

            setTimeout(() => {
                router.replace({ pathname: '/(app)/(tabs)'});
            }, 1500);

        } catch (error: any) {
            console.error('Firebase Sign In Error:', error);

            let errorMessage = 'An unexpected error occurred. Please try again.';
            if (error.code) {
                switch (error.code) {
                    case 'auth/invalid-email':
                        errorMessage = 'That email address is invalid.';
                        setErrors(prev => ({ ...prev, email: errorMessage }));
                        break;
                    case 'auth/user-disabled':
                        errorMessage = 'This user account has been disabled.';
                        setErrors(prev => ({ ...prev, email: errorMessage }));
                        break;
                        case 'auth/invalid-credential':
                            errorMessage = 'You have entered the wrong credentials. Please try again.';
                            setErrors(prev => ({ ...prev, email: errorMessage, password: errorMessage }));
                            break;
                    default:
                        Alert.alert('Login Error', `Firebase Error: ${error.message}`);
                }
            } else {
                Alert.alert('Login Error', errorMessage);
            }
        } finally {
            setLoading(false);
        }
    }


  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6 justify-center">
       
        <View className="items-center mb-12">
          
          <Text className="text-3xl font-bold text-gray-800">Login</Text>
        </View>


        <View className="space-y-4">

          <View>

            <Input
              placeholder="Enter your email"
              value={data.email}
              keyboardType="email-address"
              onChangeText={(value) => handleChange('email',value)}
              error={errors.email}
             />
          </View>

  
          <View>


            <Input 
              placeholder="Enter your password"
              value={data.password}
              onChangeText={(value) => handleChange('password',value)}
              secureTextEntry
              error={errors.password}     
            />
          </View>


            <TouchableOpacity
                className="w-full h-12 bg-blue-600 rounded-lg justify-center items-center mt-8"
                onPress={handleLogin}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                    <Text className="text-white font-semibold text-lg">Login</Text>
                )}
            </TouchableOpacity>
        </View>


        <View className="flex-row justify-center mt-8">
          <Text className="text-gray-600">Don't have an account? </Text>
          <TouchableOpacity>
            <Link href="/signup">
               <Text className="text-blue-600 font-medium">Sign up</Text>
            </Link>   
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );

};

export default SignInScreen;
