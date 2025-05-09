import { View, StyleSheet, Pressable, Animated } from "react-native";
import Type from "@/src/components/Type";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { Colors } from "@/src/constants/Colors";
import { Size } from "@/src/constants/Sizes";

interface ICollapseBoxProps {
  children: React.ReactNode;
  buttonText?: string;
  height?: number;
}

export default function CollapseBox({
  children,
  buttonText = "Show more...",
  height = 100,
}: ICollapseBoxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [maxHeight, setMaxHeight] = useState(0);
  const animatedHeight = useRef(new Animated.Value(height)).current;
  
  useEffect(() => {
    handleToggle(isOpen);
  }, [isOpen, maxHeight]);

  const handleToggle = (val: boolean) => {
    Animated.timing(animatedHeight, {
      toValue: val ? maxHeight + 25 : height, // Add button height
      duration: 300,
      useNativeDriver: false
    }).start();
  };

  const onContentLayout = (event: any) => {
    const { height: contentHeight } = event.nativeEvent.layout;
    if (contentHeight > 0 && contentHeight !== maxHeight) {
      setMaxHeight(contentHeight);
    }
  };

  return (
    <Animated.View style={[styles.container, { height: animatedHeight }]}>
      <View style={styles.content} onLayout={onContentLayout}>
        {children}
      </View>
      <Pressable 
        onPress={() => setIsOpen(!isOpen)} 
        style={styles.button}
      >
        <Type>{isOpen ? "Show less..." : buttonText}</Type>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    overflow: "hidden",
    paddingVertical: Size.padding.sm,
  },
  content: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingBottom: 25,
  },
  button: {
    position: "absolute", 
    bottom: 0,
    right: 0,
    height: 25,
    width: "100%",
    backgroundColor: Colors.light.primaryDark,
    alignItems: "flex-end",
    justifyContent: "center",
  },
});