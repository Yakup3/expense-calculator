import React, {useState} from 'react';
import {
  TouchableOpacity,
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  Alert,
} from 'react-native';
import {Modalize} from 'react-native-modalize';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {localStrings} from '../localization';

export default function AddExpenseModal({modalizeRef, onAdd}) {
  const [nameInputValue, setNameInputValue] = useState('');
  const [expenseInputValue, setExpenseInputValue] = useState('');

  const onClose = () => {
    setNameInputValue('');
    setExpenseInputValue('');
    modalizeRef?.current?.close();
  };

  const handleOnNameInputChangeText = text => {
    setNameInputValue(text);
  };

  const handleOnExpenseInputChangeText = text => {
    setExpenseInputValue(text);
  };

  const calculateExpense = expense => {
    const data = expense.split(' ');
    let result = 0;

    data.forEach(n => {
      result += parseFloat(n);
    });

    return result;
  };

  const requiredAlert = () => {
    return Alert.alert(localStrings.warning, localStrings.fillDataWarning);
  };

  const handleOnAddButton = () => {
    if (nameInputValue.length == 0 || expenseInputValue.length == 0) {
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

      onAdd(expenseData);
      onClose();
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                               Render Methods                               */
  /* -------------------------------------------------------------------------- */

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

  const renderBody = () => {
    return <View style={styles.body}>{renderInputContainer()}</View>;
  };

  const renderAddButton = () => {
    return (
      <TouchableOpacity style={styles.addButton} onPress={handleOnAddButton}>
        <Text style={styles.buttonText}>{localStrings.add}</Text>
      </TouchableOpacity>
    );
  };

  const renderContent = () => {
    return (
      <SafeAreaView style={styles.content}>
        {renderHeader()}
        {renderBody()}
        {renderAddButton()}
      </SafeAreaView>
    );
  };

  return (
    <Modalize ref={modalizeRef} adjustToContentHeight withReactModal>
      {renderContent()}
    </Modalize>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    zIndex: -10,
  },
  header: {
    flex: 0.15,
    paddingHorizontal: '7%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  body: {
    flex: 0.8,
    padding: '9%',
    marginBottom: 20,
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
  addButton: {
    position: 'absolute',
    width: '82%',
    height: '14.5%',
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
