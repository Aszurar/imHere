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
    padding: 24,
    borderWidth: 0.5,
    borderColor: theme.COLORS.HIGHLIGHT_SECONDARY,
    borderRadius: 4,
    backgroundColor: theme.COLORS.BACKGROUND,
  },

  title: {
    fontSize: 20,
    color: theme.COLORS.TEXT_PRIMARY,
    fontFamily: theme.FONTS.BOLD,
  },

  inputContainer: {
    marginVertical: 24,
    borderRadius: 4,
  },
  input: {
    height: 48,
    width: '100%',
    paddingHorizontal: 16,
    borderRadius: 4,
    fontSize: 14,
    fontFamily: theme.FONTS.REGULAR,
    color: theme.COLORS.TEXT_PRIMARY,
    borderBottomWidth: 0.5,
  },
  invalidMessage: {
    marginTop: 4,
    color: theme.COLORS.TEXT_INVALID_MESSAGE,
    fontSize: 12,
    fontWeight: '500',
  },
  Footer: {
    width: '60%',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  button: {
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontFamily: theme.FONTS.BOLD,
  },
});
