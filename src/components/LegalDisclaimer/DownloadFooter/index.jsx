import { Button, Checkbox, FormControl, FormControlLabel, Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import useConfirmation from '../../../hooks/useConfirmation';
import { reportDownload } from '../../../utilities/analytics';

const useStyles = makeStyles({
  download: {
    display: 'flex',
    alignItems: 'center',
  },
});

const DownloadFooter = ({ content, onClick }) => {
  const classes = useStyles();
  const intl = useIntl();
  const { hasConfirmation, setHasConfirmation } = useConfirmation();
  const toggleChecked = () => setHasConfirmation(!hasConfirmation);
  const handleClick = (event) => {
    onClick(event);
    reportDownload(content.title);
  };

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
          href={content.url}
          disabled={!hasConfirmation}
          variant="contained"
          color="primary"
          onClick={handleClick}
        >
          {intl.formatMessage({ id: 'components.legalDisclaimer.downloadFooter.download' })}
        </Button>
      </div>
    </Grid>
  );
};

DownloadFooter.propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default DownloadFooter;
