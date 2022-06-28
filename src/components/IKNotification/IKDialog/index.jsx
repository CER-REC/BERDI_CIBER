import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import CERDialog from '../../CERDialog';

const useStyles = makeStyles((theme) => ({
  body: {
    '& > p': { paddingBottom: '3em' },
    '& > p:last-child': { paddingBottom: '1em' },
  },
  footer: {
    backgroundColor: theme.palette.teal.light,
    borderRadius: 10,
    padding: '1em',
  },
}));

const IKDialog = ({ open, onClose }) => {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <CERDialog
      title={intl.formatMessage({ id: 'components.ikNotification.title' })}
      open={open}
      onClose={onClose}
    >
      <div className={classes.body}>
        <Typography>
          {
            intl.formatMessage(
              { id: 'components.ikNotification.ikDialog.body1' },
              {
                link: (
                  <a
                    href={intl.messages['components.ikNotification.ikDialog.url1']}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {intl.formatMessage({ id: 'components.ikNotification.ikDialog.link1' })}
                  </a>
                ),
              },
            )
          }
        </Typography>
        <Typography>
          {intl.formatMessage({ id: 'components.ikNotification.ikDialog.body2' })}
        </Typography>
        <Typography>
          {intl.formatMessage({ id: 'components.ikNotification.ikDialog.body3' })}
        </Typography>
        <Typography>
          {
            intl.formatMessage(
              { id: 'components.ikNotification.ikDialog.body4' },
              {
                link: (
                  <a
                    href={intl.messages['components.ikNotification.ikDialog.url4']}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {intl.formatMessage({ id: 'components.ikNotification.ikDialog.link4' })}
                  </a>
                ),
              },
            )
          }
        </Typography>
        <Typography>
          {
            intl.formatMessage(
              { id: 'components.ikNotification.ikDialog.body5' },
              {
                link: (
                  <a
                    href={intl.messages['components.ikNotification.ikDialog.emailURL']}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {intl.formatMessage({ id: 'components.ikNotification.ikDialog.emailLink' })}
                  </a>
                ),
              },
            )
          }
        </Typography>
        <Typography>
          {
            intl.formatMessage(
              { id: 'components.ikNotification.ikDialog.body6' },
              {
                link: (
                  <a
                    href={intl.messages['components.ikNotification.ikDialog.url6']}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {intl.formatMessage({ id: 'components.ikNotification.ikDialog.link6' })}
                  </a>
                ),
              },
            )
          }
        </Typography>
      </div>
      <Typography classes={{ root: classes.footer }}>
        {
          intl.formatMessage(
            { id: 'components.ikNotification.ikDialog.footer' },
            {
              link: (
                <a
                  href={intl.messages['components.ikNotification.ikDialog.emailURL']}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {intl.formatMessage({ id: 'components.ikNotification.ikDialog.emailLink' })}
                </a>
              ),
            },
          )
        }
      </Typography>
    </CERDialog>
  );
};

IKDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default IKDialog;
