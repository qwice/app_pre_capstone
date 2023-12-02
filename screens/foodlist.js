import React from 'react';
import { View, Text, Modal, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import * as Font from 'expo-font';

const loadFonts = async () => {
  await Font.loadAsync({
    // 여기에 사용할 글꼴을 추가합니다.
    'custom-font': require('../assets/1.ttf'),
  });
};

const FoodModal = ({ visible, closeModal, foods }) => {
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
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={closeModal}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={true}>
            {foods.map((food, index) => (
              <TouchableOpacity key={index} style={styles.foodItem}>
                <Text style={{fontFamily: 'custom-font',}}>{food}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>닫기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxHeight: '80%',
  },
  scrollView: {
    marginBottom: 20,
  },
  foodItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#49704d',
    borderRadius: 5,
    marginVertical: 5,
  },
  closeButton: {
    marginTop: 10,
    alignSelf: 'flex-end',
    backgroundColor: '#49704d',
    borderRadius: 5,
    padding: 8,
  },
  closeButtonText: {
    textAlign: 'center',
    color: 'white',
    fontFamily: 'custom-font',
  },
});

export default FoodModal;
