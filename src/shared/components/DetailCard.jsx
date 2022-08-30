import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

import {ScreenHeight, ScreenWidth} from '../constants';
import {localStrings} from '../localization';

export default function DetailCard({item, index, average}) {
  const [userExpense, setUserExpense] = useState(0);

  useEffect(() => {
    setUserExpense((item.expense - average).toFixed(1));
  }, []);

  const renderSad = () => {
    return <Entypo name={'emoji-sad'} color={'red'} size={20} />;
  };

  const renderHappy = () => {
    return <Entypo name={'emoji-happy'} color={'green'} size={20} />;
  };

  const renderHeader = () => {
    return (
      <Text style={styles.header}>
        {item.name}
        {'  '}
        {userExpense < 0 ? renderSad() : renderHappy()}
      </Text>
    );
  };

  const renderExpenseContainer = () => {
    return (
      <View style={styles.expenseContainer}>
        <Text style={styles.text}>{localStrings.expense}: </Text>
        <Text style={styles.text}>{item.expense}</Text>
      </View>
    );
  };

  const renderPayGetContainer = () => {
    return (
      <View style={styles.expenseContainer}>
        <Text style={styles.text}>{localStrings.substracted}: </Text>
        <Text
          style={[
            styles.text,
            {color: userExpense < 0 ? 'red' : 'green', fontWeight: 'bold'},
          ]}>
          {userExpense}
        </Text>
      </View>
    );
  };

  const renderCalculationsContainer = () => {
    return (
      <View style={styles.calculationsContainer}>
        {renderExpenseContainer()}
        {renderPayGetContainer()}
      </View>
    );
  };

  return (
    <View key={index} style={[styles.cardContainer]}>
      {renderHeader()}
      {renderCalculationsContainer()}
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: ScreenWidth * 0.85,
    height: ScreenHeight * 0.16,
    paddingHorizontal: ScreenWidth * 0.08,
    marginBottom: 5,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: '#a9a9a9',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
  expenseContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  calculationsContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
});
