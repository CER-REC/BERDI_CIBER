import React, { useMemo } from 'react';
import { IconButton, Typography, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import figure from '../../images/figure.svg';
import table from '../../images/table.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    border: `2px solid ${theme.palette.button.blue}`,
    borderRadius: 0,
    boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.25)',
    padding: '0',
    height: '100%',
  },
  buttonLabel: {
    display: 'flex',
    flexFlow: 'column',
    height: '100%',
    width: '100%',
  },
  fill: { flex: 1 },
  image: {
    backgroundSize: 'cover',
    height: '10em',
    width: '100%',
  },
  meta: {
    paddingTop: '3em',
    textAlign: 'right',
    '& > img': {
      height: '1.5em',
      width: '1.5em',
    },
    '& > span': {
      backgroundColor: theme.palette.teal.light,
      borderRadius: '3px',
      display: 'inline-flex',
      fontSize: 14,
      fontWeight: 'bold',
      marginRight: '0.5em',
      padding: '0.5em',
      textTransform: 'uppercase',
      verticalAlign: 'middle',
    },
  },
  text: {
    color: theme.palette.primary.main,
    display: 'flex',
    flex: 1,
    flexFlow: 'column',
    padding: '1em',
    textAlign: 'left',
    '& > h6': { paddingBottom: '0.5em' },
    '& > p': { fontSize: 20 },
  },
}));

const ImageButton = ({ isTable, src, caption, label, onClick }) => {
  const classes = useStyles();
  const intl = useIntl();
  const typeLabel = useMemo(() => {
    if (isTable) {
      return intl.formatMessage({ id: 'api.content.TABLE' });
    }

    return intl.formatMessage({ id: 'api.content.FIGURE' });
  }, [isTable, intl]);

  return (
    <IconButton
      className="ImageButton"
      classes={{ root: classes.root, label: classes.buttonLabel }}
      onClick={onClick}
      disableRipple
    >
      <div className={classes.image} style={{ backgroundImage: `url(${src})` }} />
      <div className={classes.text}>
        <Typography variant="h6">{label}</Typography>
        <Typography component="p">{caption}</Typography>
        <div className={classes.fill} />
        <div className={classes.meta}>
          <Typography component="span">{typeLabel}</Typography>
          <img
            src={isTable ? table : figure}
            alt={typeLabel}
          />
        </div>
      </div>
    </IconButton>
  );
};

ImageButton.propTypes = {
  isTable: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageButton;
