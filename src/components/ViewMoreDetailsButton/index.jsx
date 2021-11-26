import React from 'react';
import { ButtonBase, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import upCaret from '../../images/listPanel/upCaret.svg';
import downCaret from '../../images/listPanel/downCaret.svg';
import { reportDetails } from '../../utilities/analytics';

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
  const isExpanded = expandList.includes(content.id);
  const handleClick = () => {
    toggleExpand(content.id);

    if (!isExpanded) {
      reportDetails(content.title);
    }
  };

  if (isExpanded) {
    return (
      <ButtonBase className={classes.root} onClick={handleClick}>
        <span>{intl.formatMessage({ id: 'components.listPanel.viewFewer' })}</span>
        <img alt="Up caret" src={upCaret} />
      </ButtonBase>
    );
  }

  return (
    <ButtonBase className={classes.root} onClick={handleClick}>
      <span>{intl.formatMessage({ id: 'components.listPanel.viewMore' })}</span>
      <img alt="Down caret" src={downCaret} />
    </ButtonBase>
  );
};

export default ViewMoreDetailsButton;

ViewMoreDetailsButton.propTypes = {
  expandList: PropTypes.arrayOf(PropTypes.string).isRequired,
  content: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  toggleExpand: PropTypes.func.isRequired,
};
