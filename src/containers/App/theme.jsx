import { createMuiTheme, lighten } from '@material-ui/core';

const black = '#000000';
const white = '#FFFFFF';
const altGrey = '#434343';
const lightGrey = '#AEAEAE';
const darkGrey = '#616060';
const athensGrey = '#EAEBED';
const darkBlue = '#284162';
const charcoal = '#CCCCCC';
const navyBlue = '#26374A';
const buttonBlue = '#054169';
const inlineBlue = '#BBEBFF';
const lightBlue = '#D7FAFF';
const lightPurple = '#4F5292';
const darkPurple = '#593D6C';
const altPurple = '#5B3B67';
const lightTeal = '#D9F4F3';
const darkTeal = '#66C8C3';
const footerBlue = '#EAF9FF';
const swansDown = '#D2EDEB';
const tealBlue = '#07456B';
const environmental = '#744A95';
const socioEconomic = '#E14977';
const darkBluePurple = '#222546';
const twilightPurple = '#4F5395';

const textButtonStyle = {
  fontSize: 'inherit',
  lineHeight: 'normal',
  minWidth: 'unset',
  padding: 0,
  textAlign: 'left',
  textDecoration: 'underline',
  verticalAlign: 'text-bottom',
  '&:hover': {
    backgroundColor: 'inherit',
  },
  '& > $label': {
    display: 'inline',
    fontSize: 'inherit',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  '&$focusVisible': {
    textDecoration: 'none',
  },
};

const defaultTheme = createMuiTheme();
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
      darkBluePurple,
      inline: inlineBlue,
    },
    icon: { grey: '#42464B' },
    purple: {
      dark: darkPurple,
      light: lightPurple,
      twilight: twilightPurple,
      alt: altPurple,
    },
    teal: {
      dark: darkTeal,
      light: lightTeal,
      blue: tealBlue,
    },
    grey: {
      light: lightGrey,
      dark: darkGrey,
      alt: altGrey,
      charcoal,
      athens: athensGrey,
    },
    dialog: {
      footer: footerBlue,
    },
    cart: {
      light: swansDown,
      dark: tealBlue,
    },
    content: {
      background: '#EDF1F4',
    },
    environmental,
    socioEconomic,
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
      subtitle1: {
        fontWeight: 600,
        color: white,
      },
      subtitle2: {
        padding: '1em 0px 0.5em',
        fontSize: 14,
      },
      body1: { fontSize: 16 },
      body2: { fontSize: 14 },
      caption: {
        fontSize: 12,
        lineHeight: 1.3,
        '& > p': { margin: 0 },
      },
      overline: { fontSize: 12 },
    },
    MuiButton: {
      root: {
        borderRadius: '5px',
        textTransform: 'none',
        '&$disabled': {
          color: null,
        },
      },
      contained: {
        backgroundColor: darkTeal,
        color: black,
        padding: '0.5em 2em',
        '&:hover': { backgroundColor: lighten(darkTeal, 0.2) },
        '&$disabled': {
          backgroundColor: null,
          color: null,
        },
        '& > $label': {
          fontSize: 16,
        },
      },
      containedPrimary: {
        backgroundColor: navyBlue,
        '&:hover': {
          backgroundColor: '#5B7495',
        },
      },
      colorInherit: textButtonStyle,
      textPrimary: {
        minWidth: 'unset',
        padding: 0,
        textAlign: 'left',
        '&:hover': {
          backgroundColor: 'inherit',
        },
        '&$focusVisible': {
          backgroundColor: defaultTheme.palette.action.focus,
        },
      },
      textSecondary: {
        color: '#295376',
        // TODO: Refactor button styles so textButtonStyle is in the default text variant setup
        ...textButtonStyle,
      },
    },
    MuiToggleButton: {
      root: {
        borderRadius: '0.5em',
        color: '#333333',
        fontSize: 18,
        padding: '0.2em 2.5em',
        textTransform: 'none',
        '&$selected': {
          backgroundColor: twilightPurple,
          color: white,
          '&:hover': { backgroundColor: lighten(lightPurple, 0.2) },
        },
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
    MuiCircularProgress: {
      circle: { color: tealBlue },
    },
    MuiSelect: {
      select: {
        backgroundColor: white,
        '&:focus': { backgroundColor: white },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 2600,
    },
  },
  props: {
    MuiButton: {
      disableElevation: true,
    },
  },
});

export default theme;
