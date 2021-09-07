import React, { useEffect, useRef, useState } from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import { useIntl } from 'react-intl';

import useConfig from '../../hooks/useConfig';
import air from '../../images/topicsFilter/air.svg';
import boat from '../../images/topicsFilter/boat.svg';
import social from '../../images/topicsFilter/culture.svg';
import job from '../../images/topicsFilter/economic.svg';
import environmental from '../../images/topicsFilter/environmental.svg';
import fish from '../../images/topicsFilter/fish.svg';
import heritage from '../../images/topicsFilter/fossil.svg';
import wildlife from '../../images/topicsFilter/frog.svg';
import gas from '../../images/topicsFilter/gas.svg';
import human from '../../images/topicsFilter/health.svg';
import indigenous from '../../images/topicsFilter/indigenous.svg';
import infrastructure from '../../images/topicsFilter/infrastructure.svg';
import landscape from '../../images/topicsFilter/landscape.svg';
import electricity from '../../images/topicsFilter/magnet.svg';
import noise from '../../images/topicsFilter/noise.svg';
import proximity from '../../images/topicsFilter/people.svg';
import plant from '../../images/topicsFilter/plant.svg';
import species from '../../images/topicsFilter/polarbear.svg';
import wetland from '../../images/topicsFilter/reeds.svg';
import soil from '../../images/topicsFilter/soil.svg';
import treaty from '../../images/topicsFilter/treaty.svg';
import water from '../../images/topicsFilter/water.svg';
import SvgButton from '../SvgButton';
import Blob from './Blob';

const environmentalSrcs = {
  landscape,
  soil,
  wetland,
  water,
  fish,
  plant,
  wildlife,
  species,
  noise,
  gas,
  air,
  electricity,
};
const socioEconomicSrcs = {
  infrastructure,
  job,
  environmental,
  heritage,
  proximity,
  human,
  social,
  boat,
  indigenous,
  treaty,
};
const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 0,
    marginTop: 0,
    position: 'relative',
    '& > div.MuiGrid-item': {
      paddingBottom: 0,
      paddingTop: 0,
      zIndex: 1,
    },
  },
  header: {
    alignItems: 'center',
    display: 'flex',
    paddingBottom: '0.2em',
    position: 'relative',
    '&:after': {
      content: '""',
      flex: 1,
      height: '0.2em',
    },
    '&> span': { paddingRight: '0.5em' },
  },
  environmental: {
    '&:after': { backgroundColor: theme.palette.environmental },
  },
  socioEconomic: {
    '&:after': { backgroundColor: theme.palette.socioEconomic },
  },
  topics: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 7em)',
    justifyContent: 'space-between',
    '&> div': {
      margin: '1.2em 0',
      textAlign: 'center',
    },
  },
}));

// These objects are used to loop over React hook calls
Object.freeze(environmentalSrcs);
Object.freeze(socioEconomicSrcs);

const TopicsFilter = () => {
  const [layerNode, setLayerNode] = useState();
  const [hoverNode, setHoverNode] = useState();
  const classes = useStyles();
  const intl = useIntl();
  const { config, configDispatch } = useConfig();
  const isLanding = config.page === 'landing';
  const topicProps = {};
  const environmentalTopics = Object.keys(environmentalSrcs);
  const socioEconomicTopics = Object.keys(socioEconomicSrcs);
  const handleRef = (node) => setLayerNode(node);
  const getProps = (topic, src, type) => ({
    // This will be looped through two static lists
    // eslint-disable-next-line react-hooks/rules-of-hooks
    iconRef: useRef(),
    src,
    label: intl.formatMessage({ id: `common.${type}.${topic}.label` }),
    title: intl.formatMessage({ id: `common.${type}.${topic}.title` }),
    description: intl.formatMessage({ id: `common.${type}.${topic}.description` }),
    // TODO: Hook up score to the search results
    score: isLanding ? null : (topic.length % 4),
    // TODO: Hook up disabled to the search results
    disabled: isLanding ? false : (topic.length % 4) === 0,
    onClick: () => {
      const action = config.topics.includes(topic) ? 'topics/removed' : 'topics/added';

      configDispatch({ type: action, payload: topic });

      if (isLanding) {
        configDispatch({
          type: 'page/fragment/changed',
          payload: { page: 'search', fragment: 'topic' },
        });
      }
    },
  });

  useEffect(() => {
    if ((config.fragment === 'topic') && layerNode) {
      layerNode.scrollIntoView(true);
    }
  }, [config.fragment, layerNode]);

  environmentalTopics.forEach((topic) => {
    topicProps[topic] = getProps(topic, environmentalSrcs[topic], 'environmental');
  });
  socioEconomicTopics.forEach((topic) => {
    topicProps[topic] = getProps(topic, socioEconomicSrcs[topic], 'socioEconomic');
  });

  const nodes = config.topics.map((topic) => topicProps[topic].iconRef.current).filter(Boolean);

  return (
    <Grid ref={handleRef} classes={{ root: classes.root }} container spacing={10}>
      <Grid item xs={6}>
        <Typography className={`${classes.header} + ${classes.environmental}`} variant="h5">
          <span>{ intl.formatMessage({ id: 'common.environmental.title' }) }</span>
        </Typography>
        <div className={classes.topics}>
          {
            environmentalTopics.map((topic) => (
              <SvgButton
                key={topicProps[topic].label}
                iconRef={topicProps[topic].iconRef}
                src={topicProps[topic].src}
                label={topicProps[topic].label}
                title={topicProps[topic].title}
                description={topicProps[topic].description}
                score={topicProps[topic].score}
                type="environmental"
                disabled={topicProps[topic].disabled}
                isPulsing={isLanding}
                onClick={topicProps[topic].onClick}
                onMouseEnter={() => setHoverNode(topicProps[topic].iconRef.current)}
                onMouseLeave={() => setHoverNode()}
              />
            ))
          }
        </div>
      </Grid>
      <Grid item xs={6}>
        <Typography className={`${classes.header} + ${classes.socioEconomic}`} variant="h5">
          <span>{ intl.formatMessage({ id: 'common.socioEconomic.title' }) }</span>
        </Typography>
        <div className={classes.topics}>
          {
            socioEconomicTopics.map((topic) => (
              <SvgButton
                key={topicProps[topic].label}
                iconRef={topicProps[topic].iconRef}
                src={topicProps[topic].src}
                label={topicProps[topic].label}
                title={topicProps[topic].title}
                description={topicProps[topic].description}
                score={topicProps[topic].score}
                type="socioEconomic"
                disabled={topicProps[topic].disabled}
                isPulsing={isLanding}
                onClick={topicProps[topic].onClick}
                onMouseEnter={() => setHoverNode(topicProps[topic].iconRef.current)}
                onMouseLeave={() => setHoverNode()}
              />
            ))
          }
        </div>
      </Grid>
      <Blob layerNode={layerNode} pointNodes={nodes} hoverNode={hoverNode} />
    </Grid>
  );
};

export default TopicsFilter;