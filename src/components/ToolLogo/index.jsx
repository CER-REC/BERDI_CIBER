import React from 'react';
import PropTypes from 'prop-types';
import { lang } from '../../constants';
import berdiLogo from '../../images/landing/logo-berdi.svg';
import ciberLogo from '../../images/landing/logo-ciber.svg';

const ToolLogo = ({ style }) => (
  <img style={style} alt="tool logo" src={lang === 'fr' ? ciberLogo : berdiLogo} />
);

ToolLogo.propTypes = {
  style: PropTypes.shape({}),
};

ToolLogo.defaultProps = {
  style: {},
};

export default ToolLogo;
