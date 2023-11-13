import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import React, {createContext, ReactNode, useEffect} from 'react';
import {StyleSheet} from 'react-native';

const AnimatedStyleContext = createContext<{opacity?: number}>({});

interface SkeletonGroupProps {
  children?: ReactNode;
}

export const SkeletonGroup = ({children}: SkeletonGroupProps) => {
  const opacity = useSharedValue(0.5);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(0.8, {duration: 1000, easing: Easing.linear}),
      Infinity,
      true,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });
  return (
    <AnimatedStyleContext.Provider value={animatedStyle}>
      {children}
    </AnimatedStyleContext.Provider>
  );
};

// <Animated.View style={[styles.skeleton, animatedStyle]} />
const styles = StyleSheet.create({
  skeleton: {
    flex: 3,
    height: 120,
    backgroundColor: '#000000',
  },
});
