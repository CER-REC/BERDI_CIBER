import { ButtonBase, Grid, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import useConfig from '../../../hooks/useConfig';
import useESAData from '../../../hooks/useESAData';
import DownCaret from '../../../images/listPanel/downCaret.svg';
import EllipseIcon from '../../../images/listPanel/ellipse.svg';
import MagnifyingGlass from '../../../images/listPanel/magnifyingGlass.svg';
import UpCaret from '../../../images/listPanel/upCaret.svg';
import { reportContent } from '../../../utilities/analytics';
import ResultDialog from '../../ResultDialog';
import PaginationBar from '../PaginationBar';
import ShelfButton from '../ShelfButton';
import styles from './styles';

const useStyles = makeStyles(styles);

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

  // TODO: replace with api generated topics
  const mockTopics = [
    'Physical and meteorological environment',
    'Navigation and navigation safety',
    'Human health and aesthetics',
    'Species at Risk or Species of Special Status and related habitat',
    'Acoustic environment',
    'Rights of Indigenous Peoples',
    'Soil and soil productivity',
    'Wildlife and wildlife habitat',
    'Air emissions',
    'Traditional land and resource use',
  ];

  const projectLinks = [
    { title: 'Link 1', link: 'google.com' },
    { title: 'Link 2', link: 'google.com' },
    { title: 'Link 3', link: 'google.com' },
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

  const createSeeMoreDetailsSection = (content) => {
    if (expandList.find((entry) => entry === content.id)) {
      // expanded already
      return (
        <ButtonBase className={classes.viewMoreDetails} onClick={() => toggleExpand(content.id)}>
          <span>{intl.formatMessage({ id: 'components.listPanel.viewFewer' })}</span>
          <img alt="Up caret" src={UpCaret} />
        </ButtonBase>
      );
    }
    // not expanded
    return (
      <ButtonBase className={classes.viewMoreDetails} onClick={() => toggleExpand(content.id)}>
        <span>{intl.formatMessage({ id: 'components.listPanel.viewMore' })}</span>
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

                      <Grid container>
                        <Grid item style={{ paddingRight: '1em', color: '#616060' }}>
                          <Typography variant="body2">
                            <span>{intl.formatMessage({ id: 'components.listPanel.projectName' })}</span>
                          </Typography>
                          <Typography variant="body2">
                            <span>{intl.formatMessage({ id: 'components.listPanel.company' })}</span>
                          </Typography>

                          {(expandList.find((entry) => entry === content.id)) && (
                          <>
                            <Typography variant="body2">
                              <span>{intl.formatMessage({ id: 'components.listPanel.esaConsultant' })}</span>
                            </Typography>
                            <br />
                            <Typography variant="body2">
                              <span>{intl.formatMessage({ id: 'components.listPanel.projectFiled' })}</span>
                            </Typography>
                            <Typography variant="body2">
                              <span>{intl.formatMessage({ id: 'components.listPanel.projectStatus' })}</span>
                            </Typography>
                            <Typography variant="body2">
                              <span>{intl.formatMessage({ id: 'components.listPanel.projectType' })}</span>
                            </Typography>
                            <Typography variant="body2">
                              <span>{intl.formatMessage({ id: 'common.commodity' })}</span>
                            </Typography>
                            <Typography variant="body2">
                              <span>{intl.formatMessage({ id: 'common.hearingOrder' })}</span>
                            </Typography>
                            <Typography variant="body2">
                              <span>{intl.formatMessage({ id: 'components.listPanel.projectLinks' })}</span>
                            </Typography>
                          </>
                          )}

                        </Grid>
                        <Grid item style={{ color: '#616060' }}>
                          <Typography variant="body2">
                            {content.application.name}
                          </Typography>
                          <Typography variant="body2">
                            {content.application.companyName}
                          </Typography>

                          {(expandList.find((entry) => entry === content.id)) && (
                            <>
                              <Typography variant="body2">
                                {content.application.consultants}
                              </Typography>
                              <br />
                              <Typography variant="body2">
                                {new Date(content.application.filingDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                              </Typography>
                              <Typography variant="body2">
                                {intl.formatMessage({ id: `api.statuses.${content.application.status}` })}
                              </Typography>
                              <Typography variant="body2">
                                {intl.formatMessage({ id: `api.projects.${content.application.type}` })}
                              </Typography>
                              <Typography variant="body2">
                                {intl.formatMessage({ id: `api.commodities.${content.application.commodity}` })}
                              </Typography>
                              <Typography variant="body2">
                                {content.application.hearingOrder}
                              </Typography>
                              <Typography variant="body2" className={classes.projectLinks}>
                                <a href={content.application.applicationURL}>{intl.formatMessage({ id: 'components.listPanel.projectFolder' })}</a>
                                <a href={content.esaFolderURL}>{intl.formatMessage({ id: 'components.listPanel.esaFolder' })}</a>
                                {content.application.finalDecisionURL
                                && <a href={content.esaFolderURL}>{intl.formatMessage({ id: 'components.listPanel.finalDecision' })}</a>}
                              </Typography>
                            </>
                          )}
                        </Grid>
                      </Grid>

                      {createSeeMoreDetailsSection(content)}
                    </Grid>

                    <Grid container item direction="column" alignItems="flex-end" justify="space-between" xs={2}>
                      <ShelfButton />
                      <Grid item className={classes.ellipseButton}>
                        <ButtonBase>
                          <img alt="Ellipse" src={EllipseIcon} />
                        </ButtonBase>
                      </Grid>
                    </Grid>

                    {/* This section only renders if the content id is in the expanded list */}
                    {(expandList.find((entry) => entry === content.id)) && (
                    <div className={classes.relatedTopicsContainer}>
                      <Typography>
                        {intl.formatMessage({ id: 'components.listPanel.relatedTopics' })}
                      </Typography>

                      <Grid container justify="flex-start" alignItems="center">
                        {mockTopics.map((topic) => (
                          <Grid item key={topic} className={classes.relatedTopics}>
                            <a href="https://wikipedia.org"><Typography>{topic}</Typography></a>
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
