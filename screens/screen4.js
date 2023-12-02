import React, { useState , useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFoodContext } from './FoodContext';
import * as Font from 'expo-font';

const loadFonts = async () => {
  await Font.loadAsync({
    // 여기에 사용할 글꼴을 추가합니다.
    'custom-font': require('../assets/1.ttf'),
  });
};

const Screen4 = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const [info, setInfo] = useState(null);
    const [logout, setLogout] = useState(true);
    const { setEmail, setPassword } = useFoodContext();

    const onCheck = async() => {
        Alert.alert(
            'Log-out',
            '정말로 진짜로 로그아웃 할꺼야?',
            [
              {
                text: '취소',
                onPress: () => {}, // 아무 동작도 하지 않음
                style: 'cancel',
              },
              { 
                text: '확인', 
                onPress: async () => {
                  try {
                    const ok = await fetch('http://172.20.10.3:3000/api/users/logout');
                    if(ok) {
                        setEmail('');
                        setPassword('');
                        navigation.navigate("Splash", { email: "", password: "" });
                    }
                  } catch (e) {
                    console.error('Error here', e);
                  }
                },
              },
            ],
            { cancelable: false }
        ); 
    }

    useEffect(() => {
      const fetchInfo = async () => {
          try {
              await loadFonts();
              const information = await fetch('http://172.20.10.3:3000/api/users/info');
              const res = await information.json();
              setInfo(res);
              setLoading(false);
          } catch (error) {
              console.error('Error fetching infomation:', error);
          }
      };
      fetchInfo();
    }, []);
    
    console.log(info);

    if (loading) {
        return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Loading</Text>
            <Text>Please wait a minite plz!</Text>
        </View>
        );
    }

    return (
        <View style={Styles.container}>
            <View style={{ 
                alignSelf: 'center',
                width: '90%',
                flexDirection: 'row',
                marginTop: 200,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: 'black',
                padding: 10, 
                }}>
                <Text style={Styles.label}>이름:</Text>
                <Text style={Styles.info}>{info.name}</Text>
            </View>
            <View style={{ 
                alignSelf: 'center',
                width: '90%',
                flexDirection: 'row',
                marginTop: 10,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: 'black',
                padding: 10, 
                }}>
                <Text style={Styles.label}>키:</Text>
                <Text style={Styles.info}>{info.high}cm</Text>
            </View>
            <View style={{ 
                alignSelf: 'center',
                width: '90%',
                flexDirection: 'row',
                marginTop: 10,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: 'black',
                padding: 10, 
                }}>
                <Text style={Styles.label}>몸무게:</Text>
                <Text style={Styles.info}>{info.kg}kg</Text>
            </View>
            <View style={{ 
                alignSelf: 'center',
                width: '90%',
                flexDirection: 'row',
                marginTop: 10,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: 'black',
                padding: 10, 
                }}>
                <Text style={Styles.label}>성별:</Text>
                <Text style={Styles.info}>{info.gender}</Text>
            </View>
            <View styles={{flexDirection: "row", alignItems: "center", marginTop: 10}}>
                <TouchableOpacity style={Styles.touchText} onPress={onCheck}>
                    <Image style={Styles.Image} source={require('../assets/ArrowRightOnRectangle.png')} resizeMode="contain" />
                    <Text style={Styles.Text}>로그아웃</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Screen4;

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    touchText: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
        flexDirection: 'row',
        backgroundColor: '#495e4b',
        alignSelf: "center",
        marginTop: 60,
    },
    Text: {
        padding: 10,
        fontSize: 20,
        color: "#ffffff",
        // textAlign: "center",
        alignSelf: "center",
        justifyContent: 'center',
        fontFamily: 'custom-font',
    },
    Image: {
        alignSelf: "center",
        width: 40, // 이미지 폭
        height: 40, // 이미지 높이
    },
    label: {
        fontSize: 20,
        flex: 1,
        textAlign: 'right',
        paddingRight: 20,
        marginLeft: 30,
        fontWeight: 'bold',
        fontFamily: 'custom-font',
    },
    info: {
        fontSize: 30,
        flex: 2,
        paddingLeft: 5,
        fontFamily: 'custom-font',
    },
});
