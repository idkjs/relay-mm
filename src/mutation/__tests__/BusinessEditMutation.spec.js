import { graphql } from 'graphql';
import { toGlobalId } from 'graphql-relay';
import { schema } from '../../schema';
import { setupTest } from '../../../test/helper';

import User from '../model/User';
import Business from '../model/Business';

beforeEach(async () => await setupTest());

it('should not allow anonymous user', async () => {
  // TODO: specify fields to create a new Business
  const business = new Business({
    name: 'Example value',
    likesCount: 'Example value',
    url: 'Example value',
  });

  await business.save();

  const businessId = toGlobalId('Business', business._id);

  const query = `
    mutation M {
      BusinessEdit(input: {
        id: "${businessId}"
        example: "Example Field to Update"
      }) {
        business {
          name
          likesCount
          url
        }
      }
    }
  `;

  const rootValue = {};
  // No user should be passed to context since we are testing an anonymous session
  const context = {};

  const result = await graphql(schema, query, rootValue, context);

  expect(result).toMatchSnapshot();
});

it('should edit a record on database', async () => {
  const user = new User({
    name: 'user',
    email: 'user@example.com',
  });

  await user.save();

  // TODO: specify fields to create a new Business
  const business = new Business({
    name: 'Example value',
    likesCount: 'Example value',
    url: 'Example value',
  });

  await business.save();

  const businessId = toGlobalId('Business', business._id);

  const query = `
    mutation M {
      BusinessEdit(input: {
        id: "${businessId}"
        example: "Example Field to Update"
      }) {
        business {
          name
          likesCount
          url
        }
      }
    }
  `;

  const rootValue = {};
  const context = { user };

  const result = await graphql(schema, query, rootValue, context);

  expect(result).toMatchSnapshot();
});
