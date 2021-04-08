import React, { useCallback, useState } from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import { useIntl } from 'react-intl';

import { API_HOST, applicationPath, lang } from '../../../constants';
import ImageButton from '../../../components/ImageButton';
import ResultDialog from '../../../components/ResultDialog';
import fish from '../../../images/ditch-fish.png';
import nests from '../../../images/rare-species.png';
import wetlands from '../../../images/unnamed-wetlands.png';
import { reportDiscovery } from '../../../utilities/analytics';

// TODO: Pull content data from API when available
// TODO: Add in the mocked content
const mockedContents = {
  fish: {
    en: {
      title: 'fish',
      esaSections: 'ESA',
      pageNumber: 1,
      pdfURL: 'https://apps.cer-rec.gc.ca/REGDOCS/File/Download/',
      type: 'TABLE',
      url: `${API_HOST}/${applicationPath[lang]}/csv/${lang}/`,
    },
    fr: {
      title: 'fish',
      esaSections: 'ESA',
      pageNumber: 1,
      pdfURL: 'https://apps.cer-rec.gc.ca/REGDOCS/File/Download/',
      type: 'TABLE',
      url: `${API_HOST}/${applicationPath[lang]}/csv/${lang}/`,
    },
  },
  nests: {
    en: {
      title: 'nests',
      esaSections: 'ESA',
      pageNumber: 1,
      pdfURL: 'https://apps.cer-rec.gc.ca/REGDOCS/File/Download/',
      type: 'TABLE',
      url: `${API_HOST}/${applicationPath[lang]}/csv/${lang}/`,
    },
    fr: {
      title: 'nests',
      esaSections: 'ESA',
      pageNumber: 1,
      pdfURL: 'https://apps.cer-rec.gc.ca/REGDOCS/File/Download/',
      type: 'TABLE',
      url: `${API_HOST}/${applicationPath[lang]}/csv/${lang}/`,
    },
  },
  wetlands: {
    en: {
      title: 'wetlands',
      esaSections: 'ESA',
      pageNumber: 1,
      pdfURL: 'https://apps.cer-rec.gc.ca/REGDOCS/File/Download/',
      type: 'TABLE',
      url: `${API_HOST}/${applicationPath[lang]}/csv/${lang}/`,
    },
    fr: {
      title: 'wetlands',
      esaSections: 'ESA',
      pageNumber: 1,
      pdfURL: 'https://apps.cer-rec.gc.ca/REGDOCS/File/Download/',
      type: 'TABLE',
      url: `${API_HOST}/${applicationPath[lang]}/csv/${lang}/`,
    },
  },
};

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: '1em',
  },
  accreditations: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  buttons: {
    paddingBottom: '2em',
    paddingTop: '1em',
  },
}));

const Discoveries = () => {
  const [content, setContent] = useState();
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const intl = useIntl();
  const handleClick = useCallback((data) => {
    reportDiscovery(data.title);
    setContent(data);
    setOpen(true);
  }, [setContent, setOpen]);
  const handleClose = useCallback(() => setOpen(false), [setOpen]);
  const createHandleClick = useCallback((data) => (() => handleClick(data)), [handleClick]);

  return (
    <div className={`Discoveries ${classes.root}`}>
      <Typography variant="h6">{intl.formatMessage({ id: 'pages.landing.discoveries.title' })}</Typography>
      <Grid container classes={{ root: classes.buttons }} spacing={3}>
        <Grid item xs={4}>
          <ImageButton
            src={wetlands}
            caption={intl.formatMessage({ id: 'pages.landing.discoveries.wetlands.body' })}
            label={intl.formatMessage({ id: 'pages.landing.discoveries.wetlands.title' })}
            onClick={createHandleClick(mockedContents.wetlands[lang])}
            isTable
          />
        </Grid>
        <Grid item xs={4}>
          <ImageButton
            src={nests}
            caption={intl.formatMessage({ id: 'pages.landing.discoveries.nests.body' })}
            label={intl.formatMessage({ id: 'pages.landing.discoveries.nests.title' })}
            onClick={createHandleClick(mockedContents.nests[lang])}
            isTable={false}
          />
        </Grid>
        <Grid item xs={4}>
          <ImageButton
            src={fish}
            caption={intl.formatMessage({ id: 'pages.landing.discoveries.fish.body' })}
            label={intl.formatMessage({ id: 'pages.landing.discoveries.fish.title' })}
            onClick={createHandleClick(mockedContents.fish[lang])}
            isTable={false}
          />
        </Grid>
      </Grid>
      <Typography classes={{ root: classes.accreditations }} variant="h6">{intl.formatMessage({ id: 'pages.landing.discoveries.accreditations.title' })}</Typography>
      <Typography classes={{ root: classes.accreditations }} component="p">{intl.formatMessage({ id: 'pages.landing.discoveries.accreditations.body' })}</Typography>
      <ResultDialog open={open} onClose={handleClose} data={content} />
    </div>
  );
};

export default Discoveries;
