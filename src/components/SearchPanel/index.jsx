import React from 'react';
import { Grid, Switch, Typography, Divider, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import SearchBar from './SearchBar';
import InlineLogo from './InlineLogo';
import TitleCard from '../TitleCard';
import owlBanner from '../../images/landing/owlBanner.png';

const useStyles = makeStyles((theme) => ({
  imageRoot: {
    backgroundImage: `url(${owlBanner})`,
    backgroundPositionX: 'right',
    backgroundPositionY: 'top',
    backgroundSize: 'cover',
    paddingBottom: '2em',
  },
  gradientRoot: {
    backgroundImage: 'linear-gradient(180deg, #4F5496 0%, #5B3B67 158.06%)',
    borderRadius: '10px',
  },
  searchPanel: {
    padding: '0 1.5em',
    height: '6em',
    color: 'white',
    justifyContent: 'center',
  },
  barContainer: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  },
  divider: {
    background: theme.palette.common.white,
    marginRight: '2.5em',
  },
  sideBlock: {
    margin: 'auto',
    textAlign: 'right',
  },
  filterLabel: {
    display: 'inline-block',
    paddingRight: '0.5em',
    verticalAlign: 'middle',
  },
}));

const SearchPanel = ({ hasFilter, onChange }) => {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <div className={`${hasFilter ? classes.gradientRoot : classes.imageRoot}`}>
      {!hasFilter && (<TitleCard />)}
      <Grid container className={classes.searchPanel} alignItems="center">
        <Grid item xs={9} className={classes.barContainer}>
          {hasFilter && (
            <>
              <InlineLogo />
              <Divider orientation="vertical" flexItem classes={{ root: classes.divider }} />
            </>
          )}
          <SearchBar hasShrink={hasFilter} />
        </Grid>
        {hasFilter && (
          <Grid item xs={3} classes={{ root: classes.sideBlock }}>
            <>
              <Typography classes={{ root: classes.filterLabel }} variant="h6">
                {intl.formatMessage({ id: 'components.searchPanel.filterLabel' })}
              </Typography>
              <Switch color="default" onChange={onChange} />
            </>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

SearchPanel.propTypes = {
  hasFilter: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
};

SearchPanel.defaultProps = {
  onChange: () => { },
};

export default SearchPanel;
