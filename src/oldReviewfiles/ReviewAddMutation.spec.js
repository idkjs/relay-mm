import { graphql } from 'graphql';
import { schema } from '../../schema';
import { setupTest } from '../../../test/helper';

import User from '../model/User';
import Review from '../model/Review';

beforeEach(async () => await setupTest());

it('should not allow anonymous user', async () => {
  const query = `
    mutation M {
      ReviewAdd(input: {
        review_id: "Example value"
        user_id: "Example value"
        business_id: "Example value"
        date: "Example value"
        text: "Example value"
        useful: "Example value"
        funny: "Example value"
        cool: "Example value"
      }) {
        reviewEdge {
          node {
            review_id
            user_id
            business_id
            date
            text
            useful
            funny
            cool
          }
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

it('should create a record on database', async () => {
  const user = new User({
    name: 'user',
    email: 'user@example.com',
  });

  await user.save();

  const query = `
    mutation M {
      ReviewAdd(input: {
        review_id: "Example value"
        user_id: "Example value"
        business_id: "Example value"
        date: "Example value"
        text: "Example value"
        useful: "Example value"
        funny: "Example value"
        cool: "Example value"
      }) {
        reviewEdge {
          node {
            review_id
            user_id
            business_id
            date
            text
            useful
            funny
            cool
          }
        }
      }
    }
  `;

  const rootValue = {};
  const context = { user };

  const result = await graphql(schema, query, rootValue, context);

  expect(result).toMatchSnapshot();
});
