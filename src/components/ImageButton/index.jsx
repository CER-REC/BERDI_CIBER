import React, { useMemo } from 'react';
import { IconButton, Typography, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import figure from '../../images/figure.svg';
import table from '../../images/table.svg';
import discoveryBlob from '../../images/discoveryBlob.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    border: `2px solid ${theme.palette.button.blue}`,
    borderRadius: '10px',
    boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.25)',
    padding: '0',
    height: '100%',
    zIndex: 1,
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
    height: '8em',
    width: '8em',
    borderRadius: '50%',
    border: '1px solid black',
  },
  background: {
    backgroundImage: `url(${discoveryBlob})`,
    backgroundSize: '85%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: -1,
  },
  meta: {
    padding: '1.5em 0 0.5em 1em',
    textAlign: 'left',
    width: '100%',
    '& > img': {
      height: '1.5em',
      width: '1.5em',
      marginRight: '0.3em',
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

const ImageButton = ({ isTable, src, caption, label, index, onClick }) => {
  const classes = useStyles();
  const intl = useIntl();
  const typeLabel = useMemo(() => {
    if (isTable) {
      return intl.formatMessage({ id: 'api.content.TABLE' });
    }

    return intl.formatMessage({ id: 'api.content.FIGURE' });
  }, [isTable, intl]);

  let bgAngle = 0;
  if (index === 0) {
    bgAngle = 145;
  } else if (index === 1) {
    bgAngle = 180;
  }

  return (
    <IconButton
      className="ImageButton"
      classes={{ root: classes.root, label: classes.buttonLabel }}
      onClick={onClick}
      disableRipple
    >
      <div className={classes.background} style={{ transform: `rotate(${bgAngle}deg)` }} />
      <div className={classes.meta}>
        <img
          src={isTable ? table : figure}
          alt={typeLabel}
        />
        <Typography component="span">{typeLabel}</Typography>
      </div>
      <div className={classes.image} style={{ backgroundImage: `url(${src})` }} />
      <div className={classes.text}>
        <Typography variant="h6">{label}</Typography>
        <Typography component="p">{caption}</Typography>
        <div className={classes.fill} />
      </div>
    </IconButton>
  );
};

ImageButton.propTypes = {
  isTable: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageButton;
