import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import dot from '../../assets/images/dot.png';
import True from '../../assets/images/True.png';
function Checkbox({
  keyName,
  labelName,
  title,
  value = false,
  onChange,
  direction = "ltr",
  isEditable = false,
  checkboxSize = "medium",
  checkboxColor = "#227099",
  uncheckedIcon = "",
  checkboxShape = "square",
}) {
  const [isChecked, setIsChecked] = useState(value);

  useEffect(() => {
    setIsChecked(value);
  }, [value]);

  const handleCheckboxChange = () => {
    if (!isEditable) return;
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    if (onChange) onChange(newChecked, keyName);
  };

  const getCheckboxSize = () => {
    switch (checkboxSize) {
      case 'small':
        return { width: 20, height: 20 };
      case 'medium':
        return { width: 25, height: 25 };
      case 'large':
        return { width: 30, height: 30 };
      default:
        return { width: 25, height: 25 };
    }
  };

  const getCheckboxShape = () => {
    switch (checkboxShape) {
      case 'circle':
        return { borderRadius: 15 }; // Circle style
      case 'square':
      default:
        return { borderRadius: 5 }; // Square style
    }
  };

  const checkedIconShape = () => {
    return checkboxShape === "circle" ? (
      <Image source={dot} style={{ width: '50%', height: '50%' }} />
    ) : (
      <Image source={True} style={{ width: '50%', height: '50%' }} />
    );
  };

  return (
    <View
    className="outline-none border-[#1C5B7D]"
      style={[
        styles.container,
        
        direction === "rtl" && { flexDirection: 'row-reverse' },
      ]}
      title={title}
    >
      <TouchableOpacity
      className="outline-none"
        style={[
          styles.checkboxContainer,
          getCheckboxSize(),
          getCheckboxShape(),
          { borderColor: checkboxColor },
        ]}
        onPress={handleCheckboxChange}
        disabled={!isEditable}
      >
        {isChecked ? (
          <View className="outline-none border-[#1C5B7D]"
            style={[
              styles.checkboxChecked,
              getCheckboxSize(),
              getCheckboxShape(),
              { backgroundColor: checkboxColor },
            ]}
          >
            {checkedIconShape()}
          </View>
        ) : (
          <View
          className="outline-none border-[#1C5B7D]"
            style={[
              styles.checkboxUnchecked,
              getCheckboxSize(),
              getCheckboxShape(),
            ]}
          >
            {uncheckedIcon}
          </View>
        )}
      </TouchableOpacity>
      <Text
        style={[
          styles.label,
          { pointerEvents: isEditable ? 'auto' : 'none' },
        ]}
        className="text-base font-tmedium font-medium "
      >
        {labelName}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkboxContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    cursor: 'pointer',
    position: 'relative',
    
  },
  checkboxChecked: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderWidth: 0,
  },
  checkboxUnchecked: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderWidth:.5,
  },
  label: {
    color: '#333',
    fontSize: 16,
  },
});

export default Checkbox;
