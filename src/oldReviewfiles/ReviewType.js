// @flow

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} from 'graphql';
import { globalIdField } from 'graphql-relay';

import { NodeInterface } from '../interface/NodeInterface';

export default new GraphQLObjectType({
  name: 'Review',
  description: 'Represents Review',
  fields: () => ({
    id: globalIdField('Review'),
    review_id: {
      type: GraphQLString,
      description: '',
      resolve: obj => obj.review_id,
    },
    user_id: {
      type: GraphQLString,
      description: '',
      resolve: obj => obj.user_id,
    },
    business_id: {
      type: GraphQLString,
      description: '',
      resolve: obj => obj.business_id,
    },
    date: {
      type: GraphQLString,
      description: '',
      resolve: obj => obj.date,
    },
    text: {
      type: GraphQLString,
      description: '',
      resolve: obj => obj.text,
    },
    useful: {
      type: GraphQLInt,
      description: '',
      resolve: obj => obj.useful,
    },
    funny: {
      type: GraphQLInt,
      description: '',
      resolve: obj => obj.funny,
    },
    cool: {
      type: GraphQLInt,
      description: '',
      resolve: obj => obj.cool,
    },
    createdAt: {
      type: GraphQLString,
      description: '',
      resolve: obj => obj.createdAt.toISOString(),
    },
    updatedAt: {
      type: GraphQLString,
      description: '',
      resolve: obj => obj.updatedAt.toISOString(),
    },
  }),
  interfaces: () => [NodeInterface],
});
