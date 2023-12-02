import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import axios from 'axios';
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



const MyCalendar = () => {
  const today = new Date(new Date().getTime() + (9 * 60 * 60 * 1000));
  const todayString = today.toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(todayString);
  console.log('1 날짜', selectedDate);
  const [toCal, setToCal] = useState(null);
  const [morningMeals, setMorningMeals] = useState([]);
  const [lunchMeals, setLunchMeals] = useState([]);
  const [dinnerMeals, setDinnerMeals] = useState([]);

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

  const onDayPress = async(day) => {
    setSelectedDate(day.dateString);
  };

  const cal = async () => {
    try {
      const ok = await axios.post('http://172.20.10.3:3000/api/users/calendar', {selectedDate});
      setMorningMeals(ok.data.data.filter(item => item.MealType === '아침'));
      setLunchMeals(ok.data.data.filter(item => item.MealType === '점심'));
      setDinnerMeals(ok.data.data.filter(item => item.MealType === '저녁'));
      console.log('morning', morningMeals);
      console.log('lunch', lunchMeals);
      console.log('dinner', dinnerMeals);
      setToCal(ok.data.totalCalories);
      console.log('ok', toCal);
    } catch (e) {
      console.log('오늘날짜', selectedDate)
      setMorningMeals([]);
      setLunchMeals([]);
      setDinnerMeals([]);
    }
  };

  // markedDates에 오늘 날짜를 지정합니다.
  const markedDates = {
    [selectedDate]: { selected: true, marked: true, selectedColor: 'blue' },
  };


  return (
    <View>
      <ScrollView>
        <Calendar
          onDayPress={onDayPress}
          markedDates={markedDates}
        />
        <View style={{flexDirection: 'row', marginLeft: 200}}>
          {selectedDate !== '' && <Text style={{fontFamily: 'custom-font', fontSize: 20, marginTop: 18}}>{selectedDate}</Text>}
          <TouchableOpacity style={{border: 1, borderRadius: 5, backgroundColor : '#315134', width: 50, height: 30, alignItems: 'center', justifyContent: 'center', marginLeft: '5%', marginTop: 10}} onPress={cal}>
            <Text style={{fontFamily: 'custom-font', color: 'white'}}>검색</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{marginLeft: 10, fontFamily: 'custom-font',}}>아침</Text>
          <View style={Styles.NextBottom}>
            {morningMeals.length !== 0 ? (
              morningMeals.map((meal, index) => (
                <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 40 }}>
                  <Text style={{ flex: 1, textAlign: 'right', fontFamily: 'custom-font', }}>{meal.FoodID}</Text>
                  <Text>{':   '}</Text>
                  <Text style={{fontFamily: 'custom-font',}}>{meal.Calories}kcal/</Text>
                  <Text style={{fontFamily: 'custom-font',}}>{meal.Quantity}</Text>
                </View>
              ))
              ) : (
              <Text>없음</Text>
            )}
          </View>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 2 }}>
          <Text style={{marginLeft: 10, fontFamily: 'custom-font',}}>점심</Text>
          <View style={Styles.NextBottom}>
            {lunchMeals.length !== 0 ? (
              lunchMeals.map((meal, index) => (
                <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 40 }}>
                  <Text style={{ flex: 1, textAlign: 'right', fontFamily: 'custom-font', }}>{meal.FoodID}</Text>
                  <Text>{':   '}</Text>
                  <Text style={{fontFamily: 'custom-font',}}>{meal.Calories}kcal/</Text>
                  <Text style={{fontFamily: 'custom-font',}}>{meal.Quantity}</Text>
                </View>
              ))
            ) : (
              <Text>없음</Text>
            )}
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 2 }}>
          <Text style={{marginLeft: 10, fontFamily: 'custom-font',}}>저녁</Text>
          <View style={Styles.NextBottom}>
            {dinnerMeals.length !== 0 ? (
              dinnerMeals.map((meal, index) => (
                <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 40 }}>
                  <Text style={{ flex: 1, textAlign: 'right', fontFamily: 'custom-font', }}>{meal.FoodID}</Text>
                  <Text>{':   '}</Text>
                  <Text style={{fontFamily: 'custom-font',}}>{meal.Calories}kcal/</Text>
                  <Text style={{fontFamily: 'custom-font',}}>{meal.Quantity}</Text>
                </View>
              ))
            ) : (
              <Text>없음</Text>
            )}
          </View>
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 10}}>
          <Text style={{fontSize: 20, marginTop: 10, marginBottom: 20, fontFamily: 'custom-font',}}>총 칼로리 : {toCal ? toCal : '0'}kcal</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default MyCalendar;

const Styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20, // 상하 여백 조절
  },
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
  },
  NextBottom: {
      padding: 20,
      marginTop: "4%",
      marginLeft : "5%",
      width: "80%",
      alignSelf: "center",
      borderRadius: 10,
      borderWidth: 1,

  },
  BottomText: {
      fontSize: 15,
      color: "black",
      textAlign: "center",
  },
});
