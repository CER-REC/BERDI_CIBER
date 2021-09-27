import React, { useCallback, useState } from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import { useIntl } from 'react-intl';

import { lang } from '../../../constants';
import ImageButton from '../../../components/ImageButton';
import ResultDialog from '../../../components/ResultDialog';
import useAPI from '../../../hooks/useAPI';
import { reportDiscovery } from '../../../utilities/analytics';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '1em',
  },
  header: {
    fontSize: '18px',
    fontWeight: 'bold',
    textAlign: 'center',
    color: theme.palette.blue.darkBluePurple,
  },
  divider: {
    backgroundColor: theme.palette.blue.navy,
    height: '4px',
    marginTop: '0.5em',
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
      {lang === 'fr' && <Typography classes={{ root: classes.subtitle }}>{intl.formatMessage({ id: 'pages.landing.discoveries.disclaimer' })}</Typography>}
      <Typography variant="h6" className={classes.header}>
        {intl.formatMessage({ id: 'pages.landing.discoveries.title' })}
      </Typography>
      <hr className={classes.divider} />
      <Grid container classes={{ root: classes.buttons }} spacing={3}>
        {
          discoveries.map((discovery) => (
            <Grid key={discovery.content.id} item xs={4}>
              <ImageButton
                src={discovery.imageSrc}
                bgAngle={discovery.bgAngle}
                caption={intl.formatMessage({ id: discovery.bodyId })}
                label={intl.formatMessage({ id: discovery.titleId })}
                onClick={createHandleClick(discovery.content)}
                isTable={discovery.content.type === 'TABLE'}
              />
            </Grid>
          ))
        }
      </Grid>
      <hr className={classes.divider} />
      <ResultDialog open={open} onClose={handleClose} data={content} />
    </div>
  );
};

export default Discoveries;
