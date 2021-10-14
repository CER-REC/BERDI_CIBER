import { Grid, Typography } from '@material-ui/core';
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
import { lang } from '../../../constants';
import useConfig from '../../../hooks/useConfig';
import useESAData from '../../../hooks/useESAData';
import magnifyingGlass from '../../../images/listPanel/magnifyingGlass.svg';
import { reportContent } from '../../../utilities/analytics';
import ResultDialog from '../../ResultDialog';
import PaginationBar from '../PaginationBar';
import CartButton from '../../CartButton';
import styles from './styles';
import TitleSection from './TitleSection';
import ViewMoreDetailsButton from '../../ViewMoreDetailsButton';
import RelatedTopics from '../RelatedTopics';
import EllipsisButton from '../EllipsisButton';

const getJustify = (content) => (content.type === 'TABLE' ? 'space-between' : 'flex-end');
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

  const createTableRow = (data, title) => (
    <tr>
      <td style={{ whiteSpace: 'nowrap' }}>
        <Typography style={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
      </td>
      <td>
        <Typography>
          {data}
        </Typography>
      </td>
    </tr>
  );

  return (
    <>
      <ResultDialog open={open} onClose={handleClose} data={selectedLineData} />
      <TableContainer component={Paper} className={classes.tableParent}>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableBody>
            {contents.map((content) => (
              <TableRow key={content.id} aria-label="content card">
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
                      style={{ backgroundImage: `url(${content.thumbnailURL})` }}
                    >
                      <Grid item>
                        <img alt="A magnifying glass" src={magnifyingGlass} />
                      </Grid>
                    </Grid>

                    <Grid item xs={7} md={8} xl={9} style={{ paddingLeft: '1em' }}>
                      <TitleSection
                        title={content.title}
                        content={content}
                        handleClickOpen={handleClickOpen}
                        setExpandedTitles={setExpandedTitles}
                        expandedTitles={expandedTitles}
                      />

                      <table className={classes.details}>
                        <tbody>
                          {createTableRow(content.application.name, intl.formatMessage({ id: 'components.listPanel.projectName' }))}
                          {createTableRow(content.application.companyName, intl.formatMessage({ id: 'components.listPanel.company' }))}
                          {
                            (expandList.includes(content.id)) && (
                            <>
                              {createTableRow(content.application.consultants, intl.formatMessage({ id: 'components.listPanel.esaConsultant' }))}
                              {createTableRow(new Date(content.application.filingDate).toLocaleDateString(`${lang}-CA`, { year: 'numeric', month: 'long', day: 'numeric' }), intl.formatMessage({ id: 'components.listPanel.projectFiled' }))}
                              {createTableRow(intl.formatMessage({ id: `api.statuses.${content.application.status}` }), intl.formatMessage({ id: 'components.listPanel.projectStatus' }))}
                              {createTableRow(intl.formatMessage({ id: `api.projects.${content.application.type}` }), intl.formatMessage({ id: 'components.listPanel.projectType' }))}
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
                                    <a href={content.application.applicationURL}>{intl.formatMessage({ id: 'components.listPanel.projectFolder' })}</a>
                                    <a href={content.esaFolderURL}>{intl.formatMessage({ id: 'components.listPanel.esaFolder' })}</a>
                                    {(content.application.finalDecisionURL
                                    && content.application.finalDecisionURL.toLowerCase() !== 'pending')
                                    && <a href={content.esaFolderURL}>{intl.formatMessage({ id: 'components.listPanel.finalDecision' })}</a>}
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

                    <Grid container item direction="column" alignItems="flex-end" justify={getJustify(content)} xs={2}>
                      <CartButton data={content} />
                      <Grid item>
                        <EllipsisButton downloadURL={content.url} title={content.title} />
                      </Grid>
                    </Grid>

                    {/* This section only renders if the content id is in the expanded list */}
                    {(expandList.includes(content.id)) && (
                    <RelatedTopics valueComponents={content.valueComponent} type={content.type} />
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
