// @flow

import DataLoader from 'dataloader';
import { Business as BusinessModel } from '../model';
import ConnectionFromMongoCursor from '../connection/ConnectionFromMongoCursor';
// import BusinessModel from '../model/Business';

type BusinessType = {
  id: string,
  _id: string,
  name: string,
  likesCount: number,
  url: string,
  business_id: string,
  createdAt: string,
  updatedAt: string,
}

export default class Business {
  id: string;
  _id: string;
  name: string;
  likesCount: number;
  url: string;
  business_id: string;
  createdAt: string;
  updatedAt: string;

  constructor(data: BusinessType) {
    this.id = data.id;
    this._id = data._id;
    this.name = data.name;
    this.likesCount = data.likesCount;
    this.url = data.url;
    this.business_id = data.business_id;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  static getLoader = () => new DataLoader(
    ids => Promise.all(ids.map(id => BusinessModel.findOne({ _id: id })))
  );

  static viewerCanSee(viewer, data) {
    // TODO: handle security

    return true;
  }

  // static async load(viewer, id)
  static async load({ business: viewer, dataloaders }, id) {
    if (!id) {
      return null;
    }

    const data = await dataloaders.BusinessLoader.load(id.toString());

    return Business.viewerCanSee(viewer, data) ? new Business(data, viewer) : null;
  }

  static clearCache({ dataloaders }, id) {
    return dataloaders.BusinessLoader.clear(id.toString());
  }

  static async loadBusinesses(viewer, args) {
    // TODO: specify conditions
    const businesses = BusinessModel.find({});

    return ConnectionFromMongoCursor.connectionFromMongoCursor(
      viewer, businesses, args, Business.load,
    );
  }
}
