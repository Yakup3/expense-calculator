import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  CALCULATIONS,
  PAGES,
  ScreenHeight,
  ScreenWidth,
  TEMPEXPENSE,
} from '../shared/constants';
import {localStrings} from '../shared/localization';
import ExpenseCard from '../shared/components/ExpenseCard';

export default function Home() {
  const navigation = useNavigation();
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      await getTempExpense();
    });

    return unsubscribe;
  }, [navigation]);

  const getTempExpense = async () => {
    await AsyncStorage.getItem(TEMPEXPENSE).then(val => {
      setExpenses(JSON.parse(val) || []);
    });
  };

  const handleOnPlusButton = () => {
    navigation.navigate(PAGES.ADDEXPENSE);
  };

  const getCurrentDate = () => {
    const now = Moment().format('DD.MM.YYYY');
    return now;
  };

  const setData = () => {
    let total = 0;
    expenses.forEach(n => {
      total += n.expense;
    });

    const avg = total / expenses.length;
    const data = {
      id: new Date(),
      total: total,
      average: avg.toFixed(1),
      date: getCurrentDate(),
      data: expenses,
    };

    return data;
  };

  const handleOnCalculateButton = async () => {
    if (expenses.length !== 0) {
      const data = setData();
      let calculations;

      await AsyncStorage.getItem(CALCULATIONS).then(val => {
        calculations = JSON.parse(val);
      });

      calculations = calculations == null ? [data] : calculations.concat(data);

      await AsyncStorage.setItem(CALCULATIONS, JSON.stringify(calculations));
      setExpenses([]);
      await AsyncStorage.removeItem(TEMPEXPENSE);
      navigation.navigate(PAGES.CALCULATIONS);
    } else {
      alert(localStrings.addDataWarning);
    }
  };

  const renderHeader = () => {
    return <Text style={styles.headerTitle}>{localStrings.expenses}</Text>;
  };

  const renderExpenses = () => {
    return (
      <View style={styles.expenseCardContainer}>
        {expenses.length == 0 ? (
          <Text style={{color: '#000', fontSize: 24}}>
            {localStrings.nothingFound}
          </Text>
        ) : (
          <FlatList
            data={expenses}
            renderItem={({item, index}) => (
              <ExpenseCard item={item} index={index} key={index} />
            )}
            keyExtractor={item => item.id}
          />
        )}
      </View>
    );
  };

  const renderPlusIcon = () => {
    return <AntDesign name="plus" color={'green'} size={30} />;
  };

  const renderPlusButton = () => {
    return (
      <TouchableOpacity style={styles.plusButton} onPress={handleOnPlusButton}>
        {renderPlusIcon()}
      </TouchableOpacity>
    );
  };

  const renderCalculateButton = () => {
    return (
      <TouchableOpacity
        style={[styles.plusButton, styles.calculateButton]}
        onPress={handleOnCalculateButton}>
        <Text style={styles.calculateButtonText}>{localStrings.calculate}</Text>
      </TouchableOpacity>
    );
  };

  const renderButtons = () => {
    return (
      <View style={styles.buttonContainer}>
        {renderCalculateButton()}
        {renderPlusButton()}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderExpenses()}
      {renderButtons()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 26,
    color: '#000',
    paddingTop: 30,
    paddingLeft: 20,
  },
  expenseCardContainer: {
    width: ScreenWidth,
    height: ScreenHeight * 0.7,
    paddingVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    width: ScreenWidth * 0.85,
    height: ScreenHeight * 0.07,
    right: 30,
    bottom: ScreenHeight * 0.14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  plusButton: {
    width: ScreenWidth * 0.12,
    height: ScreenWidth * 0.12,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'green',
    backgroundColor: 'whitesmoke',
  },
  calculateButton: {
    width: '70%',
    height: ScreenWidth * 0.12,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'green',
    backgroundColor: 'whitesmoke',
  },
  calculateButtonText: {
    fontSize: 20,
    color: 'green',
    fontWeight: 'bold',
  },
});
