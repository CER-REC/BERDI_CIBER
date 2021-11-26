import React, { useCallback, useState } from 'react';
import { ClickAwayListener, Tooltip, Typography, makeStyles } from '@material-ui/core';
import { HelpOutline } from '@material-ui/icons';
import { useIntl } from 'react-intl';

const useStyles = makeStyles((theme) => ({
  root: {
    color: '#5D5D5D',
    fontSize: 16,
    height: '1.2em',
    marginLeft: '0.5em',
    marginBottom: '0.2em',
    verticalAlign: 'bottom',
    width: '1.2em',
    cursor: 'pointer',
  },
  tooltip: {
    border: '1px solid #BBBBBB',
    boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: 5,
    padding: '2em',
  },
  body: {
    color: theme.palette.primary.main,
    fontSize: 14,
    lineHeight: 'normal',
  },
}));

const DataTooltip = () => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const intl = useIntl();
  const handleClose = useCallback(() => setOpen(false), [setOpen]);
  const handleOpen = useCallback(() => setOpen(true), [setOpen]);

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Tooltip
        title={(
          <div className={classes.tooltip}>
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
          </div>
        )}
        open={open}
        placement="right-start"
        disableFocusListener
        disableHoverListener
        disableTouchListener
        interactive
      >
        <HelpOutline className={`DataTooltip ${classes.root}`} onClick={handleOpen} />
      </Tooltip>
    </ClickAwayListener>
  );
};

export default DataTooltip;
