import PlaceHolderImage from '../../../images/listPanel/placeHolder.svg';

export default (theme) => ({
  tableHeader: {
    padding: '0.4em 0.4em 0.4em 0',
    '& h6': {
      fontWeight: 'normal',
      color: '#434343',
      cursor: 'pointer',
    },
    '& .tableCellInner': {
      padding: '1em 1em 1em 0',
      boxShadow: '2px 2px 4px rgba(131,131,131,0.25)',
      '& img': {
        cursor: 'pointer',
      },
    },
  },
  tableParent: {
    boxShadow: 'none',
  },
  viewMoreDetails: {
    color: theme.palette.blue.dark,
    fontWeight: 'bold',
    marginTop: '1em',
  },
  imageSection: {
    cursor: 'pointer',
    backgroundImage: `url(${PlaceHolderImage})`,
    backgroundSize: 'cover',
    maxHeight: '7em',
    width: '95%',
    '& div': {
      marginRight: '1em',
    },
  },
  ellipseButton: {
    paddingRight: '1em',
    marginBottom: '1em',
  },
  relatedTopicsContainer: {
    backgroundColor: '#F4F4F4',
    width: '100%',
    padding: '1em 3em',
  },
  relatedTopics: {
    padding: '0 3em 1em 0',
    overflowWrap: 'break-word',
    maxWidth: '30em',
  },
  details: {
    '& tr': {
      color: '#616060',
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
});
