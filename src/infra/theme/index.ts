import {Platform} from 'react-native';
import {DefaultTheme} from 'react-native-paper';
import {Theme} from 'react-native-paper/lib/typescript/types';
import colors from './colors';

const theme: Theme = {
  ...DefaultTheme,
  colors: {
    error: colors.red,
    accent: colors.gray,
    backdrop: colors.lightGray,
    background: colors.white,
    disabled: colors.gray,
    notification: colors.red,
    onSurface: colors.darkGray,
    primary: colors.white,
    surface: colors.lightGray,
    placeholder: colors.lightGray,
    text: colors.darkGray,
  },
  fonts: {
    regular: {
      fontFamily:
        Platform.select({
          ios: 'Helvetica Neue',
          android: 'sans-serif',
        }) || 'sans-serif',
      fontWeight: 'normal',
    },
    light: {
      fontFamily:
        Platform.select({
          ios: 'HelveticaNeue-Light',
          android: 'sans-serif-light',
        }) || 'sans-serif',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily:
        Platform.select({
          ios: 'HelveticaNeue-Medium',
          android: 'sans-serif-medium',
        }) || 'sans-serif-medium',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily:
        Platform.select({
          ios: 'HelveticaNeue-Thin',
          android: 'sans-serif-thin',
        }) || 'sans-serif-thin',
      fontWeight: 'normal',
    },
  },
};

export default theme;
