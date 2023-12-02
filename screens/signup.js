import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert, TextInput, Button, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker";
import axios from 'axios';
import * as Font from 'expo-font';

const loadFonts = async () => {
  await Font.loadAsync({
    // 여기에 사용할 글꼴을 추가합니다.
    'custom-font': require('../assets/1.ttf'),
  });
};

const Signup = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState(null);
    const [high, setHigh] = useState(null);
    const [kg, setKg] = useState(null);
    const [gender, setGender] = useState(null);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState({ label: "남성", value: "1" });
    const [items, setItems] = useState([
        { label: "남성", value: "1" },
        { label: "여성", value: "2" },
    ]);

    const onChange = (value, index) => {
        switch (value) {
            case "1":
                setGender("남성");
                break;
            case "2":
                setGender("여성");
                break;
            // default:
            //     setGender("성별");
        }
    };

    const handleSignup = async () => {
        console.log("email", email);
        console.log("Password", password);
        try {
            const response = await axios.post('http://172.20.10.3:3000/api/users/register',
            { email, password, name, high, kg, gender });
            console.log(response.data.success);
            if(response.data.success === false){
                Alert.alert('이미 존재하는 아이디 입니다.');
            } else if(response.data.success === true){
                Alert.alert('회원가입 성공!');
                navigation.navigate('Splash');
            }
            // 성공 또는 실패에 따라 적절한 처리를 수행합니다.
          } catch (error) {
            console.error('Signup failed', error);
          }
    };

    const [oading, setOading] = useState(true);

    useEffect(() => {
        loadFonts().then(() =>setOading(false));
    }, []);

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
            <Text style={Styles.HomeText}>회원가입 화면</Text>
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 30 }}>
                <Text style={{ marginRight: "32%", fontFamily: 'custom-font',}}>ID</Text>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    style={{
                        height: 40,
                        paddingHorizontal: 10,
                        borderColor: "gray",
                        borderRadius: 10,
                        borderWidth: 1,
                        marginBottom: 10,
                        marginRight: -1,
                        width: 200,
                    }}
                />
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ marginRight: "20%", fontFamily: 'custom-font', }}>Password</Text>
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry
                    style={{
                        height: 40,
                        paddingHorizontal: 10,
                        borderColor: "gray",
                        borderRadius: 10,
                        borderWidth: 1,
                        marginBottom: 10,
                        marginLeft: 7,
                        width: 200,
                    }}
                />
            </View>
            <Text style={{ marginRight: "60%", marginTop: "10%", marginBottom: -30, fontSize: 20, color: "black", fontFamily: 'custom-font', }}>개인 정보 입력</Text>
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 50 }}>
                <Text style={{ marginRight: "32%", fontFamily: 'custom-font',}}>이름</Text>
                <TextInput
                    placeholder="이름"
                    value={name}
                    onChangeText={(text) => setName(text)}
                    style={{
                        height: 40,
                        paddingHorizontal: 10,
                        borderColor: "gray",
                        borderRadius: 10,
                        borderWidth: 1,
                        marginBottom: 10,
                        marginRight: -1,
                        width: 200,
                    }}
                />
            </View>
            <View style={{ zIndex: 1000, flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                <Text style={{ marginRight: "32%", fontFamily: 'custom-font', }}>성별</Text>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    placeholder="성별을 선택해주세요"
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    maxHeight={400} // 옵션이 많으면 잘려서 나오는데, 이때 maxHeight를 사용하여 길이를 조절하면 된다.
                    onChangeValue={onChange} // 값이 바뀔 때마다 실행
                    listItemContainerStyle={Styles.dropdown}
                    defaultValue="male"
                    containerStyle={{ width: 200, height: 40, marginBottom: 20 }}
                    style={{ height: 40, backgroundColor: "#fafafa" }}
                    itemStyle={{
                        justifyContent: "center",
                    }}
                    dropDownStyle={{ height: 40, backgroundColor: "#f0f0f0", borderWidth: 1, borderColor: "#ccc" }}
                />
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                <Text style={{ marginRight: "35%", fontFamily: 'custom-font', }}>키</Text>
                <TextInput
                    placeholder="키(cm)"
                    value={high}
                    onChangeText={(text) => setHigh(text)}
                    style={{
                        height: 40,
                        paddingHorizontal: 10,
                        borderColor: "gray",
                        borderRadius: 10,
                        borderWidth: 1,
                        marginBottom: 10,
                        marginRight: -1,
                        width: 200,
                    }}
                />
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 0 }}>
                <Text style={{ marginRight: "32%", fontFamily: 'custom-font', }}>체중</Text>
                <TextInput
                    placeholder="체중(kg)"
                    value={kg}
                    onChangeText={(text) => setKg(text)}
                    style={{
                        height: 40,
                        paddingHorizontal: 10,
                        borderColor: "gray",
                        borderRadius: 10,
                        borderWidth: 1,
                        marginBottom: 10,
                        marginRight: -1,
                        width: 200,
                    }}
                />
            </View>
            <TouchableOpacity onPress={handleSignup} style={Styles.NextBottom1}>
                <Text style={Styles.BottomText1}>회원가입</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Signup;

const Styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: "#fff",
    },
    HomeText: {
        flex: 0.08,
        marginTop: "-40%",
        fontSize: 30,
        textAlign: "center",
        fontFamily: 'custom-font',
    },
    NextBottom: {
        backgroundColor: "purple",
        padding: 10,
        marginTop: "30%",
        width: "50%",
        alignSelf: "center",
        borderRadius: 10,
    },
    NextBottom1: {
        backgroundColor: "#59755b",
        padding: 10,
        marginTop: "10%",
        width: "50%",
        alignSelf: "center",
        borderRadius: 10,
    },
    BottomText: {
        backgroundColor: "green",
        fontSize: 15,
        color: "white",
        textAlign: "center",
    },
    BottomText1: {
        fontSize: 15,
        color: "white",
        backgroundColor: "#59755b",
        textAlign: "center",
        fontFamily: 'custom-font',
    },
    dropdown: {
        backgroundColor: "#fafafa",
    },
});
