import { Button, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useIntl } from 'react-intl';

const Footer = ({ onClick }) => {
  const intl = useIntl();

  return (
    <Grid container justify="flex-end" alignItems="center">
      <Button variant="contained" color="primary" onClick={onClick}>
        {intl.formatMessage({ id: 'components.legalDisclaimer.footer.label' })}
      </Button>
    </Grid>
  );
};

Footer.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Footer;
