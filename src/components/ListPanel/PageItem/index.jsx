// WET template component uses the anchor as a button
/* eslint-disable jsx-a11y/anchor-is-valid */
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { useIntl } from 'react-intl';
import useConfig from '../../../hooks/useConfig';
import isActivateKey from '../../../utilities/isActivateKey';

const useStyles = makeStyles((theme) => ({
  root: {
    // Overriding WET template styles
    '&.active > a:only-child:only-of-type': {
      backgroundColor: theme.palette.blue.navy,
    },
    '& > a:only-child': {
      color: theme.palette.blue.navy,
    },
    '& > a:only-child:focus': {
      backgroundColor: theme.palette.grey.athens,
      borderColor: '#DCDEE1',
    },
    '& > a:only-child:focus-visible': {
      backgroundColor: '#D4D6DA',
      borderColor: '#BBBFC5',
    },
  },
}));

const PageItem = ({ page, active, rel }) => {
  let label = page;
  let ariaLabel = page;
  const classes = useStyles();
  const intl = useIntl();
  const { configDispatch } = useConfig();
  const handleClick = (pageIndex) => configDispatch({ type: 'searchIndex/changed', payload: pageIndex });

  if (active) {
    return (
      <li className={`${classes.root} active`}>
        <a aria-label={ariaLabel}>{label}</a>
      </li>
    );
  }

  if (rel === 'prev') {
    ariaLabel = intl.formatMessage({ id: 'common.previousAriaText' })
    label = intl.formatMessage({ id: 'common.previous' });
  } else if (rel === 'next') {
    ariaLabel = intl.formatMessage({ id: 'common.nextAriaText' })
    label = intl.formatMessage({ id: 'common.next' });
  } else if (page !== undefined) {
    ariaLabel = intl.formatMessage({ id: 'common.pageAriaText' }, { number: page })
  }

  return (
    <li className={classes.root}>
      <a
        aria-label={ariaLabel}
        role="button"
        tabIndex="0"
        rel={rel}
        onClick={() => handleClick(page - 1)}
        onKeyPress={(event) => (isActivateKey(event) && handleClick(page - 1))}
      >
        {label}
      </a>
    </li>
  );
};

export default PageItem;

PageItem.propTypes = {
  page: PropTypes.number.isRequired,
  active: PropTypes.bool,
  rel: PropTypes.oneOf(['prev', 'next']),
};

PageItem.defaultProps = {
  active: false,
  rel: null,
};
