// @flow

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
} from 'graphql';
import { globalIdField } from 'graphql-relay';

import { NodeInterface } from '../interface/NodeInterface';

export default new GraphQLObjectType({
  name: 'Business',
  description: 'Represents Business',
  fields: () => ({
    id: globalIdField('Business'),
    name: {
      type: GraphQLString,
      description: '',
      resolve: obj => obj.name,
    },
    likesCount: {
      type: GraphQLInt,
      description: '',
      resolve: obj => obj.likesCount,
    },
    url: {
      type: GraphQLString,
      description: '',
      resolve: obj => obj.url,
    },
    active: {
      type: GraphQLBoolean,
      description: '',
      resolve: obj => obj.active,
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
