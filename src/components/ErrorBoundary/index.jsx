import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

const styles = {
  root: {
    textAlign: 'center',
    padding: '10% 0',
  },
  errorMessage: {
    '& h1': {
      fontSize: '24px',
      textTransform: 'uppercase',
      marginBottom: 4,
    },
  },
  details: {
    '& details': {
      textAlign: 'left',
      display: 'inline-block',
      paddingTop: '1em',
      visibility: 'visible',
      whiteSpace: 'pre-wrap',
    },
  },
};

class ErrorBoundary extends React.PureComponent {
  static propTypes = {
    // Default children props from react
    children: PropTypes.element.isRequired,
    classes: PropTypes.shape({
      root: PropTypes.string,
      errorMessage: PropTypes.string,
      details: PropTypes.string,
    }),
  };

  static defaultProps = {
    classes: {},
  };

  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  getRestoreLink = () => document.location.href;

  getResetLink = () => document.location.origin + document.location.pathname;

  render() {
    const {
      state: { error, errorInfo },
      props: { children, classes },
    } = this;

    if (errorInfo) {
      const details = [
        errorInfo.componentStack,
        error.networkError,
        ...(error.graphQLErrors || []),
      ].filter((v) => v);

      return (
        <section className={`ErrorBoundary ${classes.root}`}>
          <section className={classes.errorMessage}>
            <FormattedMessage id="common.errorMessage" tagName="h1" />
          </section>
          <section className="restoreLink">
            <FormattedMessage id="components.errorBoundary.restoreMessage" />
            &nbsp;
            <a href={`${this.getRestoreLink()}`}>
              <FormattedMessage id="components.errorBoundary.restoreLinkText" />
            </a>
          </section>
          <section className="resetLink">
            <FormattedMessage id="components.errorBoundary.resetMessage" />
            &nbsp;
            <a href={`${this.getResetLink()}`}>
              <FormattedMessage id="components.errorBoundary.resetLinkText" />
            </a>
          </section>
          <section className={classes.details}>
            <details>
              {error && error.toString()}
              {details.map((v, i) => (
                <p key={i /* eslint-disable-line react/no-array-index-key */}>{v}</p>
              ))}
            </details>
          </section>
        </section>
      );
    }

    return children;
  }
}

export default withStyles(styles)(ErrorBoundary);
