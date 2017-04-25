// @flow

import {
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} from 'graphql';
import {
  mutationWithClientMutationId,
  toGlobalId,
} from 'graphql-relay';

import Business from '../model/Business';

import BusinessLoader from '../loader/BusinessLoader';
import BusinessConnection from '../connection/BusinessConnection';

import ViewerType from '../type/ViewerType';

export default mutationWithClientMutationId({
  name: 'BusinessAdd',
  inputFields: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    likesCount: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    url: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async (args, { user }) => {
    // Verify if user is authorized
    if (!user) {
      throw new Error('Unauthorized user');
    }

    const {
      name,
      likesCount,
      url,
    } = args;

    // Create new record
    const business = await new Business({
      name,
      likesCount,
      url,
    }).save();

    // TODO: mutation logic

    return {
      id: business._id,
      error: null,
    };
  },
  outputFields: {
    businessEdge: {
      type: BusinessConnection.edgeType,
      resolve: async ({ id }, args, { user }) => {
        // Load new edge from loader
        const business = await BusinessLoader.load(
          user, id,
        );

        // Returns null if no node was loaded
        if (!business) {
          return null;
        }

        return {
          cursor: toGlobalId('Business', business),
          node: business,
        };
      },
    },
    viewer: {
      type: ViewerType,
      resolve: async (obj, args, { user }) => user,
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error,
    },
  },
});
