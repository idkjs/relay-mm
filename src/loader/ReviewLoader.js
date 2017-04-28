/* eslint-disable camelcase */
// @flow

import DataLoader from 'dataloader';
import { Review as ReviewModel } from '../model';
import ConnectionFromMongoCursor from '../connection/ConnectionFromMongoCursor';
// import ReviewModel from '../model/Review';

type ReviewType = {
  id: string,
  _id: string,
  review_id: string,
  user_id: string,
  business_id: string,
  date: string,
  text: string,
  useful: number,
  funny: number,
  cool: number,
  createdAt: string,
  updatedAt: string,
}

export default class Review {
  id: string;
  _id: string;
  review_id: string;
  user_id: string;
  business_id: string;
  date: string;
  text: string;
  useful: number;
  funny: number;
  cool: number;
  createdAt: string;
  updatedAt: string;

  constructor(data: ReviewType) {
    this.id = data.id;
    this._id = data._id;
    this.review_id = data.review_id;
    this.user_id = data.user_id;
    this.business_id = data.business_id;
    this.date = data.date;
    this.text = data.text;
    this.useful = data.useful;
    this.funny = data.funny;
    this.cool = data.cool;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  static getLoader = () => new DataLoader(
    ids => Promise.all(ids.map(id => ReviewModel.findOne({ _id: id })))
  );

  static viewerCanSee(viewer, data) {
    // TODO: handle security

    return true;
  }

  // static async load(viewer, id)
  static async load({ review: viewer, dataloaders }, id) {
    if (!id) {
      return null;
    }

    const data = await dataloaders.ReviewLoader.load(id.toString());

    return Review.viewerCanSee(viewer, data) ? new Review(data, viewer) : null;
  }

  static clearCache({ dataloaders }, id) {
    return dataloaders.ReviewLoader.clear(id.toString());
  }

  static async loadReviews(viewer, args) {
    // TODO: specify conditions
    const reviews = ReviewModel.find({});

    return ConnectionFromMongoCursor.connectionFromMongoCursor(
      viewer, reviews, args, Review.load,
    );
  }
}
