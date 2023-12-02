import React , { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image} from 'react-native';
import { useFoodContext } from './FoodContext';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import { LocaleConfig } from 'react-native-calendars';
import { Alert } from 'react-native';
import * as Font from 'expo-font';

const loadFonts = async () => {
  await Font.loadAsync({
    // 여기에 사용할 글꼴을 추가합니다.
    'custom-font': require('../assets/1.ttf'),
  });
};

LocaleConfig.locales['ko'] = {
    monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    dayNames: ['일', '월', '화', '수', '목', '금', '토'],
    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  };
  
  LocaleConfig.defaultLocale = 'ko';
  
let test;

const TOTAL = ({ receivedType  }) => {
    const { selectedFoods, toggleSelectedFood, setSelectedFoods } = useFoodContext();
    const [imageI, setImageI] = useState(null);

    const navigation = useNavigation();

    const today = new Date(new Date().getTime() + (9 * 60 * 60 * 1000));
    const todayString = today.toISOString().split('T')[0];
    const selectedDate = todayString;

    const [oading, setOading] = useState(true);

    useEffect(() => {
        setSelectedFoods([]);
        loadFonts().then(() =>setOading(false));
    }, []);
    
    useEffect(() => {  
        (async () => {
            await loadFonts();
            setOading(false)
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
            alert('카메라 롤 액세스 권한을 허용해주세요.');
            }
            })();
    }, []);
    

    const pickImageI = async () => {
        let resultI = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        });

        //console.log(resultI); //canceled warning message가 계속 떠용

        if (!resultI.canceled) {
            setImageI(resultI.assets[0].uri);
        }
    };

    const maintain = (sels) => {
        console.log('test', test);
        console.log('test2', {sels});
        sels.forEach(sel => {
            toggleSelectedFood(sel);
        });
        console.log(selectedFoods);
    }

    const cancel = () => {
        setImageI(null);
    }

    const modify = () => {
        console.log('test3', test);
        if (Array.isArray(test)) {
            test.forEach(sel => {
                toggleSelectedFood(sel);
            });
        } else {
            toggleSelectedFood(test);
        }
        console.log('modify', selectedFoods);
        setImageI(null);
    }

    const uploadImageToServer = async () => {
        if (imageI) {
            const data = new FormData();
            data.append('image', {
                uri: imageI,
                type: 'image/jpg', // 이미지 타입에 맞게 변경
                name: 'image,jpg',
            });

            try {
                const response = await fetch('http://172.20.10.3:3000/api/upload/image', {
                    method: 'POST',
                    body: data,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        // 필요한 헤더 추가 가능
                    },
                });
                console.log('1')
                const responseData = await response.json();
                test = responseData.foodInfo.map(food => food.Name); //           
                console.log('Image uploaded:', responseData);
                Alert.alert(
                    '업로드 하신 음식이름이 다음과 같습니까?',
                    `음식명 : ${test}`,
                    [
                      { 
                        text: '네', 
                        onPress: () => maintain(test),
                        },
                      {
                        text: '아니요',
                        onPress: () => cancel(),
                        },
                      
                    ],
                    { cancelable: false }                    
                    );
                console.log('selected', selectedFoods);
                // 이미지 업로드 성공 후 처리
            } catch (error) {
                Alert.alert(
                    '업로드하신 사진이 어플에 존재하지 않습니다.',
                    `다른 사진으로 시도해주세요`,
                    [
                      { 
                        text: '네', 
                        onPress: () => cancel(),
                      },
                    ],
                    { cancelable: false }                    
                    );
                console.log('selected', selectedFoods);
                // 이미지 업로드 실패 시 처리
            }
        } else {
            // 이미지가 선택되지 않은 경우에 대한 처리
            console.log('No image selected');
        }
    };

    const recordSuccess = () => {
        console.log('here3')
        setImageI(null);
        setSelectedFoods([]);
        console.log('image', imageI);
        console.log('selectedfoods', selectedFoods);
        navigation.navigate("Screen1")
    }

    const active = async() => {
        console.log('day', selectedDate);
        console.log('mealtype', receivedType);
        console.log('selected', selectedFoods);

        try {
            const responseI = await axios.post('http://172.20.10.3:3000/api/users/recordMeal',
            { selectedDate, receivedType, selectedFoods });
            console.log('recordmeal', todayString);
            // console.log(responseI);
            if(responseI && selectedFoods.length > 0){
                console.log('here');
                Alert.alert(
                    '식사 등록에 성공했습니다!',
                    '홈 화면으로 이동합니다.',
                    [
                      { 
                        text: '확인', 
                        onPress: () => recordSuccess(),
                      },
                    ],
                    { cancelable: false }
                ); 
                console.log('here2');
            } else {
                // 로그인 실패 처리
                Alert.alert('식사 등록에 실패했습니다.', '다시 시도해 주세요');
            }
        } catch (error) {
            console.error('음식 전송 실패', error);
        }
    }

    if (oading) {
        return (
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Loading Font...</Text>
            <Text>Please wait a minite plz!</Text>
          </View>
        );
    } 

    return (
        <View>
            <ScrollView>
                <View style={{ flexDirection: 'row', margin: 10, alignItems: 'center', justifyContent: 'center', width: 370, height: 200}}>
                    {!imageI && <TouchableOpacity onPress={pickImageI}>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Image style={{ height: 40, width: 40 }} source={require('../assets/Photo.png')} resizeMode="contain"/>
                            <Text style={{ fontSize: 30, color: 'black', textAlign: 'center' , fontFamily: 'custom-font', marginTop: 10}}>사진 선택</Text>
                        </View>
                    </TouchableOpacity>}
                    {imageI && <Image source={{ uri: imageI }} style={{ width: 200, height: 200, marginTop: 10 }} resizeMode="contain"/>}
                </View>

                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', marginTop: 30, borderWidth: 1, borderRadius: 10, backgroundColor: '#315134', height: 40, width: 200, marginRight: 20 , fontFamily: 'custom-font',}} onPress={uploadImageToServer}>
                        <Text style={{ fontSize: 20 , fontFamily: 'custom-font', color: 'white'}}>이미지 업로드</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', marginTop: 30, borderWidth: 1, borderRadius: 10, backgroundColor: '#F7F2E0', height: 40, width: 100, fontFamily: 'custom-font', }} onPress={modify}>
                        <Text style={{ fontSize: 20 , fontFamily: 'custom-font'}}>수정</Text>
                    </TouchableOpacity>
                </View>

                <Text style={{ fontWeight: 'bold', fontSize: 25, marginLeft: '5%', marginTop: 10, fontFamily: 'custom-font',}}>선택한 음식</Text>
                
                <View style={{borderWidth: 1, borderRadius: 10, marginTop: 5, height: 220, width: '90%', marginLeft: '5%'}}>
                {selectedFoods.map((food, index) => (
                <Text key={index} style={{marginTop: 10, marginLeft: 10, fontSize: 15, fontFamily: 'custom-font',}}>{food}</Text>))}
                </View>
                <TouchableOpacity style={{alignItems:'center', justifyContent: 'center', marginTop: 30, borderWidth: 1, borderRadius: 10, backgroundColor: '#315134', height: 40, margin: 100, marginTop: 10, fontFamily: 'custom-font',}} onPress={active}>
                    <Text style={{fontSize: 20, fontFamily: 'custom-font', color: 'white'}}>확인</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default TOTAL;
