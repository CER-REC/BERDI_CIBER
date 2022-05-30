import React, { useState } from 'react';
import { IconButton, Popover, Typography, makeStyles } from '@material-ui/core';
import { HelpOutline } from '@material-ui/icons';
import { useIntl } from 'react-intl';

const useStyles = makeStyles((theme) => ({
  root: {
    color: '#5D5D5D',
    fontSize: 16,
    marginLeft: '0.5em',
    marginBottom: '0.2em',
    padding: 0,
  },
  icon: {
    fontSize: 'inherit',
    height: '1.2em',
    width: '1.2em',
  },
  tooltip: {
    border: '1px solid #BBBBBB',
    boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: 5,
    padding: '1.25em',
    marginLeft: '0.88em',
    maxWidth: '18.75em',
  },
  body: {
    color: theme.palette.primary.main,
    fontSize: 14,
    lineHeight: 'normal',
  },
}));

const DataTooltip = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();
  const intl = useIntl();
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton classes={{ root: classes.root }} onClick={handleClick}>
        <HelpOutline className={classes.icon} />
      </IconButton>
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{ classes: { root: classes.tooltip } }}
      >
        <Typography classes={{ root: classes.body }}>
          {
            intl.formatMessage(
              { id: 'components.dropdown.tooltip' },
              {
                nebAct: (
                  <a
                    href={intl.formatMessage({ id: 'components.dropdown.nebLink' })}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {intl.formatMessage({ id: 'components.dropdown.nebAct' })}
                  </a>
                ),
                cerAct: (
                  <a
                    href={intl.formatMessage({ id: 'components.dropdown.cerLink' })}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {intl.formatMessage({ id: 'components.dropdown.cerAct' })}
                  </a>
                ),
              },
            )
          }
        </Typography>
      </Popover>
    </>
  );
};

export default DataTooltip;
