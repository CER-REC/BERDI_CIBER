/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { makeStyles } from '@material-ui/core';
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import ReactYouTube from 'react-youtube';
import clsx from 'clsx';
import { useIntl } from 'react-intl';

import { lang as languageCode } from '../../constants';

const useStyles = makeStyles(() => ({
  videoIframe: {
    width: '100%',
    height: '100%',
  },
  video: {
    width: '100%',
    height: '53.41vw',
  },
}));

const YouTube = ({ videoId }) => {
  const classes = useStyles();
  const intl = useIntl();
  const [player, setPlayer] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isCC, setIsCC] = useState(false);
  const [volume, setVolume] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);

  const onPlayerReady = useCallback((e) => {
    setPlayer(e.target);
    setVolume(e.target.getVolume());
    setDuration(e.target.getDuration());

    const iframeWindow = e.target.getIframe().contentWindow;
    let lastTimeUpdate = 0;
    window.addEventListener('message', (event) => {
      if (event.source !== iframeWindow) {
        return;
      }
      const { event: windowEvent, info } = JSON.parse(event.data);
      if (windowEvent === 'infoDelivery' && info?.currentTime) {
        const time = info.currentTime.toFixed(2);
        if (time !== lastTimeUpdate) {
          lastTimeUpdate = time;
          setElapsed(time);
        }
      }
    });
  }, [setPlayer, setVolume]);

  const onStateChange = useCallback((e) => {
    if (e.data === 1) { // Playing
      setIsPlaying(true);
    } else if (e.data === 2) { // Paused
      setIsPlaying(false);
    }
  }, [setIsPlaying]);

  const onPlayPause = useCallback(() => {
    if (isPlaying) {
      player.pauseVideo();
    } else if (!isPlaying) {
      player.playVideo();
    }
  }, [player, isPlaying]);

  const onMute = useCallback(() => {
    if (isMuted) {
      player.unMute();
      setIsMuted(false);
    } else if (!isMuted) {
      player.mute();
      setIsMuted(true);
    }
  }, [player, isMuted, setIsMuted]);

  const onSeek = useCallback((e) => {
    const { width } = e.target.getBoundingClientRect();
    const newElapsed = ((e.nativeEvent.offsetX) / width) * duration;
    setElapsed(newElapsed);
    player.seekTo(newElapsed, true);
  }, [player, duration, setElapsed]);

  const onSeekPress = useCallback((e) => {
    e.preventDefault();
    if (e.key === ' ') {
      onPlayPause();
    }
  }, [onPlayPause]);

  const onVolumeChange = useCallback((e) => {
    player.setVolume(e.target.value);
    setVolume(e.target.value);
  }, [player, setVolume]);

  const onCcClicked = useCallback(() => {
    player.setOption('captions', 'track', { languageCode });
    setIsCC(!isCC);
  }, [player, isCC, setIsCC]);

  return (
    <div className={clsx('wb-mltmd', 'wb-init', 'wb-mltmd-inited', 'video', 'youtube', { cc_on: isCC })}>
      <ReactYouTube
        id={classes.videoIframe}
        videoId={videoId}
        opts={{
          playerVars: {
            controls: 0,
          },
        }}
        className={classes.video}
        iframeClassName={classes.videoIframe}
        onReady={onPlayerReady}
        onStateChange={onStateChange}
      />
      <div className="wb-mm-ctrls">
        <div className="frstpnl">
          <div className="btn-group">
            <button type="button" className="btn btn-default playpause" aria-controls={classes.videoIframe} title={intl.formatMessage({ id: 'components.youTube.play' })} onClick={onPlayPause} aria-pressed={isPlaying}>
              <span className={clsx('glyphicon', { 'glyphicon-pause': isPlaying, 'glyphicon-play': !isPlaying })}><span className="wb-inv">{intl.formatMessage({ id: 'components.youTube.play' })}</span></span>
            </button>
            <button type="button" className="btn btn-default mute" aria-controls={classes.videoIframe} title={intl.formatMessage({ id: 'components.youTube.mute' })} onClick={onMute} aria-pressed={isMuted}>
              <span className={clsx('glyphicon', { 'glyphicon-volume-off': isMuted, 'glyphicon-volume-up': !isMuted })}><span className="wb-inv">{intl.formatMessage({ id: 'components.youTube.mute' })}</span></span>
            </button>
            <input
              type="range"
              className="volume"
              aria-controls={classes.videoIframe}
              title={intl.formatMessage({ id: 'components.youTube.volume' })}
              min="0"
              max="100"
              value={volume}
              onChange={onVolumeChange}
              step="5"
            />
          </div>
        </div>
        <div className="tline">
          <div className="wb-mm-txtonly">
            <p className="wb-mm-tmln-crrnt">
              <span className="wb-inv">{intl.formatMessage({ id: 'components.youTube.currentPosition' })}</span>
              <span>{ new Date(elapsed * 1000).toISOString().slice(11, 19) }</span>
            </p>
            <p className="wb-mm-tmln-ttl">
              <span className="wb-inv">{intl.formatMessage({ id: 'components.youTube.totalTime' })}</span>
              <span>{ new Date(duration * 1000).toISOString().slice(11, 19) }</span>
            </p>
          </div>
          <div className="wb-mm-prgrss">
            <progress tabIndex="0" aria-live="off" max={duration} value={elapsed} onClick={onSeek} onKeyPress={onSeekPress} />
          </div>
        </div>
        <div className="lastpnl">
          <div className="btn-group">
            <button type="button" className="btn btn-default cc" aria-controls={classes.videoIframe} title={intl.formatMessage({ id: 'components.youTube.showCC' })} aria-pressed={isCC} onClick={onCcClicked}>
              <span className="glyphicon glyphicon-subtitles"><span className="wb-inv">{intl.formatMessage({ id: 'components.youTube.showCC' })}</span></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YouTube;

YouTube.propTypes = {
  videoId: PropTypes.string.isRequired,
};
