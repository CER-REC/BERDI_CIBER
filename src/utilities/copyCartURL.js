import { compress } from 'int-compress-string';

// TODO: Move this into the share cart button
export default (ids) => navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}?cartIds=${compress(ids)}`);
