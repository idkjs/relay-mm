// @flow

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
} from 'graphql';
import {
  globalIdField,
  connectionArgs,
  fromGlobalId,
} from 'graphql-relay';
import { NodeInterface } from '../interface/NodeInterface';

import UserType from './UserType';
import BusinessType from './BusinessType';
import { UserLoader, BusinessLoader } from '../loader';
import UserConnection from '../connection/UserConnection';
import BusinessConnection from '../connection/BusinessConnection';

export default new GraphQLObjectType({
  name: 'Viewer',
  description: '...',
  fields: () => ({
    id: globalIdField('Viewer'),
    me: {
      type: UserType,
      resolve: (root, args, context) => UserLoader.load(context, context.user._id),
    },
    user: {
      type: UserType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: (obj, args, context) => {
        const { id } = fromGlobalId(args.id);
        return UserLoader.load(context, id);
      },
    },
    users: {
      type: UserConnection.connectionType,
      args: {
        ...connectionArgs,
        search: {
          type: GraphQLString,
        },
      },
      resolve: (obj, args, context) => UserLoader.loadUsers(context, args),
    },
    business: {
      type: BusinessType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: (obj, args, context) => {
        const { id } = fromGlobalId(args.id);
        return BusinessLoader.load(context, id);
      },
    },
    businesses: {
      type: BusinessConnection.connectionType,
      args: {
        ...connectionArgs,
        search: {
          type: GraphQLString,
        },
      },
      resolve: (obj, args, context) => BusinessLoader.loadBusinesses(context, args),
    },
  }),
  interfaces: () => [NodeInterface],
});
