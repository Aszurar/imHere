import { StyleSheet } from 'react-native';
import theme from '../../theme';

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.COLORS.BACKGROUND_MODAL,
  },
  container: {
    width: '85%',
    height: 200,
    padding: 24,
    borderWidth: 0.5,
    borderColor: theme.COLORS.HIGHLIGHT,
    borderRadius: 4,
    backgroundColor: theme.COLORS.BACKGROUND,
  },

  title: {
    fontSize: 24,
    color: theme.COLORS.TEXT_PRIMARY,
    fontFamily: theme.FONTS.BOLD,
  },
  subtitleContainer: {
    marginVertical: 16,
  },

  subtitle: {
    fontSize: 16,
    color: theme.COLORS.TEXT_PRIMARY,
    fontFamily: theme.FONTS.REGULAR,
  },

  footer: {
    flex: 1,
    width: '100%',
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },

  buttonsContainer: {
    width: '40%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: theme.FONTS.BOLD,
    textTransform: 'uppercase',
  },
});
