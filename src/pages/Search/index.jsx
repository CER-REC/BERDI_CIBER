import { Button, createStyles, FormControl, Grid, makeStyles, NativeSelect, Typography } from '@material-ui/core';
import EcoIcon from '@material-ui/icons/Eco';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import PetsIcon from '@material-ui/icons/Pets';
import PoolIcon from '@material-ui/icons/Pool';
import React from 'react';
import { useIntl } from 'react-intl';
import TreeMapPanel from '../../components/TreeMapPanel/Treemap';
import useAPI from '../../hooks/useAPI';
import FilterPanel from './FilterPanel';
import CustomPaginationActionsTable from './Table';

const useStyles = makeStyles(() => createStyles({
  searchBox: {
    height: '20vh',
    backgroundColor: '#63b440',
    '& p': {
      marginTop: '5px',
      fontSize: '25px',
    },
  },
  filterBox: {
    height: '20vh',
    backgroundColor: '#e5e5e5',
  },
  selection: {
    width: '20vw',
  },
  searchIcon: {
    '& svg': {
      width: '7vh',
      height: '7vh',
      margin: '1vw',
    },
  },

}));

const Search = () => {
  const classes = useStyles();
  const intl = useIntl();

  const { data: configData } = useAPI();

  if (!configData) {
    return null;
  }

  return (
    <>
      {/* green search box */}
      <Typography variant="h2">{intl.formatMessage({ id: 'components.searchPanel.title' })}</Typography>
      <Grid
        container
        className={classes.searchBox}
      >
        <Grid direction="column" container item xs={6}>
          <input style={{ marginTop: '10px', marginLeft: '10px', width: '12vw' }} placeholder={intl.formatMessage({ id: 'components.searchPanel.inputPlaceholder' })} />
          <Grid container item className={classes.searchIcon} wrap="nowrap">
            <PetsIcon />
            <PoolIcon />
            <EcoIcon />
            <HomeWorkIcon />
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Typography>
            {intl.formatMessage({ id: 'components.searchPanel.description' })}
            <a href={intl.formatMessage({ id: 'components.searchPanel.link1' })}>{` ${intl.formatMessage({ id: 'components.searchPanel.linkText1' })}`}</a>
          </Typography>
          <Typography><a href={intl.formatMessage({ id: 'components.searchPanel.link2' })}>{intl.formatMessage({ id: 'components.searchPanel.linkText2' })}</a></Typography>
        </Grid>
      </Grid>

      {/* Grey filter selection box */}
      <FilterPanel data={configData.configuration} />

      {/* TreeMap Section */}
      <TreeMapPanel />

      {/* List section */}
      <Grid container justify="space-between" alignItems="center" style={{ backgroundColor: '#e5e5e5', marginTop: '1vh', height: '5vh' }}>
        <Grid item>
          <Grid container style={{ paddingRight: '3px' }}>
            <Typography variant="body1" style={{ marginRight: '3px' }}>Sort by data type</Typography>
            <FormControl className={classes.selection}>
              <NativeSelect>
                <option value="all">Table</option>
                <option value={10}>Figure</option>
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

export default Search;
