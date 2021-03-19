import { createMuiTheme } from '@material-ui/core';

const black = '#000000';
const white = '#FFFFFF';
const green = '#63B440';
const darkGreen = '#1C5204';
const lightGreen = '#DCF2D2';

const theme = createMuiTheme({
  palette: {
    primary: { main: black },
    secondary: { main: green },
    green: {
      dark: darkGreen,
      light: lightGreen,
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
        backgroundColor: darkGreen,
        color: white,
        padding: '0.5em 2em',
        '&:hover': {
          backgroundColor: '#4F8537',
        },
        '& > $label': {
          fontSize: 16,
          textTransform: 'capitalize',
        },
      },
      outlined: {
        border: '2px solid #26374A',
        borderRadius: 10,
        boxShadow: '0px -4px 0px 0px #26374A inset',
        padding: '1.5em',
        '& > $label': {
          flexFlow: 'column',
          textTransform: 'none',
        },
        '&:hover': {
          backgroundColor: '#EDF1F4',
        },
      },
      text: {
        fontSize: 20,
        fontWeight: 700,
        padding: 0,
        lineHeight: 'normal',
        textDecoration: 'underline',
        textTransform: 'none',
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
            backgroundColor: darkGreen,
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
        color: green,
        fontSize: 12,
        border: `1px solid ${green}`,
        borderRadius: 0,
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
