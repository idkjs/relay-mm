// @flow

import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt,
} from 'graphql';
import {
  mutationWithClientMutationId,
  fromGlobalId,
} from 'graphql-relay';

import Review from '../model/Review';

import ReviewType from '../type/ReviewType';
import ReviewLoader from '../loader/ReviewLoader';

export default mutationWithClientMutationId({
  name: 'ReviewEdit',
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
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
      id,
      review_id,
      user_id,
      business_id,
      date,
      text,
      useful,
      funny,
      cool,
    } = args;

    // Check if the provided ID is valid
    const review = await Review.findOne({
      _id: fromGlobalId(id).id,
    });

    // If not, throw an error
    if (!review) {
      throw new Error('Invalid reviewId');
    }

    // Edit record
    await review.update({
      review_id,
      user_id,
      business_id,
      date,
      text,
      useful,
      funny,
      cool,
    });

    // TODO: mutation logic

    // Clear dataloader cache
    ReviewLoader.clearCache(review._id);

    return {
      id: review._id,
      error: null,
    };
  },
  outputFields: {
    review: {
      type: ReviewType,
      resolve: (obj, args, { user }) => ReviewLoader.load(user, obj.id),
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error,
    },
  },
});
