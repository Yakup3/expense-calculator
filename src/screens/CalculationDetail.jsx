import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import DetailCard from '../shared/components/DetailCard';
import {CALCULATIONS, ScreenHeight, ScreenWidth} from '../shared/constants';
import {localStrings} from '../shared/localization';

export default function CalculationDetail({route}) {
  const navigation = useNavigation();
  const [detail, setDetail] = useState({});
  const [calculations, setCalculations] = useState({});

  useEffect(() => {
    setDetail(route.params.data);
    setCalculations(route.params.calculations);
  }, []);

  const removeButton = () => {
    Alert.alert(
      // ? Title
      localStrings.remove,
      // ? Body
      localStrings.areYouSureYouWantToRemoveCalculation,
      [
        {
          text: localStrings.yes,
          onPress: async () => {
            const data = route.params.calculations.filter(a => {
              return a.id !== detail.id && a;
            });

            await AsyncStorage.setItem(CALCULATIONS, JSON.stringify(data));
            navigation.goBack();
          },
        },
        {
          text: localStrings.no,
          onPress: () => {},
          style: 'cancel',
        },
      ],
      {cancelable: true},
    );
  };

  const renderText = (text, style) => {
    return <Text style={style}>{text}</Text>;
  };

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{localStrings.calculationDetail}</Text>
        </View>
        <View>
          <Text style={styles.text}>{detail.date}</Text>
          <Text style={styles.text}>
            {`${localStrings.total}: ${detail.total}`}
          </Text>
          <Text style={styles.text}>
            {`${localStrings.average}: ${detail.average}`}
          </Text>
        </View>
      </View>
    );
  };

  const renderExpenses = () => {
    return (
      <View style={styles.expensesCardContainer}>
        <FlatList
          data={detail.data}
          renderItem={({item, index, separators}) => (
            <DetailCard item={item} index={index} average={detail.average} />
          )}
          keyExtractor={item => item.id}
        />
      </View>
    );
  };

  const renderInfo = (description, style) => {
    return (
      <View style={styles.info}>
        <View style={[styles.infoColor, style]}></View>
        {renderText(description, {color: '#000', fontSize: 16})}
      </View>
    );
  };

  const renderInfoView = () => {
    return (
      <View style={styles.infoView}>
        {renderInfo(localStrings.get)}
        {renderInfo(localStrings.pay, {backgroundColor: 'red'})}
      </View>
    );
  };

  const renderRemoveButton = () => {
    return (
      <TouchableOpacity style={styles.removeButton} onPress={removeButton}>
        {renderText(localStrings.remove, {
          fontWeight: 'bold',
          fontSize: 20,
          color: '#D8D8D8',
        })}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderExpenses()}
      {renderInfoView()}
      {renderRemoveButton()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderBottomColor: '#000',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  date: {
    fontSize: 18,
    color: '#000',
  },
  text: {
    fontSize: 15,
    color: '#000',
    textAlign: 'right',
  },
  expensesCardContainer: {
    width: ScreenWidth,
    height: ScreenHeight * 0.6,
    paddingVertical: 30,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoView: {
    position: 'absolute',
    bottom: ScreenHeight * 0.11,
    width: ScreenWidth,
    paddingVertical: 20,
    paddingHorizontal: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  info: {
    flexDirection: 'row',
  },
  infoColor: {
    width: ScreenWidth * 0.06,
    height: ScreenWidth * 0.06,
    marginRight: 20,
    backgroundColor: 'green',
  },
  removeButton: {
    position: 'absolute',
    width: ScreenWidth * 0.82,
    height: ScreenHeight * 0.06,
    borderRadius: 15,
    bottom: ScreenHeight * 0.04,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
});
