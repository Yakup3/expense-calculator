import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {PAGES} from '../shared/constants';
import {localStrings} from '../shared/localization';
import CalculationCard from '../shared/components/CalculationCard';
import {ScreenWidth, ScreenHeight} from '../shared/constants';

export default function Calculations() {
  const navigation = useNavigation();
  const [calculations, setCalculations] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      AsyncStorage.getItem('Calculations').then(val => {
        val === null ? setCalculations([]) : setCalculations(JSON.parse(val));
      });
    });

    return unsubscribe;
  }, [navigation]);

  const renderHeader = () => {
    return <Text style={styles.headerTitle}>List of Calculations</Text>;
  };

  const renderCalculations = () => {
    return (
      <View style={styles.calculationsCardContainer}>
        {calculations.length == 0 ? (
          <Text style={{color: '#000', fontSize: 24}}>
            {localStrings.nothingFound}
          </Text>
        ) : (
          <FlatList
            data={calculations}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(PAGES.CALCULATIONDETAIL, {
                    calculations: calculations,
                    data: item,
                  });
                }}>
                <CalculationCard item={item} index={index} />
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
          />
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderCalculations()}
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
  calculationsCardContainer: {
    width: ScreenWidth,
    height: ScreenHeight * 0.7,
    paddingVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
