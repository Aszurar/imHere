import { StyleSheet } from 'react-native';
import theme from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.COLORS.BACKGROUND,
    paddingHorizontal: 24,
    paddingTop: 75,
    paddingBottom: 24,
  },
  header: {
    marginBottom: 34,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: theme.FONTS.BOLD,
    fontSize: 24,
    lineHeight: 28,

    color: theme.COLORS.TEXT_PRIMARY,
  },
  date: {
    fontfamily: theme.FONTS.REGULAR,
    fontsize: 16,
    lineheight: 19,
    color: theme.COLORS.TEXT_SECONDARY,
  },
  button: {
    marginTop: 16,
    padding: 10,
    width: '80%',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 200,
    borderWidth: 1,
  },
  eventDetailsBorderButton: {
    borderColor: theme.COLORS.HIGHLIGHT_SECONDARY,
  },
  eventDetailsBackgroundButtonActivated: {
    backgroundColor: theme.COLORS.HIGHLIGHT_SECONDARY,
  },
  eventDetailsBackgroundButtonDisable: {
    backgroundColor: 'transparent',
  },
  buttonText: {
    fontfamily: theme.FONTS.BOLD,
    fontsize: 16,
    color: theme.COLORS.TEXT_PRIMARY,
  },
  inputContainer: {
    marginBottom: 32,
  },
  subtitleContainer: {
    flex: 1,
  },

  labelList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subtitle: {
    fontFamily: theme.FONTS.BOLD,
    fontSize: 20,
    lineHeight: 23,

    color: theme.COLORS.TEXT_PRIMARY,
  },
  textContainer: {
    marginTop: 28,
    alignItems: 'center',
  },
  text: {
    fontFamily: theme.FONTS.REGULAR,
    fontSize: 14,
    lineHeight: 16,
    color: theme.COLORS.TEXT_PRIMARY,
    textAlign: 'center',
  },
  deleteEventBorderButton: {
    borderColor: theme.COLORS.DELETE,
  },
  deleteEventBackgroundButtonActivated: {
    backgroundColor: theme.COLORS.DELETE,
  },
  deleteEventBackgroundButtonDisable: {
    backgroundColor: 'transparent',
  },
});
