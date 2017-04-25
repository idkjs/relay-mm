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

import Business from '../model/Business';

import BusinessType from '../type/BusinessType';
import BusinessLoader from '../loader/BusinessLoader';

export default mutationWithClientMutationId({
  name: 'BusinessEdit',
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
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
      id,
      name,
      likesCount,
      url,
    } = args;

    // Check if the provided ID is valid
    const business = await Business.findOne({
      _id: fromGlobalId(id).id,
    });

    // If not, throw an error
    if (!business) {
      throw new Error('Invalid businessId');
    }

    // Edit record
    await business.update({
      name,
      likesCount,
      url,
    });

    // TODO: mutation logic

    // Clear dataloader cache
    BusinessLoader.clearCache(business._id);

    return {
      id: business._id,
      error: null,
    };
  },
  outputFields: {
    business: {
      type: BusinessType,
      resolve: (obj, args, { user }) => BusinessLoader.load(user, obj.id),
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error,
    },
  },
});
