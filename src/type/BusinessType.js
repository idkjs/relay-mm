// @flow

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  // GraphQLList,
} from 'graphql';

import {
  connectionArgs,
  globalIdField,
} from 'graphql-relay';

// import Review from './ReviewType';
import { ReviewLoader } from '../loader';
import ReviewConnection from '../connection/ReviewConnection';
// import BusinessConnection from '../connection/BusinessConnection';
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
    business_id: {
      type: GraphQLString,
      description: '',
      resolve: obj => obj.business_id,
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
    reviews: {
      type: ReviewConnection.connectionType,
      args: {
        ...connectionArgs,
        search: {
          type: GraphQLString,
        },
      },
      resolve: (obj, args, context) => ReviewLoader.loadReviews(context, args),
    },
  }),
  interfaces: () => [NodeInterface],
});
