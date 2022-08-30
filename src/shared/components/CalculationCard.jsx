import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ScreenHeight, ScreenWidth} from '../constants';

export default function CalculationCard({item, index}) {
  return (
    <View key={index} style={styles.cardContainer}>
      <Text style={styles.date}>{item.date}</Text>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <Text style={[styles.text]}>{`Total: ${item.total}`}</Text>
        <Text style={styles.text}>{`Average: ${item.average}`}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: ScreenWidth * 0.9,
    height: ScreenHeight * 0.12,
    paddingHorizontal: 30,
    marginBottom: 5,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: '#a9a9a9',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#f5f5f5',
  },
  date: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00008b',
  },
});
