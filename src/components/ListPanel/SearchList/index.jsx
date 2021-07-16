import { Grid, Typography, ButtonBase } from '@material-ui/core';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import React, { useMemo, useState } from 'react';
import { useIntl } from 'react-intl';

import useConfig from '../../../hooks/useConfig';
import useESAData from '../../../hooks/useESAData';
import { reportContent } from '../../../utilities/analytics';
import ResultDialog from '../../ResultDialog';
import PaginationBar from '../PaginationBar';
import PlaceHolderImage from '../../../images/ListPanel/PlaceHolder.svg';
import EllipseIcon from '../../../images/ListPanel/Ellipse.svg';
import DownCaret from '../../../images/ListPanel/DownCaret.svg';
import UpCaret from '../../../images/ListPanel/UpCaret.svg';
import MagnifyingGlass from '../../../images/ListPanel/MagnifyingGlass.svg';
import ShelfButton from '../ShelfButton';

const useStyles = makeStyles((theme) => ({
  tableHeader: {
    padding: '0.4em 0.4em 0.4em 0',
    '& p': {
      marginTop: '5px',
    },
    '& span': {
      fontWeight: '900',
    },
    '& h6': {
      textTransform: 'uppercase',
      fontWeight: 'normal',
      color: '#434343',
      display: 'inline',
      cursor: 'pointer',
      marginBottom: '1em',
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
  pagination: {
    '& .MuiTablePagination-caption': {
      display: 'none',
    },
  },
  seeMoreButton: {
    color: theme.palette.blue.dark,
    fontWeight: '900',
    fontFamily: theme.typography.fontFamily,
    verticalAlign: 'unset',
    paddingLeft: '1em',
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
}));

const SearchList = ({ toggleExpand, expandList }) => {
  const classes = useStyles();
  const intl = useIntl();
  const { config } = useConfig();
  const { contents, totalCount } = useESAData();
  const pageNumber = useMemo(
    () => (totalCount ? config.searchIndex : 0),
    [totalCount, config.searchIndex],
  );

  const [open, setOpen] = useState(false);
  const [selectedLineData, setSelectedLineData] = useState(null);
  const [expandedTitles, setExpandedTitles] = useState([]);

  const handleClickOpen = (content) => {
    reportContent(content.title);
    setOpen(true);
    setSelectedLineData(content);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const mockTopics = [
    'Physical and meteorological environment',
    'Lorem ipsum dolor sit amet.',
    'Lorem ipsum dolor sit amet.1',
    'Lorem ipsum dolor sit amet.2 longer version of a link lorem ipsum dolor sit amet',
    'Lorem ipsum dolor sit amet.3',
    'Lorem ipsum dolor sit amet.4',
    'Lorem ipsum dolor sit amet.5',
    'Lorem ipsum dolor sit amet.6',
    'Lorem ipsum dolor sit amet.7',
    'Lorem ipsum dolor sit amet.8',
  ];

  // TODO: make this a more generic function to be used whenever a see more button is needed.
  const createTitleSection = (title, content) => {
    if (title.length < 150) {
      return (
        <Typography variant="h6" style={{ display: 'inline' }} onClick={() => handleClickOpen(content)}>
          {title}
        </Typography>
      );
    }

    if (title.length >= 150 && expandedTitles.find((entry) => entry === title)) {
      return (
        <>
          <Typography variant="h6" style={{ display: 'inline' }} onClick={() => handleClickOpen(content)}>
            {title}
          </Typography>
          <ButtonBase
            className={classes.seeMoreButton}
            onClick={() => setExpandedTitles((list) => [...list.filter((item) => item !== title)])}
          >
            {intl.formatMessage({ id: 'components.resultDialog.seeLess' })}
          </ButtonBase>
        </>
      );
    }
    return (
      <>
        <Typography variant="h6" style={{ display: 'inline' }} onClick={() => handleClickOpen(content)}>
          {title.substring(0, 150).concat('...')}
        </Typography>
        <ButtonBase
          className={classes.seeMoreButton}
          onClick={() => setExpandedTitles((list) => [...list, title])}
        >
          {intl.formatMessage({ id: 'components.resultDialog.seeMore' })}
        </ButtonBase>
      </>
    );
  };

  const createSeeMoreSection = (content) => {
    if (expandList.find((entry) => entry === content.id)) {
      // expanded already
      return (
        <ButtonBase className={classes.viewMoreDetails} onClick={() => toggleExpand(content.id)}>
          <span>{intl.formatMessage({ id: 'components.listPanel.seeFewer' })}</span>
          <img alt="Up caret" src={UpCaret} />
        </ButtonBase>
      );
    }
    return (
      <ButtonBase className={classes.viewMoreDetails} onClick={() => toggleExpand(content.id)}>
        <span>{intl.formatMessage({ id: 'components.listPanel.seeMore' })}</span>
        <img alt="Down caret" src={DownCaret} />
      </ButtonBase>
    );
  };

  return (
    <>
      <ResultDialog open={open} onClose={handleClose} data={selectedLineData} />
      <TableContainer component={Paper} className={classes.tableParent}>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableBody>
            {contents.map((content) => (
              <TableRow key={content.id}>
                <TableCell component="th" scope="row" className={classes.tableHeader}>
                  <Grid className="tableCellInner" container>
                    <Grid
                      item
                      container
                      alignItems="flex-end"
                      justify="flex-end"
                      xs={3}
                      md={2}
                      xl={1}
                      onClick={() => handleClickOpen(content)}
                      className={classes.imageSection}
                    >
                      <Grid item>
                        <img alt="A magnifying glass" src={MagnifyingGlass} />
                      </Grid>
                    </Grid>

                    <Grid item xs={7} md={8} xl={9} style={{ paddingLeft: '1em' }}>
                      {createTitleSection(content.title, content)}
                      <Typography variant="body2">
                        <span>{intl.formatMessage({ id: 'common.fullProjectName' })}</span>
                        {content.application.name}
                      </Typography>

                      <Typography variant="body2">
                        <span>{intl.formatMessage({ id: 'common.companyName' })}</span>
                        {content.application.companyName}
                      </Typography>
                      {(expandList.find((entry) => entry === content.id)) && (
                      <>
                        <br />
                        <Typography variant="body2">
                          <span>{intl.formatMessage({ id: 'components.listPanel.projectFiled' })}</span>
                          {content.application.filingDate}
                        </Typography>
                        <Typography variant="body2">
                          <span>{intl.formatMessage({ id: 'components.listPanel.projectStatus' })}</span>
                          {content.application.status}
                        </Typography>
                        <Typography variant="body2">
                          <span>{intl.formatMessage({ id: 'components.listPanel.projectType' })}</span>
                          {content.application.type}
                        </Typography>
                        <Typography variant="body2">
                          <span>{intl.formatMessage({ id: 'common.commodity' })}</span>
                          {content.application.commodity}
                        </Typography>
                        <Typography variant="body2">
                          <span>{intl.formatMessage({ id: 'common.hearingOrder' })}</span>
                          {content.application.hearingOrder}
                        </Typography>
                        <Typography variant="body2">
                          <span>{intl.formatMessage({ id: 'components.listPanel.projectLinks' })}</span>
                          <a href="google.com">Link 1</a>
                          {' '}
                          <a href="google.com">Link 2</a>
                          {' '}
                          <a href="google.com">Link 3</a>
                        </Typography>
                      </>
                      )}

                      {createSeeMoreSection(content)}
                    </Grid>

                    <Grid container item direction="column" alignItems="flex-end" justify="space-between" xs={2}>
                      <ShelfButton />
                      <Grid item style={{ paddingRight: '1em', marginBottom: '1em' }}>
                        <ButtonBase>
                          <img alt="Ellipse" src={EllipseIcon} />
                        </ButtonBase>
                      </Grid>
                    </Grid>

                    {(expandList.find((entry) => entry === content.id)) && (
                    <div style={{ backgroundColor: '#F4F4F4', width: '100%', padding: '1em 3em' }}>

                      <Typography>
                        Related Topics
                      </Typography>

                      <Grid container justify="flex-start" alignItems="center">
                        {mockTopics.map((topic) => (
                          <Grid item key={topic} style={{ padding: '0 3em 1em 0', overflowWrap: 'break-word', maxWidth: '30em' }}>
                            <a href="google.com"><Typography>{topic}</Typography></a>
                          </Grid>
                        ))}

                      </Grid>

                    </div>
                    )}
                  </Grid>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <PaginationBar
        count={totalCount}
        page={pageNumber}
      />
    </>
  );
};

SearchList.propTypes = {
  expandList: PropTypes.arrayOf(PropTypes.string).isRequired,
  toggleExpand: PropTypes.func.isRequired,
};
export default SearchList;
