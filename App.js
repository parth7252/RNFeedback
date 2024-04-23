import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Text,
  Image,
  StyleSheet,
  Alert,
  SafeAreaView,
  StatusBar,
  useColorScheme,
  Platform,
  ImageBackground,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {Button} from '@rneui/themed';
import {Dimensions} from 'react-native';
const screenWidth = Dimensions.get('window').width;
const buttonWidth = screenWidth * 0.9;

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    if (Platform.OS === 'android') {
      SplashScreen.hide();
    }
  }, []);

  const isDarkMode = useColorScheme() === 'dark';

  const validateEmail = email => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleLogin = () => {
    let valid = true;
    if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      valid = false;
    } else {
      setEmailError('');
    }

    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid) {
      Alert.alert('Login Successful', `Welcome, ${email}!`);
    }
  };

  return (
    <SafeAreaView style={styles.fullScreen}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ImageBackground
        source={require('./assets/login_bg.png')}
        style={styles.fullScreen}
        resizeMode="stretch">
        <View style={styles.container}>
          <Image source={require('../Project/assets/logo.png')}></Image>
          <Text style={styles.loginText}>Log In</Text>
          <Text style={styles.loginTextTwo}>
            Login to continue using the app
          </Text>
          <Text style={styles.emailText}>Email Address</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          {!!emailError && <Text style={styles.errorText}>{emailError}</Text>}
          <Text style={styles.emailText}>Your Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {!!passwordError && (
            <Text style={styles.errorText}>{passwordError}</Text>
          )}

          <View style={[styles.buttonContainer, {width: buttonWidth}]}>
            <Button
              title="Log in"
              loading={false}
              loadingProps={{size: 'small', color: 'white'}}
              // eslint-disable-next-line react-native/no-inline-styles
              buttonStyle={{
                backgroundColor: '#E36863',
                borderRadius: 5,
              }}
              // eslint-disable-next-line react-native/no-inline-styles
              titleStyle={{
                fontWeight: 'normal',
                fontSize: 16,
                fontFamily: 'Inter Medium',
              }}
              // eslint-disable-next-line react-native/no-inline-styles
              containerStyle={{
                height: 50,
                // marginVertical: 10,
              }}
              onPress={handleLogin}
            />
          </View>

          <View style={styles.dontHave}>
            <Text style={styles.forgetText}>Forget Password?</Text>
            <Text style={styles.dontHaveAccount}>Don't have an account? </Text>
            <Text style={styles.signUp}>Sign Up</Text>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    width: '100%',
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#2D6882',
    borderWidth: 1,
    // marginTop: 15,
    padding: 10,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
  },
  dontHave: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  forgetText: {
    fontSize: 12,
    color: 'gray',
  },
  signUp: {
    color: '#E36863',
    fontSize: 13,
    // marginHorizontal: 10,
  },
  dontHaveAccount: {
    fontSize: 12,
    color: 'gray',
    // marginHorizontal: 10,
    // justifyContent: 'space-between',
  },
  emailText: {
    // fontWeight: '500',
    marginVertical: 15,
    fontSize: 16,
    fontFamily: 'Inter Medium',
    color: '#111928',
  },
  loginText: {
    fontSize: 26,
    fontFamily: 'Roboto Regular',
    color: '#046C88',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  loginTextTwo: {
    fontSize: 13.27,
    fontFamily: 'Roboto Regular',
    color: '#046C88',
    lineHeight: 24,
    marginBottom: 20,
  },
  buttonContainer: {
    width: screenWidth * 0.8, // 80% of the screen width
    alignSelf: 'center', // Center the button horizontally
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
});

export default App;
