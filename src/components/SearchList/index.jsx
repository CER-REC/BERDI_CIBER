import { Button, createStyles, FormControl, Grid, makeStyles, NativeSelect, Typography } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import useConfig from '../../hooks/useConfig';
import CustomPaginationActionsTable from './Table';

const useStyles = makeStyles(() => createStyles({

  selection: {
    width: '20vw',
  },

}));

const ListSection = ({ onChange }) => {
  const { config } = useConfig();
  const classes = useStyles();

  return (
    <>
      <Grid container justify="space-between" alignItems="center" style={{ backgroundColor: '#e5e5e5', marginTop: '1vh', height: '5vh' }}>
        <Grid item>
          <Grid container style={{ paddingRight: '3px' }}>
            <Typography variant="body1" style={{ marginRight: '3px' }}>Sort by data type</Typography>
            <FormControl className={classes.selection}>
              <NativeSelect value={config.sort || ''} onChange={onChange}>
                <option value="TABLE">Table</option>
                <option value="FIGURE">Figure</option>
              </NativeSelect>
            </FormControl>
          </Grid>
        </Grid>
        <Grid item style={{ textAlign: 'right' }}>
          <Button style={{
            width: 'auto',
            textTransform: 'none',
            background: '#284162',
            borderRadius: '5px',
            color: 'white',
            padding: '0.5% 2%',
            whiteSpace: 'nowrap',
          }}
          >
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
