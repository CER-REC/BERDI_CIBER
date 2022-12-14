export default (theme) => ({
  tableHeader: {
    padding: '0.4em 0.4em 0.4em 0',
    '& .tableCellInner': {
      padding: '1em 1em 1em 0',
      boxShadow: '2px 2px 4px rgba(131,131,131,0.25)',
    },
  },
  tableHeaderNotice: {
    '& .tableCellInner': {
      ...theme.mixins.noticeAccent,
    },
  },
  tableParent: {
    boxShadow: 'none',
  },
  imageSection: {
    cursor: 'pointer',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    maxHeight: '7em',
    width: '95%',
    '& div': {
      marginRight: '1em',
    },
  },
  details: {
    '& tr': {
      color: theme.palette.grey.dark,
    },
    '& tr:nth-of-type(3)': {
      '& td': { paddingBottom: '1em' },
    },
    '& td': {
      paddingRight: '1em',
    },
    '& a': {
      paddingRight: '0.5em',
    },
  },
  projectButton: {
    minWidth: 'auto',
    marginRight: '1em',
  },
});
