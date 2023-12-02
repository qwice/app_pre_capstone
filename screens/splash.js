import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFoodContext } from './FoodContext';
import * as Font from 'expo-font';

const loadFonts = async () => {
  await Font.loadAsync({
    // 여기에 사용할 글꼴을 추가합니다.
    'custom-font': require('../assets/1.ttf'),
  });
};

const Splash = () => {
    const navigation = useNavigation();
    const [oading, setOading] = useState(true); 
    const { email, setEmail, password, setPassword } = useFoodContext();

    useEffect(() => {
      loadFonts().then(() =>setOading(false));
    }, []);

    const handleLogin = async() => {
        try {
          const response = await fetch('http://172.20.10.3:3000/api/users/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });
    
            console.log('Sent data to the server:');
            console.log('Email:', email);
            console.log('Password:', password);

          const data = await response.json();
    
          if (data.success) {
            // 로그인 성공 처리
            Alert.alert(
                'Login successful',
                'Welcome!',
                [
                  { 
                    text: '확인', 
                    onPress: async() => navigation.navigate("Home", { screen: "Home"})
                  },
                ],
                { cancelable: false }
            ); 
          } else {
            // 로그인 실패 처리
            Alert.alert('Login failed', 'Please check your username and password.');
          }
        } catch (error) {
          console.error('Error during login:', error);
        }
        //navigation.navigate("Home");
      };

      if (oading) {
        return (
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Loading Font...</Text>
            <Text>Please wait a minite plz!</Text>
          </View>
        );
      }

    return (
        <View style={Styles.container}>
            <Text style={Styles.HomeText}>로그인 화면</Text>
            <TextInput
                placeholder="ID"
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={{ height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 10, marginTop: 100, width: 200, fontFamily: 'custom-font', }}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
                style={{ height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 10, width: 200, fontFamily: 'custom-font',}}
            />
            <TouchableOpacity onPress={() => handleLogin()} style={Styles.NextBottom}>
                <Text style={Styles.BottomText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Signup", { screen: "signup" })} style={Styles.NextBottom}>
                <Text style={Styles.BottomText}>회원가입</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("KaKaoLogin", { screen: "KaKaoLogin" })} style={Styles.NextBottom}>
                <Text style={Styles.BottomText}>카카오 로그인 화면으로</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Splash;

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    HomeText: {
        fontSize: 30,
        marginTop: "-30%",
        textAlign: "center",
        fontFamily: 'custom-font',
    },
    NextBottom: {
        backgroundColor: "#59755b",
        padding: 10,
        marginTop: "5%",
        width: "50%",
        alignSelf: "center",
        borderRadius: 10,
    },
    BottomText: {
        fontSize: 15,
        color: "white",
        backgroundColor: "#59755b",
        textAlign: "center",
        fontFamily: 'custom-font',
    },
});
