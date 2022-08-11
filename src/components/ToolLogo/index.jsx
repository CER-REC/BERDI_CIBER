import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { lang } from '../../constants';
import berdiLogo from '../../images/landing/logo-berdi.svg';
import ciberLogo from '../../images/landing/logo-ciber.svg';

const ToolLogo = ({ style }) => {
  const intl = useIntl();

  return (
    <img style={style} alt={intl.formatMessage({ id: 'common.logoAltText' })} src={lang === 'fr' ? ciberLogo : berdiLogo} />
  );
};

ToolLogo.propTypes = {
  style: PropTypes.shape({}),
};

ToolLogo.defaultProps = {
  style: {},
};

export default ToolLogo;
