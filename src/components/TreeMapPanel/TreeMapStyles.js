export default {
  downloadIcon: {
    overflow: 'visible',
    marginRight: '5px',
    '& img': {
      verticalAlign: 'text-top',
    },
  },
  statusIndicator: {
    fontWeight: '700',
    border: '1px solid #a0a4a5',
    borderRadius: '5%',
    color: '#a0a4a5',
    margin: '1em',
    padding: '2px 10px',
    whiteSpace: 'nowrap',
  },
  footerCounts: {
    padding: '0 20px',
    '& span': {
      fontWeight: '900',
    },
  },
  footerFigures: {
    fontStyle: 'italic',
    color: '#a0a4a5',
  },
  dialogRightSide: {
    textAlign: 'right',
    '& button': {
      fill: 'black',
    },
  },
  dialogLeftSide: {
    margin: '20px 0',
    padding: '0 20px',
    '& p > span': {
      fontWeight: '900',
    },
    '& p': {
      padding: '4px 0',
    },
    '& h5': {
      textTransform: 'uppercase',
      padding: '1em 0 0.7em 0',
    },
  },
  dialogFooter: {
    backgroundColor: '#EAF9FF',
    padding: '10px 20px 10px 0',
    '& button': {
      borderRadius: '5px',
      textTransform: 'none',
    },
    '& a': {
      whiteSpace: 'nowrap',
      textDecoration: 'none',
    },
  },
  titleTypography: {
    padding: '1.5em 0 0.5em 0',
  },
  countsTitle: {
    fontSize: '36px',
    paddingTop: '0.5em',
    fontWeight: '400',
  },
  countsText: {
    fontSize: '24px',
    paddingTop: '0.2em',
    fontWeight: '400',
  },
};
