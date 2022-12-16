import { Button, Checkbox, FormControl, FormControlLabel, Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import useConfirmation from '../../../hooks/useConfirmation';

const useStyles = makeStyles({
  download: {
    display: 'flex',
    alignItems: 'center',
  },
});

const DownloadFooter = ({ url, onClick }) => {
  const classes = useStyles();
  const intl = useIntl();
  const { hasConfirmation, setHasConfirmation } = useConfirmation();
  const toggleChecked = () => setHasConfirmation(!hasConfirmation);

  return (
    <Grid container justify="space-between" alignItems="center">
      <Button
        variant="contained"
        color="primary"
        onClick={onClick}
      >
        {intl.formatMessage({ id: 'components.legalDisclaimer.downloadFooter.cancel' })}
      </Button>
      <div className={classes.download}>
        <FormControl>
          <FormControlLabel
            value="agreed"
            control={<Checkbox color="default" checked={hasConfirmation} />}
            label={intl.formatMessage({ id: 'components.legalDisclaimer.downloadFooter.agree' })}
            labelPlacement="end"
            onChange={toggleChecked}
          />
        </FormControl>
        <Button
          component="a"
          href={url}
          disabled={!hasConfirmation}
          variant="contained"
          color="primary"
          onClick={onClick}
        >
          {intl.formatMessage({ id: 'components.legalDisclaimer.downloadFooter.download' })}
        </Button>
      </div>
    </Grid>
  );
};

DownloadFooter.propTypes = {
  url: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default DownloadFooter;
