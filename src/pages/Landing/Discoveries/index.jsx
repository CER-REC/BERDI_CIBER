import React, { useCallback, useState } from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import { useIntl } from 'react-intl';

import { lang } from '../../../constants';
import ImageButton from '../../../components/ImageButton';
import ResultDialog from '../../../components/ResultDialog';
import useAPI from '../../../hooks/useAPI';
import { reportDiscovery } from '../../../utilities/analytics';

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: '1em',
  },
  subtitle: {
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
  const { discoveries } = useAPI();
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
      {lang === 'fr' && <Typography classes={{ root: classes.subtitle }}>{intl.formatMessage({ id: 'pages.landing.discoveries.disclaimer' })}</Typography>}
      <Grid container classes={{ root: classes.buttons }} spacing={3}>
        {
          discoveries.map((discovery) => (
            <Grid key={discovery.content.id} item xs={4}>
              <ImageButton
                src={discovery.imageSrc}
                caption={intl.formatMessage({ id: discovery.bodyId })}
                label={intl.formatMessage({ id: discovery.titleId })}
                onClick={createHandleClick(discovery.content)}
                isTable={discovery.content.type === 'TABLE'}
              />
            </Grid>
          ))
        }
      </Grid>
      <Typography classes={{ root: classes.subtitle }} variant="h6">{intl.formatMessage({ id: 'pages.landing.discoveries.accreditations.title' })}</Typography>
      <Typography classes={{ root: classes.subtitle }}>{intl.formatMessage({ id: 'pages.landing.discoveries.accreditations.body' })}</Typography>
      <ResultDialog open={open} onClose={handleClose} data={content} />
    </div>
  );
};

export default Discoveries;
