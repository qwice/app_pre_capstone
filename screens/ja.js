import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useFoodContext } from './FoodContext';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';

const loadFonts = async () => {
  await Font.loadAsync({
    // 여기에 사용할 글꼴을 추가합니다.
    'custom-font': require('../assets/1.ttf'),
  });
};

const JA = () => {
    const { selectedFoods, toggleSelectedFood } = useFoodContext();

    const foods = [
        { id: 1, text: '초밥', isChecked: false },
        { id: 2, text: '규카츠', isChecked: false },
        { id: 3, text: '등심돈까스', isChecked: false },
        { id: 4, text: '우동', isChecked: false },
        { id: 5, text: '규동', isChecked: false },
        { id: 6, text: '안심돈까스', isChecked: false },
        { id: 7, text: '치즈돈까스', isChecked: false },
    ];

    const handleToggle = (food) => {
        toggleSelectedFood(food);
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
        <View style={styles.container}>
            <ScrollView>
                {foods.map((food) => (
                <TouchableOpacity
                key={food.id}
                onPress={() => handleToggle(food.text)}
                style={styles.item}
                >
                <Ionicons
                    name={selectedFoods.includes(food.text) ? 'checkbox-outline' : 'square-outline'}
                    size={24}
                    color={selectedFoods.includes(food.text) ? 'green' : 'black'}
                />
                <Text style={{fontFamily: 'custom-font',}}>{food.text}</Text>
                </TouchableOpacity>
                  ))}
                <Text style={{marginTop: 20, fontWeight: 'bold', fontSize: 25, marginLeft: 10, fontFamily: 'custom-font',}}>선택한 음식</Text>
                {selectedFoods.map((food, index) => (
                    <Text key={index} style={{marginTop: 10, marginLeft: 10, fontSize: 15, fontFamily: 'custom-font',}}>{food}</Text>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
});

export default JA;
