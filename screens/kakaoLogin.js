import React from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const REST_API_KEY = ""; //key
const REDIRECT_URI = "http://192.168.0.41:19006/Home";
const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

const KaKaoLogin = () => {
    const navigation = useNavigation();

    function KakaoLoginWebView(data) {
        const exp = "code=";
        var condition = data.indexOf(exp);
        if (condition != -1) {
            var authorize_code = data.substring(condition + exp.length);
            //console.log(authorize_code);
            requestToken(authorize_code);
        }
    }

    const requestToken = async (authorize_code) => {
        var AccessToken = "none";
        axios({
            method: "post",
            url: "https://kauth.kakao.com/oauth/token",
            params: {
                grant_type: "authorization_code",
                client_id: REST_API_KEY,
                redirect_uri: REDIRECT_URI,
                code: authorize_code,
            },
        })
            .then((response) => {
                AccessToken = response.data.access_token;
                //console.log(AccessToken);
                requestUserInfo(AccessToken);
                //storeData(AccessToken);
            })
            .catch(function (error) {
                console.log("error", error);
            });
        navigation.navigate("Signup", { screen: "Signup" });
    };

    function requestUserInfo(AccessToken) {
        axios({
            method: "GET",
            url: "https://kapi.kakao.com/v2/user/me",
            headers: {
                Authorization: `Bearer ${AccessToken}`,
            },
        })
            .then((response) => {
                var user_emil = response.data.kakao_account.email;
                console.log("user_emil", user_emil);
            })
            .catch(function (error) {
                console.log("error", error);
            });
        return;
    }

    return (
        <View style={Styles.container}>
            <WebView
                style={{ flex: 1 }}
                originWhitelist={["*"]}
                scalesPageToFit={false}
                source={{
                    uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
                }}
                injectedJavaScript={INJECTED_JAVASCRIPT}
                javaScriptEnabled
                onMessage={(event) => {
                    KakaoLoginWebView(event.nativeEvent["url"]);
                }}
            />
        </View>
    );
};

export default KaKaoLogin;

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 24,
        backgroundColor: "#fff",
    },
});
