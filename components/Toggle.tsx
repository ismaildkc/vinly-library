import { Animated, Pressable, View, Text, StyleSheet } from "react-native";
import { useRef, useEffect } from "react";
import { Colors } from "@/constants/Colors";

interface IToggleProps {
  data: IToggleItem[];
  onPress: (item: any) => void;
  selectedValue?: string;
}

interface IToggleItem {
  label: string;
  value: string;
}

export default function Toggle({ data, onPress, selectedValue }: IToggleProps) {
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const index = data.findIndex(item => item.value === selectedValue);
    const toValue = index === -1 ? 0 : (index * (100 / data.length));

    Animated.spring(slideAnim, {
      toValue,
      useNativeDriver: false,
      friction: 8,
      tension: 40
    }).start();
  }, [selectedValue]);

  return (
    <View style={styles.container}>
      {data.map((item) => (
        <Pressable 
          key={item.value}
          style={[
            styles.item,
            selectedValue === item.value && styles.selectedItem
          ]} 
          onPress={() => onPress(item)}
        >
          <Text style={[
            styles.itemText,
            selectedValue === item.value && styles.selectedItemText
          ]}>
            {item.label}
          </Text>
        </Pressable>
      ))}
      <Animated.View style={[
        styles.toggleButton,
        { 
          left: slideAnim.interpolate({
            inputRange: [0, 100],
            outputRange: ['0%', '100%']
          }),
          width: `${100 / data.length}%` 
        }
      ]} />
    </View>
  );
}

const radius = 6;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 250,
    height: 25,
    backgroundColor: Colors.light.gray,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: radius,
    position: 'relative',
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  toggleButton: {
    height: '100%',
    backgroundColor: Colors.light.cambridgeBlue,
    position: 'absolute',
    top: 0,
    borderRadius: radius * 0.75,
    opacity: 0.5,
  },
  itemText: {
    fontSize: 11,
  },
  selectedItem: {
    zIndex: 1,
  },
  selectedItemText: {
    color: '#000',
  }
})