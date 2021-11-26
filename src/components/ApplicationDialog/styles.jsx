export default (theme) => ({
  counts: {
    padding: '0 20px',
    '& span': { fontWeight: 900 },
  },
  figures: {
    fontStyle: 'italic',
    color: '#A0A4A5',
  },
  folderLink: {
    '&:not(:hover):not(:visited)': { color: theme.palette.blue.dark },
    '&:hover': { textDecoration: 'underline' },
  },
  footer: {
    backgroundColor: theme.palette.dialog.footer,
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
  icon: {
    overflow: 'visible',
    marginRight: '5px',
    '& img': { verticalAlign: 'text-top' },
  },
  left: {
    margin: '20px 0',
    padding: '0 20px',
    '& p > span': { fontWeight: 900 },
    '& p': { padding: '4px 0' },
    '& h5': {
      textTransform: 'uppercase',
      padding: '1em 0 0.7em 0',
    },
  },
  right: {
    textAlign: 'right',
    '& button': { fill: 'black' },
  },
  statusIndicator: {
    fontWeight: '700',
    border: '1px solid #A0A4A5',
    borderRadius: '5%',
    color: '#A0A4A5',
    margin: '1em',
    padding: '2px 10px',
    whiteSpace: 'nowrap',
  },
});
