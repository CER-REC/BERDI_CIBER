/* eslint-disable react/no-array-index-key */
/* eslint-disable no-plusplus */
import { makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import RelatedTopicsDialog from '../RelatedTopicsDialog';
import getScore from '../../../utilities/getScore';
import { socioEconomicTopics } from '../../../constants';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#F4F4F4',
    width: '100%',
    padding: '1em 3em',
  },
  title: {
    fontWeight: 'bold',
    fontSize: '16px',
    paddingBottom: '1em',
  },
  link: {
    color: theme.palette.teal.blue,
    textDecoration: 'underline',
    cursor: 'pointer',
    fontSize: '14px',
  },
  tableBody: {
    '& td': {
      paddingBottom: '1em',
      paddingRight: '6.5em',
      maxWidth: '155px',
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
    const score = getScore(valueComponents[topic], maxValueComponent);
    setDialogData(
      {
        topic,
        title: intl.formatMessage({ id: `common.vcLabels.${topic}.label` }),
        description: intl.formatMessage({ id: `common.vcLabels.${topic}.description` }),
        score,
        type: socioEconomicTopics.find((item) => item === topic) ? 'socioEconomic' : 'environmental',
      },
    );
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

    for (let i = 0; i < 6; i++) {
      const columns = [];
      for (let j = 0; j < 4; j++) {
        const index = i + (j * 6);
        columns.push(sortedValueComponents[index]);
      }
      rows.push(columns);
    }
    return (
      <table style={{ width: '100%' }}>
        <tbody className={classes.tableBody}>
          {rows.map((row, index) => (
            <tr key={`row-${index}`}>
              {row.map((item, index2) => (
                <td key={`topic-${(item && item[index2]) || index2}`}>
                  {item ? (
                    <Typography component="span" className={classes.link} onClick={() => handleClickOpen(item)}>
                      {intl.formatMessage({ id: `common.vcLabels.${item}.label` })}
                    </Typography>
                  ) : null}
                </td>
              ))}
            </tr>
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
