import { createMuiTheme, lighten } from '@material-ui/core';

const black = '#000000';
const white = '#FFFFFF';
const grey = '#AEAEAE';
const darkBlue = '#284162';
const navyBlue = '#26374A';
const buttonBlue = '#054169';
const lightBlue = '#D7FAFF';
const lightPurple = '#4F5292';
const darkPurple = '#593D6C';
const lightTeal = '#D9F4F3';
const darkTeal = '#66C8C3';
const footerBlue = '#EAF9FF';

const theme = createMuiTheme({
  palette: {
    primary: { main: black },
    secondary: { main: darkTeal },
    button: {
      blue: buttonBlue,
    },
    blue: {
      navy: navyBlue,
      dark: darkBlue,
      light: lightBlue,
    },
    purple: {
      dark: darkPurple,
      light: lightPurple,
    },
    teal: {
      dark: darkTeal,
      light: lightTeal,
    },
    grey: {
      light: grey,
    },
    dialog: {
      footer: footerBlue,
    },
  },
  typography: {
    fontFamily: '"Noto Sans", sans-serif',
    fontSize: 22,
  },
  overrides: {
    MuiTypography: {
      h4: { fontSize: 40 },
      h5: { fontSize: 22 },
      h6: {
        fontSize: 20,
        fontWeight: 700,
        lineHeight: 'normal',
      },
      body1: { fontSize: 16 },
      body2: { fontSize: 14 },
      subtitle1: {
        color: black,
        fontSize: 29,
        lineHeight: '1em',
      },
      subtitle2: {
        color: black,
        fontSize: 20,
        lineHeight: '1em',
        paddingBottom: '0.5em',
        paddingTop: '0.5em',
      },
      caption: {
        fontSize: 12,
        lineHeight: 1.3,
        '& > p': { margin: 0 },
      },
      overline: { fontSize: 12 },
    },
    MuiButton: {
      contained: {
        backgroundColor: darkTeal,
        color: black,
        padding: '0.5em 2em',
        '&:hover': { backgroundColor: lighten(darkTeal, 0.2) },
        '& > $label': {
          fontSize: 16,
          textTransform: 'none',
        },
      },
      containedPrimary: {
        backgroundColor: navyBlue,
        '&:hover': {
          backgroundColor: '#5B7495',
        },
      },
      colorInherit: {
        fontSize: 16,
        fontWeight: 400,
        padding: 0,
        lineHeight: 'normal',
        textDecoration: 'underline',
        textTransform: 'none',
        verticalAlign: 'text-bottom',
        '&:hover': {
          backgroundColor: 'inherit',
        },
      },
    },
    MuiSwitch: {
      root: {
        width: 'calc(3em + 6px)',
        height: 'calc(1.5em + 6px)',
        padding: 0,
      },
      switchBase: {
        padding: '3px',
        color: white,
        '&$checked': {
          transform: 'translateX(1em)',
          '& + $track': {
            backgroundColor: '#222546',
            opacity: 1,
          },
        },
      },
      thumb: {
        boxShadow: 'none',
        height: '1em',
        width: '1em',
      },
      track: {
        backgroundColor: '#E0E0E0',
        borderRadius: '1em',
        opacity: 1,
      },
    },
    MuiTooltip: {
      tooltip: {
        backgroundColor: white,
        padding: 0,
      },
    },
    MuiDialog: {
      root: {
        '& button': { height: 'auto' },
      },
    },
    MuiSvgIcon: {
      root: { fontSize: 24 },
      fontSizeSmall: { fontSize: 20 },
      fontSizeLarge: { fontSize: 35 },
    },
    MuiTableCell: {
      root: {
        fontSize: 12,
        borderBottom: 'none',
      },
    },
  },
});

export default theme;
