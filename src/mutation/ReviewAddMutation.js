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

import Review from '../model/Review';

import ReviewLoader from '../loader/ReviewLoader';
import ReviewConnection from '../connection/ReviewConnection';

import ViewerType from '../type/ViewerType';

export default mutationWithClientMutationId({
  name: 'ReviewAdd',
  inputFields: {
    review_id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    user_id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    business_id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    date: {
      type: new GraphQLNonNull(GraphQLString),
    },
    text: {
      type: new GraphQLNonNull(GraphQLString),
    },
    useful: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    funny: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    cool: {
      type: new GraphQLNonNull(GraphQLInt),
    },
  },
  mutateAndGetPayload: async (args, { user }) => {
    // Verify if user is authorized
    if (!user) {
      throw new Error('Unauthorized user');
    }

    const {
      review_id,
      user_id,
      business_id,
      date,
      text,
      useful,
      funny,
      cool,
    } = args;

    // Create new record
    const review = await new Review({
      review_id,
      user_id,
      business_id,
      date,
      text,
      useful,
      funny,
      cool,
    }).save();

    // TODO: mutation logic

    return {
      id: review._id,
      error: null,
    };
  },
  outputFields: {
    reviewEdge: {
      type: ReviewConnection.edgeType,
      resolve: async ({ id }, args, { user }) => {
        // Load new edge from loader
        const review = await ReviewLoader.load(
          user, id,
        );

        // Returns null if no node was loaded
        if (!review) {
          return null;
        }

        return {
          cursor: toGlobalId('Review', review),
          node: review,
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
