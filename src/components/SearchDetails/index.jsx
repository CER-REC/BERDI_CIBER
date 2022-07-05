import { Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';
import useESAData from '../../hooks/useESAData';
import NoResultsStatusMessages from './NoResultsStatusMessages';
import { lang } from '../../constants';

const useStyles = makeStyles({
  normalFontWeight: {
    fontWeight: 'normal',
    fontSize: '20px',
  },
  bold: {
    fontWeight: '700',
  },
});

const SearchDetails = () => {
  const classes = useStyles();
  const intl = useIntl();
  const { applications, loading } = useESAData();

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
    <div>
      <Typography variant="subtitle1">
        {intl.formatMessage({ id: 'components.searchDetails.title' }).toUpperCase()}
      </Typography>

      <Grid container justify={loading ? 'flex-end' : 'space-between'}>
        {(
          !loading && (
            (applications.length && (
              <div>
                <Typography variant="h6" className={classes.normalFontWeight}>
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
      </Grid>
    </div>
  );
};

export default SearchDetails;
