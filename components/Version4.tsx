import React, {useEffect} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';

import {LinearGradient} from 'react-native-linear-gradient';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withSequence,
  Easing,
  withTiming,
} from 'react-native-reanimated';

const AnimatedLG = Animated.createAnimatedComponent(LinearGradient);
const {width} = Dimensions.get('window');

const SkeletonComponent3 = () => {
  const sv = useSharedValue(-1);

  React.useEffect(() => {
    sv.value = withRepeat(
      withTiming(1, {duration: 1000, easing: Easing.bezier(0, 0, 0.4, 1)}),
      Infinity,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: sv.value * width}],
  }));

  return (
    <View
      style={{
        backgroundColor: '#a0a0a0',
        borderColor: '#b0b0b0',
        height: 10,
        width: width,
      }}>
      <AnimatedLG
        colors={['#a0a0a0', '#b0b0b0', '#b0b0b0', '#a0a0a0']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={[StyleSheet.absoluteFill, animatedStyle]}
      />
    </View>
  );
};
export default SkeletonComponent3;
