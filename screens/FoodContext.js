// FoodContext.js

import React, { createContext, useContext, useState } from 'react';

const FoodContext = createContext();

export const useFoodContext = () => {
  return useContext(FoodContext);
};

export const FoodProvider = ({ children }) => {
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 

  const toggleSelectedFood = (food) => {
    setSelectedFoods((prevSelectedFoods) =>
      prevSelectedFoods.includes(food)
        ? prevSelectedFoods.filter((selectedFood) => selectedFood !== food)
        : [...prevSelectedFoods, food]
    );
  };

  return (
    <FoodContext.Provider value={{ selectedFoods, toggleSelectedFood, setSelectedFoods, email, setEmail, password, setPassword }}>
      {children}
    </FoodContext.Provider>
  );
};

export default FoodContext;
