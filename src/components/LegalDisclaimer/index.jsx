import { Dialog, Grid, Typography, makeStyles } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import DownloadFooter from './DownloadFooter';
import Footer from './Footer';
import Citation from '../Citation';
import { lang } from '../../constants';
import cerLogoEn from '../../images/cerLogoEn.png';
import cerLogoFr from '../../images/cerLogoFr.png';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiButton-contained.Mui-disabled': {
      color: 'white',
      backgroundColor: '#D4D9E0',
    },
    '& .MuiButton-containedPrimary:hover': {
      backgroundColor: theme.palette.blue.dark,
    },
    '& .MuiGrid-container': {
      color: theme.palette.grey.dark,
    },
    '& button': {
      padding: '0.2em 1.5em',
    },
  },
  title: {
    color: 'black',
    padding: '1em 0',
    textAlign: 'center',
  },
  paper: {
    maxWidth: '41em',
    padding: '2em',
  },
  body: {
    '& > :last-child': { paddingTop: '1em' },
  },
}));

const LegalDisclaimer = ({ content, title, open, onClose }) => {
  const classes = useStyles();
  const intl = useIntl();
  const logo = lang === 'fr' ? cerLogoFr : cerLogoEn;

  return (
    <Dialog
      open={open}
      PaperProps={{ className: classes.paper }}
      disableEscapeKeyDown
      className={classes.root}
    >
      <img alt={intl.formatMessage({ id: 'components.legalDisclaimer.logoAltText' })} src={logo} style={{ maxWidth: '23em' }} />
      <Grid className={classes.body} container justify="center">
        <div>
          <Typography className={classes.title} variant="h6">
            { title }
          </Typography>
          <Typography style={{ paddingBottom: '1em' }}>
            {intl.formatMessage({ id: 'components.legalDisclaimer.disclaimer1' })}
          </Typography>
          <Typography style={{ paddingBottom: '1em' }}>
            {
              content
                ? intl.formatMessage({ id: 'components.legalDisclaimer.disclaimer2Explicit' })
                : intl.formatMessage({ id: 'components.legalDisclaimer.disclaimer2Implicit' })
            }
          </Typography>
        </div>

        <div>
          <ul>
            <li>{intl.formatMessage({ id: 'components.legalDisclaimer.bullet1' })}</li>
            <li>{intl.formatMessage({ id: 'components.legalDisclaimer.bullet2' })}</li>
            <li>{intl.formatMessage({ id: 'components.legalDisclaimer.bullet3' })}</li>
            <li>{intl.formatMessage({ id: 'components.legalDisclaimer.bullet4' })}</li>
            <li>
              {intl.formatMessage({ id: 'components.legalDisclaimer.bullet5' }, {
                not: (<span style={{ fontWeight: '900' }}>{intl.formatMessage({ id: 'components.legalDisclaimer.not' })}</span>),
              })}
            </li>
          </ul>
        </div>
        <Citation />
        {
          content
            ? <DownloadFooter content={content} onClick={onClose} />
            : <Footer onClick={onClose} />
        }
      </Grid>
    </Dialog>
  );
};

LegalDisclaimer.propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }),
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

LegalDisclaimer.defaultProps = {
  content: null,
};

export default LegalDisclaimer;
