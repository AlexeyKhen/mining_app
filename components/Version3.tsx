import React, {useEffect} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
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

const SkeletonComponent2 = () => {
  const transform = useSharedValue(0);

  useEffect(() => {
    transform.value = withRepeat(
      withTiming(
        1,
        {duration: 1000, easing: Easing.linear},
        (finished, currentValue) => {
          if (finished) {
            console.log('current withRepeat value is ' + currentValue);
          } else {
            console.log('inner animation cancelled');
          }
        },
      ),
      Infinity,
      false,
    );
  }, []);

  const animatedStyles = useAnimatedStyle(() => {
    const scale = interpolate(transform.value, [0, 1], [-width * 2, width * 2]);

    return {
      transform: [{translateX: scale}],
    };
  });

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
        style={[StyleSheet.absoluteFill, animatedStyles]}
      />
    </View>
  );
};
export default SkeletonComponent2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
