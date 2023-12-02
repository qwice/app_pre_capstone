import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FoodModal from './foodlist'; // 모달 컴포넌트 import
import { useState, useEffect } from 'react';
import * as Font from 'expo-font';

const loadFonts = async () => {
  await Font.loadAsync({
    // 여기에 사용할 글꼴을 추가합니다.
    'custom-font': require('../assets/1.ttf'),
  });
};

const ImageWithText = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('');

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

  if (oading) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Loading Font...</Text>
        <Text>Please wait a minite plz!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container2}>
      <View style={styles.container}>
        <Image
              source={require('../assets/3.png')}
              style={styles.image}
              resizeMode="contain"
        />
        <Text style={styles.text}>식단 추천 받기</Text>
        <View style={{flexDirection:'row', marginTop: 20}}>
          <TouchableOpacity style={styles.roundedText} onPress={() => openModal('한식')}>
            <Text style={styles.buttonText}>한식</Text>
          </TouchableOpacity>
          {selectedMenu === '한식' && (<FoodModal
          visible={modalVisible}
          closeModal={closeModal}
          foods={[
          '밥                                        336kcal/210g', 
          '제육덮밥                             716kcal/400g', 
          '계란말이                             154kcal/80g',
          '김밥                                    342kcal/230g', 
          '순대                                    312kcal/170g', 
          '떡볶이                                295kcal/200g',
          '삼겹살                                933kcal/200g', 
          '콩나물국                             24kcal/400g', 
          '설렁탕                                118kcal/500g', 
          '순대국밥                             448kcal/600g', 
          '김치볶음밥                          524kcal/330g', 
          '계란후라이                          95kcal/46g', 
          '김치                                     14kcal/40g',  
          '비빔밥                                 653kcal/450g', 
          '김치찌개                             243kcal/400g', 
          '된장찌개                             123kcal/300g']} // 예시 음식 리스트
          />)}
          <TouchableOpacity style={styles.roundedText} onPress={() => openModal('중식')}>
            <Text style={styles.buttonText}>중식</Text>
          </TouchableOpacity>
          {selectedMenu === '중식' && (<FoodModal
          visible={modalVisible}
          closeModal={closeModal}
          foods={[
          '짜장면                                 629kcal/600g', 
          '짬뽕                                    317kcal/500g', 
          '탕수육                                 305kcal/150g', 
          '군만두                                 448kcal/220g']} // 예시 음식 리스트
          />)}
          <TouchableOpacity style={styles.roundedText} onPress={() => openModal('일식')}>
            <Text style={styles.buttonText}>일식</Text>
          </TouchableOpacity>
          {selectedMenu === '일식' && (<FoodModal
          visible={modalVisible}
          closeModal={closeModal}
          foods={[
          '초밥                                     38kcal/25g', 
          '규카츠                                  464kcal/200g', 
          '등심돈까스                           463kcal/200g', 
          '안심돈까스                           652kcal/200g', 
          '치즈돈까스                           755kcal/250g', 
          '우동                                     360kcal/600g', 
          '규동                                     498kcal/360g']} // 예시 음식 리스트
          />)}
        </View>
        <View style={{flexDirection:'row', marginTop: 20}}>
          <TouchableOpacity style={styles.roundedText} onPress={() => openModal('양식')}>
            <Text style={styles.buttonText}>양식</Text>
          </TouchableOpacity>
          {selectedMenu === '양식' && (<FoodModal
          visible={modalVisible}
          closeModal={closeModal}
          foods={[
          '크림파스타                          660kcal/240g', 
          '피자                                    255kcal/100g', 
          '후라이드 치킨                     530kcal/200g', 
          '스테이크                             388kcal/200g', 
          '토마토파스타                      288kcal/248g', 
          '알리오올리오                      402kcal/200g', 
          '양념 치킨                            552kcal/200g']} // 예시 음식 리스트
          />)}
          <TouchableOpacity style={styles.roundedText} onPress={() => openModal('후식')}>
            <Text style={styles.buttonText}>후식</Text>
          </TouchableOpacity>
          {selectedMenu === '후식' && (<FoodModal
          visible={modalVisible}
          closeModal={closeModal}
          foods={[ 
          '츄러스                                 252kcal/70g', 
          '수박                                    33kcal/100g', 
          '딸기                                    6kcal/20g', 
          '귤                                        31kcal/80g', 
          '포도                                    3kcal/4.5g', 
          '방울토마토                         12kcal/12g', 
          '아메리카노                         10kcal/335ml', 
          '라떼                                   180kcal/335ml', 
          '생맥주                               190kcal/500ml']} // 예시 음식 리스트
          />)}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container2: {
    flex: 1,
    backgroundColor: 'white', // 원하는 배경색으로 변경
  },
  container: {
    flexDirection: 'column', // 가로 방향으로 아이템을 배치하는 Flexbox
    alignItems: 'center', // 아이템들을 세로 중앙에 정렬
    // padding: 10,
  },
  image: {
    width: 200, // 이미지 폭
    height: 180, // 이미지 높이
  },
  text: {
    marginTop: 20,
    fontSize: 30,
    color: 'black',
    fontFamily: 'custom-font',
  },
  roundedText: {
    backgroundColor: '#49704d', // 배경색
    borderRadius: 100, // 반지름 값이 커질수록 더 동그랗게 보입니다
    paddingHorizontal: 30,
    paddingVertical: 35,
    fontSize: 18,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'custom-font',
  },
});

export default ImageWithText;
