import React, { useState } from 'react';
import { Button, Checkbox, FormControl, FormControlLabel, makeStyles } from '@material-ui/core';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import LegalDisclaimer from '../LegalDisclaimer';

const useStyles = makeStyles({
  disclaimerText: {
    fontSize: '14px',
  },
});

const LegalAgreeCheckbox = ({ isChecked, toggleChecked, disabled }) => {
  const classes = useStyles();
  const intl = useIntl();
  const [legalDisclaimerOpen, setLegalDisclaimerOpen] = useState(false);

  const handleLegalDisclaimerOpen = () => {
    setLegalDisclaimerOpen(true);
  };
  const handleLegalDisclaimerClose = () => setLegalDisclaimerOpen(false);

  return (
    <>
      <LegalDisclaimer
        title={intl.formatMessage({ id: 'common.downloadingTitle' })}
        open={legalDisclaimerOpen}
        onClose={handleLegalDisclaimerClose}
      />
      <FormControl>
        <FormControlLabel
          disabled={disabled}
          classes={{ label: classes.disclaimerText }}
          value="agreed"
          control={<Checkbox color="default" checked={isChecked} />}
          label={
            intl.formatMessage({ id: 'components.legalAgreeCheckbox.agreeToTermsAndConditions' },
              {
                usageTerms: (
                  <Button color="secondary" onClick={handleLegalDisclaimerOpen} disableRipple>
                    {intl.formatMessage({ id: 'components.legalAgreeCheckbox.usageTerms' })}
                  </Button>
                ),
              })
          }
          labelPlacement="end"
          onChange={toggleChecked}
        />
      </FormControl>
    </>
  );
};

export default LegalAgreeCheckbox;

LegalAgreeCheckbox.propTypes = {
  disabled: PropTypes.bool,
  isChecked: PropTypes.bool.isRequired,
  toggleChecked: PropTypes.func.isRequired,
};

LegalAgreeCheckbox.defaultProps = {
  disabled: false,
};
