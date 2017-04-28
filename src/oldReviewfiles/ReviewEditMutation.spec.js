import { graphql } from 'graphql';
import { toGlobalId } from 'graphql-relay';
import { schema } from '../../schema';
import { setupTest } from '../../../test/helper';

import User from '../model/User';
import Review from '../model/Review';

beforeEach(async () => await setupTest());

it('should not allow anonymous user', async () => {
  // TODO: specify fields to create a new Review
  const review = new Review({
    review_id: 'Example value',
    user_id: 'Example value',
    business_id: 'Example value',
    date: 'Example value',
    text: 'Example value',
    useful: 'Example value',
    funny: 'Example value',
    cool: 'Example value',
  });

  await review.save();

  const reviewId = toGlobalId('Review', review._id);

  const query = `
    mutation M {
      ReviewEdit(input: {
        id: "${reviewId}"
        example: "Example Field to Update"
      }) {
        review {
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

  // TODO: specify fields to create a new Review
  const review = new Review({
    review_id: 'Example value',
    user_id: 'Example value',
    business_id: 'Example value',
    date: 'Example value',
    text: 'Example value',
    useful: 'Example value',
    funny: 'Example value',
    cool: 'Example value',
  });

  await review.save();

  const reviewId = toGlobalId('Review', review._id);

  const query = `
    mutation M {
      ReviewEdit(input: {
        id: "${reviewId}"
        example: "Example Field to Update"
      }) {
        review {
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
  `;

  const rootValue = {};
  const context = { user };

  const result = await graphql(schema, query, rootValue, context);

  expect(result).toMatchSnapshot();
});
