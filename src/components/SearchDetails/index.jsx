import { Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';
import useConfig from '../../hooks/useConfig';
import useESAData from '../../hooks/useESAData';
import FilterToggle from './FilterToggle';
import NoResultsStatusMessages from './NoResultsStatusMessages';
import { lang } from '../../constants';

const useStyles = makeStyles({
  counts: {
    fontWeight: 'normal',
  },
  bold: {
    fontWeight: '700',
  },
  filterText: {
    fontWeight: '400',
    paddingBottom: '0.5em',
    paddingTop: '0.8em',
  },
});

const SearchDetails = () => {
  const classes = useStyles();
  const intl = useIntl();
  const { applications, loading } = useESAData();
  const { config: { filter } } = useConfig();

  const figureCount = applications.reduce(
    (count, application) => (application.figureCount + count),
    0,
  );

  const tableCount = applications.reduce(
    (count, application) => (application.tableCount + count),
    0,
  );

  const alignmentSheetCount = applications.reduce(
    (count, application) => (application.alignmentSheetCount + count),
    0,
  );

  return (
    <div style={{ paddingLeft: '0.3em' }}>
      <Grid container justify="space-between" style={{ padding: '1em 0 0.5em' }}>
        <Typography variant="body2" className={classes.bold}>
          {intl.formatMessage({ id: 'components.searchDetails.title' }).toUpperCase()}
        </Typography>
        <Typography variant="body2" className={classes.bold}>
          {intl.formatMessage({ id: 'components.searchDetails.explore' }).toUpperCase()}
        </Typography>
      </Grid>

      <Grid container justify={loading ? 'flex-end' : 'space-between'}>
        {(
          !loading && (
            (applications.length && (
              <div>
                <Typography variant="h6" className={classes.counts}>
                  {intl.formatMessage({ id: 'components.searchDetails.counts' }, {
                    tables: tableCount,
                    figures: figureCount,
                    alignmentSheets: alignmentSheetCount,
                    total: tableCount + figureCount + alignmentSheetCount,
                    boldTables: (<span className={classes.bold}>{`${tableCount.toLocaleString()}`}</span>),
                    boldFigures: (<span className={classes.bold}>{`${figureCount.toLocaleString()}`}</span>),
                    boldAlignmentSheets: (<span className={classes.bold}>{`${alignmentSheetCount.toLocaleString()}`}</span>),
                  })}
                </Typography>
                {lang === 'fr' && <Typography classes={{ root: classes.subtitle }}>{intl.formatMessage({ id: 'common.frenchDisclaimerShort' })}</Typography>}
              </div>
            )) || <NoResultsStatusMessages />
          )
        )}
        <FilterToggle />
      </Grid>

      {filter === 'topic' && (
        <Typography variant="h6" className={classes.filterText}>
          {intl.formatMessage({ id: 'components.searchDetails.select' })}
        </Typography>
      )}
    </div>
  );
};

export default SearchDetails;
