import { Grid, Icon, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';
import useConfig from '../../hooks/useConfig';
import useESAData from '../../hooks/useESAData';
import figureIcon from '../../images/figure.svg';
import tableIcon from '../../images/table.svg';
import PaginationBar from './PaginationBar';

const useStyles = makeStyles({
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
      color: '##434343',
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
  table: {
    minWidth: 500,
  },
  iconCaption: {
    marginTop: '5px',
    paddingRight: '12px',
    display: 'block',
  },
});

const SearchList = () => {
  const classes = useStyles();
  const intl = useIntl();
  const { config } = useConfig();
  const { contents, totalCount } = useESAData();
  const pageNumber = useMemo(
    () => (totalCount ? config.searchIndex : 0),
    [totalCount, config.searchIndex],
  );

  return (
    <>
      <TableContainer component={Paper} className={classes.tableParent}>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableBody>
            {contents.map((content) => (
              <TableRow key={content.id}>
                <TableCell component="th" scope="row" className={classes.tableHeader}>

                  <Grid container>
                    <Grid item xs={9}>
                      <Typography variant="h6" style={{ display: 'inline' }}>
                        {content.title}
                      </Typography>
                    </Grid>
                    <Grid item container direction="column" spacing={0} xs={3} style={{ textAlign: 'right' }}>
                      <Grid item>
                        <Icon>
                          <img
                            src={content.type === 'FIGURE' ? figureIcon : tableIcon}
                            alt={content.type === 'FIGURE' ? 'figure icon' : 'table icon'}
                          />
                        </Icon>
                        <Typography variant="caption" className={classes.iconCaption}>
                          {content.type === 'FIGURE' ? intl.formatMessage({ id: 'common.figure' }) : intl.formatMessage({ id: 'common.table' })}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Typography variant="body2">
                    <span>{'Full Project Name: '}</span>
                    {content.application.name}
                  </Typography>
                  <Typography variant="body2">
                    <span>{'Project Filed Date: '}</span>
                    {content.application.filingDate.substring(0, 10)}
                  </Typography>
                  <Typography variant="body2">
                    <span>{'ESA Consultant(s): '}</span>
                    {content.application.consultants}
                  </Typography>
                  { content.url
                  && (
                  <Typography variant="body2">
                    <a href={content.url} target="_blank" rel="noreferrer">{intl.formatMessage({ id: 'common.download' })}</a>
                  </Typography>
                  ) }

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
