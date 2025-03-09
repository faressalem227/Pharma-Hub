import React from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';

const questions = [
  'إجمالي الخصوم وحقوق الشركاء؟',
  'اجمالي المصروفات؟',
  'المصروفات الإدارية والعمومية؟',
  'إجمالي الإيرادات؟',
];

const Slider = ({ onSelect }) => {
  return (
    <FlatList
      data={questions}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.questionContainer}
          onPress={() => onSelect(item)}
        >
          <Text style={styles.question}>{item}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  questionContainer: {
    alignSelf: 'center', // Centers the container horizontally
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20, // Adds spacing around the text
    backgroundColor: '#d9d9d9',
    marginHorizontal: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  question: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});

export default Slider;
