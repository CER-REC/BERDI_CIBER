import { createMuiTheme } from '@material-ui/core';

/**
 * Customize the look-and-feel of UI components here.
 */
const defaultTheme = createMuiTheme({
  palette: {
    primary: { main: '#000000' },
    secondary: {
      main: '#63B440',
      dark: '#1C5204',
    },
  },
});

const theme = createMuiTheme({
  palette: {
    primary: { main: defaultTheme.palette.primary.main },
    secondary: { main: defaultTheme.palette.secondary.main },
  },
  typography: {
    fontFamily: '"FiraSansCondensed", "Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 22,
  },
  overrides: {
    MuiTypography: {
      h4: { fontSize: 34 },
      h5: { fontSize: 22 },
      h6: {
        fontSize: 20,
        fontWeight: 700,
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
      contained: {
        backgroundColor: defaultTheme.palette.secondary.dark,
        color: defaultTheme.palette.common.white,
        padding: '0.5em 2em',
        '&:hover': {
          backgroundColor: defaultTheme.palette.secondary.main,
        },
      },
      label: { fontSize: 16 },
    },
    MuiSwitch: {
      root: {
        width: 'calc(3em + 6px)',
        height: 'calc(1.5em + 6px)',
        padding: 0,
      },
      switchBase: {
        padding: '3px',
        color: defaultTheme.palette.common.white,
        '&$checked': {
          transform: 'translateX(1em)',
          '& + $track': {
            backgroundColor: defaultTheme.palette.secondary.dark,
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
        backgroundColor: defaultTheme.palette.common.white,
        color: defaultTheme.palette.secondary.main,
        fontSize: 12,
        border: `1px solid ${defaultTheme.palette.secondary.main}`,
        borderRadius: 0,
      },
    },
    MuiDialog: {
      root: {
        fontFamily: '"FiraSansCondensed", "Roboto", "Helvetica", "Arial", sans-serif',
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
