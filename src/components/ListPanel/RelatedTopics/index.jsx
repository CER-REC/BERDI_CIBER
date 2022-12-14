import { makeStyles, Button, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import RelatedTopicsDialog from '../RelatedTopicsDialog';
import getScore from '../../../utilities/getScore';
import { socioEconomicTopics } from '../../../constants';
import { reportReportRelated } from '../../../utilities/analytics';

const masculineTypes = ['ALIGNMENT_SHEET'];

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#F4F4F4',
    width: '100%',
    padding: '1em 3em',
  },
  title: {
    fontWeight: 700,
    fontSize: '16px',
    paddingBottom: '1em',
    color: theme.palette.grey.dark,
  },
  link: {
    color: theme.palette.teal.blue,
    fontSize: '14px',
    maxWidth: '100%',
    '& > $label': {
      maxWidth: '100%',
    },
  },
  tableBody: {
    '& td': {
      paddingBottom: '1em',
      paddingRight: '6.5em',
      width: '25%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
  },
}));

const RelatedTopics = ({ valueComponents, type }) => {
  const classes = useStyles();
  const intl = useIntl();
  const maxValueComponent = Math.max(...Object.values(valueComponents).filter(Number));

  const [dialogData, setDialogData] = useState(null);

  const handleClickOpen = (topic) => {
    setDialogData(
      {
        topic,
        title: intl.formatMessage({ id: `common.vcLabels.${topic}.label` }),
        description: intl.formatMessage({ id: `common.vcLabels.${topic}.description` }),
        score: getScore(valueComponents[topic], maxValueComponent),
        type: socioEconomicTopics.find((item) => item === topic) ? 'socioEconomic' : 'environmental',
      },
    );
    reportReportRelated(topic);
  };

  const handleClose = () => {
    setDialogData(null);
  };

  // Filters out 0 values, sorts them in descending order, then converts object to array
  const sortedValueComponents = Object.entries(valueComponents)
    .filter((item) => item[1] > 0)
    .sort((a, b) => b[1] - a[1])
    .map((item) => item[0]);

  const createTopicsTable = () => {
    const rows = [];

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 6; i++) {
      const columns = [];
      // eslint-disable-next-line no-plusplus
      for (let j = 0; j < 4; j++) {
        const index = i + (j * 6);
        columns.push(sortedValueComponents[index]);
      }
      rows.push(columns);
    }
    return (
      <table style={{ width: '100%', tableLayout: 'fixed' }}>
        <tbody className={classes.tableBody}>
          {rows.map((row) => (
            row.filter(Boolean).length ? (
              <tr key={row.reduce((acc, val) => acc.concat(val), '')}>
                {row.map((item, index2) => (
                  <td key={`topic-${(item) || index2}`}>
                    {item ? (
                      <Button className={classes.link} color="inherit" onClick={() => handleClickOpen(item)} disableRipple>
                        {intl.formatMessage({ id: `common.vcLabels.${item}.label` })}
                      </Button>
                    ) : null}
                  </td>
                ))}
              </tr>
            ) : null
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className={classes.root}>
      {dialogData
      && (
      <RelatedTopicsDialog
        open={Boolean(dialogData)}
        onClose={handleClose}
        data={dialogData}
      />
      )}
      <Typography variant="h6" className={classes.title}>
        {intl.formatMessage({ id: 'components.listPanel.relatedTopics.title' })}
      </Typography>

      {sortedValueComponents.length ? (
        createTopicsTable()) : (
          <Typography variant="h6" className={classes.title}>
            {intl.formatMessage({ id: 'components.listPanel.relatedTopics.noTopics' }, {
              type: intl.formatMessage({ id: `api.content.${type}` }).toLowerCase(),
              gender: masculineTypes.includes(type) ? 'masculine' : 'feminine',
            })}
          </Typography>
      )}
    </div>
  );
};

export default RelatedTopics;

RelatedTopics.propTypes = {
  valueComponents: PropTypes.shape({}).isRequired,
  type: PropTypes.string.isRequired,
};
