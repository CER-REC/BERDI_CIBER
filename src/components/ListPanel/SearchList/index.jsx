import { Button, Grid, Typography } from '@material-ui/core';
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
import clsx from 'clsx';
import { lang } from '../../../constants';
import useConfig from '../../../hooks/useConfig';
import useESAData from '../../../hooks/useESAData';
import useGetFullRegions from '../../../hooks/useGetFullRegions';
import { reportContent, reportProject } from '../../../utilities/analytics';
import getProjectTypeLabel from '../../../utilities/getProjectTypeLabel';
import DropDown from '../../Dropdown';
import ResultDialog from '../../ResultDialog';
import ViewMoreDetailsButton from '../../ViewMoreDetailsButton';
import PaginationBar from '../PaginationBar';
import RelatedTopics from '../RelatedTopics';
import styles from './styles';
import TitleSection from '../TitleSection';
import ApplicationDialog from '../../ApplicationDialog';
import ThumbnailButton from '../../ThumbnailButton';
import SearchActionResults from '../../SearchActionResults';
import NoticeSection from '../../NoticeSection';

const useStyles = makeStyles(styles);

const SearchList = ({ toggleExpand, expandList }) => {
  const classes = useStyles();
  const intl = useIntl();
  const { config, configDispatch } = useConfig();
  const { contents, ids } = useESAData();
  const getFullRegions = useGetFullRegions();
  const pageNumber = useMemo(
    () => (ids.length ? config.searchIndex : 0),
    [ids.length, config.searchIndex],
  );
  const resultCountOptions = ['10', '25', '50', '100'];

  const [open, setOpen] = useState(false);
  const [selectedLineData, setSelectedLineData] = useState(null);
  const [expandedTitles, setExpandedTitles] = useState([]);
  const [projectData, setProjectData] = useState();

  const handleClickOpen = (content) => {
    reportContent(content.title);
    setOpen(true);
    setSelectedLineData(content);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleResultCountChange = (items) => {
    configDispatch({ type: 'resultCount/changed', payload: items[1] });
  };

  const handleProjectClick = (data) => {
    setProjectData(data);
    reportProject(data.shortName);
  };

  const createTableTitle = (title) => (
    <td style={{ whiteSpace: 'nowrap' }}>
      <Typography style={{ fontWeight: 'bold' }}>
        {title}
      </Typography>
    </td>
  );

  const createTableProjectRow = (data, title) => (
    <tr>
      {createTableTitle(title)}
      <td>
        <Button
          className={classes.projectButton}
          color="inherit"
          onClick={() => handleProjectClick(data)}
          disableRipple
        >
          <Typography>{data.shortName}</Typography>
        </Button>
      </td>
    </tr>
  );

  const createTableRow = (data, title) => (
    <tr>
      {createTableTitle(title)}
      <td>
        <Typography>
          {data}
        </Typography>
      </td>
    </tr>
  );

  const handleTitleChange = (title) => {
    if (expandedTitles.includes(title)) {
      setExpandedTitles(expandedTitles.filter((expandedTitle) => expandedTitle !== title));
    } else {
      setExpandedTitles([...expandedTitles, title]);
    }
  };

  return (
    <>
      <ResultDialog open={open} onClose={handleClose} data={selectedLineData} />
      <ApplicationDialog data={projectData} onClose={() => setProjectData(null)} />
      <TableContainer component={Paper} className={classes.tableParent}>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableBody>
            {contents.map((content) => (
              <TableRow key={content.id} aria-label="content card">
                <TableCell component="th" scope="row" className={clsx(classes.tableHeader, { [classes.tableHeaderNotice]: content.hasNotification })}>
                  <Grid className="tableCellInner" container>
                    <Grid item xs={3} md={2} xl={1}>
                      <ThumbnailButton
                        ariaText={intl.formatMessage({ id: 'components.listPanel.previewAriaText' }, { title: content.title })}
                        src={content.thumbnailURL}
                        onClick={() => handleClickOpen(content)}
                      />
                    </Grid>
                    <Grid item xs={7} md={8} xl={9} style={{ paddingLeft: '1em' }}>
                      { content.hasNotification && (
                        <NoticeSection />
                      )}
                      <TitleSection
                        title={content.title}
                        onClick={() => handleClickOpen(content)}
                        onChange={() => handleTitleChange(content.title)}
                        isExpanded={expandedTitles.includes(content.title)}
                      />

                      <table className={classes.details}>
                        <tbody>
                          {createTableProjectRow(content.application, intl.formatMessage({ id: 'common.projectName' }))}
                          {createTableRow(content.application.companyName, intl.formatMessage({ id: 'common.company' }))}
                          {createTableRow(getFullRegions(content.application.regions), intl.formatMessage({ id: 'common.region' }))}
                          {
                            (expandList.includes(content.id)) && (
                              <>
                                {createTableRow(content.application.consultants, intl.formatMessage({ id: 'components.listPanel.esaConsultant' }))}
                                {createTableRow(new Date(content.application.filingDate).toLocaleDateString(`${lang}-CA`, { year: 'numeric', month: 'long', day: 'numeric' }), intl.formatMessage({ id: 'components.listPanel.projectFiled' }))}
                                {createTableRow(intl.formatMessage({ id: `api.statuses.${content.application.status}` }), intl.formatMessage({ id: 'components.listPanel.projectStatus' }))}
                                {createTableRow(intl.formatMessage({ id: getProjectTypeLabel(content.application.type, new Date(content.application.filingDate)) }), intl.formatMessage({ id: 'components.listPanel.projectType' }))}
                                {createTableRow(intl.formatMessage({ id: `api.commodities.${content.application.commodity}` }), intl.formatMessage({ id: 'common.commodity' }))}
                                {createTableRow(content.application.hearingOrder, intl.formatMessage({ id: 'common.hearingOrder' }))}
                                <tr>
                                  <td>
                                    <Typography style={{ fontWeight: 'bold' }}>
                                      {intl.formatMessage({ id: 'components.listPanel.projectLinks' })}
                                    </Typography>
                                  </td>
                                  <td>
                                    <Typography>
                                      <a target="_blank" rel="noopener noreferrer" href={content.application.applicationURL}>{intl.formatMessage({ id: 'components.listPanel.projectFolder' })}</a>
                                      <a target="_blank" rel="noopener noreferrer" href={content.esaFolderURL}>{intl.formatMessage({ id: 'components.listPanel.esaFolder' })}</a>
                                      {(content.application.finalDecisionURL
                                        && content.application.finalDecisionURL.toLowerCase() !== 'pending')
                                        && <a target="_blank" rel="noopener noreferrer" href={content.application.finalDecisionURL}>{intl.formatMessage({ id: 'components.listPanel.finalDecision' })}</a>}
                                    </Typography>
                                  </td>
                                </tr>
                              </>
                            )
                          }
                        </tbody>
                      </table>

                      <ViewMoreDetailsButton
                        expandList={expandList}
                        content={content}
                        toggleExpand={toggleExpand}
                      />
                    </Grid>

                    <Grid item xs={2}>
                      <SearchActionResults content={content} />
                    </Grid>

                    {/* This section only renders if the content id is in the expanded list */}
                    {expandList.includes(content.id) && (
                      <RelatedTopics
                        valueComponents={content.valueComponent}
                        type={content.type}
                      />
                    )}
                  </Grid>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ maxWidth: '18%', paddingTop: '1em' }}>
        <DropDown
          type="resultCount"
          hasHelp={false}
          options={resultCountOptions}
          value={[config.resultCount.toString()]}
          onChange={handleResultCountChange}
        />
      </div>
      <PaginationBar
        count={ids.length}
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
