import { Grid, Icon, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import React, { useMemo, useState } from 'react';
import { useIntl } from 'react-intl';

import useConfig from '../../hooks/useConfig';
import useESAData from '../../hooks/useESAData';
import figureIcon from '../../images/figure.svg';
import tableIcon from '../../images/table.svg';
import { reportContent } from '../../utilities/analytics';
import ListDialog from './ListDialog';
import PaginationBar from './PaginationBar';

const useStyles = makeStyles((theme) => ({
  tableHeader: {
    borderBottom: '1px solid black',
    '& p': {
      marginTop: '5px',
    },
    '& span': {
      fontWeight: '900',
    },
    '& h6': {
      textTransform: 'uppercase',
      textDecoration: 'underline',
      fontWeight: 'normal',
      color: '#434343',
      display: 'inline',
      cursor: 'pointer',
    },
    '& img': {
      height: '70%',
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
  iconCaption: {
    margin: '5px 2px 0 0',
    padding: '2px 6px',
    display: 'block',
    textTransform: 'uppercase',
    width: 'max-content',
    float: 'right',
    backgroundColor: theme.palette.blue.light,
    fontWeight: '900',
  },
}));

const SearchList = () => {
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

  const handleClickOpen = (content) => {
    reportContent(
      config.regions,
      config.commodities,
      config.projectTypes,
      config.statuses,
      content.application.name,
      content.title,
    );
    setOpen(true);
    setSelectedLineData(content);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ListDialog open={open} handleClose={handleClose} data={selectedLineData} />

      <TableContainer component={Paper} className={classes.tableParent}>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableBody>
            {contents.map((content) => (
              <TableRow key={content.id}>
                <TableCell component="th" scope="row" className={classes.tableHeader}>

                  <Grid container>
                    <Grid item xs={11}>
                      <Typography variant="h6" style={{ display: 'inline' }} onClick={() => handleClickOpen(content)}>
                        {content.title}
                      </Typography>
                    </Grid>
                    <Grid item container direction="column" spacing={0} xs={1} style={{ textAlign: 'right' }}>
                      <Grid item>
                        <Icon>
                          <img
                            src={content.type === 'FIGURE' ? figureIcon : tableIcon}
                            alt={content.type === 'FIGURE' ? 'figure icon' : 'table icon'}
                          />
                        </Icon>
                        <Typography variant="caption" component="p" className={classes.iconCaption}>
                          {content.type === 'FIGURE' ? intl.formatMessage({ id: 'common.content.FIGURE' }) : intl.formatMessage({ id: 'common.content.TABLE' })}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Typography variant="body2">
                    <span>{`${intl.formatMessage({ id: 'common.fullProjectName' })}: `}</span>
                    {content.application.name}
                  </Typography>
                  <Typography variant="body2">
                    <span>{`${intl.formatMessage({ id: 'components.resultsList.titles.filedDate' })}: `}</span>
                    {content.application.filingDate.substring(0, 10)}
                  </Typography>
                  <Typography variant="body2">
                    <span>{`${intl.formatMessage({ id: 'common.consultants' })}: `}</span>
                    {content.application.consultants}
                  </Typography>

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
export default SearchList;
