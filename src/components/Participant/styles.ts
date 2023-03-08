import { StyleSheet } from 'react-native';
import theme from '../../theme';

export const ITEM_LIST_HEIGHT = 60;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: ITEM_LIST_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  main: {
    flex: 1,
    height: 60,
    paddingRight: 16,
    paddingLeft: 16,
    justifyContent: 'center',
    backgroundColor: theme.COLORS.BACKGROUND_SECONDARY,
  },
  name: {
    fontSize: 16,
    fontFamily: theme.FONTS.REGULAR,
    color: theme.COLORS.TEXT_PRIMARY,
  },

  button: {
    backgroundColor: '#000',
    padding: 10,

    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
