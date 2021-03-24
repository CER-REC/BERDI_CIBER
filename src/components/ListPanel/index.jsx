import { Button, FormControl, Grid, makeStyles, MenuItem, Select, Typography } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import useConfig from '../../hooks/useConfig';
import SearchList from './SearchList';

const useStyles = makeStyles({
  root: {
    marginTop: '15px',
    height: 'auto',
  },
  option: {
    paddingLeft: '5px',
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

  },
});

const ListSection = ({ onChange }) => {
  const { config } = useConfig();
  const classes = useStyles();
  const intl = useIntl();

  return (
    <>
      <Grid container justify="space-between" alignItems="center" className={classes.root}>
        <Grid item xs={6} className={classes.innerGrid}>

          <Typography variant="body1" className={classes.dropDownLabel}>
            {intl.formatMessage({ id: 'components.resultsList.sortLabel' })}
          </Typography>

          {/* FIXME: Throws warning when selection is made.  */}
          <FormControl className={classes.selection}>
            <Select defaultValue={config.sort || ''} value={config.sort || ''} onChange={onChange} className={classes.innerSelect}>
              <option className={classes.option} value="TABLE">{intl.formatMessage({ id: 'common.content.TABLE' })}</option>
              <option className={classes.option} value="FIGURE">{intl.formatMessage({ id: 'common.content.FIGURE' })}</option>
            </Select>
          </FormControl>

        </Grid>
        <Grid item xs={6} className={classes.innerGrid} style={{ textAlign: 'right' }}>

          <Button className={classes.dataButton}>
            {intl.formatMessage({ id: 'components.resultsList.accessDataButton' })}
          </Button>

        </Grid>
      </Grid>

      <SearchList />
    </>
  );
};

export default ListSection;

ListSection.propTypes = {
  onChange: PropTypes.func.isRequired,
};
