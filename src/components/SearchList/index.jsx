import { Button, createStyles, FormControl, Grid, makeStyles, Select, Typography } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import useConfig from '../../hooks/useConfig';
import CustomPaginationActionsTable from './Table';

const useStyles = makeStyles(() => createStyles({
  root: {
    marginTop: '1vh',
    height: '10vh',
  },
  dropDownLabel: {
    marginRight: '10px',
    display: 'inline',
    fontWeight: '900',
  },
  innerSelect: {
    width: '20%',
    border: '2px solid black',
    borderRadius: '5%',
    '& div': {
      paddingLeft: '5px',
    },
  },
  innerGrid: {
    height: '100%',
    marginTop: '5px',
  },
  selection: {
    width: 'auto',
    display: 'inline',
    '& :before': {
      content: 'none',
    },
  },
  dataButton: {
    width: 'auto',
    textTransform: 'none',
    background: '#284162',
    borderRadius: '5px',
    color: 'white',
    whiteSpace: 'nowrap',
    padding: '15px',
    '& span': {
      margin: '10px 10px',
    },
  },
}));

const ListSection = ({ onChange }) => {
  const { config } = useConfig();
  const classes = useStyles();
  const intl = useIntl();

  return (
    <>
      <Grid container justify="space-between" alignItems="center" className={classes.root}>
        <Grid item xs={6} className={classes.innerGrid}>
          <Typography variant="body1" className={classes.dropDownLabel}>Sort by data type</Typography>
          <FormControl className={classes.selection}>
            <Select value={config.sort || ''} onChange={onChange} className={classes.innerSelect}>
              <option style={{ paddingLeft: '5px' }} value="TABLE">{intl.formatMessage({ id: 'common.table' })}</option>
              <option style={{ paddingLeft: '5px' }} value="FIGURE">{intl.formatMessage({ id: 'common.figure' })}</option>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} className={classes.innerGrid} style={{ textAlign: 'right' }}>
          <Button className={classes.dataButton}>
            Access full dataset
          </Button>
        </Grid>
      </Grid>
      {/* Table Section */}
      <CustomPaginationActionsTable />
    </>
  );
};

export default ListSection;

ListSection.propTypes = {
  onChange: PropTypes.func.isRequired,
};
