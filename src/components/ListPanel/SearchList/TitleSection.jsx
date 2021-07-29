import { ButtonBase, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  seeMoreButton: {
    color: theme.palette.blue.dark,
    fontWeight: '900',
    fontFamily: theme.typography.fontFamily,
    verticalAlign: 'unset',
    paddingLeft: '1em',
    marginBottom: '1em',
  },
}));

const TitleSection = ({ title, content, handleClickOpen, setExpandedTitles, expandedTitles }) => {
  const intl = useIntl();
  const classes = useStyles();

  if (title.length < 150) {
    return (
      <Typography variant="h6" onClick={() => handleClickOpen(content)}>
        {title}
      </Typography>
    );
  }

  if (title.length >= 150 && expandedTitles.includes(title)) {
    return (
      <>
        <Typography variant="h6" onClick={() => handleClickOpen(content)}>
          {title}
        </Typography>
        <ButtonBase
          className={classes.seeMoreButton}
          onClick={() => setExpandedTitles((list) => [...list.filter((item) => item !== title)])}
        >
          {intl.formatMessage({ id: 'components.resultDialog.seeLess' })}
        </ButtonBase>
      </>
    );
  }
  return (
    <>
      <Typography variant="h6" onClick={() => handleClickOpen(content)}>
        {title.substring(0, 150).concat('...')}
      </Typography>
      <ButtonBase
        className={classes.seeMoreButton}
        onClick={() => setExpandedTitles((list) => [...list, title])}
      >
        {intl.formatMessage({ id: 'components.resultDialog.seeMore' })}
      </ButtonBase>
    </>
  );
};

export default TitleSection;

TitleSection.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.shape({}).isRequired,
  handleClickOpen: PropTypes.func.isRequired,
  setExpandedTitles: PropTypes.func.isRequired,
  expandedTitles: PropTypes.arrayOf(PropTypes.string).isRequired,
};
