ESA Visualization
=================

ESA visualization for CER.

Quick Start
-----------

1. Make a copy of `.env.example` in root called `.env`
2. Set the URL for `MIDDLEWARE_PROXY_ADDRESS` to a server with the GraphQL API
2. Install NPM dependencies `npm install`
3. Run storybook `npm run storybook`
4. Run preview `npm run verifyLazyLoad`

Commands
--------

- Linting: `npm run lint`
- Testing (all): `npm run test`
- Testing (target): `npm run test -- [PATH_TO_FILES]`
- Coverage Report: `npm run test:showcoverage`
