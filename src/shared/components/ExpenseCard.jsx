import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ScreenHeight, ScreenWidth} from '../constants';

export default function ExpenseCard({item, index}) {
  const renderView = (text, style) => {
    return (
      <View
        style={[
          {
            width: '50%',
            height: '100%',
            justifyContent: 'center',
          },
          style,
        ]}>
        <Text style={styles.text}>{text}</Text>
      </View>
    );
  };

  return (
    <View key={index} style={styles.cardContainer}>
      {renderView(item.name)}
      {renderView(`Total: ${item.expense}`, {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: ScreenWidth * 0.9,
    height: ScreenHeight * 0.09,
    paddingHorizontal: 30,
    marginBottom: 5,
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: '#a9a9a9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 20,
    color: '#000',
  },
});
