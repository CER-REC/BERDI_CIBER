export default (theme) => ({
  downloadIcon: {
    overflow: 'visible',
    marginRight: '5px',
    '& img': {
      verticalAlign: 'text-top',
    },
  },
  topRight: {
    '& div': {
      textAlign: 'right',
    },
  },
  statusIndicator: {
    fontWeight: '700',
    border: '1px solid #a0a4a5',
    borderRadius: '5%',
    color: '#a0a4a5',
    margin: '5px',
    padding: '2px 10px',
    whiteSpace: 'nowrap',
  },
  dialogFooter: {
    backgroundColor: '#eaf9ff',
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
  dialogHeader: {
    padding: '0px 20px 0 20px',
  },
  dialogContent: {
    margin: '20px 0',
    padding: '0 20px',
    '& p > span': {
      fontWeight: '900',
    },
    '& p': {
      padding: '4px 0',
    },
  },
  countsTitle: {
    fontSize: '36px',
    paddingTop: '0.5em',
  },
  countsText: {
    fontSize: '24px',
    paddingTop: '0.2em',
  },
  labelInner: {
    padding: '14px 0 0 14px',
    width: '100%',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      height: '100%',
      display: 'inline-block',
    },
    '& > span': {
      display: 'inline-block',
      float: 'left',
    },
  },
  labelInnerTitle: {
    fontSize: '130%',
    marginTop: '4px',
  },
  labelInnerCounts: {
    whiteSpace: 'nowrap',
    textTransform: 'lowercase',
  },
  treeMap: {
    // select all Nivo spans but not our custom spans
    '& div:not([class]) > span': {
      display: 'flex',
      flexFlow: 'column wrap',
      height: '100%',
      width: '100%',
    },
    height: '35vh',
  },
  emptyPlaceholder: {
    width: '100%',
  },
  folderLink: {
    color: theme.palette.blue.dark,
    '&:hover, &:visited': { color: theme.palette.blue.dark },
  },
  tooltip: {
    '& p': {
      margin: '0px',
      '&:first-child': { paddingBottom: '1em' },
      '&:not(:first-child)': { textTransform: 'lowercase' },
    },
  },
});
