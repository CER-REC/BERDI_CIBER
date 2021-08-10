import { ButtonBase, makeStyles, Menu, MenuItem } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import download from '../../../images/ellipseMenu/download.svg';
import flag from '../../../images/ellipseMenu/flag.svg';
import leaf from '../../../images/ellipseMenu/leaf.svg';
import EllipseIcon from '../../../images/listPanel/ellipse.svg';

const useStyles = makeStyles({
  button: {
    paddingRight: '1em',
    marginBottom: '1em',
  },
  menu: {
    '& img': {
      paddingRight: '0.5em',
    },
    '& ul': {
      paddingTop: 0,
      paddingBottom: 0,
    },
    '& .MuiPaper-rounded': {
      borderRadius: 0,
      // When the padding is modified, a small bit of the underlying button is visible.
      // This covers it
      transform: 'translate(-1px) !important',
      boxShadow: 'none',
      filter: 'drop-shadow(2px 4px 4px rgba(0,0,0,0.25))',
    },
    border: '1px solid #D0CDCD',
    paddingTop: 0,
    paddingBottom: 0,
  },
  border: {
    borderStyle: 'solid none none none',
    borderColor: '#7B7E81',
    borderWidth: '1px',
  },
  downloadLink: {
    textDecoration: 'none',
  },
});

const EllipseButton = ({ downloadURL }) => {
  const classes = useStyles();
  const intl = useIntl();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Menu
        id="ellipse-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        MenuListProps={{ onMouseLeave: handleClose }}
        className={classes.menu}
        disableRestoreFocus
      >
        <MenuItem onClick={handleClose} style={{ paddingLeft: '10px' }}>
          <img alt="a maple leaf" src={leaf} />
          {intl.formatMessage({ id: 'components.ellipseButton.rate' })}
        </MenuItem>
        <MenuItem onClick={handleClose} className={classes.border}>
          <img alt="a generic flag" src={flag} />
          {intl.formatMessage({ id: 'components.ellipseButton.report' })}
        </MenuItem>

        {downloadURL && (
          <a href={downloadURL} style={{ color: 'unset', textDecoration: 'none' }}>
            <MenuItem onClick={handleClose} className={classes.border}>
              <img alt="a down arrow" src={download} />
              {intl.formatMessage({ id: 'components.ellipseButton.download' })}
            </MenuItem>
          </a>
        )}

      </Menu>

      <ButtonBase className={classes.button} onMouseEnter={handleClick}>
        <img alt="Ellipse" src={EllipseIcon} />
      </ButtonBase>
    </>
  );
};

export default EllipseButton;

EllipseButton.propTypes = {
  downloadURL: PropTypes.string,
};

EllipseButton.defaultProps = {
  downloadURL: null,
};
