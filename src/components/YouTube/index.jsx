/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const YouTube = ({ videoId, className }) => {
  useEffect(() => {
    if (typeof jQuery !== 'undefined') {
      jQuery('.wb-mltmd').trigger('wb-init.wb-mltmd');
    }
  }, []);

  return (
    <figure className={clsx('wb-mltmd', className)}>
      { /* eslint-disable-next-line jsx-a11y/media-has-caption */ }
      <video>
        <source type="video/youtube" src={`https://www.youtube.com/watch?v=${videoId}`} />
      </video>
    </figure>
  );
};

export default YouTube;

YouTube.propTypes = {
  videoId: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};
