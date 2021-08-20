import React from 'react';
import { ButtonBase, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import upCaret from '../../../images/listPanel/upCaret.svg';
import downCaret from '../../../images/listPanel/downCaret.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.blue.dark,
    fontWeight: 'bold',
    marginTop: '1em',
  },
}));

const ViewMoreDetailsButton = ({ expandList, content, toggleExpand }) => {
  const intl = useIntl();
  const classes = useStyles();
  if (expandList.includes(content.id)) {
    // expanded already
    return (
      <ButtonBase className={classes.root} onClick={() => toggleExpand(content.id)}>
        <span>{intl.formatMessage({ id: 'components.listPanel.viewFewer' })}</span>
        <img alt="Up caret" src={upCaret} />
      </ButtonBase>
    );
  }
  // not expanded
  return (
    <ButtonBase className={classes.root} onClick={() => toggleExpand(content.id)}>
      <span>{intl.formatMessage({ id: 'components.listPanel.viewMore' })}</span>
      <img alt="Down caret" src={downCaret} />
    </ButtonBase>
  );
};

export default ViewMoreDetailsButton;

ViewMoreDetailsButton.propTypes = {
  expandList: PropTypes.arrayOf(PropTypes.string).isRequired,
  content: PropTypes.shape({ id: PropTypes.string }).isRequired,
  toggleExpand: PropTypes.func.isRequired,
};
