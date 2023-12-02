import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import MealType from './mealtype';
import * as Font from 'expo-font';

const loadFonts = async () => {
  await Font.loadAsync({
    // 여기에 사용할 글꼴을 추가합니다.
    'custom-font': require('../assets/1.ttf'),
  });
};

const HeaderWithImage = () => {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState('');

    const [already, setAlready] = useState(0);
    const [will, setWill] = useState(0);

    const [oading, setOading] = useState(true);
  
    const openModal = (menu) => {
      setSelectedMenu(menu);
      setModalVisible(true);
    }
  
    const closeModal = () => {
      setSelectedMenu('');
      setModalVisible(false);
    }

    useEffect(() => {
      loadFonts().then(() =>setOading(false));
    }, []);

    useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await fetch('http://172.20.10.3:3000/api/users/calories');
              const result = await response.json();
              setData(result);
              setLoading(false);
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };
      fetchData();
    }, []);

    const rem = async () => {
          try {
              const remain = await fetch('http://172.20.10.3:3000/api/users/remainingCalories');
              const info = await remain.json();
              console.log('remain', info);
              setAlready(info.eatenCalories);
              setWill(info.remainingCalories);
              console.log('already', {already});
              console.log('will', {will});
          } catch (error) {
              console.error('Error remaining:', error);
          }
    };
    
    console.log(data);

    if (oading) {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>Loading Font...</Text>
          <Text>Please wait a minite plz!</Text>
        </View>
      );
    }

    if (loading) {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>Loading...</Text>
        </View>
      );
    }
    
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Image
            source={require('../assets/3.png')}
            style={styles.headerImage}
            resizeMode="contain"
          />
          <Text style={styles.textBox}>{data.name}님의 권장 칼로리</Text>
          <Text style={styles.text}>{data.calories}kcal</Text>
          <Text style={styles.textBox}>금일 섭취한 칼로리</Text>
          <Text style={styles.text}>{already}kcal</Text>
          <Text style={styles.textBox}>금일 섭취할 칼로리</Text>
          <Text style={styles.text}>{will}kcal</Text>
          <TouchableOpacity onPress={() => rem()} style={{alignItems: 'center', backgroundColor: '#315134', marginLeft: '30%', marginRight: '30%', borderRadius: 5, height: 30, width: 80, justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: 'white', fontFamily: 'custom-font',}}>새로고침</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.roundedText} onPress={() => openModal('식단 등록')}>
          <Text style={styles.featureBoxRight}>식단 등록</Text>
            </TouchableOpacity>
            {selectedMenu === '식단 등록' && (<MealType
            visible={modalVisible}
            closeModal={closeModal}
            types={['아침','점심','저녁']}
            />)}
            
          {/* </TouchableOpacity> */}
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // 원하는 배경색으로 변경
  },
    headerContainer: {
      alignItems: 'center', // 수평 정렬
      justifyContent: 'center', // 수직 정렬
      height: 100, // 헤더의 높이 설정
      backgroundColor: 'rgb(255,255,255)'
    },
    headerImage: {
      width: 200, // 이미지의 폭
      height: 200, // 이미지의 높이
      marginTop: 510,
      backgroundColor: 'rgb(255,255,255)'
    },
    textBox: {
        textAlign: 'center',
        justifyContent: 'center',
        backgroundColor: '#F7F2E0', // 박스 배경색
        fontSize: 20,
        height: 20,
        width: 300,
        padding: 25, // 안쪽 여백
        borderRadius: 20, // 테두리 모서리 둥글기
        marginTop: 5,
        fontFamily: 'custom-font',
      },
      text: {
        textAlign: 'center',
        fontSize: 30,
        justifyContent: 'space-between',
        backgroundColor: '#F7F2E0', // 박스 배경색
        height: 50,
        width: 300, // 안쪽 여백
        borderRadius: 20, // 테두리 모서리 둥글기
        fontFamily: 'custom-font',
      },
      featureBoxLeft: {
        backgroundColor: 'lightgreen',
        textAlign: 'center',
        paddingTop: 90,
        marginTop: 15,
        height: 130,
        width: 300,
      },
      jiseo: {
        backgroundColor: 'lightgray',
        justifyContent: 'center',
        alignItems: 'center', // 수평 정렬을 위한 스타일 추가
        textAlign: 'center',
        paddingTop: 20, // 패딩을 조정하여 텍스트가 칸을 벗어나지 않도록 설정
        marginTop: 15,
        height: 150,
        width: 300,
      },
      featureBoxRight: {
        backgroundColor: '#315134',
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        paddingTop: 15,
        marginTop: 15,
        height: 50,
        width: 1000,
        fontFamily: 'custom-font',
        // borderWidth: 1,
        // borderRadius: 10,
      },
      textInJiseo1: {
        fontSize: 16, // 텍스트의 사이즈 조정
        textAlign: 'center', // 텍스트 정렬
        marginHorizontal: 10, // 텍스트 좌우 마진 조정
      },
      textInJiseo2: {
        fontSize: 16, // 텍스트의 사이즈 조정
        textAlign: 'center', // 텍스트 정렬
        marginHorizontal: 10, // 텍스트 좌우 마진 조정
        marginTop: 10,
      },
  });

export default HeaderWithImage;
