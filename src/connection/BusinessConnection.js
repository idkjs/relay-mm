// @flow

import { connectionDefinitions } from 'graphql-relay';

import BusinessType from '../type/BusinessType';

export default connectionDefinitions({
  name: 'Business',
  nodeType: BusinessType,
});
