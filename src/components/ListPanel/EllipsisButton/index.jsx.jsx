import { ButtonBase, makeStyles, Menu, MenuItem } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import download from '../../../images/listPanel/download.svg';
import flag from '../../../images/listPanel/flag.svg';
import leaf from '../../../images/listPanel/leaf.svg';
import EllipsisIcon from '../../../images/listPanel/ellipsis.svg';
import { reportDownload } from '../../../utilities/analytics';

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
    '& li': {
      paddingRight: '2em',
    },
    '& .MuiPaper-rounded': {
      borderRadius: 0,
      boxShadow: 'none',
      filter: 'drop-shadow(2px 4px 4px rgba(0,0,0,0.25))',
      border: '1px solid #D0CDCD',
    },
    paddingTop: 0,
    paddingBottom: 0,
  },
  border: {
    borderStyle: 'solid none none none',
    borderColor: '#7B7E81',
    borderWidth: '1px',
  },
});

const EllipsisButton = ({ downloadURL, title }) => {
  const classes = useStyles();
  const intl = useIntl();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMouseEnter = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        MenuListProps={{ onMouseLeave: handleClose }}
        className={classes.menu}
        disableRestoreFocus
        disableAutoFocusItem
      >
        <MenuItem onClick={handleClose} style={{ paddingLeft: '10px' }}>
          <img alt="a maple leaf" src={leaf} />
          {intl.formatMessage({ id: 'components.listPanel.ellipsisButton.rate' })}
        </MenuItem>
        <MenuItem onClick={handleClose} className={classes.border}>
          <img alt="a generic flag" src={flag} />
          {intl.formatMessage({ id: 'components.listPanel.ellipsisButton.report' })}
        </MenuItem>

        {downloadURL && (
          <a href={downloadURL} style={{ color: 'unset', textDecoration: 'none' }} onClick={() => reportDownload(title)}>
            <MenuItem onClick={handleClose} className={classes.border}>
              <img alt="a down arrow" src={download} />
              {intl.formatMessage({ id: 'components.listPanel.ellipsisButton.download' })}
            </MenuItem>
          </a>
        )}
      </Menu>

      <ButtonBase className={classes.button} onMouseEnter={handleMouseEnter}>
        <img alt="Ellipsis" src={EllipsisIcon} />
      </ButtonBase>
    </>
  );
};

export default EllipsisButton;

EllipsisButton.propTypes = {
  downloadURL: PropTypes.string,
  title: PropTypes.string.isRequired,
};

EllipsisButton.defaultProps = {
  downloadURL: null,
};
