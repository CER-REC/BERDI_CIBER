import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import upCaret from '../../../images/upCaret.svg';
import downCaret from '../../../images/downCaret.svg';

const useStyles = makeStyles(() => ({
  root: {
    color: 'white',
    fontSize: 'inherit',
    fontWeight: 'bold',
  },
  spanStyle: {
    fontSize: '14px',
  },
  caret: {
    filter: 'brightness(0) invert(1)',
  },
}));

const ViewMoreFiltersButton = ({ isOpen, toggleExpand }) => {
  const intl = useIntl();
  const classes = useStyles();

  if (isOpen) {
    return (
      <Button color="primary" className={classes.root} onClick={toggleExpand} disableFocusRipple>
        <span className={classes.spanStyle}>{intl.formatMessage({ id: 'components.searchPanel.filterPanel.viewFewer' })}</span>
        <img alt="Up caret" src={upCaret} className={classes.caret} />
      </Button>
    );
  }

  return (
    <Button color="primary" className={classes.root} onClick={toggleExpand} disableFocusRipple>
      <span className={classes.spanStyle}>{intl.formatMessage({ id: 'components.searchPanel.filterPanel.viewMore' })}</span>
      <img alt="Down caret" src={downCaret} className={classes.caret} />
    </Button>
  );
};

export default ViewMoreFiltersButton;

ViewMoreFiltersButton.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleExpand: PropTypes.func.isRequired,
};
