import { Button, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';

const maxLength = 150;
const useStyles = makeStyles((theme) => ({
  seeMoreButton: {
    color: theme.palette.blue.dark,
    fontWeight: '900',
    marginLeft: '1em',
    marginBottom: '1em',
  },
  title: {
    fontWeight: 'normal',
    color: theme.palette.grey.alt,
  },
}));

const TitleSection = ({ title, isExpanded, onClick, onChange }) => {
  const intl = useIntl();
  const classes = useStyles();
  const label = (title.length <= maxLength || isExpanded)
    ? title
    : title.substring(0, maxLength).concat('...');
  const expandLabel = isExpanded
    ? intl.formatMessage({ id: 'components.resultDialog.seeLess' })
    : intl.formatMessage({ id: 'components.resultDialog.seeMore' });
  const titleButton = (
    <Button
      color="primary"
      onClick={() => onClick()}
      disableFocusRipple
    >
      <Typography variant="h6" className={classes.title}>
        {label}
      </Typography>
    </Button>
  );

  return (
    <>
      {titleButton}
      {
        (title.length > maxLength) && (
          <Button
            className={classes.seeMoreButton}
            color="primary"
            onClick={() => onChange()}
            disableFocusRipple
          >
            {expandLabel}
          </Button>
        )
      }
    </>
  );
};

export default TitleSection;

TitleSection.propTypes = {
  title: PropTypes.string.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};
