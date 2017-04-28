// @flow

import { connectionDefinitions } from 'graphql-relay';

import ReviewType from '../type/ReviewType';

export default connectionDefinitions({
  name: 'Review',
  nodeType: ReviewType,
});
