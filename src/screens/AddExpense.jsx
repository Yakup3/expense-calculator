import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {localStrings} from '../shared/localization';
import {TEMPEXPENSE} from '../shared/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddExpense() {
  const navigation = useNavigation();
  const [nameInputValue, setNameInputValue] = useState('');
  const [expenseInputValue, setExpenseInputValue] = useState('');

  const onClose = () => {
    navigation.goBack();
  };

  const calculateExpense = expense => {
    const data = expense.split(' ');
    let result = 0;

    data.forEach(n => {
      result += parseFloat(n);
    });

    return result;
  };

  const handleOnAddButton = async () => {
    if (nameInputValue.length == 0 && expenseInputValue.length == 0) {
      requiredAlert();
    } else {
      const res = calculateExpense(
        expenseInputValue.replace(/\s+/g, ' ').trim(),
      );

      const expenseData = {
        name: nameInputValue,
        expenseData: expenseInputValue.replace(/\s+/g, ' ').trim(),
        expense: res.toFixed(2),
      };

      let expenseValue;
      await AsyncStorage.getItem(TEMPEXPENSE).then(val => {
        expenseValue = JSON.parse(val);
      });

      expenseValue =
        expenseValue == null ? [expenseData] : expenseValue.concat(expenseData);
      await AsyncStorage.setItem(TEMPEXPENSE, JSON.stringify(expenseValue));

      setNameInputValue('');
      setExpenseInputValue('');

      Alert.alert(
        // ? Title
        localStrings.expenseAdded,
        // ? Body
        localStrings.wantToAddMoreExpense,
        [
          {
            text: localStrings.yes,
            onPress: async () => {},
          },
          {
            text: 'leave',
            onPress: () => {
              navigation.goBack();
            },
            style: 'cancel',
          },
        ],
        {cancelable: true},
      );
    }
  };

  const handleOnNameInputChangeText = text => {
    setNameInputValue(text);
  };

  const handleOnExpenseInputChangeText = text => {
    setExpenseInputValue(text);
  };

  const requiredAlert = () => {
    return Alert.alert(localStrings.warning, localStrings.fillDataWarning);
  };

  const renderHeaderTitle = () => {
    return <Text style={styles.headerTitle}>{localStrings.addExpense}</Text>;
  };

  const renderCloseIcon = () => {
    return (
      <AntDesign
        name="close"
        color={'#696969'}
        size={35}
        style={styles.closeIcon}
        onPress={onClose}
      />
    );
  };

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        {renderHeaderTitle()}
        {renderCloseIcon()}
      </View>
    );
  };

  const renderNameInputContainer = () => {
    return (
      <View>
        <Text style={styles.inputTitle}>{localStrings.name}</Text>
        <TextInput
          style={[styles.textInput, {height: 45}]}
          value={nameInputValue}
          onChangeText={handleOnNameInputChangeText}
        />
      </View>
    );
  };

  const renderExpenseInputContainer = () => {
    return (
      <View>
        <Text style={styles.inputTitle}>{localStrings.expenses}</Text>
        <TextInput
          style={styles.textInput}
          value={expenseInputValue}
          onChangeText={handleOnExpenseInputChangeText}
        />
      </View>
    );
  };

  const renderInputContainer = () => {
    return (
      <View>
        {renderNameInputContainer()}
        {renderExpenseInputContainer()}
      </View>
    );
  };

  const renderAddButton = () => {
    return (
      <TouchableOpacity style={styles.addButton} onPress={handleOnAddButton}>
        <Text style={styles.buttonText}>{localStrings.add}</Text>
      </TouchableOpacity>
    );
  };

  const renderBody = () => {
    return <View style={styles.body}>{renderInputContainer()}</View>;
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderBody()}
      {renderAddButton()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  textInput: {
    backgroundColor: '#f2f2f2',
    height: '35%',
    paddingVertical: 0,
    paddingHorizontal: '4%',
    fontSize: 16,
    color: '#000',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#696969',
    marginBottom: '10%',
  },
  body: {
    flex: 0.8,
    padding: '9%',
  },
  header: {
    flex: 0.15,
    paddingHorizontal: '7%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: {
    paddingTop: '6%',
    fontSize: 28,
    color: '#696969',
  },
  closeIcon: {
    paddingTop: '6%',
  },
  inputTitle: {
    fontSize: 18,
    color: '#000',
  },
  addButton: {
    position: 'absolute',
    width: '80%',
    height: '5.5%',
    borderRadius: 15,
    bottom: '2%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
  },
  buttonText: {
    fontSize: 18,
    color: '#faebd7',
  },
});
